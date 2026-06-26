import "./ProductHero.css";
import { useLanguage } from '../../context/LanguageContext';

// Consistent hero band used at the top of each product page (Analytics/STT/TTS).
const ProductHero = ({ badge, kind, title, subtitle, primaryCta, primaryHref, secondaryCta, children }) => {
    const { t } = useLanguage();

    return (
        <header className="phero">
            <div className="phero-glow phero-glow-1" />
            <div className="phero-glow phero-glow-2" />
            <div className="phero-grid-bg" />

            <div className="phero-inner">
                <div className="phero-copy">
                    {badge && (
                        <div className="phero-badge">
                            {kind && <span className={`phero-badge-kind ${kind}`}>{kind === 'api' ? t('pnKindApi') : t('pnKindProduct')}</span>}
                            <span>{badge}</span>
                        </div>
                    )}
                    <h1 className="phero-title">{title}</h1>
                    <p className="phero-subtitle">{subtitle}</p>
                    <div className="phero-actions">
                        <a href={primaryHref || 'https://t.me/syncall_ai'} target={primaryHref ? undefined : '_blank'} rel="noopener noreferrer">
                            <button className="btn-primary">{primaryCta || t('contactSales')}</button>
                        </a>
                        {secondaryCta && (
                            <a href="https://t.me/syncall_ai" target="_blank" rel="noopener noreferrer">
                                <button className="btn-secondary">{secondaryCta}</button>
                            </a>
                        )}
                    </div>
                </div>
                {children && <div className="phero-visual">{children}</div>}
            </div>
        </header>
    );
};

export default ProductHero;
