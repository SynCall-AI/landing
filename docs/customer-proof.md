# Customer stories and call transcripts

The homepage and customer-examples page render approved stories from `src/content/customerStories.js`. Qwatt and Poytaxt Parking have unpublished entries. Their products, testimonials, and results have not been supplied. Do not infer them from logos or filenames.

For each story collect:

- The exact product used (`productId`: `voice`, `analytics`, or `chatbots`).
- The client's task before Syncall and what Syncall now handles.
- A client-approved quote, person's name, and role.
- If available, a result with the metric definition, baseline, measurement period, sample, and a source description.
- Confirmation that the company name and quote may be published, plus approval of translations.

Set `copy.en`, `copy.ru`, and `copy.uz` to objects with `product`, `before`, `after`, `quote`, `name`, and `role`. Optional `result` contains `text`, `period`, `sample`, and `source`; include the baseline and metric definition in `text` or `source`. Set `approved: true` only after approval. Missing locale copy stays hidden; do not silently substitute an unapproved translation. Stories with no numeric result are supported. Analytics shows only stories whose `productId` is `analytics`.

Suggested interview request:

> Хотим коротко описать ваш опыт работы с Syncall. Какую задачу вы решали раньше и как? Что изменилось после внедрения? Есть ли показатели до и после или конкретный пример, где система помогла? Что по-прежнему требует участия сотрудников? Можно ли опубликовать ваш отзыв с именем, должностью и названием компании?

## Existing call recordings

`src/content/callExamples.js` contains the two recordings already published on the site. The labels describe only their direction and language. No client attribution, scenario, or result has been inferred. No verified transcript is available in the repository.

Listen to each recording, verify the transcript and permission to publish the conversation, remove any personal information as needed, then supply the `transcript` string. The player automatically offers a transcript disclosure when that field is present. Add verified scenario/outcome copy when available. Do not use a generated sample conversation as a transcript of a recording.

## Commercial details

The pricing page explains what the proposal should cover without inventing prices: billing unit, rate, recurring minimum if any, setup, integrations, and telephony. Confirm these details and the existing offer of up to 1,000 trial calls before changing published commercial terms.
