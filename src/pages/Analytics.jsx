import "./Analytics.css";
import { useLanguage } from '../context/LanguageContext';
import TrustSection from '../components/sections/TrustSection.jsx';
import ProductsNav from "../components/sections/ProductsNav.jsx";
import ProductHero from "../components/sections/ProductHero.jsx";
import {
    FaTriangleExclamation, FaEyeSlash, FaUserCheck, FaBookOpen,
    FaCircleExclamation, FaChartColumn, FaServer, FaCloud,
} from 'react-icons/fa6';

const Analytics = () => {
    const { t, localePath } = useLanguage();

    const problems = [
        { icon: FaTriangleExclamation, titleKey: 'anProb1Title', descKey: 'anProb1Desc' },
        { icon: FaEyeSlash, titleKey: 'anProb2Title', descKey: 'anProb2Desc' },
        { icon: FaUserCheck, titleKey: 'anProb3Title', descKey: 'anProb3Desc' },
        { icon: FaBookOpen, titleKey: 'anProb4Title', descKey: 'anProb4Desc' },
        { icon: FaCircleExclamation, titleKey: 'anProb5Title', descKey: 'anProb5Desc' },
        { icon: FaChartColumn, titleKey: 'anProb6Title', descKey: 'anProb6Desc' },
    ];

    const pipeline = [
        { n: 1, titleKey: 'anPipe1Title', descKey: 'anPipe1Desc' },
        { n: 2, titleKey: 'anPipe2Title', descKey: 'anPipe2Desc' },
        { n: 3, titleKey: 'anPipe3Title', descKey: 'anPipe3Desc' },
        { n: 4, titleKey: 'anPipe4Title', descKey: 'anPipe4Desc' },
        { n: 5, titleKey: 'anPipe5Title', descKey: 'anPipe5Desc' },
    ];

    const scoreRows = [
        { labelKey: 'anScoreRow1', value: 96 },
        { labelKey: 'anScoreRow2', value: 88 },
        { labelKey: 'anScoreRow3', value: 91 },
        { labelKey: 'anScoreRow4', value: 84 },
    ];

    return (
        <main id="main-content" tabIndex="-1" className="an-page">
            <ProductHero
                badge={t('anBadge')}
                kind="product"
                title={t('anHeroTitle')}
                subtitle={t('anHeroSubtitle')}
                primaryCta={t('anHeroCta')}
                primaryHref={`${localePath('/')}?intent=trial&product=analytics#contact`}
                secondaryCta={t('anHeroCta2')}
                secondaryHref="#example-report"
            >
                <div className="an-hero-card" id="example-report" tabIndex="-1">
                    <p className="an-example-label">{t('analyticsExample')}</p>
                    <div className="an-hc-head">
                        <span className="an-hc-dot" />
                        <span className="an-hc-title">{t('anScoreCardTitle')}</span>
                        <span className="an-hc-score">92</span>
                    </div>
                    <div className="an-hc-rows">
                        {scoreRows.map((r) => (
                            <div key={r.labelKey} className="an-hc-row">
                                <span className="an-hc-label">{t(r.labelKey)}</span>
                                <span className="an-hc-track">
                                    <span className="an-hc-fill" style={{ width: `${r.value}%` }} />
                                </span>
                                <span className="an-hc-val">{r.value}%</span>
                            </div>
                        ))}
                    </div>
                    <div className="an-hc-foot">
                        <span className="an-hc-tag ok">{t('anScoreTagOk')}</span>
                        <span className="an-hc-tag warn">{t('anScoreTagWarn')}</span>
                    </div>
                </div>
            </ProductHero>

            <ProductsNav active="analytics" />

            {/* Problem: you only hear 3-5% */}
            <section className="an-section">
                <div className="an-container">
                    <div className="an-head">
                        <span className="section-label">{t('anProblemLabel')}</span>
                        <h2 className="an-h2">
                            {t('anProblemTitlePre')} {t('anProblemTitlePost')}
                        </h2>
                    </div>
                    <div className="an-problem-grid">
                        {problems.map((p) => {
                            const Icon = p.icon;
                            return (
                                <div key={p.titleKey} className="an-problem-card">
                                    <span className="an-problem-icon"><Icon /></span>
                                    <h3>{t(p.titleKey)}</h3>
                                    <p>{t(p.descKey)}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Pipeline: from call to report in minutes */}
            <section className="an-section an-section-alt">
                <div className="an-container">
                    <div className="an-head">
                        <span className="section-label">{t('anPipeLabel')}</span>
                        <h2 className="an-h2">{t('anPipeTitle')}</h2>
                        <p className="an-sub">{t('anPipeSubtitle')}</p>
                    </div>
                    <div className="an-pipe">
                        {pipeline.map((s, i) => (
                            <div key={s.n} className="an-pipe-step">
                                <div className="an-pipe-node">{s.n}</div>
                                <div className="an-pipe-body">
                                    <h3>{t(s.titleKey)}</h3>
                                    <p>{t(s.descKey)}</p>
                                </div>
                                {i < pipeline.length - 1 && <span className="an-pipe-conn" aria-hidden="true" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <TrustSection product="analytics" />

            {/* Deployment — on-premise available */}
            <section className="an-section">
                <div className="an-container">
                    <div className="an-deploy-band">
                        <div className="an-deploy-icon"><FaServer /></div>
                        <div className="an-deploy-text">
                            <span className="section-label">{t('anDeployLabel')}</span>
                            <h2 className="an-h2">{t('anDeployTitle')}</h2>
                            <p className="an-sub">{t('anDeploySubtitle')}</p>
                            <div className="an-deploy-pills">
                                <span className="an-deploy-pill"><FaCloud /> {t('anDeployCloud')}</span>
                                <span className="an-deploy-pill accent"><FaServer /> {t('anDeployOnprem')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="an-cta">
                <div className="an-cta-inner">
                    <h2>{t('anCtaTitle')}</h2>
                    <p>{t('anCtaSubtitle')}</p>
                    <a className="btn-primary an-cta-btn" href={`${localePath('/')}?intent=trial&product=analytics#contact`}>
                        {t('anHeroCta')} <span aria-hidden="true">→</span>
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Analytics;
