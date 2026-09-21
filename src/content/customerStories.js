// Add the client's approved wording and attribution before setting approved to true.
// Copy must be supplied per locale: { product, before, after, quote, name, role }.
// Optional result: { text, period, sample, source } in the same locale record.
// A testimonial can be published without a numeric result.
export const customerStories = [
    { id: 'qwatt', company: 'Qwatt', productId: null, approved: false, copy: {} },
    { id: 'poytaxt-parking', company: 'Poytaxt Parking', productId: null, approved: false, copy: {} },
];

export function getCustomerStories(locale) {
    return customerStories.flatMap((story) => {
        const copy = story.copy[locale];
        if (!story.approved || !['voice', 'analytics', 'chatbots'].includes(story.productId) || !copy || !['product', 'before', 'after', 'quote', 'name', 'role'].every((field) => copy[field]?.trim())) return [];
        const result = copy.result && ['text', 'period', 'sample', 'source'].every((field) => copy.result[field]?.trim()) ? copy.result : null;
        return [{ ...story, ...copy, result }];
    });
}
