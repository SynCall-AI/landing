import React from 'react';
import "./Clients.css";
import { useLanguage } from '../../context/LanguageContext';

const Clients = () => {
    const { t } = useLanguage();

    const partners = [
        { name: 'Iman' },
        { name: 'Poytaxt Parking' },
        { name: 'Qwatt' },
        { name: 'Unicon' },
        { name: 'Thompson' },
    ];

    return (
        <div className="partners-section">
            <div className="partners-container">
                <p className="partners-label">{t('partnersLabel')}</p>
                <div className="partners-track">
                    <div className="partners-logos">
                        {partners.map((partner, index) => (
                            <div key={index} className="partner-item">
                                <span className="partner-name">{partner.name}</span>
                            </div>
                        ))}
                        <div className="partner-divider-dot"></div>
                        {partners.map((partner, index) => (
                            <div key={`dup-${index}`} className="partner-item">
                                <span className="partner-name">{partner.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clients;
