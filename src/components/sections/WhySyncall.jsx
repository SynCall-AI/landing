import React from 'react';
import "./WhySyncall.css";
import { useLanguage } from '../../context/LanguageContext';
import { FaMicrochip, FaServer, FaGlobe, FaBolt } from 'react-icons/fa6';

const WhySyncall = () => {
    const { t } = useLanguage();

    const differentiators = [
        {
            icon: <FaMicrochip />,
            titleKey: 'whyTitle1',
            descKey: 'whyDesc1',
            highlight: true
        },
        {
            icon: <FaServer />,
            titleKey: 'whyTitle2',
            descKey: 'whyDesc2',
            highlight: false
        },
        {
            icon: <FaGlobe />,
            titleKey: 'whyTitle3',
            descKey: 'whyDesc3',
            highlight: false
        },
        {
            icon: <FaBolt />,
            titleKey: 'whyTitle4',
            descKey: 'whyDesc4',
            highlight: false
        }
    ];

    return (
        <div className="why-section">
            <div className="why-container">
                <div className="why-header">
                    <span className="why-label">{t('whyLabel')}</span>
                    <h2 className="why-title">{t('whySectionTitle')}</h2>
                    <p className="why-subtitle">{t('whySectionSubtitle')}</p>
                </div>

                <div className="why-grid">
                    {differentiators.map((item, index) => (
                        <div
                            key={index}
                            className={`why-card ${item.highlight ? 'why-card-highlight' : ''}`}
                        >
                            <div className="why-icon">
                                {item.icon}
                            </div>
                            <h3 className="why-card-title">{t(item.titleKey)}</h3>
                            <p className="why-card-desc">{t(item.descKey)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhySyncall;
