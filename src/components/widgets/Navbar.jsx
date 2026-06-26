import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./Navbar.css"
import { useLanguage } from '../../context/LanguageContext';

const languages = [
    { code: 'uz', name: 'O\'zbekcha', flag: '\u{1F1FA}\u{1F1FF}' },
    { code: 'ru', name: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', flag: '\u{1F1F7}\u{1F1FA}' },
    { code: 'en', name: 'English', flag: '\u{1F1EC}\u{1F1E7}' },
];

const Navbar = () => {
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Dynamic light/dark theme state.
    // Explicit user choice (localStorage) wins; otherwise follow the OS preference.
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    });

    const currentLang = languages.find(l => l.code === language);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Reflect the current theme on the <html> tag (does NOT persist —
    // we only persist on an explicit user toggle, so the OS preference
    // keeps being followed until the user actually chooses).
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Live-follow the OS preference until the user makes an explicit choice.
    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: light)');
        const handleOSChange = (e) => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'light' : 'dark');
            }
        };
        mq.addEventListener('change', handleOSChange);
        return () => mq.removeEventListener('change', handleOSChange);
    }, []);

    const handleLanguageSelect = (code) => {
        setLanguage(code);
        setIsOpen(false);
    };

    const toggleTheme = () => {
        setTheme(prev => {
            const next = prev === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', next); // persist only on explicit choice
            return next;
        });
    };

    return (
        <div className="nav-main">
            <Link to="/" className="nav-logo">
                <img src="/Syncall.svg" alt="Syncall AI" />
            </Link>
            <div className="nav-bar">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{t('navVoiceAgents')}</NavLink>
                <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{t('navAnalytics')}</NavLink>
                <NavLink to="/chatbots" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{t('navChatbots')}</NavLink>
                <NavLink to="/stt" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{t('navStt')}</NavLink>
                <NavLink to="/tts" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{t('navTts')}</NavLink>
            </div>
            <div className="language-selector" ref={dropdownRef}>
                <button
                    className="language-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="flag">{currentLang?.flag}</span>
                    <span className="lang-code">{language.toUpperCase()}</span>
                    <span className={`arrow ${isOpen ? 'open' : ''}`}>&#x25BE;</span>
                </button>
                {isOpen && (
                    <div className="language-dropdown">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                className={`language-option ${language === lang.code ? 'active' : ''}`}
                                onClick={() => handleLanguageSelect(lang.code)}
                            >
                                <span className="flag">{lang.flag}</span>
                                <span className="lang-name">{lang.name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="theme-toggle-wrapper">
                <button
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                >
                    {theme === 'dark' ? (
                        /* Sun Icon */
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sun-icon">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2" />
                            <path d="M12 20v2" />
                            <path d="M4.93 4.93l1.41 1.41" />
                            <path d="M17.66 17.66l1.41 1.41" />
                            <path d="M2 12h2" />
                            <path d="M20 12h2" />
                            <path d="M6.34 17.66l-1.41 1.41" />
                            <path d="M19.07 4.93l-1.41 1.41" />
                        </svg>
                    ) : (
                        /* Moon Icon */
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="moon-icon">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="nav-contact-button">
                <a href="https://t.me/syncall_ai" target="_blank" rel="noopener noreferrer"><button>{t('contactSales')}</button></a>
            </div>
        </div>
    );
};

export default Navbar;
