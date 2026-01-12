import React, { useEffect, useState, useRef } from 'react';
import "./How.css"
import Cards from "../widgets/Cards.jsx";
import { useWindowScroll } from "@uidotdev/usehooks";
import { useLanguage } from '../../context/LanguageContext';

const How = () => {
    const { t } = useLanguage();

    const data = [
        {
            titleKey: "howStep1Title",
            descriptionKey: "howStep1Text",
            duration: [1,3]
        },
        {
            titleKey: "howStep2Title",
            descriptionKey: "howStep2Text",
            duration: [1,3]
        },
        {
            titleKey: "howStep3Title",
            descriptionKey: "howStep3Text",
            duration: [3,5]
        },
        {
            titleKey: "howStep4Title",
            descriptionKey: "howStep4Text",
            duration: [1,2]
        }
    ];

    const [{ y }] = useWindowScroll();
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const start = section.offsetTop - window.innerHeight;
        const end = section.offsetTop + section.offsetHeight;
        const scrollRange = end - start;

        if (y >= start && y <= end) {
            const progress = (y - start) / scrollRange;

            let index;
            if (progress < 0.38) {
                index = 0;
            } else if (progress < 0.5) {
                index = 1;
            } else if (progress < 0.6) {
                index = 2;
            } else {
                index = 3;
            }

            setActiveIndex(index);
        } else {
            setActiveIndex(-1);
        }
    }, [y]);



    return (
        <div id="how" className="how-main" ref={sectionRef}>
            <h1>{t('howTitle')}</h1>
            <div className="how-con">
                {data.map((i, idx) => (
                    <Cards
                        key={idx}
                        title={t(i.titleKey)}
                        text={t(i.descriptionKey)}
                        days={i.duration}
                        className={idx === activeIndex ? "current" : ""}
                    />
                ))}
            </div>
        </div>
    );
};

export default How;
