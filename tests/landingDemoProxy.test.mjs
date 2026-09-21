import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createServer } from 'vite';
import configure from '../vite.config.js';

test('local demo proxy preserves session credentials and sends the allowed origin over HTTP and WebSocket', async (t) => {
    const root = await mkdtemp(path.join(tmpdir(), 'syncall-demo-proxy-'));
    t.after(() => rm(root, { recursive: true, force: true }));
    const upstream = http.createServer((req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(req.headers));
    });
    await new Promise(resolve => upstream.listen(0, '127.0.0.1', resolve));
    t.after(() => new Promise(resolve => { upstream.closeAllConnections(); upstream.close(resolve); }));
    const target = `http://127.0.0.1:${upstream.address().port}`;
    const origin = 'https://landing.example.test';
    const oldCwd = process.cwd();
    const keys = ['VITE_API_BASE_URL', 'LANDING_DEMO_DEV_ORIGIN'];
    const oldEnv = keys.map(key => process.env[key]);
    let config;
    try {
        // Use the real Vite configuration, without loading local credentials.
        process.chdir(root);
        process.env.VITE_API_BASE_URL = target;
        process.env.LANDING_DEMO_DEV_ORIGIN = origin;
        config = configure({ mode: 'test' });
    } finally {
        process.chdir(oldCwd);
        keys.forEach((key, index) => {
            if (oldEnv[index] === undefined) delete process.env[key];
            else process.env[key] = oldEnv[index];
        });
    }
    const vite = await createServer({
        ...config, root, configFile: false, envFile: false, plugins: [],
        server: { ...config.server, host: '127.0.0.1', port: 0, hmr: false, watch: null },
        optimizeDeps: { noDiscovery: true, include: [] },
    });
    t.after(() => vite.close());
    await vite.listen();
    const local = `http://127.0.0.1:${vite.httpServer.address().port}`;
    const response = await fetch(`${local}/api/v2/public/landing-demo-sessions/test`, {
        headers: { Origin: local, Authorization: 'Bearer test-session-token' },
    });
    const headers = await response.json();
    assert.equal(headers.origin, origin);
    assert.equal(headers.authorization, 'Bearer test-session-token');

    let wsHeaders;
    upstream.once('upgrade', (req, socket) => {
        wsHeaders = req.headers;
        socket.end('HTTP/1.1 403 Forbidden\r\nContent-Length: 0\r\nConnection: close\r\n\r\n');
    });
    await new Promise((resolve, reject) => {
        const req = http.get(`${local}/api/v2/public/landing-demo-sessions/test/ws`, {
            headers: { Origin: local, Connection: 'Upgrade', Upgrade: 'websocket',
                'Sec-WebSocket-Version': '13', 'Sec-WebSocket-Key': 'dGhlIHNhbXBsZSBub25jZQ==',
                'Sec-WebSocket-Protocol': 'syncall-auth, b64u.dGVzdA' },
        }, res => { res.resume(); res.on('end', resolve); });
        req.on('error', reject);
    });
    assert.equal(wsHeaders.origin, origin);
    assert.equal(wsHeaders['sec-websocket-protocol'], 'syncall-auth, b64u.dGVzdA');
});
