/* global process */

// Vercel serverless function: receives either the compact hero callback request
// or the full contact/demo form, then sends a sanitized notification to the
// configured Telegram chat.

const ALLOWED_LANGUAGES = new Set(['uz', 'ru', 'en']);
import { normalizeUzPhone, validateBusinessLead, validateContactLead } from '../src/lib/leadValidation.js';
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
    const isBusinessRequest = source === 'business_request';
    const isDemo = source === 'landing_demo';
    const phone = sanitizePhone(body.phone);
    const language = sanitizeText(body.language, 8).toLowerCase();
    const intent = sanitizeText(body.intent, 40);
    const name = sanitizeText(body.name, 100);
    const company = sanitizeText(body.company, 120);
    const email = sanitizeText(body.email, 254).toLowerCase();
    const monthlyCallVolume = sanitizeText(body.monthlyCallVolume, 16);
    const languages = sanitizeLanguages(body.languages);
    const message = sanitizeText(body.message, 1500, { multiline: true });
    const useCase = sanitizeText(body.useCase, 1000, { multiline: true });
    const monthlyVolume = sanitizeText(body.monthlyVolume, 16);
    const volumeUnit = sanitizeText(body.volumeUnit, 16);
    const scenario = sanitizeText(body.scenario, 64);
    const demoMode = sanitizeText(body.demoMode, 16);

    if (!isContactForm && phone.replace(/\D/g, '').length < 7) {
        return errorResponse(res, 400, 'INVALID_INPUT', 'Valid phone required');
    }

    const contactMethod = sanitizeText(body.contactMethod, 16) || (phone ? 'phone' : 'email');
    const product = sanitizeText(body.product, 32);
    if (isContactForm) {
        const errors = validateContactLead({ name, company, email, phone, contactMethod, product, monthlyCallVolume });
        if (Object.keys(errors).length) {
            return errorResponse(res, 400, 'INVALID_INPUT', 'Contact details are invalid');
        }
    }
    if (isBusinessRequest && Object.keys(validateBusinessLead({ phone, company, useCase, monthlyVolume, volumeUnit })).length) {
        return errorResponse(res, 400, 'INVALID_INPUT', 'Business details are invalid');
    }
    if (isDemo && (!normalizeUzPhone(phone) || !['support', 'collection', 'sales'].includes(scenario) || !['live', 'recording'].includes(demoMode))) {
        return errorResponse(res, 400, 'INVALID_INPUT', 'Demo details are invalid');
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    // Optional server-side lead receiver. Set the URL only once the receiving
    // service's schema is confirmed; no CRM credentials reach the browser.
    const leadsUrl = process.env.LEADS_API_URL;
    if (!leadsUrl && (!token || !chatId)) {
        return errorResponse(res, 503, 'NOT_CONFIGURED', 'Lead destination is not configured');
    }

    const isCallEnded = body.event === 'call_ended';
    const duration = Math.max(0, Math.min(3600, Math.round(Number(body.durationSec) || 0)));
    const durationLabel = `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}`;
    let storedInLeads = false;
    if (leadsUrl) {
        try {
            const leadResponse = await fetch(leadsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(process.env.LEADS_API_TOKEN ? { Authorization: `Bearer ${process.env.LEADS_API_TOKEN}` } : {}),
                },
                body: JSON.stringify({
                    source, phone: isDemo || isBusinessRequest ? normalizeUzPhone(phone) : phone,
                    name, company, email, language, intent, product, contactMethod,
                    useCase, monthlyVolume: monthlyVolume ? Number(monthlyVolume) : null,
                    volumeUnit, monthlyCallVolume, languages, message, scenario, demoMode,
                    event: sanitizeText(body.event, 40), durationSec: isCallEnded ? duration : null,
                    phoneVerified: false, receivedAt: new Date().toISOString(),
                }),
                signal: AbortSignal.timeout(8000),
            });
            const acknowledgement = await leadResponse.json().catch(() => ({}));
            if (!leadResponse.ok || acknowledgement.ok === false) {
                return errorResponse(res, 502, 'DELIVERY_FAILED', 'Lead storage failed');
            }
            storedInLeads = true;
        } catch {
            return errorResponse(res, 502, 'DELIVERY_FAILED', 'Lead storage unavailable');
        }
    }
    if (!token || !chatId) return res.status(200).json({ ok: true });

    const lines = [
        isCallEnded
            ? '✅ <b>Демо-звонок завершён</b> / Demo call ended'
            : isContactForm || isBusinessRequest
                ? '🔔 <b>New demo/contact request</b>'
                : '🔔 <b>Новый лид!</b> / New callback lead',
        '',
    ];

    if (isContactForm) {
        lines.push(
            `👤 <b>Name:</b> ${escapeHtml(name)}`,
            `🏢 <b>Company:</b> ${escapeHtml(company)}`,

        );
    }
    if (isBusinessRequest) {
        lines.push(`🏢 <b>Company:</b> ${escapeHtml(company)}`);
        lines.push(`🎯 <b>Use case:</b> ${escapeHtml(useCase)}`);
        lines.push(`📊 <b>Monthly ${volumeUnit}:</b> ${escapeHtml(monthlyVolume)}`);
    }
    if (isDemo) {
        lines.push(`🎯 <b>Scenario:</b> ${escapeHtml(scenario)}`);
        lines.push(`▶️ <b>Demo:</b> ${escapeHtml(demoMode)}`);
    }

    if (email && (!isContactForm || contactMethod === 'email')) lines.push(`✉️ <b>Email:</b> ${escapeHtml(email)}`);
    if (phone && (!isContactForm || contactMethod === 'phone')) lines.push(`📞 <b>Phone:</b> ${escapeHtml(phone)}`);

    if (isCallEnded) {
        lines.push(`⏱ <b>Duration:</b> ${escapeHtml(durationLabel)}`);
    }

    if (isContactForm) {
        if (product) lines.push(`🧩 <b>Product:</b> ${escapeHtml(product)}`);
        if (monthlyCallVolume) lines.push(`📊 <b>Monthly calls:</b> ${escapeHtml(monthlyCallVolume)}`);
        if (languages.length) lines.push(`🌐 <b>Languages:</b> ${escapeHtml(languages.join(', ').toUpperCase())}`);
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
            signal: AbortSignal.timeout(8000),
        });

        if (!telegramResponse.ok) {
            console.error('[lead] Telegram send failed:', telegramResponse.status);
            if (storedInLeads) return res.status(200).json({ ok: true });
            return errorResponse(res, 502, 'DELIVERY_FAILED', 'Notification failed');
        }

        return res.status(200).json({ ok: true });
    } catch {
        console.error('[lead] Telegram request failed');
        if (storedInLeads) return res.status(200).json({ ok: true });
        return errorResponse(res, 502, 'DELIVERY_FAILED', 'Notification failed');
    }
}
