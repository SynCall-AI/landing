import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selectScenarioDemos } from '../src/lib/demoCatalog.js';

const parking = { slug: 'parking-assistant', display_name: 'Poytaxt Parking', allowed_languages: ['uz', 'ru', 'en'], default_language: 'ru' };
const sales = { slug: 'sales-agent', display_name: 'Sales', allowed_languages: ['ru'], default_language: 'ru' };
const support = { id: 'support', mode: 'live-or-recording', slug: '' };

test('support selects Poytaxt regardless of catalog order and accepts the production slug', () => {
    const result = selectScenarioDemos([sales, parking], support);
    assert.equal(result.length, 1);
    assert.equal(result[0].slug, parking.slug);
    assert.deepEqual(result[0].allowed_languages, ['uz', 'ru']);
    assert.deepEqual(parking.allowed_languages, ['uz', 'ru', 'en'], 'Catalog input is not mutated');
    assert.equal(selectScenarioDemos([{ ...parking, slug: 'poytakht-parking', display_name: '' }], support)[0].slug, 'poytakht-parking');
});

test('collection and sales cannot select a live agent, even with a configured slug', () => {
    for (const id of ['collection', 'sales']) {
        assert.deepEqual(selectScenarioDemos([sales, parking], { id, mode: 'recording', slug: parking.slug }), []);
        assert.deepEqual(selectScenarioDemos([sales, parking], { id }), []);
    }
    assert.deepEqual(selectScenarioDemos([parking], { ...support, mode: 'recording' }), []);
});

test('a configured support slug selects only that agent and never substitutes a disabled one', () => {
    const renamed = { ...parking, slug: 'support-v2', display_name: 'Support' };
    assert.equal(selectScenarioDemos([sales, renamed], { ...support, slug: renamed.slug })[0].slug, renamed.slug);
    assert.deepEqual(selectScenarioDemos([parking], { ...support, slug: 'disabled-agent' }), []);
});

test('missing or unavailable Poytaxt falls back to its recording, including single unrelated agents', () => {
    for (const catalog of [[], null, {}, [sales], [{ ...parking, slug: 'other-parking', display_name: 'Other Parking' }], [sales, { ...sales, slug: 'other' }], [{ ...parking, allowed_languages: ['en'] }]]) {
        assert.deepEqual(selectScenarioDemos(catalog, support), []);
    }
});

test('unsupported defaults are replaced with a supported conversation language', () => {
    assert.equal(selectScenarioDemos([{ ...parking, default_language: 'en' }], support)[0].default_language, 'uz');
    assert.deepEqual(selectScenarioDemos([null, {}, parking], support).map((item) => item.slug), [parking.slug]);
});

test('standalone widgets without a landing scenario retain their catalog', () => {
    assert.deepEqual(selectScenarioDemos([sales, parking]), [sales, parking]);
});
