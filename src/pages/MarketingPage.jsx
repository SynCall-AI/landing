import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
    getRelatedMarketingPages,
    resolveMarketingPage,
    withLocalePath,
} from '../content/marketingContent.js';
import { Ambient, VoiceOrb } from '../components/landing/LandingVisuals.jsx';
import { ProductCta, ProductReveal } from '../components/products/ProductLayout.jsx';
import { productPageContent } from '../content/productPageContent.js';
import TrustSection from '../components/sections/TrustSection.jsx';
import Calllog from '../components/sections/Calllog.jsx';
import './MarketingPage.css';

function externalLinkProps(href) {
    return /^https?:\/\//.test(href)
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {};
}

const MarketingPage = ({
    path,
    locale,
    demoHref = 'https://t.me/syncall_ai',
    trialHref = 'https://t.me/syncall_ai',
}) => {
    const location = useLocation();
    const resolved = resolveMarketingPage(path || location.pathname, locale);
    const { page, ui } = resolved;
    const relatedPages = getRelatedMarketingPages(page, resolved.locale);

    if (!page) {
        return (
            <main className="lp marketing-page marketing-page--missing" id="main-content" tabIndex="-1">
                <section className="marketing-shell marketing-missing" aria-labelledby="marketing-missing-title">
                    <h1 id="marketing-missing-title">{ui.unavailableTitle}</h1>
                    <p>{ui.unavailableBody}</p>
                    <Link className="lp-button lp-button-dark" to={withLocalePath('features', resolved.locale)}>
                        {ui.backToFeatures}
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="lp pp marketing-page" id="main-content" tabIndex="-1">
            <header className="marketing-hero">
                <Ambient />
                <div className="marketing-shell marketing-hero__inner">
                    <span className="pp-eyebrow">SYNCALL · {page.eyebrow}</span>
                    <h1>{page.title}</h1>
                    <p className="marketing-lead">{page.lead}</p>
                    <div className="marketing-actions" role="group" aria-label={page.cta.title}>
                        <a
                            className="lp-button lp-hero-primary"
                            href={demoHref}
                            {...externalLinkProps(demoHref)}
                        >
                            {ui.bookDemo}<ArrowUpRight size={18} />
                        </a>
                        <a
                            className="lp-button marketing-button--secondary"
                            href={trialHref}
                            {...externalLinkProps(trialHref)}
                        >
                            {ui.startTrial}<ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </header>

            {resolved.path === 'case-studies' && <><TrustSection /><Calllog cover={<VoiceOrb />} /></>}

            {page.sections.filter(section => {
                // A text-only section repeated by the closing CTA is presented there once.
                const repeatsCta = section.title === page.cta.title && section.body.join('\n') === page.cta.body;
                return !repeatsCta || section.items?.some(item => !item.placeholder);
            }).map((section, sectionIndex) => {
                const headingId = `marketing-section-${sectionIndex}`;
                return (
                    <section
                        className={`marketing-section ${sectionIndex % 2 ? 'marketing-section--alt' : ''}`}
                        aria-labelledby={headingId}
                        key={headingId}
                    >
                        <div className="marketing-shell">
                            <ProductReveal className="marketing-section__heading">
                                <div><span className="lp-eyebrow" aria-hidden="true">0{sectionIndex + 1} / SYNCALL</span><h2 id={headingId}>{section.title}</h2></div>
                                <div className="marketing-section__intro">
                                {section.body.map((paragraph, paragraphIndex) => (
                                    <p key={`${headingId}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                                ))}
                                </div>
                            </ProductReveal>

                            {/* Placeholder cards ({{...}} mustaches) stay hidden until real,
                                approved content replaces them in marketingContent.js. */}
                            {section.items?.filter((item) => !item.placeholder).length > 0 && (
                                <div className="marketing-card-grid">
                                    {section.items.filter((item) => !item.placeholder).map((item, itemIndex) => (
                                        <ProductReveal
                                            className={`marketing-card${item.href ? ' marketing-card--linked' : ''}`}
                                            key={`${headingId}-item-${itemIndex}`}
                                        >
                                            <span className="marketing-card__number" aria-hidden="true">{String(itemIndex + 1).padStart(2, '0')}</span>
                                            <h3>{item.href ? <Link to={withLocalePath(item.href, resolved.locale)}>{item.title}<ArrowUpRight size={19} aria-hidden="true" /></Link> : item.title}</h3>
                                            <p>{item.text}</p>
                                        </ProductReveal>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                );
            })}

            {page.comparison && (
                <section className="marketing-section marketing-section--comparison" aria-labelledby="marketing-comparison-heading">
                    <div className="marketing-shell">
                        <div className="marketing-section__heading">
                            <h2 id="marketing-comparison-heading">{page.comparison.title}</h2>
                        </div>
                        <div
                            className="marketing-table-wrap"
                            role="region"
                            aria-label={page.comparison.title}
                            tabIndex="0"
                        >
                            <table className="marketing-table">
                                <caption>{page.comparison.caption}</caption>
                                <thead>
                                    <tr>
                                        {page.comparison.columns.map((column) => <th scope="col" key={column}>{column}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {page.comparison.rows.map((row) => (
                                        <tr key={row[0]}>
                                            <th scope="row">{row[0]}</th>
                                            <td>{row[1]}</td>
                                            <td>{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="marketing-table-note">{page.comparison.note}</p>
                    </div>
                </section>
            )}

            {page.sources && (
                <aside className="marketing-sources" aria-labelledby="marketing-sources-heading">
                    <div className="marketing-shell marketing-sources__inner">
                        <div>
                            <h2 id="marketing-sources-heading">{page.sources.title}</h2>
                            <p>{page.sources.note}</p>
                        </div>
                        <ul>
                            {page.sources.links.map((source) => (
                                <li key={source.href}>
                                    <a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            )}

            <section className="marketing-related" aria-labelledby="marketing-related-heading">
                <div className="marketing-shell">
                    <h2 id="marketing-related-heading">{ui.relatedHeading}</h2>
                    <ul className="marketing-related__grid">
                        {relatedPages.map((relatedPage) => (
                            <li key={relatedPage.path}>
                                <Link to={relatedPage.href}>
                                    <strong>{relatedPage.label}</strong>
                                    <span>{relatedPage.description}</span>
                                    <span className="marketing-related__arrow" aria-hidden="true">→</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <ProductCta copy={productPageContent[resolved.locale]} title={page.cta.title} intro={page.cta.body} cta={ui.startTrial} href={trialHref} />
        </main>
    );
};

export default MarketingPage;
