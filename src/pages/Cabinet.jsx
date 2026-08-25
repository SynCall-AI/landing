import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
    ArrowDownToLine,
    ArrowRight,
    AudioLines,
    BookOpen,
    Captions,
    Check,
    ChevronDown,
    CircleDollarSign,
    Clock3,
    Code2,
    Copy,
    FileAudio,
    FileText,
    Gauge,
    Headphones,
    History,
    Home,
    LayoutGrid,
    Languages,
    LoaderCircle,
    LockKeyhole,
    LogOut,
    Mic,
    Pause,
    PanelLeft,
    Play,
    Plus,
    Radio,
    RefreshCw,
    Search,
    Settings,
    Sparkles,
    Square,
    Trash2,
    UploadCloud,
    UserRound,
    Volume2,
    WalletCards,
    WandSparkles,
    X,
} from 'lucide-react';
import { CabinetAuthProvider, useCabinetAuth } from '../context/CabinetAuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import {
    createCreatorTopUp,
    createCreatorVoice,
    deleteCreatorJob,
    deleteCreatorVoice,
    fetchCreatorAudio,
    generateCreatorSpeech,
    getCreatorBilling,
    getCreatorConfig,
    getCreatorJobs,
    getCreatorOverview,
    getCreatorVoices,
    getGoogleConfig,
    transcribeCreatorAudio,
    updateCreatorProfile,
} from '../lib/cabinetApi.js';
import './Cabinet.css';

const COPY = {
    en: {
        studio: 'Creator studio', loginTitle: 'Turn an idea into a voice.', loginBody: 'Create natural voiceovers and clean transcripts without learning a complicated tool.',
        google: 'Continue with Google', secure: 'Your audio stays private to your account.', loading: 'Opening your studio…', setup: 'Google sign-in is not configured yet.', loginTab: 'Sign in', registerTab: 'Create account', signInTitle: 'Welcome back', signInBody: 'Sign in to continue to your creator workspace.', registerTitle: 'Create your workspace', registerBody: 'Start with Google—no forms or technical setup.', emailLabel: 'Email', emailPlaceholder: 'you@example.com', passwordLabel: 'Password', passwordPlaceholder: 'Enter your password', signIn: 'Sign in', signingIn: 'Signing in…', or: 'or', googleLogin: 'Sign in with Google', googleRegister: 'Sign up with Google', loginHint: 'Use an existing account. New accounts are not created here.', registrationOnly: 'Registration is available only through Google.', noAccount: 'New to Syncall?', createAccount: 'Create an account', haveAccount: 'Already have an account?', goToLogin: 'Sign in', accountNotFound: 'No account found for this Google email. Choose registration first.',
        home: 'Home', voice: 'Text to speech', transcript: 'Transcribe', history: 'My projects', billing: 'Balance', profile: 'Profile', logout: 'Sign out', menu: 'Open menu', close: 'Close',
        greeting: 'Good to see you', greetingBody: 'What would you like to make today?', available: 'Available balance', topUp: 'Top up', recent: 'Recent projects', seeAll: 'See all', noProjects: 'Your first project will appear here.',
        ttsCard: 'Voice a reel', ttsCardBody: 'Paste your script and get a ready-to-download voiceover.', sttCard: 'Turn audio into text', sttCardBody: 'Upload or record a clip and copy the transcript in seconds.',
        createTitle: 'Give your words a voice', createBody: 'Write naturally. Syncall handles the rest.', script: 'Your script', placeholder: 'Paste the text for your reel, story or announcement…', useIdea: 'Try an idea',
        language: 'Language', voiceLabel: 'Voice', speed: 'Pace', cost: 'Estimated cost', generate: 'Create voiceover', generating: 'Creating your voiceover…', ready: 'Your voiceover is ready', download: 'Download', newOne: 'Create another', chars: 'characters', insufficient: 'Top up your balance to create this audio.',
        voiceWarm: 'Warm & friendly', voiceBright: 'Bright & lively', voiceCalm: 'Calm & clear', voiceNatural: 'Natural voice',
        transcribeTitle: 'Turn speech into text', transcribeBody: 'Upload a file or record yourself. You will get clean, copy-ready text.', upload: 'Upload audio', record: 'Record now', stop: 'Stop recording', recordAgain: 'Record again', drop: 'Drop your audio here', browse: 'or choose a file', formats: 'MP3, WAV, M4A, OGG or WEBM · up to 40 MB', selected: 'Ready to transcribe', change: 'Change file', transcribeNow: 'Transcribe audio', transcribing: 'Listening carefully…', transcriptReady: 'Transcript ready', copyText: 'Copy text', copied: 'Copied', confidence: 'Confidence', duration: 'Audio length', diarization: 'Separate speakers', diarizationHelp: 'Label who said each part in calls, interviews and podcasts.', speaker: 'Speaker', speakers: 'speakers',
        historyTitle: 'Your projects', historyBody: 'Every voiceover and transcript, ready whenever you need it.', all: 'All', voices: 'Voiceovers', transcripts: 'Transcripts', delete: 'Delete', emptyHistory: 'Nothing here yet. Start with a voiceover or transcript.',
        billingTitle: 'Balance & payments', billingBody: 'See your usage and add funds when you need them.', currentBalance: 'Current balance', paymentHistory: 'Activity', amount: 'Top-up amount', paymentMethod: 'Payment method', continuePayme: 'Continue to Payme', soon: 'Soon', minTopup: 'Minimum top-up', noTransactions: 'No balance activity yet.', usageTts: 'Voice generation', usageStt: 'Transcription', payment: 'Balance top-up', adjustment: 'Balance adjustment', estimatedCost: 'Estimated cost', pending: 'Pending', paid: 'Paid', completed: 'Completed', cancelled: 'Cancelled',
        profileTitle: 'Your profile', profileBody: 'Keep your creator account details up to date.', fullName: 'Full name', email: 'Email', phone: 'Phone number', save: 'Save changes', saved: 'Profile updated', memberVia: 'Signed in securely with Google',
        error: 'Something went wrong. Please try again.', refresh: 'Refresh', uzbek: "O'zbekcha", russian: 'Русский', free: 'Free',
    },
    ru: {
        studio: 'Студия автора', loginTitle: 'Превратите идею в голос.', loginBody: 'Создавайте естественную озвучку и точные расшифровки без сложных настроек.',
        google: 'Продолжить с Google', secure: 'Ваши аудиофайлы доступны только вам.', loading: 'Открываем вашу студию…', setup: 'Вход через Google пока не настроен.', loginTab: 'Вход', registerTab: 'Регистрация', signInTitle: 'С возвращением', signInBody: 'Войдите, чтобы продолжить работу в студии.', registerTitle: 'Создайте свою студию', registerBody: 'Начните через Google — без анкет и сложных настроек.', emailLabel: 'Эл. почта', emailPlaceholder: 'you@example.com', passwordLabel: 'Пароль', passwordPlaceholder: 'Введите пароль', signIn: 'Войти', signingIn: 'Входим…', or: 'или', googleLogin: 'Войти через Google', googleRegister: 'Зарегистрироваться через Google', loginHint: 'Здесь можно войти только в существующий аккаунт.', registrationOnly: 'Регистрация доступна только через Google.', noAccount: 'Впервые в Syncall?', createAccount: 'Создать аккаунт', haveAccount: 'Уже есть аккаунт?', goToLogin: 'Войти', accountNotFound: 'Аккаунт с этой почтой Google не найден. Сначала выберите регистрацию.',
        home: 'Главная', voice: 'Текст в речь', transcript: 'Расшифровать', history: 'Мои проекты', billing: 'Баланс', profile: 'Профиль', logout: 'Выйти', menu: 'Открыть меню', close: 'Закрыть',
        greeting: 'Рады вас видеть', greetingBody: 'Что хотите создать сегодня?', available: 'Доступный баланс', topUp: 'Пополнить', recent: 'Недавние проекты', seeAll: 'Все проекты', noProjects: 'Ваш первый проект появится здесь.',
        ttsCard: 'Озвучить Reels', ttsCardBody: 'Вставьте сценарий и скачайте готовую озвучку.', sttCard: 'Превратить аудио в текст', sttCardBody: 'Загрузите или запишите аудио и скопируйте текст.',
        createTitle: 'Подарите тексту голос', createBody: 'Пишите как обычно — остальное сделает Syncall.', script: 'Ваш сценарий', placeholder: 'Вставьте текст для Reels, сторис или объявления…', useIdea: 'Вставить пример',
        language: 'Язык', voiceLabel: 'Голос', speed: 'Темп', cost: 'Примерная стоимость', generate: 'Создать озвучку', generating: 'Создаём озвучку…', ready: 'Озвучка готова', download: 'Скачать', newOne: 'Создать ещё', chars: 'символов', insufficient: 'Пополните баланс, чтобы создать аудио.',
        voiceWarm: 'Тёплый и дружелюбный', voiceBright: 'Яркий и энергичный', voiceCalm: 'Спокойный и чёткий', voiceNatural: 'Естественный голос',
        transcribeTitle: 'Превратите речь в текст', transcribeBody: 'Загрузите файл или запишите себя — получите чистый текст для копирования.', upload: 'Загрузить аудио', record: 'Записать голос', stop: 'Остановить запись', recordAgain: 'Записать заново', drop: 'Перетащите аудио сюда', browse: 'или выберите файл', formats: 'MP3, WAV, M4A, OGG или WEBM · до 40 МБ', selected: 'Готово к расшифровке', change: 'Другой файл', transcribeNow: 'Расшифровать аудио', transcribing: 'Внимательно слушаем…', transcriptReady: 'Расшифровка готова', copyText: 'Копировать текст', copied: 'Скопировано', confidence: 'Точность', duration: 'Длина аудио', diarization: 'Разделить по спикерам', diarizationHelp: 'Покажем, кто что сказал в звонке, интервью или подкасте.', speaker: 'Спикер', speakers: 'спикеров',
        historyTitle: 'Ваши проекты', historyBody: 'Все озвучки и расшифровки всегда под рукой.', all: 'Все', voices: 'Озвучки', transcripts: 'Расшифровки', delete: 'Удалить', emptyHistory: 'Здесь пока пусто. Создайте первую озвучку или расшифровку.',
        billingTitle: 'Баланс и платежи', billingBody: 'Следите за расходами и пополняйте баланс.', currentBalance: 'Текущий баланс', paymentHistory: 'Операции', amount: 'Сумма пополнения', paymentMethod: 'Способ оплаты', continuePayme: 'Продолжить в Payme', soon: 'Скоро', minTopup: 'Минимальное пополнение', noTransactions: 'Операций пока нет.', usageTts: 'Создание озвучки', usageStt: 'Расшифровка', payment: 'Пополнение баланса', adjustment: 'Корректировка баланса', estimatedCost: 'Примерная стоимость', pending: 'Ожидает', paid: 'Оплачено', completed: 'Готово', cancelled: 'Отменено',
        profileTitle: 'Ваш профиль', profileBody: 'Актуальные данные помогают нам лучше поддерживать вас.', fullName: 'Имя и фамилия', email: 'Email', phone: 'Номер телефона', save: 'Сохранить', saved: 'Профиль обновлён', memberVia: 'Безопасный вход через Google',
        error: 'Что-то пошло не так. Попробуйте ещё раз.', refresh: 'Обновить', uzbek: "O'zbekcha", russian: 'Русский', free: 'Бесплатно',
    },
    uz: {
        studio: 'Ijodkor studiyasi', loginTitle: "G'oyani ovozga aylantiring.", loginBody: "Murakkab sozlamalarsiz tabiiy ovoz va aniq transkript yarating.",
        google: 'Google orqali davom etish', secure: "Audiolaringiz faqat sizga ko'rinadi.", loading: 'Studiyangiz ochilmoqda…', setup: 'Google orqali kirish hali sozlanmagan.', loginTab: 'Kirish', registerTab: "Ro'yxatdan o'tish", signInTitle: 'Xush kelibsiz', signInBody: 'Ijodkor studiyangizda ishlashni davom ettirish uchun kiring.', registerTitle: 'Studiyangizni yarating', registerBody: 'Google orqali tez boshlang — ortiqcha shakllarsiz.', emailLabel: 'Elektron pochta', emailPlaceholder: 'you@example.com', passwordLabel: 'Parol', passwordPlaceholder: 'Parolingizni kiriting', signIn: 'Kirish', signingIn: 'Kirilmoqda…', or: 'yoki', googleLogin: 'Google orqali kirish', googleRegister: "Google orqali ro'yxatdan o'tish", loginHint: 'Bu yerda faqat mavjud hisobga kirish mumkin.', registrationOnly: "Ro'yxatdan o'tish faqat Google orqali mavjud.", noAccount: 'Syncallda yangimisiz?', createAccount: 'Hisob yaratish', haveAccount: 'Hisobingiz bormi?', goToLogin: 'Kirish', accountNotFound: "Bu Google pochtasi uchun hisob topilmadi. Avval ro'yxatdan o'tishni tanlang.",
        home: 'Bosh sahifa', voice: 'Matndan ovoz', transcript: 'Matnga aylantirish', history: 'Loyihalarim', billing: 'Balans', profile: 'Profil', logout: 'Chiqish', menu: 'Menyuni ochish', close: 'Yopish',
        greeting: "Sizni ko'rganimizdan xursandmiz", greetingBody: 'Bugun nima yaratmoqchisiz?', available: 'Mavjud balans', topUp: "To'ldirish", recent: 'Oxirgi loyihalar', seeAll: "Barchasini ko'rish", noProjects: 'Birinchi loyihangiz shu yerda chiqadi.',
        ttsCard: 'Reels uchun ovoz', ttsCardBody: 'Matnni kiriting va tayyor ovozni yuklab oling.', sttCard: 'Audioni matnga aylantirish', sttCardBody: 'Audio yuklang yoki yozib oling va matnni nusxalang.',
        createTitle: "So'zlaringizga ovoz bering", createBody: 'Odatdagidek yozing — qolganini Syncall bajaradi.', script: 'Matningiz', placeholder: "Reels, story yoki e'lon uchun matnni kiriting…", useIdea: "Misol qo'yish",
        language: 'Til', voiceLabel: 'Ovoz', speed: 'Tezlik', cost: 'Taxminiy narx', generate: 'Ovoz yaratish', generating: 'Ovoz yaratilmoqda…', ready: 'Ovozingiz tayyor', download: 'Yuklab olish', newOne: 'Yana yaratish', chars: 'belgi', insufficient: "Ovoz yaratish uchun balansni to'ldiring.",
        voiceWarm: "Iliq va do'stona", voiceBright: 'Yorqin va jonli', voiceCalm: 'Tinch va ravon', voiceNatural: 'Tabiiy ovoz',
        transcribeTitle: 'Nutqni matnga aylantiring', transcribeBody: 'Fayl yuklang yoki ovozingizni yozing — toza, tayyor matn oling.', upload: 'Audio yuklash', record: 'Ovoz yozish', stop: "Yozishni to'xtatish", recordAgain: 'Qayta yozish', drop: 'Audioni shu yerga tashlang', browse: 'yoki faylni tanlang', formats: 'MP3, WAV, M4A, OGG yoki WEBM · 40 MB gacha', selected: 'Matnga aylantirishga tayyor', change: 'Boshqa fayl', transcribeNow: 'Matnga aylantirish', transcribing: 'Diqqat bilan tinglayapmiz…', transcriptReady: 'Matn tayyor', copyText: 'Matnni nusxalash', copied: 'Nusxalandi', confidence: 'Aniqlik', duration: 'Audio uzunligi', diarization: 'Spikerlarni ajratish', diarizationHelp: "Qo'ng'iroq, intervyu yoki podkastda kim nima deganini ko'rsatamiz.", speaker: 'Spiker', speakers: 'spiker',
        historyTitle: 'Loyihalaringiz', historyBody: 'Barcha ovoz va transkriptlaringiz doim yoningizda.', all: 'Barchasi', voices: 'Ovozlar', transcripts: 'Transkriptlar', delete: "O'chirish", emptyHistory: "Hozircha bo'sh. Birinchi ovoz yoki transkriptni yarating.",
        billingTitle: "Balans va to'lovlar", billingBody: "Xarajatlarni ko'ring va kerak paytda balansni to'ldiring.", currentBalance: 'Joriy balans', paymentHistory: 'Amallar', amount: "To'ldirish summasi", paymentMethod: "To'lov usuli", continuePayme: 'Payme orqali davom etish', soon: 'Tez orada', minTopup: "Eng kam to'ldirish", noTransactions: "Hozircha amallar yo'q.", usageTts: 'Ovoz yaratish', usageStt: 'Transkripsiya', payment: "Balansni to'ldirish", adjustment: 'Balans tuzatishi', estimatedCost: 'Taxminiy narx', pending: 'Kutilmoqda', paid: "To'langan", completed: 'Tayyor', cancelled: 'Bekor qilingan',
        profileTitle: 'Profilingiz', profileBody: "Ma'lumotlaringizni yangilab turing.", fullName: "To'liq ism", email: 'Email', phone: 'Telefon raqami', save: 'Saqlash', saved: 'Profil yangilandi', memberVia: 'Google orqali xavfsiz kirish',
        error: "Xatolik yuz berdi. Qayta urinib ko'ring.", refresh: 'Yangilash', uzbek: "O'zbekcha", russian: 'Русский', free: 'Bepul',
    },
};

