import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

import { localizePath } from '../src/lib/i18n.js';
import { marketingContent } from '../src/content/marketingContent.js';
import {
    INDEXABLE_ROUTE_PATHS,
    SEO_LOCALES,
    buildFaqSchema,
    buildOrganizationSchema,
    buildSoftwareSchema,
    getRouteSeo,
} from '../src/components/seo/seoData.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
const languageContextPath = path.join(projectRoot, 'src/context/LanguageContext.jsx');
const templatePath = path.join(distRoot, 'index.html');

const htmlEscape = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const jsonForHtml = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

const findObjectEnd = (source, start) => {
    let depth = 0;
    let quote = null;
    let escaped = false;
    let lineComment = false;
    let blockComment = false;

    for (let index = start; index < source.length; index += 1) {
        const character = source[index];
        const next = source[index + 1];

        if (lineComment) {
            if (character === '\n') lineComment = false;
            continue;
        }
        if (blockComment) {
            if (character === '*' && next === '/') {
                blockComment = false;
                index += 1;
            }
            continue;
        }
        if (quote) {
            if (escaped) {
                escaped = false;
            } else if (character === '\\') {
                escaped = true;
            } else if (character === quote) {
                quote = null;
            }
            continue;
        }
        if (character === '/' && next === '/') {
            lineComment = true;
            index += 1;
            continue;
        }
        if (character === '/' && next === '*') {
            blockComment = true;
            index += 1;
            continue;
        }
        if (character === '"' || character === "'" || character === '`') {
            quote = character;
            continue;
        }
        if (character === '{') depth += 1;
        if (character === '}') {
            depth -= 1;
            if (depth === 0) return index;
        }
    }

    throw new Error('Could not find the end of the translations object.');
};

const loadTranslations = async () => {
    const source = await fs.readFile(languageContextPath, 'utf8');
    const assignment = 'export const translations =';
    const assignmentIndex = source.indexOf(assignment);
    if (assignmentIndex === -1) {
        throw new Error(`Missing \`${assignment}\` in ${languageContextPath}.`);
    }

    const objectStart = source.indexOf('{', assignmentIndex + assignment.length);
    const objectEnd = findObjectEnd(source, objectStart);
    const objectLiteral = source.slice(objectStart, objectEnd + 1);
    return vm.runInNewContext(`(${objectLiteral})`, Object.create(null), { timeout: 1_000 });
};

const renderSeoBlock = (seo, locale, dictionaries) => {
    const schemas = [
        ['organization', buildOrganizationSchema(locale)],
        ['software-application', buildSoftwareSchema(locale)],
    ];
    if (!seo.unknown && seo.basePath === '/') {
        schemas.push([
            'faq',
            buildFaqSchema(dictionaries[locale], dictionaries.en),
        ]);
    }

    const hreflang = [
        ...SEO_LOCALES.map((alternateLocale) => (
            `    <link rel="alternate" hreflang="${alternateLocale}" href="${htmlEscape(seo.alternates[alternateLocale])}" />`
        )),
        `    <link rel="alternate" hreflang="x-default" href="${htmlEscape(seo.xDefault)}" />`,
    ].join('\n');

    const ogAlternates = seo.ogLocaleAlternates
        .map((alternateLocale) => `    <meta property="og:locale:alternate" content="${alternateLocale}" />`)
        .join('\n');

    const jsonLd = schemas
        .map(([name, schema]) => (
            `    <script type="application/ld+json" data-seo-schema="${name}">${jsonForHtml(schema)}</script>`
        ))
        .join('\n');

    const markdownAlternate = seo.basePath === '/' && locale === 'en'
        ? '    <link rel="alternate" type="text/markdown" href="/index.md" title="Markdown summary" />\n'
        : '';

    return `    <meta name="site-seo-start" content="generated" />
    <title>${htmlEscape(seo.title)}</title>
    <meta name="description" content="${htmlEscape(seo.description)}" />
    <meta name="robots" content="${seo.unknown ? 'noindex, follow' : 'index, follow'}, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${htmlEscape(seo.canonical)}" />
${hreflang}
${markdownAlternate}    <meta property="og:type" content="website" />
    <meta property="og:url" content="${htmlEscape(seo.canonical)}" />
    <meta property="og:site_name" content="Syncall" />
    <meta property="og:title" content="${htmlEscape(seo.title)}" />
    <meta property="og:description" content="${htmlEscape(seo.description)}" />
    <meta property="og:locale" content="${seo.ogLocale}" />
${ogAlternates}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${htmlEscape(seo.title)}" />
    <meta name="twitter:description" content="${htmlEscape(seo.description)}" />
${jsonLd}
    <meta name="site-seo-end" content="generated" />`;
};

