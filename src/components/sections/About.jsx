import React from 'react';
import "./About.css"

const About = () => {
    return (
        <div className={"container"}>
            <div className={"content"}>
                <p className={"header"}>What is Syncall?</p>

                <h1 className="mainHeading">
                    AI Voice Agents that speak like a human
                    <br/>
                    and works 24/7 without breaks.
                </h1>


                <p className="description">
                    Unlike traditional automated systems, it understands context, tone, and nuance — making it nearly
                    indistinguishable from a live agent. Whether it's day or night, the bot is always ready to assist,
                    convert
                    leads, answer questions, or resolve issues.
                </p>

                <div className="buttonContainer">
                    <button className="ctaButton">Contact sales</button>
                </div>
            </div>
        </div>
    );
};

export default About;