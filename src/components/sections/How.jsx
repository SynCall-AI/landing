import React, { useEffect, useState, useRef } from 'react';
import "./How.css"
import Cards from "../widgets/Cards.jsx";
import { useWindowScroll } from "@uidotdev/usehooks";

const How = () => {
    const data = [
        {
            title: "Script development and approval",
            description: "Draft call flows, ensure compliance, and secure stakeholder approval.",
            duration: [3,5]
        },
        {
            title: "Bot training",
            description: "Draft call flows, ensure compliance, and secure stakeholder approval.",
            duration: [3,5]
        },
        {
            title: "Testing",
            description: "Run call simulations, validate edge cases, and measure latency.",
            duration: [3,5]
        },
        {
            title: "Telephony integration",
            description: "Deploy agents to live phone calls via your telephony setup.",
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
        <div className="how-main" ref={sectionRef}>
            <h1>How it works</h1>
            <div className="how-con">
                {data.map((i, idx) => (
                    <Cards
                        key={idx}
                        title={i.title}
                        text={i.description}
                        days={i.duration}
                        className={idx === activeIndex ? "current" : ""}
                    />
                ))}
            </div>
        </div>
    );
};

export default How;
