import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
    ArrowDownToLine,
    ArrowRight,
    AudioLines,
    Check,
    ChevronDown,
    CircleDollarSign,
    Clock3,
    Copy,
    FileAudio,
    FileText,
    Gauge,
    History,
    Home,
    Languages,
    LoaderCircle,
    LogOut,
    Menu,
    Mic,
    Pause,
    Play,
    Plus,
    Radio,
    RefreshCw,
    Settings,
    Sparkles,
    Square,
    Trash2,
    UploadCloud,
    UserRound,
    WalletCards,
    WandSparkles,
    X,
} from 'lucide-react';
import { CabinetAuthProvider, useCabinetAuth } from '../context/CabinetAuthContext.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import {
    createCreatorTopUp,
    deleteCreatorJob,
    fetchCreatorAudio,
    generateCreatorSpeech,
    getCreatorBilling,
    getCreatorConfig,
    getCreatorJobs,
    getCreatorOverview,
    getGoogleConfig,
    transcribeCreatorAudio,
    updateCreatorProfile,
} from '../lib/cabinetApi.js';
import './Cabinet.css';

const COPY = {
    en: {
        studio: 'Creator studio', loginTitle: 'Turn an idea into a voice.', loginBody: 'Create natural voiceovers and clean transcripts without learning a complicated tool.',
        google: 'Continue with Google', secure: 'Your audio stays private to your account.', loading: 'Opening your studio…', setup: 'Google sign-in is not configured yet.',
        home: 'Home', voice: 'Create voice', transcript: 'Transcribe', history: 'My projects', billing: 'Balance', profile: 'Profile', logout: 'Sign out', menu: 'Open menu', close: 'Close',
        greeting: 'Good to see you', greetingBody: 'What would you like to make today?', available: 'Available balance', topUp: 'Top up', recent: 'Recent projects', seeAll: 'See all', noProjects: 'Your first project will appear here.',
        ttsCard: 'Voice a reel', ttsCardBody: 'Paste your script and get a ready-to-download voiceover.', sttCard: 'Turn audio into text', sttCardBody: 'Upload or record a clip and copy the transcript in seconds.',
        createTitle: 'Give your words a voice', createBody: 'Write naturally. Syncall handles the rest.', script: 'Your script', placeholder: 'Paste the text for your reel, story or announcement…', useIdea: 'Try an idea',
        language: 'Language', voiceLabel: 'Voice', speed: 'Pace', cost: 'Estimated cost', generate: 'Create voiceover', generating: 'Creating your voiceover…', ready: 'Your voiceover is ready', download: 'Download', newOne: 'Create another', chars: 'characters', insufficient: 'Top up your balance to create this audio.',
        voiceWarm: 'Warm & friendly', voiceBright: 'Bright & lively', voiceCalm: 'Calm & clear', voiceNatural: 'Natural voice',
        transcribeTitle: 'Turn speech into text', transcribeBody: 'Upload a file or record yourself. You will get clean, copy-ready text.', upload: 'Upload audio', record: 'Record now', stop: 'Stop recording', drop: 'Drop your audio here', browse: 'or choose a file', formats: 'MP3, WAV, M4A, OGG or WEBM · up to 40 MB', selected: 'Ready to transcribe', change: 'Change file', transcribeNow: 'Transcribe audio', transcribing: 'Listening carefully…', transcriptReady: 'Transcript ready', copyText: 'Copy text', copied: 'Copied', confidence: 'Confidence', duration: 'Audio length', diarization: 'Separate speakers', diarizationHelp: 'Label who said each part in calls, interviews and podcasts.', speaker: 'Speaker', speakers: 'speakers',
        historyTitle: 'Your projects', historyBody: 'Every voiceover and transcript, ready whenever you need it.', all: 'All', voices: 'Voiceovers', transcripts: 'Transcripts', delete: 'Delete', emptyHistory: 'Nothing here yet. Start with a voiceover or transcript.',
        billingTitle: 'Balance & payments', billingBody: 'See your usage and add funds when you need them.', currentBalance: 'Current balance', paymentHistory: 'Activity', amount: 'Top-up amount', paymentMethod: 'Payment method', continuePayme: 'Continue to Payme', soon: 'Soon', minTopup: 'Minimum top-up', noTransactions: 'No balance activity yet.', usageTts: 'Voice generation', usageStt: 'Transcription', payment: 'Balance top-up', adjustment: 'Balance adjustment', estimatedCost: 'Estimated cost', pending: 'Pending', paid: 'Paid', completed: 'Completed', cancelled: 'Cancelled',
        profileTitle: 'Your profile', profileBody: 'Keep your creator account details up to date.', fullName: 'Full name', email: 'Email', phone: 'Phone number', save: 'Save changes', saved: 'Profile updated', memberVia: 'Signed in securely with Google',
        error: 'Something went wrong. Please try again.', refresh: 'Refresh', uzbek: "O'zbekcha", russian: 'Русский', free: 'Free',
    },
    ru: {
        studio: 'Студия автора', loginTitle: 'Превратите идею в голос.', loginBody: 'Создавайте естественную озвучку и точные расшифровки без сложных настроек.',
        google: 'Продолжить с Google', secure: 'Ваши аудиофайлы доступны только вам.', loading: 'Открываем вашу студию…', setup: 'Вход через Google пока не настроен.',
        home: 'Главная', voice: 'Создать озвучку', transcript: 'Расшифровать', history: 'Мои проекты', billing: 'Баланс', profile: 'Профиль', logout: 'Выйти', menu: 'Открыть меню', close: 'Закрыть',
        greeting: 'Рады вас видеть', greetingBody: 'Что хотите создать сегодня?', available: 'Доступный баланс', topUp: 'Пополнить', recent: 'Недавние проекты', seeAll: 'Все проекты', noProjects: 'Ваш первый проект появится здесь.',
        ttsCard: 'Озвучить Reels', ttsCardBody: 'Вставьте сценарий и скачайте готовую озвучку.', sttCard: 'Превратить аудио в текст', sttCardBody: 'Загрузите или запишите аудио и скопируйте текст.',
        createTitle: 'Подарите тексту голос', createBody: 'Пишите как обычно — остальное сделает Syncall.', script: 'Ваш сценарий', placeholder: 'Вставьте текст для Reels, сторис или объявления…', useIdea: 'Вставить пример',
        language: 'Язык', voiceLabel: 'Голос', speed: 'Темп', cost: 'Примерная стоимость', generate: 'Создать озвучку', generating: 'Создаём озвучку…', ready: 'Озвучка готова', download: 'Скачать', newOne: 'Создать ещё', chars: 'символов', insufficient: 'Пополните баланс, чтобы создать аудио.',
        voiceWarm: 'Тёплый и дружелюбный', voiceBright: 'Яркий и энергичный', voiceCalm: 'Спокойный и чёткий', voiceNatural: 'Естественный голос',
        transcribeTitle: 'Превратите речь в текст', transcribeBody: 'Загрузите файл или запишите себя — получите чистый текст для копирования.', upload: 'Загрузить аудио', record: 'Записать голос', stop: 'Остановить запись', drop: 'Перетащите аудио сюда', browse: 'или выберите файл', formats: 'MP3, WAV, M4A, OGG или WEBM · до 40 МБ', selected: 'Готово к расшифровке', change: 'Другой файл', transcribeNow: 'Расшифровать аудио', transcribing: 'Внимательно слушаем…', transcriptReady: 'Расшифровка готова', copyText: 'Копировать текст', copied: 'Скопировано', confidence: 'Точность', duration: 'Длина аудио', diarization: 'Разделить по спикерам', diarizationHelp: 'Покажем, кто что сказал в звонке, интервью или подкасте.', speaker: 'Спикер', speakers: 'спикеров',
        historyTitle: 'Ваши проекты', historyBody: 'Все озвучки и расшифровки всегда под рукой.', all: 'Все', voices: 'Озвучки', transcripts: 'Расшифровки', delete: 'Удалить', emptyHistory: 'Здесь пока пусто. Создайте первую озвучку или расшифровку.',
        billingTitle: 'Баланс и платежи', billingBody: 'Следите за расходами и пополняйте баланс.', currentBalance: 'Текущий баланс', paymentHistory: 'Операции', amount: 'Сумма пополнения', paymentMethod: 'Способ оплаты', continuePayme: 'Продолжить в Payme', soon: 'Скоро', minTopup: 'Минимальное пополнение', noTransactions: 'Операций пока нет.', usageTts: 'Создание озвучки', usageStt: 'Расшифровка', payment: 'Пополнение баланса', adjustment: 'Корректировка баланса', estimatedCost: 'Примерная стоимость', pending: 'Ожидает', paid: 'Оплачено', completed: 'Готово', cancelled: 'Отменено',
        profileTitle: 'Ваш профиль', profileBody: 'Актуальные данные помогают нам лучше поддерживать вас.', fullName: 'Имя и фамилия', email: 'Email', phone: 'Номер телефона', save: 'Сохранить', saved: 'Профиль обновлён', memberVia: 'Безопасный вход через Google',
        error: 'Что-то пошло не так. Попробуйте ещё раз.', refresh: 'Обновить', uzbek: "O'zbekcha", russian: 'Русский', free: 'Бесплатно',
    },
    uz: {
        studio: 'Ijodkor studiyasi', loginTitle: "G'oyani ovozga aylantiring.", loginBody: "Murakkab sozlamalarsiz tabiiy ovoz va aniq transkript yarating.",
        google: 'Google orqali davom etish', secure: "Audiolaringiz faqat sizga ko'rinadi.", loading: 'Studiyangiz ochilmoqda…', setup: 'Google orqali kirish hali sozlanmagan.',
        home: 'Bosh sahifa', voice: 'Ovoz yaratish', transcript: 'Matnga aylantirish', history: 'Loyihalarim', billing: 'Balans', profile: 'Profil', logout: 'Chiqish', menu: 'Menyuni ochish', close: 'Yopish',
        greeting: "Sizni ko'rganimizdan xursandmiz", greetingBody: 'Bugun nima yaratmoqchisiz?', available: 'Mavjud balans', topUp: "To'ldirish", recent: 'Oxirgi loyihalar', seeAll: "Barchasini ko'rish", noProjects: 'Birinchi loyihangiz shu yerda chiqadi.',
        ttsCard: 'Reels uchun ovoz', ttsCardBody: 'Matnni kiriting va tayyor ovozni yuklab oling.', sttCard: 'Audioni matnga aylantirish', sttCardBody: 'Audio yuklang yoki yozib oling va matnni nusxalang.',
        createTitle: "So'zlaringizga ovoz bering", createBody: 'Odatdagidek yozing — qolganini Syncall bajaradi.', script: 'Matningiz', placeholder: "Reels, story yoki e'lon uchun matnni kiriting…", useIdea: "Misol qo'yish",
        language: 'Til', voiceLabel: 'Ovoz', speed: 'Tezlik', cost: 'Taxminiy narx', generate: 'Ovoz yaratish', generating: 'Ovoz yaratilmoqda…', ready: 'Ovozingiz tayyor', download: 'Yuklab olish', newOne: 'Yana yaratish', chars: 'belgi', insufficient: "Ovoz yaratish uchun balansni to'ldiring.",
        voiceWarm: "Iliq va do'stona", voiceBright: 'Yorqin va jonli', voiceCalm: 'Tinch va ravon', voiceNatural: 'Tabiiy ovoz',
        transcribeTitle: 'Nutqni matnga aylantiring', transcribeBody: 'Fayl yuklang yoki ovozingizni yozing — toza, tayyor matn oling.', upload: 'Audio yuklash', record: 'Ovoz yozish', stop: "Yozishni to'xtatish", drop: 'Audioni shu yerga tashlang', browse: 'yoki faylni tanlang', formats: 'MP3, WAV, M4A, OGG yoki WEBM · 40 MB gacha', selected: 'Matnga aylantirishga tayyor', change: 'Boshqa fayl', transcribeNow: 'Matnga aylantirish', transcribing: 'Diqqat bilan tinglayapmiz…', transcriptReady: 'Matn tayyor', copyText: 'Matnni nusxalash', copied: 'Nusxalandi', confidence: 'Aniqlik', duration: 'Audio uzunligi', diarization: 'Spikerlarni ajratish', diarizationHelp: "Qo'ng'iroq, intervyu yoki podkastda kim nima deganini ko'rsatamiz.", speaker: 'Spiker', speakers: 'spiker',
        historyTitle: 'Loyihalaringiz', historyBody: 'Barcha ovoz va transkriptlaringiz doim yoningizda.', all: 'Barchasi', voices: 'Ovozlar', transcripts: 'Transkriptlar', delete: "O'chirish", emptyHistory: "Hozircha bo'sh. Birinchi ovoz yoki transkriptni yarating.",
        billingTitle: "Balans va to'lovlar", billingBody: "Xarajatlarni ko'ring va kerak paytda balansni to'ldiring.", currentBalance: 'Joriy balans', paymentHistory: 'Amallar', amount: "To'ldirish summasi", paymentMethod: "To'lov usuli", continuePayme: 'Payme orqali davom etish', soon: 'Tez orada', minTopup: "Eng kam to'ldirish", noTransactions: "Hozircha amallar yo'q.", usageTts: 'Ovoz yaratish', usageStt: 'Transkripsiya', payment: "Balansni to'ldirish", adjustment: 'Balans tuzatishi', estimatedCost: 'Taxminiy narx', pending: 'Kutilmoqda', paid: "To'langan", completed: 'Tayyor', cancelled: 'Bekor qilingan',
        profileTitle: 'Profilingiz', profileBody: "Ma'lumotlaringizni yangilab turing.", fullName: "To'liq ism", email: 'Email', phone: 'Telefon raqami', save: 'Saqlash', saved: 'Profil yangilandi', memberVia: 'Google orqali xavfsiz kirish',
        error: "Xatolik yuz berdi. Qayta urinib ko'ring.", refresh: 'Yangilash', uzbek: "O'zbekcha", russian: 'Русский', free: 'Bepul',
    },
};

