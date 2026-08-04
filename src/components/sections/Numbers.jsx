import "./Numbers.css";
import { useLanguage } from '../../context/LanguageContext';

const METRICS = [
    { value: '95%', labelKey: 'metricAccuracy' },
    { value: '80%', labelKey: 'metricResolution' },
    { value: '−70%', labelKey: 'metricCost' },
    { value: '94%', labelKey: 'metricCsat' },
    { value: '99.2%', labelKey: 'metricVoice' },
    { value: '1000+', labelKey: 'metricScale' },
];

const LEGAL_COMMENT = '<!-- LEGAL: each metric needs a documented source/sample before public launch; product targets banking + government -->';

const Numbers = () => {
    const { t } = useLanguage();

    return (
        <section
            id="metrics"
            className="numbers-section"
            aria-labelledby="metrics-heading"
        >
            <div className="numbers-container">
                <header className="numbers-header">
                    <span className="section-label">{t('numbersLabel')}</span>
                    <h2 id="metrics-heading" className="numbers-title">
                        {t('numbersTitle')}
                    </h2>
                </header>

                {/* <!-- LEGAL: each metric needs a documented source/sample before public launch; product targets banking + government --> */}
                <span
                    hidden
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: LEGAL_COMMENT }}
                />
                <ul className="numbers-stats" aria-label={t('numbersLabel')}>
                    {METRICS.map((metric) => (
                        <li className="number-card" key={metric.labelKey}>
                            <span className="nc-glow" aria-hidden="true" />
                            <span className="number-value">{metric.value}</span>
                            <span className="number-stat-label">{t(metric.labelKey)}</span>
                        </li>
                    ))}
                </ul>

                <a className="numbers-methodology-link" href="#metrics-methodology">
                    {t('metricMethodology')}
                </a>

                <aside
                    id="metrics-methodology"
                    className="numbers-methodology"
                    aria-labelledby="metrics-methodology-heading"
                >
                    <h3 id="metrics-methodology-heading">{t('metricMethodology')}</h3>
                    <p>{t('metricMethodologyNote')}</p>
                </aside>

                <div className="numbers-footer">
                    <p className="numbers-desc">{t('numbersDesc')}</p>
                    <div className="numbers-actions">
                        <a href="#contact" className="btn-primary numbers-btn">
                            {t('ctaDemo')} <span className="arrow-icon" aria-hidden="true">&rarr;</span>
                        </a>
                        <a
                            href="https://t.me/syncall_ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="numbers-telegram"
                        >
                            {t('ctaTelegram')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Numbers;
