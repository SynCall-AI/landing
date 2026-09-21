import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { marketingContent } from '../src/content/marketingContent.js';
import {
    ROUTE_SEO,
    SEO_LOCALES,
    getRouteSeo,
    localizedUrl,
} from '../src/components/seo/seoData.js';
import { localizePath } from '../src/lib/i18n.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFile(path.join(root, relativePath), 'utf8');

const decodeHtml = (value) => String(value)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");

const canonicalRoutes = Object.entries(ROUTE_SEO)
    .filter(([, route]) => !route.aliasFor && !route.canonicalPath && !route.noindex)
    .map(([routePath]) => routePath);
const allRoutePaths = Object.keys(ROUTE_SEO);

assert.equal(
    localizePath('/ru/features?intent=demo#contact', 'uz'),
    '/uz/features?intent=demo#contact',
    'Locale switching must preserve path, query, and fragment',
);

const outputPathFor = (routePath, locale) => {
    const localized = localizePath(routePath, locale).replace(/^\//, '');
    return localized ? `dist/${localized}.html` : 'dist/index.html';
};

const metadataByLocale = Object.fromEntries(SEO_LOCALES.map((locale) => [locale, {
    titles: new Set(),
    descriptions: new Set(),
}]));

for (const routePath of allRoutePaths) {
    for (const locale of SEO_LOCALES) {
        const html = await read(outputPathFor(routePath, locale));
        const seo = getRouteSeo(routePath, locale);
        const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
        const description = decodeHtml(html.match(/<meta name="description" content="([^"]*)"/i)?.[1] || '');
        const canonical = decodeHtml(html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] || '');
        const robots = decodeHtml(html.match(/<meta name="robots" content="([^"]*)"/i)?.[1] || '');
        const lang = html.match(/<html[^>]*\blang="([^"]+)"/i)?.[1];
        const fallback = html.match(/<div class="ssr-fallback"[\s\S]*?<template id="site-static-fallback-end"><\/template>/i)?.[0] || '';

        assert.equal(lang, locale, `${routePath} ${locale}: incorrect html lang`);
        assert.equal(title, seo.title, `${routePath} ${locale}: incorrect title`);
        assert.ok([...title].length <= 60, `${routePath} ${locale}: title exceeds 60 characters`);
        assert.equal(description, seo.description, `${routePath} ${locale}: incorrect description`);
        assert.equal(canonical, seo.canonical, `${routePath} ${locale}: incorrect canonical`);
        assert.equal(robots.startsWith('noindex'), seo.noindex, `${routePath} ${locale}: incorrect robots directive`);
        assert.equal((fallback.match(/<h1\b/gi) || []).length, 1, `${routePath} ${locale}: static fallback must have one h1`);

        for (const alternateLocale of [...SEO_LOCALES, 'x-default']) {
            const expectedHref = alternateLocale === 'x-default'
                ? seo.xDefault
                : seo.alternates[alternateLocale];
            assert.ok(
                html.includes(`<link rel="alternate" hreflang="${alternateLocale}" href="${expectedHref}"`),
                `${routePath} ${locale}: incorrect ${alternateLocale} hreflang`,
            );
        }

        for (const schemaMatch of html.matchAll(/<script type="application\/ld\+json" data-seo-schema="([^"]+)">([\s\S]*?)<\/script>/g)) {
            assert.doesNotThrow(() => JSON.parse(schemaMatch[2]), `${routePath} ${locale}: invalid ${schemaMatch[1]} JSON-LD`);
        }

        if (!ROUTE_SEO[routePath].aliasFor) {
            assert.ok(!metadataByLocale[locale].titles.has(title), `${locale}: duplicate title ${title}`);
            assert.ok(!metadataByLocale[locale].descriptions.has(description), `${locale}: duplicate description`);
            metadataByLocale[locale].titles.add(title);
            metadataByLocale[locale].descriptions.add(description);
        }
    }
}

for (const locale of SEO_LOCALES) {
    const homeHtml = await read(outputPathFor('/', locale));
    const faqJson = homeHtml.match(/data-seo-schema="faq">([\s\S]*?)<\/script>/)?.[1];
    const faqSection = homeHtml.match(/<section aria-labelledby="static-faq-heading">([\s\S]*?)<\/section>/)?.[1] || '';
    const schema = JSON.parse(faqJson);
    const visibleQuestions = [...faqSection.matchAll(/<h3>([\s\S]*?)<\/h3>/g)].map((match) => decodeHtml(match[1]));
    const visibleAnswers = [...faqSection.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((match) => decodeHtml(match[1]));
    assert.ok(schema.mainEntity.length > 0, `${locale}: FAQ schema must contain the visible questions`);
    assert.deepEqual(schema.mainEntity.map((item) => item.name), visibleQuestions, `${locale}: FAQ questions differ from fallback`);
    assert.deepEqual(schema.mainEntity.map((item) => item.acceptedAnswer.text), visibleAnswers, `${locale}: FAQ answers differ from fallback`);
}

const marketingPaths = Object.keys(marketingContent.en);
for (const locale of SEO_LOCALES) {
    assert.deepEqual(Object.keys(marketingContent[locale]), marketingPaths, `${locale}: incomplete marketing route inventory`);
}
for (const marketingPath of marketingPaths) {
    assert.ok(ROUTE_SEO[`/${marketingPath}`], `Missing SEO record for /${marketingPath}`);
}

const sitemap = await read('public/sitemap.xml');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeHtml(match[1]));
const expectedUrls = canonicalRoutes.flatMap((routePath) => SEO_LOCALES.map((locale) => localizedUrl(routePath, locale)));
assert.equal(sitemapUrls.length, expectedUrls.length, 'Sitemap URL count is incorrect');
assert.deepEqual(new Set(sitemapUrls), new Set(expectedUrls), 'Sitemap URLs do not match canonical route inventory');

const robots = await read('public/robots.txt');
assert.match(robots, /User-agent:\s*\*/i, 'robots.txt is missing the default user agent');
assert.match(robots, /Allow:\s*\//i, 'robots.txt does not allow crawling');
assert.match(robots, /Sitemap:\s*https:\/\/www\.syncallai\.com\/sitemap\.xml/i, 'robots.txt is missing the sitemap URL');

const walk = async (directory) => {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    return (await Promise.all(entries.map(async (entry) => {
        const entryPath = path.join(directory, entry.name);
        return entry.isDirectory() ? walk(entryPath) : [entryPath];
    }))).flat();
};

const sourceFiles = (await walk(path.join(root, 'src'))).filter((filePath) => filePath.endsWith('.jsx'));
for (const filePath of sourceFiles) {
    const source = await fs.readFile(filePath, 'utf8');
    for (const image of source.matchAll(/<(?:img|LazyLoadImage)\b[\s\S]*?>/g)) {
        assert.match(image[0], /\balt\s*=/, `${path.relative(root, filePath)}: image without alt`);
    }
    assert.doesNotMatch(source, /<a\b[^>]*>(?:(?!<\/a\s*>)[\s\S]){0,300}<button\b/i, `${path.relative(root, filePath)}: nested anchor/button`);
}

const footer = await read('src/components/sections/Footer.jsx');
for (const marketingPath of marketingPaths) {
    assert.ok(footer.includes(`/${marketingPath}`), `Footer does not link to /${marketingPath}`);
}

console.log(`Validated ${allRoutePaths.length * SEO_LOCALES.length} static route variants, ${sitemapUrls.length} sitemap URLs, JSON-LD, exact FAQ parity, links, and image alts.`);
