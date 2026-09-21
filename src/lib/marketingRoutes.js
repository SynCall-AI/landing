export const MARKETING_PATHS = [
    'features',
    'use-cases',
    'use-cases/banking',
    'use-cases/debt-collection',
    'use-cases/appointment-reminders',
    'use-cases/surveys',
    'use-cases/lead-qualification',
    'integrations',
    'pricing',
    'about',
    'case-studies',
];

const landingRoutes = new Set(['/', '/voice-agents', '/analytics', '/chatbots', ...MARKETING_PATHS.map(path => `/${path}`)]);

export function isMarketingRoute(basePath) {
    return landingRoutes.has(basePath);
}
