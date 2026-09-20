import { Phone, Play, ArrowDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import VoiceCallWidget from './VoiceCallWidget';
import './Hero.css';

export default function Hero() {
    const { t } = useLanguage();
    return (
        <section id="home" className="hero-main" aria-labelledby="hero-heading">
            <div className="hero-content">
                <div className="hero-left">
                    <span className="hero-eyebrow"><span className="hero-eyebrow-dot" />{t('heroBadge')}</span>
                    <h1 id="hero-heading" className="hero-title">{t('heroTitle')}</h1>
                    <p className="hero-subtitle">{t('heroSubtitle')}</p>
                    <p className="hero-language">{t('heroLanguageNote')}</p>
                    <div className="hero-buttons">
                        <a className="btn-primary hero-btn" href="#live-demo"><Phone size={18} aria-hidden="true" />{t('heroTryLive')}</a>
                        <a className="hero-listen-link" href="#demo"><Play size={16} aria-hidden="true" />{t('tryDemo')}</a>
                    </div>
                    <a className="hero-more" href="#capabilities">{t('heroSeeExamples')}<ArrowDown size={16} aria-hidden="true" /></a>
                </div>
                <div id="live-demo" tabIndex="-1" className="hero-right" aria-label={t('callWidgetTitle')}>
                    <VoiceCallWidget />
                </div>
            </div>
        </section>
    );
}
