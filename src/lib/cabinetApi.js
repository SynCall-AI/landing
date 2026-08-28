import { API_BASE } from './landingDemo.js';

const ACCESS_KEY = 'syncall_creator_access_token';
const REFRESH_KEY = 'syncall_creator_refresh_token';
export const CREATOR_SESSION_CLEARED_EVENT = 'syncall:creator-session-cleared';
const GOOGLE_CLIENT_ID = (
    import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID ||
    '800135338574-odbidn4en6m303c83l3gn3evg4a782cp.apps.googleusercontent.com'
).trim();

const readError = async (response) => {
    let message = `Request failed (${response.status})`;
    try {
        const body = await response.json();
        if (typeof body?.detail === 'string') message = body.detail;
    } catch {
        // Preserve the status fallback for non-JSON upstream errors.
    }
    const error = new Error(message);
    error.status = response.status;
    return error;
};

const storeSession = (tokens) => {
    localStorage.setItem(ACCESS_KEY, tokens.access_token);
    localStorage.setItem(REFRESH_KEY, tokens.refresh_token);
    return tokens;
};

export const clearCreatorSession = () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(CREATOR_SESSION_CLEARED_EVENT));
    }
};

const refresh = async () => {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    if (!refreshToken) {
        clearCreatorSession();
        return false;
    }
    try {
        const response = await fetch(`${API_BASE}/api/v2/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });
        if (!response.ok) {
            clearCreatorSession();
            return false;
        }
        const tokens = await response.json();
        localStorage.setItem(ACCESS_KEY, tokens.access_token);
        localStorage.setItem(REFRESH_KEY, tokens.refresh_token);
        return true;
    } catch {
        clearCreatorSession();
        return false;
    }
};

export const hasCreatorSession = () => Boolean(localStorage.getItem(ACCESS_KEY));

export async function creatorRequest(path, options = {}, retry = true) {
    const token = localStorage.getItem(ACCESS_KEY);
    const headers = new Headers(options.headers || {});
    if (token) headers.set('Authorization', `Bearer ${token}`);
    if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }
    const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
    if (response.status === 401) {
        if (retry && await refresh()) return creatorRequest(path, options, false);
        clearCreatorSession();
    }
    if (!response.ok) throw await readError(response);
    if (response.status === 204) return null;
    const contentType = response.headers.get('content-type') || '';
    return contentType.includes('application/json') ? response.json() : response;
}

export async function getGoogleConfig() {
    try {
        const response = await fetch(`${API_BASE}/api/v2/auth/google/config`);
        if (response.ok) return response.json();
    } catch {
        // The OAuth client ID is public, so the build-time fallback is safe.
    }
    return { enabled: Boolean(GOOGLE_CLIENT_ID), client_id: GOOGLE_CLIENT_ID || null };
}

export async function signInWithGoogle(credential, intent = 'login') {
    const response = await fetch(`${API_BASE}/api/v2/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential, intent, portal: 'creator' }),
    });
    if (!response.ok) throw await readError(response);
    return storeSession(await response.json());
}

export const getCreatorMe = () => creatorRequest('/api/v2/users/me');
export const activateCreatorStudio = () => creatorRequest('/api/v2/creator/activate', {
    method: 'POST',
});
export const linkCreatorGoogleAccount = (credential) => creatorRequest('/api/v2/auth/google/link', {
    method: 'POST',
    body: JSON.stringify({ credential }),
});
export const getCreatorConfig = () => creatorRequest('/api/v2/creator/config');
export const getCreatorOverview = () => creatorRequest('/api/v2/creator/overview');
export const getCreatorBilling = () => creatorRequest('/api/v2/creator/billing');
export const getCreatorJobs = (kind = '') => creatorRequest(`/api/v2/creator/jobs${kind ? `?kind=${kind}` : ''}`);
export const getCreatorVoices = () => creatorRequest('/api/v2/creator/voices');
export const generateCreatorSpeech = (payload) => creatorRequest('/api/v2/creator/tts', {
    method: 'POST',
    body: JSON.stringify(payload),
});
export const transcribeCreatorAudio = (audio, language, diarization = false, purpose = 'transcription') => {
    const form = new FormData();
    form.append('audio', audio, audio.name || 'recording.webm');
    form.append('language', language);
    form.append('diarization', String(diarization));
    form.append('purpose', purpose);
    return creatorRequest('/api/v2/creator/stt', { method: 'POST', body: form });
};
export const createCreatorVoice = (payload) => creatorRequest('/api/v2/creator/voices', {
    method: 'POST',
    body: JSON.stringify(payload),
});
export const deleteCreatorVoice = (id) => creatorRequest(`/api/v2/creator/voices/${encodeURIComponent(id)}`, {
    method: 'DELETE',
});
export const updateCreatorProfile = (payload) => creatorRequest('/api/v2/creator/profile', {
    method: 'PATCH',
    body: JSON.stringify(payload),
});
export const createCreatorTopUp = (payload) => creatorRequest('/api/v2/creator/billing/top-ups', {
    method: 'POST',
    body: JSON.stringify(payload),
});
export const deleteCreatorJob = (id) => creatorRequest(`/api/v2/creator/jobs/${encodeURIComponent(id)}`, {
    method: 'DELETE',
});

export async function fetchCreatorAudio(path) {
    const response = await creatorRequest(path);
    return response.blob();
}
