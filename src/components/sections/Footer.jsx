import React from 'react';
import "./Footer.css"

const Footer = () => {
    return (
        <div className="foot-main">
            <div>
                <img src="/Syncall.svg" alt="" width="100%"/>
            </div>
            <div className="foot-foot">
                <div className="copy">
                    © 2025 SynCall AI. All rights reserved. <br/>
                    david@syncallai.com <br/>
                </div>
                <div className="social-f">
                    <a href="">
                        Instagram
                    </a>
                    <a href="">
                        Linkedin
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;