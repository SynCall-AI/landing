import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/lead.js';

const response = () => ({
    statusCode: 200,
    setHeader() {},
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
});
const contact = { source: 'contact_form', name: 'Test user', company: 'Test company', intent: 'trial', product: 'analytics' };

test('lead delivery supports either contact method and optional qualification fields', async (t) => {
    const oldToken = process.env.TELEGRAM_BOT_TOKEN;
    const oldChat = process.env.TELEGRAM_CHAT_ID;
    const originalFetch = globalThis.fetch;
    const oldLeadsUrl = process.env.LEADS_API_URL;
    const oldLeadsToken = process.env.LEADS_API_TOKEN;
    delete process.env.LEADS_API_URL;
    process.env.TELEGRAM_BOT_TOKEN = 'local-test';
    process.env.TELEGRAM_CHAT_ID = 'local-test';
    let deliveries = [];
    globalThis.fetch = async (_url, options) => {
        deliveries.push(JSON.parse(options.body));
        return { ok: true };
    };
    t.after(() => {
        globalThis.fetch = originalFetch;
        if (oldLeadsUrl === undefined) delete process.env.LEADS_API_URL; else process.env.LEADS_API_URL = oldLeadsUrl;
        if (oldLeadsToken === undefined) delete process.env.LEADS_API_TOKEN; else process.env.LEADS_API_TOKEN = oldLeadsToken;
        if (oldToken === undefined) delete process.env.TELEGRAM_BOT_TOKEN; else process.env.TELEGRAM_BOT_TOKEN = oldToken;
        if (oldChat === undefined) delete process.env.TELEGRAM_CHAT_ID; else process.env.TELEGRAM_CHAT_ID = oldChat;
    });

    await t.test('email-only pilot reaches delivery without phone, volume, or languages', async () => {
        const res = response();
        await handler({ method: 'POST', body: { ...contact, contactMethod: 'email', email: 'test@example.com' } }, res);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.ok, true);
        assert.match(deliveries.at(-1).text, /test@example.com/);
        assert.match(deliveries.at(-1).text, /analytics/);
        assert.match(deliveries.at(-1).text, /trial/);
        assert.doesNotMatch(deliveries.at(-1).text, /Monthly calls|Languages:|Phone:/);
    });
    await t.test('phone-only demo delivers and escapes user input', async () => {
        const res = response();
        await handler({ method: 'POST', body: { ...contact, name: '<b>Test</b>', intent: 'demo', contactMethod: 'phone', phone: '+998 90 123 45 67' } }, res);
        assert.equal(res.statusCode, 200);
        assert.match(deliveries.at(-1).text, /\+998901234567/);
        assert.match(deliveries.at(-1).text, /&lt;b&gt;Test&lt;\/b&gt;/);
        assert.doesNotMatch(deliveries.at(-1).text, /Email:/);
    });
    await t.test('invalid required details and invalid optional volume never deliver', async () => {
        for (const patch of [
            { name: '' }, { company: '' }, { email: 'invalid' },
            { contactMethod: 'phone', phone: '12' }, { contactMethod: 'unknown' },
            { monthlyCallVolume: '-1' }, { monthlyCallVolume: '1.5' }, { monthlyCallVolume: '1000000001' },
            { product: 'unknown' },
        ]) {
            const count = deliveries.length;
            const res = response();
            await handler({ method: 'POST', body: { ...contact, contactMethod: 'email', email: 'test@example.com', ...patch } }, res);
            assert.equal(res.statusCode, 400, JSON.stringify(patch));
            assert.equal(deliveries.length, count);
        }
    });
    await t.test('provided qualification details are retained', async () => {
        const res = response();
        await handler({ method: 'POST', body: { ...contact, contactMethod: 'email', email: 'test@example.com', monthlyCallVolume: '10000', languages: ['uz', 'ru'], message: 'Review call quality' } }, res);
        assert.equal(res.statusCode, 200);
        assert.match(deliveries.at(-1).text, /10000/);
        assert.match(deliveries.at(-1).text, /UZ, RU/);
        assert.match(deliveries.at(-1).text, /Review call quality/);
    });
    await t.test('existing live-demo callback notifications still work', async () => {
        const res = response();
        await handler({ method: 'POST', body: { source: 'hero_call_widget', phone: '+998901234567', event: 'call_ended', durationSec: 61 } }, res);
        assert.equal(res.statusCode, 200);
        assert.match(deliveries.at(-1).text, /1:01/);
        const invalid = response();
        await handler({ method: 'POST', body: { source: 'hero_call_widget', phone: '' } }, invalid);
        assert.equal(invalid.statusCode, 400);
    });
    await t.test('honeypot submissions do not send notifications', async () => {
        const count = deliveries.length;
        const res = response();
        await handler({ method: 'POST', body: { ...contact, website: 'bot.example' } }, res);
        assert.equal(res.statusCode, 200);
        assert.equal(deliveries.length, count);
    });
    await t.test('demo capture and qualified leads retain scenario, business task, and volume unit', async () => {
        const demo = response();
        await handler({ method: 'POST', body: { source: 'landing_demo', phone: '+998901234567', scenario: 'support', demoMode: 'recording' } }, demo);
        assert.equal(demo.statusCode, 200);
        assert.match(deliveries.at(-1).text, /support/);
        assert.match(deliveries.at(-1).text, /recording/);
        const res = response();
        await handler({ method: 'POST', body: { source: 'business_request', phone: '+998901234567', company: 'Test company', useCase: '<support>', monthlyVolume: '5000', volumeUnit: 'minutes' } }, res);
        assert.equal(res.statusCode, 200);
        assert.match(deliveries.at(-1).text, /Test company/);
        assert.match(deliveries.at(-1).text, /&lt;support&gt;/);
        assert.match(deliveries.at(-1).text, /Monthly minutes:<\/b> 5000/);
        for (const patch of [{ company: '' }, { useCase: '' }, { monthlyVolume: '' }, { monthlyVolume: '-2' }, { volumeUnit: 'seconds' }, { phone: '+14155552671' }]) {
            const failed = response();
            const count = deliveries.length;
            await handler({ method: 'POST', body: { source: 'business_request', phone: '+998901234567', company: 'Test company', useCase: 'Support', monthlyVolume: '100', volumeUnit: 'calls', ...patch } }, failed);
            assert.equal(failed.statusCode, 400);
            assert.equal(deliveries.length, count);
        }
    });
    await t.test('configured lead storage must confirm success; verification status is never trusted from the browser', async () => {
        const currentFetch = globalThis.fetch;
        process.env.LEADS_API_URL = 'https://leads.example.test/leads';
        process.env.LEADS_API_TOKEN = 'test-service-token';
        let saved;
        globalThis.fetch = async (url, options) => {
            if (url === process.env.LEADS_API_URL) {
                saved = JSON.parse(options.body);
                assert.equal(options.headers.Authorization, 'Bearer test-service-token');
                return { ok: true, json: async () => ({ ok: true }) };
            }
            return { ok: false, status: 503 };
        };
        const originalError = console.error;
        console.error = () => {};
        try {
            const body = { source: 'business_request', phone: '90 123 45 67', company: 'Test company', useCase: 'Support', monthlyVolume: '700', volumeUnit: 'calls', phoneVerified: true };
            const res = response();
            await handler({ method: 'POST', body }, res);
            assert.equal(res.statusCode, 200, 'Successful lead storage survives optional notification failure');
            assert.equal(saved.phone, '+998901234567');
            assert.equal(saved.monthlyVolume, 700);
            assert.equal(saved.phoneVerified, false);
            globalThis.fetch = async () => ({ ok: true, json: async () => ({ ok: false }) });
            const rejected = response();
            await handler({ method: 'POST', body }, rejected);
            assert.equal(rejected.statusCode, 502);
        } finally {
            delete process.env.LEADS_API_URL;
            delete process.env.LEADS_API_TOKEN;
            globalThis.fetch = currentFetch;
            console.error = originalError;
        }
    });
    await t.test('missing configuration and delivery failures do not report success', async () => {
        delete process.env.TELEGRAM_BOT_TOKEN;
        const unavailable = response();
        await handler({ method: 'POST', body: { ...contact, contactMethod: 'email', email: 'test@example.com' } }, unavailable);
        assert.equal(unavailable.statusCode, 503);
        assert.equal(unavailable.body.code, 'NOT_CONFIGURED');
        process.env.TELEGRAM_BOT_TOKEN = 'local-test';
        globalThis.fetch = async () => { throw new Error('test delivery unavailable'); };
        const originalError = console.error;
        console.error = () => {};
        try {
            const failed = response();
            await handler({ method: 'POST', body: { ...contact, contactMethod: 'email', email: 'test@example.com' } }, failed);
            assert.equal(failed.statusCode, 502);
            assert.equal(failed.body.ok, false);
        } finally { console.error = originalError; }
    });
});
