import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { transform } from 'esbuild';

const source = await readFile(new URL('../src/lib/telegramLogin.js', import.meta.url), 'utf8');
const load = async (env) => {
    const { code } = await transform(source, { format: 'esm', define: { 'import.meta.env': JSON.stringify(env) } });
    return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
};

test('Telegram stays off without explicit opt-in, including an existing client ID', async () => {
    for (const env of [{}, { VITE_TELEGRAM_CLIENT_ID: '12345' }, { VITE_TELEGRAM_CLIENT_ID: '12345', VITE_DEMO_TELEGRAM_VERIFICATION: 'false' }, { VITE_DEMO_TELEGRAM_VERIFICATION: 'true' }]) {
        const login = await load(env);
        assert.equal(login.TELEGRAM_VERIFICATION_ENABLED, false);
        // No window/document needed: a disabled flow cannot load SDKs or popups.
        await login.preloadTelegramLogin();
        await assert.rejects(login.loginWithTelegramPhone('ru'), { code: 'SDK_UNAVAILABLE' });
    }
});

test('future Telegram verification requires both the explicit flag and client ID', async () => {
    const login = await load({ VITE_TELEGRAM_CLIENT_ID: '12345', VITE_DEMO_TELEGRAM_VERIFICATION: 'true' });
    assert.equal(login.TELEGRAM_VERIFICATION_ENABLED, true);
});