const EXTRA_COPY = {
    en: {
        createGroup: 'Create', workspaceGroup: 'Workspace', voicesNav: 'Voices', enhancer: 'Voice Enhancer', subtitles: 'Subtitles', dubbing: 'Dubbing', audiobooks: 'Audiobooks', developer: 'Developer', comingSoon: 'Coming soon',
        comingSoonBody: 'This tool is already on our roadmap. We are shaping it for Uzbek and Russian creators.', backHome: 'Back to home',
        quickCreate: 'Create from one place', quickCreateBody: 'Write a thought, choose a voice, and leave with audio ready for your next post.', quickPlaceholder: 'Write a hook, a story, or the first line of your next Reel…', startWith: 'Start with an idea',
        settingsTitle: 'Settings', historyTab: 'History', voiceLibraryTitle: 'Voices built for local stories', voiceLibraryBody: 'A small, focused library of Uzbek and Russian voices—easy to choose and ready to use.', useVoice: 'Use this voice', availableIn: 'Available in',
        durdonaBio: 'Warm, expressive, and clear. A natural fit for stories, explainers, and personal content.', bekzodBio: 'Grounded, confident, and direct. Built for ads, announcements, and educational content.',
        creatorPlan: 'Creator account', projectsLabel: 'Projects', toolReady: 'Ready', modelLabel: 'Syncall Voice', outputLabel: 'WAV audio', quickGenerate: 'Generate', feedback: 'Feedback',
        createVoice: 'Create a voice', yourVoices: 'Your voices', sharedVoices: 'Syncall voices', privateVoice: 'Private voice', privateVoiceBody: 'Only you can see and use voices created in your workspace.', noPrivateVoices: 'You have not created a private voice yet.', exploreVoices: 'Explore', searchVoices: 'Search by voice name or style…', allLanguages: 'All languages', allStyles: 'All styles', storytelling: 'Storytelling', advertising: 'Advertising', personalStyle: 'Your voice', voiceResults: 'voices found', noVoicesFound: 'No voices match these filters.', clearFilters: 'Clear filters',
        sampleTitle: 'Add a clean voice sample', sampleBody: 'Upload or record 5–10 seconds of clear speech. Use one speaker, with no background music, noise, echo, or effects.', uploadSample: 'Upload sample', recordSample: 'Record sample', recordingSample: 'Recording…', sampleReady: 'Sample ready', sampleLength: '5–10 seconds', transcribeSample: 'Transcribe sample', transcribingSample: 'Transcribing your voice…', transcriptStep: 'Transcript', transcriptHelp: 'Check that we heard your words correctly, then name your voice.', voiceName: 'Voice name', voiceNamePlaceholder: 'For example, My warm voice', saveVoice: 'Create private voice', savingVoice: 'Creating your voice…', voiceCreated: 'Your private voice is ready to use.', restartSample: 'Start over', deleteVoiceConfirm: 'Delete this private voice?', useInTts: 'Use in Text to Speech', sampleTooShort: 'Record at least 5 seconds.', sampleTooLong: 'Keep the recording under 10 seconds.', sampleQuality: 'Quiet room · one speaker · no music', personalTag: 'Only you', voiceSampleLanguage: 'Sample language', switchLanguageToUse: 'Select to switch to', voiceLanguageNotice: 'Personal voices work in the language used for their sample. Your voice remains visible below.',
    },
    ru: {
        createGroup: 'Создание', workspaceGroup: 'Рабочее пространство', voicesNav: 'Голоса', enhancer: 'Улучшение голоса', subtitles: 'Субтитры', dubbing: 'Дубляж', audiobooks: 'Аудиокниги', developer: 'Разработчикам', comingSoon: 'Скоро',
        comingSoonBody: 'Этот инструмент уже в нашем плане. Мы адаптируем его для авторов на русском и узбекском.', backHome: 'На главную',
        quickCreate: 'Создавайте в одном месте', quickCreateBody: 'Напишите идею, выберите голос и получите аудио для следующей публикации.', quickPlaceholder: 'Напишите хук, историю или первую строку следующего Reels…', startWith: 'Начните с идеи',
        settingsTitle: 'Настройки', historyTab: 'История', voiceLibraryTitle: 'Голоса для локальных историй', voiceLibraryBody: 'Небольшая библиотека узбекских и русских голосов — легко выбрать и сразу использовать.', useVoice: 'Использовать голос', availableIn: 'Доступен на',
        durdonaBio: 'Тёплый, выразительный и чистый голос для историй, объяснений и личного контента.', bekzodBio: 'Уверенный и прямой голос для рекламы, объявлений и образовательного контента.',
        creatorPlan: 'Аккаунт автора', projectsLabel: 'Проекты', toolReady: 'Доступно', modelLabel: 'Syncall Voice', outputLabel: 'Аудио WAV', quickGenerate: 'Создать', feedback: 'Обратная связь',
        createVoice: 'Создать голос', yourVoices: 'Мои голоса', sharedVoices: 'Голоса Syncall', privateVoice: 'Личный голос', privateVoiceBody: 'Созданные голоса видны и доступны только в вашем кабинете.', noPrivateVoices: 'У вас пока нет личных голосов.', exploreVoices: 'Все голоса', searchVoices: 'Поиск по голосу или стилю…', allLanguages: 'Все языки', allStyles: 'Все стили', storytelling: 'Истории', advertising: 'Реклама', personalStyle: 'Ваш голос', voiceResults: 'голосов найдено', noVoicesFound: 'По этим фильтрам голосов нет.', clearFilters: 'Сбросить фильтры',
        sampleTitle: 'Добавьте чистый образец голоса', sampleBody: 'Загрузите или запишите 5–10 секунд чистой речи. Один спикер, без фоновой музыки, шума, эха и эффектов.', uploadSample: 'Загрузить образец', recordSample: 'Записать образец', recordingSample: 'Идёт запись…', sampleReady: 'Образец готов', sampleLength: '5–10 секунд', transcribeSample: 'Расшифровать образец', transcribingSample: 'Расшифровываем голос…', transcriptStep: 'Расшифровка', transcriptHelp: 'Проверьте, что мы правильно распознали слова, затем назовите голос.', voiceName: 'Название голоса', voiceNamePlaceholder: 'Например, Мой тёплый голос', saveVoice: 'Создать личный голос', savingVoice: 'Создаём ваш голос…', voiceCreated: 'Личный голос готов к использованию.', restartSample: 'Начать заново', deleteVoiceConfirm: 'Удалить этот личный голос?', useInTts: 'Использовать в озвучке', sampleTooShort: 'Запишите минимум 5 секунд.', sampleTooLong: 'Запись должна быть короче 10 секунд.', sampleQuality: 'Тихая комната · один спикер · без музыки', personalTag: 'Только вам', voiceSampleLanguage: 'Язык образца', switchLanguageToUse: 'Нажмите, чтобы переключиться на', voiceLanguageNotice: 'Личный голос работает на языке записанного образца. Он остаётся видимым в списке ниже.',
    },
    uz: {
        createGroup: 'Yaratish', workspaceGroup: 'Ish maydoni', voicesNav: 'Ovozlar', enhancer: 'Ovozni yaxshilash', subtitles: 'Subtitrlar', dubbing: 'Dublyaj', audiobooks: 'Audiokitoblar', developer: 'Dasturchilar uchun', comingSoon: 'Tez orada',
        comingSoonBody: "Bu vosita rejamizda bor. Uni o'zbek va rus tilida ijod qiladiganlar uchun qulaylashtiryapmiz.", backHome: 'Bosh sahifaga',
        quickCreate: 'Hammasini bir joyda yarating', quickCreateBody: 'Fikrni yozing, ovozni tanlang va keyingi postingiz uchun tayyor audio oling.', quickPlaceholder: 'Keyingi Reels uchun ilgak, hikoya yoki birinchi jumlani yozing…', startWith: "G'oyadan boshlang",
        settingsTitle: 'Sozlamalar', historyTab: 'Tarix', voiceLibraryTitle: 'Mahalliy hikoyalar uchun ovozlar', voiceLibraryBody: "O'zbek va rus tilidagi kichik, tushunarli ovozlar kutubxonasi — tanlash va ishlatish oson.", useVoice: 'Ovozni ishlatish', availableIn: 'Mavjud tillar',
        durdonaBio: "Iliq, ifodali va tiniq. Hikoya, tushuntirish va shaxsiy kontent uchun mos.", bekzodBio: "Ishonchli va aniq. Reklama, e'lon va ta'limiy kontent uchun yaratilgan.",
        creatorPlan: 'Ijodkor akkaunti', projectsLabel: 'Loyihalar', toolReady: 'Tayyor', modelLabel: 'Syncall Voice', outputLabel: 'WAV audio', quickGenerate: 'Yaratish', feedback: 'Fikr bildirish',
        createVoice: 'Ovoz yaratish', yourVoices: 'Mening ovozlarim', sharedVoices: 'Syncall ovozlari', privateVoice: 'Shaxsiy ovoz', privateVoiceBody: "Yaratilgan ovozlarni faqat siz o'z kabinetingizda ko'rasiz va ishlatasiz.", noPrivateVoices: "Siz hali shaxsiy ovoz yaratmagansiz.", exploreVoices: 'Barcha ovozlar', searchVoices: "Ovoz nomi yoki uslubi bo'yicha qidiring…", allLanguages: 'Barcha tillar', allStyles: 'Barcha uslublar', storytelling: 'Hikoyalar', advertising: 'Reklama', personalStyle: 'Sizning ovozingiz', voiceResults: 'ta ovoz topildi', noVoicesFound: "Bu filtrlarga mos ovoz yo'q.", clearFilters: 'Filtrlarni tozalash',
        sampleTitle: 'Toza ovoz namunasini qo‘shing', sampleBody: '5–10 soniya toza nutqni yuklang yoki yozib oling. Bitta spiker, fon musiqasi, shovqin, aks-sado va effektlarsiz.', uploadSample: 'Namuna yuklash', recordSample: 'Namuna yozish', recordingSample: 'Yozilmoqda…', sampleReady: 'Namuna tayyor', sampleLength: '5–10 soniya', transcribeSample: 'Namunani matnga aylantirish', transcribingSample: 'Ovozingiz aniqlanmoqda…', transcriptStep: 'Transkript', transcriptHelp: "So'zlar to'g'ri aniqlanganini tekshiring, keyin ovozga nom bering.", voiceName: 'Ovoz nomi', voiceNamePlaceholder: 'Masalan, Mening iliq ovozim', saveVoice: 'Shaxsiy ovoz yaratish', savingVoice: 'Ovozingiz yaratilmoqda…', voiceCreated: 'Shaxsiy ovozingiz ishlatishga tayyor.', restartSample: 'Boshidan boshlash', deleteVoiceConfirm: "Bu shaxsiy ovozni o'chirasizmi?", useInTts: 'Ovoz yaratishda ishlatish', sampleTooShort: 'Kamida 5 soniya yozing.', sampleTooLong: 'Yozuvni 10 soniyadan oshirmang.', sampleQuality: 'Tinch xona · bitta spiker · musiqasiz', personalTag: 'Faqat siz', voiceSampleLanguage: 'Namuna tili', switchLanguageToUse: "O'tish uchun tanlang:", voiceLanguageNotice: "Shaxsiy ovoz yozilgan namuna tilida ishlaydi. Ovozingiz quyidagi ro'yxatda ko'rinib turadi.",
    },
};

