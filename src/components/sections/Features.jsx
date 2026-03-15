import "./Features.css";
import { useLanguage } from '../../context/LanguageContext';

const Features = () => {
    const { t } = useLanguage();

    return (
        <div id="features" className="features-section">
            <div className="features-container">
                <div className="features-header">
                    <span className="section-label">Features</span>
                    <h2 className="features-heading">{t('featuresTitle')}</h2>
                </div>

                <div className="features-grid">
                    {/* Card 1: Analytics — bar chart */}
                    <div className="feature-card fc-analytics">
                        <div className="fc-visual">
                            <div className="fc-chart">
                                <div className="fc-chart-bar" style={{height: '35%'}} />
                                <div className="fc-chart-bar" style={{height: '58%'}} />
                                <div className="fc-chart-bar" style={{height: '42%'}} />
                                <div className="fc-chart-bar active" style={{height: '82%'}} />
                                <div className="fc-chart-bar" style={{height: '65%'}} />
                                <div className="fc-chart-bar" style={{height: '90%'}} />
                                <div className="fc-chart-bar" style={{height: '72%'}} />
                            </div>
                            <div className="fc-chart-label">
                                <span className="fc-stat-up">+12.4%</span>
                            </div>
                        </div>
                        <div className="fc-text">
                            <h3>{t('feature1Title')}</h3>
                            <p>{t('feature1Desc')}</p>
                        </div>
                    </div>

                    {/* Card 2: Multilingual — flag badges */}
                    <div className="feature-card fc-languages">
                        <div className="fc-visual">
                            <div className="fc-lang-stack">
                                <div className="fc-lang-badge">
                                    <span>&#127482;&#127487;</span>
                                    <span>O'zbekcha</span>
                                </div>
                                <div className="fc-lang-badge">
                                    <span>&#127479;&#127482;</span>
                                    <span>Русский</span>
                                </div>
                                <div className="fc-lang-badge">
                                    <span>&#127468;&#127463;</span>
                                    <span>English</span>
                                </div>
                                <div className="fc-lang-badge fc-lang-more">
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                        <div className="fc-text">
                            <h3>{t('feature2Title')}</h3>
                            <p>{t('feature2Desc')}</p>
                        </div>
                    </div>

                    {/* Card 3: Integrations — icon grid */}
                    <div className="feature-card fc-integrations">
                        <div className="fc-visual">
                            <div className="fc-icon-grid">
                                <div className="fc-icon fc-i-1" />
                                <div className="fc-icon fc-i-2" />
                                <div className="fc-icon fc-i-3" />
                                <div className="fc-icon fc-i-4" />
                                <div className="fc-icon fc-i-5" />
                                <div className="fc-icon fc-i-6" />
                            </div>
                            <div className="fc-connector-lines">
                                <div className="fc-connector" />
                                <div className="fc-connector" />
                            </div>
                        </div>
                        <div className="fc-text">
                            <h3>{t('feature3Title')}</h3>
                            <p>{t('feature3Desc')}</p>
                        </div>
                    </div>

                    {/* Card 4: Security — shield visual */}
                    <div className="feature-card fc-security">
                        <div className="fc-visual">
                            <div className="fc-shield">
                                <svg viewBox="0 0 40 48" fill="none" className="fc-shield-svg">
                                    <path d="M20 2L4 10v12c0 11 7 20 16 22 9-2 16-11 16-22V10L20 2z"
                                          stroke="currentColor" strokeWidth="1.5" fill="none"/>
                                    <path d="M14 24l4 4 8-8" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <div className="fc-shield-glow" />
                            </div>
                        </div>
                        <div className="fc-text">
                            <h3>{t('feature4Title')}</h3>
                            <p>{t('feature4Desc')}</p>
                        </div>
                    </div>

                    {/* Card 5: Complex tasks — chat UI */}
                    <div className="feature-card fc-complex">
                        <div className="fc-visual">
                            <div className="fc-chat">
                                <div className="fc-chat-msg fc-chat-bot">
                                    <div className="fc-msg-avatar">AI</div>
                                    <div className="fc-msg-body">
                                        <div className="fc-msg-line" />
                                        <div className="fc-msg-line short" />
                                    </div>
                                </div>
                                <div className="fc-chat-msg fc-chat-user">
                                    <div className="fc-msg-body">
                                        <div className="fc-msg-line" />
                                    </div>
                                </div>
                                <div className="fc-chat-tags">
                                    <span className="fc-tag">Resolved</span>
                                    <span className="fc-tag">Refund</span>
                                    <span className="fc-tag">UZ</span>
                                </div>
                            </div>
                        </div>
                        <div className="fc-text">
                            <h3>{t('feature5Title')}</h3>
                            <p>{t('feature5Desc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
