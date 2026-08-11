import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa6';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './Footer.css';

const Footer = () => {
    const { language, setLanguage, t, localePath } = useLanguage();
    const columns = [
        {
            title: t('footerProducts'),
            links: [
                [t('navVoiceAgents'), '/'],
                [t('navMarketingFeatures'), '/features'],
                [t('navAnalytics'), '/analytics'],
                [t('navChatbots'), '/chatbots'],
                [t('navStt'), '/stt'],
                [t('navTts'), '/tts'],
                [t('navIntegrations'), '/integrations'],
                [t('navPricing'), '/pricing'],
            ],
        },
        {
            title: t('navUseCases'),
            links: [
                [t('useCaseBanking'), '/use-cases/banking'],
                [t('useCaseDebt'), '/use-cases/debt-collection'],
                [t('useCaseReminders'), '/use-cases/appointment-reminders'],
                [t('useCaseSurveys'), '/use-cases/surveys'],
                [t('useCaseLeads'), '/use-cases/lead-qualification'],
            ],
        },
        {
            title: t('footerCompany'),
            links: [
                [t('navAbout'), '/about'],
                [t('caseStudies'), '/case-studies'],
            ],
        },
    ];

    return (
        <footer className="footer">
            <div className="footer-inner">
                <section className="footer-cta" aria-labelledby="footer-cta-heading">
                    <div>
                        <h2 id="footer-cta-heading">{t('contactTitle')}</h2>
                        <p>{t('contactSubtitle')}</p>
                    </div>
                    <div className="footer-cta-actions">
                        <a className="btn-primary" href={`${localePath('/')}?intent=demo#contact`}>{t('ctaDemo')}</a>
                        <a className="btn-secondary" href={`${localePath('/')}?intent=trial#contact`}>{t('ctaTrial')}</a>
                        <a className="footer-telegram" href="https://t.me/syncall_ai" target="_blank" rel="noopener noreferrer">{t('ctaTelegram')}</a>
                    </div>
                </section>

                <div className="footer-map">
                    <Link to={localePath('/')} className="footer-brand" aria-label="Syncall home">
                        <img src="/Syncall.svg" alt="Syncall" width="112" height="28" loading="lazy" />
                    </Link>
                    {columns.map((column) => (
                        <nav key={column.title} aria-label={column.title} className="footer-column">
                            <h3>{column.title}</h3>
                            {column.links.map(([label, path]) => (
                                <Link key={path} to={localePath(path)}>{label}</Link>
                            ))}
                        </nav>
                    ))}
                </div>

                <div className="footer-utility">
                    <div className="footer-languages" role="group" aria-label={t('languageSelectorLabel')}>
                        {['en', 'ru', 'uz'].map((code) => (
                            <button
                                type="button"
                                key={code}
                                className={language === code ? 'active' : ''}
                                aria-pressed={language === code}
                                onClick={() => setLanguage(code)}
                            >
                                {code.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <div className="footer-social">
                        <a href="https://www.instagram.com/syncall.ai/" aria-label="Syncall on Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram aria-hidden="true" /></a>
                        <a href="https://www.linkedin.com/company/syncall-ai/" aria-label="Syncall on LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedin aria-hidden="true" /></a>
                        <a href="https://t.me/syncall_ai" aria-label="Syncall on Telegram" target="_blank" rel="noopener noreferrer"><FaTelegram aria-hidden="true" /></a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 Syncall AI. {t('footerRights')}.</span>
                    <a href="https://t.me/syncall_ai" target="_blank" rel="noopener noreferrer">@syncall_ai</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
