import "./Product.css";
import { useLanguage } from '../context/LanguageContext';
import ProductsNav from "../components/sections/ProductsNav.jsx";
import ProductHero from "../components/sections/ProductHero.jsx";
import SttDemo from "../components/demos/SttDemo.jsx";
import { FaLanguage, FaVolumeXmark, FaClock, FaBolt } from 'react-icons/fa6';

const Stt = () => {
    const { t } = useLanguage();

    const caps = [
        { icon: FaLanguage, titleKey: 'sttCap1Title', descKey: 'sttCap1Desc' },
        { icon: FaVolumeXmark, titleKey: 'sttCap2Title', descKey: 'sttCap2Desc' },
        { icon: FaClock, titleKey: 'sttCap3Title', descKey: 'sttCap3Desc' },
        { icon: FaBolt, titleKey: 'sttCap4Title', descKey: 'sttCap4Desc' },
    ];

    return (
        <main className="prod-page">
            <ProductHero
                badge={t('sttBadge')}
                kind="api"
                title={t('sttHeroTitle')}
                subtitle={t('sttHeroSubtitle')}
                primaryCta={t('sttHeroCta')}
                secondaryCta={t('demoCtaSecondary')}
            >
                <SttDemo />
            </ProductHero>

            <ProductsNav active="stt" />

            <section className="prod-specs">
                <div className="prod-specs-inner">
                    <div className="prod-spec"><span className="prod-spec-val">98%</span><span className="prod-spec-label">{t('sttSpec1')}</span></div>
                    <div className="prod-spec"><span className="prod-spec-val">&lt;100ms</span><span className="prod-spec-label">{t('sttSpec2')}</span></div>
                    <div className="prod-spec"><span className="prod-spec-val">UZ·RU·EN</span><span className="prod-spec-label">{t('sttSpec3')}</span></div>
                    <div className="prod-spec"><span className="prod-spec-val">24/7</span><span className="prod-spec-label">{t('sttSpec4')}</span></div>
                </div>
            </section>

            <section className="prod-section">
                <div className="prod-container">
                    <div className="prod-head">
                        <span className="section-label">{t('sttCapsLabel')}</span>
                        <h2 className="prod-h2">{t('sttCapsTitle')}</h2>
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
                        <span className="section-label">{t('sttUseLabel')}</span>
                        <h2 className="prod-h2">{t('sttUseTitle')}</h2>
                    </div>
                    <div className="prod-steps">
                        <div className="prod-step"><span className="prod-step-n">01</span><h3>{t('sttUse1Title')}</h3><p>{t('sttUse1Desc')}</p></div>
                        <div className="prod-step"><span className="prod-step-n">02</span><h3>{t('sttUse2Title')}</h3><p>{t('sttUse2Desc')}</p></div>
                        <div className="prod-step"><span className="prod-step-n">03</span><h3>{t('sttUse3Title')}</h3><p>{t('sttUse3Desc')}</p></div>
                    </div>
                </div>
            </section>

            <section className="prod-cta">
                <div className="prod-cta-inner">
                    <h2>{t('sttCtaTitle')}</h2>
                    <p>{t('sttCtaSubtitle')}</p>
                    <a href="https://t.me/syncall_ai" target="_blank" rel="noopener noreferrer">
                        <button className="btn-primary prod-cta-btn">{t('sttHeroCta')} <span>→</span></button>
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Stt;
