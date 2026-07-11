export const SUPPORTED_LOCALES = ['en', 'ru', 'uz'];

export const getLocaleFromPath = (pathname = '/') => {
    const firstSegment = pathname.split('/').filter(Boolean)[0];
    return firstSegment === 'ru' || firstSegment === 'uz' ? firstSegment : 'en';
};

export const stripLocalePrefix = (pathname = '/') => {
    const stripped = pathname.replace(/^\/(ru|uz)(?=\/|$)/, '');
    return stripped || '/';
};

export const localizePath = (pathname = '/', locale = 'en') => {
    const [pathAndQuery, hash = ''] = pathname.split('#');
    const [rawPath, query = ''] = pathAndQuery.split('?');
    const basePath = stripLocalePrefix(rawPath).replace(/\/{2,}/g, '/');
    const normalized = basePath === '/' ? '/' : basePath.replace(/\/$/, '');
    const localized = locale === 'en'
        ? normalized
        : `/${locale}${normalized === '/' ? '' : normalized}`;
    return `${localized}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
};

export const canonicalUrl = (pathname = '/', locale = 'en') =>
    `https://www.syncallai.com${localizePath(stripLocalePrefix(pathname), locale)}`;
