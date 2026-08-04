import assert from 'node:assert/strict';

import { ROUTE_SEO, SEO_LOCALES, getRouteSeo } from '../src/components/seo/seoData.js';
import { localizePath } from '../src/lib/i18n.js';

const origin = process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:4173';
let checked = 0;
const decodeHtml = (value) => String(value)
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");

for (const routePath of Object.keys(ROUTE_SEO)) {
    for (const locale of SEO_LOCALES) {
        const pathname = localizePath(routePath, locale);
        const response = await fetch(`${origin}${pathname}`);
        const html = await response.text();
        const seo = getRouteSeo(routePath, locale);

        assert.equal(response.status, 200, `${pathname}: expected HTTP 200`);
        assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`), `${pathname}: incorrect initial lang`);
        assert.ok(html.includes(`<link rel="canonical" href="${seo.canonical}"`), `${pathname}: incorrect initial canonical`);
        const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
        assert.equal(title, seo.title, `${pathname}: incorrect initial title`);
        checked += 1;
    }
}

for (const assetPath of ['/robots.txt', '/sitemap.xml']) {
    const response = await fetch(`${origin}${assetPath}`);
    assert.equal(response.status, 200, `${assetPath}: expected HTTP 200`);
}

console.log(`Preview returned valid localized HTML for ${checked} route variants; robots.txt and sitemap.xml returned 200.`);
