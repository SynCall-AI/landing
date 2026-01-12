import "./Footer.css"
import { FaInstagram, FaLinkedin } from "react-icons/fa6";

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
                    <a href="https://www.instagram.com/syncall.ai/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="social-icon" />
                        Instagram
                    </a>
                    <a href="https://www.linkedin.com/company/syncall-ai/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="social-icon" />
                        LinkedIn
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;