const SAMPLE_TEXT = {
    en: 'A good idea deserves a voice people remember. Create your next story with Syncall.',
    ru: 'Хорошая идея заслуживает голоса, который запомнят. Создайте свою следующую историю вместе с Syncall.',
    uz: "Yaxshi g'oya odamlar eslab qoladigan ovozga loyiq. Keyingi hikoyangizni Syncall bilan yarating.",
};

const localeForIntl = { en: 'en-US', ru: 'ru-RU', uz: 'uz-UZ' };
const SPEECH_LANGUAGES = [
    { id: 'uz', code: 'UZ', flag: '🇺🇿', labelKey: 'uzbek' },
    { id: 'ru', code: 'RU', flag: '🇷🇺', labelKey: 'russian' },
];
const VOICE_AVATAR_PALETTES = [
    { top: '#9d3f60', bottom: '#f29379', glow: '#ffd6ca', shadow: '#762f50', tilt: '-9deg' },
    { top: '#155b66', bottom: '#65c5d2', glow: '#d9f1eb', shadow: '#0d424d', tilt: '8deg' },
    { top: '#754473', bottom: '#dda2d4', glow: '#f4d8ec', shadow: '#563352', tilt: '-6deg' },
    { top: '#31577f', bottom: '#8bc8f2', glow: '#e3eef9', shadow: '#263f65', tilt: '7deg' },
    { top: '#68517b', bottom: '#b9a9db', glow: '#eee5f5', shadow: '#49385a', tilt: '-11deg' },
    { top: '#3e6b60', bottom: '#98d1b6', glow: '#e0f0e6', shadow: '#2c5148', tilt: '10deg' },
    { top: '#a26040', bottom: '#efaf84', glow: '#f9e1cd', shadow: '#7b472f', tilt: '-7deg' },
    { top: '#3b5078', bottom: '#9cafda', glow: '#e4e8f3', shadow: '#283957', tilt: '9deg' },
    { top: '#8c5067', bottom: '#e3a7b6', glow: '#f5dce2', shadow: '#63394d', tilt: '-10deg' },
    { top: '#566977', bottom: '#aabec7', glow: '#e7edef', shadow: '#394953', tilt: '6deg' },
    { top: '#6d5550', bottom: '#c7a397', glow: '#efe2dc', shadow: '#4e3e3a', tilt: '-8deg' },
    { top: '#35636b', bottom: '#9bcdd0', glow: '#e1eeee', shadow: '#294b52', tilt: '11deg' },
];

const money = (value, language) => `${new Intl.NumberFormat(localeForIntl[language]).format(Math.round(value || 0))} UZS`;
const shortDate = (value, language) => value ? new Intl.DateTimeFormat(localeForIntl[language], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(value)) : '—';
const voiceName = (value = '') => value.replace(/[-_](uz|ru)$/i, '').replace(/^./, (letter) => letter.toUpperCase());

const voiceAvatarPalette = (seed = 'voice') => {
    const normalized = String(seed).toLocaleLowerCase();
    if (normalized.startsWith('durdona')) return VOICE_AVATAR_PALETTES[0];
    if (normalized.startsWith('bekzod')) return VOICE_AVATAR_PALETTES[1];
    let hash = 0;
    for (const character of normalized) hash = ((hash * 31) + character.charCodeAt(0)) >>> 0;
    return VOICE_AVATAR_PALETTES[hash % VOICE_AVATAR_PALETTES.length];
};

function VoiceAvatar({ seed, compact = false }) {
    const palette = voiceAvatarPalette(seed);
    return <span
        className={compact ? 'generated-voice-avatar is-compact' : 'generated-voice-avatar'}
        style={{ '--avatar-top': palette.top, '--avatar-bottom': palette.bottom, '--avatar-glow': palette.glow, '--avatar-shadow': palette.shadow, '--avatar-tilt': palette.tilt }}
        aria-hidden="true"
    ><i /></span>;
}

function SpeechLanguageDropdown({ value, onChange, c, compact = false }) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);
    const triggerRef = useRef(null);
    const selected = SPEECH_LANGUAGES.find((item) => item.id === value) || SPEECH_LANGUAGES[0];

    useEffect(() => {
        if (!open) return undefined;
        const closeOutside = (event) => {
            if (!rootRef.current?.contains(event.target)) setOpen(false);
        };
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') {
                setOpen(false);
                triggerRef.current?.focus();
            }
        };
        document.addEventListener('pointerdown', closeOutside);
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.removeEventListener('pointerdown', closeOutside);
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [open]);

    const select = (nextLanguage) => {
        onChange(nextLanguage);
        setOpen(false);
        triggerRef.current?.focus();
    };

    return <div ref={rootRef} className={compact ? 'speech-language-dropdown is-compact' : 'speech-language-dropdown'}>
        <button ref={triggerRef} type="button" className="speech-language-trigger" onClick={() => setOpen((current) => !current)} aria-haspopup="listbox" aria-expanded={open} aria-label={c.language}>
            <span className="speech-language-flag" aria-hidden="true">{selected.flag}</span>
            <span className="speech-language-copy"><small>{selected.code}</small><strong>{c[selected.labelKey]}</strong></span>
            <ChevronDown className={open ? 'is-open' : ''} aria-hidden="true" />
        </button>
        {open && <div className="speech-language-menu" role="listbox" aria-label={c.language}>
            {SPEECH_LANGUAGES.map((item) => <button type="button" key={item.id} role="option" aria-selected={item.id === value} className={item.id === value ? 'active' : ''} onClick={() => select(item.id)}>
                <span className="speech-language-flag" aria-hidden="true">{item.flag}</span>
                <span><small>{item.code}</small><strong>{c[item.labelKey]}</strong></span>
                {item.id === value && <Check aria-hidden="true" />}
            </button>)}
        </div>}
    </div>;
}

function GoogleButton({ onCredential, disabled, label, intent = 'login' }) {
    const hostRef = useRef(null);
    const [configured, setConfigured] = useState(true);

    useEffect(() => {
        let active = true;
        const mount = async () => {
            try {
                const config = await getGoogleConfig();
                if (!active) return;
                if (!config.enabled || !config.client_id) {
                    setConfigured(false);
                    return;
                }
                let script = document.querySelector('script[data-syncall-google]');
                if (!script) {
                    script = document.createElement('script');
                    script.src = 'https://accounts.google.com/gsi/client';
                    script.async = true;
                    script.dataset.syncallGoogle = 'true';
                    document.head.appendChild(script);
                }
                await new Promise((resolve, reject) => {
                    if (window.google?.accounts?.id) return resolve();
                    script.addEventListener('load', resolve, { once: true });
                    script.addEventListener('error', reject, { once: true });
                });
                if (!active || !hostRef.current) return;
                window.google.accounts.id.initialize({
                    client_id: config.client_id,
                    callback: ({ credential }) => credential && onCredential(credential),
                });
                hostRef.current.innerHTML = '';
                window.google.accounts.id.renderButton(hostRef.current, {
                    type: 'standard', theme: 'filled_black', size: 'large', shape: 'rectangular',
                    text: intent === 'register' ? 'signup_with' : 'signin_with', width: Math.min(390, hostRef.current.offsetWidth || 390),
                });
            } catch {
                if (active) setConfigured(false);
            }
        };
        mount();
        return () => { active = false; };
    }, [intent, onCredential]);

    if (!configured) return <div className="cabinet-login-setup">{label}</div>;
    return <div ref={hostRef} className={disabled ? 'google-button-host is-disabled' : 'google-button-host'} aria-label={label} />;
}

