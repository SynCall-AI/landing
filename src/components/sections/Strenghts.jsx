import React from 'react';
import "./Strengths.css"
import { useLanguage } from '../../context/LanguageContext';

const Strenghts = () => {
    const { t } = useLanguage();

    let data = [
        {
            icon: "/ico1.svg",
            titleKey: "strength1Title",
            textKey: "strength1Text"
        },
        {
            icon: "/ico2.svg",
            titleKey: "strength2Title",
            textKey: "strength2Text"
        },
        {
            icon: "/ico3.svg",
            titleKey: "strength3Title",
            textKey: "strength3Text"
        },
        {
            icon: "/ico4.svg",
            titleKey: "strength4Title",
            textKey: "strength4Text"
        },
        {
            icon: "/ico5.svg",
            titleKey: "strength5Title",
            textKey: "strength5Text"
        },
        {
            icon: "/ico6.svg",
            titleKey: "strength6Title",
            textKey: "strength6Text"
        }
    ]

    return (
        <div id="features" className="str-main">
            <div className="str-h">
                <h1>{t('strengthsTitle')}</h1>
            </div>
            <div className="str-b">
                {data.map((i, index) => (
                    <div key={index} className="str-elem">
                        <div className="t-holder">
                            <img src={i.icon} alt="oops..."/>
                            <p className="elem-t">{t(i.titleKey)}</p>
                        </div>

                        <p className="elem-de">{t(i.textKey)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Strenghts;