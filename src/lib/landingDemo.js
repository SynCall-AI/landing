// Client for the public landing-demo API (contract: LANDING_DEMO_FRONTEND_HANDOFF.md).
//
// Dev defaults to a local backend; production defaults to api.syncallai.com.
// Override with VITE_API_BASE_URL. The Turnstile site key comes from
// VITE_TURNSTILE_SITE_KEY; when unset the widget is skipped, which is only
// valid against a backend with Turnstile validation disabled (local dev).

export const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? 'http://localhost:8000' : 'https://api.syncallai.com');

export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

async function apiError(response) {
    let message = `Landing demo request failed (${response.status})`;
    try {
        const body = await response.json();
        if (typeof body?.detail === 'string') message = body.detail;
    } catch {
        /* keep the status-only fallback; never log bodies or tokens */
    }
    const error = new Error(message);
    error.status = response.status;
    return error;
}

export async function fetchLandingDemos() {
    const response = await fetch(`${API_BASE}/api/v2/public/landing-demos`, {
        credentials: 'include',
    });
    if (!response.ok) throw await apiError(response);
    return response.json();
}

export async function createLandingDemoSession(body) {
    const response = await fetch(`${API_BASE}/api/v2/public/landing-demo-sessions`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!response.ok) throw await apiError(response);
    return response.json();
}

export async function getLandingDemoSession(sessionId, token, signal) {
    const response = await fetch(
        `${API_BASE}/api/v2/public/landing-demo-sessions/${encodeURIComponent(sessionId)}`,
        {
            credentials: 'include',
            headers: { Authorization: `Bearer ${token}` },
            signal,
        },
    );
    if (!response.ok) throw await apiError(response);
    return response.json();
}

// Fire-and-forget: Redis TTLs are the final cleanup mechanism.
export function cancelLandingDemoSession(sessionId, token) {
    return fetch(
        `${API_BASE}/api/v2/public/landing-demo-sessions/${encodeURIComponent(sessionId)}`,
        {
            method: 'DELETE',
            credentials: 'include',
            headers: { Authorization: `Bearer ${token}` },
            keepalive: true,
        },
    ).catch(() => {});
}

// Browsers cannot set WebSocket Authorization headers, so the session token
// travels as the second subprotocol — never in the URL.
export function encodeCredential(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return `b64u.${btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/g, '')}`;
}

export function buildLandingDemoWsUrl(sessionId) {
    const url = new URL(API_BASE, window.location.origin);
    url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
    url.pathname = `/api/v2/public/landing-demo-sessions/${encodeURIComponent(sessionId)}/ws`;
    url.search = '';
    url.hash = '';
    return url.toString();
}

// Mirrors the API's obvious-placeholder rejection for inline UX; the API
// stays authoritative for normalization and final validation.
export function isFakeUzNumber(digits9) {
    const isSequence = (s, step) => {
        for (let i = 1; i < s.length; i++) {
            if ((s.charCodeAt(i - 1) - 48 + step + 10) % 10 !== s.charCodeAt(i) - 48) return false;
        }
        return true;
    };
    const subscriber = digits9.slice(2);
    if (/^(\d)\1{6}$/.test(subscriber)) return true;
    return [digits9, subscriber].some((s) => isSequence(s, 1) || isSequence(s, -1));
}