const SAMPLE_TEXT = {
    en: 'A good idea deserves a voice people remember. Create your next story with Syncall.',
    ru: 'Хорошая идея заслуживает голоса, который запомнят. Создайте свою следующую историю вместе с Syncall.',
    uz: "Yaxshi g'oya odamlar eslab qoladigan ovozga loyiq. Keyingi hikoyangizni Syncall bilan yarating.",
};

const localeForIntl = { en: 'en-US', ru: 'ru-RU', uz: 'uz-UZ' };

const money = (value, language) => `${new Intl.NumberFormat(localeForIntl[language]).format(Math.round(value || 0))} UZS`;
const shortDate = (value, language) => value ? new Intl.DateTimeFormat(localeForIntl[language], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(value)) : '—';

function GoogleButton({ onCredential, disabled, label }) {
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
                    type: 'standard', theme: 'filled_black', size: 'large', shape: 'pill',
                    text: 'continue_with', width: Math.min(360, hostRef.current.offsetWidth || 360),
                });
            } catch {
                if (active) setConfigured(false);
            }
        };
        mount();
        return () => { active = false; };
    }, [onCredential]);

    if (!configured) return <div className="cabinet-login-setup">{label}</div>;
    return <div ref={hostRef} className={disabled ? 'google-button-host is-disabled' : 'google-button-host'} aria-label={label} />;
}

