import React from 'react';
import "./How.css"
import Cards from "../widgets/Cards.jsx";

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
            duration: [7,10]
        }
    ];


    return (
        <div className="how-main">
            <h1>How it works</h1>
            <div className="how-con">
                {data.map((i, idx) => {
                    return <Cards key={idx}  title={i.title} text={i.description} days={i.duration}/>
                })}
            </div>
        </div>
    );
};

export default How;