import "./Product.css";
import { useLanguage } from '../context/LanguageContext';
import ProductsNav from "../components/sections/ProductsNav.jsx";
import ProductHero from "../components/sections/ProductHero.jsx";
import TtsDemo from "../components/demos/TtsDemo.jsx";
import { FaClone, FaWaveSquare, FaSliders, FaBolt } from 'react-icons/fa6';

const Tts = () => {
    const { t } = useLanguage();

    const caps = [
        { icon: FaClone, titleKey: 'ttsCap1Title', descKey: 'ttsCap1Desc' },
        { icon: FaWaveSquare, titleKey: 'ttsCap2Title', descKey: 'ttsCap2Desc' },
        { icon: FaSliders, titleKey: 'ttsCap3Title', descKey: 'ttsCap3Desc' },
        { icon: FaBolt, titleKey: 'ttsCap4Title', descKey: 'ttsCap4Desc' },
    ];

    return (
        <main className="prod-page">
            <ProductHero
                badge={t('ttsBadge')}
                kind="api"
                title={t('ttsHeroTitle')}
                subtitle={t('ttsHeroSubtitle')}
                primaryCta={t('ttsHeroCta')}
                secondaryCta={t('demoCtaSecondary')}
            >
                <TtsDemo />
            </ProductHero>

            <ProductsNav active="tts" />

            <section className="prod-specs">
                <div className="prod-specs-inner">
                    <div className="prod-spec"><span className="prod-spec-val">&lt;200ms</span><span className="prod-spec-label">{t('ttsSpec1')}</span></div>
                    <div className="prod-spec"><span className="prod-spec-val">99.2%</span><span className="prod-spec-label">{t('ttsSpec2')}</span></div>
                    <div className="prod-spec"><span className="prod-spec-val">24kHz</span><span className="prod-spec-label">{t('ttsSpec3')}</span></div>
                    <div className="prod-spec"><span className="prod-spec-val">UZ·RU·EN</span><span className="prod-spec-label">{t('ttsSpec4')}</span></div>
                </div>
            </section>

            <section className="prod-section">
                <div className="prod-container">
                    <div className="prod-head">
                        <span className="section-label">{t('ttsCapsLabel')}</span>
                        <h2 className="prod-h2">{t('ttsCapsTitle')}</h2>
                    </div>
                    <div className="prod-grid">
                        {caps.map((c) => {
                            const Icon = c.icon;
                            return (
                                <div key={c.titleKey} className="prod-cap">
                                    <span className="prod-cap-icon"><Icon /></span>
                                    <div className="prod-cap-body">
                                        <h3>{t(c.titleKey)}</h3>
                                        <p>{t(c.descKey)}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="prod-section prod-section-alt">
                <div className="prod-container">
                    <div className="prod-head">
                        <span className="section-label">{t('ttsUseLabel')}</span>
                        <h2 className="prod-h2">{t('ttsUseTitle')}</h2>
                    </div>
                    <div className="prod-steps">
                        <div className="prod-step"><span className="prod-step-n">01</span><h3>{t('ttsUse1Title')}</h3><p>{t('ttsUse1Desc')}</p></div>
                        <div className="prod-step"><span className="prod-step-n">02</span><h3>{t('ttsUse2Title')}</h3><p>{t('ttsUse2Desc')}</p></div>
                        <div className="prod-step"><span className="prod-step-n">03</span><h3>{t('ttsUse3Title')}</h3><p>{t('ttsUse3Desc')}</p></div>
                    </div>
                </div>
            </section>

            <section className="prod-cta">
                <div className="prod-cta-inner">
                    <h2>{t('ttsCtaTitle')}</h2>
                    <p>{t('ttsCtaSubtitle')}</p>
                    <a href="https://t.me/syncall_ai" target="_blank" rel="noopener noreferrer">
                        <button className="btn-primary prod-cta-btn">{t('ttsHeroCta')} <span>→</span></button>
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Tts;
