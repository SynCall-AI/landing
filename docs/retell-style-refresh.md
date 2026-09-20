# Retell-inspired visual refresh

Implemented locally on 2026-09-20 after comparing the current Retell homepage with Syncall at desktop and phone sizes. Builds on [the initial redesign](retell-redesign.md).

## Design

- A moving sapphire/blue atmosphere and white headline anchor the hero. Description and both CTAs are grouped below the headline, following the composition of the initial Syncall redesign.
- The original Helvetica Neue / system sans-serif stack has been restored throughout, following user feedback. The temporary Cormorant Garamond / Inter assets have been removed.
- The floating navigation, larger demo orb, pale form surfaces, light/navy customer cards, and varied product illustrations replace the repeated purple accents.
- The five-stage gradient showcase remains. Setup, testing, and launch have a staged question/answer/result sequence; quality has a review checklist; analytics has an animated chart. The slideshow advances every 7.5 seconds while visible, continues after manual tab selection, and has a scene replay control. Play/pause controls were removed following user feedback.
- The client strip has eight real company logos, grayscale by default and original colors on hover or keyboard focus. Decorative duplicates are hidden from accessibility tools. It keeps moving on hover; keyboard-focus access and reduced-motion behavior are retained.
- Reduced-motion users see static scenes and a complete logo grid. Desktop, tablet, and phone layouts are included.

The existing demo/session and lead delivery contracts are unchanged. All three demo cards still resolve to the shared Poytaxt agent, with recordings when the catalog is unavailable. Customer results use the supplied Poytaxt 8/10 and Qwatt +42% figures; quotes and portraits remain pending.

## Assets

The phone-call photo is an AI-generated illustration of a fictional person, separate from the customer stories. It does not portray Bekzod, Amal Kamalov, or a claimed customer.

- Final website asset: `public/images/syncall-conversation.jpg` (1536 × 1024, JPEG quality 85).
- Generation mode: built-in `image_gen`, one original image.
- Original saved image: `/Users/david/.codex/generated_images/01a0bf4c-befc-7650-b614-b983a5010243/exec-5f9ae756-2abb-4cc7-b4fa-24ae0dbdd091.png`.
- No Retell photography, fonts, Rive files, or other proprietary assets were copied.

Final generation prompt:

> Use case: photorealistic-natural. Asset type: editorial photograph for the voice AI section of Syncall's business landing page in Uzbekistan. Create a premium, natural editorial photograph of a fictional Uzbek / Central Asian woman in her early thirties, dark hair loosely tied back, wearing a simple cream blouse and a dark navy jacket, speaking on a smartphone by a large window in a contemporary Tashkent office or cafe. Waist-up candid composition, subject on the right half, looking slightly left with a relaxed attentive expression, not looking into camera. Warm afternoon sunlight, natural skin texture, believable hands and phone. Background gently out of focus with greenery, warm stone architecture, subtle contemporary city atmosphere. Landscape 3:2 composition suitable for a large website image and crop into square, elegant restrained navy, cream, sage tones. No text, no logos, no interface graphics, no watermark. This is a fictional illustrative person, not a customer portrait or testimonial. Real photographic feel, not over-smoothed, not stock-photo grinning, not futuristic.

## Implementation

- `src/components/landing/LandingPage.jsx` and `.css`: layout, demo, customer cards, showcase controls, forms.
- `src/components/landing/LandingVisuals.jsx`: ambient background, orb, client strip, customer illustrations, human section, and product artwork.
- `src/content/landingVisualContent.js`: new Russian, Uzbek, and English copy.
- `src/components/widgets/Navbar.*` and `src/components/sections/Footer.*`: scoped landing-page navigation and footer styling.

## Initial verification

The shared Poytaxt behavior in the earlier checks below was superseded by the final scenario separation documented at the end of this file.

- `npm test`: all 29 tests passed.
- `npm run lint`, `npm run build`, and `npm run validate`: production bundle and 87 static route variants verified.
- Headless Chromium: Russian layouts at 1440, 768, 390, and 320 pixels; no document overflow or JavaScript errors.
- Browser integration checks: all three live-demo cards submit the shared Poytaxt slug; phone carries into the qualification form; company, use case, monthly volume, and calls/minutes are retained; an empty catalog shows recordings.
- Lead and session writes were mocked. No production leads or calls were created.
- Interaction checks: continuous logo movement on hover and keyboard-focus colors; floating navigation; slideshow progression after manual selection, keyboard tabs, and replay; demo phone persistence; native FAQ disclosure; mobile menu and Studio link; language switching and English/Uzbek layouts at 320, 390, and 768 pixels; reduced-motion scenes without autoplay or running animations.

