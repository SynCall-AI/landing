import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { build } from 'esbuild';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { localizePath } from '../src/lib/i18n.js';
import { ROUTE_SEO } from '../src/components/seo/seoData.js';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const temporary = await fs.mkdtemp(path.join(root, 'node_modules/.syncall-test-'));
try {
    await build({
        stdin: { contents: `
            export { LanguageProvider } from './src/context/LanguageContext.jsx';
            export { default as Home } from './src/pages/Home.jsx';
            export { default as Analytics } from './src/pages/Analytics.jsx';
            export { default as Chatbots } from './src/pages/Chatbots.jsx';
            export { default as MarketingPage } from './src/pages/MarketingPage.jsx';
        `, resolveDir: root },
        outfile: path.join(temporary, 'pages.mjs'), bundle: true,
        platform: 'node', format: 'esm', packages: 'external', jsx: 'automatic',
        loader: { '.css': 'empty' }, define: { 'import.meta.env': '{}' },
    });
    const { LanguageProvider, Home, Analytics, Chatbots, MarketingPage } = await import(pathToFileURL(path.join(temporary, 'pages.mjs')).href);
    const render = (Component, url, props = {}) => renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [url] }, createElement(LanguageProvider, null, createElement(Component, props))));
    const assertLocalAnchors = (html) => {
        for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) {
            assert.ok(html.includes(`id="${anchor}"`), `Missing section for #${anchor}`);
        }
    };

    await test('business pages provide working local navigation and translated contact flows', async (t) => {
        for (const locale of ['en', 'ru', 'uz']) {
            await t.test(`${locale}: homepage exposes the live conversation and recordings before contact`, () => {
                const html = render(Home, localizePath('/', locale));
                assert.equal((html.match(/<h1\b/g) || []).length, 1);
                assert.ok(html.indexOf('id="demo"') < html.indexOf('id="contact"'));
                assert.match(html, /class="vcw[" ]/);
                assert.ok(html.indexOf('id="live-demo"') < html.indexOf('id="capabilities"'));
                assert.match(html, /scenario-support/);
                assert.match(html, /scenario-collection/);
                assert.match(html, /scenario-sales/);
                assert.doesNotMatch(html, /live-demo-details/);
                assert.ok(html.includes(`href="${localizePath('/cabinet/stt', locale)}"`));
                assert.ok(html.includes(`href="${localizePath('/cabinet/tts', locale)}"`));
                assert.equal((html.match(/ required=""/g) || []).length, 4, 'Four business qualification fields render while the public catalog loads');
                assert.match(html, /name="monthlyVolume"/);
                assert.match(html, /value="minutes"/);
                assert.match(html, /Poytaxt Parking/);
                assert.match(html, /Qwatt/);
                assert.match(html, /\+42%/);
                assert.doesNotMatch(html, /<blockquote|PLACEHOLDER|\{\{CLIENT|−70%|1000\+/);
                assertLocalAnchors(html);
            });
            await t.test(`${locale}: pilot keeps the selected product and an explicit trial intent`, () => {
                const html = render(Home, `${localizePath('/', locale)}?intent=trial&product=analytics#contact`);
                assert.match(html, /name="product" value="analytics"/);
                assert.match(html, /name="intent" value="trial"/);
                assertLocalAnchors(html);
            });
            await t.test(`${locale}: example and capability buttons lead to existing sections`, () => {
                const analytics = render(Analytics, localizePath('/analytics', locale));
                const chatbots = render(Chatbots, localizePath('/chatbots', locale));
                assertLocalAnchors(analytics);
                assertLocalAnchors(chatbots);
                assert.match(analytics, /intent=trial&amp;product=analytics#contact/);
                assert.match(chatbots, /intent=trial&amp;product=chatbots#contact/);
                assert.doesNotMatch(analytics, /−65%|−38%|×20|3–5%/);
            });
            await t.test(`${locale}: use cases link to every available scenario`, () => {
                const html = render(MarketingPage, localizePath('/use-cases', locale), { path: '/use-cases', locale });
                for (const scenario of ['banking', 'debt-collection', 'appointment-reminders', 'surveys', 'lead-qualification']) {
                    assert.ok(html.includes(`href="${localizePath(`/use-cases/${scenario}`, locale)}"`));
                }
            });
        }
    });
    await test('legacy speech URLs redirect to existing studio tools in every locale', async () => {
        const config = JSON.parse(await fs.readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
        for (const locale of ['en', 'ru', 'uz']) {
            for (const tool of ['stt', 'tts']) {
                const redirect = config.redirects.find((item) => item.source === localizePath(`/${tool}`, locale));
                assert.equal(redirect?.destination, localizePath(`/cabinet/${tool}`, locale));
                assert.ok(ROUTE_SEO[`/cabinet/${tool}`]);
                assert.equal(ROUTE_SEO[`/${tool}`].noindex, true);
            }
        }
    });
} finally {
    await fs.rm(temporary, { recursive: true, force: true });
}
