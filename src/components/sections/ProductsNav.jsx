import { Link } from 'react-router-dom';
import "./ProductsNav.css";
import { useLanguage } from '../../context/LanguageContext';
import { FaHeadset, FaChartLine, FaComments, FaWaveSquare, FaMicrophoneLines } from 'react-icons/fa6';

// Shared product navigator. Rendered on the home page (under the hero) and at
// the top of every product page so the four products are always one click apart.
// `active` highlights the current product: 'voice' | 'analytics' | 'stt' | 'tts'.
const PRODUCTS = [
    {
        key: 'voice',
        to: '/',
        icon: FaHeadset,
        kind: 'product',
        nameKey: 'pnVoiceName',
        descKey: 'pnVoiceDesc',
        statKey: 'pnVoiceStat',
    },
    {
        key: 'analytics',
        to: '/analytics',
        icon: FaChartLine,
        kind: 'product',
        nameKey: 'pnAnalyticsName',
        descKey: 'pnAnalyticsDesc',
        statKey: 'pnAnalyticsStat',
    },
    {
        key: 'chatbots',
        to: '/chatbots',
        icon: FaComments,
        kind: 'product',
        nameKey: 'pnChatbotsName',
        descKey: 'pnChatbotsDesc',
        statKey: 'pnChatbotsStat',
    },
    {
        key: 'stt',
        to: '/stt',
        icon: FaWaveSquare,
        kind: 'api',
        nameKey: 'pnSttName',
        descKey: 'pnSttDesc',
        statKey: 'pnSttStat',
    },
    {
        key: 'tts',
        to: '/tts',
        icon: FaMicrophoneLines,
        kind: 'api',
        nameKey: 'pnTtsName',
        descKey: 'pnTtsDesc',
        statKey: 'pnTtsStat',
    },
];

const ProductsNav = ({ active }) => {
    const { t } = useLanguage();

    return (
        <section id="products" className="pnav-section">
            <div className="pnav-container">
                <div className="pnav-header">
                    <span className="section-label">{t('pnLabel')}</span>
                    <h2 className="pnav-title">{t('pnTitle')}</h2>
                    <p className="pnav-subtitle">{t('pnSubtitle')}</p>
                </div>

                <div className="pnav-grid">
                    {PRODUCTS.map((p) => {
                        const Icon = p.icon;
                        const isActive = active === p.key;
                        return (
                            <Link
                                key={p.key}
                                to={p.to}
                                className={`pnav-card ${isActive ? 'active' : ''}`}
                            >
                                <div className="pnav-card-top">
                                    <span className="pnav-card-icon">
                                        <Icon />
                                    </span>
                                    <span className={`pnav-card-kind ${p.kind}`}>
                                        {p.kind === 'api' ? t('pnKindApi') : t('pnKindProduct')}
                                    </span>
                                </div>
                                <h3 className="pnav-card-name">{t(p.nameKey)}</h3>
                                <p className="pnav-card-desc">{t(p.descKey)}</p>
                                <div className="pnav-card-foot">
                                    <span className="pnav-card-stat">{t(p.statKey)}</span>
                                    <span className="pnav-card-arrow" aria-hidden="true">
                                        {isActive ? t('pnYouAreHere') : '→'}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProductsNav;
