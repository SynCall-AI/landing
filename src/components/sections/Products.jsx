import React from 'react';
import "./Products.css";
import { useLanguage } from '../../context/LanguageContext';
import { FaPhone, FaPhoneVolume, FaHeadset, FaComments, FaTelegram, FaGlobe, FaCloud, FaServer } from 'react-icons/fa6';

const Products = () => {
    const { t } = useLanguage();

    return (
        <div className="products-section">
            <div className="products-container">
                <div className="products-header">
                    <span className="products-label">{t('productsLabel')}</span>
                    <h2 className="products-title">{t('productsTitle')}</h2>
                </div>

                <div className="products-grid">
                    {/* Voice Agents Card */}
                    <div className="product-card product-voice">
                        <div className="product-icon-wrapper">
                            <FaHeadset className="product-main-icon" />
                        </div>
                        <h3 className="product-name">{t('productVoiceTitle')}</h3>
                        <p className="product-desc">{t('productVoiceDesc')}</p>

                        <div className="product-features">
                            <div className="product-feature">
                                <FaPhoneVolume className="pf-icon" />
                                <span>{t('productVoiceFeature1')}</span>
                            </div>
                            <div className="product-feature">
                                <FaPhone className="pf-icon" />
                                <span>{t('productVoiceFeature2')}</span>
                            </div>
                            <div className="product-feature">
                                <FaHeadset className="pf-icon" />
                                <span>{t('productVoiceFeature3')}</span>
                            </div>
                        </div>

                        <div className="product-deploy">
                            <div className="deploy-option">
                                <FaCloud className="deploy-icon" />
                                <span>{t('deployCloud')}</span>
                            </div>
                            <div className="deploy-option">
                                <FaServer className="deploy-icon" />
                                <span>{t('deployOnPremise')}</span>
                            </div>
                        </div>

                        <a href="mailto:david@syncallai.com" className="product-cta">
                            <button className="btn-primary">{t('learnMore')}</button>
                        </a>
                    </div>

                    {/* Chatbots Card */}
                    <div className="product-card product-chat">
                        <div className="product-badge">{t('newBadge')}</div>
                        <div className="product-icon-wrapper">
                            <FaComments className="product-main-icon" />
                        </div>
                        <h3 className="product-name">{t('productChatTitle')}</h3>
                        <p className="product-desc">{t('productChatDesc')}</p>

                        <div className="product-features">
                            <div className="product-feature">
                                <FaGlobe className="pf-icon" />
                                <span>{t('productChatFeature1')}</span>
                            </div>
                            <div className="product-feature">
                                <FaTelegram className="pf-icon" />
                                <span>{t('productChatFeature2')}</span>
                            </div>
                            <div className="product-feature">
                                <FaComments className="pf-icon" />
                                <span>{t('productChatFeature3')}</span>
                            </div>
                        </div>

                        <div className="product-deploy">
                            <div className="deploy-option">
                                <FaCloud className="deploy-icon" />
                                <span>{t('deployCloud')}</span>
                            </div>
                            <div className="deploy-option">
                                <FaServer className="deploy-icon" />
                                <span>{t('deployOnPremise')}</span>
                            </div>
                        </div>

                        <a href="mailto:david@syncallai.com" className="product-cta">
                            <button className="btn-secondary">{t('learnMore')}</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
