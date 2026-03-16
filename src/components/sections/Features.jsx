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
                    {/* Card 1: Native language & dialects — STT processing pipeline */}
                    <div className="feature-card fc-dialects">
                        <div className="fc-visual">
                            <div className="fc-stt-demo">
                                <div className="fc-stt-input">
                                    <div className="fc-stt-mic">
                                        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                                            <rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                                            <path d="M5 11a7 7 0 0014 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                    </div>
                                    <div className="fc-stt-wave">
                                        <div className="fc-stt-bar" style={{height: '35%'}} />
                                        <div className="fc-stt-bar" style={{height: '70%'}} />
                                        <div className="fc-stt-bar" style={{height: '50%'}} />
                                        <div className="fc-stt-bar" style={{height: '85%'}} />
                                        <div className="fc-stt-bar" style={{height: '40%'}} />
                                        <div className="fc-stt-bar" style={{height: '65%'}} />
                                        <div className="fc-stt-bar" style={{height: '55%'}} />
                                    </div>
                                </div>
                                <div className="fc-stt-process">
                                    <div className="fc-stt-detect">
                                        <span className="fc-stt-label">STT</span>
                                        <span className="fc-stt-conf">98.7%</span>
                                    </div>
                                </div>
                                <div className="fc-stt-tags">
                                    <span className="fc-dialect-tag active">{t('feature1TagDialect')}</span>
                                    <span className="fc-dialect-tag">{t('feature1TagMix')}</span>
                                    <span className="fc-dialect-tag">{t('feature1TagSlang')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="fc-text">
                            <h3>{t('feature1Title')}</h3>
                            <p>{t('feature1Desc')}</p>
                        </div>
                    </div>

                    {/* Card 2: Natural conversation — interruption + voice isolation */}
                    <div className="feature-card fc-conversation">
                        <div className="fc-visual">
                            <div className="fc-convo-demo">
                                <div className="fc-convo-line fc-convo-bot">
                                    <div className="fc-convo-avatar">AI</div>
                                    <div className="fc-convo-wave">
                                        <div className="fc-wave-bar" style={{height: '40%'}} />
                                        <div className="fc-wave-bar" style={{height: '70%'}} />
                                        <div className="fc-wave-bar" style={{height: '55%'}} />
                                        <div className="fc-wave-bar fc-wave-cut" style={{height: '30%'}} />
                                        <div className="fc-wave-bar fc-wave-cut" style={{height: '15%'}} />
                                    </div>
                                    <span className="fc-interrupt-badge">Interrupted</span>
                                </div>
                                <div className="fc-convo-line fc-convo-user">
                                    <div className="fc-convo-wave fc-convo-wave-user">
                                        <div className="fc-wave-bar" style={{height: '50%'}} />
                                        <div className="fc-wave-bar" style={{height: '80%'}} />
                                        <div className="fc-wave-bar" style={{height: '65%'}} />
                                        <div className="fc-wave-bar" style={{height: '90%'}} />
                                        <div className="fc-wave-bar" style={{height: '45%'}} />
                                    </div>
                                    <div className="fc-noise-filter">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                                            <path d="M2 12h3l2.5-7 3.5 14 2.5-9 2.5 5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                            <line x1="3" y1="3" x2="21" y2="21" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"/>
                                        </svg>
                                        <span>Noise canceled</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="fc-text">
                            <h3>{t('feature2Title')}</h3>
                            <p>{t('feature2Desc')}</p>
                        </div>
                    </div>

                    {/* Card 3: Data security — cloud + on-premise */}
                    <div className="feature-card fc-deploy">
                        <div className="fc-visual">
                            <div className="fc-deploy-demo">
                                <div className="fc-deploy-option">
                                    <div className="fc-deploy-icon fc-cloud-icon">
                                        <svg viewBox="0 0 40 30" fill="none" width="40" height="30">
                                            <path d="M10 25a7 7 0 01-.5-14A10 10 0 0130 13a6 6 0 012 12H10z" stroke="currentColor" strokeWidth="1.5"/>
                                        </svg>
                                    </div>
                                    <span className="fc-deploy-label">Syncall Cloud</span>
                                </div>
                                <div className="fc-deploy-divider">
                                    <span>or</span>
                                </div>
                                <div className="fc-deploy-option">
                                    <div className="fc-deploy-icon fc-server-icon">
                                        <svg viewBox="0 0 32 36" fill="none" width="32" height="36">
                                            <rect x="2" y="2" width="28" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                                            <rect x="2" y="14" width="28" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                                            <rect x="2" y="26" width="28" height="8" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                                            <circle cx="8" cy="7" r="1.5" fill="#4ADE80"/>
                                            <circle cx="8" cy="19" r="1.5" fill="#4ADE80"/>
                                            <circle cx="8" cy="30" r="1.5" fill="#4ADE80"/>
                                        </svg>
                                    </div>
                                    <span className="fc-deploy-label">On-Premise</span>
                                </div>
                            </div>
                        </div>
                        <div className="fc-text">
                            <h3>{t('feature3Title')}</h3>
                            <p>{t('feature3Desc')}</p>
                        </div>
                    </div>

                    {/* Card 4: Voice cloning — waveform duplication */}
                    <div className="feature-card fc-cloning">
                        <div className="fc-visual">
                            <div className="fc-clone-demo">
                                <div className="fc-clone-source">
                                    <div className="fc-clone-avatar">
                                        <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                                            <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM3 21a9 9 0 0118 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                    </div>
                                    <div className="fc-clone-wave">
                                        <div className="fc-cw-bar" style={{height: '30%'}} />
                                        <div className="fc-cw-bar" style={{height: '60%'}} />
                                        <div className="fc-cw-bar" style={{height: '90%'}} />
                                        <div className="fc-cw-bar" style={{height: '50%'}} />
                                        <div className="fc-cw-bar" style={{height: '75%'}} />
                                        <div className="fc-cw-bar" style={{height: '40%'}} />
                                    </div>
                                </div>
                                <div className="fc-clone-arrow">
                                    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="fc-clone-result">
                                    <div className="fc-clone-avatar fc-clone-ai">
                                        <span>AI</span>
                                    </div>
                                    <div className="fc-clone-wave fc-clone-wave-ai">
                                        <div className="fc-cw-bar" style={{height: '30%'}} />
                                        <div className="fc-cw-bar" style={{height: '60%'}} />
                                        <div className="fc-cw-bar" style={{height: '90%'}} />
                                        <div className="fc-cw-bar" style={{height: '50%'}} />
                                        <div className="fc-cw-bar" style={{height: '75%'}} />
                                        <div className="fc-cw-bar" style={{height: '40%'}} />
                                    </div>
                                </div>
                                <div className="fc-clone-match">99.2% match</div>
                            </div>
                        </div>
                        <div className="fc-text">
                            <h3>{t('feature4Title')}</h3>
                            <p>{t('feature4Desc')}</p>
                        </div>
                    </div>

                    {/* Card 5: Analytics & CRM — dashboard + integration */}
                    <div className="feature-card fc-analytics">
                        <div className="fc-visual">
                            <div className="fc-dashboard-demo">
                                <div className="fc-dash-chart">
                                    <div className="fc-chart">
                                        <div className="fc-chart-bar" style={{height: '35%'}} />
                                        <div className="fc-chart-bar" style={{height: '58%'}} />
                                        <div className="fc-chart-bar" style={{height: '42%'}} />
                                        <div className="fc-chart-bar active" style={{height: '82%'}} />
                                        <div className="fc-chart-bar" style={{height: '65%'}} />
                                        <div className="fc-chart-bar" style={{height: '90%'}} />
                                    </div>
                                </div>
                                <div className="fc-dash-crm">
                                    <div className="fc-crm-badge">
                                        <span className="fc-crm-dot" />
                                        <span>Delta M</span>
                                    </div>
                                    <div className="fc-crm-badge">
                                        <span className="fc-crm-dot fc-crm-dot-2" />
                                        <span>CRM</span>
                                    </div>
                                    <div className="fc-crm-sync">
                                        <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
                                            <path d="M17 10a7 7 0 01-14 0M3 10a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            <path d="M14 7l3 3-3 3M6 13l-3-3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>Auto-sync</span>
                                    </div>
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
