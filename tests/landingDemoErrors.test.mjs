import { test } from 'node:test';
import assert from 'node:assert/strict';
import { landingDemoErrorKey } from '../src/lib/landingDemoErrors.js';

test('origin rejection is never reported as a Telegram phone mismatch', () => {
    assert.equal(landingDemoErrorKey({ status: 403, message: 'Landing demo origin is not allowed' }), 'callWidgetErrOrigin');
    assert.equal(landingDemoErrorKey({ status: 403, message: 'Forbidden' }), 'callWidgetErrGeneric');
    assert.equal(landingDemoErrorKey({ status: 403, message: 'Telegram phone number does not match' }), 'callWidgetErrPhoneMismatch');
});

test('verification errors require an explicit verification response', () => {
    for (const [status, message] of [[401, 'Telegram phone verification is required'], [401, 'Invalid Telegram verification'], [502, 'Telegram verification is unavailable']]) {
        assert.equal(landingDemoErrorKey({ status, message }), 'callWidgetErrTelegram');
    }
    assert.equal(landingDemoErrorKey({ status: 400, message: 'Human verification failed' }), 'callWidgetErrVerify');
    for (const [status, message] of [[401, 'Landing demo session token required'], [502, 'Bad gateway'], [400, 'Language is not enabled for this demo']]) {
        assert.equal(landingDemoErrorKey({ status, message }), 'callWidgetErrGeneric');
    }
});
