/* global process */

// Vercel serverless function: receives either the compact hero callback request
// or the full contact/demo form, then sends a sanitized notification to the
// configured Telegram chat.

const ALLOWED_LANGUAGES = new Set(['uz', 'ru', 'en']);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_LENGTH = 12_000;

const escapeHtml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const sanitizeText = (value, maxLength, { multiline = false } = {}) => {
    const source = typeof value === 'string' || typeof value === 'number'
        ? String(value)
        : '';
    // Strip bidirectional override/isolate characters so user-controlled text
    // cannot visually reorder labels in the Telegram notification.
    const withoutBidiControls = source.replace(/[\u202a-\u202e\u2066-\u2069]/g, '');
    const withoutControls = [...withoutBidiControls].map((character) => {
        const code = character.charCodeAt(0);
        const isControl = code <= 31 || code === 127;
        if (!isControl) return character;
        if (multiline && (character === '\n' || character === '\r' || character === '\t')) {
            return character;
        }
        return multiline ? '' : ' ';
    }).join('');
    const normalized = multiline
        ? withoutControls.replace(/\r\n?/g, '\n').trim()
        : withoutControls.replace(/\s+/g, ' ').trim();
    return normalized.slice(0, maxLength);
};

const sanitizePhone = (value) => {
    const raw = sanitizeText(value, 40);
    const digits = raw.replace(/\D/g, '').slice(0, 20);
    return `${raw.startsWith('+') ? '+' : ''}${digits}`;
};

const sanitizeLanguages = (value) => {
    const candidates = Array.isArray(value)
        ? value
        : sanitizeText(value, 64).split(/[\s,]+/);
    return [...new Set(candidates
        .map((item) => sanitizeText(item, 8).toLowerCase())
        .filter((item) => ALLOWED_LANGUAGES.has(item)))];
};

const errorResponse = (res, status, code, error) =>
    res.status(status).json({ ok: false, code, error });

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return errorResponse(res, 405, 'METHOD_NOT_ALLOWED', 'Method not allowed');
    }

    const contentLength = Number(req.headers?.['content-length'] || 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_LENGTH) {
        return errorResponse(res, 413, 'PAYLOAD_TOO_LARGE', 'Payload too large');
    }

    let body = req.body;
    if (typeof body === 'string') {
        if (body.length > MAX_BODY_LENGTH) {
            return errorResponse(res, 413, 'PAYLOAD_TOO_LARGE', 'Payload too large');
        }
        try {
            body = JSON.parse(body);
        } catch {
            return errorResponse(res, 400, 'INVALID_JSON', 'Invalid request body');
        }
    }
    body = body && typeof body === 'object' && !Array.isArray(body) ? body : {};

    // A hidden field in the public form absorbs unsophisticated bots without
    // revealing that their submission was discarded.
    if (sanitizeText(body.website, 120)) {
        return res.status(200).json({ ok: true });
    }

    let serializedLength = 0;
    try {
        serializedLength = JSON.stringify(body).length;
    } catch {
        return errorResponse(res, 400, 'INVALID_INPUT', 'Invalid request body');
    }
    if (serializedLength > MAX_BODY_LENGTH) {
        return errorResponse(res, 413, 'PAYLOAD_TOO_LARGE', 'Payload too large');
    }

    const source = sanitizeText(body.source || 'website', 64);
    const isContactForm = source === 'contact_form';
    const phone = sanitizePhone(body.phone);
    const language = sanitizeText(body.language, 8).toLowerCase();
    const intent = sanitizeText(body.intent, 40);
    const name = sanitizeText(body.name, 100);
    const company = sanitizeText(body.company, 120);
    const email = sanitizeText(body.email, 254).toLowerCase();
    const monthlyCallVolume = sanitizeText(body.monthlyCallVolume, 16);
    const languages = sanitizeLanguages(body.languages);
    const message = sanitizeText(body.message, 1500, { multiline: true });

    if (phone.replace(/\D/g, '').length < 7) {
        return errorResponse(res, 400, 'INVALID_INPUT', 'Valid phone required');
    }

    if (isContactForm) {
        if (!name || !company || !EMAIL_PATTERN.test(email)) {
            return errorResponse(res, 400, 'INVALID_INPUT', 'Required contact details are invalid');
        }
        const volume = Number(monthlyCallVolume);
        if (!/^\d{1,10}$/.test(monthlyCallVolume)
            || !Number.isSafeInteger(volume)
            || volume < 1
            || volume > 1_000_000_000
            || languages.length === 0) {
            return errorResponse(res, 400, 'INVALID_INPUT', 'Volume and languages are required');
        }
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
        return errorResponse(res, 503, 'NOT_CONFIGURED', 'Lead destination is not configured');
    }

    const lines = [
        isContactForm
            ? '🔔 <b>New demo/contact request</b>'
            : '🔔 <b>Новый лид!</b> / New callback lead',
        '',
    ];

    if (isContactForm) {
        lines.push(
            `👤 <b>Name:</b> ${escapeHtml(name)}`,
            `🏢 <b>Company:</b> ${escapeHtml(company)}`,
            `✉️ <b>Email:</b> ${escapeHtml(email)}`,
        );
    }

    lines.push(`📞 <b>Phone:</b> ${escapeHtml(phone)}`);

    if (isContactForm) {
        lines.push(
            `📊 <b>Monthly calls:</b> ${escapeHtml(monthlyCallVolume)}`,
            `🌐 <b>Languages:</b> ${escapeHtml(languages.join(', ').toUpperCase())}`,
        );
        if (intent) lines.push(`🧭 <b>Intent:</b> ${escapeHtml(intent)}`);
        if (message) lines.push(`💬 <b>Message:</b>\n${escapeHtml(message)}`);
    } else if (language) {
        lines.push(`🌐 <b>Language:</b> ${escapeHtml(language)}`);
    }

    lines.push(
        `📍 <b>Source:</b> ${escapeHtml(source)}`,
        `🕒 <b>Received:</b> ${escapeHtml(new Date().toISOString())}`,
    );

    try {
        const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: lines.join('\n'),
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            }),
        });

        if (!telegramResponse.ok) {
            const detail = await telegramResponse.text().catch(() => '');
            console.error('[lead] Telegram send failed:', telegramResponse.status, detail);
            return errorResponse(res, 502, 'DELIVERY_FAILED', 'Notification failed');
        }

        return res.status(200).json({ ok: true });
    } catch (error) {
        console.error('[lead] Telegram request error:', error?.message || error);
        return errorResponse(res, 502, 'DELIVERY_FAILED', 'Notification failed');
    }
}
