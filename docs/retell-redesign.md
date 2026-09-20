# Syncall landing redesign

Implemented locally on 2026-09-20. Reference: https://www.retellai.com/ and the supplied Test showcase screenshot. No deployment performed.

## Confirmed direction

- Uzbekistan first; Russian is the default. Explicit Uzbek and English choices remain available.
- Voice agents lead the page. Analytics and chatbots are highlighted; STT and TTS link to self-service Studio tools.
- Syncall currently onboards voice and analytics clients. Future self-onboarding is not presented as available.
- Three selectable demos: Poytaxt Parking inbound support, SyncallBank soft collection (identified as a demonstration bank), and outbound sales.
- Phone capture before demo; then company, use case, monthly volume, and calls/minutes. The phone carries over in React memory, without local storage.
- Browser conversation and follow-up use of the number are explained before submission. Numbers are not represented as verified.
- Samples are identified as recordings. Existing outbound audio is a generic example, not asserted to be a verified SyncallBank or sales conversation.
- Poytaxt's 8-in-10 resolution rate and Qwatt's 42% increase in powerbank returns in the first week came from the user. No invented outbound metric or quotation was added.

## Materials still expected

- Product screenshots/recordings. The five-tab showcase currently contains labeled process illustrations.
- Poytaxt: Bekzod's exact quote, title, portrait, and any additional name details to publish.
- Qwatt: Amal Kamalov's exact quote, title, and portrait.
- Measurement details can refine result copy later; current copy attributes results to the Syncall team.

## Live demo wiring

The public catalog at `https://api.syncallai.com/api/v2/public/landing-demos` returned `[]` during inspection. The API schema returned 401. No production calls or lead submissions were made during verification.

All three cards now reuse the existing Poytaxt demo, as requested. `selectScenarioDemos` finds Poytaxt/Parking by slug or display name, regardless of catalog order. A single legacy catalog entry is also accepted, preserving the original site's single-agent setup. An empty or ambiguous catalog leads to recordings. `VITE_DEMO_SHARED_SLUG` optionally pins the common agent. Future `VITE_DEMO_SUPPORT_SLUG`, `VITE_DEMO_COLLECTION_SLUG`, and `VITE_DEMO_SALES_SLUG` values override this per card. Explicit slugs never silently substitute another agent. Languages remain limited to Uzbek and Russian. Live errors offer recordings as well.

The deployed production bundle uses `https://api.syncallai.com` with an empty Telegram login client ID. The local `.env` pointed to a stopped backend at port 6969 and enabled Telegram login. An ignored `.env.local` now matches the production public configuration, without changing or exposing server credentials. Verification remains conditional on `VITE_TELEGRAM_CLIENT_ID`; backend requirements are unchanged.

Read-only production browser inspection confirmed that the old website also displays “Демо временно недоступно” and receives `[]` with HTTP 200. The backend catalog lists enabled public-demo configurations, so Poytaxt needs to be enabled/configured through the existing dashboard's Landing Demos screen. The new website will pick it up without another frontend slug change.

## Lead delivery

The browser submits to `VITE_LEAD_API_URL` or `/api/lead`. A response must contain `{ "ok": true }` to count as success. Existing Telegram delivery remains supported.

Production inspection confirmed that the old landing page posts to `/api/lead`, using the existing Telegram delivery, and does not call a `/leads` URL directly. A GET returned HTTP 405 with `Allow: POST`; an empty POST returned `INVALID_INPUT` before delivery. No valid test lead was sent. The existing handler and server-only Telegram configuration are reused, with the new company/use-case/volume fields included in notifications.

Vite normally does not serve Vercel functions. `scripts/vite-leads.mjs` now serves that same `/api/lead` handler during `npm run dev`, loading only its server configuration in `vite.config.js`. It does not proxy new payloads to the old production handler, which would omit the added qualification fields. Production continues to use the existing Vercel route when deployed.

The optional `LEADS_API_URL`/`LEADS_API_TOKEN` receiver remains available for a separate future CRM integration; it is not required to reuse the current lead delivery. No new admin `/leads` screen or database was created.

Demo payload:

```json
{
  "source": "landing_demo",
  "event": "demo_started",
  "phone": "+998902345678",
  "language": "ru",
  "scenario": "support",
  "demoMode": "recording",
  "phoneVerified": false
}
```

Qualified request:

```json
{
  "source": "business_request",
  "phone": "+998902345678",
  "company": "Example company",
  "useCase": "Customer support",
  "monthlyVolume": "5000",
  "volumeUnit": "minutes",
  "product": "voice",
  "intent": "launch",
  "language": "ru"
}
```

The server sanitizes and validates input, normalizes Uzbekistan phone numbers, converts `monthlyVolume` to a number, forces `phoneVerified: false`, and adds `receivedAt`. Existing optional contact fields are forwarded for compatibility. The receiver should associate the two stages by normalized phone according to its contract. Tokens belong only in server environment variables.

If configured storage fails, the handler returns an error. If storage succeeds but optional Telegram notification fails, it returns success. Without a receiver, success means Telegram delivery, not verified database storage.

## Main files

- `src/components/landing/LandingPage.jsx` and `.css`: page, animations, recording fallback, and business form.
- `src/content/landingContent.js`: Russian, Uzbek, and English copy and demo configuration.
- `src/components/sections/VoiceCallWidget.jsx`: existing live transport, scenario matching, lead capture, and post-call action.
- `api/lead.js`: validation and configurable delivery.

## Verification

- `npm test`: 29 tests passed, including shared Poytaxt selection, qualified lead validation, calls/minutes handling, sanitization, receiver failure, and the actual local lead middleware with mocked delivery.
- `npm run lint` and production build passed.
- Static validator checked 87 route variants, 42 sitemap URLs, structured data, matching FAQ content, links, and image alts.
- Headless Chromium checked desktop, 390px mobile, and 320px Uzbek layouts, Russian default, persistent English selection, tab navigation, recording lead capture, phone prefill, qualification submission, failed capture, exact live-agent matching, supported languages, and busy-agent fallback.
- Browser-test lead/session endpoints were mocked. Actual lead storage, telephony, microphone/WebSocket audio, and Telegram verification were not exercised against production.
- A browser test verified that support, collection, and sales each submit the same existing Poytaxt slug, retaining the selected business scenario in the lead. The local preview uses the production API origin and the same phone-verification configuration as the old site.
- In-app Browser could not initialize (`Cannot redefine property: process`); local headless Chromium provided visual verification instead.
