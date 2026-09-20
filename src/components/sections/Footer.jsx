import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa6';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './Footer.css';

const Footer = () => {
    const { t, localePath, basePath } = useLanguage();
    const isLanding = basePath === '/' || basePath === '/voice-agents';
    const columns = [
        {
            title: t('footerProducts'),
            links: [
                [t('navVoiceAgents'), '/'],
                [t('navMarketingFeatures'), '/features'],
                [t('navAnalytics'), '/analytics'],
                [t('navChatbots'), '/chatbots'],
                [t('navStt'), '/cabinet/stt'],
                [t('navTts'), '/cabinet/tts'],
                [t('navIntegrations'), '/integrations'],
                [t('navPricing'), '/pricing'],
            ],
        },
        {
            title: t('navUseCases'),
            links: [
                [t('navUseCases'), '/use-cases'],
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
        <footer className={`footer${isLanding ? ' footer-landing' : ''}`}>
            <div className="footer-inner">
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

                <div className="footer-bottom">
                    <span>© 2026 Syncall AI. {t('footerRights')}.</span>
                    <div className="footer-social">
                        <a href="https://t.me/syncall_ai" target="_blank" rel="noopener noreferrer"><FaTelegram aria-hidden="true" /><span>Telegram</span></a>
                        <a href="https://www.linkedin.com/company/syncall-ai/" target="_blank" rel="noopener noreferrer"><FaLinkedin aria-hidden="true" /><span>LinkedIn</span></a>
                        <a href="https://www.instagram.com/syncall.ai/" target="_blank" rel="noopener noreferrer"><FaInstagram aria-hidden="true" /><span>Instagram</span></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