const renderFallback = (seo, locale, dictionaries) => {
    const dictionary = dictionaries[locale] || dictionaries.en;
    const navItems = [
        ['/features', dictionary.features || dictionaries.en.features || 'Features'],
        ['/use-cases/banking', dictionary.navUseCases || dictionaries.en.navUseCases || 'Use cases'],
        ['/integrations', dictionary.navIntegrations || dictionaries.en.navIntegrations || 'Integrations'],
        ['/pricing', dictionary.navPricing || dictionaries.en.navPricing || 'Pricing'],
        ['/about', dictionary.navAbout || dictionaries.en.navAbout || 'About'],
    ];
    const navigationLabel = {
        en: 'Site navigation',
        ru: 'Навигация по сайту',
        uz: "Sayt bo'ylab navigatsiya",
    }[locale];
    const contactLabel = dictionary.ctaDemo || dictionaries.en.ctaDemo || 'Book a demo';
    const telegramLabel = dictionary.ctaTelegram || dictionaries.en.ctaTelegram || 'Message us on Telegram';
    const homeUrl = localizePath('/', locale);
    const contactUrl = localizePath('/#contact', locale);
    const marketingKey = seo.basePath.replace(/^\//, '');
    const marketingPage = marketingContent[locale]?.[marketingKey];

    const nav = navItems.map(([href, label]) => (
        `          <a href="${htmlEscape(localizePath(href, locale))}">${htmlEscape(label)}</a>`
    )).join('\n');

    let partners = '';
    if (!seo.unknown && seo.basePath === '/') {
        const partnersHeading = {
            en: 'Trusted by companies in Uzbekistan',
            ru: 'Нам доверяют компании в Узбекистане',
            uz: "Bizga O'zbekistondagi kompaniyalar ishonadi",
        }[locale];
        const partnerNames = ['Iman', 'Unicon', 'Qwatt', 'Thompson', 'Poytaxt Parking'];
        partners = `
        <section aria-labelledby="static-partners-heading">
          <h2 id="static-partners-heading">${htmlEscape(partnersHeading)}</h2>
          <p>${htmlEscape(partnerNames.join(' · '))}</p>
        </section>`;
    }

    let faq = '';
    if (!seo.unknown && seo.basePath === '/') {
        const faqSchema = buildFaqSchema(dictionary, dictionaries.en);
        const questions = faqSchema.mainEntity.map((entity) => `
          <article>
            <h3>${htmlEscape(entity.name)}</h3>
            <p>${htmlEscape(entity.acceptedAnswer.text)}</p>
          </article>`).join('');
        faq = `
        <section aria-labelledby="static-faq-heading">
          <h2 id="static-faq-heading">${htmlEscape(dictionary.faqTitle || dictionaries.en.faqTitle || 'Frequently asked questions')}</h2>${questions}
        </section>`;
    }

    const marketingBody = marketingPage
        ? `<h1>${htmlEscape(marketingPage.title)}</h1>
          <p>${htmlEscape(marketingPage.lead)}</p>
${marketingPage.sections.map((section) => `          <section>
            <h2>${htmlEscape(section.title)}</h2>
${section.body.map((paragraph) => `            <p>${htmlEscape(paragraph)}</p>`).join('\n')}
${(section.items || []).filter((item) => !item.placeholder).map((item) => `            <article>
              <h3>${htmlEscape(item.title)}</h3>
              <p>${htmlEscape(item.text)}</p>
            </article>`).join('\n')}
          </section>`).join('\n')}
${marketingPage.comparison ? `          <section>
            <h2>${htmlEscape(marketingPage.comparison.title)}</h2>
            <table>
              <caption>${htmlEscape(marketingPage.comparison.caption)}</caption>
              <thead><tr>${marketingPage.comparison.columns.map((column) => `<th scope="col">${htmlEscape(column)}</th>`).join('')}</tr></thead>
              <tbody>${marketingPage.comparison.rows.map((row) => `<tr><th scope="row">${htmlEscape(row[0])}</th><td>${htmlEscape(row[1])}</td><td>${htmlEscape(row[2])}</td></tr>`).join('')}</tbody>
            </table>
            <p>${htmlEscape(marketingPage.comparison.note)}</p>
          </section>` : ''}
${marketingPage.sources ? `          <aside>
            <h2>${htmlEscape(marketingPage.sources.title)}</h2>
            <p>${htmlEscape(marketingPage.sources.note)}</p>
            <ul>${marketingPage.sources.links.map((source) => `<li><a href="${htmlEscape(source.href)}">${htmlEscape(source.label)}</a></li>`).join('')}</ul>
          </aside>` : ''}`
        : `<h1>${htmlEscape(seo.title)}</h1>
          <p>${htmlEscape(seo.description)}</p>`;

    return `      <div class="ssr-fallback" data-static-fallback="${htmlEscape(`${locale}:${seo.basePath}`)}">
        <header>
          <a href="${htmlEscape(homeUrl)}" aria-label="Syncall home">Syncall</a>
          <nav aria-label="${htmlEscape(navigationLabel)}">
${nav}
          </nav>
        </header>
        <main>
          ${marketingBody}
          <p><a href="${htmlEscape(contactUrl)}">${htmlEscape(contactLabel)}</a></p>${partners}${faq}
        </main>
        <footer>
          <a href="https://t.me/syncall_ai">${htmlEscape(telegramLabel)}</a>
        </footer>
      </div>
      <template id="site-static-fallback-end"></template>`;
};

const renderPage = (template, pathname, locale, dictionaries) => {
    const seo = getRouteSeo(pathname, locale);
    const seoBlock = renderSeoBlock(seo, locale, dictionaries);
    const fallback = renderFallback(seo, locale, dictionaries);
    const seoPattern = /<meta\s+name=["']site-seo-start["'][^>]*>[\s\S]*?<meta\s+name=["']site-seo-end["'][^>]*>/i;
    const fallbackPattern = /<div\s+class=["']ssr-fallback["'][^>]*>[\s\S]*?<template\s+id=["']site-static-fallback-end["'][^>]*><\/template>/i;

    if (!seoPattern.test(template)) {
        throw new Error('The built index is missing the site-seo marker block.');
    }
    if (!fallbackPattern.test(template)) {
        throw new Error('The built index is missing the static fallback marker.');
    }

    return template
        .replace(/<html\b([^>]*?)\blang=["'][^"']*["']([^>]*)>/i, `<html$1lang="${locale}"$2>`)
        .replace(seoPattern, seoBlock)
        .replace(fallbackPattern, fallback);
};

const outputFilesForUrl = (urlPath) => {
    const normalized = urlPath.replace(/^\/+|\/+$/g, '');
    if (!normalized) return [path.join(distRoot, 'index.html')];
    // Vercel's `cleanUrls` maps this file to the extensionless public URL.
    // Keeping one physical entry avoids a `/route.html` vs `/route/index.html`
    // collision while still allowing the final catch-all rewrite for unknown URLs.
    return [path.join(distRoot, `${normalized}.html`)];
};

const assertUniqueMetadata = () => {
    SEO_LOCALES.forEach((locale) => {
        const titles = new Map();
        const descriptions = new Map();
        INDEXABLE_ROUTE_PATHS.forEach((routePath) => {
            const seo = getRouteSeo(routePath, locale);
            if (seo.canonicalPath !== routePath) return;
            if (titles.has(seo.title)) {
                throw new Error(`Duplicate ${locale} title for ${routePath} and ${titles.get(seo.title)}.`);
            }
            if (descriptions.has(seo.description)) {
                throw new Error(`Duplicate ${locale} description for ${routePath} and ${descriptions.get(seo.description)}.`);
            }
            titles.set(seo.title, routePath);
            descriptions.set(seo.description, routePath);
        });
    });
};

const main = async () => {
    assertUniqueMetadata();
    const [template, dictionaries] = await Promise.all([
        fs.readFile(templatePath, 'utf8'),
        loadTranslations(),
    ]);

    let entryCount = 0;
    for (const routePath of INDEXABLE_ROUTE_PATHS) {
        for (const locale of SEO_LOCALES) {
            const urlPath = localizePath(routePath, locale);
            const html = renderPage(template, routePath, locale, dictionaries);
            for (const outputPath of outputFilesForUrl(urlPath)) {
                await fs.mkdir(path.dirname(outputPath), { recursive: true });
                await fs.writeFile(outputPath, html, 'utf8');
                entryCount += 1;
            }
        }
    }

    // Without the old SPA catch-all rewrite, Vercel serves dist/404.html with a
    // real 404 status for unmatched paths; the client router then renders the
    // NotFound page. getRouteSeo marks unknown paths noindex.
    const notFoundHtml = renderPage(template, '/404', 'en', dictionaries);
    await fs.writeFile(path.join(distRoot, '404.html'), notFoundHtml, 'utf8');

    console.log(`Generated ${entryCount} localized static HTML entries for ${INDEXABLE_ROUTE_PATHS.length} routes, plus 404.html.`);
};

await main();
