import React from 'react';
import "./Hero.css";

const Hero = () => {
    return (
        <div id="home" className="hero-main">
            <video autoPlay muted playsInline loop>
                <source src={window.innerWidth > 500 ? `/hero.mp4` : `/hero-m.MP4`} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className="hero-buttons">
                <a href="#demo"><button className="hero-but try">Try Demo</button></a>
                <a href="mailto:david@syncallai.com"><button className="hero-but contact">Contact Sales</button></a>
            </div>
        </div>
    );
};

export default Hero;