function CabinetLogin() {
    const { googleLogin } = useCabinetAuth();
    const { language, setLanguage, localePath } = useLanguage();
    const c = COPY[language];
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    const login = useCallback(async (credential) => {
        setBusy(true);
        setError('');
        try {
            await googleLogin(credential);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : c.error);
        } finally {
            setBusy(false);
        }
    }, [c.error, googleLogin]);

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
            <section className="cabinet-login-panel">
                <span className="cabinet-kicker"><Sparkles size={14} /> {c.studio}</span>
                <h1>{c.loginTitle}</h1>
                <p>{c.loginBody}</p>
                <div className="cabinet-login-demo" aria-hidden="true">
                    <span className="cabinet-demo-orb"><Mic size={24} /></span>
                    <div className="cabinet-demo-wave">{Array.from({ length: 42 }).map((_, index) => <i key={index} style={{ height: `${18 + Math.abs(Math.sin(index * 0.76)) * 62}%` }} />)}</div>
                </div>
                <div className="cabinet-google-wrap">
                    {busy && <div className="cabinet-google-busy"><LoaderCircle className="spin" size={18} /> {c.loading}</div>}
                    <GoogleButton onCredential={login} disabled={busy} label={c.setup} />
                </div>
                {error && <div className="cabinet-alert error">{error}</div>}
                <p className="cabinet-login-secure"><Check size={14} /> {c.secure}</p>
            </section>
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

    useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);

    const ensureUrl = async () => {
        if (url) return url;
        setLoading(true);
        try {
            const blob = await fetchCreatorAudio(job.audio_url);
            const next = URL.createObjectURL(blob);
            setUrl(next);
            return next;
        } finally {
            setLoading(false);
        }
    };

    const toggle = async () => {
        const source = await ensureUrl();
        requestAnimationFrame(() => {
            const element = audioRef.current;
            if (!element) return;
            if (element.src !== source) element.src = source;
            if (element.paused) element.play(); else element.pause();
        });
    };

    const download = async () => {
        const source = await ensureUrl();
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

function HomeView({ overview, c, language, localePath, onTopUp }) {
    const firstName = overview.user.name?.split(' ')[0] || '';
    return <div className="cabinet-view home-view">
        <header className="cabinet-page-head home-head">
            <div><span className="cabinet-kicker"><Sparkles size={14} /> {c.studio}</span><h1>{c.greeting}{firstName ? `, ${firstName}` : ''}</h1><p>{c.greetingBody}</p></div>
            <div className="home-balance"><div><span>{c.available}</span><strong>{money(overview.wallet.balance_uzs, language)}</strong></div><button onClick={onTopUp}><Plus /> {c.topUp}</button></div>
        </header>
        <section className="quick-grid">
            <Link to={localePath('/cabinet/tts')} className="quick-card voice-card"><div className="quick-orb"><WandSparkles /></div><div><h2>{c.ttsCard}</h2><p>{c.ttsCardBody}</p></div><span className="quick-arrow"><ArrowRight /></span><div className="quick-wave" aria-hidden="true">{Array.from({ length: 28 }).map((_, i) => <i key={i} style={{ height: `${10 + Math.abs(Math.cos(i * 0.72)) * 72}%` }} />)}</div></Link>
            <Link to={localePath('/cabinet/stt')} className="quick-card transcript-card"><div className="quick-orb"><FileText /></div><div><h2>{c.sttCard}</h2><p>{c.sttCardBody}</p></div><span className="quick-arrow"><ArrowRight /></span><div className="quick-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div></Link>
        </section>
        <section className="recent-section"><div className="section-heading"><div><h2>{c.recent}</h2><p>{overview.recent_jobs.length ? `${overview.recent_jobs.length} ${c.history.toLowerCase()}` : c.noProjects}</p></div><Link to={localePath('/cabinet/history')}>{c.seeAll} <ArrowRight /></Link></div>
            <div className="project-list">{overview.recent_jobs.map((job) => <ProjectRow key={job.id} job={job} c={c} language={language} compact />)}</div>
        </section>
    </div>;
}

function TtsView({ config, c, language, onChanged, onTopUp }) {
    const [text, setText] = useState('');
    const [speechLanguage, setSpeechLanguage] = useState(language === 'ru' ? 'ru' : 'uz');
    const [voice, setVoice] = useState('');
    const [speed, setSpeed] = useState(1);
    const [job, setJob] = useState(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const voices = useMemo(() => config.voices[speechLanguage] || [], [config.voices, speechLanguage]);

    useEffect(() => { if (!voices.includes(voice)) setVoice(voices[0] || ''); }, [voice, voices]);
    const characterCount = Array.from(text.trim()).length;
    const estimated = characterCount * config.pricing.tts_per_character_uzs;
    const voiceLabels = [c.voiceWarm, c.voiceBright, c.voiceCalm];
    const displayVoiceName = (item) => item
        .replace(/[-_](uz|ru)$/i, '')
        .replace(/^./, (letter) => letter.toUpperCase());

    const generate = async () => {
        if (!text.trim() || !voice) return;
        setBusy(true); setError('');
        try {
            const result = await generateCreatorSpeech({ text: text.trim(), language: speechLanguage, voice_id: voice, speed });
            setJob(result); onChanged();
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : c.error);
        } finally { setBusy(false); }
    };

    if (job) return <div className="cabinet-view centered-view"><section className="success-card"><span className="success-check"><Check /></span><span className="cabinet-kicker">{c.ready}</span><h1>{job.title}</h1><p>{c.voiceNatural} · {job.language.toUpperCase()}</p><AudioAsset job={job} c={c} /><div className="success-actions"><button className="cabinet-secondary" onClick={() => setJob(null)}><RefreshCw /> {c.newOne}</button></div></section></div>;

    return <div className="cabinet-view"><header className="cabinet-page-head"><span className="cabinet-kicker"><WandSparkles size={14} /> Text to speech</span><h1>{c.createTitle}</h1><p>{c.createBody}</p></header>
        <div className="creator-workbench">
            <section className="script-card"><div className="script-label"><label htmlFor="creator-script">{c.script}</label><button onClick={() => setText(SAMPLE_TEXT[language])}><Sparkles /> {c.useIdea}</button></div><textarea id="creator-script" maxLength={config.limits.tts_max_chars} value={text} onChange={(event) => setText(event.target.value)} placeholder={c.placeholder} /><div className="script-footer"><span>{text.length.toLocaleString()} / {config.limits.tts_max_chars.toLocaleString()} {c.chars}</span><div className="tiny-wave">{Array.from({ length: 14 }).map((_, i) => <i key={i} style={{ height: `${20 + Math.abs(Math.sin(i)) * 64}%` }} />)}</div></div></section>
            <section className="voice-settings"><div className="setting-group"><h3><Languages /> {c.language}</h3><div className="segmented"><button className={speechLanguage === 'uz' ? 'active' : ''} onClick={() => setSpeechLanguage('uz')}>{c.uzbek}</button><button className={speechLanguage === 'ru' ? 'active' : ''} onClick={() => setSpeechLanguage('ru')}>{c.russian}</button></div></div>
                <div className="setting-group"><h3><Mic /> {c.voiceLabel}</h3><div className="voice-options">{voices.map((item, index) => <button key={item} className={voice === item ? 'active' : ''} onClick={() => setVoice(item)}><span><Radio /></span><div><b>{displayVoiceName(item)}</b><small>{voiceLabels[index] || c.voiceNatural}</small></div>{voice === item && <Check />}</button>)}</div></div>
                <div className="setting-row"><div><h3><Gauge /> {c.speed}</h3><p>{speed.toFixed(1)}×</p></div><input type="range" min="0.7" max="1.3" step="0.1" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} /></div>
            </section>
            {error && <div className="cabinet-alert error action-error">{error}{error.toLowerCase().includes('balance') && <button onClick={onTopUp}>{c.topUp}</button>}</div>}
            <footer className="workbench-footer"><div><span>{c.cost}</span><strong>{estimated ? money(estimated, language) : c.free}</strong></div><button className="cabinet-primary" onClick={generate} disabled={busy || !text.trim() || !voice}>{busy ? <LoaderCircle className="spin" /> : <WandSparkles />}{busy ? c.generating : c.generate}</button></footer>
        </div>
    </div>;
}

