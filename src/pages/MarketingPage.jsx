import { Link, useLocation } from 'react-router-dom';
import {
    getRelatedMarketingPages,
    resolveMarketingPage,
    withLocalePath,
} from '../content/marketingContent.js';
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
    telegramHref = 'https://t.me/syncall_ai',
}) => {
    const location = useLocation();
    const resolved = resolveMarketingPage(path || location.pathname, locale);
    const { page, ui } = resolved;
    const relatedPages = getRelatedMarketingPages(page, resolved.locale);

    if (!page) {
        return (
            <main className="marketing-page marketing-page--missing">
                <section className="marketing-shell marketing-missing" aria-labelledby="marketing-missing-title">
                    <h1 id="marketing-missing-title">{ui.unavailableTitle}</h1>
                    <p>{ui.unavailableBody}</p>
                    <Link className="marketing-button marketing-button--primary" to={withLocalePath('features', resolved.locale)}>
                        {ui.backToFeatures}
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="marketing-page" id="main-content" tabIndex="-1">
            <header className="marketing-hero">
                <div className="marketing-shell marketing-hero__inner">
                    <span className="marketing-eyebrow">{page.eyebrow}</span>
                    <h1>{page.title}</h1>
                    <p className="marketing-lead">{page.lead}</p>
                    <div className="marketing-actions" role="group" aria-label={page.cta.title}>
                        <a
                            className="marketing-button marketing-button--primary"
                            href={demoHref}
                            {...externalLinkProps(demoHref)}
                        >
                            {ui.bookDemo}
                        </a>
                        <a
                            className="marketing-button marketing-button--secondary"
                            href={trialHref}
                            {...externalLinkProps(trialHref)}
                        >
                            {ui.startTrial}
                        </a>
                    </div>
                </div>
            </header>

            {page.sections.map((section, sectionIndex) => {
                const headingId = `marketing-section-${sectionIndex}`;
                return (
                    <section
                        className={`marketing-section ${sectionIndex % 2 ? 'marketing-section--alt' : ''}`}
                        aria-labelledby={headingId}
                        key={headingId}
                    >
                        <div className="marketing-shell">
                            <div className="marketing-section__heading">
                                <h2 id={headingId}>{section.title}</h2>
                                {section.body.map((paragraph, paragraphIndex) => (
                                    <p key={`${headingId}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                                ))}
                            </div>

                            {section.items?.length > 0 && (
                                <div className="marketing-card-grid">
                                    {section.items.map((item, itemIndex) => (
                                        <article
                                            className={`marketing-card ${item.placeholder ? 'marketing-card--placeholder' : ''}`}
                                            key={`${headingId}-item-${itemIndex}`}
                                        >
                                            {item.placeholder && (
                                                <span className="marketing-placeholder-label">{ui.placeholder}</span>
                                            )}
                                            <h3>{item.title}</h3>
                                            <p>{item.text}</p>
                                        </article>
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

            <section className="marketing-cta" aria-labelledby="marketing-cta-heading">
                <div className="marketing-shell marketing-cta__inner">
                    <div>
                        <h2 id="marketing-cta-heading">{page.cta.title}</h2>
                        <p>{page.cta.body}</p>
                    </div>
                    <div className="marketing-actions">
                        <a
                            className="marketing-button marketing-button--primary"
                            href={demoHref}
                            {...externalLinkProps(demoHref)}
                        >
                            {ui.bookDemo}
                        </a>
                        <a
                            className="marketing-button marketing-button--secondary"
                            href={telegramHref}
                            {...externalLinkProps(telegramHref)}
                        >
                            {ui.telegram}
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default MarketingPage;
