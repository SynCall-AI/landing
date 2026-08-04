import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { translations, useLanguage } from '../../context/LanguageContext.jsx';
import {
    SEO_LOCALES,
    buildFaqSchema,
    buildOrganizationSchema,
    buildSoftwareSchema,
    getRouteSeo,
} from './seoData.js';

const upsertMeta = (attribute, value, content) => {
    let element = document.head.querySelector(`meta[${attribute}="${value}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        element.dataset.siteSeoManaged = 'true';
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
    return element;
};

const upsertCanonical = (href) => {
    let element = document.head.querySelector('link[rel="canonical"]');
    if (!element) {
        element = document.createElement('link');
        element.rel = 'canonical';
        element.dataset.siteSeoManaged = 'true';
        document.head.appendChild(element);
    }
    element.href = href;
};

const replaceHreflangLinks = (seo) => {
    document.head
        .querySelectorAll('link[rel="alternate"][hreflang]')
        .forEach((element) => element.remove());

    const links = [
        ...SEO_LOCALES.map((locale) => [locale, seo.alternates[locale]]),
        ['x-default', seo.xDefault],
    ];

    links.forEach(([hreflang, href]) => {
        const element = document.createElement('link');
        element.rel = 'alternate';
        element.hreflang = hreflang;
        element.href = href;
        element.dataset.siteSeoManaged = 'true';
        document.head.appendChild(element);
    });
};

const replaceOgLocaleAlternates = (locales) => {
    document.head
        .querySelectorAll('meta[property="og:locale:alternate"]')
        .forEach((element) => element.remove());

    locales.forEach((locale) => {
        const element = document.createElement('meta');
        element.setAttribute('property', 'og:locale:alternate');
        element.setAttribute('content', locale);
        element.dataset.siteSeoManaged = 'true';
        document.head.appendChild(element);
    });
};

const setJsonLd = (schemaName, payload) => {
    let element = document.head.querySelector(`script[data-seo-schema="${schemaName}"]`);
    if (!element) {
        element = document.createElement('script');
        element.type = 'application/ld+json';
        element.dataset.seoSchema = schemaName;
        document.head.appendChild(element);
    }
    element.textContent = JSON.stringify(payload).replace(/</g, '\\u003c');
};

const removeJsonLd = (schemaName) => {
    document.head
        .querySelectorAll(`script[data-seo-schema="${schemaName}"]`)
        .forEach((element) => element.remove());
};

const SiteSeo = () => {
    const location = useLocation();
    const { language } = useLanguage();

    useEffect(() => {
        const seo = getRouteSeo(location.pathname, language);
        const localeStrings = translations[language] || translations.en;

        document.documentElement.lang = language;
        document.title = seo.title;

        upsertMeta('name', 'description', seo.description);
        upsertMeta(
            'name',
            'robots',
            seo.unknown
                ? 'noindex, follow, max-image-preview:large, max-snippet:-1'
                : 'index, follow, max-image-preview:large, max-snippet:-1',
        );
        upsertCanonical(seo.canonical);
        replaceHreflangLinks(seo);

        upsertMeta('property', 'og:type', 'website');
        upsertMeta('property', 'og:site_name', 'Syncall');
        upsertMeta('property', 'og:url', seo.canonical);
        upsertMeta('property', 'og:title', seo.title);
        upsertMeta('property', 'og:description', seo.description);
        upsertMeta('property', 'og:locale', seo.ogLocale);
        replaceOgLocaleAlternates(seo.ogLocaleAlternates);

        upsertMeta('name', 'twitter:card', 'summary_large_image');
        upsertMeta('name', 'twitter:title', seo.title);
        upsertMeta('name', 'twitter:description', seo.description);

        setJsonLd('organization', buildOrganizationSchema(language));
        setJsonLd('software-application', buildSoftwareSchema(language));

        if (!seo.unknown && seo.basePath === '/') {
            // These exact values also render in <Faq>; never paraphrase here.
            setJsonLd('faq', buildFaqSchema(localeStrings, translations.en));
        } else {
            removeJsonLd('faq');
        }
    }, [language, location.pathname]);

    return null;
};

export default SiteSeo;
