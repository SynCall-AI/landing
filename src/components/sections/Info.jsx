import React from 'react';
import "./Info.css";
import { useLanguage } from '../../context/LanguageContext';

const Info = () => {
    const { t } = useLanguage();

    const stats = [
        {
            value: "80%",
            labelKey: "infoStat1Label",
            descKey: "infoStat1Desc"
        },
        {
            value: "5x",
            labelKey: "infoStat2Label",
            descKey: "infoStat2Desc"
        },
        {
            value: "<1s",
            labelKey: "infoStat3Label",
            descKey: "infoStat3Desc"
        }
    ];

    return (
        <div className="info-main">
            <div className="info-container">
                {stats.map((stat, index) => (
                    <div key={index} className="info-card">
                        <p className="info-value">{stat.value}</p>
                        <p className="info-label">{t(stat.labelKey)}</p>
                        <p className="info-desc">{t(stat.descKey)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Info;
