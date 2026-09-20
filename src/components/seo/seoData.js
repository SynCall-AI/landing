import { localizePath, stripLocalePrefix } from '../../lib/i18n.js';

export const SITE_ORIGIN = 'https://www.syncallai.com';
export const SEO_LOCALES = ['en', 'ru', 'uz'];

export const OG_LOCALES = {
    en: 'en_US',
    ru: 'ru_RU',
    uz: 'uz_UZ',
};

const page = (titles, descriptions, options = {}) => ({
    titles,
    descriptions,
    ...options,
});

// This is the canonical inventory for runtime metadata, static HTML generation,
// and (indirectly) sitemap generation. `/voice-agents` remains an inbound-link
// alias for the home page, so it deliberately canonicalizes to `/`.
export const ROUTE_SEO = {
    '/': page(
        {
            en: 'Syncall — AI Voice Agents for Call Centers | Uzbek & Russian',
            ru: 'Syncall — ИИ для колл-центра и голосовой робот для обзвона',
            uz: "Syncall — O'zbek va rus call-markazlari uchun AI-agentlar",
        },
        {
            en: 'AI voice agents and chatbots for Uzbek, Russian, and English call centers, with telephony integration and cloud or on-premise deployment.',
            ru: 'Голосовой робот Syncall принимает и совершает звонки на русском и узбекском: ИИ для колл-центра с интеграцией телефонии и CRM, в облаке или On-Premise.',
            uz: "O'zbek, rus va ingliz tilidagi call-markazlar uchun telefoniya bilan integratsiyalashadigan, bulutda yoki On-Premise ishlaydigan AI ovozli agentlar va chatbotlar.",
        },
        { kind: 'home' },
    ),
    '/voice-agents': page({}, {}, { aliasFor: '/', canonicalPath: '/' }),
    '/analytics': page(
        {
            en: 'AI Call Analytics & Quality Control | Syncall',
            ru: 'ИИ-аналитика звонков и контроль качества | Syncall',
            uz: "AI qo'ng'iroq tahlili va sifat nazorati | Syncall",
        },
        {
            en: 'Analyze every call, score operator performance, surface missed script steps, and deliver structured quality reports in Uzbek, Russian, and English.',
            ru: 'Анализируйте каждый звонок, оценивайте операторов, находите пропущенные шаги скрипта и получайте отчёты о качестве на узбекском, русском и английском.',
            uz: "Har bir qo'ng'iroqni tahlil qiling, operatorlarni baholang, o'tkazib yuborilgan skript bosqichlarini toping va uch tilda sifat hisobotlarini oling.",
        },
    ),
    '/chatbots': page(
        {
            en: 'On-Premise AI Chatbots for Business | Syncall',
            ru: 'ИИ-чат-боты On-Premise для бизнеса | Syncall',
            uz: 'Biznes uchun On-Premise AI-chatbotlar | Syncall',
        },
        {
            en: 'Deploy secure AI chatbots for web and messengers on your own infrastructure, with Uzbek and Russian understanding plus CRM and knowledge-base integration.',
            ru: 'Разверните защищённые AI-чат-боты для сайта и мессенджеров на своей инфраструктуре с поддержкой узбекского, русского, CRM и базы знаний.',
            uz: "Veb va messenjerlar uchun xavfsiz AI-chatbotlarni o'z infratuzilmangizda, o'zbek-rus tillari, CRM va bilimlar bazasi bilan ishga tushiring.",
        },
    ),
    '/stt': page(
        {
            en: 'Uzbek Speech-to-Text API for Real Calls | Syncall',
            ru: 'Speech-to-Text API для узбекской речи | Syncall',
            uz: "O'zbek nutqi uchun Speech-to-Text API | Syncall",
        },
        {
            en: 'Transcribe real Uzbek, Russian, and mixed-language calls with an API designed for regional dialects, slang, background noise, streaming, and batch audio.',
            ru: 'Распознавайте реальные узбекские, русские и смешанные звонки через API с поддержкой диалектов, сленга, фонового шума, стриминга и пакетной обработки.',
            uz: "Lahjalar, sleng, fon shovqini, oqimli va paketli audio uchun yaratilgan API bilan o'zbek, rus va aralash tildagi real qo'ng'iroqlarni matnga aylantiring.",
        },
        { noindex: true, canonicalPath: '/cabinet/stt' },
    ),
    '/tts': page(
        {
            en: 'Uzbek Text-to-Speech & Voice Cloning API | Syncall',
            ru: 'Text-to-Speech и клонирование голоса | Syncall',
            uz: "O'zbek Text-to-Speech va ovoz klonlash API | Syncall",
        },
        {
            en: 'Generate natural Uzbek, Russian, and English speech or create a consent-based brand voice clone through a low-latency text-to-speech API.',
            ru: 'Синтезируйте естественную узбекскую, русскую и английскую речь или создайте голос бренда с согласия диктора через API с низкой задержкой.',
            uz: "Past kechikishli API orqali tabiiy o'zbek, rus va ingliz nutqini yarating yoki diktor roziligi asosida brend ovozini klonlang.",
        },
        { noindex: true, canonicalPath: '/cabinet/tts' },
    ),
    '/features': page(
        {
            en: 'AI Voice Agent Features for Call Centers | Syncall',
            ru: 'Робот для колл-центра: возможности ИИ-агентов | Syncall',
            uz: "Call-markaz AI-agentlari imkoniyatlari | Syncall",
        },
        {
            en: 'Explore dialect-aware speech recognition, interruption handling, voice isolation, voice cloning, analytics, CRM connectivity, and on-premise deployment.',
            ru: 'Возможности голосового робота для колл-центра: распознавание диалектов, перебивания, изоляция и клонирование голоса, аналитика, CRM и On-Premise.',
            uz: "Lahjalarni anglash, so'zni bo'lish, ovozni ajratish, ovoz klonlash, tahlil, CRM ulanishi va On-Premise joylashtirish imkoniyatlarini ko'ring.",
        },
    ),
    '/use-cases': page(
        { en: 'AI Call Center Use Cases | Syncall', ru: 'Сценарии AI для колл-центра | Syncall', uz: 'Koll-markaz uchun AI ssenariylari | Syncall' },
        { en: 'Explore AI call workflows for banking, payment reminders, appointments, surveys, and lead qualification. Start with one task and a scoped pilot.', ru: 'Выберите сценарий AI-звонков: банки, напоминания об оплате и записи, опросы или квалификация лидов. Начните с одной задачи и пилота.', uz: 'Banklar, to‘lov va uchrashuv eslatmalari, so‘rovlar va lidlarni saralash uchun AI qo‘ng‘iroq ssenariylarini ko‘ring. Bitta vazifa va pilotdan boshlang.' },
    ),
    '/use-cases/banking': page(
        {
            en: 'On-Premise AI Voice Agents for Banks | Syncall',
            ru: 'On-Premise AI-агенты для банков | Syncall',
            uz: 'Banklar uchun On-Premise AI ovozli agentlar | Syncall',
        },
        {
            en: 'Call-center AI that can keep audio and transcripts on your servers, built for banking data-residency workflows in Uzbekistan and Russian-speaking markets.',
            ru: 'AI для колл-центров, который может хранить аудио и расшифровки на ваших серверах для банковских сценариев в Узбекистане и русскоязычных рынках.',
            uz: "Audio va transkriptlarni o'z serverlaringizda saqlashi mumkin bo'lgan, O'zbekiston banklarining ma'lumot joylashuvi talablari uchun AI call-markaz yechimi.",
        },
    ),
    '/use-cases/debt-collection': page(
        {
            en: 'AI Voice Agents for Debt Collection | Syncall',
            ru: 'Робот для обзвона должников | Syncall',
            uz: "Qarzdorlik undirish uchun AI ovozli agentlar | Syncall",
        },
        {
            en: 'Automate respectful payment reminders and follow-up calls in Uzbek and Russian while recording outcomes and structured next steps in your CRM.',
            ru: 'ИИ-робот корректно обзванивает должников и напоминает об оплате на узбекском и русском, фиксируя результат и следующий шаг в CRM.',
            uz: "O'zbek va rus tillarida to'lov eslatmalari hamda takroriy qo'ng'iroqlarni avtomatlashtiring, natija va keyingi qadamlarni CRMga yozing.",
        },
    ),
    '/use-cases/appointment-reminders': page(
        {
            en: 'Automated Appointment Reminder Calls | Syncall',
            ru: 'Автоматические звонки-напоминания о записи | Syncall',
            uz: "Uchrashuvni eslatuvchi avtomatik qo'ng'iroqlar | Syncall",
        },
        {
            en: 'Confirm, reschedule, or cancel appointments through automated voice calls in Uzbek and Russian, with updates sent back to your existing systems.',
            ru: 'Подтверждайте, переносите или отменяйте записи автоматическими голосовыми звонками на узбекском и русском с обновлением данных в ваших системах.',
            uz: "O'zbek va rus tilidagi avtomatik ovozli qo'ng'iroqlar orqali uchrashuvni tasdiqlang, ko'chiring yoki bekor qiling va tizimlaringizni yangilang.",
        },
    ),
    '/use-cases/surveys': page(
        {
            en: 'Automated Voice Surveys in Uzbek & Russian | Syncall',
            ru: 'Автоматические голосовые опросы на RU и UZ | Syncall',
            uz: "O'zbek va rus tilidagi avtomatik ovozli so'rovlar | Syncall",
        },
        {
            en: 'Run multilingual customer surveys by phone, capture structured answers, and send results to analytics or CRM workflows without manual calling.',
            ru: 'Проводите телефонные опросы на нескольких языках, собирайте структурированные ответы и передавайте результаты в аналитику или CRM без ручных звонков.',
            uz: "Ko'p tilli telefon so'rovlarini o'tkazing, tuzilgan javoblarni yig'ing va natijalarni qo'lda qo'ng'iroqsiz tahlil yoki CRM jarayoniga yuboring.",
        },
    ),
    '/use-cases/lead-qualification': page(
        {
            en: 'AI Lead Qualification Calls | Syncall',
            ru: 'Робот для обзвона и квалификации лидов | Syncall',
            uz: "Lidlarni saralash uchun AI qo'ng'iroqlar | Syncall",
        },
        {
            en: 'Qualify inbound and outbound leads through natural Uzbek and Russian conversations, then route the right prospects and call context to your sales team.',
            ru: 'ИИ-робот обзванивает и квалифицирует входящие и исходящие лиды в естественном диалоге на узбекском и русском и передаёт горячих клиентов отделу продаж.',
            uz: "Kiruvchi va chiquvchi lidlarni tabiiy o'zbek-rus suhbatida saralang, mos mijozlar va qo'ng'iroq kontekstini savdo jamoasiga yuboring.",
        },
    ),
    '/integrations': page(
        {
            en: 'Telephony & CRM Integrations for Voice AI | Syncall',
            ru: 'Интеграции телефонии и CRM для Voice AI | Syncall',
            uz: 'Voice AI uchun telefoniya va CRM integratsiyalari | Syncall',
        },
        {
            en: 'Connect Syncall with SIP, PBX, Asterisk, FreePBX, 3CX, cloud telephony, Delta M, and webhook-capable CRMs without replacing your existing workflow.',
            ru: 'Подключите Syncall к SIP, PBX, Asterisk, FreePBX, 3CX, облачной телефонии, Delta M и CRM с вебхуками без замены существующих процессов.',
            uz: "Mavjud jarayonlarni almashtirmasdan Syncall'ni SIP, PBX, Asterisk, FreePBX, 3CX, bulut telefoniyasi, Delta M va webhookli CRMlarga ulang.",
        },
    ),
    '/pricing': page(
        {
            en: 'AI Voice Agent Pricing & Free Trial | Syncall',
            ru: 'Стоимость голосового робота для колл-центра | Syncall',
            uz: "AI ovozli agent narxlari va bepul sinov | Syncall",
        },
        {
            en: 'Learn how volume-based Syncall pricing works, what affects deployment cost, and what is included in the custom AI-agent trial for up to 1,000 calls.',
            ru: 'Узнайте, сколько стоит ИИ для колл-центра: объёмное ценообразование Syncall, факторы стоимости внедрения и бесплатный тест ИИ-агента до 1 000 звонков.',
            uz: "Syncall hajmga asoslangan narxlari, joriy etish qiymatiga ta'sir qiluvchi omillar va 1 000 qo'ng'iroqqacha AI-agent sinoviga nimalar kirishini biling.",
        },
    ),
    '/about': page(
        {
            en: 'About Syncall AI — Tashkent Voice AI Team',
            ru: 'О Syncall AI — команда Voice AI из Ташкента',
            uz: 'Syncall AI haqida — Toshkentdagi Voice AI jamoasi',
        },
        {
            en: 'Meet Syncall, a Tashkent-based AI company founded in 2024 and focused on practical voice agents, speech technology, and secure business automation.',
            ru: 'Познакомьтесь с Syncall — основанной в 2024 году ташкентской AI-компанией, которая создаёт голосовых агентов, речевые технологии и безопасную автоматизацию.',
            uz: "2024-yilda Toshkentda tashkil etilgan, ovozli agentlar, nutq texnologiyasi va xavfsiz biznes avtomatlashtirishga ixtisoslashgan Syncall bilan tanishing.",
        },
    ),
    '/case-studies': page(
        {
            en: 'AI Call Recordings & Customer Examples | Syncall',
            ru: 'Записи AI-звонков и примеры работы | Syncall',
            uz: "AI qo‘ng‘iroq yozuvlari va misollar | Syncall",
        },
        {
            en: 'Listen to Syncall AI call recordings in Uzbek and explore voice-agent workflows for your team.',
            ru: 'Послушайте записи звонков с Syncall AI на узбекском и изучите сценарии голосовых агентов для вашей команды.',
            uz: "Syncall AI bilan o‘zbek tilidagi qo‘ng‘iroq yozuvlarini tinglang va jamoangiz uchun ovozli agent ssenariylarini ko‘ring.",
        },
    ),
    '/cabinet': page(
        {
            en: 'Creator Studio | Syncall',
            ru: 'Студия автора | Syncall',
            uz: 'Ijodkor studiyasi | Syncall',
        },
        {
            en: 'Sign in to create voiceovers, transcribe audio, manage projects, and top up your Syncall creator balance.',
            ru: 'Войдите, чтобы создавать озвучку, расшифровывать аудио, управлять проектами и пополнять баланс Syncall.',
            uz: "Ovoz yaratish, audioni matnga aylantirish, loyihalarni boshqarish va Syncall balansini to'ldirish uchun kiring.",
        },
        { noindex: true },
    ),
    '/cabinet/voices': page({}, {}, { aliasFor: '/cabinet', canonicalPath: '/cabinet', noindex: true }),
    '/cabinet/tts': page({}, {}, { aliasFor: '/cabinet', canonicalPath: '/cabinet', noindex: true }),
    '/cabinet/enhancer': page({}, {}, { aliasFor: '/cabinet', canonicalPath: '/cabinet', noindex: true }),
    '/cabinet/stt': page({}, {}, { aliasFor: '/cabinet', canonicalPath: '/cabinet', noindex: true }),
    '/cabinet/subtitles': page({}, {}, { aliasFor: '/cabinet', canonicalPath: '/cabinet', noindex: true }),
    '/cabinet/dubbing': page({}, {}, { aliasFor: '/cabinet', canonicalPath: '/cabinet', noindex: true }),
    '/cabinet/audiobooks': page({}, {}, { aliasFor: '/cabinet', canonicalPath: '/cabinet', noindex: true }),
    '/cabinet/history': page({}, {}, { aliasFor: '/cabinet', canonicalPath: '/cabinet', noindex: true }),
    '/cabinet/billing': page({}, {}, { aliasFor: '/cabinet', canonicalPath: '/cabinet', noindex: true }),
    '/cabinet/profile': page({}, {}, { aliasFor: '/cabinet', canonicalPath: '/cabinet', noindex: true }),
    '/cabinet/developer': page({}, {}, { aliasFor: '/cabinet', canonicalPath: '/cabinet', noindex: true }),
};

