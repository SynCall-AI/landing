import { useState, useRef, useEffect } from 'react';
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

    const handleLanguageSelect = (code) => {
        setLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className="nav-main">
            <div className="nav-logo">
                <img src="/Syncall.svg" alt="Syncall AI" />
            </div>
            <div className="nav-bar">
                <a href="#home">{t('home')}</a>
                <a href="#features">{t('features')}</a>
                <a href="#demo">{t('demo')}</a>
                <a href="#how">{t('howItWorks')}</a>
                <a href="#faq">{t('faq')}</a>
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
            <div className="nav-contact-button">
                <a href="mailto:david@syncallai.com"><button>{t('contactSales')}</button></a>
            </div>
        </div>
    );
};

export default Navbar;
