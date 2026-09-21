const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const CONTACT_PRODUCTS = ['voice', 'analytics', 'chatbots'];

export function normalizeUzPhone(value) {
    const digits = String(value || '').replace(/\D/g, '');
    const local = digits.length === 12 && digits.startsWith('998') ? digits.slice(3) : digits;
    if (!/^\d{9}$/.test(local) || /^(\d)\1{6}$/.test(local.slice(2))) return null;
    return `+998${local}`;
}

export function validateBusinessLead(form) {
    const errors = {};
    if (!normalizeUzPhone(form.phone)) errors.phone = 'invalidPhone';
    if (!String(form.company || '').trim()) errors.company = 'invalid';
    if (!String(form.useCase || '').trim()) errors.useCase = 'invalid';
    const volume = String(form.monthlyVolume ?? '').trim();
    if (!/^\d+$/.test(volume) || !Number.isSafeInteger(Number(volume)) || Number(volume) < 1 || Number(volume) > 1_000_000_000) errors.monthlyVolume = 'invalidVolume';
    if (!['calls', 'minutes'].includes(form.volumeUnit)) errors.volumeUnit = 'invalid';
    return errors;
}

// Shared by the form and the server so optional details stay optional at delivery.
export function validateContactLead(form) {
    const errors = {};
    for (const field of ['name', 'company']) {
        if (!String(form[field] || '').trim()) errors[field] = 'contactRequired';
    }
    const method = form.contactMethod || (form.phone ? 'phone' : 'email');
    if (method === 'email') {
        if (!EMAIL_PATTERN.test(String(form.email || '').trim())) errors.email = 'contactEmailInvalid';
    } else if (method === 'phone') {
        const digits = String(form.phone || '').replace(/\D/g, '');
        if (digits.length < 7 || digits.length > 20) errors.phone = 'callWidgetInvalidPhone';
    } else {
        errors.contactMethod = 'contactRequired';
    }
    const rawVolume = String(form.monthlyCallVolume ?? '').trim();
    if (rawVolume && (!/^\d+$/.test(rawVolume) || !Number.isSafeInteger(Number(rawVolume)) || Number(rawVolume) < 1 || Number(rawVolume) > 1_000_000_000)) {
        errors.monthlyCallVolume = 'contactVolumeInvalid';
    }
    if (form.product && !CONTACT_PRODUCTS.includes(form.product)) errors.product = 'contactRequired';
    return errors;
}
