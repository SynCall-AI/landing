// Telegram's browser login returns a signed OIDC ID token. The backend is the
// trust boundary: callback user data is display-only until that token has been
// verified against Telegram's JWKS and matched to the submitted phone number.

const TELEGRAM_LOGIN_SDK_URL = 'https://oauth.telegram.org/js/telegram-login.js?3';

export const TELEGRAM_CLIENT_ID = (import.meta.env.VITE_TELEGRAM_CLIENT_ID || '').trim();

let sdkPromise;

const hasTelegramLogin = () => typeof window.Telegram?.Login?.auth === 'function';

export class TelegramLoginError extends Error {
    constructor(message, code = 'TELEGRAM_LOGIN_FAILED') {
        super(message);
        this.name = 'TelegramLoginError';
        this.code = code;
    }
}

export function preloadTelegramLogin() {
    if (!TELEGRAM_CLIENT_ID || hasTelegramLogin()) return Promise.resolve();
    if (sdkPromise) return sdkPromise;

    sdkPromise = new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src^="${TELEGRAM_LOGIN_SDK_URL}"]`);
        const script = existing || document.createElement('script');
        const timeout = window.setTimeout(() => {
            reject(new TelegramLoginError('Telegram Login timed out', 'SDK_UNAVAILABLE'));
        }, 10_000);

        const finish = () => {
            window.clearTimeout(timeout);
            if (hasTelegramLogin()) resolve();
            else reject(new TelegramLoginError('Telegram Login is unavailable', 'SDK_UNAVAILABLE'));
        };
        const fail = () => {
            window.clearTimeout(timeout);
            reject(new TelegramLoginError('Telegram Login failed to load', 'SDK_UNAVAILABLE'));
        };

        script.addEventListener('load', finish, { once: true });
        script.addEventListener('error', fail, { once: true });
        if (!existing) {
            script.src = TELEGRAM_LOGIN_SDK_URL;
            script.async = true;
            script.referrerPolicy = 'origin';
            document.head.appendChild(script);
        }
    }).catch((error) => {
        sdkPromise = undefined;
        throw error;
    });

    return sdkPromise;
}

const createNonce = () => {
    const bytes = new Uint8Array(24);
    crypto.getRandomValues(bytes);
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

// Telegram's current popup SDK builds a post_message authorization URL without
// the `origin` parameter even though oauth.telegram.org requires it. Keep the
// first-party SDK's message validation/callback handling, but amend only the
// popup URL during its synchronous window.open call.
const openTelegramLogin = (options, callback) => {
    const nativeOpen = window.open;
    window.open = (url, target, features) => {
        let popupUrl = url;
        try {
            const parsed = new URL(url, window.location.href);
            if (parsed.origin === 'https://oauth.telegram.org' && parsed.pathname === '/auth') {
                parsed.searchParams.set('origin', window.location.origin);
                popupUrl = parsed.toString();
            }
        } catch {
            /* Let the browser handle an unexpected URL exactly as supplied. */
        }
        return nativeOpen.call(window, popupUrl, target, features);
    };

    try {
        window.Telegram.Login.auth(options, callback);
    } finally {
        window.open = nativeOpen;
    }
};

export async function loginWithTelegramPhone(language) {
    const clientId = Number(TELEGRAM_CLIENT_ID);
    if (!Number.isSafeInteger(clientId) || clientId <= 0) {
        throw new TelegramLoginError('Telegram Login is not configured', 'SDK_UNAVAILABLE');
    }

    await preloadTelegramLogin();
    const nonce = createNonce();

    return new Promise((resolve, reject) => {
        const timeout = window.setTimeout(() => {
            reject(new TelegramLoginError('Telegram Login timed out', 'CANCELLED'));
        }, 120_000);

        const finish = (result) => {
            window.clearTimeout(timeout);
            if (result?.id_token) {
                resolve({ idToken: result.id_token, nonce });
                return;
            }
            reject(new TelegramLoginError(result?.error || 'Telegram Login cancelled', 'CANCELLED'));
        };

        try {
            openTelegramLogin(
                {
                    client_id: clientId,
                    scope: ['phone'],
                    lang: ['uz', 'ru', 'en'].includes(language) ? language : 'ru',
                    nonce,
                },
                finish,
            );
        } catch {
            window.clearTimeout(timeout);
            reject(new TelegramLoginError('Telegram Login could not start'));
        }
    });
}
