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
        howItWorks: "Ishga tushirish bosqichlari",
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
        calllogTitle: "Minglab qo'ng'iroqlarimizdan birini tinglang",
        calllogSubtitle: "AI agentimiz real qo'ng'iroqlarda qanday ishlashini eshiting",

        // Features
        featuresTitle: "Syncall ni nima ajratib turadi",
        feature1Stat: "1000+ qo'ng'iroq/min",
        heroLiveAnalysis: "Jonli qo'ng'iroq tahlili",
        voiceCloneMatch: "99.2% moslik",
        feature1TagDialect: "Lahja",
        feature1TagMix: "Aralash til",
        feature1TagSlang: "Sleng",
        feature1Title: "Jonli nutqni tushunish",
        feature1Desc: "AI o'zbek tilining barcha lahjalarini va tillarning erkin aralashmasini tushunadi. Tizim murakkab so'zlashuv nutqi, sleng va aksentlarni 98% aniqlik bilan anglaydi.",
        feature2Title: "Tabiiy muloqot",
        feature2Desc: "Robotni bo'lish mumkin — u jim bo'ladi va tinglaydi. Voice Isolation tufayli tizim ko'cha shovqini va musiqani e'tiborsiz qoldiradi, faqat mijoz ovoziga e'tibor qaratadi.",
        feature3Title: "Ma'lumotlar xavfsizligi",
        feature3Desc: "Tizimni Syncall bulutida yoki o'z serverlaringizda (On-Premise) joylashtiring. Ma'lumotlar xavfsizligiga qat'iy talablarga ega kompaniyalar uchun ideal yechim.",
        feature4Title: "Ovozni klonlash",
        feature4Desc: "Biz eng yaxshi xodimingiz ovozining aniq raqamli nusxasini yaratishimiz mumkin. Sizning AI har bir mijoz uchun tanish va professional tarzda jaranglaydi.",
        feature5Title: "To'liq nazorat",
        feature5Desc: "Delta M va boshqa CRM tizimlar bilan tayyor integratsiya. Har bir qo'ng'iroqning batafsil AI-tahlilini oling va tizimingizda ma'lumotlarni avtomatik yangilang.",

        // Numbers
        numbersLabel: "Syncall AI raqamlarda",
        numbersTitle: "Syncall AI bilan muvaffaqiyatni tezlashtirish",
        numbersStat1Value: "80%",
        numbersStat1Label: "Mijozlar muammolarini hal qilishning o'rtacha muvaffaqiyat darajasi",
        numbersStat2Value: "-70%",
        numbersStat2Label: "Mijozlarga xizmat ko'rsatish xarajatlarining kamayishi",
        numbersStat3Value: "94%",
        numbersStat3Label: "Syncall dan foydalangandan keyin mijozlar qoniqish darajasi",
        numbersDesc: "Syncall AI ning ilg'or chatbotlari bilan avtomatlashtirishning kuchini his eting — mijozlarga xizmat ko'rsatishni o'zgartiring, xarajatlarni kamaytiring va mijozlar qoniqishini oshiring.",
        getStarted: "Boshlash",

        // How
        howTitle: "Ishga tushirish bosqichlari",
        howStep1Title: "Keyslarni tahlil qilish va mantiq loyihalash",
        howStep1Text: "Muvaffaqiyatli keyslaringiz va so'rovlar xususiyatini o'rganamiz. Tabiiy jaranglagan va biznes vazifalaringizga 100% mos o'zaro ta'sir tuzilmasini yaratamiz.",
        howStep2Title: "Texnik sozlash",
        howStep2Text: "STT, LLM va TTS modellarini biznesingizga moslashtiramiz. Neyrotarmoqni aksentlar, maxsus atamalar va dialoglaringiz kontekstini tushunishga o'rgatamiz.",
        howStep3Title: "Avtomatlashtirilgan sinov",
        howStep3Text: "«Test-bot» orqali bir necha daqiqada minglab qo'ng'iroqlarni simulyatsiya qilamiz. Aniqlik va bir zumda javob berishni kafolatlaymiz.",
        howStep4Title: "Prodakshnga chiqarish",
        howStep4Text: "AI-agentlarni telefoniyangizga ulaymiz. Endi tizim qo'ng'iroqlarni qayta ishlaydi, barcha tahlillar to'g'ridan-to'g'ri CRM tizimingizga tushadi.",

        // FAQ
        faqTitle: "Agentlarimiz haqida hamma narsa",
        faqQ1: "Kiruvchi va chiquvchi qo'ng'iroqlarni qo'llab-quvvatlaysizmi?",
        faqA1: "Ha, bizning AI ovozli agentlarimiz kiruvchi va chiquvchi qo'ng'iroq stsenariylarini boshqarish uchun mo'ljallangan. Mijozlarning so'rovlarini boshqarish, qo'llab-quvvatlash yoki targ'ibot kampaniyalarini o'tkazish kerakmi, bizning platformamiz operatsion talablaringizga muammosiz moslashadi.",
        faqQ2: "Har qanday turdagi telefoniya bilan integratsiya qilasizmi?",
        faqA2: "Albatta. Bizning platformamiz VoIP provayderlari, PBX tizimlari va bulutga asoslangan yechimlar kabi har qanday telefoniya tizimi bilan integratsiya qilish uchun yaratilgan. Provayderdan yoki texnologiya stekidan qat'i nazar, mavjud infrastrukturangiz bilan silliq muvofiqlikni ta'minlaymiz.",
        faqQ3: "Qaysi tillarni qo'llab-quvvatlaysiz?",
        faqA3: "Biz hozirda o'zbek, rus va ingliz tillarini qo'llab-quvvatlaymiz, har bir til uchun tabiiy aksent moslashuvi bilan. Bizning AI ovozli agentlarimiz mintaqaviy lahjalar va nozikliklarni tushunish uchun o'qitilgan, bu mijozlaringiz bilan haqiqiy va madaniy jihatdan mos suhbatlarni ta'minlaydi.",
        faqQ4: "Bir vaqtning o'zida nechta qo'ng'iroq qilishingiz mumkin?",
        faqA4: "Bizning tomonimizdan hech qanday cheklov yo'q — bizning AI infrastrukturamiz cheksiz miqyosda va har qanday qo'ng'iroq hajmini boshqarish uchun mo'ljallangan. Yagona cheklov telefoniya provayderingizning quvvati bo'lishi mumkin.",
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
        calllogTitle: "Послушайте один из тысяч наших звонков",
        calllogSubtitle: "Услышьте, как наш AI агент работает в реальных звонках",

        // Features
        featuresTitle: "Что делает Syncall особенным",
        feature1Stat: "1000+ звонков/мин",
        heroLiveAnalysis: "Анализ звонков",
        voiceCloneMatch: "99.2% схожесть",
        feature1TagDialect: "Диалекты",
        feature1TagMix: "Микс языков",
        feature1TagSlang: "Сленг",
        feature1Title: "Понимание живой речи",
        feature1Desc: "ИИ понимает все диалекты узбекского и свободное смешивание языков. Система распознаёт сленг, акценты и разговорную речь с точностью 98%.",
        feature2Title: "Естественное общение",
        feature2Desc: "Робота можно перебивать — он замолчит и выслушает. Благодаря Voice Isolation система игнорирует шум улицы и музыку, фокусируясь только на голосе клиента.",
        feature3Title: "Безопасность данных",
        feature3Desc: "Разверните систему в облаке Syncall или на собственных серверах (On-Premise). Идеальное решение для компаний с жесткими требованиями к безопасности данных.",
        feature4Title: "Клонирование голоса",
        feature4Desc: "Мы можем создать точную цифровую копию голоса вашего лучшего сотрудника. Ваш ИИ будет звучать привычно и профессионально для каждого клиента.",
        feature5Title: "Полный контроль",
        feature5Desc: "Готовая интеграция с Delta M и другими CRM. Получайте детальный AI-анализ каждого звонка и автоматическое обновление данных в вашей системе.",

        // Numbers
        numbersLabel: "Syncall AI в цифрах",
        numbersTitle: "Ускорение успеха с Syncall AI",
        numbersStat1Value: "80%",
        numbersStat1Label: "Средний показатель успешного решения проблем клиентов",
        numbersStat2Value: "-70%",
        numbersStat2Label: "Снижение расходов на клиентскую поддержку",
        numbersStat3Value: "94%",
        numbersStat3Label: "Средний уровень CSAT после внедрения Syncall",
        numbersDesc: "Ощутите силу автоматизации с продвинутыми голосовыми агентами Syncall AI — трансформируйте клиентскую поддержку, снизьте затраты и повысьте удовлетворённость клиентов.",
        getStarted: "Начать",

        // How
        howTitle: "Этапы запуска",
        howStep1Title: "Анализ кейсов и проектирование логики",
        howStep1Text: "Изучаем ваши успешные кейсы и специфику запросов. Создаем структуру взаимодействия, которая звучит естественно и на 100% соответствует бизнес-задачам.",
        howStep2Title: "Техническая настройка",
        howStep2Text: "Адаптируем STT, LLM и TTS модели под ваш бизнес. Тренируем нейросеть понимать акценты, специфические термины и контекст ваших диалогов.",
        howStep3Title: "Автоматизированное тестирование",
        howStep3Text: "Имитируем тысячи звонков за минуты через «тест-бота». Гарантируем точность и мгновенную реакцию.",
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
        howItWorks: "Launch steps",
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
        calllogTitle: "Listen to one of thousands of our calls",
        calllogSubtitle: "Hear how our AI agent performs in real calls",

        // Features
        featuresTitle: "What makes Syncall special",
        feature1Stat: "1000+ calls/min",
        heroLiveAnalysis: "Live call analysis",
        voiceCloneMatch: "99.2% match",
        feature1TagDialect: "Dialects",
        feature1TagMix: "Language mix",
        feature1TagSlang: "Slang",
        feature1Title: "Live speech understanding",
        feature1Desc: "AI understands all Uzbek dialects and free language mixing. The system recognizes slang, accents, and colloquial speech with 98% accuracy.",
        feature2Title: "Natural conversation",
        feature2Desc: "You can interrupt the bot — it will pause and listen. Thanks to Voice Isolation, the system ignores street noise and music, focusing only on the customer's voice.",
        feature3Title: "Data security",
        feature3Desc: "Deploy the system in Syncall's cloud or on your own servers (On-Premise). The ideal solution for companies with strict data security requirements.",
        feature4Title: "Voice cloning",
        feature4Desc: "We can create an exact digital copy of your best employee's voice. Your AI will sound familiar and professional to every customer.",
        feature5Title: "Full control",
        feature5Desc: "Ready-made integration with Delta M and other CRMs. Get detailed AI analysis of every call and automatic data updates in your system.",

        // Numbers
        numbersLabel: "Syncall AI in Numbers",
        numbersTitle: "Accelerating Success with Syncall AI",
        numbersStat1Value: "80%",
        numbersStat1Label: "Average success rate of resolving customer issues",
        numbersStat2Value: "-70%",
        numbersStat2Label: "Decrease in customer support expenses",
        numbersStat3Value: "94%",
        numbersStat3Label: "Average CSAT after using Syncall",
        numbersDesc: "Experience the power of automation with Syncall AI's advanced voice bots, transforming customer support, reducing costs, and driving unprecedented customer satisfaction.",
        getStarted: "Get Started",

        // How
        howTitle: "Launch steps",
        howStep1Title: "Case analysis and logic design",
        howStep1Text: "We study your successful cases and request specifics. We create an interaction structure that sounds natural and 100% matches your business goals.",
        howStep2Title: "Technical setup",
        howStep2Text: "We adapt STT, LLM, and TTS models to your business. We train the neural network to understand accents, specific terms, and your dialogue context.",
        howStep3Title: "Automated testing",
        howStep3Text: "We simulate thousands of calls in minutes via a test bot. We guarantee accuracy and instant response.",
        howStep4Title: "Launch to production",
        howStep4Text: "We connect AI agents to your telephony. Now the system handles calls and all analytics go straight to your CRM.",

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
