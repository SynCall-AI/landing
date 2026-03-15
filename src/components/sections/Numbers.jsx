import "./Numbers.css";
import { useLanguage } from '../../context/LanguageContext';

const Numbers = () => {
    const { t } = useLanguage();

    return (
        <div className="numbers-section">
            <div className="numbers-container">
                <div className="numbers-header">
                    <span className="section-label">{t('numbersLabel')}</span>
                    <h2 className="numbers-title">{t('numbersTitle')}</h2>
                </div>

                <div className="numbers-stats">
                    <div className="number-card nc-green">
                        <div className="nc-glow" />
                        <span className="number-value">{t('numbersStat1Value')}</span>
                        <span className="number-stat-label">{t('numbersStat1Label')}</span>
                    </div>
                    <div className="number-card nc-pink">
                        <div className="nc-glow" />
                        <span className="number-value">{t('numbersStat2Value')}</span>
                        <span className="number-stat-label">{t('numbersStat2Label')}</span>
                    </div>
                    <div className="number-card nc-gold">
                        <div className="nc-glow" />
                        <span className="number-value">{t('numbersStat3Value')}</span>
                        <span className="number-stat-label">{t('numbersStat3Label')}</span>
                    </div>
                </div>

                <div className="numbers-footer">
                    <p className="numbers-desc">{t('numbersDesc')}</p>
                    <a href="mailto:david@syncallai.com" className="numbers-cta">
                        <button className="btn-primary numbers-btn">
                            {t('getStarted')} <span className="arrow-icon">&rarr;</span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Numbers;
