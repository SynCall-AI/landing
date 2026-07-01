// Vercel serverless function: receives a lead from the hero call widget and
// pushes a notification to the Telegram group.
//
// The bot token lives ONLY here (server-side). It is never shipped to the
// browser. Configure these in Vercel → Project → Settings → Environment
// Variables (and in a local .env for `vercel dev`):
//   TELEGRAM_BOT_TOKEN   - bot token from @BotFather
//   TELEGRAM_CHAT_ID     - target group id (e.g. -100XXXXXXXXXX)

const escapeHtml = (s) =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ ok: false, error: 'Method not allowed' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
        return res.status(500).json({ ok: false, error: 'Telegram is not configured' });
    }

    // Body is auto-parsed for application/json, but guard against a raw string.
    let body = req.body;
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch { body = {}; }
    }
    body = body || {};

    const rawPhone = (body.phone || '').toString().trim();
    const phone = rawPhone.replace(/[^\d+]/g, '');
    if (phone.replace(/\D/g, '').length < 7) {
        return res.status(400).json({ ok: false, error: 'Valid phone required' });
    }

    const language = (body.language || '').toString().slice(0, 8);
    const source = (body.source || 'website').toString().slice(0, 64);
    const ts = (body.ts || new Date().toISOString()).toString().slice(0, 40);

    const text =
        '🔔 <b>Новый лид!</b> / New lead received\n\n' +
        `📞 <b>${escapeHtml(phone)}</b>\n` +
        (language ? `🌐 ${escapeHtml(language)}\n` : '') +
        `📍 ${escapeHtml(source)}\n` +
        `🕒 ${escapeHtml(ts)}`;

    try {
        const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text,
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            }),
        });

        if (!tg.ok) {
            // Log the detail to server-side logs only (Vercel) — never return it
            // to the browser, so no internal/Telegram info can leak to the client.
            const detail = await tg.text().catch(() => '');
            console.error('[lead] Telegram send failed:', tg.status, detail);
            return res.status(502).json({ ok: false, error: 'Notification failed' });
        }
        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('[lead] Telegram request error:', err?.message || err);
        return res.status(502).json({ ok: false, error: 'Notification failed' });
    }
}
