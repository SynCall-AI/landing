import "./Hero.css";
import { useLanguage } from '../../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <div id="home" className="hero-main">
            {/* Ambient gradient blobs */}
            <div className="hero-glow hero-glow-1" />
            <div className="hero-glow hero-glow-2" />
            <div className="hero-glow hero-glow-3" />

            {/* Dot grid pattern */}
            <div className="hero-grid" />

            <div className="hero-content">
                {/* Animated badge with rotating border */}
                <div className="hero-badge animate-in">
                    <div className="hero-badge-border" />
                    <div className="hero-badge-inner">
                        <span className="hero-badge-dot" />
                        {t('heroBadge')}
                    </div>
                </div>

                <h1 className="hero-title animate-in animate-in-delay-1">
                    {t('heroTitle')}
                </h1>

                <p className="hero-subtitle animate-in animate-in-delay-2">
                    {t('heroSubtitle')}
                </p>

                <div className="hero-features animate-in animate-in-delay-3">
                    <div className="hero-pill">
                        <span className="hero-pill-icon">🧠</span>
                        {t('heroFeature1')}
                    </div>
                    <div className="hero-pill">
                        <span className="hero-pill-icon">&#128172;</span>
                        {t('heroFeature2')}
                    </div>
                    <div className="hero-pill">
                        <span className="hero-pill-icon">📞</span>
                        {t('heroFeature3')}
                    </div>
                </div>

                <div className="hero-buttons animate-in animate-in-delay-4">
                    <a href="#demo">
                        <button className="btn-primary hero-btn">
                            {t('tryDemo')}
                            <span className="btn-shine" />
                        </button>
                    </a>
                    <a href="mailto:david@syncallai.com">
                        <button className="btn-secondary hero-btn">{t('contactSales')}</button>
                    </a>
                </div>
            </div>

            {/* Floating UI cards for visual richness */}
            <div className="hero-floating hero-float-left animate-in animate-in-delay-5" style={{animationName: 'slideInLeft'}}>
                <div className="hero-float-card">
                    <div className="float-card-bar" />
                    <div className="float-card-bar short" />
                    <div className="float-card-dot-row">
                        <span className="fcd green" />
                        <span className="fcd-label">98.7% resolved</span>
                    </div>
                </div>
            </div>
            <div className="hero-floating hero-float-right animate-in animate-in-delay-5" style={{animationName: 'slideInRight'}}>
                <div className="hero-float-card">
                    <div className="float-card-wave">
                        <svg viewBox="0 0 120 40" fill="none">
                            <path d="M0 30 Q15 10 30 25 T60 20 T90 25 T120 15" stroke="#1173FC" strokeWidth="2" fill="none" opacity="0.6"/>
                            <path d="M0 32 Q15 15 30 28 T60 22 T90 28 T120 18" stroke="#8B5CF6" strokeWidth="1.5" fill="none" opacity="0.4"/>
                        </svg>
                    </div>
                    <div className="float-card-dot-row">
                        <span className="fcd blue" />
                        <span className="fcd-label">Live call analysis</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
