import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
    ROUTE_SEO,
    SEO_LOCALES,
    localizedUrl,
} from '../src/components/seo/seoData.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(projectRoot, 'public/sitemap.xml');
const lastModified = '2026-07-11';

const escapeXml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const canonicalRoutes = Object.entries(ROUTE_SEO)
    .filter(([, route]) => !route.aliasFor && !route.canonicalPath && !route.noindex)
    .map(([routePath]) => routePath);

const entries = canonicalRoutes.flatMap((routePath) => SEO_LOCALES.map((locale) => {
    const alternateLinks = [
        ...SEO_LOCALES.map((alternateLocale) => (
            `    <xhtml:link rel="alternate" hreflang="${alternateLocale}" href="${escapeXml(localizedUrl(routePath, alternateLocale))}" />`
        )),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(localizedUrl(routePath, 'en'))}" />`,
    ].join('\n');

    return `  <url>
    <loc>${escapeXml(localizedUrl(routePath, locale))}</loc>
    <lastmod>${lastModified}</lastmod>
${alternateLinks}
  </url>`;
}));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

await fs.writeFile(outputPath, sitemap, 'utf8');
console.log(`Generated sitemap with ${entries.length} localized URLs at ${outputPath}.`);