function CabinetLogin() {
    const { emailLogin, googleLogin } = useCabinetAuth();
    const { language, setLanguage, localePath } = useLanguage();
    const c = COPY[language];
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const google = useCallback(async (credential) => {
        setBusy(true);
        setError('');
        try {
            await googleLogin(credential, mode);
        } catch (reason) {
            setError(reason?.status === 404 ? c.accountNotFound : reason instanceof Error ? reason.message : c.error);
        } finally {
            setBusy(false);
        }
    }, [c.accountNotFound, c.error, googleLogin, mode]);

    const submitEmail = async (event) => {
        event.preventDefault();
        setBusy(true);
        setError('');
        try {
            await emailLogin(email, password);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : c.error);
        } finally {
            setBusy(false);
        }
    };

    const switchMode = (nextMode) => {
        setMode(nextMode);
        setError('');
    };

    return (
        <main className="cabinet-login" id="main-content">
            <div className="cabinet-login-glow cabinet-login-glow-a" />
            <div className="cabinet-login-glow cabinet-login-glow-b" />
            <header className="cabinet-login-header">
                <Link to={localePath('/')}><img src="/Syncall.svg" alt="Syncall" /></Link>
                <div className="cabinet-language-pills">
                    {['uz', 'ru', 'en'].map((item) => <button key={item} className={language === item ? 'active' : ''} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}
                </div>
            </header>
            <div className="cabinet-login-content">
                <section className="cabinet-login-promise">
                    <span className="cabinet-kicker"><Sparkles size={14} /> {c.studio}</span>
                    <h1>{c.loginTitle}</h1>
                    <p>{c.loginBody}</p>
                    <div className="cabinet-login-demo" aria-hidden="true">
                        <span className="cabinet-demo-orb"><Mic size={24} /></span>
                        <div className="cabinet-demo-wave">{Array.from({ length: 42 }).map((_, index) => <i key={index} style={{ height: `${18 + Math.abs(Math.sin(index * 0.76)) * 62}%` }} />)}</div>
                    </div>
                </section>

                <section className="cabinet-auth-card" aria-label={mode === 'login' ? c.loginTab : c.registerTab}>
                    <div className="cabinet-auth-tabs" role="tablist" aria-label={`${c.loginTab} / ${c.registerTab}`}>
                        <button type="button" role="tab" aria-selected={mode === 'login'} className={mode === 'login' ? 'active' : ''} onClick={() => switchMode('login')}>{c.loginTab}</button>
                        <button type="button" role="tab" aria-selected={mode === 'register'} className={mode === 'register' ? 'active' : ''} onClick={() => switchMode('register')}>{c.registerTab}</button>
                    </div>

                    <div className="cabinet-auth-heading">
                        <h2>{mode === 'login' ? c.signInTitle : c.registerTitle}</h2>
                        <p>{mode === 'login' ? c.signInBody : c.registerBody}</p>
                    </div>

                    {mode === 'login' && <form className="cabinet-auth-form" onSubmit={submitEmail}>
                        <label htmlFor="cabinet-login-email">{c.emailLabel}</label>
                        <input id="cabinet-login-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={c.emailPlaceholder} required disabled={busy} />
                        <label htmlFor="cabinet-login-password">{c.passwordLabel}</label>
                        <input id="cabinet-login-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={c.passwordPlaceholder} required disabled={busy} />
                        <button className="cabinet-auth-submit" type="submit" disabled={busy}>{busy ? <><LoaderCircle className="spin" size={18} /> {c.signingIn}</> : c.signIn}</button>
                        <p className="cabinet-auth-hint">{c.loginHint}</p>
                    </form>}

                    {mode === 'login' && <div className="cabinet-auth-divider"><span>{c.or}</span></div>}

                    <div className="cabinet-google-wrap">
                        {busy && mode === 'register' && <div className="cabinet-google-busy"><LoaderCircle className="spin" size={18} /> {c.loading}</div>}
                        <GoogleButton onCredential={google} disabled={busy} label={mode === 'login' ? c.googleLogin : c.googleRegister} intent={mode} />
                    </div>

                    {mode === 'register' && <p className="cabinet-registration-note"><LockKeyhole size={15} /> {c.registrationOnly}</p>}
                    {error && <div className="cabinet-alert error">{error}</div>}
                    <p className="cabinet-auth-switch">{mode === 'login' ? c.noAccount : c.haveAccount} <button type="button" onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? c.createAccount : c.goToLogin}</button></p>
                    <p className="cabinet-login-secure"><Check size={14} /> {c.secure}</p>
                </section>
            </div>
        </main>
    );
}

function LoadingStudio({ label }) {
    return <div className="cabinet-loading"><span className="cabinet-loader-mark"><AudioLines /></span><LoaderCircle className="spin" /><p>{label}</p></div>;
}

function AudioAsset({ job, c }) {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);
    const urlRef = useRef('');
    const activeAssetRef = useRef('');
    const assetKey = `${job.id}:${job.audio_url}`;

    useEffect(() => {
        activeAssetRef.current = assetKey;
        if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        urlRef.current = '';
        setUrl('');
        setLoading(false);
        setPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.removeAttribute('src');
            audioRef.current.load();
        }
        return () => {
            if (activeAssetRef.current === assetKey) activeAssetRef.current = '';
            if (urlRef.current) URL.revokeObjectURL(urlRef.current);
            urlRef.current = '';
        };
    }, [assetKey]);

    const ensureUrl = async () => {
        if (url) return url;
        const requestedAsset = assetKey;
        setLoading(true);
        try {
            const blob = await fetchCreatorAudio(job.audio_url);
            const next = URL.createObjectURL(blob);
            if (activeAssetRef.current !== requestedAsset) {
                URL.revokeObjectURL(next);
                return '';
            }
            if (urlRef.current) URL.revokeObjectURL(urlRef.current);
            urlRef.current = next;
            setUrl(next);
            return next;
        } finally {
            if (activeAssetRef.current === requestedAsset) setLoading(false);
        }
    };

    const toggle = async () => {
        const source = await ensureUrl();
        if (!source) return;
        requestAnimationFrame(() => {
            const element = audioRef.current;
            if (!element) return;
            if (element.src !== source) element.src = source;
            if (element.paused) element.play(); else element.pause();
        });
    };

    const download = async () => {
        const source = await ensureUrl();
        if (!source) return;
        const anchor = document.createElement('a');
        anchor.href = source;
        anchor.download = `syncall-${job.kind}-${job.id}.${job.kind === 'tts' ? 'wav' : 'audio'}`;
        anchor.click();
    };

    return <div className="cabinet-audio-asset">
        <button className="cabinet-icon-button filled" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>{loading ? <LoaderCircle className="spin" /> : playing ? <Pause /> : <Play />}</button>
        <div className={playing ? 'mini-wave is-playing' : 'mini-wave'}>{Array.from({ length: 20 }).map((_, i) => <i key={i} style={{ height: `${18 + Math.abs(Math.sin(i * 1.2)) * 70}%` }} />)}</div>
        <button className="cabinet-icon-button" onClick={download} aria-label={c.download}><ArrowDownToLine /></button>
        <audio ref={audioRef} src={url || undefined} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} hidden />
    </div>;
}

function ProjectRow({ job, c, language, onDelete, compact = false }) {
    const Icon = job.kind === 'tts' ? AudioLines : FileText;
    return <article className={compact ? 'project-row is-compact' : 'project-row'}>
        <span className={`project-kind ${job.kind}`}><Icon /></span>
        <div className="project-main">
            <h3>{job.title}</h3>
            <p>{job.kind === 'tts' ? c.voice : c.transcript} · {shortDate(job.created_at, language)}</p>
            {!compact && job.transcript && <p className="project-transcript">{job.transcript}</p>}
        </div>
        <span className="project-cost">{job.cost_uzs ? money(job.cost_uzs, language) : c.free}</span>
        <AudioAsset job={job} c={c} />
        {!compact && onDelete && <button className="cabinet-icon-button danger" onClick={() => onDelete(job.id)} aria-label={c.delete}><Trash2 /></button>}
    </article>;
}

function TopUpModal({ open, onClose, config, c, language }) {
    const [amount, setAmount] = useState(50000);
    const [provider, setProvider] = useState('payme');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    if (!open) return null;
    const providers = config?.payments?.providers || [];

    const submit = async () => {
        setBusy(true);
        setError('');
        try {
            const result = await createCreatorTopUp({ amount_uzs: Number(amount), provider, language });
            window.location.assign(result.checkout_url);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : c.error);
            setBusy(false);
        }
    };

    return <div className="cabinet-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
        <section className="cabinet-modal" role="dialog" aria-modal="true" aria-labelledby="topup-title">
            <button className="cabinet-modal-close" onClick={onClose} aria-label={c.close}><X /></button>
            <span className="cabinet-kicker"><WalletCards size={14} /> {c.topUp}</span>
            <h2 id="topup-title">{c.amount}</h2>
            <div className="amount-input"><input type="number" min={config?.payments?.minimum_uzs || 10000} value={amount} onChange={(event) => setAmount(event.target.value)} /><span>UZS</span></div>
            <div className="amount-chips">{[25000, 50000, 100000, 250000].map((value) => <button key={value} className={Number(amount) === value ? 'active' : ''} onClick={() => setAmount(value)}>{new Intl.NumberFormat(localeForIntl[language]).format(value)}</button>)}</div>
            <p className="field-caption">{c.minTopup}: {money(config?.payments?.minimum_uzs || 10000, language)}</p>
            <h3>{c.paymentMethod}</h3>
            <div className="payment-methods">
                {providers.map((item) => <button key={item.id} className={provider === item.id && item.enabled ? 'payment-method active' : 'payment-method'} disabled={!item.enabled} onClick={() => setProvider(item.id)}><span className={`payment-logo ${item.id}`}>{item.id === 'payme' ? 'payme' : item.id.slice(0, 1).toUpperCase()}</span><b>{item.id === 'xazna' ? 'Xazna' : item.id[0].toUpperCase() + item.id.slice(1)}</b>{!item.enabled && <small>{c.soon}</small>}<i /></button>)}
            </div>
            {error && <div className="cabinet-alert error">{error}</div>}
            <button className="cabinet-primary wide" disabled={busy || provider !== 'payme'} onClick={submit}>{busy ? <LoaderCircle className="spin" /> : null}{c.continuePayme}<ArrowRight /></button>
        </section>
    </div>;
}

