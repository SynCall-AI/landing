import "./Hero.css";
import { useLanguage } from '../../context/LanguageContext';
import VoiceCallWidget from './VoiceCallWidget.jsx';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <div id="home" className="hero-main">
            <div className="hero-content">
                <div className="hero-left">
                    <div className="hero-eyebrow animate-in">
                        <span className="hero-eyebrow-dot" />
                        {t('heroBadge')}
                    </div>

                    <h1 className="hero-title animate-in animate-in-delay-1">
                        {t('heroTitle')}
                    </h1>

                    <p className="hero-subtitle animate-in animate-in-delay-2">
                        {t('heroSubtitle')}
                    </p>

                    <div className="hero-features animate-in animate-in-delay-3">
                        <div className="hero-pill">
                            <span className="hero-pill-icon">
                                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                                    <rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.6"/>
                                    <path d="M5 11a7 7 0 0014 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                                    <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                                </svg>
                            </span>
                            {t('heroFeature1')}
                        </div>
                        <div className="hero-pill">
                            <span className="hero-pill-icon">
                                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                                    <path d="M4 5h16v11H9l-5 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            {t('heroFeature2')}
                        </div>
                        <div className="hero-pill">
                            <span className="hero-pill-icon">
                                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                                    <path d="M5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            {t('heroFeature3')}
                        </div>
                    </div>

                    <div className="hero-buttons animate-in animate-in-delay-4">
                        <a href="#demo">
                            <button className="btn-primary hero-btn">
                                {t('tryDemo')}
                            </button>
                        </a>
                        <a href="https://t.me/syncall_ai" target="_blank" rel="noopener noreferrer">
                            <button className="btn-secondary hero-btn">{t('contactSales')}</button>
                        </a>
                    </div>
                </div>

                <div className="hero-right animate-in animate-in-delay-3">
                    <VoiceCallWidget />
                </div>
            </div>
        </div>
    );
};

export default Hero;
