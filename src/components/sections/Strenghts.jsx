import React from 'react';
import "./Strengths.css"

const Strenghts = () => {
    let data = [
        {
            icon: "/ico1.svg",
            title: "5x cost reduction",
            "text": "Cut contact center costs by automating routine calls and tasks."
        },
        {
            icon: "/ico2.svg",
            title: "It speaks as a human",
            text: "Natural tone, pauses, and intonation for lifelike conversations."
        },
        {
            icon: "/ico3.svg",
            title: "24/7 non-stop work",
            text: "Always available, no breaks, no downtime."
        },
        {
            icon: "/ico4.svg",
            title: "Multilingual support and accent adaptation",
            text: "Speaks your customer’s language, understands regional accents."
        },
        {
            icon: "/ico5.svg",
            title: "Real-time issue analytics",
            text: "Detect issues instantly, monitor key metrics, and improve customer experience on the fly."
        },
        {
            icon: "/ico6.svg",
            title: "Adaptive responses",
            text: "Adjusts replies based on context, tone, and customer behavior."
        }
    ]

    return (
        <div className="str-main">
            <div className="str-h">
                <h1>The strengths behind</h1>
            </div>
            <div className="str-b">
                {data.map((i, index) => (
                    <div key={index} className="str-elem">
                        <img src={i.icon} alt="oops..."/>
                        <p className="elem-t">{i.title}</p>
                        <p className="elem-de">{i.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Strenghts;