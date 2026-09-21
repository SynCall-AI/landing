import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { transform } from 'esbuild';

const source = await readFile(new URL('../src/lib/landingDemo.js', import.meta.url), 'utf8');
const configuredApi = 'https://api.example.test';

for (const dev of [true, false]) {
    test(`${dev ? 'development' : 'production'} demo routes preserve Studio API and session authentication`, async (t) => {
        const { code } = await transform(source, {
            format: 'esm',
            define: { 'import.meta.env': JSON.stringify({ DEV: dev, VITE_API_BASE_URL: configuredApi }) },
        });
        const api = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
        const requests = [];
        t.mock.method(globalThis, 'fetch', async (url, options) => {
            requests.push({ url, options });
            return new Response('{}', { status: 200, headers: { 'Content-Type': 'application/json' } });
        });
        const previousWindow = globalThis.window;
        globalThis.window = { location: { origin: 'http://localhost:5175' } };
        try {
            assert.equal(api.API_BASE, configuredApi, 'Studio keeps using the configured API directly');
            await api.fetchLandingDemos();
            await api.createLandingDemoSession({ demo_slug: 'poytakht-parking', language: 'ru' });
            await api.getLandingDemoSession('test/session', 'test-token');
            await api.cancelLandingDemoSession('test/session', 'test-token');
            const base = dev ? '' : configuredApi;
            assert.deepEqual(requests.map(request => request.url), [
                `${base}/api/v2/public/landing-demos`,
                `${base}/api/v2/public/landing-demo-sessions`,
                `${base}/api/v2/public/landing-demo-sessions/test%2Fsession`,
                `${base}/api/v2/public/landing-demo-sessions/test%2Fsession`,
            ]);
            assert.ok(requests.every(request => request.options.credentials === 'include'));
            assert.equal(requests[1].options.method, 'POST');
            assert.equal(requests[2].options.headers.Authorization, 'Bearer test-token');
            assert.equal(requests[3].options.method, 'DELETE');
            assert.equal(requests[3].options.headers.Authorization, 'Bearer test-token');
            assert.equal(api.buildLandingDemoWsUrl('test/session'), `${dev ? 'ws://localhost:5175' : 'wss://api.example.test'}/api/v2/public/landing-demo-sessions/test%2Fsession/ws`);
        } finally {
            if (previousWindow === undefined) delete globalThis.window;
            else globalThis.window = previousWindow;
        }
    });
}
