import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { landingContent } from '../../content/landingContent.js';

const languages = [
    { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
];

const Navbar = () => {
    const { language, setLanguage, t, localePath, basePath } = useLanguage();
    const [languageOpen, setLanguageOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const languageRef = useRef(null);
    const [theme, setTheme] = useState(() => {
        try { return localStorage.getItem('theme') || 'light'; } catch { return 'light'; }
    });
    const isLanding = ['/', '/voice-agents', '/analytics', '/chatbots'].includes(basePath);
    const copy = landingContent[language] || landingContent.ru;

    const currentLang = languages.find((item) => item.code === language);
    const navigation = [
        { to: '/#capabilities', label: t('navPlainFeatures') },
        { to: '/#live-demo', label: t('demo') },
        { to: '/#customers', label: language === 'ru' ? 'Клиенты' : language === 'uz' ? 'Mijozlar' : 'Customers' },
        { to: '/#how', label: t('navSetup') },
        { to: '/pricing', label: t('navPricing') },
    ];

    useEffect(() => {
        const updateScroll = () => setScrolled(window.scrollY > 24);
        updateScroll();
        window.addEventListener('scroll', updateScroll, { passive: true });
        return () => window.removeEventListener('scroll', updateScroll);
    }, []);

    useEffect(() => {
        const closeMenus = (event) => {
            if (event.key === 'Escape') {
                setLanguageOpen(false);
                setMobileOpen(false);
            }
            if (event.type === 'mousedown' && languageRef.current && !languageRef.current.contains(event.target)) {
                setLanguageOpen(false);
            }
        };
        document.addEventListener('mousedown', closeMenus);
        document.addEventListener('keydown', closeMenus);
        return () => {
            document.removeEventListener('mousedown', closeMenus);
            document.removeEventListener('keydown', closeMenus);
        };
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isLanding ? 'light' : theme);
    }, [theme, isLanding]);

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: light)');
        const followSystemTheme = (event) => {
            if (!localStorage.getItem('theme')) setTheme(event.matches ? 'light' : 'dark');
        };
        media.addEventListener('change', followSystemTheme);
        return () => media.removeEventListener('change', followSystemTheme);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [basePath]);

    const toggleTheme = () => {
        setTheme((current) => {
            const next = current === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', next);
            return next;
        });
    };

    return (
        <header className={`nav-main${isLanding ? ' nav-landing' : ''}${scrolled ? ' nav-scrolled' : ''}`}>
            <Link to={localePath('/')} className="nav-logo" aria-label={`Syncall — ${t('home')}`}>
                <img src="/Syncall.svg" alt="Syncall" width="112" height="28" />
            </Link>

            <button
                type="button"
                className="mobile-menu-toggle"
                aria-label={mobileOpen ? t('navClose') : t('navMenu')}
                aria-expanded={mobileOpen}
                aria-controls="primary-navigation"
                onClick={() => setMobileOpen((open) => !open)}
            >
                <span aria-hidden="true">{mobileOpen ? '×' : '☰'}</span>
            </button>

            <nav
                id="primary-navigation"
                className={`nav-bar ${mobileOpen ? 'is-open' : ''}`}
                aria-label={t('primaryNavigation')}
            >
                {navigation.map((item) => (
                    item.to.includes('#') ? <Link key={item.to} className="nav-link" to={localePath(item.to)} onClick={() => setMobileOpen(false)}>{item.label}</Link> : <NavLink
                        key={item.to}
                        to={localePath(item.to)}
                        end={item.end}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                        {item.label}
                    </NavLink>
                ))}
                {isLanding && <Link className="nav-link nav-mobile-studio" to={localePath('/cabinet')} onClick={() => setMobileOpen(false)}>{t('creatorStudio')}</Link>}
            </nav>

            <div className="nav-actions">
                <div className="language-selector" ref={languageRef}>
                    <button
                        type="button"
                        className="language-toggle"
                        onClick={() => setLanguageOpen((open) => !open)}
                        aria-expanded={languageOpen}
                        aria-haspopup="listbox"
                        aria-label={`${t('languageSelectorLabel')}: ${currentLang?.name}`}
                    >
                        <span className="flag" aria-hidden="true">{currentLang?.flag}</span>
                        <span className="lang-code">{language.toUpperCase()}</span>
                        <span aria-hidden="true" className={`arrow ${languageOpen ? 'open' : ''}`}>▾</span>
                    </button>
                    {languageOpen && (
                        <div className="language-dropdown" role="listbox" aria-label={t('languageSelectorLabel')}>
                            {languages.map((item) => (
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={language === item.code}
                                    key={item.code}
                                    className={`language-option ${language === item.code ? 'active' : ''}`}
                                    onClick={() => {
                                        setLanguage(item.code);
                                        setLanguageOpen(false);
                                    }}
                                >
                                    <span className="flag" aria-hidden="true">{item.flag}</span>
                                    <span className="lang-name">{item.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {!isLanding && <button
                    type="button"
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                    aria-label={theme === 'dark' ? t('switchLightTheme') : t('switchDarkTheme')}
                >
                    <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
                </button>}

                <Link className="nav-studio-button" to={localePath('/cabinet')}>
                    {t('creatorStudio')}
                </Link>

                <a className="nav-contact-button" href={`${localePath('/')}#live-demo`}>
                    <span className="nav-cta-full">{isLanding ? copy.tryAgent : t('demo')}</span><span className="nav-cta-short">{t('demo')}</span>
                </a>
            </div>
        </header>
    );
};

export default Navbar;
