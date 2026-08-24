import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { useLanguage } from '../../context/LanguageContext.jsx';

const languages = [
    { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
];

const Navbar = () => {
    const { language, setLanguage, t, localePath, basePath } = useLanguage();
    const [languageOpen, setLanguageOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const languageRef = useRef(null);
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    });

    const currentLang = languages.find((item) => item.code === language);
    const navigation = [
        { to: '/', label: t('home'), end: true },
        { to: '/features', label: t('navMarketingFeatures') },
        { to: '/use-cases/banking', label: t('navUseCases') },
        { to: '/integrations', label: t('navIntegrations') },
        { to: '/pricing', label: t('navPricing') },
    ];

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
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

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
        <header className="nav-main">
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
                    <NavLink
                        key={item.to}
                        to={localePath(item.to)}
                        end={item.end}
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                        {item.label}
                    </NavLink>
                ))}
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

                <button
                    type="button"
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                    aria-label={theme === 'dark' ? t('switchLightTheme') : t('switchDarkTheme')}
                >
                    <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
                </button>

                <Link className="nav-studio-button" to={localePath('/cabinet')}>
                    {t('creatorStudio')}
                </Link>

                <a className="nav-contact-button" href={`${localePath('/')}?intent=demo#contact`}>
                    {t('ctaDemo')}
                </a>
            </div>
        </header>
    );
};

export default Navbar;
