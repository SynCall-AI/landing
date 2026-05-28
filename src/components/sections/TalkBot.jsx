import React, { useState, useEffect } from "react";
import "./TalkBot.css";
import { useLanguage } from '../../context/LanguageContext';

const TalkBot = () => {
    const { language, t } = useLanguage();
    const [activeStep, setActiveStep] = useState(0);

    const dialogs = {
        uz: {
            customer: "Alo, assalomu alaykum! Buyurtma holatini tekshirmoqchi edim, raqami #5894",
            bot: "Va alaykum assalom! Albatta, buyurtmangiz #5894 muvaffaqiyatli yetkazildi."
        },
        ru: {
            customer: "Алло, здравствуйте! Я хотел бы проверить статус заказа №5894",
            bot: "Здравствуйте! Конечно, ваш заказ №5894 успешно доставлен."
        },
        en: {
            customer: "Hello! I would like to check the status of my order #5894",
            bot: "Hello! Sure, your order #5894 has been successfully delivered."
        }
    };

    const stepTitles = {
        uz: [
            { 
                title: "Лид импорт қилиш (Excel/API)", 
                badge: "Лид Триггери", 
                metric: "Тескор", 
                desc: "Маълумотлар базасидан янги буюртма автоматик равишда қўнғироқни бошлайди.",
                log: "[SYS] Manba: Excel | Yuklangan qatorlar: 150"
            },
            { 
                title: "VoIP/SIP алоқаси фаоллашиши", 
                badge: "SIP PBX Уланиш", 
                metric: "Уланиш", 
                desc: "Корпоратив телефония билан тўғридан-тўғри хавфсиз алоқа ўрнатилади.",
                log: "[SYS] SIP Kanal Himoyalangan | Shifrlash: SRTP"
            },
            { 
                title: "Шовқинни тўсиш (Voice Isolation)", 
                badge: "Шовқин Филтри", 
                metric: "< 15 мс", 
                desc: "Нейротармоқ мижоз атрофидаги кўча шовқини ва мусиқаларни тўлиқ филтрлайди.",
                log: "[SYS] Shovqinni to'sish | Shovqin darajasi: -35dB"
            },
            { 
                title: "Nutqni matnga o'tkazish (STT)", 
                badge: "STT Движок", 
                metric: "< 100 мс", 
                desc: "Айтилган овозли нутқ лаҳжа ва аралаш тиллар билан биргаликда матнга ўтказилади.",
                log: "[SYS] Til: Uzb/Rus | Aniqlik darajasi: 98.7%"
            },
            { 
                title: "LLM фикрлаш ва CRM интеграцияси", 
                badge: "NLU Мия", 
                metric: "< 500 мс", 
                desc: "ИИ Delta M ва CRM тизимидан буюртма ҳолатини хавфсиз текширади.",
                log: "[SYS] Baza: Delta M | Buyurtma holati: YETKAZILDI"
            },
            { 
                title: "Табиий овозли синтез (TTS)", 
                badge: "TTS Нейротармоқ", 
                metric: "< 200 мс", 
                desc: "Энг яхши операторингиз овози клонида табиий, равон жавоб синтез қилинади.",
                log: "[SYS] Sintez: WaveNet | Chastota: 24kHz"
            }
        ],
        ru: [
            { 
                title: "Импорт лидов (API / Excel)", 
                badge: "Триггер лидов", 
                metric: "Мгновенно", 
                desc: "Синхронизация базы данных мгновенно запускает автоматический обзвон.",
                log: "[SYS] Источник: Excel | Записей загружено: 150"
            },
            { 
                title: "Телефония (SIP / VoIP)", 
                badge: "Подключение", 
                metric: "Активно", 
                desc: "Прямое и защищенное соединение со стандартной корпоративной телефонией.",
                log: "[SYS] Канал SIP защищен | Шифрование: SRTP"
            },
            { 
                title: "Шумоподавление (Voice Isolation)", 
                badge: "Фильтрация шума", 
                metric: "< 15 мс", 
                desc: "Нейросеть мгновенно отсекает уличный шум, музыку и голоса на фоне.",
                log: "[SYS] Фильтр: Активен | Уровень шума: -35дБ"
            },
            { 
                title: "Распознавание речи (STT)", 
                badge: "STT Движок", 
                metric: "< 100 мс", 
                desc: "Двуязычная речь (рус/узб) с учетом диалектов переводится в текст с точностью 98%.",
                log: "[SYS] Язык: Узб/Рус | Точность распознавания: 98.7%"
            },
            { 
                title: "Интеграция с CRM и Delta M", 
                badge: "ИИ Синхронизация", 
                metric: "< 500 мс", 
                desc: "Безопасный запрос в CRM/Delta M для моментальной проверки статуса заказа.",
                log: "[SYS] База данных: Delta M | Статус: Доставлено"
            },
            { 
                title: "Синтез голоса (TTS)", 
                badge: "Клон оператора", 
                metric: "< 200 мс", 
                desc: "Генерация ответа цифровым клоном вашего лучшего оператора без задержек.",
                log: "[SYS] Вокал: WaveNet | Дискретизация: 24кГц"
            }
        ],
        en: [
            { 
                title: "Lead Ingest (API / Excel)", 
                badge: "Lead Trigger", 
                metric: "Instant", 
                desc: "Database lead trigger automatically launches the outbound system.",
                log: "[SYS] Source: Excel File | Columns: Phone, Name, Order"
            },
            { 
                title: "SIP / PBX Connection", 
                badge: "SIP Connection", 
                metric: "VoIP Active", 
                desc: "Direct connection with standard corporate telephony established.",
                log: "[SYS] SIP Channel Secured | Encryption: SRTP"
            },
            { 
                title: "Voice Isolation (Filter)", 
                badge: "Noise Filter", 
                metric: "< 15 ms", 
                desc: "Advanced noise-cancelling voice isolation strips away background street sound.",
                log: "[SYS] Isolation: Active | Noise Reduction: -35dB"
            },
            { 
                title: "Bilingual STT", 
                badge: "STT Engine", 
                metric: "< 100 ms", 
                desc: "Bilingual Speech-to-Text instantly transcribes spoken audio into structured text.",
                log: "[SYS] Language: Bilingual | Accent Confidence: 99.4%"
            },
            { 
                title: "LLM & CRM Database Sync", 
                badge: "NLU Orchestrator", 
                metric: "< 500 ms", 
                desc: "Delta M / CRM secure database query determines client order status.",
                log: "[SYS] DB Query: Success | Record Status: DELIVERED"
            },
            { 
                title: "Neural Voice Synthesis (TTS)", 
                badge: "Operator Clone", 
                metric: "< 200 ms", 
                desc: "High-fidelity digital operator clone synthesizes naturally flowing response.",
                log: "[SYS] Synthesis: WaveNet | Sample Rate: 24kHz"
            }
        ]
    };

    const currentDialog = dialogs[language] || dialogs.en;
    const currentSteps = stepTitles[language] || stepTitles.en;

    const pipelineSteps = currentSteps.map((step, idx) => ({
        id: idx,
        title: step.title,
        badge: step.badge,
        metric: step.metric,
        desc: step.desc,
        log: step.log
    }));

    useEffect(() => {
        const timings = [1800, 1800, 3800, 1800, 2200, 4200];
        
        let timer;
        const runLoop = (step) => {
            setActiveStep(step);
            timer = setTimeout(() => {
                const nextStep = (step + 1) % 6;
                runLoop(nextStep);
            }, timings[step]);
        };

        runLoop(0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div id="how" className="talkbot-section">
            <div className="talkbot-glow talkbot-glow-1" />
            <div className="talkbot-glow talkbot-glow-2" />

            <div className="talkbot-header">
                <span className="section-label">{t('howItWorks')}</span>
                <h2 className="talkbot-title gradient-text-blue">{t('engineTitle')}</h2>
                <p className="talkbot-subtitle">{t('engineSubtitle')}</p>
            </div>

            <div className="talkbot-engine-wrapper">
                <div className="talkbot-panel-grid">
                    {/* LEFT PANEL: The Call Control Dashboard */}
                    <div className="call-control-panel">
                        <div className="panel-header">
                            <div className="header-status">
                                <span className={`status-dot ${activeStep >= 1 ? "active" : ""}`} />
                                <span className="status-text">
                                    {activeStep === 0 && (language === "uz" ? "ЛИД ЮКЛАНМОҚДА..." : language === "ru" ? "ИМПОРТ ЛИДА..." : "TRIGGERING OUTBOUND LEAD...")}
                                    {activeStep === 1 && (language === "uz" ? "ҚЎНҒИРОҚ УЛАНМОҚДА..." : language === "ru" ? "НАБОР НОМЕРА..." : "DIALING SIP CONNECTION...")}
                                    {activeStep === 2 && (language === "uz" ? "МИЖОЗ ГАПИРМОҚДА..." : language === "ru" ? "ГОВОРИТ КЛИЕНТ..." : "CUSTOMER SPEAKING...")}
                                    {activeStep === 3 && (language === "uz" ? "STT МАТНГА ЎТКАЗИШ..." : language === "ru" ? "STT РАСПОЗНАВАНИЕ РЕЧИ..." : "STT TEXT CONVERSION...")}
                                    {activeStep === 4 && (language === "uz" ? "ИИ ФИКРЛАШ ВА CRM ҚИДИРУВ..." : language === "ru" ? "ИИ ПОИСК В CRM..." : "AI THINKING & CRM SEARCH...")}
                                    {activeStep >= 5 && (language === "uz" ? "ИИ ЖАВОБ ҚАЙТАРМОҚДА..." : language === "ru" ? "ИИ ОТВЕЧАЕТ..." : "AI VOICE RESPONDING...")}
                                </span>
                            </div>
                            <div className="terminal-controls">
                                <span className="t-dot r" />
                                <span className="t-dot y" />
                                <span className="t-dot g" />
                            </div>
                        </div>

                        <div className="call-screen-content">
                            {activeStep === 0 && (
                                <div className="ingest-animation fade-in-up">
                                    <div className="data-node excel">
                                        <div className="node-icon">📊</div>
                                        <span>excel_leads.xlsx</span>
                                    </div>
                                    <div className="pulse-arrow">➔</div>
                                    <div className="data-node api">
                                        <div className="node-icon">🔌</div>
                                        <span>CRM_API_Trigger</span>
                                    </div>
                                </div>
                            )}

                            {activeStep === 1 && (
                                <div className="dialing-animation fade-in-up">
                                    <div className="phone-rings">
                                        <div className="ring-pulse" />
                                        <div className="ring-pulse second" />
                                        <div className="phone-icon-center">📞</div>
                                    </div>
                                    <span className="dialing-label">Dialing +998 (90) ***-5894...</span>
                                </div>
                            )}

                            {activeStep >= 2 && (
                                <div className="conversation-flow-box">
                                    {/* Customer Bubble */}
                                    <div className={`dialog-bubble customer ${activeStep >= 2 ? "active" : ""}`}>
                                        <div className="bubble-avatar">👤</div>
                                        <div className="bubble-text-wrapper">
                                            <span className="bubble-author">{language === "uz" ? "Мижоз" : language === "ru" ? "Клиент" : "Customer"}</span>
                                            <p className="bubble-text">{currentDialog.customer}</p>
                                            {activeStep === 2 && (
                                                <div className="noise-wave-container">
                                                    <div className="noise-line static" />
                                                    <div className="noise-line isolated" />
                                                    <span className="noise-tag">{language === "uz" ? "Шовқин филтрланди (15мс)" : language === "ru" ? "Шум подавлен (15мс)" : "Voice Isolated (15ms)"}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* STT Real-time mapping */}
                                    {activeStep === 3 && (
                                        <div className="stt-overlay fade-in-up">
                                            <span className="overlay-tag">STT ENGINE MAPPING</span>
                                            <p className="overlay-mapped-text">"{currentDialog.customer}"</p>
                                        </div>
                                    )}

                                    {/* Database lookup / AI thinking */}
                                    {activeStep === 4 && (
                                        <div className="crm-search-visual fade-in-up">
                                            <div className="crm-table">
                                                <div className="crm-header-row">
                                                    <span>Delta M DB Field</span>
                                                    <span>Record</span>
                                                </div>
                                                <div className="crm-row">
                                                    <span>Client Code</span>
                                                    <span>#5894</span>
                                                </div>
                                                <div className="crm-row">
                                                    <span>Order Status</span>
                                                    <span className="status-delivered">{language === "uz" ? "ЕТКАЗИЛДИ" : language === "ru" ? "ДОСТАВЛЕН" : "DELIVERED"}</span>
                                                </div>
                                            </div>
                                            <div className="brain-pulse-container">
                                                <div className="brain-pulse" />
                                                🧠 NLU SECURE SYNC
                                            </div>
                                        </div>
                                    )}

                                    {/* Bot Speech Bubble */}
                                    {activeStep >= 5 && (
                                        <div className="dialog-bubble bot fade-in-up">
                                            <div className="bubble-avatar syncall">🤖</div>
                                            <div className="bubble-text-wrapper">
                                                <span className="bubble-author">Syncall AI</span>
                                                <p className="bubble-text">{currentDialog.bot}</p>
                                                <div className="equalizer-waveform">
                                                    <div className="eq-bar" />
                                                    <div className="eq-bar" />
                                                    <div className="eq-bar" />
                                                    <div className="eq-bar" />
                                                    <div className="eq-bar" />
                                                    <div className="eq-bar" />
                                                    <div className="eq-bar" />
                                                    <div className="eq-bar" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT PANEL: Dynamic Latency Pipeline Timeline */}
                    <div className="latency-pipeline-panel">
                        <div className="pipeline-panel-header">
                            <h3 className="pipeline-title">{language === "uz" ? "SYNCALL УНУМДОРЛИК КЎРСАТКИЧЛАРИ" : language === "ru" ? "ПОКАЗАТЕЛИ ПРОИЗВОДИТЕЛЬНОСТИ SYNCALL" : "SYNCALL PERFORMANCE SPECS"}</h3>
                            <div className="diagnostics-status-badge">
                                <span className="status-indicator-dot" />
                                DIAGNOSTICS: ONLINE
                            </div>
                        </div>
                        <div className="pipeline-timeline-nodes">
                            {pipelineSteps.map((step) => {
                                const isPassed = activeStep >= step.id;
                                const isCurrent = activeStep === step.id;
                                return (
                                    <div 
                                        key={step.id} 
                                        className={`pipeline-node-item ${isCurrent ? "current" : ""} ${isPassed && !isCurrent ? "passed" : ""}`}
                                    >
                                        <div className="node-marker-wrapper">
                                            <div className="node-marker-line" />
                                            <div className="node-marker-dot">
                                                <span className="marker-index">{step.id + 1}</span>
                                            </div>
                                        </div>
                                        <div className="node-info-card">
                                            <div className="node-card-header">
                                                <h4 className="node-card-title">{step.title}</h4>
                                                <span className="node-card-latency">{step.metric}</span>
                                            </div>
                                            <div className="node-card-meta-row">
                                                <span className="node-card-badge">{step.badge}</span>
                                            </div>
                                            <p className="node-card-desc">{step.desc}</p>
                                            {isCurrent && step.log && (
                                                <div className="node-card-log font-mono">
                                                    <span className="log-arrow">&gt;</span> {step.log}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TalkBot;
