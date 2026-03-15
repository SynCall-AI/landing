import React from 'react';
import "./Clients.css";
import { useLanguage } from '../../context/LanguageContext';

const Clients = () => {
    const { t } = useLanguage();

    const partners = [
        { name: 'Iman', logo: '/partners/iman.svg', white: true },
        { name: 'Poytaxt Parking', logo: '/partners/poytaxt_parking.svg', white: true },
        { name: 'Unicon', logo: '/partners/unicon_logo.svg' },
        { name: 'Thompson', logo: '/partners/thompson.png' },
    ];

    return (
        <div className="partners-section">
            <div className="partners-container">
                <p className="partners-label">{t('partnersLabel')}</p>
                <div className="partners-grid">
                    {partners.map((partner, index) => (
                        <div key={index} className="partner-item">
                            <img src={partner.logo} alt={partner.name} className={`partner-logo${partner.white ? '' : ' partner-logo-invert'}`} />
                        </div>
                    ))}
                    <div className="partner-item partner-more">
                        <span className="partner-name">10+</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clients;
