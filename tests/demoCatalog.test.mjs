import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selectScenarioDemos } from '../src/lib/demoCatalog.js';

const parking = { slug: 'parking-assistant', display_name: 'Poytaxt Parking', allowed_languages: ['uz', 'ru', 'en'], default_language: 'ru' };
const sales = { slug: 'sales-agent', display_name: 'Sales', allowed_languages: ['ru'], default_language: 'ru' };

test('all scenario cards reuse Poytaxt regardless of catalog order', () => {
    for (const id of ['support', 'collection', 'sales']) {
        const result = selectScenarioDemos([sales, parking], { id, slug: '' });
        assert.equal(result.length, 1);
        assert.equal(result[0].slug, parking.slug);
        assert.deepEqual(result[0].allowed_languages, ['uz', 'ru']);
    }
    assert.deepEqual(parking.allowed_languages, ['uz', 'ru', 'en'], 'Catalog input is not mutated');
});

test('a configured shared or dedicated slug selects only its intended agent', () => {
    assert.equal(selectScenarioDemos([sales, parking], { slug: sales.slug })[0].slug, sales.slug);
    assert.deepEqual(selectScenarioDemos([parking], { slug: 'disabled-agent' }), []);
});

test('legacy single-agent catalog works; empty or ambiguous catalogs fall back to recordings', () => {
    assert.equal(selectScenarioDemos([{ ...parking, slug: 'legacy-demo', display_name: 'Demo' }], { slug: '' })[0].slug, 'legacy-demo');
    for (const catalog of [[], null, {}, [sales, { ...sales, slug: 'other' }], [{ ...parking, allowed_languages: ['en'] }]]) {
        assert.deepEqual(selectScenarioDemos(catalog, { slug: '' }), []);
    }
});

test('unsupported defaults are replaced with a supported conversation language', () => {
    assert.equal(selectScenarioDemos([{ ...parking, default_language: 'en' }], { slug: '' })[0].default_language, 'uz');
    assert.deepEqual(selectScenarioDemos([null, {}, parking], { slug: '' }).map((item) => item.slug), [parking.slug]);
});
