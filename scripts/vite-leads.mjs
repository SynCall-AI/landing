import { Buffer } from 'node:buffer';
import handler from '../api/lead.js';

// Vite does not serve Vercel functions. Run the same handler in development so
// local lead submissions keep all qualification fields and use the existing
// server-only delivery configuration. No mock success or production proxy.
export function leadMiddleware(req, res, next) {
    if (req.url?.split('?')[0] !== '/api/lead') return next();
    const reply = (code, body) => {
        res.statusCode = code;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(body));
    };
    const response = {
        setHeader: (name, value) => res.setHeader(name, value),
        status(code) { res.statusCode = code; return this; },
        json(body) { reply(res.statusCode, body); return this; },
    };
    if (req.method !== 'POST') {
        return handler(req, response).catch(() => reply(500, { ok: false, code: 'DELIVERY_FAILED', error: 'Lead delivery failed' }));
    }
    let size = 0;
    const chunks = [];
    let oversized = false;
    req.on('data', (chunk) => {
        size += Buffer.byteLength(chunk);
        if (size > 12_000) {
            if (!oversized) reply(413, { ok: false, code: 'PAYLOAD_TOO_LARGE', error: 'Payload too large' });
            oversized = true;
            chunks.length = 0;
            return;
        }
        chunks.push(Buffer.from(chunk));
    });
    req.on('end', async () => {
        if (oversized) return;
        req.body = Buffer.concat(chunks).toString('utf8');
        try { await handler(req, response); }
        catch { reply(500, { ok: false, code: 'DELIVERY_FAILED', error: 'Lead delivery failed' }); }
    });
    req.on('error', () => {
        if (!res.writableEnded && !res.destroyed) reply(400, { ok: false, code: 'INVALID_INPUT', error: 'Invalid request body' });
    });
}

export function localLeadsPlugin() {
    return {
        name: 'syncall-local-leads',
        apply: 'serve',
        configureServer(server) { server.middlewares.use(leadMiddleware); },
    };
}