function HomeView({ overview, config, personalVoices, c, language, localePath, onChanged, onTopUp }) {
    const firstName = overview.user.name?.split(' ')[0] || '';
    const [text, setText] = useState('');
    const [speechLanguage, setSpeechLanguage] = useState('uz');
    const [voice, setVoice] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [job, setJob] = useState(null);
    const voices = useMemo(() => [
        ...(config.voices[speechLanguage] || []).map((id) => ({ id, name: voiceName(id), language: speechLanguage, personal: false, available: true })),
        ...personalVoices.map((item) => ({ id: item.id, name: item.name, language: item.language, personal: true, available: item.language === speechLanguage })),
    ], [config.voices, personalVoices, speechLanguage]);
    const selectedVoice = voices.find((item) => item.id === voice);

    useEffect(() => {
        if (!selectedVoice?.available) setVoice(String(voices.find((item) => item.available)?.id || ''));
    }, [selectedVoice, voices]);

    const generate = async () => {
        if (!text.trim() || !selectedVoice?.available) return;
        setBusy(true); setError('');
        try {
            const result = await generateCreatorSpeech({ text: text.trim(), language: speechLanguage, voice_id: voice, speed: 1 });
            setJob(result);
            onChanged();
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : c.error);
        } finally {
            setBusy(false);
        }
    };

    return <div className="cabinet-view home-view">
        <header className="cabinet-page-head home-head">
            <div><span className="cabinet-kicker"><Sparkles size={14} /> {c.studio}</span><h1>{c.greeting}{firstName ? `, ${firstName}` : ''}</h1><p>{c.quickCreateBody}</p></div>
        </header>

        <section className="home-composer">
            <div className="home-composer-tabs">
                <span className="active"><AudioLines /> {c.voice}</span>
                <Link to={localePath('/cabinet/stt')}><FileText /> {c.transcript}</Link>
                <Link to={localePath('/cabinet/voices')}><Radio /> {c.voicesNav}</Link>
            </div>
            <textarea maxLength={config.limits.tts_max_chars} value={text} onChange={(event) => setText(event.target.value)} placeholder={c.quickPlaceholder} aria-label={c.script} />
            <div className="home-composer-footer">
                <div className="home-composer-options">
                    <select value={voice} onChange={(event) => setVoice(event.target.value)} aria-label={c.voiceLabel}>{voices.map((item) => <option value={item.id} key={item.id} disabled={!item.available}>{item.name}{item.personal ? ` · ${c.voiceSampleLanguage}: ${item.language === 'uz' ? c.uzbek : c.russian}` : ''}</option>)}</select>
                    <SpeechLanguageDropdown value={speechLanguage} onChange={setSpeechLanguage} c={c} compact />
                </div>
                <span className="composer-cost">{Array.from(text.trim()).length * config.pricing.tts_per_character_uzs ? money(Array.from(text.trim()).length * config.pricing.tts_per_character_uzs, language) : c.free}</span>
                <button className="cabinet-primary" disabled={busy || !text.trim() || !selectedVoice?.available} onClick={generate}>{busy ? <LoaderCircle className="spin" /> : <Sparkles />}{busy ? c.generating : c.quickGenerate}</button>
            </div>
            {error && <div className="cabinet-alert error composer-alert">{error}{error.toLowerCase().includes('balance') && <button onClick={onTopUp}>{c.topUp}</button>}</div>}
        </section>

        {job && <section className="home-generation-result"><div><span className="success-dot"><Check /></span><div><small>{c.ready}</small><strong>{job.title}</strong></div></div><AudioAsset key={job.id} job={job} c={c} /><button className="cabinet-text-button" onClick={() => { setJob(null); setText(''); }}>{c.newOne}</button></section>}

        <section className="home-shortcuts">
            <Link to={localePath('/cabinet/tts')} className="shortcut-card shortcut-blue"><span><WandSparkles /></span><div><small>Text to speech</small><h2>{c.ttsCard}</h2><p>{c.ttsCardBody}</p></div><ArrowRight /></Link>
            <Link to={localePath('/cabinet/stt')} className="shortcut-card shortcut-coral"><span><FileText /></span><div><small>Speech to text</small><h2>{c.sttCard}</h2><p>{c.sttCardBody}</p></div><ArrowRight /></Link>
        </section>

        <section className="recent-section"><div className="section-heading"><div><span className="eyebrow">{c.projectsLabel}</span><h2>{c.recent}</h2><p>{overview.recent_jobs.length ? `${overview.recent_jobs.length} ${c.history.toLowerCase()}` : c.noProjects}</p></div><Link to={localePath('/cabinet/history')}>{c.seeAll} <ArrowRight /></Link></div>
            <div className="project-list">{overview.recent_jobs.length ? overview.recent_jobs.map((item) => <ProjectRow key={item.id} job={item} c={c} language={language} compact />) : <div className="empty-state compact"><History /><h2>{c.noProjects}</h2></div>}</div>
        </section>
    </div>;
}

function VoiceCreator({ config, c, onCreated, onChanged, onClose, onTopUp }) {
    const [mode, setMode] = useState('upload');
    const [speechLanguage, setSpeechLanguage] = useState('uz');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [duration, setDuration] = useState(0);
    const [recording, setRecording] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [sampleJob, setSampleJob] = useState(null);
    const [name, setName] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef(null);
    const recorderRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);

    const clearTimer = () => {
        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = null;
    };
    const choose = (next, knownDuration = 0) => {
        if (!next) return;
        if (next.size > config.limits.stt_max_bytes) {
            setError(c.formats);
            return;
        }
        if (preview) URL.revokeObjectURL(preview);
        setFile(next);
        setPreview(URL.createObjectURL(next));
        setDuration(knownDuration);
        setElapsed(0);
        setSampleJob(null);
        setName('');
        setError('');
    };
    const reset = () => {
        if (preview) URL.revokeObjectURL(preview);
        setFile(null); setPreview(''); setDuration(0); setElapsed(0); setSampleJob(null); setName(''); setError('');
    };
    const readDuration = (event) => {
        const seconds = event.currentTarget.duration;
        if (!Number.isFinite(seconds)) return;
        setDuration(seconds);
        if (seconds < 5) setError(c.sampleTooShort);
        else if (seconds > 10) setError(c.sampleTooLong);
        else setError('');
    };

    useEffect(() => () => {
        clearTimer();
        if (preview) URL.revokeObjectURL(preview);
        if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
    }, [preview]);

    const startRecording = async () => {
        setError('');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const startedAt = Date.now();
            chunksRef.current = [];
            recorder.ondataavailable = (event) => event.data.size && chunksRef.current.push(event.data);
            recorder.onstop = () => {
                clearTimer();
                const blob = new File(chunksRef.current, 'voice-sample.webm', { type: 'audio/webm' });
                choose(blob, Math.min(10, (Date.now() - startedAt) / 1000));
                stream.getTracks().forEach((track) => track.stop());
                setRecording(false);
            };
            recorderRef.current = recorder;
            recorder.start();
            setElapsed(0);
            setRecording(true);
            timerRef.current = window.setInterval(() => {
                const seconds = Math.min(10, (Date.now() - startedAt) / 1000);
                setElapsed(seconds);
                if (seconds >= 9.8 && recorder.state === 'recording') recorder.stop();
            }, 100);
        } catch {
            setError(c.error);
        }
    };
    const stopRecording = () => {
        if (elapsed < 5) {
            setError(c.sampleTooShort);
            return;
        }
        recorderRef.current?.stop();
    };
    const transcribe = async () => {
        if (!file) return;
        if (duration < 5) { setError(c.sampleTooShort); return; }
        if (duration > 10) { setError(c.sampleTooLong); return; }
        setBusy(true); setError('');
        try {
            const result = await transcribeCreatorAudio(file, speechLanguage, false, 'voice_clone');
            setSampleJob(result);
            onChanged();
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : c.error);
        } finally { setBusy(false); }
    };
    const save = async () => {
        if (!sampleJob || !name.trim()) return;
        setBusy(true); setError('');
        try {
            const voice = await createCreatorVoice({ name: name.trim(), source_job_id: sampleJob.id });
            onCreated(voice);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : c.error);
        } finally { setBusy(false); }
    };

    return <section className="voice-creator-panel">
        <header><div><span className="cabinet-kicker"><Mic /> {c.privateVoice}</span><h2>{c.sampleTitle}</h2><p>{c.sampleBody}</p></div><button className="cabinet-modal-close voice-creator-close" onClick={onClose} aria-label={c.close}><X /></button></header>
        <div className="voice-creator-steps"><span className="active"><i>1</i>{c.sampleReady}</span><b /><span className={sampleJob ? 'active' : ''}><i>2</i>{c.transcriptStep}</span><b /><span className={sampleJob ? 'active' : ''}><i>3</i>{c.voiceName}</span></div>
        {!sampleJob ? <div className="voice-sample-layout">
            <div className="voice-sample-card">
                <div className="transcribe-tabs"><button className={mode === 'upload' ? 'active' : ''} onClick={() => { setMode('upload'); reset(); }}><UploadCloud /> {c.uploadSample}</button><button className={mode === 'record' ? 'active' : ''} onClick={() => { setMode('record'); reset(); }}><Mic /> {c.recordSample}</button></div>
                {mode === 'upload' ? <div className={file ? 'drop-zone has-file clone-drop-zone' : 'drop-zone clone-drop-zone'} onClick={() => !file && inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); choose(event.dataTransfer.files?.[0]); }}>
                    <input ref={inputRef} type="file" accept="audio/*" hidden onChange={(event) => choose(event.target.files?.[0])} />
                    {file ? <><span className="drop-icon ready"><Check /></span><h3>{c.sampleReady}</h3><p>{file.name}</p><audio controls src={preview} onLoadedMetadata={readDuration} /><button className="cabinet-text-button" onClick={(event) => { event.stopPropagation(); inputRef.current?.click(); }}>{c.change}</button></> : <><span className="drop-icon"><UploadCloud /></span><h3>{c.uploadSample}</h3><p>{c.sampleBody}</p><span className="sample-length-badge">{c.sampleLength}</span></>}
                </div> : <div className={recording ? 'record-zone is-recording clone-record-zone' : 'record-zone clone-record-zone'}>
                    <button className="record-button" onClick={recording ? stopRecording : startRecording}>{recording ? <Square /> : <Mic />}</button>
                    <h3>{recording ? c.recordingSample : file ? c.sampleReady : c.recordSample}</h3>
                    <strong className="record-timer">{(recording ? elapsed : duration).toFixed(1)}s / 10s</strong>
                    <div className="record-wave">{Array.from({ length: 32 }).map((_, index) => <i key={index} style={{ height: recording ? `${15 + Math.abs(Math.sin(index * .8)) * 75}%` : '14%' }} />)}</div>
                    {file && !recording && <audio controls src={preview} onLoadedMetadata={readDuration} />}
                </div>}
                <div className="sample-quality-note"><Check /> {c.sampleQuality}<span>{c.sampleLength}</span></div>
            </div>
            <aside className="voice-sample-guide"><span><AudioLines /></span><h3>{c.sampleTitle}</h3><p>{c.sampleBody}</p><SpeechLanguageDropdown value={speechLanguage} onChange={setSpeechLanguage} c={c} />{error && <div className="cabinet-alert error">{error}{error.toLowerCase().includes('balance') && <button onClick={onTopUp}>{c.topUp}</button>}</div>}<button className="cabinet-primary wide" disabled={!file || busy || recording} onClick={transcribe}>{busy ? <LoaderCircle className="spin" /> : <FileText />}{busy ? c.transcribingSample : c.transcribeSample}</button></aside>
        </div> : <div className="voice-name-step">
            <div className="voice-transcript-review"><span className="cabinet-kicker"><Check /> {c.transcriptStep}</span><blockquote>{sampleJob.transcript}</blockquote><p>{c.transcriptHelp}</p><button className="cabinet-text-button" onClick={reset}><RefreshCw /> {c.restartSample}</button></div>
            <div className="voice-name-form"><span className="voice-avatar voice-0"><AudioLines /></span><label>{c.voiceName}<input maxLength={config.limits.voice_name_max_chars || 48} value={name} onChange={(event) => setName(event.target.value)} placeholder={c.voiceNamePlaceholder} autoFocus /></label><small><LockKeyhole /> {c.privateVoiceBody}</small>{error && <div className="cabinet-alert error">{error}</div>}<button className="cabinet-primary wide" disabled={busy || name.trim().length < 2} onClick={save}>{busy ? <LoaderCircle className="spin" /> : <Sparkles />}{busy ? c.savingVoice : c.saveVoice}</button></div>
        </div>}
    </section>;
}

