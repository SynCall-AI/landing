import React from 'react';
import "./About.css"
import { useLanguage } from '../../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    return (
        <div className="container-a">
            <div className={"about-content"}>
                <p className={"header"}>{t('aboutTitle')}</p>

                <h2 className="mainHeading">
                    {t('aboutHeading')}
                </h2>


                <p className="description-a">
                    {t('aboutDescription')}
                </p>

                <div className="buttonContainer">
                    <a className="ctaButton-i" href="https://t.me/syncall_ai" target="_blank" rel="noopener noreferrer">{t('contactSales')}</a>
                </div>
            </div>
        </div>
    );
};

export default About;
