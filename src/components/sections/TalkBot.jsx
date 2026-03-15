import "./TalkBot.css";
import { useLanguage } from '../../context/LanguageContext';

const TalkBot = () => {
    const { t } = useLanguage();

    return (
        <div className="talkbot-section">
            <div className="talkbot-container">
                <a href="#demo" className="talkbot-visual-link">
                    <div className="talkbot-orb">
                        <div className="talkbot-orb-glow" />
                        <div className="waveform">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="waveform-bar" />
                            ))}
                        </div>
                    </div>
                </a>
                <h2 className="talkbot-title">{t('talkBotTitle')}</h2>
                <p className="talkbot-subtitle">{t('talkBotSubtitle')}</p>
                <a href="#demo" className="talkbot-cta">
                    <span className="talkbot-cta-dot" />
                    {t('talkBotButton')}
                </a>
            </div>
        </div>
    );
};

export default TalkBot;