function VoicesView({ config, c, localePath, personalVoices, onChanged, onTopUp }) {
    const [creatorOpen, setCreatorOpen] = useState(false);
    const [notice, setNotice] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [query, setQuery] = useState('');
    const [languageFilter, setLanguageFilter] = useState('all');
    const [styleFilter, setStyleFilter] = useState('all');
    const sharedVoices = [
        { id: 'durdona', name: 'Durdona', description: c.durdonaBio, styleId: 'storytelling', style: c.storytelling, type: 'shared' },
        { id: 'bekzod', name: 'Bekzod', description: c.bekzodBio, styleId: 'advertising', style: c.advertising, type: 'shared' },
    ].map((item) => ({
        ...item,
        languages: [
            ...(config.voices.uz.some((voice) => voice.startsWith(item.id)) ? ['uz'] : []),
            ...(config.voices.ru.some((voice) => voice.startsWith(item.id)) ? ['ru'] : []),
        ],
    }));
    const privateVoices = personalVoices.map((item) => ({
        ...item,
        description: item.transcript || c.privateVoiceBody,
        languages: [item.language],
        styleId: 'personal',
        style: c.personalStyle,
        type: 'personal',
    }));
    const catalog = [...sharedVoices, ...privateVoices];
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const filteredVoices = catalog.filter((item) => {
        if (activeTab === 'personal' && item.type !== 'personal') return false;
        if (activeTab === 'shared' && item.type !== 'shared') return false;
        if (languageFilter !== 'all' && !item.languages.includes(languageFilter)) return false;
        if (styleFilter !== 'all' && item.styleId !== styleFilter) return false;
        if (!normalizedQuery) return true;
        return [item.name, item.description, item.style].join(' ').toLocaleLowerCase().includes(normalizedQuery);
    });
    const tabs = [
        { id: 'all', label: c.exploreVoices, count: catalog.length },
        { id: 'personal', label: c.yourVoices, count: privateVoices.length },
        { id: 'shared', label: c.sharedVoices, count: sharedVoices.length },
    ];
    const styles = [
        { id: 'all', label: c.allStyles },
        { id: 'storytelling', label: c.storytelling },
        { id: 'advertising', label: c.advertising },
        { id: 'personal', label: c.personalStyle },
    ];
    const clearFilters = () => {
        setQuery('');
        setLanguageFilter('all');
        setStyleFilter('all');
    };
    const voiceTarget = (item) => {
        const speechLanguage = item.languages.includes('uz') ? 'uz' : item.languages[0] || 'uz';
        const voiceId = item.type === 'personal'
            ? item.id
            : config.voices[speechLanguage]?.find((id) => id.startsWith(item.id));
        const selectedVoiceId = String(voiceId || item.id);
        return {
            href: `${localePath('/cabinet/tts')}?voice=${encodeURIComponent(selectedVoiceId)}&language=${speechLanguage}`,
            voiceId: selectedVoiceId,
            language: speechLanguage,
        };
    };
    const remove = async (voice) => {
        if (!window.confirm(c.deleteVoiceConfirm)) return;
        setError('');
        try { await deleteCreatorVoice(voice.id); onChanged(); }
        catch (reason) { setError(reason instanceof Error ? reason.message : c.error); }
    };
    const created = () => {
        setCreatorOpen(false);
        setNotice(c.voiceCreated);
        onChanged();
        window.setTimeout(() => setNotice(''), 2600);
    };

    return <div className="cabinet-view voices-view">
        <header className="cabinet-page-head split voices-page-head"><div><span className="cabinet-kicker"><Radio size={14} /> Syncall Voice</span><h1>{c.voicesNav}</h1><p>{c.voiceLibraryBody}</p></div><button className="cabinet-primary" onClick={() => setCreatorOpen((open) => !open)}><Plus /> {c.createVoice}</button></header>
        {creatorOpen && <VoiceCreator config={config} c={c} onCreated={created} onChanged={onChanged} onClose={() => setCreatorOpen(false)} onTopUp={onTopUp} />}
        {notice && <div className="cabinet-alert success"><Check /> {notice}</div>}
        {error && <div className="cabinet-alert error">{error}</div>}

        <section className="voice-browser">
            <div className="voice-browser-tabs" role="tablist" aria-label={c.voicesNav}>
                {tabs.map((tab) => <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => { setActiveTab(tab.id); setStyleFilter('all'); }}>{tab.id === 'all' && <LayoutGrid />} {tab.label}<span>{tab.count}</span></button>)}
            </div>
            <div className="voice-browser-tools">
                <label className="voice-search"><Search aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={c.searchVoices} aria-label={c.searchVoices} />{query && <button type="button" onClick={() => setQuery('')} aria-label={c.clearFilters}><X /></button>}</label>
                <label className="voice-language-filter"><Languages aria-hidden="true" /><select value={languageFilter} onChange={(event) => setLanguageFilter(event.target.value)} aria-label={c.language}><option value="all">{c.allLanguages}</option><option value="uz">🇺🇿 {c.uzbek}</option><option value="ru">🇷🇺 {c.russian}</option></select><ChevronDown aria-hidden="true" /></label>
            </div>
            <div className="voice-style-filters" aria-label={c.allStyles}>{styles.map((style) => <button type="button" key={style.id} className={styleFilter === style.id ? 'active' : ''} onClick={() => setStyleFilter(style.id)}>{style.id === 'personal' && <LockKeyhole />}{style.label}</button>)}</div>
        </section>

        <div className="voice-list-summary"><strong>{filteredVoices.length} {c.voiceResults}</strong><span>{c.voiceLibraryBody}</span></div>
        {filteredVoices.length ? <section className="voice-catalog-list">
            {filteredVoices.map((item) => {
                const target = voiceTarget(item);
                return <article className="voice-catalog-row" key={`${item.type}-${item.id}`}>
                    <div className="voice-row-main">
                        <VoiceAvatar seed={item.id} />
                        <div className="voice-row-identity"><div><h2>{item.name}</h2><span className={item.type === 'personal' ? 'voice-ownership personal' : 'voice-ownership'}>{item.type === 'personal' ? <LockKeyhole /> : <i />}{item.type === 'personal' ? c.personalTag : 'Syncall'}</span></div><p>{item.description}</p></div>
                    </div>
                    <div className="voice-row-meta">
                        <div><small>{c.language}</small><div className="voice-row-languages">{item.languages.map((id) => <span key={id}><b aria-hidden="true">{id === 'uz' ? '🇺🇿' : '🇷🇺'}</b>{id === 'uz' ? c.uzbek : c.russian}</span>)}</div></div>
                        <div><small>{c.allStyles}</small><strong><Sparkles />{item.style}</strong></div>
                    </div>
                    <div className="voice-row-actions"><Link to={target.href} state={{ creatorVoiceId: target.voiceId, creatorVoiceLanguage: target.language }} className="cabinet-secondary small"><Volume2 /> {c.useVoice}</Link>{item.type === 'personal' && <button className="cabinet-icon-button danger" onClick={() => remove(item)} aria-label={c.delete}><Trash2 /></button>}</div>
                </article>;
            })}
        </section> : <div className="empty-state voice-search-empty"><Search /><h2>{activeTab === 'personal' && !personalVoices.length && !query && languageFilter === 'all' && styleFilter === 'all' ? c.noPrivateVoices : c.noVoicesFound}</h2><div>{activeTab === 'personal' && !personalVoices.length ? <button className="cabinet-primary" onClick={() => setCreatorOpen(true)}><Plus /> {c.createVoice}</button> : <button className="cabinet-secondary small" onClick={clearFilters}><RefreshCw /> {c.clearFilters}</button>}</div></div>}
    </div>;
}

function ComingSoonView({ title, icon, c, localePath }) {
    return <div className="cabinet-view coming-view"><section className="coming-card"><span className="coming-icon">{icon}</span><span className="cabinet-kicker">{c.comingSoon}</span><h1>{title}</h1><p>{c.comingSoonBody}</p><Link className="cabinet-primary" to={localePath('/cabinet')}><ArrowRight /> {c.backHome}</Link><div className="coming-grid" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div></section></div>;
}

function TtsView({ config, personalVoices, c, language, localePath, onChanged, onTopUp }) {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const requestedVoiceId = String(location.state?.creatorVoiceId || searchParams.get('voice') || '');
    const requestedVoiceLanguage = location.state?.creatorVoiceLanguage || searchParams.get('language');
    const requestedVoiceRef = useRef(requestedVoiceId);
    const [text, setText] = useState('');
    const [speechLanguage, setSpeechLanguage] = useState(requestedVoiceLanguage === 'ru' ? 'ru' : 'uz');
    const [voice, setVoice] = useState(requestedVoiceId);
    const [speed, setSpeed] = useState(1);
    const [job, setJob] = useState(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [voiceNotice, setVoiceNotice] = useState('');
    const voices = useMemo(() => [
        ...(config.voices[speechLanguage] || []).map((id, index) => ({ id, name: voiceName(id), language: speechLanguage, personal: false, available: true, labelIndex: index })),
        ...personalVoices.map((item) => ({ id: item.id, name: item.name, language: item.language, personal: true, available: item.language === speechLanguage })),
    ], [config.voices, personalVoices, speechLanguage]);
    const selectedVoice = voices.find((item) => String(item.id) === String(voice));

    useEffect(() => {
        const requestedVoice = requestedVoiceRef.current;
        const requested = voices.find((item) => String(item.id) === String(requestedVoice));
        if (requested) {
            if (!requested.available && requested.personal) setSpeechLanguage(requested.language);
            setVoice(String(requested.id));
            requestedVoiceRef.current = '';
            return;
        }
        if (requestedVoice) return;
        if (!selectedVoice?.available) setVoice(voices.find((item) => item.available)?.id || '');
    }, [selectedVoice, voices]);
    const characterCount = Array.from(text.trim()).length;
    const estimated = characterCount * config.pricing.tts_per_character_uzs;
    const voiceLabels = [c.voiceWarm, c.voiceBright, c.voiceCalm];

    const selectLanguage = (nextLanguage) => {
        setVoiceNotice(selectedVoice?.personal && selectedVoice.language !== nextLanguage ? c.voiceLanguageNotice : '');
        setSpeechLanguage(nextLanguage);
        setError('');
    };

    const selectVoice = (item) => {
        if (!item.available && item.personal) setSpeechLanguage(item.language);
        setVoice(String(item.id));
        setVoiceNotice('');
        setError('');
    };

    const generate = async () => {
        if (!text.trim() || !selectedVoice?.available) return;
        setBusy(true); setError('');
        try {
            const result = await generateCreatorSpeech({ text: text.trim(), language: speechLanguage, voice_id: voice, speed });
            setJob(result); onChanged();
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : c.error);
        } finally { setBusy(false); }
    };

    const promptIdeas = language === 'ru'
        ? ['Реклама для Reels', 'История продукта', 'Спокойное объяснение']
        : language === 'uz'
            ? ['Reels uchun reklama', 'Mahsulot hikoyasi', 'Sokin tushuntirish']
            : ['Reel advertisement', 'Product story', 'Calm explainer'];

    return <div className="cabinet-view tool-view tts-tool-view">
        <header className="cabinet-page-head compact-head"><div><span className="cabinet-kicker"><WandSparkles size={14} /> Text to speech</span><h1>{c.createTitle}</h1><p>{c.createBody}</p></div></header>
        <div className="tts-workspace">
            <section className="tts-editor-panel">
                <div className="editor-heading"><div><span className="eyebrow">{c.script}</span><h2>{c.startWith}</h2></div><button className="cabinet-text-button" onClick={() => setText(SAMPLE_TEXT[language])}><Sparkles /> {c.useIdea}</button></div>
                <textarea id="creator-script" maxLength={config.limits.tts_max_chars} value={text} onChange={(event) => setText(event.target.value)} placeholder={c.placeholder} />
                {!text && <div className="prompt-ideas">{promptIdeas.map((idea) => <button key={idea} onClick={() => setText(idea)}>{idea}</button>)}</div>}
                <div className="editor-footer"><span>{text.length.toLocaleString()} / {config.limits.tts_max_chars.toLocaleString()} {c.chars}</span><div className="tiny-wave">{Array.from({ length: 20 }).map((_, index) => <i key={index} style={{ height: `${18 + Math.abs(Math.sin(index * .85)) * 64}%` }} />)}</div></div>
            </section>

            <aside className="tts-settings-panel">
                <div className="settings-tabs"><span className="active">{c.settingsTitle}</span><Link to={localePath('/cabinet/history')}>{c.historyTab}</Link></div>
                <div className="settings-block"><label>{c.voiceLabel}</label><div className="voice-settings-list">{voices.map((item) => <button key={item.id} className={`${String(voice) === String(item.id) ? 'active' : ''}${item.available ? '' : ' is-unavailable'}`} onClick={() => selectVoice(item)}><VoiceAvatar seed={item.id} compact /><div><strong>{item.name}</strong><small>{item.personal ? item.available ? `${c.privateVoice} · ${c.voiceSampleLanguage}: ${item.language === 'uz' ? c.uzbek : c.russian}` : `${c.switchLanguageToUse} ${item.language === 'uz' ? c.uzbek : c.russian}` : voiceLabels[item.labelIndex] || c.voiceNatural}</small></div>{String(voice) === String(item.id) && item.available && <Check />}</button>)}</div>{voiceNotice && <p className="voice-language-note"><Languages /> {voiceNotice}</p>}</div>
                <div className="settings-block"><label>{c.language}</label><SpeechLanguageDropdown value={speechLanguage} onChange={selectLanguage} c={c} /></div>
                <div className="settings-block range-block"><div><label>{c.speed}</label><strong>{speed.toFixed(1)}×</strong></div><input type="range" min="0.7" max="1.3" step="0.1" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} /><div className="range-labels"><span>0.7×</span><span>1.3×</span></div></div>
                <div className="settings-summary"><div><span>{c.modelLabel}</span><strong>{c.voiceNatural}</strong></div><div><span>{c.outputLabel}</span><strong>24 kHz</strong></div></div>
                <div className="generation-cost"><span>{c.cost}</span><strong>{estimated ? money(estimated, language) : c.free}</strong></div>
                {error && <div className="cabinet-alert error">{error}{error.toLowerCase().includes('balance') && <button onClick={onTopUp}>{c.topUp}</button>}</div>}
                <button className="cabinet-primary wide generate-button" onClick={generate} disabled={busy || !text.trim() || !selectedVoice?.available}>{busy ? <LoaderCircle className="spin" /> : <WandSparkles />}{busy ? c.generating : c.generate}</button>
            </aside>
        </div>
        {job && <section className="generation-result-bar"><div><span className="success-dot"><Check /></span><div><small>{c.ready}</small><strong>{job.title}</strong></div></div><AudioAsset key={job.id} job={job} c={c} /><button className="cabinet-secondary small" onClick={() => setJob(null)}><RefreshCw /> {c.newOne}</button></section>}
    </div>;
}

