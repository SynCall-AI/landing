import React, { useState, useEffect } from "react";
import "./TalkBot.css";
import { useLanguage } from '../../context/LanguageContext';

const TalkBot = () => {
    const { language, t } = useLanguage();
    const [activeStep, setActiveStep] = useState(0);
    const [typedReply, setTypedReply] = useState("");

    const dialogs = {
        uz: {
            customer: "Alo, ha, eshitaman.",
            bot: "Assalomu alaykum, Dilshod! Bu Syncall banki. Eslatma: #5894 kredit bo'yicha 1 250 000 so'm to'lovni ertaga, 30-mayga qadar amalga oshirishingiz kerak. Hozir karta orqali to'laymizmi?"
        },
        ru: {
            customer: "Алло, да, слушаю.",
            bot: "Здравствуйте, Дмитрий! Это банк Syncall. Напоминаю: платёж 1 250 000 сум по кредиту №5894 нужно внести до завтра, 30 мая. Хотите оплатить картой прямо сейчас?"
        },
        en: {
            customer: "Hello, yes, I'm listening.",
            bot: "Hello, David! This is Syncall Bank. A reminder: your payment of 1,250,000 UZS on loan #5894 is due tomorrow, May 30. Would you like to pay by card right now?"
        }
    };

    const stepTitles = {
        uz: [
            {
                title: "Lidlarni import qilish (Excel/API)",
                badge: "Lid Triggeri",
                metric: "Tezkor",
                desc: "Qarzdorlar bazasidan ro'yxat avtomatik tarzda chiquvchi qo'ng'iroqni boshlaydi.",
                log: "[SYS] Manba: CRM | Yuklangan qatorlar: 150"
            },
            {
                title: "VoIP/SIP aloqasi faollashishi",
                badge: "SIP PBX Ulanish",
                metric: "Ulanish",
                desc: "Korporativ telefoniya bilan to'g'ridan-to'g'ri xavfsiz aloqa o'rnatiladi.",
                log: "[SYS] SIP Kanal Himoyalangan | Shifrlash: SRTP"
            },
            {
                title: "Shovqinni to'sish (Voice Isolation)",
                badge: "Shovqin Filtri",
                metric: "< 15 ms",
                desc: "Neyrotarmoq mijoz atrofidagi ko'cha shovqini va musiqalarni to'liq filtrlaydi.",
                log: "[SYS] Shovqinni to'sish | Shovqin darajasi: -35dB"
            },
            {
                title: "Nutqni matnga o'tkazish (STT)",
                badge: "STT Mexanizmi",
                metric: "< 100 ms",
                desc: "Aytilgan ovozli nutq lahja va aralash tillar bilan birgalikda matnga o'tkaziladi.",
                log: "[SYS] Til: Uzb/Rus | Aniqlik darajasi: 95.7%"
            },
            {
                title: "CRM so'rovi",
                badge: "CRM Sinxronizatsiya",
                metric: "< 200 ms",
                desc: "CRM dan to'lov summasi, muddati va holati xavfsiz olinadi.",
                log: "[SYS] Baza: CRM | Kredit #5894 | Holat: TO'LANADI"
            },
            {
                title: "Javob generatsiyasi (LLM)",
                badge: "LLM Miya",
                metric: "< 500 ms",
                desc: "Til modeli CRM ma'lumotlari asosida shaxsiy javobni shakllantiradi.",
                log: "[SYS] Model: LLM Core | Tokenlar: 52 | Kontekst: #5894"
            },
            {
                title: "Tabiiy ovozli sintez (TTS)",
                badge: "TTS Neyrotarmoq",
                metric: "< 200 ms",
                desc: "Eng yaxshi operatoringiz ovozi klonida tabiiy, ravon javob sintez qilinadi.",
                log: "[SYS] Sintez: WaveNet | Chastota: 24kHz"
            }
        ],
        ru: [
            {
                title: "Импорт лидов (API / Excel)",
                badge: "Триггер лидов",
                metric: "Мгновенно",
                desc: "Синхронизация базы должников мгновенно запускает исходящий обзвон.",
                log: "[SYS] Источник: CRM | Записей загружено: 150"
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
                desc: "Двуязычная речь (рус/узб) с учетом диалектов переводится в текст с точностью 95.7%.",
                log: "[SYS] Язык: Узб/Рус | Точность распознавания: 95.7%"
            },
            {
                title: "Запрос в CRM",
                badge: "Синхронизация CRM",
                metric: "< 200 мс",
                desc: "Безопасный запрос в CRM извлекает сумму, срок и статус платежа.",
                log: "[SYS] База данных: CRM | Кредит №5894 | Статус: К ОПЛАТЕ"
            },
            {
                title: "Генерация ответа (LLM)",
                badge: "LLM Мозг",
                metric: "< 500 мс",
                desc: "Языковая модель формирует персональный ответ на основе данных из CRM.",
                log: "[SYS] Модель: LLM Core | Токенов: 52 | Контекст: Кредит #5894"
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
                desc: "Debtor database trigger automatically launches the outbound campaign.",
                log: "[SYS] Source: CRM | Records: 150 debtors"
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
                desc: "Bilingual Speech-to-Text instantly transcribes spoken audio into structured text with 95.7% accuracy.",
                log: "[SYS] Language: Bilingual | Accent Confidence: 95.7%"
            },
            {
                title: "CRM Query",
                badge: "CRM Sync",
                metric: "< 200 ms",
                desc: "Secure CRM query retrieves the payment amount, due date and status.",
                log: "[SYS] DB Query: Success | Loan #5894 | Status: DUE"
            },
            {
                title: "LLM Response Generation",
                badge: "LLM Brain",
                metric: "< 500 ms",
                desc: "Language model composes a personalized reply grounded in CRM data.",
                log: "[SYS] Model: LLM Core | Tokens: 52 | Context: Loan #5894"
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
        const timings = [1800, 1800, 3800, 1800, 2400, 3200, 4200];

        let timer;
        const runLoop = (step) => {
            setActiveStep(step);
            timer = setTimeout(() => {
                const nextStep = (step + 1) % timings.length;
                runLoop(nextStep);
            }, timings[step]);
        };

        runLoop(0);

        return () => clearTimeout(timer);
    }, []);

    // Typewriter for the LLM generation step (types the reply char-by-char, line by line)
    useEffect(() => {
        if (activeStep !== 5) {
            setTypedReply("");
            return;
        }
        const full = currentDialog.bot;
        let i = 0;
        const id = setInterval(() => {
            i += 1;
            setTypedReply(full.slice(0, i));
            if (i >= full.length) clearInterval(id);
        }, 16);
        return () => clearInterval(id);
    }, [activeStep, currentDialog.bot]);

    return (
        <div id="engine" className="talkbot-section">
            <div className="talkbot-glow talkbot-glow-1" />
            <div className="talkbot-glow talkbot-glow-2" />

            <div className="talkbot-header">
                <span className="section-label">{t('howItWorks')}</span>
                <h2 className="talkbot-title">{t('engineTitle')}</h2>
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
                                    {activeStep === 0 && (language === "uz" ? "BAZA YUKLANMOQDA..." : language === "ru" ? "ИМПОРТ БАЗЫ..." : "TRIGGERING OUTBOUND LEAD...")}
                                    {activeStep === 1 && (language === "uz" ? "QO'NG'IROQ ULANMOQDA..." : language === "ru" ? "НАБОР НОМЕРА..." : "DIALING SIP CONNECTION...")}
                                    {activeStep === 2 && (language === "uz" ? "MIJOZ GAPIRMOQDA..." : language === "ru" ? "ГОВОРИТ КЛИЕНТ..." : "CUSTOMER SPEAKING...")}
                                    {activeStep === 3 && (language === "uz" ? "STT MATNGA O'TKAZISH..." : language === "ru" ? "STT РАСПОЗНАВАНИЕ РЕЧИ..." : "STT TEXT CONVERSION...")}
                                    {activeStep === 4 && (language === "uz" ? "CRM SO'ROVI..." : language === "ru" ? "ЗАПРОС В CRM..." : "CRM LOOKUP...")}
                                    {activeStep === 5 && (language === "uz" ? "AI JAVOB YARATMOQDA..." : language === "ru" ? "ИИ ГЕНЕРИРУЕТ ОТВЕТ..." : "LLM GENERATING RESPONSE...")}
                                    {activeStep >= 6 && (language === "uz" ? "AI JAVOB QAYTARMOQDA..." : language === "ru" ? "ИИ ОТВЕЧАЕТ..." : "AI VOICE RESPONDING...")}
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
                                            <span className="bubble-author">{language === "uz" ? "Mijoz" : language === "ru" ? "Клиент" : "Customer"}</span>
                                            <p className="bubble-text">{currentDialog.customer}</p>
                                            {activeStep === 2 && (
                                                <div className="noise-wave-container">
                                                    <div className="noise-line static" />
                                                    <div className="noise-line isolated" />
                                                    <span className="noise-tag">{language === "uz" ? "Shovqin filtrlandi (15ms)" : language === "ru" ? "Шум подавлен (15мс)" : "Voice Isolated (15ms)"}</span>
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

                                    {/* CRM lookup */}
                                    {activeStep === 4 && (
                                        <div className="crm-search-visual fade-in-up">
                                            <div className="crm-table">
                                                <div className="crm-header-row">
                                                    <span>CRM Sync</span>
                                                    <span>{language === "uz" ? "Yozuv" : language === "ru" ? "Запись" : "Record"}</span>
                                                </div>
                                                <div className="crm-row">
                                                    <span>{language === "uz" ? "Kredit №" : language === "ru" ? "Кредит №" : "Loan ID"}</span>
                                                    <span>#5894</span>
                                                </div>
                                                <div className="crm-row">
                                                    <span>{language === "uz" ? "Summa" : language === "ru" ? "Сумма" : "Amount due"}</span>
                                                    <span>{language === "en" ? "1,250,000 UZS" : language === "uz" ? "1 250 000 so'm" : "1 250 000 сум"}</span>
                                                </div>
                                                <div className="crm-row">
                                                    <span>{language === "uz" ? "Muddat" : language === "ru" ? "Срок" : "Due date"}</span>
                                                    <span>{language === "uz" ? "30-may" : language === "ru" ? "30 мая" : "May 30"}</span>
                                                </div>
                                                <div className="crm-row">
                                                    <span>{language === "uz" ? "Holat" : language === "ru" ? "Статус" : "Status"}</span>
                                                    <span className="status-due">{language === "uz" ? "TO'LANADI" : language === "ru" ? "К ОПЛАТЕ" : "DUE"}</span>
                                                </div>
                                            </div>
                                            <div className="brain-pulse-container">
                                                <div className="brain-pulse" />
                                                🔒 SECURE CORE SYNC
                                            </div>
                                        </div>
                                    )}

                                    {/* LLM response generation */}
                                    {activeStep === 5 && (
                                        <div className="llm-gen-visual fade-in-up">
                                            <div className="llm-gen-header">
                                                <span className="llm-gen-tag">
                                                    <span className="llm-gen-spinner" />
                                                    {language === "uz" ? "LLM CORE · GENERATSIYA" : language === "ru" ? "LLM CORE · ГЕНЕРАЦИЯ" : "LLM CORE · GENERATING"}
                                                </span>
                                                <span className="llm-gen-model">52 tok</span>
                                            </div>
                                            <div className="llm-context-chips">
                                                <span className="ctx-chip">#5894</span>
                                                <span className="ctx-chip">{language === "en" ? "1,250,000 UZS" : language === "uz" ? "1 250 000 so'm" : "1 250 000 сум"}</span>
                                                <span className="ctx-chip">{language === "uz" ? "30-may" : language === "ru" ? "30 мая" : "May 30"}</span>
                                            </div>
                                            <p className="llm-gen-text">{typedReply}<span className="llm-cursor" /></p>
                                        </div>
                                    )}

                                    {/* Bot Speech Bubble */}
                                    {activeStep >= 6 && (
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
                            <h3 className="pipeline-title">{language === "uz" ? "SYNCALL UNUMDORLIK KO'RSATKICHLARI" : language === "ru" ? "ПОКАЗАТЕЛИ ПРОИЗВОДИТЕЛЬНОСТИ SYNCALL" : "SYNCALL PERFORMANCE SPECS"}</h3>
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
