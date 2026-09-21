# Analytics and chatbot marketing pages

Updated on 2026-09-21 to match the accepted home-page design. Studio and onboarding were excluded.

- Reuse the landing typography, ambient blue/violet/teal background, inset rounded hero, light cards, navy buttons, glass navigation, and compact footer. Shared new styles use the `pp` namespace.
- Analytics has an illustrative input/report hero and an accessible example report with Quality, Topics, and Outcome tabs, including arrow/Home/End keyboard navigation. Example scores remain labeled as illustrative.
- Chatbots has a labeled animated conversation with an explicit replay button, capabilities, use cases, and deployment options. It is a scripted illustration, not a live chat endpoint.
- Both primary and closing CTAs retain `intent=trial` and the selected `product` when opening the existing home-page qualification form. The chatbot closing CTA previously omitted its product.
- Product layouts and visuals are shared in `src/components/products/`. New copy is localized in `src/content/productPageContent.js`. Unused Analytics/Chatbots stylesheets were removed; the legacy shared ProductHero and other routes were left in place.
- Navbar/Footer use the existing landing variant only on the home, voice-agent, analytics, and chatbot routes. No Studio, onboarding, authentication, or lead endpoint files changed.

Validation: lint, all 14 page/navigation tests in `tests/landing.test.mjs`, production build, static validation (87 route variants), and whitespace checks passed. Headless Chromium verified Russian desktop/mobile layouts at 1440/1024/768/390/320px, Uzbek and English at 1440/390/320px, report states and keyboard controls, replay/reveal animations, reduced motion, glass navigation, mobile menu, product links, and correct product values in the qualification form. Studio, pricing, and home route checks confirmed the page-specific classes do not follow navigation. Screenshots were reviewed. Lead submissions were blocked; no Studio data was changed.
