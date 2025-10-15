import React from 'react';
import "./Navbar.css"

const Navbar = () => {
    return (
        <div className="nav-main">
            <div className="nav-logo">
                <img src="/Syncall.svg" alt="oops..."/>
            </div>
            <div className="nav-bar">
                <a href="#home">Home</a>
                <a href="#features">Features</a>
                <a href="#how">How It Works</a>
                <a href="#demo">Demo</a>
                <a href="#faq">FAQ</a>
            </div>
            <div className="nav-contact-button">
                <a href="mailto:david@syncallai.com"><button>Contact sales</button></a>
            </div>
        </div>
    );
};

export default Navbar;