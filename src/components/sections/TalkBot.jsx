import { useState } from "react";
import "./TalkBot.css";
import { useLanguage } from '../../context/LanguageContext';

const TalkBot = () => {
    const { t } = useLanguage();
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            id: 0,
            title: t('engineCard1Title'),
            shortDesc: t('engineCard1Desc'),
            techBadge: "RT-Audio / WebSocket",
            metrics: {
                label1: "Sampling Rate", value1: "16 kHz / Mono",
                label2: "Isolation Latency", value2: "< 15 ms",
                label3: "Audio Format", value3: "PCM / G.711 / SIP"
            },
            details: [
                "Real-time bidirectional audio streaming via low-latency WebSockets.",
                "Integrated Voice Isolation filters out background music, traffic, and noise.",
                "Compatible with all IP PBX, Asterisk, Avaya, Cisco, and cloud VoIP providers."
            ]
        },
        {
            id: 1,
            title: t('engineCard2Title'),
            shortDesc: t('engineCard2Desc'),
            techBadge: "Bilingual STT + LLM",
            metrics: {
                label1: "STT Accuracy", value1: "98.2%",
                label2: "NLU Processing", value2: "< 80 ms",
                label3: "Dialects Parsed", value3: "12+ Uzbek Regions"
            },
            details: [
                "Advanced Speech-to-Text trained specifically on Uzbek accent variants and regional slang.",
                "Seamless bilingual parsing — handles sentences mixing Uzbek and Russian without losing context.",
                "Extracts intent, entities (dates, numbers, phone numbers), and client sentiment instantly."
            ]
        },
        {
            id: 2,
            title: t('engineCard3Title'),
            shortDesc: t('engineCard3Desc'),
            techBadge: "CRM / On-Premise REST",
            metrics: {
                label1: "CRM Sync", value1: "Real-time / Instant",
                label2: "Delta M Integration", value2: "Native Connector",
                label3: "Security Standard", value3: "TLS 1.3 / On-Premise"
            },
            details: [
                "Automatic CRM updates on every call: status updates, notes, and rescheduled events.",
                "Out-of-the-box native API compatibility with Delta M and key ERP solutions.",
                "On-Premise deployment option for banks and microfinance organizations requiring maximum data privacy."
            ]
        },
        {
            id: 3,
            title: t('engineCard4Title'),
            shortDesc: t('engineCard4Desc'),
            techBadge: "Neural TTS / WaveNet",
            metrics: {
                label1: "TTS Synthesis", value1: "< 220 ms",
                label2: "Voice Naturalness", value2: "99.2% MOS",
                label3: "Audio Codec", value3: "Opus / WAV / MP3"
            },
            details: [
                "High-fidelity neural voice synthesis producing extremely warm, natural tones.",
                "Clones the exact voice of your best customer support operator to build brand trust.",
                "Interruption handler: instantly stops speaking when a customer interjects, ensuring natural dialogue flow."
            ]
        }
    ];

    return (
        <div id="how" className="talkbot-section">
            {/* Ambient gradients */}
            <div className="talkbot-glow talkbot-glow-1" />
            <div className="talkbot-glow talkbot-glow-2" />

            <div className="talkbot-header">
                <span className="section-label">{t('howItWorks')}</span>
                <h2 className="talkbot-title gradient-text-blue">{t('engineTitle')}</h2>
                <p className="talkbot-subtitle">{t('engineSubtitle')}</p>
            </div>

            <div className="talkbot-engine-wrapper">
                {/* Pipeline Steps Row */}
                <div className="pipeline-steps-container">
                    <div className="pipeline-line" />
                    <div className="pipeline-line-glow" style={{ left: `${activeStep * 25 + 12.5}%` }} />

                    {steps.map((step) => {
                        const isActive = activeStep === step.id;
                        return (
                            <button
                                key={step.id}
                                className={`pipeline-step-node ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveStep(step.id)}
                            >
                                <div className="node-dot-outer">
                                    <div className="node-dot-inner" />
                                </div>
                                <h3 className="node-title">{step.title.split('. ')[1] || step.title}</h3>
                                <span className="node-badge">{step.techBadge}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Main Diagnostics Display */}
                <div className="diagnostics-dashboard">
                    <div className="dashboard-grid">
                        {/* Info Column */}
                        <div className="diag-info-col">
                            <div className="diag-header-row">
                                <span className="diag-step-num">STAGE 0{activeStep + 1}</span>
                                <h3 className="diag-title">{steps[activeStep].title}</h3>
                            </div>
                            
                            <p className="diag-description">{steps[activeStep].shortDesc}</p>
                            
                            <div className="diag-tech-specs">
                                <h4 className="specs-section-title">TECHNICAL HIGHLIGHTS</h4>
                                <ul className="specs-list">
                                    {steps[activeStep].details.map((detail, index) => (
                                        <li key={index} className="spec-item">
                                            <span className="spec-dot" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Visual Diagnostics Panel */}
                        <div className="diag-visual-col">
                            <div className="diag-card-header">
                                <span className="term-dot red" />
                                <span className="term-dot yellow" />
                                <span className="term-dot green" />
                                <span className="term-title">CORE DIAGNOSTICS</span>
                            </div>

                            <div className="diag-visual-content">
                                {/* Metric Grid */}
                                <div className="metrics-grid">
                                    <div className="metric-box">
                                        <span className="metric-label">{steps[activeStep].metrics.label1}</span>
                                        <span className="metric-value">{steps[activeStep].metrics.value1}</span>
                                    </div>
                                    <div className="metric-box">
                                        <span className="metric-label">{steps[activeStep].metrics.label2}</span>
                                        <span className="metric-value">{steps[activeStep].metrics.value2}</span>
                                    </div>
                                    <div className="metric-box full-width">
                                        <span className="metric-label">{steps[activeStep].metrics.label3}</span>
                                        <span className="metric-value blue-text">{steps[activeStep].metrics.value3}</span>
                                    </div>
                                </div>

                                {/* Step-specific Animations */}
                                <div className="step-animation-box">
                                    {activeStep === 0 && (
                                        <div className="decibel-isolator">
                                            <div className="iso-wave-bar" />
                                            <div className="iso-wave-bar" />
                                            <div className="iso-wave-bar" />
                                            <div className="iso-wave-bar" />
                                            <div className="iso-wave-bar" />
                                            <span className="iso-label">REAL-TIME ISOLATION ONLINE</span>
                                        </div>
                                    )}

                                    {activeStep === 1 && (
                                        <div className="dialect-cloud">
                                            <span className="dialect-tag active">Toshkent dialekti</span>
                                            <span className="dialect-tag">Микс языков</span>
                                            <span className="dialect-tag active">Samarqand lahjasi</span>
                                            <span className="dialect-tag">Восточный акцент</span>
                                        </div>
                                    )}

                                    {activeStep === 2 && (
                                        <div className="db-integration-visual">
                                            <div className="db-table">
                                                <div className="db-row header">
                                                    <span>Delta M Field</span>
                                                    <span>API Response</span>
                                                </div>
                                                <div className="db-row">
                                                    <span>client_id</span>
                                                    <span>#5894</span>
                                                </div>
                                                <div className="db-row">
                                                    <span>sync_status</span>
                                                    <span className="green-text">SYNCED (TLS 1.3)</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 3 && (
                                        <div className="tts-synthesis-visual">
                                            <div className="synth-equalizer">
                                                <div className="syn-bar" />
                                                <div className="syn-bar" />
                                                <div className="syn-bar" />
                                                <div className="syn-bar" />
                                                <div className="syn-bar" />
                                                <div className="syn-bar" />
                                                <div className="syn-bar" />
                                                <div className="syn-bar" />
                                            </div>
                                            <span className="synth-label">99.2% BRAND NATURALNESS</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TalkBot;
