import { useState, useRef, useEffect } from 'react';
import './VoiceCallWidget.css';
import { useLanguage } from '../../context/LanguageContext';
import { submitLead } from '../../lib/api';

// Hero lead-capture widget. The visitor leaves a phone number expecting a
// callback; we save the lead, mock an outbound dial, then "fail" with a busy
// line and route them to the demo recordings so they hear the agent anyway.
const VoiceCallWidget = () => {
    const { t, language } = useLanguage();
    const [state, setState] = useState('idle'); // idle | dialing | error
    const [phone, setPhone] = useState('');
    const [err, setErr] = useState('');
    const timers = useRef([]);

    useEffect(() => () => timers.current.forEach(clearTimeout), []);

    const digits = phone.replace(/\D/g, '');
    const valid = digits.length >= 9;

    const handleCall = async (e) => {
        e.preventDefault();
        if (!valid) {
            setErr(t('callWidgetInvalidPhone'));
            return;
        }
        setErr('');
        setState('dialing');

        const fullPhone = '+998' + digits.slice(-9);
        try {
            await submitLead({ phone: fullPhone, language, source: 'hero_call_widget' });
        } catch {
            /* network/CRM hiccup — still take them to the demo */
        }

        timers.current.push(setTimeout(() => setState('error'), 2600));
    };

    const goToDemo = () => {
        const el = document.getElementById('demo');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const reset = () => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
        setState('idle');
    };

    const onPhoneChange = (e) => {
        setPhone(e.target.value.replace(/[^\d\s]/g, ''));
        if (err) setErr('');
    };

    return (
        <div className="vcw" data-state={state}>
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
                {state === 'idle' && (
                    <form className="vcw-panel" onSubmit={handleCall}>
                        <h3 className="vcw-title">{t('callWidgetTitle')}</h3>
                        <p className="vcw-sub">{t('callWidgetSubtitle')}</p>

                        <div className="vcw-input-row">
                            <span className="vcw-prefix">+998</span>
                            <input
                                className="vcw-input"
                                type="tel"
                                inputMode="numeric"
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

                {state === 'dialing' && (
                    <div className="vcw-panel vcw-dialing">
                        <span className="vcw-dialing-status">
                            {t('callWidgetDialing')}
                            <span className="vcw-dots"><i /><i /><i /></span>
                        </span>
                        <span className="vcw-sub">{t('callWidgetConnecting')}</span>
                        <div className="vcw-controls">
                            <button className="vcw-hangup" onClick={reset} aria-label="Cancel call">
                                <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                                    <path d="M5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"
                                          stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {state === 'error' && (
                    <div className="vcw-panel vcw-error">
                        <h3 className="vcw-title">{t('callWidgetErrorTitle')}</h3>
                        <p className="vcw-sub">{t('callWidgetErrorSubtitle')}</p>
                        <button className="vcw-cta" onClick={goToDemo}>
                            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                                <path d="M8 5v14l11-7-11-7z" fill="currentColor"/>
                            </svg>
                            {t('callWidgetDemoCta')}
                        </button>
                        <button className="vcw-retry" onClick={reset}>{t('callWidgetRetry')}</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VoiceCallWidget;
