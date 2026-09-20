// All three cards currently reuse the existing Poytaxt public demo. Prefer its
// identity over catalog order; a single agent also preserves the old site's
// one-demo setup without requiring its slug to be copied into the frontend.
export function selectScenarioDemos(catalog, scenario) {
    const entries = (Array.isArray(catalog) ? catalog : [])
        .filter((demo) => typeof demo?.slug === 'string' && demo.slug.trim())
        .map((demo) => ({
            ...demo,
            allowed_languages: (Array.isArray(demo.allowed_languages) ? demo.allowed_languages : [])
                .filter((code) => !scenario || code === 'uz' || code === 'ru'),
        }))
        .filter((demo) => demo.allowed_languages.length)
        .map((demo) => ({ ...demo, default_language: demo.allowed_languages.includes(demo.default_language) ? demo.default_language : demo.allowed_languages[0] }));
    if (!scenario) return entries;
    if (scenario.slug) return entries.filter((demo) => demo.slug === scenario.slug);
    const parking = entries.find((demo) => /poytaxt|пойтахт|пойтакст|parking/i.test(`${demo.slug} ${demo.display_name || ''}`));
    return parking ? [parking] : entries.length === 1 ? entries : [];
}
