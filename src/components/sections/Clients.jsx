import React, { useState, useEffect } from 'react';
import "./Clients.css";
import { useLanguage } from '../../context/LanguageContext';

const Clients = () => {
    const { t } = useLanguage();
    
    // Dynamic theme state tracking
    const [theme, setTheme] = useState(() => {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    });

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            setTheme(currentTheme);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        return () => observer.disconnect();
    }, []);

    const partners = [
        { name: 'Iman', logo: '/partners/iman.svg', white: true },
        { 
            name: 'Poytaxt Parking', 
            logo: theme === 'light' ? '/partners/poytaxt_parking_light.svg' : '/partners/poytaxt_parking.svg', 
            white: true,
            poytaxt: true
        },
        { name: 'Unicon', logo: '/partners/unicon_logo.svg', white: true },
        { name: 'Qwatt', logo: '/partners/qwatt_logo.webp', monochrome: true },
        { name: 'Thompson', logo: '/partners/thompson.png', white: true },
    ];

    return (
        <div className="partners-section">
            <div className="partners-container">
                <p className="partners-label">{t('partnersLabel')}</p>
                <div className="partners-grid">
                    {partners.map((partner, index) => (
                        <div key={index} className="partner-item">
                            <img 
                                src={partner.logo} 
                                alt={partner.name} 
                                className={`partner-logo${
                                    partner.poytaxt 
                                        ? ' partner-logo-poytaxt' 
                                        : (partner.monochrome 
                                            ? ' partner-logo-monochrome' 
                                            : (partner.white ? '' : ' partner-logo-invert'))
                                }`} 
                            />
                        </div>
                    ))}
                    <div className="partner-item partner-more">
                        <span className="partner-name">+10 MORE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clients;
