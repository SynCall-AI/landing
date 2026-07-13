import { useState, useRef, useEffect, useCallback } from 'react';
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

// Hero voice-demo widget. The visitor leaves a phone number, passes Turnstile,
// and talks to a live AI agent in the browser over a PCM16 WebSocket.
// Contract: LANDING_DEMO_FRONTEND_HANDOFF.md.

// phase: loading | unavailable | idle | creating | queued | mic | connecting
//        | live | ended | error
const ORB_STATE = {
    loading: 'idle',
    unavailable: 'error',
    idle: 'idle',
    creating: 'dialing',
    queued: 'dialing',
    mic: 'dialing',
    connecting: 'dialing',
    live: 'live',
    ended: 'error',
    error: 'error',
};

const STATUS_ERROR_KEY = {
    400: 'callWidgetErrVerify',
    409: 'callWidgetErrConflict',
    429: 'callWidgetErrLimit',
    503: 'callWidgetErrBusy',
};

const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const LANGUAGE_LABELS = { uz: "O'zbekcha", ru: 'Русский', en: 'English' };

// The visitor's UI language if the demo speaks it, otherwise the demo's default.
const pickLanguage = (demo, uiLanguage) =>
    demo?.allowed_languages?.includes(uiLanguage) ? uiLanguage : demo?.default_language || '';

const VoiceCallWidget = () => {
    const { t, language } = useLanguage();
    const [phase, setPhase] = useState('loading');
    const [demos, setDemos] = useState([]);
    const [demoSlug, setDemoSlug] = useState('');
    const [callLang, setCallLang] = useState('');
    const [phone, setPhone] = useState('');
    const [err, setErr] = useState('');
    const [errKey, setErrKey] = useState('');
    const [queuePos, setQueuePos] = useState(null);
    const [captions, setCaptions] = useState([]);
    const [elapsed, setElapsed] = useState(0);
    const [muted, setMuted] = useState(false);

    const phaseRef = useRef('loading');
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
    const callPhoneRef = useRef('');
    const callStartRef = useRef(0);
    const languageRef = useRef(language);
    languageRef.current = language;
    const tsContainerRef = useRef(null);
    const tsWidgetIdRef = useRef(undefined);
    const tsTokenRef = useRef(null);

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
                setDemos(list);
                if (list.length) {
                    setDemoSlug(list[0].slug);
                    setCallLang(pickLanguage(list[0], languageRef.current));
                    setPhaseSafe('idle');
                } else {
                    setPhaseSafe('unavailable');
                }
            })
            .catch(() => {
                if (attemptRef.current === attempt) setPhaseSafe('unavailable');
            });
    }, []);

    useEffect(() => {
        loadCatalog();
    }, [loadCatalog]);

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
    useEffect(() => {
        const el = captionsBoxRef.current;
        if (!el) return;
        if (el.scrollHeight - el.scrollTop - el.clientHeight < 90) {
            el.scrollTop = el.scrollHeight;
        }
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
        hangupRef.current = false;

        const demo = demos.find((d) => d.slug === demoSlug) || demos[0];
        const demoLanguage = demo.allowed_languages.includes(callLang)
            ? callLang
            : pickLanguage(demo, language);
        const fullPhone = `+998${local9}`;

        // Create the AudioContext inside the user gesture so iOS allows playback.
        const audio = new DemoCallAudio();
        audio.ensureContext();
        audioRef.current = audio;

        const attempt = ++attemptRef.current;
        setPhaseSafe('creating');
        let session;
        try {
            session = await createLandingDemoSession({
                demo_slug: demo.slug,
                phone_number: fullPhone,
                language: demoLanguage,
                ...(tsTokenRef.current ? { challenge_token: tsTokenRef.current } : {}),
            });
        } catch (error) {
            resetTurnstile(); // validation may have consumed the token even on failure
            if (attemptRef.current !== attempt) return;
            if (error.status === 422) {
                setErr(t('callWidgetInvalidPhone'));
                setPhaseSafe('idle');
            } else if (error.status === 404) {
                loadCatalog(); // stale catalog — demo disabled or removed
            } else {
                failCall(STATUS_ERROR_KEY[error.status] || 'callWidgetErrGeneric');
            }
            return;
        }
        resetTurnstile(); // single-use token
        if (attemptRef.current !== attempt) {
            cancelLandingDemoSession(session.session_id, session.token);
            return;
        }
        // Keep the existing Telegram lead pipeline in parallel with the demo call.
        submitLead({ phone: fullPhone, language, source: 'hero_call_widget' }).catch(() => {});
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
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        if (err) setErr('');
    };

    const selectedDemo = demos.find((d) => d.slug === demoSlug);
    const maxDuration = selectedDemo?.max_duration_seconds;

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
                        <span className="vcw-dialing-status">
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
                        <p className="vcw-sub">{t('callWidgetSubtitle')}</p>

                        {demos.length > 1 && (
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
                                            : pickLanguage(next, language),
                                    );
                                }}
                                aria-label="Demo agent"
                            >
                                {demos.map((d) => (
                                    <option key={d.slug} value={d.slug}>{d.display_name}</option>
                                ))}
                            </select>
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
                            {t('callWidgetCta')}
                        </button>

                        <span className="vcw-consent">{t('callWidgetConsent')}</span>
                    </form>
                )}

                {(phase === 'creating' || phase === 'connecting') && (
                    <div className="vcw-panel vcw-dialing">
                        <span className="vcw-dialing-status">
                            {t('callWidgetDialing')}
                            <span className="vcw-dots"><i /><i /><i /></span>
                        </span>
                        <span className="vcw-sub">{t('callWidgetConnecting')}</span>
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
                        <span className="vcw-live-status">
                            <span className="vcw-live-dot" />
                            {t('callWidgetLive')}
                            <span className="vcw-timer">
                                {formatTime(elapsed)}{maxDuration ? ` / ${formatTime(maxDuration)}` : ''}
                            </span>
                        </span>
                        <div className="vcw-captions" ref={captionsBoxRef} aria-live="polite">
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
                        <button className="vcw-cta" onClick={goToDemo}>
                            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                                <path d="M8 5v14l11-7-11-7z" fill="currentColor"/>
                            </svg>
                            {t('callWidgetDemoCta')}
                        </button>
                        <button className="vcw-retry" onClick={resetToIdle}>{t('callWidgetRetry')}</button>
                    </div>
                )}

                {phase === 'error' && (
                    <div className="vcw-panel vcw-error">
                        <h3 className="vcw-title">{t('callWidgetErrorTitle')}</h3>
                        <p className="vcw-sub">{t(errKey || 'callWidgetErrGeneric')}</p>
                        <button className="vcw-cta" onClick={resetToIdle}>{t('callWidgetRetry')}</button>
                        <button className="vcw-retry" onClick={goToDemo}>{t('callWidgetDemoCta')}</button>
                    </div>
                )}

                {/* Interaction-only Turnstile: invisible unless a challenge is required. */}
                <div className="vcw-turnstile" ref={tsContainerRef} />
            </div>
        </div>
    );
};

export default VoiceCallWidget;