function SttView({ config, c, language, onChanged, onTopUp }) {
    const [mode, setMode] = useState('upload');
    const [speechLanguage, setSpeechLanguage] = useState('uz');
    const [diarization, setDiarization] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [recording, setRecording] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [job, setJob] = useState(null);
    const [duration, setDuration] = useState(0);
    const [copied, setCopied] = useState(false);
    const inputRef = useRef(null);
    const recorderRef = useRef(null);
    const chunksRef = useRef([]);
    const previewRef = useRef('');

    const replacePreview = useCallback((nextPreview) => {
        if (previewRef.current) URL.revokeObjectURL(previewRef.current);
        previewRef.current = nextPreview;
        setPreview(nextPreview);
    }, []);

    useEffect(() => () => {
        if (previewRef.current) URL.revokeObjectURL(previewRef.current);
        if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
    }, []);
    const choose = (next) => {
        if (!next) return;
        if (next.size > config.limits.stt_max_bytes) { setError(`40 MB · ${c.formats}`); return; }
        setFile(next); replacePreview(URL.createObjectURL(next)); setDuration(0); setJob(null); setCopied(false); setError('');
    };
    const clearRecording = () => {
        replacePreview('');
        setFile(null); setDuration(0); setJob(null); setCopied(false); setError('');
        chunksRef.current = [];
    };
    const start = async () => {
        setError('');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            clearRecording();
            chunksRef.current = [];
            recorder.ondataavailable = (event) => event.data.size && chunksRef.current.push(event.data);
            recorder.onstop = () => { const blob = new File(chunksRef.current, 'voice-recording.webm', { type: 'audio/webm' }); choose(blob); stream.getTracks().forEach((track) => track.stop()); };
            recorderRef.current = recorder; recorder.start(); setRecording(true);
        } catch { setError(c.error); }
    };
    const stop = () => { recorderRef.current?.stop(); setRecording(false); };
    const transcribe = async () => {
        if (!file) return;
        setBusy(true); setError('');
        try { const result = await transcribeCreatorAudio(file, speechLanguage, diarization); setJob(result); onChanged(); }
        catch (reason) { setError(reason instanceof Error ? reason.message : c.error); }
        finally { setBusy(false); }
    };
    const speakerIndex = (segment, index) => {
        const match = String(segment.speaker || '').match(/(\d+)$/);
        return match ? Number(match[1]) : index;
    };
    const speakerName = (segment, index) => `${c.speaker} ${speakerIndex(segment, index) + 1}`;
    const timecode = (value) => {
        const seconds = Math.max(0, Math.floor(Number(value) || 0));
        return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
    };
    const diarizedSegments = job?.diarization && Array.isArray(job.segments) ? job.segments : [];
    const copyText = async () => {
        const text = diarizedSegments.length
            ? diarizedSegments.map((segment, index) => `${speakerName(segment, index)}: ${segment.text || ''}`).join('\n\n')
            : job?.transcript || '';
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    };

    const estimated = duration > 0 ? Math.ceil(Math.ceil(duration) * config.pricing.stt_per_minute_uzs / 60) : 0;

    return (
        <div className="cabinet-view">
            <header className="cabinet-page-head">
                <span className="cabinet-kicker"><FileText size={14} /> Speech to text</span>
                <h1>{c.transcribeTitle}</h1>
                <p>{c.transcribeBody}</p>
            </header>
            <div className="transcribe-grid">
                <section className="transcribe-input-card">
                    <div className="transcribe-tabs">
                        <button className={mode === 'upload' ? 'active' : ''} onClick={() => setMode('upload')}><UploadCloud /> {c.upload}</button>
                        <button className={mode === 'record' ? 'active' : ''} onClick={() => setMode('record')}><Mic /> {c.record}</button>
                    </div>
                    <div className="stt-language-row">
                        <span>{c.language}</span>
                        <SpeechLanguageDropdown value={speechLanguage} onChange={setSpeechLanguage} c={c} compact />
                    </div>
                    <label className="diarization-option">
                        <input type="checkbox" checked={diarization} onChange={(event) => setDiarization(event.target.checked)} />
                        <span><strong>{c.diarization}</strong><small>{c.diarizationHelp}</small></span>
                        <i aria-hidden="true"><b /></i>
                    </label>
                    {mode === 'upload' ? (
                        <div
                            className={file ? 'drop-zone has-file' : 'drop-zone'}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={(event) => { event.preventDefault(); choose(event.dataTransfer.files?.[0]); }}
                            onClick={() => !file && inputRef.current?.click()}
                        >
                            <input ref={inputRef} type="file" accept="audio/*" hidden onChange={(event) => choose(event.target.files?.[0])} />
                            {file ? (
                                <>
                                    <span className="drop-icon ready"><FileAudio /></span>
                                    <h3>{c.selected}</h3>
                                    <p>{file.name}</p>
                                    <audio controls src={preview} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} />
                                    <button className="cabinet-text-button" onClick={(event) => { event.stopPropagation(); inputRef.current?.click(); }}>{c.change}</button>
                                </>
                            ) : (
                                <>
                                    <span className="drop-icon"><UploadCloud /></span>
                                    <h3>{c.drop}</h3>
                                    <button className="cabinet-secondary">{c.browse}</button>
                                    <p>{c.formats}</p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className={recording ? 'record-zone is-recording' : 'record-zone'}>
                            <button className="record-button" disabled={busy} onClick={recording ? stop : start}>{recording ? <Square /> : <Mic />}</button>
                            <h3>{recording ? c.stop : file ? c.selected : c.record}</h3>
                            <div className="record-wave">{Array.from({ length: 32 }).map((_, i) => <i key={i} style={{ height: recording ? `${15 + Math.abs(Math.sin(i * 0.8)) * 75}%` : '14%' }} />)}</div>
                            {file && !recording && (
                                <>
                                    <p>{file.name}</p>
                                    <audio controls src={preview} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} />
                                    <button type="button" className="record-again-button" disabled={busy} onClick={start}><RefreshCw /> {c.recordAgain}</button>
                                </>
                            )}
                        </div>
                    )}
                    {estimated > 0 && <div className="stt-cost-preview"><span>{c.estimatedCost}</span><strong>{money(estimated, language)}</strong></div>}
                    {error && <div className="cabinet-alert error action-error">{error}{error.toLowerCase().includes('balance') && <button onClick={onTopUp}>{c.topUp}</button>}</div>}
                    <button className="cabinet-primary wide" disabled={!file || busy || recording} onClick={transcribe}>{busy ? <LoaderCircle className="spin" /> : <Sparkles />}{busy ? c.transcribing : c.transcribeNow}</button>
                </section>
                <section className={job ? 'transcript-card-result has-result' : 'transcript-card-result'}>
                    {job ? (
                        <>
                            <header>
                                <div><span className="cabinet-kicker"><Check /> {c.transcriptReady}</span><h2>{job.title}</h2></div>
                                <button className="cabinet-secondary small" onClick={copyText}>{copied ? <Check /> : <Copy />}{copied ? c.copied : c.copyText}</button>
                            </header>
                            <div className={diarizedSegments.length ? 'transcript-paper is-diarized' : 'transcript-paper'}>
                                {diarizedSegments.length ? diarizedSegments.map((segment, index) => (
                                    <div className="speaker-segment" key={`${segment.speaker || index}-${segment.start || index}`}>
                                        <div><span className={`speaker-dot speaker-${speakerIndex(segment, index) % 4}`} /><strong>{speakerName(segment, index)}</strong><time>{timecode(segment.start)}</time></div>
                                        <p>{segment.text || '—'}</p>
                                    </div>
                                )) : job.transcript || '—'}
                            </div>
                            <footer><span><Clock3 /> {c.duration}: {Math.max(1, Math.round(job.duration_sec || 0))}s</span>{job.diarization && job.speaker_count > 0 && <span><UserRound /> {job.speaker_count} {c.speakers}</span>}{typeof job.confidence === 'number' && <span><Gauge /> {c.confidence}: {Math.round(job.confidence * 100)}%</span>}</footer>
                        </>
                    ) : (
                        <div className="transcript-empty"><span><FileText /></span><h3>{c.transcriptReady}</h3><p>{c.transcribeBody}</p></div>
                    )}
                </section>
            </div>
        </div>
    );
}

function HistoryView({ c, language, onChanged }) {
    const [filter, setFilter] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const load = useCallback(async () => { setLoading(true); setError(''); try { const result = await getCreatorJobs(filter); setJobs(result.items); } catch (reason) { setError(reason instanceof Error ? reason.message : c.error); } finally { setLoading(false); } }, [c.error, filter]);
    useEffect(() => { load(); }, [load]);
    const remove = async (id) => {
        if (!window.confirm(`${c.delete}?`)) return;
        setError('');
        try {
            await deleteCreatorJob(id);
            setJobs((items) => items.filter((item) => item.id !== id));
            onChanged();
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : c.error);
        }
    };
    return <div className="cabinet-view"><header className="cabinet-page-head split"><div><span className="cabinet-kicker"><History size={14} /> {c.history}</span><h1>{c.historyTitle}</h1><p>{c.historyBody}</p></div><button className="cabinet-secondary" onClick={load}><RefreshCw className={loading ? 'spin' : ''} /> {c.refresh}</button></header><div className="history-filters">{[['', c.all], ['tts', c.voices], ['stt', c.transcripts]].map(([value, label]) => <button key={value} className={filter === value ? 'active' : ''} onClick={() => setFilter(value)}>{label}</button>)}</div>{error && <div className="cabinet-alert error">{error}</div>}<section className="project-list history-list">{loading ? <div className="list-loading"><LoaderCircle className="spin" /></div> : jobs.length ? jobs.map((job) => <ProjectRow key={job.id} job={job} c={c} language={language} onDelete={remove} />) : <div className="empty-state"><History /><h2>{c.emptyHistory}</h2></div>}</section></div>;
}

