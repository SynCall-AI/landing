import "./Product.css";
import "./Chatbots.css";
import { useLanguage } from '../context/LanguageContext';
import ProductsNav from "../components/sections/ProductsNav.jsx";
import ProductHero from "../components/sections/ProductHero.jsx";
import { FaServer, FaShieldHalved, FaComments, FaDatabase, FaLock, FaLanguage } from 'react-icons/fa6';

const Chatbots = () => {
    const { t } = useLanguage();

    const caps = [
        { icon: FaServer, titleKey: 'cbCap1Title', descKey: 'cbCap1Desc' },
        { icon: FaShieldHalved, titleKey: 'cbCap2Title', descKey: 'cbCap2Desc' },
        { icon: FaComments, titleKey: 'cbCap3Title', descKey: 'cbCap3Desc' },
        { icon: FaDatabase, titleKey: 'cbCap4Title', descKey: 'cbCap4Desc' },
        { icon: FaLanguage, titleKey: 'cbCap5Title', descKey: 'cbCap5Desc' },
        { icon: FaLock, titleKey: 'cbCap6Title', descKey: 'cbCap6Desc' },
    ];

    return (
        <main className="prod-page">
            <ProductHero
                badge={t('cbBadge')}
                kind="product"
                title={t('cbHeroTitle')}
                subtitle={t('cbHeroSubtitle')}
                primaryCta={t('cbHeroCta')}
                secondaryCta={t('cbHeroCta2')}
            >
                <div className="cb-chat">
                    <div className="cb-chat-head">
                        <span className="cb-chat-avatar">AI</span>
                        <div className="cb-chat-id">
                            <span className="cb-chat-name">Syncall Bot</span>
                            <span className="cb-chat-status">
                                <span className="cb-chat-dot" /> {t('cbChatOnPrem')}
                            </span>
                        </div>
                        <span className="cb-chat-lock"><FaLock /> {t('cbChatEncrypted')}</span>
                    </div>
                    <div className="cb-chat-body">
                        <div className="cb-msg user">{t('cbChatMsg1')}</div>
                        <div className="cb-msg bot">{t('cbChatMsg2')}</div>
                        <div className="cb-msg user">{t('cbChatMsg3')}</div>
                        <div className="cb-msg bot">{t('cbChatMsg4')}</div>
                    </div>
                    <div className="cb-chat-foot">
                        <span className="cb-chat-input">{t('cbChatPlaceholder')}</span>
                        <span className="cb-chat-send" aria-hidden="true">➤</span>
                    </div>
                </div>
            </ProductHero>

            <ProductsNav active="chatbots" />

            <section className="prod-specs">
                <div className="prod-specs-inner">
                    <div className="prod-spec"><span className="prod-spec-val">On-Prem</span><span className="prod-spec-label">{t('cbSpec1')}</span></div>
                    <div className="prod-spec"><span className="prod-spec-val">0</span><span className="prod-spec-label">{t('cbSpec2')}</span></div>
                    <div className="prod-spec"><span className="prod-spec-val">UZ·RU·EN</span><span className="prod-spec-label">{t('cbSpec3')}</span></div>
                    <div className="prod-spec"><span className="prod-spec-val">24/7</span><span className="prod-spec-label">{t('cbSpec4')}</span></div>
                </div>
            </section>

            {/* Why on-premise — the core differentiator */}
            <section className="prod-section">
                <div className="prod-container">
                    <div className="prod-head">
                        <span className="section-label">{t('cbWhyLabel')}</span>
                        <h2 className="prod-h2">{t('cbWhyTitle')}</h2>
                        <p className="prod-sub">{t('cbWhySubtitle')}</p>
                    </div>
                    <div className="cb-deploy">
                        <div className="cb-deploy-card cloud">
                            <span className="cb-deploy-tag">{t('cbDeployCloudTag')}</span>
                            <h3>{t('cbDeployCloudTitle')}</h3>
                            <ul>
                                <li>{t('cbDeployCloud1')}</li>
                                <li>{t('cbDeployCloud2')}</li>
                                <li>{t('cbDeployCloud3')}</li>
                            </ul>
                        </div>
                        <div className="cb-deploy-card onprem">
                            <span className="cb-deploy-tag accent">{t('cbDeployOnpremTag')}</span>
                            <h3>{t('cbDeployOnpremTitle')}</h3>
                            <ul>
                                <li>{t('cbDeployOnprem1')}</li>
                                <li>{t('cbDeployOnprem2')}</li>
                                <li>{t('cbDeployOnprem3')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities */}
            <section className="prod-section prod-section-alt">
                <div className="prod-container">
                    <div className="prod-head">
                        <span className="section-label">{t('cbCapsLabel')}</span>
                        <h2 className="prod-h2">{t('cbCapsTitle')}</h2>
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

            {/* Use cases */}
            <section className="prod-section">
                <div className="prod-container">
                    <div className="prod-head">
                        <span className="section-label">{t('cbUseLabel')}</span>
                        <h2 className="prod-h2">{t('cbUseTitle')}</h2>
                    </div>
                    <div className="prod-steps">
                        <div className="prod-step"><span className="prod-step-n">01</span><h3>{t('cbUse1Title')}</h3><p>{t('cbUse1Desc')}</p></div>
                        <div className="prod-step"><span className="prod-step-n">02</span><h3>{t('cbUse2Title')}</h3><p>{t('cbUse2Desc')}</p></div>
                        <div className="prod-step"><span className="prod-step-n">03</span><h3>{t('cbUse3Title')}</h3><p>{t('cbUse3Desc')}</p></div>
                    </div>
                </div>
            </section>

            <section className="prod-cta">
                <div className="prod-cta-inner">
                    <h2>{t('cbCtaTitle')}</h2>
                    <p>{t('cbCtaSubtitle')}</p>
                    <a href="https://t.me/syncall_ai" target="_blank" rel="noopener noreferrer">
                        <button className="btn-primary prod-cta-btn">{t('cbHeroCta')} <span>→</span></button>
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Chatbots;
