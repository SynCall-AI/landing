import "./Footer.css"
import { FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-top">
                    <div className="footer-logo">
                        <img src="/Syncall.svg" alt="Syncall AI" height="28" />
                    </div>
                    <div className="footer-social">
                        <a href="https://www.instagram.com/syncall.ai/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://www.linkedin.com/company/syncall-ai/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                        <a href="https://t.me/syncallai" target="_blank" rel="noopener noreferrer">
                            <FaTelegram />
                        </a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>&copy; 2026 Syncall AI. All rights reserved.</span>
                    <a href="https://t.me/syncall_ai" target="_blank" rel="noopener noreferrer">@syncall_ai</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