function BillingView({ billing, c, language, onTopUp, onRefresh }) {
    const titleFor = (item) => item.type === 'top_up' ? c.payment : item.type === 'admin_adjustment' ? c.adjustment : item.service === 'tts' ? c.usageTts : c.usageStt;
    return <div className="cabinet-view"><header className="cabinet-page-head"><span className="cabinet-kicker"><WalletCards size={14} /> {c.billing}</span><h1>{c.billingTitle}</h1><p>{c.billingBody}</p></header><section className="billing-hero"><div className="billing-orb"><WalletCards /></div><div><span>{c.currentBalance}</span><strong>{money(billing.balance_uzs, language)}</strong><small>UZS</small></div><button className="cabinet-primary" onClick={onTopUp}><Plus /> {c.topUp}</button></section><section className="billing-activity"><div className="section-heading"><div><h2>{c.paymentHistory}</h2><p>{c.billingBody}</p></div><button className="cabinet-icon-button" onClick={onRefresh}><RefreshCw /></button></div>{billing.transactions.length ? <div className="transactions">{billing.transactions.map((item) => <div className="transaction-row" key={`${item.type}-${item.id}`}><span className={`transaction-icon ${item.type}`} >{item.type === 'top_up' ? <CircleDollarSign /> : item.service === 'tts' ? <AudioLines /> : <FileText />}</span><div><b>{titleFor(item)}</b><small>{shortDate(item.created_at, language)}{item.provider ? ` · ${item.provider}` : ''}{item.reason ? ` · ${item.reason}` : ''}</small></div><span className={`status-pill ${item.status}`}>{c[item.status] || item.status}</span><strong className={item.amount_uzs > 0 ? 'positive' : ''}>{item.amount_uzs > 0 ? '+' : ''}{money(item.amount_uzs, language)}</strong></div>)}</div> : <div className="empty-state small"><Clock3 /><h2>{c.noTransactions}</h2></div>}</section></div>;
}

function ProfileView({ overview, c, onSaved }) {
    const [name, setName] = useState(overview.user.name || '');
    const [phone, setPhone] = useState((overview.user.phone_number || '').replace(/^\+/, ''));
    const [busy, setBusy] = useState(false);
    const [notice, setNotice] = useState('');
    const [error, setError] = useState('');
    const submit = async (event) => { event.preventDefault(); setBusy(true); setError(''); try { await updateCreatorProfile({ name, phone_number: phone ? `+${phone.replace(/^\+/, '')}` : null }); setNotice(c.saved); onSaved(); setTimeout(() => setNotice(''), 2200); } catch (reason) { setError(reason instanceof Error ? reason.message : c.error); } finally { setBusy(false); } };
    return <div className="cabinet-view"><header className="cabinet-page-head"><span className="cabinet-kicker"><Settings size={14} /> {c.profile}</span><h1>{c.profileTitle}</h1><p>{c.profileBody}</p></header><section className="profile-card"><div className="profile-identity">{overview.user.avatar_url ? <img src={overview.user.avatar_url} alt="" referrerPolicy="no-referrer" /> : <span><UserRound /></span>}<div><h2>{overview.user.name}</h2><p><Check /> {c.memberVia}</p></div></div><form onSubmit={submit}><label>{c.fullName}<div className="cabinet-input"><UserRound /><input value={name} onChange={(event) => setName(event.target.value)} required minLength={2} /></div></label><label>{c.email}<div className="cabinet-input is-disabled"><span>@</span><input value={overview.user.email} disabled /></div></label><label>{c.phone}<div className="cabinet-input"><span>+</span><input value={phone} onChange={(event) => setPhone(event.target.value.replace(/^\+/, ''))} placeholder="998 90 000 00 00" inputMode="tel" /></div></label>{error && <div className="cabinet-alert error">{error}</div>}{notice && <div className="cabinet-alert success"><Check /> {notice}</div>}<button className="cabinet-primary wide" disabled={busy}>{busy && <LoaderCircle className="spin" />}{c.save}</button></form></section></div>;
}

function StudioWorkspace() {
    const { logout, refreshUser } = useCabinetAuth();
    const { language, setLanguage, basePath, localePath } = useLanguage();
    const c = { ...COPY[language], ...EXTRA_COPY[language] };
    const navigate = useNavigate();
    const [overview, setOverview] = useState(null);
    const [config, setConfig] = useState(null);
    const [personalVoices, setPersonalVoices] = useState([]);
    const [billing, setBilling] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [topUpOpen, setTopUpOpen] = useState(false);

    const route = basePath.replace(/^\/cabinet\/?/, '') || 'home';
    const load = useCallback(async () => {
        setError('');
        try {
            const [nextOverview, nextConfig, nextVoices] = await Promise.all([getCreatorOverview(), getCreatorConfig(), getCreatorVoices()]);
            setOverview(nextOverview); setConfig(nextConfig); setPersonalVoices(nextVoices.items || []);
        } catch (reason) { setError(reason instanceof Error ? reason.message : c.error); }
        finally { setLoading(false); }
    }, [c.error]);
    const loadBilling = useCallback(async () => { try { setBilling(await getCreatorBilling()); } catch (reason) { setError(reason instanceof Error ? reason.message : c.error); } }, [c.error]);
    useEffect(() => { load(); }, [load]);
    useEffect(() => { if (route === 'billing') loadBilling(); }, [loadBilling, route]);
    useEffect(() => { setMenuOpen(false); }, [basePath]);

    const changed = () => { load(); if (route === 'billing') loadBilling(); };
    const saveProfile = async () => { await refreshUser(); load(); };
    const primaryNav = [
        { id: 'home', path: '/cabinet', icon: <Home />, label: c.home },
        { id: 'voices', path: '/cabinet/voices', icon: <Radio />, label: c.voicesNav },
    ];
    const createNav = [
        { id: 'tts', path: '/cabinet/tts', icon: <AudioLines />, label: c.voice },
        { id: 'stt', path: '/cabinet/stt', icon: <FileText />, label: c.transcript },
        { id: 'enhancer', path: '/cabinet/enhancer', icon: <WandSparkles />, label: c.enhancer, soon: true },
        { id: 'subtitles', path: '/cabinet/subtitles', icon: <Captions />, label: c.subtitles, soon: true },
        { id: 'dubbing', path: '/cabinet/dubbing', icon: <Languages />, label: c.dubbing, soon: true },
        { id: 'audiobooks', path: '/cabinet/audiobooks', icon: <BookOpen />, label: c.audiobooks, soon: true },
    ];
    const workspaceNav = [
        { id: 'history', path: '/cabinet/history', icon: <History />, label: c.history },
        { id: 'billing', path: '/cabinet/billing', icon: <WalletCards />, label: c.billing },
        { id: 'profile', path: '/cabinet/profile', icon: <UserRound />, label: c.profile },
        { id: 'developer', path: '/cabinet/developer', icon: <Code2 />, label: c.developer, soon: true },
    ];
    const allNav = [...primaryNav, ...createNav, ...workspaceNav];
    const currentTitle = allNav.find((item) => item.id === route)?.label || c.home;
    const renderNav = (items) => items.map((item) => <NavLink key={item.id} to={localePath(item.path)} end={item.path === '/cabinet'} className={({ isActive }) => isActive ? 'active' : ''}>{item.icon}<span>{item.label}</span>{item.soon && <small>{c.comingSoon}</small>}</NavLink>);
    if (loading) return <LoadingStudio label={c.loading} />;
    if (error && (!overview || !config)) return <div className="cabinet-fatal"><AudioLines /><h1>{c.error}</h1><p>{error}</p><button className="cabinet-primary" onClick={load}>{c.refresh}</button></div>;

    let content = <HomeView overview={overview} config={config} personalVoices={personalVoices} c={c} language={language} localePath={localePath} onChanged={changed} onTopUp={() => setTopUpOpen(true)} />;
    if (route === 'voices') content = <VoicesView config={config} personalVoices={personalVoices} c={c} localePath={localePath} onChanged={changed} onTopUp={() => setTopUpOpen(true)} />;
    if (route === 'tts') content = <TtsView config={config} personalVoices={personalVoices} c={c} language={language} localePath={localePath} onChanged={changed} onTopUp={() => setTopUpOpen(true)} />;
    if (route === 'stt') content = <SttView config={config} c={c} language={language} onChanged={changed} onTopUp={() => setTopUpOpen(true)} />;
    if (route === 'history') content = <HistoryView c={c} language={language} onChanged={changed} />;
    if (route === 'billing') content = billing ? <BillingView billing={billing} c={c} language={language} onTopUp={() => setTopUpOpen(true)} onRefresh={loadBilling} /> : <LoadingStudio label={c.loading} />;
    if (route === 'profile') content = <ProfileView overview={overview} c={c} onSaved={saveProfile} />;
    const comingSoonRoutes = {
        enhancer: [c.enhancer, <Headphones />],
        subtitles: [c.subtitles, <Captions />],
        dubbing: [c.dubbing, <Languages />],
        audiobooks: [c.audiobooks, <BookOpen />],
        developer: [c.developer, <Code2 />],
    };
    if (comingSoonRoutes[route]) {
        const [title, icon] = comingSoonRoutes[route];
        content = <ComingSoonView title={title} icon={icon} c={c} localePath={localePath} />;
    }

    return <div className="cabinet-shell">
        <button className={menuOpen ? 'cabinet-scrim is-open' : 'cabinet-scrim'} onClick={() => setMenuOpen(false)} aria-label={c.close} />
        <aside className={menuOpen ? 'cabinet-sidebar is-open' : 'cabinet-sidebar'}>
            <Link className="cabinet-brand" to={localePath('/cabinet')}><img src="/Syncall.svg" alt="Syncall" /></Link>
            <div className="studio-identity"><span><Sparkles /></span><div><strong>Syncall Studio</strong><small>{c.creatorPlan}</small></div></div>
            <nav>
                <div className="sidebar-group">{renderNav(primaryNav)}</div>
                <div className="sidebar-group"><p>{c.createGroup}</p>{renderNav(createNav)}</div>
                <div className="sidebar-group"><p>{c.workspaceGroup}</p>{renderNav(workspaceNav)}</div>
            </nav>
            <div className="sidebar-bottom">
                <button className="sidebar-balance" onClick={() => setTopUpOpen(true)}><span><small>{c.available}</small><strong>{money(overview.wallet.balance_uzs, language)}</strong></span><i><Plus /></i></button>
                <button className="sidebar-profile" onClick={() => navigate(localePath('/cabinet/profile'))}>{overview.user.avatar_url ? <img src={overview.user.avatar_url} alt="" referrerPolicy="no-referrer" /> : <span><UserRound /></span>}<div><b>{overview.user.name}</b><small>{overview.user.email}</small></div><ChevronDown /></button>
                <button className="sidebar-logout" onClick={logout}><LogOut /> {c.logout}</button>
            </div>
        </aside>
        <main className="cabinet-main" id="main-content">
            <header className="cabinet-topbar">
                <div className="topbar-location"><button className="topbar-menu" onClick={() => setMenuOpen(true)} aria-label={c.menu}><PanelLeft /></button><span>{currentTitle}</span></div>
                <div className="topbar-actions"><button className="topbar-language" onClick={() => setLanguage(language === 'uz' ? 'ru' : language === 'ru' ? 'en' : 'uz')}><Languages /> {language.toUpperCase()} <ChevronDown /></button><button className="topbar-balance" onClick={() => setTopUpOpen(true)}><WalletCards /> {money(overview.wallet.balance_uzs, language)}</button><Link className="topbar-avatar" to={localePath('/cabinet/profile')}>{overview.user.avatar_url ? <img src={overview.user.avatar_url} alt="" referrerPolicy="no-referrer" /> : <UserRound />}</Link></div>
            </header>
            <div className="cabinet-content-frame">{content}</div>
        </main>
        <TopUpModal open={topUpOpen} onClose={() => setTopUpOpen(false)} config={config} c={c} language={language} />
    </div>;
}

function CabinetGate() {
    const { loading, isAuthenticated } = useCabinetAuth();
    const { language } = useLanguage();
    if (loading) return <LoadingStudio label={COPY[language].loading} />;
    return isAuthenticated ? <StudioWorkspace /> : <CabinetLogin />;
}

export default function Cabinet() {
    return <CabinetAuthProvider><CabinetGate /></CabinetAuthProvider>;
}
