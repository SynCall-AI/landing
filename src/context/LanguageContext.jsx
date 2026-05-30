import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const translations = {
    uz: {
        // Navbar
        home: "Bosh sahifa",
        features: "Nega biz",
        howItWorks: "Ishga tushirish",
        demo: "Demo",
        faq: "FAQ",
        contactSales: "Bog'lanish",

        // Hero
        heroBadge: "O'zbekiston uchun AI yechimlar",
        heroTitle: "Sizning aqlli AI koll-markazingiz 24/7. Tezroq, sifatliroq, arzonroq.",
        heroSubtitle: "O'zbek va rus tillarida qo'ng'iroqlarni bir zumda qayta ishlash. Katta xodimlar va o'qitish xarajatlarisiz rutinani avtomatlashtiring.",
        heroFeature1: "Ovozli agentlar",
        heroFeature2: "Chatbotlar",
        heroFeature3: "Har qanday telefoniya",
        tryDemo: "Demo tinglash",

        // Talk Bot
        talkBotTitle: "AI ovozli agentimiz bilan tanishing",
        talkBotSubtitle: "Ovozimiz qanchalik tabiiy ekanligini o'zingiz eshiting",
        talkBotButton: "Demo tinglash",

        // Partners
        partnersLabel: "Bizning hamkorlar",
        partnersSubtitle: "kompaniyalar bizga ishonadi",

        // Calllog
        calllogTitle: "Real qo'ng'iroqlarimizdan birini tinglang",
        calllogSubtitle: "AI agentimiz haqiqiy mijozlar so'rovlarini qanday hal qilishini eshiting",

        // Visual Engine Pipeline
        engineTitle: "Syncall Voice Engine Ishlash Tizimi",
        engineSubtitle: "Bilingval qo'ng'iroqlarni qabul qilishdan boshlab brend ovozida javob qaytarishgacha bo'lgan to'liq avtomatlashtirilgan texnologik zanjir",
        engineCard1Title: "1. Bilingval audio oqim",
        engineCard1Desc: "O'zbek va rus tillarida kiruvchi yoki chiquvchi ovozli oqimni qabul qilish. Shovqinni to'suvchi Voice Isolation fon shovqinlarini to'liq filtrlaydi.",
        engineCard2Title: "2. Nutqni aniqlash (STT & NLU)",
        engineCard2Desc: "O'zbek nutqining lahja va slenglarini, tillar qorishmasini 98% aniqlikda matnga o'tkazish va mijoz niyatini (intent) aniqlash.",
        engineCard3Title: "3. CRM va Tizimlar bilan integratsiya",
        engineCard3Desc: "Delta M va kompaniyangiz CRM ma'lumotlar bazasi bilan xavfsiz On-Premise/Cloud integratsiya orqali mijoz statusini yangilash va tekshirish.",
        engineCard4Title: "4. Yuqori sifatli nutq sintezi (TTS)",
        engineCard4Desc: "Sizning eng yaxshi operatoringiz ovozi klonida, inson nutqidan farq qilmaydigan tabiiy ovoz bilan 0.5 soniyada javob qaytarish.",

        // Features
        featuresTitle: "Syncall ni nima ajratib turadi",
        feature1Stat: "1000+ qo'ng'iroq/min",
        heroLiveAnalysis: "Jonli qo'ng'iroq tahlili",
        voiceCloneMatch: "99.2% moslik",
        feature1TagDialect: "Lahja",
        feature1TagMix: "Aralash til",
        feature1TagSlang: "Sleng",
        feature1Title: "Jonli o'zbek nutqini tushunish",
        feature1Desc: "AI o'zbek tilining barcha lahjalarini va tillarning erkin aralashmasini tushunadi. Tizim murakkab so'zlashuv nutqi, sleng va aksentlarni 96% aniqlik bilan anglaydi.",
        feature2Title: "Tabiiy muloqot va shovqin izolyatsiyasi",
        feature2Desc: "Robotni istalgan vaqtda bo'lish mumkin — u darhol jim bo'ladi va tinglaydi. Shovqinni to'suvchi Voice Isolation texnologiyasi bilan har qanday ko'cha shovqinida ham mijoz ovozini aniq ajratib oladi.",
        feature3Title: "Ma'lumotlar to'liq xavfsizligi",
        feature3Desc: "Tizimni Syncall bulutida yoki o'z serverlaringizda (On-Premise) joylashtiring. Ma'lumotlar xavfsizligiga qat'iy talablarga ega bo'lgan banklar va moliya tashkilotlari uchun ideal yechim.",
        feature4Title: "Kompaniya ovozining klonlanishi",
        feature4Desc: "Biz eng yaxshi xodimingiz ovozining aniq raqamli nusxasini yaratishimiz mumkin. Sizning AI har bir mijoz uchun tanish, yoqimli va professional tarzda jaranglaydi.",
        feature5Title: "CRM & Delta M bilan tayyor integratsiya",
        feature5Desc: "Delta M va boshqa CRM tizimlar bilan tayyor integratsiya. Har bir qo'ng'iroqning batafsil AI-tahlilini oling va tizimingizda ma'lumotlarni avtomatik yangilang.",

        // Numbers
        numbersLabel: "Syncall AI raqamlarda",
        numbersTitle: "Syncall AI bilan biznes samaradorligini oshirish",
        numbersStat1Value: "80%",
        numbersStat1Label: "Birinchi qo'ng'iroqdayoq muammolarni to'liq hal qilish (FCR)",
        numbersStat2Value: "-70%",
        numbersStat2Label: "Koll-markaz operatsion xarajatlarining kamayishi",
        numbersStat3Value: "94%",
        numbersStat3Label: "Mijozlarning umumiy qoniqish ko'rsatkichi (CSAT)",
        numbersDesc: "Syncall AI ning ilg'or ovozli agentlari bilan avtomatlashtirish kuchini his eting — mijozlarga xizmat ko'rsatishni o'zgartiring, xarajatlarni kamaytiring va mijozlar mamnuniyatini oshiring.",
        getStarted: "Boshlash",

        // How
        howTitle: "Ishga tushirish bosqichlari",
        howStep1Title: "Biznes tahlil va mantiq loyihalash",
        howStep1Text: "Muvaffaqiyatli keyslaringiz va so'rovlar xususiyatini o'rganamiz. Tabiiy jaranglagan va biznes vazifalaringizga 100% mos o'zaro ta'sir tuzilmasini yaratamiz.",
        howStep2Title: "Neyrotarmoq modellarini sozlash",
        howStep2Text: "STT, LLM va TTS modellarini biznesingizga moslashtiramiz. Neyrotarmoqni aksentlar, maxsus atamalar va dialoglaringiz kontekstini tushunishga o'rgatamiz.",
        howStep3Title: "Avtomatlashtirilgan test va optimallash",
        howStep3Text: "«Test-bot» orqali bir necha daqiqada minglab qo'ng'iroqlarni simulyatsiya qilamiz. Aniqlik va bir zumda javob berishni kafolatlaymiz.",
        howStep4Title: "Ishga tushirish (Production)",
        howStep4Text: "AI-agentlarni telefoniyangizga ulaymiz. Endi tizim qo'ng'iroqlarni qayta ishlaydi, barcha tahlillar to'g'ridan-to'g'ri CRM tizimingizga tushadi.",

        // FAQ
        faqTitle: "Agentlarimiz haqida batafsil",
        faqQ1: "Kiruvchi va chiquvchi qo'ng'iroqlarni qo'llab-quvvatlaysizmi?",
        faqA1: "Ha, bizning AI ovozli agentlarimiz kiruvchi va chiquvchi qo'ng'iroq stsenariylarini boshqarish uchun mo'ljallangan. Mijozlarning so'rovlarini boshqarish, qo'llab-quvvatlash yoki targ'ibot kampaniyalarini o'tkazish kerakmi, bizning platformamiz operatsion talablaringizga muammosiz moslashadi.",
        faqQ2: "Har qanday turdagi telefoniya bilan integratsiya qilasizmi?",
        faqA2: "Albatta. Bizning platformamiz VoIP provayderlari, PBX tizimlari va bulutga asoslangan yechimlar kabi har qanday telefoniya tizimi bilan integratsiya qilish uchun yaratilgan. Provayderdan yoki texnologiya stekidan qat'i nazar, mavjud infrastrukturangiz bilan silliq muvofiqlikni ta'minlaymiz.",
        faqQ3: "Qaysi tillarni qo'llab-quvvatlaysiz?",
        faqA3: "Biz hozirda o'zbek, rus va ingliz tillarini qo'llab-quvvatlaymiz, har bir til uchun tabiiy aksent moslashuvi bilan. Bizning AI ovozli agentlarimiz mintaqaviy lahjalar va nozikliklarni tushunish uchun o'qitilgan, bu mijozlaringiz bilan haqiqiy va madaniy jihatdan mos suhbatlarni ta'minlaydi.",
        faqQ4: "Bir vaqtning o'zida nechta qo'ng'iroq qilishingiz mumkin?",
        faqA4: "Bizning tomonimizdan hech qanday cheklov yo'q — bizning AI infrastrukturamiz cheksiz miqyosda va har qanday qo'ng'iroqgacha bo'lgan hajmni boshqarish uchun mo'ljallangan. Yagona cheklov telefoniya provayderingizning quvvati bo'lishi mumkin.",
        faqQ5: "Qo'ng'iroq tahlilini taqdim etasizmi?",
        faqA5: "Ha, biz sizga aloqa markazi faoliyatingiz haqida chuqur tushunchalar beradigan keng qamrovli real vaqt qo'ng'iroq tahlilini taklif qilamiz.",
        faqQ6: "Sinov davringiz bormi?",
        faqA6: "Ha, biz aloqa markazingizga transformatsion ta'sirni ko'rsatish uchun bepul sinov taklif qilamiz. Biz sizning biznes ehtiyojlaringizga moslashtirilgan maxsus AI agentini o'qitamiz va uni 1000 qo'ng'iroqgacha bepul sinab ko'rishingiz mumkin.",

        // Footer
        footerRights: "Barcha huquqlar himoyalangan",
    },
    ru: {
        // Navbar
        home: "Главная",
        features: "Почему мы",
        howItWorks: "Этапы запуска",
        demo: "Демо",
        faq: "FAQ",
        contactSales: "Связаться",

        // Hero
        heroBadge: "AI решения для Узбекистана",
        heroTitle: "Ваш умный AI колл-центр 24/7. Быстрее, качественнее, дешевле.",
        heroSubtitle: "Мгновенная обработка звонков на узбекском и русском языках. Автоматизируйте рутину без затрат на огромный штат и обучение.",
        heroFeature1: "Голосовые агенты",
        heroFeature2: "Чатботы",
        heroFeature3: "Любая телефония",
        tryDemo: "Послушать демо",

        // Talk Bot
        talkBotTitle: "Познакомьтесь с нашим AI голосовым агентом",
        talkBotSubtitle: "Послушайте сами, насколько естественно звучит наш AI",
        talkBotButton: "Послушать демо",

        // Partners
        partnersLabel: "Наши партнёры",
        partnersSubtitle: "компаний нам доверяют",

        // Calllog
        calllogTitle: "Послушайте реальный звонок нашего AI",
        calllogSubtitle: "Услышьте, как наш AI агент решает настоящие проблемы и вопросы клиентов",

        // Visual Engine Pipeline
        engineTitle: "Технологический Стек Голосового Движка Syncall",
        engineSubtitle: "Автоматизированный цикл обработки звонка: от аудиопотока до генерации ответа бренд войсом",
        engineCard1Title: "1. Двусторонний аудиопоток",
        engineCard1Desc: "Приём входящего или осуществление исходящего звонка. Встроенная технология Voice Isolation мгновенно фильтрует фоновые шумы и музыку.",
        engineCard2Title: "2. Распознавание и Анализ (STT & NLU)",
        engineCard2Desc: "Перевод двуязычной речи (рус/узб) с учётом диалектов, акцентов и разговорного сленга в текст с точностью 98% и распознавание намерений.",
        engineCard3Title: "3. Интеграция с CRM и Delta M",
        engineCard3Desc: "Безопасное соединение (On-Premise или защищенное облако) с базами данных вашей CRM для проверки статусов и автоматического обновления записей.",
        engineCard4Title: "4. Естественный синтез голоса (TTS)",
        engineCard4Desc: "Генерация ответа за 0.5 секунды цифровым клоном вашего лучшего оператора. Голос звучит абсолютно естественно и дружелюбно.",

        // Features
        featuresTitle: "Что делает Syncall особенным",
        feature1Stat: "1000+ звонков/мин",
        heroLiveAnalysis: "Анализ звонков",
        voiceCloneMatch: "99.2% схожесть",
        feature1TagDialect: "Диалекты",
        feature1TagMix: "Микс языков",
        feature1TagSlang: "Сленг",
        feature1Title: "Понимание живой узбекской и русской речи",
        feature1Desc: "ИИ понимает все диалекты узбекского и свободное смешивание языков (узб/рус). Система распознаёт разговорную речь, сленг и акценты с точностью до 96%.",
        feature2Title: "Естественный диалог и шумоподавление",
        feature2Desc: "Робота можно перебивать в любой момент — он мгновенно замолкает и слушает. Благодаря встроенной Voice Isolation, ИИ игнорирует уличный шум, концентрируясь только на голосе клиента.",
        feature3Title: "Абсолютная безопасность данных",
        feature3Desc: "Возможность локального развертывания на ваших серверах (On-Premise) или в защищенном облаке Syncall. Идеальное решение для банков и финтех-компаний с жесткими требованиями к безопасности.",
        feature4Title: "Клонирование голоса бренда",
        feature4Desc: "Мы создаем точную цифровую копию голоса вашего лучшего сотрудника. Ваш ИИ-агент звучит привычно, дружелюбно и на 100% профессионально для каждого клиента.",
        feature5Title: "Готовая интеграция с CRM и Delta M",
        feature5Desc: "Готовая интеграция с Delta M и другими CRM. Автоматически получайте подробный ИИ-анализ каждого звонка и мгновенно обновляйте данные в вашей системе.",

        // Numbers
        numbersLabel: "Syncall AI в цифрах",
        numbersTitle: "Ускорение бизнес-показателей с Syncall AI",
        numbersStat1Value: "80%",
        numbersStat1Label: "Уровень успешного решения вопросов при первом контакте (FCR)",
        numbersStat2Value: "-70%",
        numbersStat2Label: "Снижение расходов на поддержку клиентов",
        numbersStat3Value: "94%",
        numbersStat3Label: "Средний показатель CSAT после внедрения Syncall",
        numbersDesc: "Ощутите силу автоматизации с продвинутыми голосовыми агентами Syncall AI — трансформируйте клиентскую поддержку, снизьте затраты и повысьте удовлетворённость клиентов.",
        getStarted: "Начать",

        // How
        howTitle: "Этапы запуска",
        howStep1Title: "Анализ процессов и проектирование логики",
        howStep1Text: "Изучаем ваши успешные кейсы и специфику запросов. Создаем структуру взаимодействия, которая звучит естественно и на 100% соответствует бизнес-задачам.",
        howStep2Title: "Настройка и адаптация нейросетей",
        howStep2Text: "Адаптируем STT, LLM и TTS модели под ваш бизнес. Тренируем нейросеть понимать акценты, специфические термины и контекст ваших диалогов.",
        howStep3Title: "Автоматизированное стресс-тестирование",
        howStep3Text: "Имитируем тысячи звонков за минуты через тестовых ботов. Гарантируем стабильность, точность ответов и нулевую задержку.",
        howStep4Title: "Запуск в продакшн",
        howStep4Text: "Подключаем AI-агентов к вашей телефонии. Теперь система обрабатывает звонки, а вся аналитика сразу падает в вашу CRM.",

        // FAQ
        faqTitle: "Всё о наших агентах",
        faqQ1: "Поддерживаете ли вы входящие и исходящие звонки?",
        faqA1: "Да, наши AI голосовые агенты разработаны для обработки как входящих, так и исходящих звонков. Нужно ли вам управлять запросами клиентов, предоставлять поддержку или проводить кампании по привлечению клиентов, наша платформа легко адаптируется к вашим операционным требованиям.",
        faqQ2: "Вы интегрируетесь с любым типом телефонии?",
        faqA2: "Абсолютно. Наша платформа создана для интеграции с любой телефонной системой, включая VoIP-провайдеров, PBX-системы и облачные решения. Мы обеспечиваем плавную совместимость с вашей существующей инфраструктурой, независимо от провайдера или технологического стека.",
        faqQ3: "Какие языки вы поддерживаете?",
        faqA3: "В настоящее время мы поддерживаем узбекский, русский и английский языки с естественной адаптацией акцента для каждого языка. Наши AI голосовые агенты обучены понимать региональные диалекты и нюансы.",
        faqQ4: "Сколько звонков вы можете совершать одновременно?",
        faqA4: "С нашей стороны нет ограничений — наша AI-инфраструктура разработана для бесконечного масштабирования и обработки любого объёма звонков. Единственным ограничением может быть пропускная способность вашего телефонного провайдера.",
        faqQ5: "Предоставляете ли вы аналитику звонков?",
        faqA5: "Да, мы предлагаем комплексную аналитику звонков в реальном времени, которая даёт вам глубокое понимание работы вашего контакт-центра.",
        faqQ6: "У вас есть тестовый период?",
        faqA6: "Да, мы предлагаем бесплатную пробную версию. Мы обучим индивидуального AI-агента, адаптированного к потребностям вашего бизнеса, и вы сможете протестировать его бесплатно на 1000 звонков.",

        // Footer
        footerRights: "Все права защищены",
    },
    en: {
        // Navbar
        home: "Home",
        features: "Why us",
        howItWorks: "Launch",
        demo: "Demo",
        faq: "FAQ",
        contactSales: "Contact",

        // Hero
        heroBadge: "AI Solutions for Uzbekistan",
        heroTitle: "Your smart AI call center 24/7. Faster, better, cheaper.",
        heroSubtitle: "Instant call handling in Uzbek and Russian. Automate routine without the costs of a large staff and training.",
        heroFeature1: "Voice Agents",
        heroFeature2: "Chatbots",
        heroFeature3: "Any Telephony",
        tryDemo: "Listen to Demo",

        // Talk Bot
        talkBotTitle: "Experience our AI Voice Agent",
        talkBotSubtitle: "Hear for yourself how natural our AI sounds",
        talkBotButton: "Listen to Demo",

        // Partners
        partnersLabel: "Our Partners",
        partnersSubtitle: "companies trust us",

        // Calllog
        calllogTitle: "Listen to one of our AI calls",
        calllogSubtitle: "Hear how our AI agent handles real-life customer inquiries and problems",

        // Visual Engine Pipeline
        engineTitle: "Syncall Voice Engine Technology Stack",
        engineSubtitle: "An automated end-to-end call processing system: from bilateral audio stream to branded speech synthesis",
        engineCard1Title: "1. Dual Audio Stream",
        engineCard1Desc: "Receives inbound or performs outbound calls. Integrated Voice Isolation automatically filters out background music and noise.",
        engineCard2Title: "2. Recognition & Analysis (STT & NLU)",
        engineCard2Desc: "Transcribes bilingual speech (Uzbek/Russian) accounting for local dialects and mixed-language slang with 98% accuracy.",
        engineCard3Title: "3. CRM & Delta M Integration",
        engineCard3Desc: "Secure connection (On-Premise or Private Cloud) with your CRM database to retrieve profiles and instantly update records.",
        engineCard4Title: "4. Human-like Speech Synthesis (TTS)",
        engineCard4Desc: "Generates high-fidelity voice responses under 0.5s cloned from your top agent, creating comfortable and natural customer experiences.",

        // Features
        featuresTitle: "What makes Syncall special",
        feature1Stat: "1000+ calls/min",
        heroLiveAnalysis: "Live call analysis",
        voiceCloneMatch: "99.2% match",
        feature1TagDialect: "Dialects",
        feature1TagMix: "Language mix",
        feature1TagSlang: "Slang",
        feature1Title: "Native speech understanding",
        feature1Desc: "Our AI understands all Uzbek dialects and free bilingual mixing (Uzbek/Russian). It parses slang, accent variations, and colloquialisms with 96% accuracy.",
        feature2Title: "Natural conversation and interruption handling",
        feature2Desc: "Customers can interrupt the AI agent at any point — it immediately stops speaking to listen. Armed with Voice Isolation, it filters street noises to focus solely on the user.",
        feature3Title: "Enterprise-grade data security",
        feature3Desc: "Deploy in Syncall's secured cloud environment or completely on your own servers (On-Premise). Perfect for banks, fintech, and large enterprises with tight data privacy guidelines.",
        feature4Title: "Branded voice cloning",
        feature4Desc: "We create an identical digital voice clone of your top agent. Your AI sounds familiar, welcoming, and 100% professional to every customer.",
        feature5Title: "Turnkey CRM & Delta M integration",
        feature5Desc: "Ready-made integrations with Delta M and popular CRM software. Automatically receive detailed AI-summarized insights and update records on every call.",

        // Numbers
        numbersLabel: "Syncall AI in Numbers",
        numbersTitle: "Accelerating Success with Syncall AI",
        numbersStat1Value: "80%",
        numbersStat1Label: "First Contact Resolution (FCR) rate achieved by our AI",
        numbersStat2Value: "-70%",
        numbersStat2Label: "Reduction in customer support operational overhead",
        numbersStat3Value: "94%",
        numbersStat3Label: "Average Customer Satisfaction (CSAT) rating after implementation",
        numbersDesc: "Leverage the power of automation with Syncall AI's advanced voice agents — transform customer support, cut costs, and boost customer satisfaction.",
        getStarted: "Get Started",

        // How
        howTitle: "Launch steps",
        howStep1Title: "Process analysis and workflow design",
        howStep1Text: "We analyze your top customer workflows and historical calls. We map a conversation flow that is completely natural and 100% matches your business rules.",
        howStep2Title: "Neural model tuning & adaptation",
        howStep2Text: "We customize STT, LLM, and TTS models for your business. We train the models on dialects, product names, accents, and context.",
        howStep3Title: "Automated simulation & stress-test",
        howStep3Text: "We simulate thousands of concurrent calls within minutes using virtual test agents to ensure zero delay and absolute reliability.",
        howStep4Title: "Production launch",
        howStep4Text: "We connect our AI agents directly to your phone lines. The system starts taking calls, and structured logs flow straight into your CRM.",

        // FAQ
        faqTitle: "Everything About Our Agents",
        faqQ1: "Do you support both incoming and outgoing calls?",
        faqA1: "Yes, our AI voice agents are designed to handle both inbound and outbound call scenarios. Whether you need to manage customer inquiries, provide support, or conduct outreach campaigns, our platform seamlessly adapts to your operational requirements.",
        faqQ2: "Do you integrate with any type of telephony?",
        faqA2: "Absolutely. Our platform is built to integrate with any telephony system, including VoIP providers, PBX systems, and cloud-based solutions. We ensure smooth compatibility with your existing infrastructure, regardless of the provider or technology stack.",
        faqQ3: "What languages do you support?",
        faqA3: "We currently support Uzbek, Russian, and English, with natural accent adaptation for each language. Our AI voice agents are trained to understand regional dialects and nuances.",
        faqQ4: "How many calls can you make simultaneously?",
        faqA4: "There are no limitations on our end — our AI infrastructure is designed to scale infinitely and handle any call volume. The only constraint would be your telephony provider's capacity.",
        faqQ5: "Do you provide call analytics?",
        faqA5: "Yes, we offer comprehensive real-time call analytics that give you deep insights into your call center operations.",
        faqQ6: "Do you have a test period?",
        faqA6: "Yes, we offer a complimentary trial. We'll train a custom AI agent tailored to your business needs, and you can test it free of charge for up to 1,000 calls.",

        // Footer
        footerRights: "All rights reserved",
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ru');

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
