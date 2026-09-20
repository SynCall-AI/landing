# Syncall landing redesign

Implemented locally on 2026-09-20. Reference: https://www.retellai.com/ and the supplied Test showcase screenshot. No deployment performed.

## Confirmed direction

- Uzbekistan first; Russian is the default. Explicit Uzbek and English choices remain available.
- Voice agents lead the page. Analytics and chatbots are highlighted; STT and TTS link to self-service Studio tools.
- Syncall currently onboards voice and analytics clients. Future self-onboarding is not presented as available.
- Three selectable demos: Poytaxt Parking inbound support, SyncallBank soft collection (identified as a demonstration bank), and outbound sales.
- Phone capture before demo; then company, use case, monthly volume, and calls/minutes. The phone carries over in React memory, without local storage.
- Live demos have a short microphone notice; forms retain consent text. Numbers are not represented as verified.
- Samples are identified as recordings. Soft Collection and sales await their own audio files; neither reuses Poytaxt or the old generic outbound recording.
- Poytaxt's 8-in-10 resolution rate and Qwatt's 42% increase in powerbank returns in the first week came from the user. No invented outbound metric or quotation was added.

## Materials still expected

- Product screenshots/recordings. The five-tab showcase currently contains labeled process illustrations.
- Poytaxt: Bekzod's exact quote, title, portrait, and any additional name details to publish.
- Qwatt: Amal Kamalov's exact quote, title, and portrait.
- Separate Soft Collection and sales audio files, with their recording languages.
- Measurement details can refine result copy later; the project-results footnote was removed at the user’s request.

## Live demo wiring

The public catalog at `https://api.syncallai.com/api/v2/public/landing-demos` returned `[]` during the initial 2026-09-20 inspection. On 2026-09-21 it returned the enabled `poytakht-parking` agent with Uzbek and Russian support. The API schema returned 401. No production calls or lead submissions were made during verification.

Updated on 2026-09-21: only Poytaxt support mounts the live widget. `selectScenarioDemos` selects Poytaxt by its identity or the optional `VITE_DEMO_SUPPORT_SLUG`. Its absence selects `/poytaxt_incoming_uz.wav`, even when the catalog contains another enabled agent. Soft Collection and sales mount only a recording panel, with no catalog/session/microphone requests. Their `recording` and `recordingLanguage` fields in `src/content/landingContent.js` stay null until the user supplies the corresponding files. No shared, collection, or sales live slug overrides are used. Once audio is provided, each player captures its own scenario in the lead and carries the phone into the qualification form.

The deployed production bundle uses `https://api.syncallai.com` with an empty Telegram login client ID. The local `.env` pointed to a stopped backend at port 6969 and enabled Telegram login. An ignored `.env.local` now matches the production public configuration, without changing or exposing server credentials. Telegram verification now requires both `VITE_DEMO_TELEGRAM_VERIFICATION=true` and `VITE_TELEGRAM_CLIENT_ID`; it is off by default. The backend must be configured consistently when verification is introduced later.

The initial 2026-09-20 read-only production inspection found the old website displayed “Демо временно недоступно” and receives `[]` with HTTP 200. The backend catalog lists enabled public-demo configurations, so Poytaxt needs to be enabled/configured through the existing dashboard's Landing Demos screen. The new website will pick it up without another frontend slug change.

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

## Initial verification (2026-09-20)

The shared-agent behavior below was superseded by the scenario separation described above. Current validation is recorded in `docs/retell-style-refresh.md`.

- `npm test`: 29 tests passed, including shared Poytaxt selection, qualified lead validation, calls/minutes handling, sanitization, receiver failure, and the actual local lead middleware with mocked delivery.
- `npm run lint` and production build passed.
- Static validator checked 87 route variants, 42 sitemap URLs, structured data, matching FAQ content, links, and image alts.
- Headless Chromium checked desktop, 390px mobile, and 320px Uzbek layouts, Russian default, persistent English selection, tab navigation, recording lead capture, phone prefill, qualification submission, failed capture, exact live-agent matching, supported languages, and busy-agent fallback.
- Browser-test lead/session endpoints were mocked. Actual lead storage, telephony, microphone/WebSocket audio, and Telegram verification were not exercised against production.
- A browser test verified that support, collection, and sales each submit the same existing Poytaxt slug, retaining the selected business scenario in the lead. The local preview uses the production API origin and the same phone-verification configuration as the old site.
- In-app Browser could not initialize (`Cannot redefine property: process`); local headless Chromium provided visual verification instead.
