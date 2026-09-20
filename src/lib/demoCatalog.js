// Only Poytaxt support can use live demos. Its absence means recording fallback,
// even if the catalog contains a different enabled agent.
export function selectScenarioDemos(catalog, scenario) {
    if (scenario && (scenario.id !== 'support' || scenario.mode === 'recording')) return [];
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
    const parking = entries.find((demo) => /poytaxt|poytakht|пойтахт|пойтакст/i.test(`${demo.slug} ${demo.display_name || ''}`));
    return parking ? [parking] : [];
}
