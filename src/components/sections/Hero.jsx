import React from 'react';
import "./Hero.css";
import { useLanguage } from '../../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <div id="home" className="hero-main">
            <video autoPlay muted playsInline loop>
                <source src={window.innerWidth > 500 ? `/hero.mp4` : `/hero-m.MP4`} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className="hero-buttons">
                <a href="#demo"><button className="hero-but try">{t('tryDemo')}</button></a>
                <a href="mailto:david@syncallai.com"><button className="hero-but contact">{t('contactSales')}</button></a>
            </div>
        </div>
    );
};

export default Hero;