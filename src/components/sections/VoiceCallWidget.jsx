import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import './VoiceCallWidget.css';
import { useLanguage } from '../../context/LanguageContext';
import { submitLead } from '../../lib/api';
import {
    TURNSTILE_SITE_KEY,
    fetchLandingDemos,
    createLandingDemoSession,
    getLandingDemoSession,
    cancelLandingDemoSession,
    buildLandingDemoWsUrl,
    encodeCredential,
    isFakeUzNumber,
} from '../../lib/landingDemo';
import { DemoCallAudio } from '../../lib/landingDemoAudio';
import { selectScenarioDemos } from '../../lib/demoCatalog';
import { landingDemoErrorKey } from '../../lib/landingDemoErrors';
import { landingContent } from '../../content/landingContent';
import {
    TELEGRAM_VERIFICATION_ENABLED,
    loginWithTelegramPhone,
    preloadTelegramLogin,
} from '../../lib/telegramLogin';

// Hero voice-demo widget. The visitor leaves a phone number, passes Turnstile,
// and talks to a live AI agent in the browser over a PCM16 WebSocket.
// Contract: LANDING_DEMO_FRONTEND_HANDOFF.md.

// phase: loading | unavailable | idle | verifying | creating | queued | mic | connecting
//        | live | ended | error
const ORB_STATE = {
    loading: 'idle',
    unavailable: 'error',
    idle: 'idle',
    verifying: 'dialing',
    creating: 'dialing',
    queued: 'dialing',
    mic: 'dialing',
    connecting: 'dialing',
    live: 'live',
    ended: 'error',
    error: 'error',
};

const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const LANGUAGE_LABELS = { uz: "O'zbekcha", ru: 'Русский', en: 'English' };

// The demo agent's default language from the API, falling back to Uzbek if it speaks it.
const pickLanguage = (demo) =>
    demo?.default_language || (demo?.allowed_languages?.includes('uz') ? 'uz' : '');

