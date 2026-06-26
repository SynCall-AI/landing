import { useState, useRef, useEffect } from 'react';
import "./Demo.css";
import { useLanguage } from '../../context/LanguageContext';
import { transcribeAudio, isSttLive } from '../../lib/api';
import { FaMicrophone, FaStop, FaArrowUpFromBracket, FaWandMagicSparkles, FaCircleCheck } from 'react-icons/fa6';

const LANGS = [
    { code: 'auto', label: 'Auto' },
    { code: 'uz', label: "O'zbekcha" },
    { code: 'ru', label: 'Русский' },
    { code: 'en', label: 'English' },
];

const SAMPLE = { src: '/1_poytaxt_uz_incoming.wav', name: 'poytaxt_sample.wav', lang: 'uz' };

const SttDemo = () => {
    const { t } = useLanguage();
    const [lang, setLang] = useState('auto');
    const [audio, setAudio] = useState(null); // { blob, name }
    const [recording, setRecording] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | loading | done | error
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const mediaRef = useRef(null);
    const chunksRef = useRef([]);

    useEffect(() => () => {
        if (mediaRef.current && mediaRef.current.state !== 'inactive') {
            mediaRef.current.stop();
        }
    }, []);

    const reset = () => {
        setStatus('idle');
        setResult(null);
        setError('');
    };

    const startRecording = async () => {
        reset();
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mr = new MediaRecorder(stream);
            chunksRef.current = [];
            mr.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
            mr.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setAudio({ blob, name: 'recording.webm' });
                stream.getTracks().forEach((tk) => tk.stop());
            };
            mediaRef.current = mr;
            mr.start();
            setRecording(true);
        } catch {
            setError(t('demoMicError'));
            setStatus('error');
        }
    };

    const stopRecording = () => {
        if (mediaRef.current && mediaRef.current.state !== 'inactive') {
            mediaRef.current.stop();
        }
        setRecording(false);
    };

    const onUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            reset();
            setAudio({ blob: file, name: file.name });
        }
    };

    const loadSample = async () => {
        reset();
        const res = await fetch(SAMPLE.src);
        const blob = await res.blob();
        setAudio({ blob, name: SAMPLE.name });
        setLang(SAMPLE.lang);
    };

    const runTranscribe = async () => {
        if (!audio) return;
        setStatus('loading');
        setError('');
        try {
            const out = await transcribeAudio(audio.blob, { language: lang });
            setResult(out);
            setStatus('done');
        } catch {
            setError(t('demoApiError'));
            setStatus('error');
        }
    };

    return (
        <div className="demo-card">
            <div className="demo-card-head">
                <div className="demo-card-titles">
                    <h3>{t('sttDemoTitle')}</h3>
                    <p>{t('sttDemoSubtitle')}</p>
                </div>
                <span className={`demo-mode-badge ${isSttLive ? 'live' : 'mock'}`}>
                    {isSttLive ? t('demoModeLive') : t('demoModeSample')}
                </span>
            </div>

            <div className="demo-field">
                <label className="demo-label">{t('sttLangLabel')}</label>
                <div className="demo-seg">
                    {LANGS.map((l) => (
                        <button
                            key={l.code}
                            className={`demo-seg-btn ${lang === l.code ? 'active' : ''}`}
                            onClick={() => setLang(l.code)}
                            type="button"
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="demo-field">
                <label className="demo-label">{t('sttInputLabel')}</label>
                <div className="demo-input-row">
                    {!recording ? (
                        <button className="demo-action" onClick={startRecording} type="button">
                            <FaMicrophone /> {t('sttRecord')}
                        </button>
                    ) : (
                        <button className="demo-action recording" onClick={stopRecording} type="button">
                            <FaStop /> {t('sttStop')}
                        </button>
                    )}
                    <label className="demo-action" role="button">
                        <FaArrowUpFromBracket /> {t('sttUpload')}
                        <input type="file" accept="audio/*" onChange={onUpload} hidden />
                    </label>
                    <button className="demo-action ghost" onClick={loadSample} type="button">
                        {t('sttSample')}
                    </button>
                </div>
                {audio && (
                    <div className="demo-file-chip">
                        <FaCircleCheck /> {audio.name}
                    </div>
                )}
            </div>

            <button
                className="btn-primary demo-run"
                onClick={runTranscribe}
                disabled={!audio || status === 'loading'}
                type="button"
            >
                {status === 'loading' ? (
                    <><span className="demo-spinner" /> {t('sttRunning')}</>
                ) : (
                    <><FaWandMagicSparkles /> {t('sttRun')}</>
                )}
            </button>

            {error && <div className="demo-error">{error}</div>}

            {status === 'done' && result && (
                <div className="demo-result">
                    <div className="demo-result-head">
                        <span className="demo-result-label">{t('sttResultLabel')}</span>
                        <div className="demo-result-meta">
                            <span className="demo-chip">{result.languageLabel}</span>
                            <span className="demo-chip accent">
                                {Math.round(result.confidence * 100)}% {t('sttConfidence')}
                            </span>
                        </div>
                    </div>
                    <p className="demo-transcript">{result.text}</p>
                    {result.mock && <p className="demo-note">{t('demoSampleNote')}</p>}
                </div>
            )}
        </div>
    );
};

export default SttDemo;
