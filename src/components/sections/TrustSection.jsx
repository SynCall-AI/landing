import { useLanguage } from '../../context/LanguageContext';
import './TrustSection.css';

const PLACEHOLDER_LOGOS = ['01', '02', '03', '04'];

const TrustSection = () => {
    const { t } = useLanguage();

    return (
        <section className="trust-section" aria-labelledby="trust-heading">
            <div className="trust-container">
                <header className="trust-header">
                    <span className="section-label">{t('partnersLabel')}</span>
                    <h2 id="trust-heading">{t('trustTitle')}</h2>
                </header>

                {/* TODO(human): supply approved client logos/names, testimonial text + attribution, and a sourced case-study result before launch. */}
                <div className="trust-placeholder-panel">
                    <span className="trust-placeholder-badge">{t('trustPlaceholder')}</span>

                    <ul className="trust-logo-strip" aria-label={t('partnersLabel')}>
                        {PLACEHOLDER_LOGOS.map((item) => (
                            <li key={item}>
                                <span aria-hidden="true">{item}</span>
                                <span>{'{{CLIENT_LOGO}}'}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="trust-proof-grid">
                        <figure className="trust-testimonial">
                            <span className="trust-card-placeholder">{t('trustPlaceholder')}</span>
                            <blockquote>
                                <p>{'{{TESTIMONIAL_QUOTE}}'}</p>
                            </blockquote>
                            <figcaption>
                                <span>{'{{CLIENT_NAME}}'}</span>
                                <span>{'{{ROLE_AND_COMPANY}}'}</span>
                            </figcaption>
                        </figure>

                        <article className="trust-case-study">
                            <span className="trust-card-placeholder">{t('trustPlaceholder')}</span>
                            <h3>{'{{CASE_STUDY_TITLE}}'}</h3>
                            <p className="trust-case-result">{'{{VERIFIED_RESULT}}'}</p>
                            <p>{'{{CASE_STUDY_SUMMARY}}'}</p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
