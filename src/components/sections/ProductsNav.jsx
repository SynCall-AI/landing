import { createElement } from 'react';
import { Link } from 'react-router-dom';
import './ProductsNav.css';
import { useLanguage } from '../../context/LanguageContext';
import { FaHeadset, FaChartLine, FaComments } from 'react-icons/fa6';

const PRODUCTS = [
    { key: 'voice', to: '/', icon: FaHeadset, name: 'pnVoiceName', description: 'pnVoiceDesc' },
    { key: 'analytics', to: '/analytics', icon: FaChartLine, name: 'pnAnalyticsName', description: 'pnAnalyticsDesc' },
    { key: 'chatbots', to: '/chatbots', icon: FaComments, name: 'pnChatbotsName', description: 'pnChatbotsDesc' },
];

const ProductsNav = ({ active, home = false }) => {
    const { t, localePath } = useLanguage();
    return (
        <section id="products" className="pnav-section" aria-labelledby="products-heading">
            <div className="pnav-container">
                <div className="pnav-header">
                                        <h2 id="products-heading" className="pnav-title">{t(home ? 'pnHomeTitle' : 'pnTitle')}</h2>
                </div>
                <div className={`pnav-grid ${home ? 'pnav-grid-pair' : ''}`}>
                    {PRODUCTS.filter((item) => !home || item.key !== 'voice').map(({ key, to, icon: Icon, name, description }) => (
                        <Link key={key} to={localePath(to)} className={`pnav-card ${active === key ? 'active' : ''}`} aria-current={active === key ? 'page' : undefined}>
                            <span className="pnav-card-icon">{createElement(Icon, { 'aria-hidden': true })}</span>
                            <h3 className="pnav-card-name">{t(name)}</h3>
                            <p className="pnav-card-desc">{t(description)}</p>
                            <span className="pnav-card-foot">{t(active === key ? 'pnYouAreHere' : 'viewSolution')}</span>
                        </Link>
                    ))}
                </div>
                <aside className="studio-strip" aria-labelledby="studio-strip-heading">
                    <div>
                        <h3 id="studio-strip-heading">{t('studioStripTitle')}</h3>
                        <p>{t('studioStripBody')}</p>
                    </div>
                    <div className="studio-strip-links">
                        <Link to={localePath('/cabinet/stt')}>{t('studioStt')}</Link>
                        <Link to={localePath('/cabinet/tts')}>{t('studioTts')}</Link>
                    </div>
                </aside>
            </div>
        </section>
    );
};
export default ProductsNav;
