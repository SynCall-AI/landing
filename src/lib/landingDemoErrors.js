// Several API failures share HTTP 403/401/502. Only a specific Telegram
// response can justify asking the visitor to check their Telegram account.
export function landingDemoErrorKey(error) {
    if (error.status === 403 && error.message === 'Landing demo origin is not allowed') {
        return 'callWidgetErrOrigin';
    }
    if (error.status === 403 && error.message === 'Telegram phone number does not match') {
        return 'callWidgetErrPhoneMismatch';
    }
    if ([401, 502].includes(error.status) && /Telegram .*verification|Telegram verification/.test(error.message)) {
        return 'callWidgetErrTelegram';
    }
    if (error.status === 400 && /^Human verification/.test(error.message)) {
        return 'callWidgetErrVerify';
    }
    return {
        409: 'callWidgetErrConflict',
        429: 'callWidgetErrLimit',
        503: 'callWidgetErrBusy',
    }[error.status] || 'callWidgetErrGeneric';
}
