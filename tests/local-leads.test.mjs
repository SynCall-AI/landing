import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { leadMiddleware } from '../scripts/vite-leads.mjs';

const request = (method, body, url = '/api/lead') => new Promise((resolve, reject) => {
    const req = Readable.from(body === undefined ? [] : [Buffer.from(body)]);
    req.method = method;
    req.url = url;
    req.headers = {};
    const res = {
        statusCode: 200, headers: {},
        setHeader(key, value) { this.headers[key.toLowerCase()] = value; },
        end(value) { resolve({ status: this.statusCode, headers: this.headers, body: JSON.parse(value) }); },
    };
    try { leadMiddleware(req, res, () => resolve({ next: true })); }
    catch (error) { reject(error); }
});

test('local Vite endpoint serves the real lead handler and preserves qualification', async (t) => {
    const originalFetch = globalThis.fetch;
    const old = Object.fromEntries(['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID', 'LEADS_API_URL'].map((key) => [key, process.env[key]]));
    process.env.TELEGRAM_BOT_TOKEN = 'test-only';
    process.env.TELEGRAM_CHAT_ID = 'test-only';
    delete process.env.LEADS_API_URL;
    const deliveries = [];
    globalThis.fetch = async (_url, options) => {
        deliveries.push(JSON.parse(options.body));
        return { ok: true };
    };
    t.after(() => {
        globalThis.fetch = originalFetch;
        for (const [key, value] of Object.entries(old)) {
            if (value === undefined) delete process.env[key]; else process.env[key] = value;
        }
    });
    const get = await request('GET');
    assert.equal(get.status, 405);
    assert.equal(get.headers.allow, 'POST');
    assert.equal((await request('POST', '{}')).status, 400);
    assert.equal((await request('POST', '{')).status, 400);
    assert.equal((await request('POST', 'x'.repeat(12001))).status, 413);
    assert.equal(deliveries.length, 0, 'Read-only and invalid requests never notify');
    assert.deepEqual(await request('GET', undefined, '/other'), { next: true });
    const result = await request('POST', JSON.stringify({ source: 'business_request', phone: '+998902415863', company: 'Test company', useCase: 'Support', monthlyVolume: '2500', volumeUnit: 'minutes' }));
    assert.equal(result.status, 200);
    assert.equal(result.body.ok, true);
    assert.match(deliveries[0].text, /Test company/);
    assert.match(deliveries[0].text, /Support/);
    assert.match(deliveries[0].text, /Monthly minutes:<\/b> 2500/);
});
