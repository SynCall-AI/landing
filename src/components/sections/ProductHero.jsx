import "./ProductHero.css";
import { useLanguage } from '../../context/LanguageContext';

// Consistent hero band used at the top of each product page (Analytics/STT/TTS).
const ProductHero = ({ badge, kind, title, subtitle, primaryCta, primaryHref, secondaryCta, children }) => {
    const { t, localePath } = useLanguage();
    const contactHref = `${localePath('/')}?intent=demo#contact`;

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
                        <a className="btn-primary" href={primaryHref || contactHref}>
                            {primaryCta || t('ctaDemo')}
                        </a>
                        {secondaryCta && (
                            <a className="btn-secondary" href={`${localePath('/')}?intent=trial#contact`}>
                                {secondaryCta}
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