function SttView({ config, c, language, onChanged, onTopUp }) {
    const [mode, setMode] = useState('upload');
    const [speechLanguage, setSpeechLanguage] = useState(language === 'ru' ? 'ru' : 'uz');
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

    useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); if (recorderRef.current?.state === 'recording') recorderRef.current.stop(); }, [preview]);
    const choose = (next) => {
        if (!next) return;
        if (next.size > config.limits.stt_max_bytes) { setError(`40 MB · ${c.formats}`); return; }
        if (preview) URL.revokeObjectURL(preview);
        setFile(next); setPreview(URL.createObjectURL(next)); setDuration(0); setJob(null); setError('');
    };
    const start = async () => {
        setError('');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
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
                        <div className="segmented compact">
                            <button className={speechLanguage === 'uz' ? 'active' : ''} onClick={() => setSpeechLanguage('uz')}>{c.uzbek}</button>
                            <button className={speechLanguage === 'ru' ? 'active' : ''} onClick={() => setSpeechLanguage('ru')}>{c.russian}</button>
                        </div>
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
                            <button className="record-button" onClick={recording ? stop : start}>{recording ? <Square /> : <Mic />}</button>
                            <h3>{recording ? c.stop : c.record}</h3>
                            <div className="record-wave">{Array.from({ length: 32 }).map((_, i) => <i key={i} style={{ height: recording ? `${15 + Math.abs(Math.sin(i * 0.8)) * 75}%` : '14%' }} />)}</div>
                            {file && !recording && (
                                <>
                                    <p>{file.name}</p>
                                    <audio controls src={preview} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} />
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
    const c = COPY[language];
    const navigate = useNavigate();
    const [overview, setOverview] = useState(null);
    const [config, setConfig] = useState(null);
    const [billing, setBilling] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [topUpOpen, setTopUpOpen] = useState(false);

    const route = basePath.replace(/^\/cabinet\/?/, '') || 'home';
    const load = useCallback(async () => {
        setError('');
        try {
            const [nextOverview, nextConfig] = await Promise.all([getCreatorOverview(), getCreatorConfig()]);
            setOverview(nextOverview); setConfig(nextConfig);
        } catch (reason) { setError(reason instanceof Error ? reason.message : c.error); }
        finally { setLoading(false); }
    }, [c.error]);
    const loadBilling = useCallback(async () => { try { setBilling(await getCreatorBilling()); } catch (reason) { setError(reason instanceof Error ? reason.message : c.error); } }, [c.error]);
    useEffect(() => { load(); }, [load]);
    useEffect(() => { if (route === 'billing') loadBilling(); }, [loadBilling, route]);
    useEffect(() => { setMenuOpen(false); }, [basePath]);

    const changed = () => { load(); if (route === 'billing') loadBilling(); };
    const saveProfile = async () => { await refreshUser(); load(); };
    const nav = [
        ['home', '/cabinet', <Home />, c.home], ['tts', '/cabinet/tts', <AudioLines />, c.voice], ['stt', '/cabinet/stt', <FileText />, c.transcript],
        ['history', '/cabinet/history', <History />, c.history], ['billing', '/cabinet/billing', <WalletCards />, c.billing], ['profile', '/cabinet/profile', <UserRound />, c.profile],
    ];
    if (loading) return <LoadingStudio label={c.loading} />;
    if (error && (!overview || !config)) return <div className="cabinet-fatal"><AudioLines /><h1>{c.error}</h1><p>{error}</p><button className="cabinet-primary" onClick={load}>{c.refresh}</button></div>;

    let content = <HomeView overview={overview} c={c} language={language} localePath={localePath} onTopUp={() => setTopUpOpen(true)} />;
    if (route === 'tts') content = <TtsView config={config} c={c} language={language} onChanged={changed} onTopUp={() => setTopUpOpen(true)} />;
    if (route === 'stt') content = <SttView config={config} c={c} language={language} onChanged={changed} onTopUp={() => setTopUpOpen(true)} />;
    if (route === 'history') content = <HistoryView c={c} language={language} onChanged={changed} />;
    if (route === 'billing') content = billing ? <BillingView billing={billing} c={c} language={language} onTopUp={() => setTopUpOpen(true)} onRefresh={loadBilling} /> : <LoadingStudio label={c.loading} />;
    if (route === 'profile') content = <ProfileView overview={overview} c={c} onSaved={saveProfile} />;

    return <div className="cabinet-shell">
        <button className={menuOpen ? 'cabinet-scrim is-open' : 'cabinet-scrim'} onClick={() => setMenuOpen(false)} aria-label={c.close} />
        <aside className={menuOpen ? 'cabinet-sidebar is-open' : 'cabinet-sidebar'}><Link className="cabinet-brand" to={localePath('/')}><img src="/Syncall.svg" alt="Syncall" /><span>{c.studio}</span></Link><nav>{nav.map(([id, path, icon, label], index) => <div key={id} className={index === 3 ? 'nav-section-start' : ''}><NavLink to={localePath(path)} end={path === '/cabinet'} className={({ isActive }) => isActive ? 'active' : ''}>{icon}<span>{label}</span></NavLink></div>)}</nav><div className="sidebar-bottom"><button className="sidebar-balance" onClick={() => setTopUpOpen(true)}><span>{c.available}</span><strong>{money(overview.wallet.balance_uzs, language)}</strong><i><Plus /></i></button><button className="sidebar-profile" onClick={() => navigate(localePath('/cabinet/profile'))}>{overview.user.avatar_url ? <img src={overview.user.avatar_url} alt="" referrerPolicy="no-referrer" /> : <span><UserRound /></span>}<div><b>{overview.user.name}</b><small>{overview.user.email}</small></div><ChevronDown /></button><button className="sidebar-logout" onClick={logout}><LogOut /> {c.logout}</button></div></aside>
        <main className="cabinet-main" id="main-content"><header className="cabinet-mobile-header"><button onClick={() => setMenuOpen(true)} aria-label={c.menu}><Menu /></button><Link to={localePath('/cabinet')}><img src="/Syncall.svg" alt="Syncall" /></Link><button onClick={() => setTopUpOpen(true)} aria-label={c.topUp}><Plus /></button></header><div className="cabinet-topbar"><div className="topbar-language"><button onClick={() => setLanguage(language === 'uz' ? 'ru' : language === 'ru' ? 'en' : 'uz')}><Languages /> {language.toUpperCase()} <ChevronDown /></button></div></div>{content}</main>
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
