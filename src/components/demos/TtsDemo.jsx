import { useState, useRef, useEffect } from 'react';
import "./Demo.css";
import { useLanguage } from '../../context/LanguageContext';
import { synthesizeSpeech, isTtsLive } from '../../lib/api';
import { FaWandMagicSparkles, FaPlay, FaPause } from 'react-icons/fa6';

const VOICES = [
    { id: 'aziza', nameKey: 'ttsVoiceAziza', lang: 'UZ' },
    { id: 'jahongir', nameKey: 'ttsVoiceJahongir', lang: 'UZ' },
    { id: 'dmitry', nameKey: 'ttsVoiceDmitry', lang: 'RU' },
    { id: 'emma', nameKey: 'ttsVoiceEmma', lang: 'EN' },
];

const MAX = 300;

const TtsDemo = () => {
    const { t } = useLanguage();
    const [voice, setVoice] = useState('aziza');
    const [text, setText] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | done | error
    const [result, setResult] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [error, setError] = useState('');
    const audioRef = useRef(null);

    useEffect(() => {
        // Clean up any object URL created for live (non-mock) audio.
        return () => {
            if (result?.revoke) result.revoke();
        };
    }, [result]);

    const samplePrompts = {
        aziza: t('ttsSampleUz'),
        jahongir: t('ttsSampleUz'),
        dmitry: t('ttsSampleRu'),
        emma: t('ttsSampleEn'),
    };

    const runSynthesize = async () => {
        const value = text.trim() || samplePrompts[voice];
        if (!value) return;
        setStatus('loading');
        setError('');
        setPlaying(false);
        if (result?.revoke) result.revoke();
        try {
            const out = await synthesizeSpeech(value, { voice });
            setResult(out);
            setStatus('done');
            // Let the audio element mount, then play.
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
                }
            }, 50);
        } catch {
            setError(t('demoApiError'));
            setStatus('error');
        }
    };

    const togglePlay = () => {
        const el = audioRef.current;
        if (!el) return;
        if (el.paused) {
            el.play();
            setPlaying(true);
        } else {
            el.pause();
            setPlaying(false);
        }
    };

    return (
        <div className="demo-card">
            <div className="demo-card-head">
                <div className="demo-card-titles">
                    <h3>{t('ttsDemoTitle')}</h3>
                    <p>{t('ttsDemoSubtitle')}</p>
                </div>
                <span className={`demo-mode-badge ${isTtsLive ? 'live' : 'mock'}`}>
                    {isTtsLive ? t('demoModeLive') : t('demoModeSample')}
                </span>
            </div>

            <div className="demo-field">
                <label className="demo-label">{t('ttsVoiceLabel')}</label>
                <div className="demo-voice-grid">
                    {VOICES.map((v) => (
                        <button
                            key={v.id}
                            className={`demo-voice-btn ${voice === v.id ? 'active' : ''}`}
                            onClick={() => setVoice(v.id)}
                            type="button"
                        >
                            <span className="demo-voice-name">{t(v.nameKey)}</span>
                            <span className="demo-voice-lang">{v.lang}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="demo-field">
                <label className="demo-label">{t('ttsTextLabel')}</label>
                <textarea
                    className="demo-textarea"
                    value={text}
                    maxLength={MAX}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={samplePrompts[voice]}
                    rows={3}
                />
                <div className="demo-textarea-foot">
                    <button className="demo-link" type="button" onClick={() => setText(samplePrompts[voice])}>
                        {t('ttsUseSample')}
                    </button>
                    <span className="demo-count">{text.length}/{MAX}</span>
                </div>
            </div>

            <button
                className="btn-primary demo-run"
                onClick={runSynthesize}
                disabled={status === 'loading'}
                type="button"
            >
                {status === 'loading' ? (
                    <><span className="demo-spinner" /> {t('ttsRunning')}</>
                ) : (
                    <><FaWandMagicSparkles /> {t('ttsRun')}</>
                )}
            </button>

            {error && <div className="demo-error">{error}</div>}

            {status === 'done' && result && (
                <div className="demo-result">
                    <div className="demo-player-row">
                        <button className="demo-play-btn" onClick={togglePlay} type="button" aria-label="Play">
                            {playing ? <FaPause /> : <FaPlay />}
                        </button>
                        <div className="demo-player-wave">
                            {Array.from({ length: 28 }).map((_, i) => (
                                <span
                                    key={i}
                                    className={`demo-wave-bar ${playing ? 'live' : ''}`}
                                    style={{ height: `${20 + Math.abs(Math.sin(i * 0.9)) * 70}%`, animationDelay: `${i * 0.04}s` }}
                                />
                            ))}
                        </div>
                        <span className="demo-chip accent">{t(VOICES.find((v) => v.id === voice).nameKey)}</span>
                    </div>
                    <audio
                        ref={audioRef}
                        src={result.audioUrl}
                        onEnded={() => setPlaying(false)}
                        onPause={() => setPlaying(false)}
                        onPlay={() => setPlaying(true)}
                        hidden
                    />
                    {result.mock && <p className="demo-note">{t('demoSampleNote')}</p>}
                </div>
            )}
        </div>
    );
};

export default TtsDemo;
