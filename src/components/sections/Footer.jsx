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
                    Republic of Uzbekistan, 100021, Tashkent, Afrosiyob st, 12. <br/>
                    david@syncallai.com <br/>
                    +998 99 123 45 67 <br/>
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