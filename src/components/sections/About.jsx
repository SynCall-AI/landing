import React from 'react';
import "./About.css"
import { useLanguage } from '../../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    return (
        <div className="container-a">
            <div className={"about-content"}>
                <p className={"header"}>{t('aboutTitle')}</p>

                <h1 className="mainHeading">
                    {t('aboutHeading')}
                </h1>


                <p className="description-a">
                    {t('aboutDescription')}
                </p>

                <div className="buttonContainer">
                    <a href="mailto:david@syncallai.com"><button className="ctaButton-i">{t('contactSales')}</button></a>
                </div>
            </div>
        </div>
    );
};

export default About;