export const STATIC_ROUTE_PATHS = Object.keys(ROUTE_SEO);
export const INDEXABLE_ROUTE_PATHS = STATIC_ROUTE_PATHS.filter(
    (routePath) => !ROUTE_SEO[routePath].noindex,
);

export const normalizeRoutePath = (pathname = '/') => {
    const withoutLocale = stripLocalePrefix(pathname.split(/[?#]/)[0] || '/');
    if (withoutLocale === '/') return '/';
    return `/${withoutLocale.split('/').filter(Boolean).join('/')}`;
};

export const localizedUrl = (basePath, locale) => {
    const localizedPath = localizePath(basePath, locale);
    return `${SITE_ORIGIN}${localizedPath === '/' ? '/' : localizedPath}`;
};

export const getRouteSeo = (pathname = '/', locale = 'en') => {
    const language = SEO_LOCALES.includes(locale) ? locale : 'en';
    const basePath = normalizeRoutePath(pathname);
    const direct = ROUTE_SEO[basePath];
    const target = direct?.aliasFor ? ROUTE_SEO[direct.aliasFor] : direct;
    const unknown = !target;
    const metadata = target || ROUTE_SEO['/'];
    const canonicalPath = unknown
        ? '/'
        : (direct?.canonicalPath || direct?.aliasFor || basePath);

    return {
        basePath,
        canonicalPath,
        unknown,
        noindex: unknown || Boolean(direct?.noindex || target?.noindex),
        title: metadata.titles[language] || metadata.titles.en,
        description: metadata.descriptions[language] || metadata.descriptions.en,
        canonical: localizedUrl(canonicalPath, language),
        alternates: Object.fromEntries(
            SEO_LOCALES.map((alternateLocale) => [
                alternateLocale,
                localizedUrl(canonicalPath, alternateLocale),
            ]),
        ),
        xDefault: localizedUrl(canonicalPath, 'en'),
        ogLocale: OG_LOCALES[language],
        ogLocaleAlternates: SEO_LOCALES
            .filter((alternateLocale) => alternateLocale !== language)
            .map((alternateLocale) => OG_LOCALES[alternateLocale]),
    };
};

const SCHEMA_COPY = {
    en: {
        organization: 'AI voice agents and chatbots for call centers in Uzbek, Russian, and English.',
        software: 'B2B AI voice agents for Uzbek, Russian, and English call centers, with telephony and CRM integration plus cloud or on-premise deployment.',
        offer: 'Free trial with a custom-trained AI agent for up to 1,000 calls.',
    },
    ru: {
        organization: 'AI-голосовые агенты и чат-боты для колл-центров на узбекском, русском и английском.',
        software: 'B2B AI-агенты для колл-центров на узбекском, русском и английском с интеграцией телефонии и CRM, в облаке или On-Premise.',
        offer: 'Бесплатный тест индивидуально обученного AI-агента до 1 000 звонков.',
    },
    uz: {
        organization: "O'zbek, rus va ingliz tillarida call-markazlar uchun AI ovozli agentlar va chatbotlar.",
        software: "O'zbek, rus va ingliz call-markazlari uchun telefoniya va CRM integratsiyasiga ega, bulutda yoki On-Premise ishlaydigan B2B AI-agentlar.",
        offer: "1 000 qo'ng'iroqqacha maxsus o'qitilgan AI-agent bilan bepul sinov.",
    },
};

export const buildOrganizationSchema = (locale = 'en') => {
    const copy = SCHEMA_COPY[locale] || SCHEMA_COPY.en;
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Syncall',
        url: `${SITE_ORIGIN}/`,
        logo: `${SITE_ORIGIN}/Syncall.svg`,
        description: copy.organization,
        foundingDate: '2024',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Tashkent',
            addressCountry: 'UZ',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            url: 'https://t.me/syncall_ai',
            availableLanguage: ['uz', 'ru', 'en'],
        },
        sameAs: [
            'https://uz.linkedin.com/company/syncall-ai',
            'https://huggingface.co/SyncallAI',
            'https://t.me/syncall_ai',
        ],
    };
};

export const buildSoftwareSchema = (locale = 'en') => {
    const copy = SCHEMA_COPY[locale] || SCHEMA_COPY.en;
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Syncall',
        url: `${SITE_ORIGIN}/`,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Call Center Software',
        operatingSystem: 'Cloud, On-Premise',
        description: copy.software,
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            description: copy.offer,
        },
        provider: {
            '@type': 'Organization',
            name: 'Syncall',
            url: `${SITE_ORIGIN}/`,
        },
    };
};

export const FAQ_KEYS = Array.from({ length: 6 }, (_, index) => ({
    question: `faqQ${index + 1}`,
    answer: `faqA${index + 1}`,
}));

export const buildFaqSchema = (localeTranslations = {}, englishTranslations = {}, pairs) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs ? pairs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) : FAQ_KEYS.map(({ question, answer }) => ({
        '@type': 'Question',
        name: localeTranslations[question] || englishTranslations[question] || question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: localeTranslations[answer] || englishTranslations[answer] || answer,
        },
    })),
});
