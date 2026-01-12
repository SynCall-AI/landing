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
        features: "Imkoniyatlar",
        howItWorks: "Qanday ishlaydi",
        demo: "Demo",
        faq: "Savol-Javob",
        contactSales: "Sotuvga murojaat",

        // Hero
        tryDemo: "Demo sinab ko'ring",

        // About
        aboutTitle: "Syncall nima?",
        aboutHeading: "Inson kabi gapiruvchi AI ovozli agentlar 24/7 dam olishsiz ishlaydi.",
        aboutDescription: "An'anaviy avtomatlashtirilgan tizimlardan farqli o'laroq, u kontekst, ohang va nozikliklarni tushunadi - bu uni jonli agentdan deyarli farq qilib bo'lmaydigan qiladi. Kun bo'ladimi, tun bo'ladimi, bot har doim yordam berish, mijozlarni jalb qilish, savollarga javob berish yoki muammolarni hal qilishga tayyor.",

        // Strengths
        strengthsTitle: "Ortdagi kuchlar",
        strength1Title: "5x xarajatlarni kamaytirish",
        strength1Text: "Oddiy qo'ng'iroqlar va vazifalarni avtomatlashtirish orqali aloqa markazi xarajatlarini qisqartiring.",
        strength2Title: "U inson kabi gapiradi",
        strength2Text: "Jonli suhbatlar uchun tabiiy ohang, pauza va intonatsiya.",
        strength3Title: "24/7 to'xtovsiz ish",
        strength3Text: "Har doim mavjud, tanaffussiz, ishlamay qolishsiz.",
        strength4Title: "Ko'p tilli qo'llab-quvvatlash va aksent moslashuvi",
        strength4Text: "Mijozingiz tilida gapiradi, mintaqaviy aksentlarni tushunadi.",
        strength5Title: "Real vaqt muammolar tahlili",
        strength5Text: "Muammolarni zudlik bilan aniqlang, asosiy ko'rsatkichlarni kuzating va mijozlar tajribasini tezda yaxshilang.",
        strength6Title: "Moslashuvchan javoblar",
        strength6Text: "Kontekst, ohang va mijoz xatti-harakatiga qarab javoblarni sozlaydi.",

        // Calllog
        calllogTitle: "Minglab qo'ng'iroqlarimizdan birini tinglang",

        // How
        howTitle: "Qanday ishlaydi",
        howStep1Title: "Skript ishlab chiqish va tasdiqlash",
        howStep1Text: "Qo'ng'iroq oqimlarini tuzing, muvofiqlikni ta'minlang va manfaatdor tomonlarning tasdig'ini oling.",
        howStep2Title: "Bot o'qitish",
        howStep2Text: "Qo'ng'iroq oqimlarini tuzing, muvofiqlikni ta'minlang va manfaatdor tomonlarning tasdig'ini oling.",
        howStep3Title: "Sinov",
        howStep3Text: "Qo'ng'iroq simulyatsiyalarini o'tkazing, chekka holatlarni tekshiring va kechikishni o'lchang.",
        howStep4Title: "Telefoniya integratsiyasi",
        howStep4Text: "Agentlarni telefoniya sozlamalari orqali jonli qo'ng'iroqlarga joylashtiring.",

        // Integrate
        integrateTitle: "Har qanday turdagi telefoniya bilan integratsiya",

        // Tab
        tabEfficiencyGains: "Samaradorlik yutuqlari",
        tabBetterCX: "Yaxshi CX",
        tabCostSavings: "Xarajatlarni tejash",
        tabHappierAgents: "Baxtli agentlar",
        tabContent1Title: "AI agentlarga kuniga 3 soatgacha vaqt tejaydi",
        tabContent1Desc: "Takrorlanuvchi ish jarayonlarini avtomatlashtiring va jamoangizga yuqori qiymatli o'zaro ta'sirlarga e'tibor qaratishga imkon bering",
        tabContent2Title: "AI quvvatli tushunchalar bilan miqyosda shaxsiylashtirilgan tajribalarni taqdim eting",
        tabContent2Desc: "Mijozlar ehtiyojlarini bir zumda tushuning va har safar moslashtirilgan yechimlarni taqdim eting",
        tabContent3Title: "Xizmat sifatini yaxshilagan holda operatsion xarajatlarni 40% ga kamaytiring",
        tabContent3Desc: "Aqlli avtomatlashtirish ajoyib mijozlar qoniqishini saqlab, umumiy xarajatlarni qisqartiradi",
        tabContent4Title: "Jamoangizni asabiylashuvni yo'q qiladigan AI vositalari bilan kuchaytiring",
        tabContent4Desc: "Zerikarli vazifalarni olib tashlang va agentlarga muvaffaqiyat uchun zarur vositalarni bering",

        // FAQ
        faqTitle: "Agentlarimiz haqida hamma narsa",
        faqQ1: "Kiruvchi va chiquvchi qo'ng'iroqlarni qo'llab-quvvatlaysizmi?",
        faqA1: "Ha, bizning AI ovozli agentlarimiz kiruvchi va chiquvchi qo'ng'iroq stsenariylarini boshqarish uchun mo'ljallangan. Mijozlarning so'rovlarini boshqarish, qo'llab-quvvatlash yoki targ'ibot kampaniyalarini o'tkazish kerakmi, bizning platformamiz operatsion talablaringizga muammosiz moslashadi.",
        faqQ2: "Har qanday turdagi telefoniya bilan integratsiya qilasizmi?",
        faqA2: "Albatta. Bizning platformamiz VoIP provayderlari, PBX tizimlari va bulutga asoslangan yechimlar kabi har qanday telefoniya tizimi bilan integratsiya qilish uchun yaratilgan. Provayderdan yoki texnologiya stekidan qat'i nazar, mavjud infrastrukturangiz bilan silliq muvofiqlikni ta'minlaymiz.",
        faqQ3: "Qaysi tillarni qo'llab-quvvatlaysiz?",
        faqA3: "Biz hozirda o'zbek, rus va ingliz tillarini qo'llab-quvvatlaymiz, har bir til uchun tabiiy aksent moslashuvi bilan. Bizning AI ovozli agentlarimiz mintaqaviy lahjalar va nozikliklarni tushunish uchun o'qitilgan, bu mijozlaringiz bilan haqiqiy va madaniy jihatdan mos suhbatlarni ta'minlaydi.",
        faqQ4: "Bir vaqtning o'zida nechta qo'ng'iroq qilishingiz mumkin?",
        faqA4: "Bizning tomonimizdan hech qanday cheklov yo'q - bizning AI infrastrukturamiz cheksiz miqyosda va har qanday qo'ng'iroq hajmini boshqarish uchun mo'ljallangan. Yagona cheklov telefoniya provayderingizning quvvati bo'lishi mumkin. Bizning botlarimiz ishlash yomonlashuvlarsiz cheksiz bir vaqtdagi qo'ng'iroqlarni qayta ishlashi mumkin.",
        faqQ5: "Qo'ng'iroq tahlilini taqdim etasizmi?",
        faqA5: "Ha, biz sizga aloqa markazi faoliyatingiz haqida chuqur tushunchalar beradigan keng qamrovli real vaqt qo'ng'iroq tahlilini taklif qilamiz. Siz suhbat mavzulari, kayfiyat, agent ishlashi, mijozlarning og'riqli nuqtalari va xizmat sifati va biznes natijalarini doimiy ravishda yaxshilash uchun asosiy ko'rsatkichlarni tahlil qilishingiz mumkin.",
        faqQ6: "Sinov davringiz bormi?",
        faqA6: "Ha, biz aloqa markazingizga transformatsion ta'sirni ko'rsatish uchun bepul sinov taklif qilamiz. Biz sizning biznes ehtiyojlaringizga moslashtirilgan maxsus AI agentini o'qitamiz va uni 1000 qo'ng'iroqgacha bepul sinab ko'rishingiz mumkin. Texnologiyamiz mijozlar bilan muloqotingizni qanday inqilob qilishi mumkinligini o'zingiz his eting.",

        // Footer
        footerRights: "Barcha huquqlar himoyalangan",
    },
    ru: {
        // Navbar
        home: "Главная",
        features: "Возможности",
        howItWorks: "Как работает",
        demo: "Демо",
        faq: "FAQ",
        contactSales: "Свяжитесь с отделом продаж",

        // Hero
        tryDemo: "Послушать демо",

        // About
        aboutTitle: "Что такое Syncall?",
        aboutHeading: "AI голосовые агенты, которые говорят как человек и работают 24/7 без перерывов.",
        aboutDescription: "В отличие от традиционных автоматизированных систем, он понимает контекст, тон и нюансы — что делает его почти неотличимым от живого агента. Днём или ночью, бот всегда готов помочь, конвертировать лиды, отвечать на вопросы или решать проблемы.",

        // Strengths
        strengthsTitle: "Преимущества",
        strength1Title: "Снижение затрат в 5 раз",
        strength1Text: "Сократите расходы контакт-центра, автоматизируя рутинные звонки и задачи.",
        strength2Title: "Говорит как человек",
        strength2Text: "Естественный тон, паузы и интонация для живых разговоров.",
        strength3Title: "Работа 24/7 без остановок",
        strength3Text: "Всегда доступен, без перерывов, без простоев.",
        strength4Title: "Многоязычная поддержка и адаптация акцента",
        strength4Text: "Говорит на языке вашего клиента, понимает региональные акценты.",
        strength5Title: "Аналитика проблем в реальном времени",
        strength5Text: "Мгновенно выявляйте проблемы, отслеживайте ключевые показатели и улучшайте клиентский опыт на лету.",
        strength6Title: "Адаптивные ответы",
        strength6Text: "Корректирует ответы на основе контекста, тона и поведения клиента.",

        // Calllog
        calllogTitle: "Послушайте один из тысяч наших звонков",

        // How
        howTitle: "Как это работает",
        howStep1Title: "Разработка и утверждение скрипта",
        howStep1Text: "Составьте потоки звонков, обеспечьте соответствие требованиям и получите одобрение заинтересованных сторон.",
        howStep2Title: "Обучение бота",
        howStep2Text: "Составьте потоки звонков, обеспечьте соответствие требованиям и получите одобрение заинтересованных сторон.",
        howStep3Title: "Тестирование",
        howStep3Text: "Запустите симуляции звонков, проверьте крайние случаи и измерьте задержку.",
        howStep4Title: "Интеграция с телефонией",
        howStep4Text: "Разверните агентов на реальных звонках через вашу телефонную систему.",

        // Integrate
        integrateTitle: "Интеграция с любым типом телефонии",

        // Tab
        tabEfficiencyGains: "Повышение эффективности",
        tabBetterCX: "Лучший CX",
        tabCostSavings: "Экономия затрат",
        tabHappierAgents: "Довольные агенты",
        tabContent1Title: "AI экономит агентам до 3 часов в день, обрабатывая рутинные задачи",
        tabContent1Desc: "Автоматизируйте повторяющиеся рабочие процессы и позвольте вашей команде сосредоточиться на ценных взаимодействиях",
        tabContent2Title: "Предоставляйте персонализированный опыт в масштабе с AI-инсайтами",
        tabContent2Desc: "Мгновенно понимайте потребности клиентов и предоставляйте индивидуальные решения каждый раз",
        tabContent3Title: "Снизьте операционные расходы на 40%, улучшив качество обслуживания",
        tabContent3Desc: "Умная автоматизация сокращает накладные расходы, сохраняя исключительную удовлетворённость клиентов",
        tabContent4Title: "Расширьте возможности вашей команды с AI-инструментами, которые устраняют разочарование",
        tabContent4Desc: "Уберите рутинные задачи и дайте агентам инструменты, необходимые для успеха",

        // FAQ
        faqTitle: "Всё о наших агентах",
        faqQ1: "Поддерживаете ли вы входящие и исходящие звонки?",
        faqA1: "Да, наши AI голосовые агенты разработаны для обработки как входящих, так и исходящих звонков. Нужно ли вам управлять запросами клиентов, предоставлять поддержку или проводить кампании по привлечению клиентов, наша платформа легко адаптируется к вашим операционным требованиям.",
        faqQ2: "Вы интегрируетесь с любым типом телефонии?",
        faqA2: "Абсолютно. Наша платформа создана для интеграции с любой телефонной системой, включая VoIP-провайдеров, PBX-системы и облачные решения. Мы обеспечиваем плавную совместимость с вашей существующей инфраструктурой, независимо от провайдера или технологического стека.",
        faqQ3: "Какие языки вы поддерживаете?",
        faqA3: "В настоящее время мы поддерживаем узбекский, русский и английский языки с естественной адаптацией акцента для каждого языка. Наши AI голосовые агенты обучены понимать региональные диалекты и нюансы, обеспечивая аутентичные и культурно соответствующие разговоры с вашими клиентами.",
        faqQ4: "Сколько звонков вы можете совершать одновременно?",
        faqA4: "С нашей стороны нет ограничений — наша AI-инфраструктура разработана для бесконечного масштабирования и обработки любого объёма звонков. Единственным ограничением может быть пропускная способность вашего телефонного провайдера. Наши боты могут обрабатывать неограниченное количество одновременных звонков без снижения производительности.",
        faqQ5: "Предоставляете ли вы аналитику звонков?",
        faqA5: "Да, мы предлагаем комплексную аналитику звонков в реальном времени, которая даёт вам глубокое понимание работы вашего контакт-центра. Вы можете анализировать темы разговоров, настроение, производительность агентов, болевые точки клиентов и ключевые показатели для постоянного улучшения качества обслуживания и бизнес-результатов.",
        faqQ6: "У вас есть тестовый период?",
        faqA6: "Да, мы предлагаем бесплатную пробную версию, чтобы продемонстрировать трансформационное влияние на ваш контакт-центр. Мы обучим индивидуального AI-агента, адаптированного к потребностям вашего бизнеса, и вы сможете протестировать его бесплатно в течение 1000 звонков. Испытайте из первых рук, как наша технология может революционизировать взаимодействие с клиентами.",

        // Footer
        footerRights: "Все права защищены",
    },
    en: {
        // Navbar
        home: "Home",
        features: "Features",
        howItWorks: "How It Works",
        demo: "Demo",
        faq: "FAQ",
        contactSales: "Contact sales",

        // Hero
        tryDemo: "Try Demo",

        // About
        aboutTitle: "What is Syncall?",
        aboutHeading: "AI Voice Agents that speak like a human and works 24/7 without breaks.",
        aboutDescription: "Unlike traditional automated systems, it understands context, tone, and nuance — making it nearly indistinguishable from a live agent. Whether it's day or night, the bot is always ready to assist, convert leads, answer questions, or resolve issues.",

        // Strengths
        strengthsTitle: "The strengths behind",
        strength1Title: "5x cost reduction",
        strength1Text: "Cut contact center costs by automating routine calls and tasks.",
        strength2Title: "It speaks as a human",
        strength2Text: "Natural tone, pauses, and intonation for lifelike conversations.",
        strength3Title: "24/7 non-stop work",
        strength3Text: "Always available, no breaks, no downtime.",
        strength4Title: "Multilingual support and accent adaptation",
        strength4Text: "Speaks your customer's language, understands regional accents.",
        strength5Title: "Real-time issue analytics",
        strength5Text: "Detect issues instantly, monitor key metrics, and improve customer experience on the fly.",
        strength6Title: "Adaptive responses",
        strength6Text: "Adjusts replies based on context, tone, and customer behavior.",

        // Calllog
        calllogTitle: "Take a listen to one of thousands of our calls",

        // How
        howTitle: "How it works",
        howStep1Title: "Script development and approval",
        howStep1Text: "Draft call flows, ensure compliance, and secure stakeholder approval.",
        howStep2Title: "Bot training",
        howStep2Text: "Draft call flows, ensure compliance, and secure stakeholder approval.",
        howStep3Title: "Testing",
        howStep3Text: "Run call simulations, validate edge cases, and measure latency.",
        howStep4Title: "Telephony integration",
        howStep4Text: "Deploy agents to live phone calls via your telephony setup.",

        // Integrate
        integrateTitle: "Integrate with any type of telephony",

        // Tab
        tabEfficiencyGains: "Efficiency Gains",
        tabBetterCX: "Better CX",
        tabCostSavings: "Cost Savings",
        tabHappierAgents: "Happier Agents",
        tabContent1Title: "AI saves agents up to 3h per day by handling routine tasks",
        tabContent1Desc: "Automate repetitive workflows and let your team focus on high-value interactions",
        tabContent2Title: "Deliver personalized experiences at scale with AI-powered insights",
        tabContent2Desc: "Understand customer needs instantly and provide tailored solutions every time",
        tabContent3Title: "Reduce operational costs by 40% while improving service quality",
        tabContent3Desc: "Smart automation cuts overhead while maintaining exceptional customer satisfaction",
        tabContent4Title: "Empower your team with AI tools that eliminate frustration",
        tabContent4Desc: "Remove mundane tasks and give agents the tools they need to succeed",

        // FAQ
        faqTitle: "Everything About Our Agents",
        faqQ1: "Do you support both incoming and outgoing calls?",
        faqA1: "Yes, our AI voice agents are designed to handle both inbound and outbound call scenarios. Whether you need to manage customer inquiries, provide support, or conduct outreach campaigns, our platform seamlessly adapts to your operational requirements.",
        faqQ2: "Do you integrate with any type of telephony?",
        faqA2: "Absolutely. Our platform is built to integrate with any telephony system, including VoIP providers, PBX systems, and cloud-based solutions. We ensure smooth compatibility with your existing infrastructure, regardless of the provider or technology stack.",
        faqQ3: "What languages do you support?",
        faqA3: "We currently support Uzbek, Russian, and English, with natural accent adaptation for each language. Our AI voice agents are trained to understand regional dialects and nuances, ensuring authentic and culturally appropriate conversations with your customers.",
        faqQ4: "How many calls can you make simultaneously?",
        faqA4: "There are no limitations on our end—our AI infrastructure is designed to scale infinitely and handle any call volume. The only constraint would be your telephony provider's capacity. Our bots can process unlimited concurrent calls without performance degradation.",
        faqQ5: "Do you provide call analytics?",
        faqA5: "Yes, we offer comprehensive real-time call analytics that give you deep insights into your call center operations. You can analyze conversation topics, sentiment, agent performance, customer pain points, and key metrics to continuously improve service quality and business outcomes.",
        faqQ6: "Do you have a test period?",
        faqA6: "Yes, we offer a complimentary trial to demonstrate the transformative impact on your call center. We'll train a custom AI agent tailored to your business needs, and you can test it free of charge for up to 1,000 calls. Experience firsthand how our technology can revolutionize your customer engagement.",

        // Footer
        footerRights: "All rights reserved",
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('uz'); // Uzbek as default

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
