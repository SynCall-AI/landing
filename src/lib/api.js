// Swappable STT / TTS client.
//
// In production, point these at the real Syncall inference endpoints by setting
//   VITE_STT_API_URL  and  VITE_TTS_API_URL
// in the environment (e.g. Vercel project env vars or a local .env file).
//
// When the env vars are unset, both calls fall back to a realistic mock so the
// interactive demos work out of the box without a backend. The mock mirrors the
// shape of the real responses, so wiring the live endpoint later is a one-line
// swap with no UI changes.

const STT_URL = import.meta.env.VITE_STT_API_URL;
const TTS_URL = import.meta.env.VITE_TTS_API_URL;

export const isSttLive = Boolean(STT_URL);
export const isTtsLive = Boolean(TTS_URL);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- Mock transcripts, keyed loosely by language --------------------------

const MOCK_TRANSCRIPTS = {
    uz: {
        text:
            "Assalomu alaykum, men kechagi buyurtmam haqida so'ramoqchi edim. " +
            "Pul o'tkazmasi o'tdimi, yo'qmi — shuni bilsam bo'ladimi?",
        language: 'uz',
        languageLabel: "O'zbekcha",
        confidence: 0.957,
        durationSec: 6.4,
        words: [
            { w: 'Assalomu', start: 0.0, conf: 0.99 },
            { w: 'alaykum', start: 0.35, conf: 0.98 },
            { w: 'buyurtmam', start: 1.8, conf: 0.94 },
            { w: "so'ramoqchi", start: 2.7, conf: 0.92 },
        ],
    },
    ru: {
        text:
            "Здравствуйте, я хотел уточнить по вчерашнему заказу. " +
            "Подскажите, пожалуйста, прошёл платёж или нет?",
        language: 'ru',
        languageLabel: 'Русский',
        confidence: 0.962,
        durationSec: 5.8,
        words: [
            { w: 'Здравствуйте', start: 0.0, conf: 0.99 },
            { w: 'уточнить', start: 1.4, conf: 0.95 },
            { w: 'заказу', start: 2.6, conf: 0.93 },
            { w: 'платёж', start: 4.1, conf: 0.96 },
        ],
    },
    en: {
        text:
            "Hi, I wanted to check on my order from yesterday. " +
            "Could you tell me whether the payment went through?",
        language: 'en',
        languageLabel: 'English',
        confidence: 0.971,
        durationSec: 5.2,
        words: [
            { w: 'Hi', start: 0.0, conf: 0.99 },
            { w: 'order', start: 1.6, conf: 0.96 },
            { w: 'payment', start: 3.4, conf: 0.97 },
        ],
    },
};

/**
 * Transcribe an audio file/blob to text.
 * @param {Blob|File} audio - recorded or uploaded audio
 * @param {{ language?: 'uz'|'ru'|'en'|'auto' }} opts
 * @returns {Promise<{text:string, language:string, languageLabel:string, confidence:number, durationSec:number, words:Array, mock:boolean}>}
 */
export async function transcribeAudio(audio, opts = {}) {
    const language = opts.language && opts.language !== 'auto' ? opts.language : 'uz';

    if (STT_URL) {
        const form = new FormData();
        form.append('audio', audio, audio.name || 'recording.webm');
        if (opts.language) form.append('language', opts.language);
        const res = await fetch(STT_URL, { method: 'POST', body: form });
        if (!res.ok) throw new Error(`STT request failed: ${res.status}`);
        const data = await res.json();
        return { ...data, mock: false };
    }

    // Mock: simulate realistic round-trip latency.
    await wait(1100 + Math.min(2200, (audio?.size || 0) / 4000));
    const base = MOCK_TRANSCRIPTS[language] || MOCK_TRANSCRIPTS.uz;
    return { ...base, mock: true };
}

/**
 * Synthesize speech from text.
 * @param {string} text
 * @param {{ voice?: string, language?: string }} opts
 * @returns {Promise<{audioUrl:string, voice:string, durationSec:number, sampleRate:number, mock:boolean, revoke?:Function}>}
 */
export async function synthesizeSpeech(text, opts = {}) {
    const voice = opts.voice || 'aziza';

    if (TTS_URL) {
        const res = await fetch(TTS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, voice, language: opts.language }),
        });
        if (!res.ok) throw new Error(`TTS request failed: ${res.status}`);
        const blob = await res.blob();
        const audioUrl = URL.createObjectURL(blob);
        return {
            audioUrl,
            voice,
            durationSec: 0,
            sampleRate: 24000,
            mock: false,
            revoke: () => URL.revokeObjectURL(audioUrl),
        };
    }

    // Mock: simulate synthesis latency and return a pre-rendered sample clip so
    // the player actually plays something. Different voices map to sample files
    // that already ship in /public.
    await wait(900 + Math.min(1800, text.length * 12));
    const VOICE_SAMPLES = {
        aziza: '/iman_prod_uz.wav',
        jahongir: '/unicon_prod_uz.wav',
        dmitry: '/demo_ru.wav',
        emma: '/syncall_demo.wav',
    };
    return {
        audioUrl: VOICE_SAMPLES[voice] || VOICE_SAMPLES.aziza,
        voice,
        durationSec: 0,
        sampleRate: 24000,
        mock: true,
    };
}
