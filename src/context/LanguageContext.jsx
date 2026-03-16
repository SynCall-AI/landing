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
        faq: "FAQ",
        contactSales: "Bog'lanish",

        // Hero
        heroBadge: "O'zbekiston uchun AI yechimlar",
        heroTitle: "Call-markazingiz uchun AI ovozli agentlar",
        heroSubtitle: "Sizning 24/7 AI koll-markazingiz. Tezroq, aqlliroq va arzonroq.",
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
        featuresTitle: "Barcha kerakli imkoniyatlar va undan ko'proq...",
        feature1Title: "Kuchli tahlillar",
        feature1Desc: "AI yordamida qo'llab-quvvatlash suhbatlarini tahlil qilib, mijozlaringizni yaxshiroq tushuning.",
        feature2Title: "Ko'p tilli qo'llab-quvvatlash",
        feature2Desc: "Mijoz tilini aniqlang va 3+ tilda maxsus avtomatlashtirishni ishga tushiring.",
        feature3Title: "Integratsiya imkoniyatlari",
        feature3Desc: "Bizning integratsiyalarimiz jamoangiz sevadigan ilovalar bilan ishlashni osonlashtiradi.",
        feature4Title: "Xavfsizlik birinchi o'rinda",
        feature4Desc: "Ilg'or shifrlash va xavfsiz kirish nazorati mijozlar ma'lumotlarini himoya qiladi.",
        feature5Title: "Murakkab vazifalarni hal qilish",
        feature5Desc: "AI agent savollarga javob berishdan tashqariga chiqib, bir nechta vositalarni integratsiya qilish orqali mijozlarning murakkab muammolarini hal qiladi.",

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
        howTitle: "Qanday ishlaydi",
        howStep1Title: "Skript ishlab chiqish va tasdiqlash",
        howStep1Text: "Qo'ng'iroq oqimlarini tuzing, muvofiqlikni ta'minlang va manfaatdor tomonlarning tasdig'ini oling.",
        howStep2Title: "Bot o'qitish",
        howStep2Text: "Qo'ng'iroq oqimlarini tuzing, muvofiqlikni ta'minlang va manfaatdor tomonlarning tasdig'ini oling.",
        howStep3Title: "Sinov",
        howStep3Text: "Qo'ng'iroq simulyatsiyalarini o'tkazing, chekka holatlarni tekshiring va kechikishni o'lchang.",
        howStep4Title: "Telefoniya integratsiyasi",
        howStep4Text: "Agentlarni telefoniya sozlamalari orqali jonli qo'ng'iroqlarga joylashtiring.",

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
        features: "Возможности",
        howItWorks: "Как работает",
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
        featuresTitle: "Все нужные функции и даже больше...",
        feature1Title: "Детальная аналитика",
        feature1Desc: "Лучше понимайте клиентов с помощью AI-анализа разговоров службы поддержки.",
        feature2Title: "Мультиязычная поддержка",
        feature2Desc: "Определяйте язык клиента и запускайте автоматизацию на 3+ языках.",
        feature3Title: "Возможности интеграции",
        feature3Desc: "Наши интеграции упрощают работу с инфраструктурой, которую уже использует ваша команда.",
        feature4Title: "Безопасность прежде всего",
        feature4Desc: "Продвинутое шифрование и контроль доступа защищают данные клиентов.",
        feature5Title: "Решение сложных задач",
        feature5Desc: "Наши голосовые агенты выходят за рамки ответов на вопросы, решая сложные проблемы клиентов через интеграцию с множеством инструментов.",

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
        features: "Features",
        howItWorks: "How It Works",
        demo: "Demo",
        faq: "FAQ",
        contactSales: "Contact",

        // Hero
        heroBadge: "AI Solutions for Uzbekistan",
        heroTitle: "Your 24/7 multilingual AI call center. Faster, smarter, and cheaper",
        heroSubtitle: "Instant call handling in Uzbek and Russian. Automate routine tasks without the costs of hiring and training a large team.",
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
        featuresTitle: "All the features you need and more...",
        feature1Title: "Powerful analytics",
        feature1Desc: "Better understand your customers with AI-powered analysis of support conversations.",
        feature2Title: "Multilingual support",
        feature2Desc: "Detect a customer's language and trigger custom-language automations across 3+ languages.",
        feature3Title: "Integration capabilities",
        feature3Desc: "Our integrations make it easy to work with the applications your teams already love.",
        feature4Title: "Security first",
        feature4Desc: "Advanced encryption and secure access controls protect customer data on this platform.",
        feature5Title: "Solving complex tasks",
        feature5Desc: "Our chatbots go beyond answering questions, seamlessly resolving complex problems of customers by integrating with multiple tools.",

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
        howTitle: "How it works",
        howStep1Title: "Script development and approval",
        howStep1Text: "Draft call flows, ensure compliance, and secure stakeholder approval.",
        howStep2Title: "Bot training",
        howStep2Text: "Draft call flows, ensure compliance, and secure stakeholder approval.",
        howStep3Title: "Testing",
        howStep3Text: "Run call simulations, validate edge cases, and measure latency.",
        howStep4Title: "Telephony integration",
        howStep4Text: "Deploy agents to live phone calls via your telephony setup.",

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