## Follow-up refinements

- Restored the previous sans-serif typography and adjusted heading sizes to suit it.
- Removed both animation play/pause buttons; logos keep moving on hover and showcase tabs resume automatically after selection. System reduced-motion preferences remain supported.
- Replaced the two footer utility rows with one compact copyright/social row. Footer language buttons and the duplicate Telegram handle were removed; the header language selector remains.

Follow-up validation: all 29 tests, lint, build, and static validation passed. Browser checks confirmed the original font, removal of pause controls, continued animation after hover/tab selection, a compact footer at 1440/390/320px, and Russian/Uzbek/English layouts without horizontal overflow or JavaScript errors.

The first color adjustment kept the blue layout and spherical avatar, replacing the pink/green background blend with blue, cyan highlights, and deeper indigo.

## Syncall identity refinement

After reviewing commit `e337a75`, the user selected a limited refinement: preserve the blue direction, restore the grouped hero composition, and repeat a shared speech-wave motif.

- The hero now groups the heading, introduction, demo CTA, contact CTA, and language note in one centered block. On phones, both CTAs stack beneath the introduction.
- Hero and contact backgrounds use sapphire with directional blue and ice-blue light. The showcase uses the same palette. The sphere has blue glass shading without the former pink/lilac highlights.
- `VoiceWave` in `LandingVisuals.jsx` defines one two-pulse silhouette, shared by the hero, demo sphere, process preview, and contact illustration. It is decorative animation, not a live audio visualization. The small inspector sphere keeps its stage-specific icon.
- Existing typography, demo/lead integrations, automatic animation, and compact footer are preserved. Motion follows the system reduced-motion setting.

Validation: lint, production build, static-site validation, and diff whitespace checks passed. Chromium checks covered Russian, Uzbek, and English at 1440/768/390/320px: no horizontal overflow or JavaScript errors, both hero CTAs visible, matching waveform silhouettes, and reduced motion. Anchor navigation and continuous wave motion were also checked. Screenshots of the hero, demo, showcase, and contact section were reviewed; lead requests were blocked during these visual checks.

## Compact opening screen and glass navigation

- Landing navigation overlays the hero with a transparent background and white logo/links at the top. After scrolling, it switches to dark text on translucent white glass with 22px backdrop blur, including the Safari-prefixed property. Other routes retain their existing header layout.
- The hero and navigation share `--landing-edge`: 8px at the top and sides on desktop, 6px on phones. The header no longer creates a separate white band above the hero.
- Hero height now follows the viewport, capped at 690px on desktop, with tighter spacing and extra adjustments for short screens. Client logos fit in the initial viewport at 1440×900, 1366×768, 1280×720, and 375×667. At the smallest 320×568 viewport, content stays readable and scrolls naturally.
- The default gradient blends blue, violet, and teal, based on the user's supplied showcase reference. The prior blue palette remains available with `?gradient=blue`, without adding controls to the public page. This selection applies to the hero, showcase, and contact backgrounds.

Validation: lint, build, static validation, and whitespace checks passed. Chromium verified equal insets, client visibility at the sizes above, glass styling on scroll, Russian/Uzbek/English layouts, mobile navigation and language menus, the alternate blue gradient, and the unaffected pricing-page header. No JavaScript errors or horizontal overflow; lead requests were blocked.

## Voice sphere refinement

On 2026-09-21, the user requested the inner motion from the existing public `https://www.syncallai.com/ru/` voice widget. Its rendered sphere and CSS were inspected in Chromium. The local `VoiceOrb` now uses the original widget's blue radial shading, a rotating translucent conic shimmer with a 6.5-second cycle, and a gently changing highlight. The waveform inside the sphere and its `showWave` option were removed. Motion stays inside the fixed-size sphere and respects reduced-motion preferences.

Lint, build, and whitespace checks passed. Browser checks confirmed moving inner light and no waveform inside the sphere for all three demo scenarios, stable sphere dimensions, layouts at 1440/390/320px, reduced motion, and no JavaScript errors. No production leads or calls were created.

## Demo scenarios and live conversation