const VoiceCallWidget = ({ scenario, initialPhone = '', onPhoneChange: updateParentPhone, onLeadCaptured, onComplete, fallback }) => {
    const { t, language } = useLanguage();
    const [phase, setPhase] = useState('loading');
    const [demos, setDemos] = useState([]);
    const [demoSlug, setDemoSlug] = useState('');
    const [callLang, setCallLang] = useState('');
    const [phone, setPhone] = useState(initialPhone.replace(/^\+998/, ''));
    const [err, setErr] = useState('');
    const [errKey, setErrKey] = useState('');
    const [queuePos, setQueuePos] = useState(null);
    const [captions, setCaptions] = useState([]);
    const [elapsed, setElapsed] = useState(0);
    const [muted, setMuted] = useState(false);

    const phaseRef = useRef(phase);
    const attemptRef = useRef(0);
    const sessionRef = useRef(null); // { id, token } — memory only, never stored/logged
    const wsRef = useRef(null);
    const audioRef = useRef(null);
    const pollTimerRef = useRef(null);
    const elapsedTimerRef = useRef(null);
    const abortRef = useRef(null);
    const hangupRef = useRef(false);
    const captionSeqRef = useRef(0);
    const captionsBoxRef = useRef(null);
    const stickToBottomRef = useRef(true);
    const callPhoneRef = useRef('');
    const callStartRef = useRef(0);
    const languageRef = useRef(language);
    languageRef.current = language;
    const tsContainerRef = useRef(null);
    const tsWidgetIdRef = useRef(undefined);
    const tsTokenRef = useRef(null);
    const callbackRef = useRef({ onLeadCaptured, onComplete });
    callbackRef.current = { onLeadCaptured, onComplete };
    const copy = landingContent[language] || landingContent.ru;

    const setPhaseSafe = (p) => {
        phaseRef.current = p;
        setPhase(p);
    };

    const resetTurnstile = () => {
        tsTokenRef.current = null;
        if (tsWidgetIdRef.current !== undefined && window.turnstile) {
            try {
                window.turnstile.reset(tsWidgetIdRef.current);
            } catch {
                /* widget already gone */
            }
        }
    };

    const stopTimers = () => {
        if (pollTimerRef.current) {
            clearTimeout(pollTimerRef.current);
            pollTimerRef.current = null;
        }
        if (elapsedTimerRef.current) {
            clearInterval(elapsedTimerRef.current);
            elapsedTimerRef.current = null;
        }
        if (abortRef.current) {
            abortRef.current.abort();
            abortRef.current = null;
        }
    };

    // Telegram notification when a demo call actually took place. The refs are
    // only set once a call goes live, so failed/cancelled attempts stay silent.
    // Reads language from a ref: this callback must stay stable, or teardown's
    // identity would change mid-call and its cleanup effect would end the call.
    const notifyCallEnded = useCallback(() => {
        const phoneNumber = callPhoneRef.current;
        const started = callStartRef.current;
        callPhoneRef.current = '';
        callStartRef.current = 0;
        if (!phoneNumber || !started) return;
        submitLead({
            phone: phoneNumber,
            language: languageRef.current,
            source: 'hero_call_widget',
            event: 'call_ended',
            durationSec: Math.round((Date.now() - started) / 1000),
        }).catch(() => {});
    }, []);

    // Idempotent teardown for every exit path (§12 of the handoff).
    const teardown = useCallback(() => {
        attemptRef.current++;
        notifyCallEnded(); // no-op unless a live call is being abandoned
        stopTimers();
        const session = sessionRef.current;
        sessionRef.current = null;
        const ws = wsRef.current;
        wsRef.current = null;
        if (ws) {
            ws.onmessage = ws.onclose = ws.onerror = null;
            try {
                if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'hangup' }));
            } catch {
                /* socket already dead */
            }
            try {
                ws.close();
            } catch {
                /* already closed */
            }
        } else if (session) {
            // Only queued/ready sessions are cancellable; a claimed socket uses hangup.
            cancelLandingDemoSession(session.id, session.token);
        }
        if (audioRef.current) {
            audioRef.current.close();
            audioRef.current = null;
        }
        resetTurnstile();
    }, [notifyCallEnded]);

    useEffect(() => teardown, [teardown]);

    // Closing the tab mid-call doesn't unmount React, so report the call here.
    // No-op unless a call is live; the request rides out the unload via keepalive.
    useEffect(() => {
        window.addEventListener('pagehide', notifyCallEnded);
        return () => window.removeEventListener('pagehide', notifyCallEnded);
    }, [notifyCallEnded]);

    // ---- Catalog -----------------------------------------------------------
    const loadCatalog = useCallback(() => {
        const attempt = ++attemptRef.current;
        setPhaseSafe('loading');
        fetchLandingDemos()
            .then((list) => {
                if (attemptRef.current !== attempt) return;
                const available = selectScenarioDemos(list, scenario);
                setDemos(available);
                if (available.length) {
                    setDemoSlug(available[0].slug);
                    setCallLang(available[0].allowed_languages.includes(languageRef.current) ? languageRef.current : pickLanguage(available[0]));
                    setPhaseSafe('idle');
                } else {
                    setPhaseSafe('unavailable');
                }
            })
            .catch(() => {
                if (attemptRef.current === attempt) setPhaseSafe('unavailable');
            });
    }, [scenario]);

    useEffect(() => {
        loadCatalog();
    }, [loadCatalog]);

    // Load the official SDK before the submit gesture so its popup is not
    // delayed (and potentially blocked) while the script downloads.
    useEffect(() => {
        if (TELEGRAM_VERIFICATION_ENABLED) preloadTelegramLogin().catch(() => {});
    }, []);

    // ---- Turnstile (explicit render, interaction-only) ----------------------
    useEffect(() => {
        if (!TURNSTILE_SITE_KEY) return undefined;
        let interval = null;
        const tryRender = () => {
            if (tsWidgetIdRef.current !== undefined) return true;
            if (!window.turnstile?.render || !tsContainerRef.current) return false;
            tsWidgetIdRef.current = window.turnstile.render(tsContainerRef.current, {
                sitekey: TURNSTILE_SITE_KEY,
                theme: 'dark',
                appearance: 'interaction-only',
                action: 'landing_demo',
                callback: (token) => {
                    tsTokenRef.current = token;
                },
                'expired-callback': () => {
                    tsTokenRef.current = null;
                },
                'error-callback': () => {
                    tsTokenRef.current = null;
                },
            });
            return true;
        };
        if (!tryRender()) interval = setInterval(() => tryRender() && clearInterval(interval), 300);
        return () => {
            if (interval) clearInterval(interval);
            if (tsWidgetIdRef.current !== undefined && window.turnstile) {
                try {
                    window.turnstile.remove(tsWidgetIdRef.current);
                } catch {
                    /* widget already gone */
                }
            }
            tsWidgetIdRef.current = undefined;
            tsTokenRef.current = null;
        };
    }, []);

    // ---- Call flow -----------------------------------------------------------
    const failCall = useCallback(
        (key) => {
            teardown();
            setErrKey(key);
            setPhaseSafe('error');
        },
        [teardown],
    );

    // Each stt.result re-transcribes the whole utterance (audio chunks are
    // appended server-side), so a "you" caption following another "you"
    // caption supersedes it — replace instead of stacking near-duplicates.
    const pushCaption = (who, text) =>
        setCaptions((c) => {
            const last = c[c.length - 1];
            if (who === 'you' && last?.who === 'you') {
                return [...c.slice(0, -1), { ...last, text }];
            }
            return [...c, { who, text, key: ++captionSeqRef.current }];
        });

    // Follow the newest caption unless the visitor scrolled up to re-read.
    // Stickiness is decided by the last scroll event, not by measuring after the
    // caption was inserted — by then a tall message already looks "scrolled up".
    const onCaptionsScroll = (e) => {
        const el = e.currentTarget;
        stickToBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    };

    useLayoutEffect(() => {
        const el = captionsBoxRef.current;
        if (el && stickToBottomRef.current) el.scrollTop = el.scrollHeight;
    }, [captions]);

    const startElapsed = () => {
        setElapsed(0);
        const started = Date.now();
        callStartRef.current = started;
        elapsedTimerRef.current = setInterval(
            () => setElapsed(Math.floor((Date.now() - started) / 1000)),
            1000,
        );
    };

    const openSocket = useCallback(() => {
        const session = sessionRef.current;
        if (!session) return;
        let ws;
        try {
            ws = new WebSocket(buildLandingDemoWsUrl(session.id), [
                'syncall-auth',
                encodeCredential(session.token),
            ]);
        } catch {
            failCall('callWidgetErrGeneric');
            return;
        }
        ws.binaryType = 'arraybuffer';
        wsRef.current = ws;
        hangupRef.current = false;

        ws.onmessage = (event) => {
            const audio = audioRef.current;
            if (typeof event.data !== 'string') {
                audio?.playPcm16(event.data);
                return;
            }
            let msg;
            try {
                msg = JSON.parse(event.data);
            } catch {
                return;
            }
            if (msg.type === 'interrupt') {
                audio?.flush();
            } else if (msg.type === 'status' && msg.status === 'connected') {
                setPhaseSafe('live');
                startElapsed();
                audio?.startCapture((frame) => {
                    const socket = wsRef.current;
                    if (socket && socket.readyState === WebSocket.OPEN) socket.send(frame);
                });
            } else if (msg.type === 'telemetry') {
                if (msg.stage === 'stt' && msg.event === 'result' && msg.text) {
                    pushCaption('you', msg.text);
                } else if (msg.stage === 'tts' && msg.event === 'input' && msg.text) {
                    pushCaption('agent', msg.text);
                }
            }
            // "error" messages surface through the close code that follows.
        };

        ws.onclose = (event) => {
            if (wsRef.current !== ws) return; // teardown already handled it
            wsRef.current = null;
            sessionRef.current = null;
            stopTimers();
            if (audioRef.current) {
                audioRef.current.close();
                audioRef.current = null;
            }
            resetTurnstile();
            // Closure is authoritative: a live call ends normally; a call that
            // never went live failed to start. Never reconnect (single-claim token).
            if (hangupRef.current || phaseRef.current === 'live') {
                notifyCallEnded();
                setPhaseSafe('ended');
                callbackRef.current.onComplete?.();
            } else {
                setErrKey(
                    event.code === 1008 ? 'callWidgetErrWindowExpired' : 'callWidgetErrGeneric',
                );
                setPhaseSafe('error');
            }
        };
    }, [failCall, notifyCallEnded]);

    // The ready reservation lasts 30 s — request the microphone immediately.
    const startMicAndConnect = useCallback(async () => {
        const attempt = attemptRef.current;
        setPhaseSafe('mic');
        let stream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                },
            });
        } catch {
            failCall('callWidgetErrMic');
            return;
        }
        if (attemptRef.current !== attempt || !sessionRef.current) {
            stream.getTracks().forEach((track) => track.stop());
            return;
        }
        setPhaseSafe('connecting');
        try {
            audioRef.current?.attachMic(stream);
        } catch {
            failCall('callWidgetErrGeneric');
            return;
        }
        openSocket();
    }, [failCall, openSocket]);

    const schedulePoll = useCallback(
        (ms) => {
            const attempt = attemptRef.current;
            pollTimerRef.current = setTimeout(async () => {
                pollTimerRef.current = null;
                const session = sessionRef.current;
                if (!session || attemptRef.current !== attempt) return;
                abortRef.current = new AbortController();
                let status;
                try {
                    status = await getLandingDemoSession(
                        session.id,
                        session.token,
                        abortRef.current.signal,
                    );
                } catch (e) {
                    if (e.name === 'AbortError') return;
                    failCall('callWidgetErrGeneric');
                    return;
                }
                abortRef.current = null;
                if (attemptRef.current !== attempt || !sessionRef.current) return;
                if (status.state === 'queued') {
                    setQueuePos(status.queue_position);
                    schedulePoll(status.poll_after_ms);
                } else if (status.state === 'ready') {
                    startMicAndConnect();
                } else {
                    failCall('callWidgetErrQueueExpired');
                }
            }, Math.max(ms || 1500, 500));
        },
        [failCall, startMicAndConnect],
    );

    const handleCall = async (e) => {
        e.preventDefault();
        const digits = phone.replace(/\D/g, '');
        const local9 = digits.length === 12 && digits.startsWith('998') ? digits.slice(3) : digits;
        if (local9.length !== 9 || isFakeUzNumber(local9)) {
            setErr(t('callWidgetInvalidPhone'));
            return;
        }
        if (TURNSTILE_SITE_KEY && !tsTokenRef.current) {
            setErr(t('callWidgetErrVerify'));
            return;
        }
        setErr('');
        setErrKey('');
        setCaptions([]);
        setQueuePos(null);
        setMuted(false);
        stickToBottomRef.current = true;
        hangupRef.current = false;

        const demo = demos.find((d) => d.slug === demoSlug) || demos[0];
        if (!demo) { setPhaseSafe('unavailable'); return; }
        const demoLanguage = demo.allowed_languages.includes(callLang)
            ? callLang
            : pickLanguage(demo);
        const fullPhone = `+998${local9}`;

        // Create the AudioContext inside the user gesture so iOS allows playback.
        const audio = new DemoCallAudio();
        audio.ensureContext();
        audioRef.current = audio;

        const attempt = ++attemptRef.current;
        // Open verification while the click still has a user activation. The
        // lead request below must not delay a configured Telegram popup.
        let telegramAuth = null;
        if (TELEGRAM_VERIFICATION_ENABLED) {
            setPhaseSafe('verifying');
            try {
                telegramAuth = await loginWithTelegramPhone(language);
            } catch {
                if (attemptRef.current !== attempt) return;
                audio.close();
                audioRef.current = null;
                setErr(t('callWidgetErrTelegram'));
                setPhaseSafe('idle');
                return;
            }
            if (attemptRef.current !== attempt) return;
        }
        if (callbackRef.current.onLeadCaptured) {
            setPhaseSafe('creating');
            try {
                await callbackRef.current.onLeadCaptured(fullPhone, 'live');
            } catch {
                if (attemptRef.current !== attempt) return;
                audio.close();
                audioRef.current = null;
                setErr(copy.saveError);
                setPhaseSafe('idle');
                return;
            }
            if (attemptRef.current !== attempt) return;
        }
        setPhaseSafe('creating');
        let session;
        try {
            session = await createLandingDemoSession({
                demo_slug: demo.slug,
                phone_number: fullPhone,
                language: demoLanguage,
                ...(tsTokenRef.current ? { challenge_token: tsTokenRef.current } : {}),
                ...(telegramAuth
                    ? {
                        telegram_id_token: telegramAuth.idToken,
                        telegram_nonce: telegramAuth.nonce,
                    }
                    : {}),
            });
        } catch (error) {
            resetTurnstile(); // validation may have consumed the token even on failure
            if (attemptRef.current !== attempt) return;
            if (error.status === 422) {
                audio.close();
                audioRef.current = null;
                setErr(t('callWidgetInvalidPhone'));
                setPhaseSafe('idle');
            } else if (error.status === 404) {
                audio.close();
                audioRef.current = null;
                loadCatalog(); // stale catalog — demo disabled or removed
            } else {
                failCall(landingDemoErrorKey(error));
            }
            return;
        }
        resetTurnstile(); // single-use token
        if (attemptRef.current !== attempt) {
            cancelLandingDemoSession(session.session_id, session.token);
            return;
        }
        // Keep the existing Telegram lead pipeline in parallel with the demo call.
        if (!callbackRef.current.onLeadCaptured) submitLead({ phone: fullPhone, language, source: 'hero_call_widget' }).catch(() => {});
        callPhoneRef.current = fullPhone; // for the "call ended" notification
        sessionRef.current = { id: session.session_id, token: session.token };
        if (session.state === 'ready') {
            startMicAndConnect();
        } else {
            setQueuePos(session.queue_position);
            setPhaseSafe('queued');
            schedulePoll(session.poll_after_ms);
        }
    };

    const toggleMute = () => {
        const next = !muted;
        audioRef.current?.setMuted(next);
        setMuted(next);
    };

    const hangup = () => {
        hangupRef.current = true;
        const ws = wsRef.current;
        if (ws) {
            try {
                if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'hangup' }));
            } catch {
                /* socket already dead */
            }
            try {
                ws.close(); // onclose finishes cleanup and shows "ended"
            } catch {
                /* already closed */
            }
        }
    };

    const cancelAttempt = () => {
        teardown();
        setPhaseSafe('idle');
    };

    const resetToIdle = () => {
        teardown();
        setErr('');
        setErrKey('');
        setCaptions([]);
        setQueuePos(null);
        setPhaseSafe(demos.length ? 'idle' : 'unavailable');
    };

    const goToDemo = () => {
        const el = document.getElementById('demo');
        if (el) {
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }
    };

    // Mask the local number as "90 123 45 67". A pasted +998… loses the country
    // code, but only at full length — a 10th typed digit must not turn a number
    // that happens to start with 998 (e.g. 99 828 24 04) into a new prefix.
    const onPhoneChange = (e) => {
        const raw = e.target.value;
        let digits = raw.replace(/\D/g, '');
        if (digits.startsWith('998') && (digits.length >= 12 || raw.trimStart().startsWith('+'))) {
            digits = digits.slice(3);
        }
        digits = digits.slice(0, 9);
        setPhone(
            [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)]
                .filter(Boolean)
                .join(' '),
        );
        updateParentPhone?.(digits ? `+998${digits}` : '');
        if (err) setErr('');
    };

    const selectedDemo = demos.find((d) => d.slug === demoSlug);
    const maxDuration = selectedDemo?.max_duration_seconds;

    if (phase === 'unavailable' && fallback) return fallback;

    return (
        <div className="vcw" data-state={ORB_STATE[phase]}>
            <div className="vcw-grid" />

            <div className="vcw-orb-wrap">
                <div className="vcw-orb">
                    <span className="vcw-orb-halo" />
                    <span className="vcw-orb-pulse" />
                    <span className="vcw-orb-pulse vcw-orb-pulse-2" />
                    <span className="vcw-orb-sphere">
                        <span className="vcw-orb-gloss" />
                    </span>
                </div>
            </div>

            <div className="vcw-body">
                {phase === 'loading' && (
                    <div className="vcw-panel vcw-dialing">
                        <h3 className="vcw-title">{t('callWidgetTitle')}</h3>
                        <p className="vcw-sub">{t('callWidgetLoading')}</p>
                        <span className="vcw-dialing-status" role="status" aria-label={t('loading')}>
                            <span className="vcw-dots"><i /><i /><i /></span>
                        </span>
                    </div>
                )}

                {phase === 'unavailable' && (
                    <div className="vcw-panel vcw-error">
                        <h3 className="vcw-title">{t('callWidgetUnavailable')}</h3>
                        <p className="vcw-sub">{t('callWidgetErrorSubtitle')}</p>
                        <button className="vcw-cta" onClick={goToDemo}>
                            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                                <path d="M8 5v14l11-7-11-7z" fill="currentColor"/>
                            </svg>
                            {t('callWidgetDemoCta')}
                        </button>
                        <button className="vcw-retry" onClick={loadCatalog}>{t('callWidgetRetry')}</button>
                    </div>
                )}

                {phase === 'idle' && (
                    <form className="vcw-panel" onSubmit={handleCall}>
                        <h3 className="vcw-title">{t('callWidgetTitle')}</h3>
                        <p className="vcw-sub">{!TELEGRAM_VERIFICATION_ENABLED ? copy.phoneHint : t('callWidgetSubtitle')}</p>

                        {demos.length > 1 && (
                            <label className="vcw-scenario-label">{t('callWidgetScenario')}
                            <select
                                className="vcw-select"
                                value={demoSlug}
                                onChange={(e) => {
                                    const next = demos.find((d) => d.slug === e.target.value);
                                    setDemoSlug(e.target.value);
                                    // Keep the chosen language only if the new demo speaks it.
                                    setCallLang((cur) =>
                                        next?.allowed_languages?.includes(cur)
                                            ? cur
                                            : pickLanguage(next),
                                    );
                                }}
                                aria-label={t('callWidgetScenario')}
                            >
                                {demos.map((d) => (
                                    <option key={d.slug} value={d.slug}>{d.display_name}</option>
                                ))}
                            </select>
                            </label>
                        )}

                        {selectedDemo?.allowed_languages?.length > 1 && (
                            <div className="vcw-langs" role="group" aria-label={t('callWidgetLanguage')}>
                                {selectedDemo.allowed_languages.map((code) => (
                                    <button
                                        key={code}
                                        type="button"
                                        className="vcw-lang"
                                        data-active={code === callLang || undefined}
                                        aria-pressed={code === callLang}
                                        onClick={() => setCallLang(code)}
                                    >
                                        {LANGUAGE_LABELS[code] || code.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="vcw-input-row">
                            <span className="vcw-prefix">+998</span>
                            <input
                                className="vcw-input"
                                type="tel"
                                inputMode="numeric"
                                autoComplete="tel-national"
                                maxLength={12}
                                placeholder="90 123 45 67"
                                value={phone}
                                onChange={onPhoneChange}
                                aria-label={t('callWidgetTitle')}
                            />
                        </div>
                        {err && <span className="vcw-err">{err}</span>}

                        <button type="submit" className="vcw-cta">
                            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                                <path d="M5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"
                                      stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                            </svg>
                            {scenario && !TELEGRAM_VERIFICATION_ENABLED ? copy.live : t(TELEGRAM_VERIFICATION_ENABLED ? 'callWidgetTelegramCta' : 'callWidgetCta')}
                        </button>

                        <span className="vcw-consent">
                            {t(TELEGRAM_VERIFICATION_ENABLED
                                ? 'callWidgetTelegramConsent'
                                : 'callWidgetConsent')}
                        </span>
                    </form>
                )}

                {(phase === 'verifying' || phase === 'creating' || phase === 'connecting') && (
                    <div className="vcw-panel vcw-dialing">
                        <span className="vcw-dialing-status">
                            {t(phase === 'verifying'
                                ? 'callWidgetTelegramVerifying'
                                : 'callWidgetDialing')}
                            <span className="vcw-dots"><i /><i /><i /></span>
                        </span>
                        <span className="vcw-sub">
                            {t(phase === 'verifying'
                                ? 'callWidgetTelegramVerifyingSub'
                                : 'callWidgetConnecting')}
                        </span>
                        {phase === 'connecting' && (
                            <div className="vcw-controls">
                                <button className="vcw-hangup" onClick={hangup} aria-label="Cancel call">
                                    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                                        <path d="M5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"
                                              stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {phase === 'queued' && (
                    <div className="vcw-panel vcw-dialing">
                        <span className="vcw-dialing-status">
                            {t('callWidgetQueued')}
                            <span className="vcw-dots"><i /><i /><i /></span>
                        </span>
                        <span className="vcw-sub">
                            {t('callWidgetQueuedSub')}{queuePos ?? '—'}
                        </span>
                        <button className="vcw-retry" onClick={cancelAttempt}>{t('callWidgetCancel')}</button>
                    </div>
                )}

                {phase === 'mic' && (
                    <div className="vcw-panel vcw-dialing">
                        <span className="vcw-dialing-status">{t('callWidgetMicTitle')}</span>
                        <span className="vcw-sub">{t('callWidgetMicSub')}</span>
                    </div>
                )}

                {phase === 'live' && (
                    <div className="vcw-panel vcw-live">
                        {scenario && <span className="vcw-live-agent">{selectedDemo?.display_name}</span>}
                        <span className="vcw-live-status">
                            <span className="vcw-live-dot" />
                            {t('callWidgetLive')}
                            <span className="vcw-timer">
                                {formatTime(elapsed)}{maxDuration ? ` / ${formatTime(maxDuration)}` : ''}
                            </span>
                        </span>
                        <div
                            className="vcw-captions"
                            ref={captionsBoxRef}
                            onScroll={onCaptionsScroll}
                            role="log"
                            aria-label={t('callWidgetTranscript')}
                            aria-live="polite"
                        >
                            {captions.length === 0 && (
                                <span className="vcw-sub">{t('callWidgetLiveSub')}</span>
                            )}
                            {captions.map((c) => (
                                <p key={c.key} className="vcw-caption" data-who={c.who}>
                                    <b>{t(c.who === 'you' ? 'callWidgetYou' : 'callWidgetAgent')}:</b> {c.text}
                                </p>
                            ))}
                        </div>
                        <div className="vcw-controls">
                            <button
                                className="vcw-mute"
                                onClick={toggleMute}
                                data-muted={muted || undefined}
                                aria-pressed={muted}
                                aria-label={t(muted ? 'callWidgetUnmute' : 'callWidgetMute')}
                                title={t(muted ? 'callWidgetUnmute' : 'callWidgetMute')}
                            >
                                {muted ? (
                                    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                                        <path d="M9 9v3a3 3 0 004.6 2.5M15 12V6a3 3 0 00-5.9-.7M18 12a6 6 0 01-8.7 5.3M6 12a6 6 0 001.8 4.3M12 18v3M4 3l16 18"
                                              stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                                        <path d="M12 3a3 3 0 013 3v6a3 3 0 01-6 0V6a3 3 0 013-3zM6 12a6 6 0 0012 0M12 18v3"
                                              stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </button>
                            <button className="vcw-hangup" onClick={hangup} aria-label="End call">
                                <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                                    <path d="M5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"
                                          stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {phase === 'ended' && (
                    <div className="vcw-panel vcw-error">
                        <h3 className="vcw-title">{t('callWidgetEndedTitle')}</h3>
                        <p className="vcw-sub">{t('callWidgetEndedSub')}</p>
                        {scenario ? <a className="vcw-cta" href="#contact">{copy.talkTeam}</a> : <button className="vcw-cta" onClick={goToDemo}>
                            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                                <path d="M8 5v14l11-7-11-7z" fill="currentColor"/>
                            </svg>
                            {t('callWidgetDemoCta')}
                        </button>}
                        <button className="vcw-retry" onClick={resetToIdle}>{t('callWidgetRetry')}</button>
                    </div>
                )}

                {phase === 'error' && (
                    <div className="vcw-panel vcw-error">
                        <h3 className="vcw-title">{t('callWidgetErrorTitle')}</h3>
                        <p className="vcw-sub">{t(errKey || 'callWidgetErrGeneric')}</p>
                        <button className="vcw-cta" onClick={resetToIdle}>{t('callWidgetRetry')}</button>
                        <button className="vcw-retry" onClick={fallback ? () => setPhaseSafe('unavailable') : goToDemo}>{t('callWidgetDemoCta')}</button>
                    </div>
                )}

                {/* Interaction-only Turnstile: invisible unless a challenge is required. */}
                <div className="vcw-turnstile" ref={tsContainerRef} />
            </div>
        </div>
    );
};

export default VoiceCallWidget;
