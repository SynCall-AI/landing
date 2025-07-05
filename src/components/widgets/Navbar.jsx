import React from 'react';
import "./Navbar.css"

const Navbar = () => {
    return (
        <div className="nav-main">
            <div className="nav-logo">
                <img src="/Syncall.svg" alt="oops..."/>
            </div>
            <div className="nav-bar">
                <a href="">Lorem</a>
                <a href="">Lorem</a>
                <a href="">Lorem</a>
                <a href="">Lorem</a>
                <a href="">Lorem</a>
            </div>
            <div className="nav-contact-button">
                <button>Contact sales</button>
            </div>
        </div>
    );
};

export default Navbar;