- Inbound support uses blue, Soft Collection uses teal, and outbound sales uses warm orange. Selected tabs, spheres, form surfaces, and conversation accents share the scenario color.
- The scenario name and customer tags use exactly `Soft Collection` in Russian, Uzbek, and English. The requested phone-follow-up sentence and project-results footnote were removed in all three locales. The short microphone/recording explanation remains, and the idle view identifies the actual demo agent.
- Live conversations retain the existing microphone/PCM16 WebSocket transport and STT/TTS telemetry. The transcript is now an accessible conversation log with distinct visitor/agent bubbles and the actual agent name above it. Without Telegram verification configured, the prompt does not claim the number will be verified.
- On 2026-09-21, the real public catalog returned the enabled `poytakht-parking` agent with Uzbek/Russian support and a 300-second limit. Direct requests from localhost were blocked by the backend's CORS policy, while the production website was allowed. Vite now proxies only `/api/v2/public/landing-demo*`, including WebSocket upgrades. The landing client uses this same-origin route in development. Production API URLs and Studio's shared `API_BASE` export remain unchanged.

Validation: 31 unit tests passed, including development/production URL routing and preservation of session credentials and Studio's API address. Lint, build, static validation, and whitespace checks passed. Chromium confirmed the enabled production catalog loads through the local proxy. With a synthetic microphone, mocked session/lead endpoints, and a mocked WebSocket, all three cards sent PCM16 frames to the selected Poytaxt agent, rendered progressive STT text and agent responses, played incoming PCM16, flushed playback on interruption, muted/unmuted, ended the call, stopped microphone tracks, and retained the phone for qualification. Russian/Uzbek conversation selection, mobile transcripts, scenario colors, recording fallback, and localized copy were checked. Real backend conversations and production lead delivery were not exercised.


## Separate live support and recorded outbound demos

Updated on 2026-09-21 after the user clarified the intended demo modes:

- Only Poytaxt Parking support mounts the live widget and checks the public catalog. If Poytaxt is missing, unavailable, or the catalog request fails, the panel offers its existing support recording. Another enabled agent is never silently substituted. A retry checks availability again.
- Soft Collection and sales are recording-only. Their individual `recording` and `recordingLanguage` values in `src/content/landingContent.js` remain null until the user supplies the files. The pending state has a contact link, with no phone gate, empty player, live retry, catalog lookup, or microphone/session request. Existing generic outbound audio is not assigned to either scenario.
- Configured recordings retain their own source, language badge, scenario-specific lead capture, and post-playback qualification flow. Live support retains visitor/agent transcripts and microphone cleanup on tab changes.
- Browser wording was replaced with a concise microphone notice in Russian, Uzbek, and English. The UI does not promise a telephone callback to start the demo.

Validation: all 33 unit tests, lint, build, static validation (87 routes), and whitespace checks passed. Headless Chromium checked the real enabled catalog; mocked live support audio/transcripts and session cleanup; disabled and unrelated-agent fallback; retry; no live requests from recording-only tabs; separate synthetic recording sources and language badges; lead scenario/phone preservation; and localized mobile layouts. Screenshots were reviewed. Session and lead writes were mocked; no production calls or leads were created. The two real outbound audio files remain pending.


## Telegram error diagnosis and local origin fix

On 2026-09-21, the user reported “Номер Telegram не совпадает с введённым номером” without opting into Telegram verification. The widget incorrectly mapped every HTTP 403 to a phone mismatch. Read-only requests to a nonexistent session showed that production reached the token check (401), while localhost was rejected earlier with `Landing demo origin is not allowed` (403).

- The public production page was inspected: it does not load Telegram Login and sends only `demo_slug`, `phone_number`, and `language` when starting a session.
- Local Vite now accepts the explicit development-only `LANDING_DEMO_DEV_ORIGIN`. The ignored `.env.local` sets it to `https://www.syncallai.com`, so both HTTP session requests and WebSocket upgrades use the origin accepted by the public API. This does not change production headers or disable any API authentication checks.
- `landingDemoErrorKey` distinguishes an origin rejection from an actual Telegram phone mismatch. Generic 401/403/502 responses no longer claim Telegram verification failed.
- Telegram Login requires explicit `VITE_DEMO_TELEGRAM_VERIFICATION=true` together with a client ID. The flag defaults off and is false locally. A previously saved ID cannot silently enable SDK loading, popups, token fields, or verification copy. Future activation must also match the backend configuration.

Verification: production and localhost both passed origin/verification checks without Telegram fields, then returned 404 for a deliberately nonexistent demo; no session was created. A regression test exercised the real Vite proxy with a local upstream and verified the HTTP/WebSocket origin plus preservation of bearer credentials and WebSocket subprotocols. Browser checks confirmed the corrected error text, no Telegram SDK/tokens, retry with the phone retained, and mobile layout. All 38 tests, lint, build, and static validation passed. Actual conversations and lead submissions were not made during these checks.
