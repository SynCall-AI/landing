export const MARKETING_LOCALES = ['en', 'ru', 'uz'];

export const MARKETING_PATHS = [
    'features',
    'use-cases/banking',
    'use-cases/debt-collection',
    'use-cases/appointment-reminders',
    'use-cases/surveys',
    'use-cases/lead-qualification',
    'integrations',
    'comparisons/vs-aisha',
    'comparisons/vapi-alternative',
    'pricing',
    'about',
    'case-studies',
];

export const marketingUi = {
    en: {
        relatedHeading: 'Explore related pages',
        bookDemo: 'Book a demo',
        startTrial: 'Start free trial',
        telegram: 'Message us on Telegram',
        placeholder: 'PLACEHOLDER — needs real data',
        unavailableTitle: 'Page not found',
        unavailableBody: 'This marketing page has not been configured yet.',
        backToFeatures: 'Explore Syncall features',
    },
    ru: {
        relatedHeading: 'Связанные разделы',
        bookDemo: 'Заказать демо',
        startTrial: 'Начать бесплатный период',
        telegram: 'Написать в Telegram',
        placeholder: 'PLACEHOLDER — нужны реальные данные',
        unavailableTitle: 'Страница не найдена',
        unavailableBody: 'Эта маркетинговая страница пока не настроена.',
        backToFeatures: 'Изучить возможности Syncall',
    },
    uz: {
        relatedHeading: 'Tegishli sahifalarni ko‘ring',
        bookDemo: 'Demo buyurtma qilish',
        startTrial: 'Bepul sinovni boshlash',
        telegram: 'Telegram orqali yozish',
        placeholder: 'PLACEHOLDER — haqiqiy ma’lumot kerak',
        unavailableTitle: 'Sahifa topilmadi',
        unavailableBody: 'Bu marketing sahifasi hali sozlanmagan.',
        backToFeatures: 'Syncall imkoniyatlarini ko‘ring',
    },
};

const en = {
    features: {
        meta: {
            title: 'AI Voice Agent Features for Call Centers | Syncall',
            description: 'Explore Syncall voice-agent features for Uzbek, Russian, and English calls, including dialect handling, analytics, integrations, and on-premise deployment.',
        },
        eyebrow: 'Platform features',
        title: 'AI voice-agent features built for real call centers',
        lead: 'Syncall combines speech recognition, conversation logic, natural voice synthesis, analytics, and integrations in one managed call-center workflow.',
        linkLabel: 'AI voice-agent features',
        linkDescription: 'See how speech, deployment, analytics, and integrations work together.',
        sections: [
            {
                title: 'Understand the way customers actually speak',
                body: ['The voice engine is designed for Uzbek dialects, Russian, and Uzbek–Russian code-switching, including conversational phrasing, slang, and accents.'],
                items: [
                    { title: 'Natural turn-taking', text: 'Customers can interrupt the agent; it stops speaking, listens, and continues from the updated context.' },
                    { title: 'Noise-aware calls', text: 'Voice isolation helps separate the customer from common background noise.' },
                    { title: 'Brand voice', text: 'Voice-cloning options let an approved company voice be used consistently across calls.' },
                ],
            },
            {
                title: 'Deploy around your data requirements',
                body: ['Run the system in Syncall Cloud or discuss an on-premise deployment for environments with stricter data-residency and infrastructure requirements.'],
                items: [
                    { title: 'Inbound and outbound', text: 'Use the same platform for support, reminders, qualification, surveys, and outreach workflows.' },
                    { title: 'Connected operations', text: 'Read and update approved customer data through telephony, CRM, and webhook integrations.' },
                    { title: 'Call analytics', text: 'Capture transcripts, outcomes, and structured call results for review and reporting.' },
                ],
            },
        ],
        related: ['integrations', 'use-cases/banking', 'pricing'],
        cta: {
            title: 'Test Syncall with your own call scenario',
            body: 'Share a representative workflow, language mix, and deployment requirements with the team.',
        },
    },
    'use-cases/banking': {
        meta: {
            title: 'On-Premise AI Voice Agents for Banks | Syncall',
            description: 'Call-center AI that can run on your servers, designed for banking data-residency, customer service, and operational workflows in Uzbekistan.',
        },
        eyebrow: 'Use case · Banking',
        title: 'On-premise AI voice agents for banks',
        lead: 'Automate approved customer conversations while keeping deployment, access, and data-handling requirements aligned with the bank’s infrastructure policies.',
        linkLabel: 'AI voice agents for banks',
        linkDescription: 'Review on-premise deployment and banking call workflows.',
        sections: [
            {
                title: 'Designed for controlled environments',
                body: ['Syncall can be deployed in the cloud or discussed as an on-premise installation so audio, transcripts, and integrations can follow the bank’s security architecture.'],
                items: [
                    { title: 'Data boundaries', text: 'Define where call data is processed, stored, and made available to approved systems.' },
                    { title: 'Controlled integrations', text: 'Connect telephony and internal systems through scoped APIs or webhooks.' },
                    { title: 'Language coverage', text: 'Serve customers in Uzbek, Russian, and English, including mixed Uzbek–Russian speech.' },
                ],
            },
            {
                title: 'Practical banking workflows',
                body: ['Start with a bounded workflow and clear escalation rules, then validate it against the bank’s compliance and service standards.'],
                items: [
                    { title: 'Payment reminders', text: 'Deliver approved reminders and record structured outcomes without changing the underlying banking process.' },
                    { title: 'Product enquiries', text: 'Answer approved questions about deposits, credit products, or service steps from a controlled knowledge source.' },
                    { title: 'Human handoff', text: 'Route exceptions and sensitive conversations to the appropriate team according to agreed rules.' },
                ],
            },
        ],
        related: ['features', 'integrations', 'use-cases/debt-collection'],
        cta: {
            title: 'Review a banking deployment with Syncall',
            body: 'Bring your security, telephony, and workflow requirements to a focused technical discussion.',
        },
    },
    'use-cases/debt-collection': {
        meta: {
            title: 'AI Voice Agents for Debt Collection | Syncall',
            description: 'Use multilingual AI voice agents for compliant payment reminders, structured outcomes, and human escalation across Uzbek and Russian calls.',
        },
        eyebrow: 'Use case · Debt collection',
        title: 'AI voice agents for structured debt-collection calls',
        lead: 'Support approved reminder and follow-up workflows in Uzbek and Russian while keeping scripts, escalation, and outcome tracking under your control.',
        linkLabel: 'Debt-collection voice agents',
        linkDescription: 'Explore controlled reminders, outcomes, and human escalation.',
        sections: [
            {
                title: 'Keep every conversation within the approved workflow',
                body: ['Configure the agent around the organization’s reviewed script, permitted data, contact policy, and handoff rules.'],
                items: [
                    { title: 'Identity and context', text: 'Use only the customer context that your connected system is authorized to provide.' },
                    { title: 'Structured outcomes', text: 'Record dispositions such as reached, callback requested, or human assistance needed.' },
                    { title: 'Escalation', text: 'Transfer exceptions, disputes, and sensitive cases to trained staff.' },
                ],
            },
            {
                title: 'Speak in the customer’s language',
                body: ['Support Uzbek, Russian, and mixed-language conversations without forcing customers into a rigid menu.'],
                items: [
                    { title: 'Inbound questions', text: 'Let customers respond or ask approved questions during a reminder call.' },
                    { title: 'Outbound follow-up', text: 'Schedule calls through the existing campaign and telephony process.' },
                    { title: 'Audit-ready records', text: 'Keep transcripts and structured call results available for authorized review where configured.' },
                ],
            },
        ],
        related: ['use-cases/banking', 'integrations', 'features'],
        cta: {
            title: 'Map your approved collection workflow',
            body: 'Discuss scripts, languages, handoffs, and system boundaries before starting a pilot.',
        },
    },
    'use-cases/appointment-reminders': {
        meta: {
            title: 'AI Appointment Reminder Calls | Syncall',
            description: 'Automate multilingual appointment reminders, confirmations, rescheduling requests, and human handoffs with Syncall voice agents.',
        },
        eyebrow: 'Use case · Appointment reminders',
        title: 'AI appointment reminders that can handle a reply',
        lead: 'Move beyond one-way notifications with voice agents that deliver the approved reminder, understand a response, and pass the result back to your workflow.',
        linkLabel: 'AI appointment reminders',
        linkDescription: 'Automate confirmations, rescheduling requests, and follow-up.',
        sections: [
            {
                title: 'Turn reminders into completed workflow steps',
                body: ['Connect the agent to the schedule data it needs and define the outcomes your team can act on.'],
                items: [
                    { title: 'Confirm attendance', text: 'Record a clear confirmation against the appointment or connected customer record.' },
                    { title: 'Capture rescheduling requests', text: 'Collect the preferred next step and route it to the scheduling team or integrated system.' },
                    { title: 'Handle no answer', text: 'Return the call status to the campaign workflow for the next approved action.' },
                ],
            },
            {
                title: 'Fit the reminder to your service',
                body: ['Use approved language, timing, and escalation rules for healthcare, services, deliveries, or other scheduled interactions.'],
                items: [
                    { title: 'Multilingual conversations', text: 'Offer Uzbek, Russian, and English calls according to the customer’s language preference.' },
                    { title: 'Natural questions', text: 'Allow the customer to interrupt and ask questions covered by the approved scenario.' },
                    { title: 'Human support', text: 'Route requests outside the automated scope to the right person.' },
                ],
            },
        ],
        related: ['integrations', 'use-cases/surveys', 'pricing'],
        cta: {
            title: 'Pilot reminders with a real schedule flow',
            body: 'Show the team how appointments enter your system and which outcomes must come back.',
        },
    },
    'use-cases/surveys': {
        meta: {
            title: 'AI Voice Surveys in Uzbek and Russian | Syncall',
            description: 'Run multilingual voice surveys with approved question flows, open responses, structured results, and CRM or webhook delivery.',
        },
        eyebrow: 'Use case · Surveys',
        title: 'AI voice surveys for Uzbek and Russian audiences',
        lead: 'Collect structured answers and natural feedback through a conversational call flow connected to your existing reporting process.',
        linkLabel: 'AI voice surveys',
        linkDescription: 'Collect multilingual feedback and structured survey outcomes.',
        sections: [
            {
                title: 'Keep the questionnaire consistent',
                body: ['Define the question order, branching, required disclosures, and completion outcomes before launch.'],
                items: [
                    { title: 'Branching questions', text: 'Choose the next approved question based on the participant’s answer.' },
                    { title: 'Open feedback', text: 'Capture natural-language responses alongside structured fields.' },
                    { title: 'Clear dispositions', text: 'Separate completed, partial, declined, and unreachable outcomes.' },
                ],
            },
            {
                title: 'Move results into the systems you use',
                body: ['Send approved survey fields, transcripts, or summaries to a CRM, reporting endpoint, or webhook workflow.'],
                items: [
                    { title: 'Language choice', text: 'Run the survey in Uzbek, Russian, or English with a reviewed script for each audience.' },
                    { title: 'Call review', text: 'Make configured records available to authorized teams for quality control.' },
                    { title: 'Follow-up routing', text: 'Pass requests that need a response to the responsible team.' },
                ],
            },
        ],
        related: ['use-cases/lead-qualification', 'integrations', 'features'],
        cta: {
            title: 'Turn your questionnaire into a voice workflow',
            body: 'Share the survey branches, target languages, and required result format.',
        },
    },
    'use-cases/lead-qualification': {
        meta: {
            title: 'AI Voice Agents for Lead Qualification | Syncall',
            description: 'Qualify inbound or outbound leads in Uzbek, Russian, and English, then send structured context to sales through CRM and webhook integrations.',
        },
        eyebrow: 'Use case · Lead qualification',
        title: 'AI voice agents for consistent lead qualification',
        lead: 'Ask approved discovery questions, capture structured context, and route qualified conversations to sales without making unsupported promises.',
        linkLabel: 'Lead-qualification voice agents',
        linkDescription: 'Standardize discovery questions and sales handoff context.',
        sections: [
            {
                title: 'Qualify against your real sales process',
                body: ['Build the conversation around the fields and rules your sales team already uses.'],
                items: [
                    { title: 'Approved discovery', text: 'Ask about relevant needs, timing, location, or other criteria defined by your team.' },
                    { title: 'Structured handoff', text: 'Send the answers and call outcome into the connected lead record.' },
                    { title: 'Clear boundaries', text: 'Escalate pricing, contractual, or specialist questions outside the agent’s approved scope.' },
                ],
            },
            {
                title: 'Support inbound and outbound demand',
                body: ['Use a consistent workflow whether a prospect calls you or your approved campaign reaches them.'],
                items: [
                    { title: 'Local-language conversations', text: 'Speak with leads in Uzbek, Russian, or English, including mixed Uzbek–Russian speech.' },
                    { title: 'CRM context', text: 'Use approved record fields to avoid asking for information the lead has already provided.' },
                    { title: 'Next-step routing', text: 'Transfer, schedule, or queue the lead according to your sales rules and available integrations.' },
                ],
            },
        ],
        related: ['integrations', 'use-cases/surveys', 'pricing'],
        cta: {
            title: 'Design a qualification flow with your sales team',
            body: 'Bring the questions, routing rules, and CRM fields used in your current process.',
        },
    },
    integrations: {
        meta: {
            title: 'Telephony and CRM Integrations | Syncall',
            description: 'Connect Syncall voice agents to SIP and PBX telephony, common providers, CRM workflows, Delta M, APIs, and webhooks.',
        },
        eyebrow: 'Integrations',
        title: 'Connect AI voice agents to your telephony and CRM',
        lead: 'Syncall is designed to work with the systems that already route calls, hold customer context, and receive operational outcomes.',
        linkLabel: 'Telephony and CRM integrations',
        linkDescription: 'Review supported connection patterns for calls and customer data.',
        sections: [
            {
                title: 'Telephony connections',
                body: ['Integration scope is confirmed against your provider, network, routing rules, and security requirements.'],
                items: [
                    { title: 'SIP and PBX', text: 'Connect through standard call-routing patterns used by SIP, PBX, Asterisk, FreePBX, and 3CX environments.' },
                    { title: 'Cloud telephony', text: 'Discuss configurations involving providers such as Twilio or Vonage.' },
                    { title: 'Inbound and outbound routes', text: 'Define numbers, queues, campaigns, fallback behavior, and human transfers.' },
                ],
            },
            {
                title: 'CRM and workflow connections',
                body: ['Give the agent only the data and actions required for the approved conversation.'],
                items: [
                    { title: 'Delta M and CRM records', text: 'Read permitted context and return call outcomes to the relevant customer or lead record.' },
                    { title: 'Webhooks and APIs', text: 'Exchange structured events with scheduling, reporting, and internal workflow services.' },
                    { title: 'Deployment review', text: 'Choose cloud or on-premise architecture and document authentication, logging, and data boundaries.' },
                ],
            },
        ],
        related: ['features', 'use-cases/banking', 'use-cases/appointment-reminders'],
        cta: {
            title: 'Map Syncall to your current stack',
            body: 'Share your telephony, CRM, deployment preference, and required read/write actions.',
        },
    },
    'comparisons/vs-aisha': {
        meta: {
            title: 'Syncall vs Aisha AI: Evaluation Guide',
            description: 'Compare Syncall and Aisha AI using verifiable criteria for Uzbek voice agents, deployment, voice options, languages, and implementation scope.',
        },
        eyebrow: 'Comparison guide',
        title: 'Syncall vs Aisha AI: a fair evaluation framework',
        lead: 'Choose using requirements you can test in your own calls. Competitor details below are deliberately marked for verification instead of being guessed.',
        linkLabel: 'Syncall vs Aisha AI comparison',
        linkDescription: 'Use a source-based framework to evaluate both vendors fairly.',
        sections: [
            {
                title: 'How to run the comparison',
                body: ['Give both vendors the same representative audio, call script, language mix, integration brief, and security questionnaire. Ask each vendor to document what is standard, custom, or dependent on a third party.'],
                items: [
                    { title: 'Test real speech', text: 'Include the dialects, accents, noise, and Uzbek–Russian switching your customers actually use.' },
                    { title: 'Verify deployment', text: 'Request an architecture diagram and clear data-flow boundaries for the proposed setup.' },
                    { title: 'Compare like for like', text: 'Measure the same call outcomes and review exceptions with the same internal team.' },
                ],
            },
        ],
        comparison: {
            title: 'Feature-by-feature verification table',
            caption: 'Syncall information reflects the current product brief. Aisha AI entries must be confirmed from current vendor documentation before publication or procurement.',
            columns: ['Evaluation criterion', 'Syncall', 'Aisha AI'],
            rows: [
                ['Uzbek dialect fine-tuning', 'Designed for Uzbek dialects and Uzbek–Russian code-switching.', 'Confirm supported dialects and request testing on your recordings.'],
                ['On-premise deployment', 'Available as a deployment option subject to infrastructure review.', 'Confirm current deployment options and data-flow boundaries.'],
                ['Voice cloning', 'Available using an approved source voice.', 'Confirm current voice options, consent process, and restrictions.'],
                ['Deployment speed', 'Set after discovery; depends on telephony, CRM, security, and scenario scope.', 'Request a scoped implementation plan based on the same requirements.'],
                ['Languages', 'Uzbek, Russian, and English.', 'The official product page lists Uzbek, Russian, and English; test each required language.'],
            ],
            note: 'No winner is declared here. The reviewed Aisha AI page also presents voice agents, call analytics, STT, TTS, chat, continuous availability, high concurrency, and sub-second response. These are not treated as gaps. Replace verification prompts only with dated, attributable evidence.',
        },
        sources: {
            title: 'Sources and verification date',
            note: 'Reviewed July 2026. Product information can change; re-check the source before publication or procurement.',
            links: [
                { label: 'Aisha AI official product page (Russian)', href: 'https://aisha.group/ru' },
            ],
        },
        related: ['features', 'integrations', 'comparisons/vapi-alternative'],
        cta: {
            title: 'Run a comparison on your own call scenario',
            body: 'Ask Syncall for a scoped demonstration using the languages and systems in your evaluation.',
        },
    },
    'comparisons/vapi-alternative': {
        meta: {
            title: 'Vapi Alternative for Uzbek Voice Agents | Syncall',
            description: 'Evaluate Syncall as a managed Vapi alternative for Uzbek and Russian call-center workflows, integrations, and on-premise deployment.',
        },
        eyebrow: 'Alternative evaluation',
        title: 'A Vapi alternative for Uzbek and Russian voice agents',
        lead: 'Syncall is built for teams that want a managed, local-language call-center solution rather than assembling and operating each voice component themselves.',
        linkLabel: 'Vapi alternative for Uzbek voice agents',
        linkDescription: 'Compare a managed local-language solution with a build-oriented approach.',
        sections: [
            {
                title: 'Choose based on the operating model you need',
                body: ['A product decision should account for who owns speech quality, dialogue tuning, telephony, monitoring, and production support—not only the first prototype.'],
                items: [
                    { title: 'Managed implementation', text: 'Syncall scopes the conversation, speech models, integrations, and deployment with your team.' },
                    { title: 'Local-language focus', text: 'The product brief covers Uzbek dialects, Uzbek–Russian code-switching, Russian, and English.' },
                    { title: 'Deployment choice', text: 'Discuss Syncall Cloud or an on-premise architecture based on your data requirements.' },
                ],
            },
            {
                title: 'Questions to verify with every platform',
                body: ['Vapi’s official documentation, reviewed July 2026, describes inbound and outbound calling, integrations, a configurable provider stack, and multilingual workflows through selected providers. The reviewed pages do not verify Syncall-equivalent Uzbek dialect quality or an on-premise deployment, so test and confirm those requirements directly.'],
                items: [
                    { title: 'Speech quality', text: 'Test your own noisy calls, accents, interruptions, and mixed-language conversations.' },
                    { title: 'Total ownership', text: 'Identify who monitors integrations, model changes, call failures, and production quality.' },
                    { title: 'Data flow', text: 'Document each processor, storage location, retention rule, and on-premise limitation.' },
                ],
            },
        ],
        sources: {
            title: 'Sources and verification date',
            note: 'Reviewed July 2026. Provider features and availability can change; verify the current documentation and contract.',
            links: [
                { label: 'Vapi official introduction', href: 'https://docs.vapi.ai/quickstart/introduction' },
                { label: 'Vapi official multilingual guide', href: 'https://docs.vapi.ai/customization/multilingual' },
            ],
        },
        related: ['features', 'integrations', 'comparisons/vs-aisha'],
        cta: {
            title: 'Compare architecture, not just a demo',
            body: 'Review your target workflow with Syncall and identify what would be managed, integrated, and deployed.',
        },
    },
    pricing: {
        meta: {
            title: 'AI Voice Agent Pricing and Free Trial | Syncall',
            description: 'Syncall uses volume-based pricing for AI voice agents. Discuss call volume, languages, integrations, deployment, and a custom free trial.',
        },
        eyebrow: 'Pricing',
        title: 'Volume-based pricing shaped around your call workflow',
        lead: 'Pricing depends on expected call volume and implementation scope, so the team confirms requirements before preparing a commercial proposal.',
        linkLabel: 'AI voice-agent pricing',
        linkDescription: 'Understand the inputs behind volume-based pricing and the trial.',
        sections: [
            {
                title: 'What shapes the proposal',
                body: ['Share enough operational detail to compare the proposal with your current call-center process.'],
                items: [
                    { title: 'Call volume and direction', text: 'Expected monthly volume, inbound or outbound mix, call duration, and campaign pattern.' },
                    { title: 'Languages and scenario', text: 'Required languages, dialogue complexity, knowledge sources, and human handoffs.' },
                    { title: 'Systems and deployment', text: 'Telephony, CRM, required actions, and cloud or on-premise architecture.' },
                ],
            },
            {
                title: 'Start with a custom-trained trial',
                body: ['The current offer is a custom AI agent for up to 1,000 trial calls. The team must confirm scenario, integration scope, timing, and trial conditions before launch.'],
                items: [
                    { title: 'Define success', text: 'Agree on observable call outcomes and review criteria before the first trial call.' },
                    { title: 'Use representative inputs', text: 'Test with realistic scripts, language mix, audio conditions, and customer questions.' },
                    { title: 'Review exceptions', text: 'Examine failed, escalated, and incomplete conversations as well as successful ones.' },
                ],
            },
        ],
        related: ['features', 'integrations', 'use-cases/lead-qualification'],
        cta: {
            title: 'Request a scoped pricing discussion',
            body: 'Bring your monthly call volume, languages, integrations, and deployment preference.',
        },
    },
    about: {
        meta: {
            title: 'About Syncall AI | Tashkent Voice AI Team',
            description: 'Learn about Syncall, a Tashkent-based AI voice-agent company founded in 2024 and focused on Uzbek, Russian, and English call-center automation.',
        },
        eyebrow: 'About Syncall',
        title: 'Building voice AI for the way Central Asia speaks',
        lead: 'Syncall is a Tashkent-based company founded in 2024, building AI voice agents and chatbots for call-center workflows in Uzbek, Russian, and English.',
        linkLabel: 'About the Syncall team',
        linkDescription: 'Learn about the company and the team information still needed.',
        sections: [
            {
                title: 'Company focus',
                body: ['The team focuses on real Uzbek dialects, Uzbek–Russian code-switching, local call-center operations, and deployment choices for organizations with different infrastructure requirements.'],
                items: [
                    { title: 'Founded', text: '2024' },
                    { title: 'Location', text: 'Tashkent, Uzbekistan' },
                    { title: 'Products', text: 'AI voice agents, call analytics, speech APIs, and chatbots.' },
                ],
            },
            {
                title: 'Meet the team',
                body: ['The people below must be replaced with approved names, roles, biographies, and photographs before publication.'],
                items: [
                    { title: '{{TEAM_MEMBER_NAME}} — {{ROLE}}', text: 'PLACEHOLDER — needs an approved biography and photograph.', placeholder: true },
                    { title: '{{TEAM_MEMBER_NAME}} — {{ROLE}}', text: 'PLACEHOLDER — needs an approved biography and photograph.', placeholder: true },
                    { title: '{{TEAM_MEMBER_NAME}} — {{ROLE}}', text: 'PLACEHOLDER — needs an approved biography and photograph.', placeholder: true },
                ],
            },
        ],
        related: ['features', 'case-studies', 'use-cases/banking'],
        cta: {
            title: 'Talk with the team about your call workflow',
            body: 'Share the languages, systems, and deployment requirements behind your project.',
        },
    },
    'case-studies': {
        meta: {
            title: 'Syncall AI Voice Agent Case Studies',
            description: 'A transparent case-study scaffold for approved Syncall customer stories, deployment context, measured outcomes, and methodology.',
        },
        eyebrow: 'Case studies',
        title: 'AI voice-agent case studies',
        lead: 'Customer stories will appear here only after the client, deployment context, measurements, and publication approval are documented.',
        linkLabel: 'Syncall customer case studies',
        linkDescription: 'See the transparent scaffold awaiting approved customer evidence.',
        sections: [
            {
                title: 'Customer stories awaiting approval',
                body: ['Do not publish invented logos, quotes, or performance numbers. Each card is intentionally visible as a placeholder until real evidence is supplied.'],
                items: [
                    { title: '{{CLIENT_NAME}} — {{USE_CASE}}', text: 'PLACEHOLDER — needs client approval, challenge, deployment scope, measured outcome, and methodology.', placeholder: true },
                    { title: '{{CLIENT_NAME}} — {{USE_CASE}}', text: 'PLACEHOLDER — needs client approval, challenge, deployment scope, measured outcome, and methodology.', placeholder: true },
                    { title: '{{CLIENT_NAME}} — {{USE_CASE}}', text: 'PLACEHOLDER — needs client approval, challenge, deployment scope, measured outcome, and methodology.', placeholder: true },
                ],
            },
            {
                title: 'Evidence required for every published case study',
                body: ['A useful case study explains the baseline, scope, measurement window, and limitations—not only the best result.'],
                items: [
                    { title: 'Customer and context', text: 'Approved client name or anonymization, industry, call type, languages, and deployment model.' },
                    { title: 'Methodology', text: 'Metric definition, baseline, sample, measurement period, exclusions, and responsible reviewer.' },
                    { title: 'Approved proof', text: 'Client-approved quote, logo rights, result wording, and publication date.' },
                ],
            },
        ],
        related: ['about', 'features', 'use-cases/banking'],
        cta: {
            title: 'Evaluate Syncall with your own evidence',
            body: 'Until approved case studies are available, request a scoped trial and agree on measurement criteria in advance.',
        },
    },
};

const ru = {
    features: {
        meta: {
            title: 'Возможности голосовых AI-агентов | Syncall',
            description: 'Возможности голосовых агентов Syncall для узбекского, русского и английского: диалекты, аналитика, интеграции и On-Premise.',
        },
        eyebrow: 'Возможности платформы',
        title: 'Возможности AI-агентов для реальных колл-центров',
        lead: 'Syncall объединяет распознавание речи, логику диалога, естественный синтез голоса, аналитику и интеграции в едином управляемом процессе.',
        linkLabel: 'Возможности голосовых AI-агентов',
        linkDescription: 'Узнайте, как вместе работают речь, развертывание, аналитика и интеграции.',
        sections: [
            {
                title: 'Понимание живой речи клиентов',
                body: ['Голосовой движок рассчитан на узбекские диалекты, русский язык и узбекско-русское переключение, включая разговорные выражения, сленг и акценты.'],
                items: [
                    { title: 'Естественная очередность реплик', text: 'Клиент может перебить агента: он прекращает говорить, слушает и продолжает с учетом нового контекста.' },
                    { title: 'Работа с шумом', text: 'Изоляция голоса помогает отделять речь клиента от обычного фонового шума.' },
                    { title: 'Голос бренда', text: 'Функция клонирования позволяет использовать согласованный голос компании во всех звонках.' },
                ],
            },
            {
                title: 'Развертывание с учетом требований к данным',
                body: ['Запускайте систему в Syncall Cloud или обсудите On-Premise для сред со строгими требованиями к инфраструктуре и размещению данных.'],
                items: [
                    { title: 'Входящие и исходящие', text: 'Используйте одну платформу для поддержки, напоминаний, квалификации, опросов и исходящих кампаний.' },
                    { title: 'Связанные процессы', text: 'Читайте и обновляйте разрешенные данные через интеграции с телефонией, CRM и вебхуками.' },
                    { title: 'Аналитика звонков', text: 'Сохраняйте расшифровки, итоги и структурированные результаты для анализа и отчетности.' },
                ],
            },
        ],
        related: ['integrations', 'use-cases/banking', 'pricing'],
        cta: {
            title: 'Проверьте Syncall на своем сценарии',
            body: 'Поделитесь типовым процессом, сочетанием языков и требованиями к развертыванию.',
        },
    },
    'use-cases/banking': {
        meta: {
            title: 'On-Premise AI-агенты для банков | Syncall',
            description: 'AI для банковских колл-центров с развертыванием на ваших серверах, контролем данных и поддержкой узбекского и русского языков.',
        },
        eyebrow: 'Сценарий · Банки',
        title: 'On-Premise голосовые AI-агенты для банков',
        lead: 'Автоматизируйте согласованные диалоги с клиентами, сохраняя требования к развертыванию, доступу и обработке данных в рамках политики банка.',
        linkLabel: 'Голосовые AI-агенты для банков',
        linkDescription: 'Изучите On-Premise и банковские сценарии звонков.',
        sections: [
            {
                title: 'Для контролируемой инфраструктуры',
                body: ['Syncall может работать в облаке или локально, чтобы обработка аудио, расшифровок и интеграций соответствовала архитектуре безопасности банка.'],
                items: [
                    { title: 'Границы данных', text: 'Определите, где обрабатываются и хранятся данные звонков и каким системам они доступны.' },
                    { title: 'Контролируемые интеграции', text: 'Подключайте телефонию и внутренние системы через ограниченные API или вебхуки.' },
                    { title: 'Языки', text: 'Обслуживайте клиентов на узбекском, русском и английском, включая смешанную узбекско-русскую речь.' },
                ],
            },
            {
                title: 'Практические банковские сценарии',
                body: ['Начните с ограниченного процесса и четких правил эскалации, затем проверьте его по требованиям комплаенса и качества обслуживания.'],
                items: [
                    { title: 'Напоминания об оплате', text: 'Передавайте согласованные напоминания и фиксируйте результат, не меняя основной банковский процесс.' },
                    { title: 'Вопросы о продуктах', text: 'Отвечайте на утвержденные вопросы о вкладах, кредитах и обслуживании из контролируемой базы знаний.' },
                    { title: 'Передача оператору', text: 'Направляйте исключения и чувствительные разговоры нужной команде по согласованным правилам.' },
                ],
            },
        ],
        related: ['features', 'integrations', 'use-cases/debt-collection'],
        cta: {
            title: 'Обсудите банковское развертывание',
            body: 'Подготовьте требования к безопасности, телефонии и процессам для предметной технической встречи.',
        },
    },
    'use-cases/debt-collection': {
        meta: {
            title: 'AI-агенты для взыскания задолженности | Syncall',
            description: 'Многоязычные голосовые агенты для согласованных напоминаний, структурированных результатов и передачи оператору.',
        },
        eyebrow: 'Сценарий · Взыскание',
        title: 'AI-агенты для структурированных звонков по задолженности',
        lead: 'Поддерживайте согласованные напоминания и последующие звонки на узбекском и русском, контролируя скрипты, эскалацию и фиксацию результата.',
        linkLabel: 'AI-агенты для взыскания задолженности',
        linkDescription: 'Изучите контролируемые напоминания, итоги и передачу оператору.',
        sections: [
            {
                title: 'Диалог строго в рамках утвержденного процесса',
                body: ['Настройте агента по проверенному скрипту, разрешенным данным, политике контактов и правилам передачи сотруднику.'],
                items: [
                    { title: 'Идентификация и контекст', text: 'Используйте только те данные клиента, которые подключенная система вправе предоставить.' },
                    { title: 'Структурированные итоги', text: 'Фиксируйте статусы: контакт состоялся, запрошен обратный звонок или нужна помощь сотрудника.' },
                    { title: 'Эскалация', text: 'Передавайте споры, исключения и чувствительные случаи обученным специалистам.' },
                ],
            },
            {
                title: 'Разговор на языке клиента',
                body: ['Поддерживайте узбекский, русский и смешанную речь без жесткого голосового меню.'],
                items: [
                    { title: 'Вопросы клиента', text: 'Позвольте отвечать и задавать утвержденные вопросы во время звонка-напоминания.' },
                    { title: 'Исходящий контакт', text: 'Планируйте звонки через действующий процесс кампаний и телефонии.' },
                    { title: 'Записи для проверки', text: 'Предоставляйте уполномоченным сотрудникам расшифровки и итоги там, где это настроено.' },
                ],
            },
        ],
        related: ['use-cases/banking', 'integrations', 'features'],
        cta: {
            title: 'Опишите утвержденный процесс взыскания',
            body: 'Обсудите скрипты, языки, эскалацию и системные ограничения до пилота.',
        },
    },
    'use-cases/appointment-reminders': {
        meta: {
            title: 'AI-звонки с напоминанием о записи | Syncall',
            description: 'Автоматизируйте многоязычные напоминания, подтверждения, запросы на перенос и передачу оператору с помощью Syncall.',
        },
        eyebrow: 'Сценарий · Напоминания',
        title: 'AI-напоминания о записи, которые понимают ответ',
        lead: 'Замените одностороннее уведомление диалогом: агент передаст согласованное напоминание, поймет ответ и вернет результат в ваш процесс.',
        linkLabel: 'AI-напоминания о записи',
        linkDescription: 'Автоматизируйте подтверждения, переносы и дальнейшие действия.',
        sections: [
            {
                title: 'Превратите напоминание в завершенный шаг',
                body: ['Подключите необходимые данные расписания и определите результаты, с которыми сможет работать команда.'],
                items: [
                    { title: 'Подтверждение визита', text: 'Запишите явное подтверждение в запись о встрече или карточку клиента.' },
                    { title: 'Запрос на перенос', text: 'Соберите желаемое действие и передайте его команде расписания или подключенной системе.' },
                    { title: 'Нет ответа', text: 'Верните статус звонка в процесс кампании для следующего разрешенного действия.' },
                ],
            },
            {
                title: 'Адаптация к вашему сервису',
                body: ['Используйте утвержденный язык, время и правила эскалации для медицины, услуг, доставки и других запланированных взаимодействий.'],
                items: [
                    { title: 'Несколько языков', text: 'Звоните на узбекском, русском или английском согласно предпочтению клиента.' },
                    { title: 'Естественные вопросы', text: 'Клиент может перебить агента и задать вопрос в рамках утвержденного сценария.' },
                    { title: 'Помощь человека', text: 'Передавайте запросы за пределами автоматизированного сценария нужному сотруднику.' },
                ],
            },
        ],
        related: ['integrations', 'use-cases/surveys', 'pricing'],
        cta: {
            title: 'Проведите пилот на реальном расписании',
            body: 'Покажите, как встречи попадают в систему и какие результаты должны вернуться.',
        },
    },
    'use-cases/surveys': {
        meta: {
            title: 'AI-опросы по телефону на узбекском и русском | Syncall',
            description: 'Многоязычные голосовые опросы с ветвлением, открытыми ответами, структурированными итогами и передачей в CRM.',
        },
        eyebrow: 'Сценарий · Опросы',
        title: 'AI-опросы по телефону для узбекской и русской аудитории',
        lead: 'Собирайте структурированные ответы и естественную обратную связь через диалоговый сценарий, связанный с вашей отчетностью.',
        linkLabel: 'AI-опросы по телефону',
        linkDescription: 'Собирайте многоязычную обратную связь и структурированные результаты.',
        sections: [
            {
                title: 'Единый и последовательный опросник',
                body: ['Заранее определите порядок вопросов, ветвление, обязательные уведомления и статусы завершения.'],
                items: [
                    { title: 'Ветвление', text: 'Выбирайте следующий утвержденный вопрос на основе ответа участника.' },
                    { title: 'Открытая обратная связь', text: 'Сохраняйте естественные ответы вместе со структурированными полями.' },
                    { title: 'Понятные статусы', text: 'Разделяйте завершенные, частичные, отклоненные и недоступные контакты.' },
                ],
            },
            {
                title: 'Результаты в ваших системах',
                body: ['Передавайте разрешенные поля опроса, расшифровки или итоги в CRM, отчетный endpoint или через вебхуки.'],
                items: [
                    { title: 'Выбор языка', text: 'Проводите опрос на узбекском, русском или английском по проверенному сценарию.' },
                    { title: 'Проверка звонков', text: 'Открывайте настроенные записи уполномоченной команде контроля качества.' },
                    { title: 'Маршрутизация', text: 'Передавайте запросы, требующие ответа, ответственному подразделению.' },
                ],
            },
        ],
        related: ['use-cases/lead-qualification', 'integrations', 'features'],
        cta: {
            title: 'Превратите анкету в голосовой сценарий',
            body: 'Поделитесь ветвлением, целевыми языками и требуемым форматом результатов.',
        },
    },
    'use-cases/lead-qualification': {
        meta: {
            title: 'AI-агенты для квалификации лидов | Syncall',
            description: 'Квалифицируйте лиды на узбекском, русском и английском и передавайте структурированный контекст продажам через CRM.',
        },
        eyebrow: 'Сценарий · Квалификация лидов',
        title: 'AI-агенты для последовательной квалификации лидов',
        lead: 'Задавайте утвержденные вопросы, фиксируйте структурированный контекст и передавайте подходящие обращения продажам без неподтвержденных обещаний.',
        linkLabel: 'AI-агенты для квалификации лидов',
        linkDescription: 'Стандартизируйте вопросы и контекст для передачи в продажи.',
        sections: [
            {
                title: 'Квалификация по вашему процессу продаж',
                body: ['Постройте разговор вокруг полей и правил, которыми уже пользуется отдел продаж.'],
                items: [
                    { title: 'Утвержденные вопросы', text: 'Уточняйте потребности, сроки, регион и другие критерии, заданные вашей командой.' },
                    { title: 'Структурированная передача', text: 'Сохраняйте ответы и итог звонка в подключенной карточке лида.' },
                    { title: 'Четкие границы', text: 'Передавайте вопросы о цене, договоре и специализированных темах ответственному сотруднику.' },
                ],
            },
            {
                title: 'Входящий и исходящий спрос',
                body: ['Используйте единый процесс, независимо от того, звонит ли клиент сам или его набирает согласованная кампания.'],
                items: [
                    { title: 'Локальные языки', text: 'Общайтесь на узбекском, русском или английском, включая смешанную узбекско-русскую речь.' },
                    { title: 'Контекст CRM', text: 'Используйте разрешенные поля, чтобы не спрашивать повторно уже известную информацию.' },
                    { title: 'Следующий шаг', text: 'Переводите, планируйте или ставьте лид в очередь согласно правилам продаж и возможностям интеграций.' },
                ],
            },
        ],
        related: ['integrations', 'use-cases/surveys', 'pricing'],
        cta: {
            title: 'Спроектируйте сценарий вместе с продажами',
            body: 'Подготовьте вопросы, правила маршрутизации и поля CRM из текущего процесса.',
        },
    },
    integrations: {
        meta: {
            title: 'Интеграции с телефонией и CRM | Syncall',
            description: 'Подключайте Syncall к SIP/PBX, Asterisk, FreePBX, 3CX, облачной телефонии, Delta M, API и вебхукам.',
        },
        eyebrow: 'Интеграции',
        title: 'Подключите AI-агентов к телефонии и CRM',
        lead: 'Syncall работает с системами, которые уже маршрутизируют звонки, хранят клиентский контекст и принимают операционные результаты.',
        linkLabel: 'Интеграции с телефонией и CRM',
        linkDescription: 'Изучите варианты подключения звонков и клиентских данных.',
        sections: [
            {
                title: 'Подключение телефонии',
                body: ['Объем интеграции согласуется с учетом провайдера, сети, правил маршрутизации и требований безопасности.'],
                items: [
                    { title: 'SIP и PBX', text: 'Используйте стандартные схемы маршрутизации SIP, PBX, Asterisk, FreePBX и 3CX.' },
                    { title: 'Облачная телефония', text: 'Обсудите конфигурации с такими провайдерами, как Twilio или Vonage.' },
                    { title: 'Входящие и исходящие', text: 'Определите номера, очереди, кампании, резервное поведение и перевод оператору.' },
                ],
            },
            {
                title: 'Подключение CRM и процессов',
                body: ['Предоставьте агенту только те данные и действия, которые нужны для утвержденного разговора.'],
                items: [
                    { title: 'Delta M и карточки CRM', text: 'Читайте разрешенный контекст и возвращайте итог звонка в нужную карточку клиента или лида.' },
                    { title: 'Вебхуки и API', text: 'Обменивайтесь структурированными событиями с расписанием, отчетностью и внутренними сервисами.' },
                    { title: 'Архитектура', text: 'Выберите облако или On-Premise и зафиксируйте аутентификацию, журналирование и границы данных.' },
                ],
            },
        ],
        related: ['features', 'use-cases/banking', 'use-cases/appointment-reminders'],
        cta: {
            title: 'Сопоставьте Syncall с вашим стеком',
            body: 'Расскажите о телефонии, CRM, варианте развертывания и требуемых операциях чтения и записи.',
        },
    },
    'comparisons/vs-aisha': {
        meta: {
            title: 'Syncall и Aisha AI: руководство по выбору',
            description: 'Сравнивайте Syncall и Aisha AI по проверяемым критериям: узбекская речь, развертывание, голоса, языки и внедрение.',
        },
        eyebrow: 'Руководство по сравнению',
        title: 'Syncall и Aisha AI: честная схема сравнения',
        lead: 'Выбирайте по требованиям, которые можно проверить на ваших звонках. Данные конкурента отмечены для проверки, а не придуманы.',
        linkLabel: 'Сравнение Syncall и Aisha AI',
        linkDescription: 'Используйте проверяемые источники для честной оценки обоих решений.',
        sections: [
            {
                title: 'Как провести сравнение',
                body: ['Передайте обоим поставщикам одинаковые записи, сценарий, сочетание языков, описание интеграций и анкету безопасности. Попросите отделить стандартные функции от доработок и сторонних зависимостей.'],
                items: [
                    { title: 'Проверяйте живую речь', text: 'Добавьте диалекты, акценты, шум, перебивания и смешанную речь ваших клиентов.' },
                    { title: 'Проверяйте развертывание', text: 'Запросите архитектурную схему и четкие границы потоков данных.' },
                    { title: 'Сравнивайте одинаково', text: 'Измеряйте те же исходы звонков и разбирайте исключения одной внутренней командой.' },
                ],
            },
        ],
        comparison: {
            title: 'Таблица проверки возможностей',
            caption: 'Данные Syncall соответствуют текущему описанию продукта. Сведения об Aisha AI необходимо подтвердить по актуальной документации поставщика.',
            columns: ['Критерий', 'Syncall', 'Aisha AI'],
            rows: [
                ['Настройка под узбекские диалекты', 'Решение рассчитано на узбекские диалекты и узбекско-русское переключение.', 'Подтвердите диалекты и запросите тест на ваших записях.'],
                ['On-Premise', 'Доступен как вариант после проверки инфраструктуры.', 'Подтвердите варианты развертывания и границы данных.'],
                ['Клонирование голоса', 'Доступно с использованием согласованного исходного голоса.', 'Подтвердите варианты голосов, процедуру согласия и ограничения.'],
                ['Срок внедрения', 'Определяется после анализа телефонии, CRM, безопасности и сценария.', 'Запросите план внедрения по тем же требованиям.'],
                ['Языки', 'Узбекский, русский и английский.', 'На официальной странице указаны узбекский, русский и английский; протестируйте каждый нужный язык.'],
            ],
            note: 'Здесь нет объявленного победителя. На изученной странице Aisha AI также представлены голосовые агенты, аналитика звонков, STT, TTS, чат, круглосуточная работа, высокая параллельность и ответ менее секунды. Мы не считаем их отсутствующими. Заменяйте запросы на проверку только датированными и подтверждаемыми данными.',
        },
        sources: {
            title: 'Источники и дата проверки',
            note: 'Проверено в июле 2026 года. Информация о продукте может измениться; перепроверьте источник перед публикацией или закупкой.',
            links: [
                { label: 'Официальная страница продуктов Aisha AI', href: 'https://aisha.group/ru' },
            ],
        },
        related: ['features', 'integrations', 'comparisons/vapi-alternative'],
        cta: {
            title: 'Сравните решения на своем сценарии',
            body: 'Запросите у Syncall демонстрацию на нужных языках и с учетом ваших систем.',
        },
    },
    'comparisons/vapi-alternative': {
        meta: {
            title: 'Альтернатива Vapi для узбекских AI-агентов | Syncall',
            description: 'Рассмотрите Syncall как управляемую альтернативу Vapi для узбекских и русских звонков, интеграций и On-Premise.',
        },
        eyebrow: 'Оценка альтернативы',
        title: 'Альтернатива Vapi для узбекских и русских голосовых агентов',
        lead: 'Syncall подходит командам, которым нужно управляемое решение для локальных языков вместо самостоятельной сборки и эксплуатации всех голосовых компонентов.',
        linkLabel: 'Альтернатива Vapi для узбекской речи',
        linkDescription: 'Сравните управляемое локальное решение с подходом самостоятельной сборки.',
        sections: [
            {
                title: 'Выбирайте нужную операционную модель',
                body: ['Учитывайте, кто отвечает за качество речи, настройку диалога, телефонию, мониторинг и production-поддержку, а не только за первый прототип.'],
                items: [
                    { title: 'Управляемое внедрение', text: 'Syncall вместе с вашей командой определяет диалог, речевые модели, интеграции и развертывание.' },
                    { title: 'Фокус на локальных языках', text: 'Описание продукта включает узбекские диалекты, смешанную узбекско-русскую речь, русский и английский.' },
                    { title: 'Выбор развертывания', text: 'Обсудите Syncall Cloud или On-Premise исходя из требований к данным.' },
                ],
            },
            {
                title: 'Что проверять у любой платформы',
                body: ['Официальная документация Vapi, изученная в июле 2026 года, описывает входящие и исходящие звонки, интеграции, настраиваемый стек провайдеров и многоязычные процессы через выбранных провайдеров. Изученные страницы не подтверждают сопоставимое с Syncall качество узбекских диалектов или On-Premise, поэтому проверьте эти требования напрямую.'],
                items: [
                    { title: 'Качество речи', text: 'Тестируйте собственные шумные звонки, акценты, перебивания и смешанные языки.' },
                    { title: 'Полная ответственность', text: 'Определите, кто контролирует интеграции, изменения моделей, сбои звонков и качество.' },
                    { title: 'Потоки данных', text: 'Зафиксируйте каждого обработчика, место хранения, срок хранения и ограничения On-Premise.' },
                ],
            },
        ],
        sources: {
            title: 'Источники и дата проверки',
            note: 'Проверено в июле 2026 года. Возможности могут измениться; сверяйтесь с актуальной документацией и договором.',
            links: [
                { label: 'Официальное введение Vapi', href: 'https://docs.vapi.ai/quickstart/introduction' },
                { label: 'Официальное руководство Vapi по многоязычности', href: 'https://docs.vapi.ai/customization/multilingual' },
            ],
        },
        related: ['features', 'integrations', 'comparisons/vs-aisha'],
        cta: {
            title: 'Сравнивайте архитектуру, а не только демо',
            body: 'Разберите целевой процесс с Syncall и определите, что будет управляться, интегрироваться и развертываться.',
        },
    },
    pricing: {
        meta: {
            title: 'Цена AI-агентов и бесплатный пилот | Syncall',
            description: 'Объемная модель цены Syncall: звонки, языки, интеграции, развертывание и индивидуальный бесплатный тест голосового агента.',
        },
        eyebrow: 'Цены',
        title: 'Цена по объему с учетом вашего сценария звонков',
        lead: 'Стоимость зависит от ожидаемого объема звонков и масштаба внедрения, поэтому команда сначала уточняет требования.',
        linkLabel: 'Цена голосовых AI-агентов',
        linkDescription: 'Узнайте, что влияет на цену по объему и условия теста.',
        sections: [
            {
                title: 'Что влияет на предложение',
                body: ['Подготовьте операционные данные, чтобы сопоставить предложение с текущей работой колл-центра.'],
                items: [
                    { title: 'Объем и направление', text: 'Ожидаемый объем в месяц, доля входящих и исходящих, длительность и схема кампаний.' },
                    { title: 'Языки и сценарий', text: 'Нужные языки, сложность диалога, источники знаний и передача оператору.' },
                    { title: 'Системы и развертывание', text: 'Телефония, CRM, нужные действия, облачная или On-Premise архитектура.' },
                ],
            },
            {
                title: 'Начните с индивидуального теста',
                body: ['Текущее предложение — индивидуально обученный AI-агент до 1 000 тестовых звонков. До запуска команда подтверждает сценарий, интеграции, сроки и условия.'],
                items: [
                    { title: 'Определите успех', text: 'Согласуйте наблюдаемые результаты звонков и критерии проверки заранее.' },
                    { title: 'Реалистичные данные', text: 'Используйте настоящие скрипты, языки, акустические условия и вопросы клиентов.' },
                    { title: 'Разберите исключения', text: 'Проверяйте не только успехи, но и неудачные, переданные и незавершенные разговоры.' },
                ],
            },
        ],
        related: ['features', 'integrations', 'use-cases/lead-qualification'],
        cta: {
            title: 'Запросите расчет под ваш сценарий',
            body: 'Подготовьте объем звонков, языки, интеграции и вариант развертывания.',
        },
    },
    about: {
        meta: {
            title: 'О Syncall AI | Команда голосового AI из Ташкента',
            description: 'Syncall — основанная в 2024 году ташкентская компания, которая создает голосовых AI-агентов для узбекского, русского и английского.',
        },
        eyebrow: 'О Syncall',
        title: 'Создаем голосовой AI для речи Центральной Азии',
        lead: 'Syncall — ташкентская компания, основанная в 2024 году и создающая AI-агентов и чат-ботов для колл-центров на узбекском, русском и английском.',
        linkLabel: 'О команде Syncall',
        linkDescription: 'Узнайте о компании и данных о команде, которые еще нужно добавить.',
        sections: [
            {
                title: 'Фокус компании',
                body: ['Команда работает с живыми узбекскими диалектами, узбекско-русским переключением, местными процессами колл-центров и разными вариантами развертывания.'],
                items: [
                    { title: 'Год основания', text: '2024' },
                    { title: 'Местоположение', text: 'Ташкент, Узбекистан' },
                    { title: 'Продукты', text: 'Голосовые AI-агенты, аналитика звонков, речевые API и чат-боты.' },
                ],
            },
            {
                title: 'Команда',
                body: ['До публикации замените данные ниже утвержденными именами, должностями, биографиями и фотографиями.'],
                items: [
                    { title: '{{ИМЯ_УЧАСТНИКА}} — {{РОЛЬ}}', text: 'PLACEHOLDER — нужны утвержденная биография и фотография.', placeholder: true },
                    { title: '{{ИМЯ_УЧАСТНИКА}} — {{РОЛЬ}}', text: 'PLACEHOLDER — нужны утвержденная биография и фотография.', placeholder: true },
                    { title: '{{ИМЯ_УЧАСТНИКА}} — {{РОЛЬ}}', text: 'PLACEHOLDER — нужны утвержденная биография и фотография.', placeholder: true },
                ],
            },
        ],
        related: ['features', 'case-studies', 'use-cases/banking'],
        cta: {
            title: 'Обсудите свой процесс с командой',
            body: 'Расскажите о языках, системах и требованиях к развертыванию.',
        },
    },
    'case-studies': {
        meta: {
            title: 'Кейсы голосовых AI-агентов Syncall',
            description: 'Прозрачный шаблон для утвержденных кейсов Syncall с контекстом внедрения, измеренными результатами и методологией.',
        },
        eyebrow: 'Кейсы',
        title: 'Кейсы внедрения голосовых AI-агентов',
        lead: 'Истории клиентов появятся здесь только после документирования клиента, контекста, измерений и разрешения на публикацию.',
        linkLabel: 'Кейсы клиентов Syncall',
        linkDescription: 'Посмотрите прозрачный шаблон, ожидающий подтвержденных данных.',
        sections: [
            {
                title: 'Истории, ожидающие согласования',
                body: ['Не публикуйте вымышленные логотипы, цитаты и показатели. Карточки явно остаются шаблонами до получения реальных данных.'],
                items: [
                    { title: '{{КЛИЕНТ}} — {{СЦЕНАРИЙ}}', text: 'PLACEHOLDER — нужны согласие клиента, задача, объем внедрения, измеренный результат и методология.', placeholder: true },
                    { title: '{{КЛИЕНТ}} — {{СЦЕНАРИЙ}}', text: 'PLACEHOLDER — нужны согласие клиента, задача, объем внедрения, измеренный результат и методология.', placeholder: true },
                    { title: '{{КЛИЕНТ}} — {{СЦЕНАРИЙ}}', text: 'PLACEHOLDER — нужны согласие клиента, задача, объем внедрения, измеренный результат и методология.', placeholder: true },
                ],
            },
            {
                title: 'Что нужно для каждого опубликованного кейса',
                body: ['Полезный кейс показывает исходную точку, объем, период измерения и ограничения, а не только лучший результат.'],
                items: [
                    { title: 'Клиент и контекст', text: 'Утвержденное имя или анонимизация, отрасль, тип звонков, языки и вариант развертывания.' },
                    { title: 'Методология', text: 'Определение метрики, исходный уровень, выборка, период, исключения и ответственный проверяющий.' },
                    { title: 'Разрешенные материалы', text: 'Согласованная цитата, права на логотип, формулировка результата и дата публикации.' },
                ],
            },
        ],
        related: ['about', 'features', 'use-cases/banking'],
        cta: {
            title: 'Оцените Syncall на собственных данных',
            body: 'Пока кейсы не утверждены, запросите ограниченный тест и заранее согласуйте критерии измерения.',
        },
    },
};

const uz = {
    features: {
        meta: {
            title: 'Call-markazlar uchun AI agent imkoniyatlari | Syncall',
            description: 'Syncall ovozli agentlarining o‘zbek, rus va ingliz tillari, shevalar, tahlil, integratsiya va On-Premise imkoniyatlari.',
        },
        eyebrow: 'Platforma imkoniyatlari',
        title: 'Haqiqiy call-markazlar uchun AI ovozli agent imkoniyatlari',
        lead: 'Syncall nutqni aniqlash, dialog mantig‘i, tabiiy ovoz sintezi, tahlil va integratsiyalarni bitta boshqariladigan jarayonda birlashtiradi.',
        linkLabel: 'AI ovozli agent imkoniyatlari',
        linkDescription: 'Nutq, joylashtirish, tahlil va integratsiyalar birga qanday ishlashini ko‘ring.',
        sections: [
            {
                title: 'Mijozlarning jonli nutqini tushunish',
                body: ['Ovozli tizim o‘zbek shevalari, rus tili va o‘zbek-rus til almashinuvi, jumladan so‘zlashuv iboralari, sleng va aksentlar uchun yaratilgan.'],
                items: [
                    { title: 'Tabiiy navbat almashinuvi', text: 'Mijoz agentning gapini bo‘lishi mumkin: agent to‘xtaydi, tinglaydi va yangi kontekst bilan davom etadi.' },
                    { title: 'Shovqinli qo‘ng‘iroqlar', text: 'Ovozni ajratish odatiy fon shovqinidan mijoz nutqini ajratishga yordam beradi.' },
                    { title: 'Brend ovozi', text: 'Ovozni klonlash imkoniyati tasdiqlangan kompaniya ovozini barcha qo‘ng‘iroqlarda qo‘llashga yordam beradi.' },
                ],
            },
            {
                title: 'Ma’lumot talablariga mos joylashtirish',
                body: ['Tizimni Syncall Cloud’da ishga tushiring yoki qat’iy infratuzilma va ma’lumotlarni saqlash talablari uchun On-Premise joylashtirishni muhokama qiling.'],
                items: [
                    { title: 'Kiruvchi va chiquvchi', text: 'Yordam, eslatma, saralash, so‘rov va aloqa kampaniyalari uchun bitta platformadan foydalaning.' },
                    { title: 'Bog‘langan jarayonlar', text: 'Telefoniya, CRM va webhook orqali ruxsat etilgan ma’lumotlarni o‘qing va yangilang.' },
                    { title: 'Qo‘ng‘iroq tahlili', text: 'Tekshiruv va hisobot uchun transkript, natija va tuzilgan qo‘ng‘iroq ma’lumotlarini saqlang.' },
                ],
            },
        ],
        related: ['integrations', 'use-cases/banking', 'pricing'],
        cta: {
            title: 'Syncall’ni o‘z qo‘ng‘iroq ssenariyingizda sinang',
            body: 'Namunaviy jarayon, tillar aralashmasi va joylashtirish talablarini jamoa bilan baham ko‘ring.',
        },
    },
    'use-cases/banking': {
        meta: {
            title: 'Banklar uchun On-Premise AI ovozli agentlar | Syncall',
            description: 'Bank serverlarida ishlashi mumkin bo‘lgan, ma’lumot nazorati va o‘zbek-rus qo‘ng‘iroqlari uchun yaratilgan call-markaz AI tizimi.',
        },
        eyebrow: 'Foydalanish · Banklar',
        title: 'Banklar uchun On-Premise AI ovozli agentlar',
        lead: 'Tasdiqlangan mijoz suhbatlarini avtomatlashtiring va joylashtirish, kirish hamda ma’lumotlarni qayta ishlashni bank siyosatiga mos tuting.',
        linkLabel: 'Banklar uchun AI ovozli agentlar',
        linkDescription: 'On-Premise va bank qo‘ng‘iroq jarayonlarini ko‘rib chiqing.',
        sections: [
            {
                title: 'Nazorat qilinadigan muhit uchun',
                body: ['Syncall bulutda yoki lokal tarzda joylashtirilishi mumkin, shunda audio, transkript va integratsiyalar bank xavfsizlik arxitekturasiga mos keladi.'],
                items: [
                    { title: 'Ma’lumot chegaralari', text: 'Qo‘ng‘iroq ma’lumotlari qayerda qayta ishlanishi, saqlanishi va qaysi tizimlarga berilishini belgilang.' },
                    { title: 'Nazoratli integratsiyalar', text: 'Telefoniya va ichki tizimlarni cheklangan API yoki webhook orqali ulang.' },
                    { title: 'Til qamrovi', text: 'Mijozlarga o‘zbek, rus va ingliz tillarida, jumladan aralash o‘zbek-rus nutqida xizmat ko‘rsating.' },
                ],
            },
            {
                title: 'Amaliy bank jarayonlari',
                body: ['Aniq chegaralangan jarayon va eskalatsiya qoidalaridan boshlang, so‘ng uni bank komplayens va xizmat standartlari bo‘yicha tekshiring.'],
                items: [
                    { title: 'To‘lov eslatmalari', text: 'Tasdiqlangan eslatmalarni yetkazing va asosiy bank jarayonini o‘zgartirmasdan natijani qayd eting.' },
                    { title: 'Mahsulot savollari', text: 'Nazorat qilinadigan bilim manbasidan omonat, kredit yoki xizmat bosqichlari bo‘yicha tasdiqlangan savollarga javob bering.' },
                    { title: 'Operatorga o‘tkazish', text: 'Istisno va nozik suhbatlarni kelishilgan qoidalar bo‘yicha tegishli jamoaga yo‘naltiring.' },
                ],
            },
        ],
        related: ['features', 'integrations', 'use-cases/debt-collection'],
        cta: {
            title: 'Bank uchun joylashtirishni muhokama qiling',
            body: 'Xavfsizlik, telefoniya va jarayon talablarini texnik uchrashuvga olib keling.',
        },
    },
    'use-cases/debt-collection': {
        meta: {
            title: 'Qarzdorlik qo‘ng‘iroqlari uchun AI agentlar | Syncall',
            description: 'Tasdiqlangan to‘lov eslatmalari, tuzilgan natijalar va operatorga o‘tkazish uchun ko‘p tilli AI ovozli agentlar.',
        },
        eyebrow: 'Foydalanish · Qarzdorlik',
        title: 'Tartibli qarzdorlik qo‘ng‘iroqlari uchun AI agentlar',
        lead: 'Ssenariy, eskalatsiya va natijalarni nazorat qilgan holda o‘zbek va rus tillaridagi tasdiqlangan eslatma jarayonlarini qo‘llab-quvvatlang.',
        linkLabel: 'Qarzdorlik uchun AI ovozli agentlar',
        linkDescription: 'Nazoratli eslatmalar, natijalar va operatorga o‘tkazishni ko‘ring.',
        sections: [
            {
                title: 'Suhbatni tasdiqlangan jarayon doirasida olib boring',
                body: ['Agentni tekshirilgan ssenariy, ruxsat etilgan ma’lumotlar, aloqa siyosati va operatorga o‘tkazish qoidalari asosida sozlang.'],
                items: [
                    { title: 'Shaxs va kontekst', text: 'Faqat ulangan tizim berishga vakolatli bo‘lgan mijoz ma’lumotlaridan foydalaning.' },
                    { title: 'Tuzilgan natijalar', text: 'Bog‘lanildi, qayta qo‘ng‘iroq so‘raldi yoki xodim yordami kerak kabi holatlarni qayd eting.' },
                    { title: 'Eskalatsiya', text: 'Nizo, istisno va nozik holatlarni malakali xodimlarga o‘tkazing.' },
                ],
            },
            {
                title: 'Mijoz tilida gaplashing',
                body: ['Mijozni qat’iy ovozli menyuga majburlamasdan o‘zbek, rus va aralash nutqni qo‘llab-quvvatlang.'],
                items: [
                    { title: 'Kiruvchi savollar', text: 'Mijozga eslatma davomida javob berish va tasdiqlangan savollarni so‘rash imkonini bering.' },
                    { title: 'Chiquvchi aloqa', text: 'Qo‘ng‘iroqlarni mavjud kampaniya va telefoniya jarayoni orqali rejalashtiring.' },
                    { title: 'Tekshiruv yozuvlari', text: 'Sozlangan joylarda vakolatli jamoaga transkript va tuzilgan natijalarni taqdim eting.' },
                ],
            },
        ],
        related: ['use-cases/banking', 'integrations', 'features'],
        cta: {
            title: 'Tasdiqlangan qarzdorlik jarayonini tuzing',
            body: 'Pilotdan oldin ssenariy, tillar, eskalatsiya va tizim chegaralarini muhokama qiling.',
        },
    },
    'use-cases/appointment-reminders': {
        meta: {
            title: 'AI orqali uchrashuv eslatma qo‘ng‘iroqlari | Syncall',
            description: 'Ko‘p tilli uchrashuv eslatmalari, tasdiqlash, vaqtni o‘zgartirish so‘rovi va operatorga o‘tkazishni avtomatlashtiring.',
        },
        eyebrow: 'Foydalanish · Uchrashuv eslatmalari',
        title: 'Javobni tushunadigan AI uchrashuv eslatmalari',
        lead: 'Bir tomonlama xabardan dialogga o‘ting: agent tasdiqlangan eslatmani aytadi, javobni tushunadi va natijani jarayoningizga qaytaradi.',
        linkLabel: 'AI uchrashuv eslatmalari',
        linkDescription: 'Tasdiqlash, vaqtni o‘zgartirish va keyingi ishlarni avtomatlashtiring.',
        sections: [
            {
                title: 'Eslatmani tugallangan jarayon bosqichiga aylantiring',
                body: ['Agentni kerakli jadval ma’lumotlariga ulang va jamoa ishlata oladigan natijalarni belgilang.'],
                items: [
                    { title: 'Qatnashishni tasdiqlash', text: 'Uchrashuv yoki mijoz yozuvida aniq tasdiqni qayd eting.' },
                    { title: 'Vaqtni o‘zgartirish', text: 'Kerakli keyingi qadamni yig‘ib, jadval jamoasi yoki ulangan tizimga yuboring.' },
                    { title: 'Javob bo‘lmasa', text: 'Keyingi tasdiqlangan harakat uchun qo‘ng‘iroq holatini kampaniya jarayoniga qaytaring.' },
                ],
            },
            {
                title: 'Eslatmani xizmatingizga moslang',
                body: ['Tibbiyot, xizmatlar, yetkazib berish va boshqa rejalashtirilgan aloqalar uchun tasdiqlangan matn, vaqt va eskalatsiya qoidalarini ishlating.'],
                items: [
                    { title: 'Ko‘p tilli suhbat', text: 'Mijoz tanloviga qarab o‘zbek, rus yoki ingliz tilida qo‘ng‘iroq qiling.' },
                    { title: 'Tabiiy savollar', text: 'Mijoz agentni to‘xtatib, tasdiqlangan ssenariy doirasida savol berishi mumkin.' },
                    { title: 'Xodim yordami', text: 'Avtomatlashtirilgan doiradan tashqaridagi so‘rovlarni kerakli mutaxassisga yo‘naltiring.' },
                ],
            },
        ],
        related: ['integrations', 'use-cases/surveys', 'pricing'],
        cta: {
            title: 'Haqiqiy jadval jarayonida pilot qiling',
            body: 'Uchrashuvlar tizimga qanday kirishi va qaysi natijalar qaytishi kerakligini ko‘rsating.',
        },
    },
    'use-cases/surveys': {
        meta: {
            title: 'O‘zbek va rus tillarida AI ovozli so‘rovlar | Syncall',
            description: 'Tasdiqlangan savol tarmoqlari, ochiq javoblar, tuzilgan natijalar va CRM yoki webhook bilan ko‘p tilli ovozli so‘rovlar.',
        },
        eyebrow: 'Foydalanish · So‘rovlar',
        title: 'O‘zbek va rus auditoriyasi uchun AI ovozli so‘rovlar',
        lead: 'Mavjud hisobot jarayoningizga ulangan suhbat orqali tuzilgan javoblar va tabiiy fikrlarni yig‘ing.',
        linkLabel: 'AI ovozli so‘rovlar',
        linkDescription: 'Ko‘p tilli fikr va tuzilgan so‘rov natijalarini yig‘ing.',
        sections: [
            {
                title: 'Savolnomani izchil saqlang',
                body: ['Ishga tushirishdan oldin savollar tartibi, tarmoqlanish, majburiy bildirish va yakun holatlarini belgilang.'],
                items: [
                    { title: 'Tarmoqlanuvchi savollar', text: 'Ishtirokchi javobiga qarab keyingi tasdiqlangan savolni tanlang.' },
                    { title: 'Ochiq fikr', text: 'Tabiiy tildagi javoblarni tuzilgan maydonlar bilan birga saqlang.' },
                    { title: 'Aniq holatlar', text: 'Tugallangan, qisman, rad etilgan va bog‘lanilmagan natijalarni ajrating.' },
                ],
            },
            {
                title: 'Natijalarni ishlatadigan tizimlarga yuboring',
                body: ['Ruxsat etilgan so‘rov maydonlari, transkript yoki xulosalarni CRM, hisobot manzili yoki webhook jarayoniga yuboring.'],
                items: [
                    { title: 'Til tanlovi', text: 'Har auditoriya uchun tekshirilgan ssenariy bilan o‘zbek, rus yoki ingliz tilida so‘rov o‘tkazing.' },
                    { title: 'Qo‘ng‘iroq tekshiruvi', text: 'Sozlangan yozuvlarni sifat nazorati uchun vakolatli jamoaga taqdim eting.' },
                    { title: 'Keyingi aloqa', text: 'Javob talab qiladigan so‘rovlarni mas’ul jamoaga yo‘naltiring.' },
                ],
            },
        ],
        related: ['use-cases/lead-qualification', 'integrations', 'features'],
        cta: {
            title: 'Savolnomani ovozli jarayonga aylantiring',
            body: 'Savol tarmoqlari, maqsadli tillar va kerakli natija formatini yuboring.',
        },
    },
    'use-cases/lead-qualification': {
        meta: {
            title: 'Lidlarni saralash uchun AI ovozli agentlar | Syncall',
            description: 'Lidlarni o‘zbek, rus va ingliz tillarida saralang, so‘ng tuzilgan kontekstni CRM va webhook orqali savdo jamoasiga yuboring.',
        },
        eyebrow: 'Foydalanish · Lidlarni saralash',
        title: 'Lidlarni izchil saralash uchun AI ovozli agentlar',
        lead: 'Tasdiqlangan aniqlashtiruvchi savollarni bering, tuzilgan kontekstni yig‘ing va asossiz va’dalarsiz mos suhbatlarni savdoga yo‘naltiring.',
        linkLabel: 'Lidlarni saralash AI agentlari',
        linkDescription: 'Savollar va savdoga topshiriladigan kontekstni standartlashtiring.',
        sections: [
            {
                title: 'Haqiqiy savdo jarayoningiz bo‘yicha saralang',
                body: ['Suhbatni savdo jamoangiz ishlatadigan maydon va qoidalar atrofida tuzing.'],
                items: [
                    { title: 'Tasdiqlangan aniqlashtirish', text: 'Jamoa belgilagan ehtiyoj, muddat, hudud yoki boshqa mezonlar haqida so‘rang.' },
                    { title: 'Tuzilgan topshirish', text: 'Javoblar va qo‘ng‘iroq natijasini ulangan lid yozuviga yuboring.' },
                    { title: 'Aniq chegaralar', text: 'Narx, shartnoma yoki maxsus savollarni agent doirasidan tashqarida mutaxassisga o‘tkazing.' },
                ],
            },
            {
                title: 'Kiruvchi va chiquvchi talabni qo‘llab-quvvatlang',
                body: ['Mijoz o‘zi qo‘ng‘iroq qilsa ham, tasdiqlangan kampaniya unga qo‘ng‘iroq qilsa ham bir xil jarayondan foydalaning.'],
                items: [
                    { title: 'Mahalliy tildagi suhbat', text: 'Lidlar bilan o‘zbek, rus yoki ingliz tilida, jumladan aralash o‘zbek-rus nutqida gaplashing.' },
                    { title: 'CRM konteksti', text: 'Mijoz avval bergan ma’lumotni qayta so‘ramaslik uchun ruxsat etilgan maydonlardan foydalaning.' },
                    { title: 'Keyingi qadam', text: 'Savdo qoidalari va integratsiyaga qarab lidni o‘tkazing, rejalashtiring yoki navbatga qo‘ying.' },
                ],
            },
        ],
        related: ['integrations', 'use-cases/surveys', 'pricing'],
        cta: {
            title: 'Savdo jamoasi bilan saralash jarayonini tuzing',
            body: 'Joriy jarayondagi savollar, yo‘naltirish qoidalari va CRM maydonlarini tayyorlang.',
        },
    },
    integrations: {
        meta: {
            title: 'Telefoniya va CRM integratsiyalari | Syncall',
            description: 'Syncall’ni SIP/PBX, Asterisk, FreePBX, 3CX, bulut telefoniya, Delta M, API va webhook bilan ulang.',
        },
        eyebrow: 'Integratsiyalar',
        title: 'AI ovozli agentlarni telefoniya va CRM’ga ulang',
        lead: 'Syncall qo‘ng‘iroqlarni yo‘naltiradigan, mijoz kontekstini saqlaydigan va operatsion natijalarni qabul qiladigan mavjud tizimlar bilan ishlaydi.',
        linkLabel: 'Telefoniya va CRM integratsiyalari',
        linkDescription: 'Qo‘ng‘iroq va mijoz ma’lumotlarini ulash usullarini ko‘rib chiqing.',
        sections: [
            {
                title: 'Telefoniya ulanishlari',
                body: ['Integratsiya hajmi provayder, tarmoq, yo‘naltirish qoidalari va xavfsizlik talablariga qarab tasdiqlanadi.'],
                items: [
                    { title: 'SIP va PBX', text: 'SIP, PBX, Asterisk, FreePBX va 3CX muhitlaridagi standart qo‘ng‘iroq yo‘naltirish usullaridan foydalaning.' },
                    { title: 'Bulut telefoniya', text: 'Twilio yoki Vonage kabi provayderlar ishtirokidagi konfiguratsiyani muhokama qiling.' },
                    { title: 'Kiruvchi va chiquvchi yo‘nalishlar', text: 'Raqamlar, navbatlar, kampaniyalar, zaxira holati va operatorga o‘tkazishni belgilang.' },
                ],
            },
            {
                title: 'CRM va jarayon ulanishlari',
                body: ['Agentga faqat tasdiqlangan suhbat uchun kerak bo‘lgan ma’lumot va amallarni bering.'],
                items: [
                    { title: 'Delta M va CRM yozuvlari', text: 'Ruxsat etilgan kontekstni o‘qing va natijani tegishli mijoz yoki lid yozuviga qaytaring.' },
                    { title: 'Webhook va API', text: 'Jadval, hisobot va ichki xizmatlar bilan tuzilgan hodisalarni almashing.' },
                    { title: 'Joylashtirish ko‘rigi', text: 'Cloud yoki On-Premise’ni tanlang va autentifikatsiya, loglar hamda ma’lumot chegaralarini hujjatlashtiring.' },
                ],
            },
        ],
        related: ['features', 'use-cases/banking', 'use-cases/appointment-reminders'],
        cta: {
            title: 'Syncall’ni mavjud texnologiyalaringizga moslang',
            body: 'Telefoniya, CRM, joylashtirish turi va kerakli o‘qish-yozish amallarini yuboring.',
        },
    },
    'comparisons/vs-aisha': {
        meta: {
            title: 'Syncall va Aisha AI: xolis baholash qo‘llanmasi',
            description: 'Syncall va Aisha AI’ni o‘zbek nutqi, joylashtirish, ovoz, tillar va joriy etish bo‘yicha tekshiriladigan mezonlarda solishtiring.',
        },
        eyebrow: 'Taqqoslash qo‘llanmasi',
        title: 'Syncall va Aisha AI: xolis baholash usuli',
        lead: 'O‘z qo‘ng‘iroqlaringizda tekshirish mumkin bo‘lgan talablar asosida tanlang. Raqobatchi tafsilotlari taxmin qilinmaydi, tekshirish uchun belgilanadi.',
        linkLabel: 'Syncall va Aisha AI taqqoslovi',
        linkDescription: 'Har ikki yechimni manbaga tayangan holda xolis baholang.',
        sections: [
            {
                title: 'Taqqoslashni qanday o‘tkazish kerak',
                body: ['Har ikki yetkazib beruvchiga bir xil audio, ssenariy, tillar aralashmasi, integratsiya talabi va xavfsizlik savollarini bering. Standart, maxsus va uchinchi tomonga bog‘liq qismlarni ajratishni so‘rang.'],
                items: [
                    { title: 'Jonli nutqni sinang', text: 'Mijozlaringiz ishlatadigan sheva, aksent, shovqin, gapni bo‘lish va aralash nutqni kiriting.' },
                    { title: 'Joylashtirishni tekshiring', text: 'Arxitektura chizmasi va aniq ma’lumot oqimi chegaralarini so‘rang.' },
                    { title: 'Bir xil mezonda solishtiring', text: 'Bir xil qo‘ng‘iroq natijalarini o‘lchang va istisnolarni bitta ichki jamoa bilan tekshiring.' },
                ],
            },
        ],
        comparison: {
            title: 'Imkoniyatlarni tekshirish jadvali',
            caption: 'Syncall ma’lumoti joriy mahsulot tavsifiga asoslangan. Aisha AI ustunini nashr yoki xariddan oldin amaldagi hujjatlar bilan tasdiqlash kerak.',
            columns: ['Baholash mezoni', 'Syncall', 'Aisha AI'],
            rows: [
                ['O‘zbek shevalariga moslash', 'O‘zbek shevalari va o‘zbek-rus til almashinuvi uchun yaratilgan.', 'Qo‘llanadigan shevalarni tasdiqlang va o‘z yozuvlaringizda sinov so‘rang.'],
                ['On-Premise', 'Infratuzilma ko‘rigidan so‘ng joylashtirish varianti sifatida mavjud.', 'Amaldagi joylashtirish turlari va ma’lumot chegaralarini tasdiqlang.'],
                ['Ovozni klonlash', 'Tasdiqlangan manba ovozi bilan mavjud.', 'Ovoz variantlari, rozilik jarayoni va cheklovlarni tasdiqlang.'],
                ['Joriy etish muddati', 'Telefoniya, CRM, xavfsizlik va ssenariy hajmidan so‘ng belgilanadi.', 'Xuddi shu talablar asosida aniq joriy etish rejasini so‘rang.'],
                ['Tillar', 'O‘zbek, rus va ingliz.', 'Rasmiy mahsulot sahifasida o‘zbek, rus va ingliz tillari ko‘rsatilgan; kerakli har bir tilni sinang.'],
            ],
            note: 'Bu yerda g‘olib e’lon qilinmaydi. Ko‘rilgan Aisha AI sahifasida ovozli agentlar, qo‘ng‘iroq tahlili, STT, TTS, chat, uzluksiz ishlash, yuqori parallel yuklama va bir soniyadan tez javob ham keltirilgan. Bular yo‘q deb hisoblanmagan. Tekshirish so‘rovlarini faqat sanasi va manbasi ko‘rsatilgan dalil bilan almashtiring.',
        },
        sources: {
            title: 'Manbalar va tekshirish sanasi',
            note: '2026-yil iyulda tekshirilgan. Mahsulot ma’lumoti o‘zgarishi mumkin; nashr yoki xariddan oldin manbani qayta ko‘ring.',
            links: [
                { label: 'Aisha AI rasmiy mahsulot sahifasi', href: 'https://aisha.group/ru' },
            ],
        },
        related: ['features', 'integrations', 'comparisons/vapi-alternative'],
        cta: {
            title: 'Yechimlarni o‘z ssenariyingizda solishtiring',
            body: 'Kerakli tillar va tizimlar bilan Syncall’dan aniq demo so‘rang.',
        },
    },
    'comparisons/vapi-alternative': {
        meta: {
            title: 'O‘zbek ovozli agentlari uchun Vapi muqobili | Syncall',
            description: 'Syncall’ni o‘zbek va rus call-markaz jarayonlari, integratsiyalar va On-Premise uchun boshqariladigan Vapi muqobili sifatida baholang.',
        },
        eyebrow: 'Muqobilni baholash',
        title: 'O‘zbek va rus ovozli agentlari uchun Vapi muqobili',
        lead: 'Syncall har bir ovoz komponentini mustaqil yig‘ish va boshqarish o‘rniga mahalliy tillar uchun boshqariladigan call-markaz yechimini istagan jamoalar uchun yaratilgan.',
        linkLabel: 'O‘zbek ovozli agentlari uchun Vapi muqobili',
        linkDescription: 'Boshqariladigan mahalliy yechimni mustaqil yig‘ish yondashuvi bilan solishtiring.',
        sections: [
            {
                title: 'Kerakli boshqaruv modelini tanlang',
                body: ['Faqat ilk prototipni emas, nutq sifati, dialog sozlamasi, telefoniya, monitoring va production yordami uchun kim javob berishini hisobga oling.'],
                items: [
                    { title: 'Boshqariladigan joriy etish', text: 'Syncall jamoangiz bilan dialog, nutq modellari, integratsiyalar va joylashtirishni rejalashtiradi.' },
                    { title: 'Mahalliy til yo‘nalishi', text: 'Mahsulot tavsifi o‘zbek shevalari, aralash o‘zbek-rus nutqi, rus va ingliz tillarini qamrab oladi.' },
                    { title: 'Joylashtirish tanlovi', text: 'Ma’lumot talablariga qarab Syncall Cloud yoki On-Premise arxitekturani muhokama qiling.' },
                ],
            },
            {
                title: 'Har bir platformada tekshiriladigan savollar',
                body: ['2026-yil iyulda ko‘rilgan Vapi rasmiy hujjatlarida kiruvchi va chiquvchi qo‘ng‘iroqlar, integratsiyalar, sozlanadigan provayderlar to‘plami va tanlangan provayderlar orqali ko‘p tilli jarayonlar tasvirlangan. Ko‘rilgan sahifalar Syncall darajasidagi o‘zbek shevalari sifatini yoki On-Premise joylashtirishni tasdiqlamaydi, shu sabab bu talablarni bevosita sinab, aniqlashtiring.'],
                items: [
                    { title: 'Nutq sifati', text: 'O‘z shovqinli qo‘ng‘iroqlaringiz, aksent, gapni bo‘lish va aralash tillarni sinang.' },
                    { title: 'To‘liq mas’uliyat', text: 'Integratsiya, model o‘zgarishi, qo‘ng‘iroq xatosi va sifatni kim kuzatishini belgilang.' },
                    { title: 'Ma’lumot oqimi', text: 'Har bir qayta ishlovchi, saqlash joyi, saqlash muddati va On-Premise cheklovini hujjatlashtiring.' },
                ],
            },
        ],
        sources: {
            title: 'Manbalar va tekshirish sanasi',
            note: '2026-yil iyulda tekshirilgan. Imkoniyatlar o‘zgarishi mumkin; joriy hujjat va shartnomani tekshiring.',
            links: [
                { label: 'Vapi rasmiy kirish qo‘llanmasi', href: 'https://docs.vapi.ai/quickstart/introduction' },
                { label: 'Vapi rasmiy ko‘p tillilik qo‘llanmasi', href: 'https://docs.vapi.ai/customization/multilingual' },
            ],
        },
        related: ['features', 'integrations', 'comparisons/vs-aisha'],
        cta: {
            title: 'Faqat demoni emas, arxitekturani solishtiring',
            body: 'Maqsadli jarayonni Syncall bilan ko‘rib chiqing va nima boshqarilishi, integratsiya qilinishi hamda joylashtirilishini aniqlang.',
        },
    },
    pricing: {
        meta: {
            title: 'AI ovozli agent narxi va bepul sinov | Syncall',
            description: 'Syncall AI ovozli agentlari uchun hajmga asoslangan narx: qo‘ng‘iroq, til, integratsiya, joylashtirish va maxsus bepul sinov.',
        },
        eyebrow: 'Narxlar',
        title: 'Qo‘ng‘iroq jarayoningizga mos hajm asosidagi narx',
        lead: 'Narx kutilayotgan qo‘ng‘iroq hajmi va joriy etish doirasiga bog‘liq, shuning uchun jamoa tijoriy taklifdan oldin talablarni tasdiqlaydi.',
        linkLabel: 'AI ovozli agent narxlari',
        linkDescription: 'Hajmga asoslangan narx va sinovga ta’sir qiladigan omillarni biling.',
        sections: [
            {
                title: 'Taklifga nimalar ta’sir qiladi',
                body: ['Taklifni joriy call-markaz jarayoni bilan solishtirish uchun yetarli operatsion ma’lumot bering.'],
                items: [
                    { title: 'Hajm va yo‘nalish', text: 'Kutilgan oylik hajm, kiruvchi va chiquvchi ulushi, davomiylik va kampaniya tartibi.' },
                    { title: 'Tillar va ssenariy', text: 'Kerakli tillar, dialog murakkabligi, bilim manbalari va operatorga o‘tkazish.' },
                    { title: 'Tizim va joylashtirish', text: 'Telefoniya, CRM, kerakli amallar hamda Cloud yoki On-Premise arxitektura.' },
                ],
            },
            {
                title: 'Maxsus tayyorlangan sinovdan boshlang',
                body: ['Joriy taklif — 1 000 tagacha sinov qo‘ng‘irog‘i uchun maxsus AI agent. Jamoa ishga tushirishdan oldin ssenariy, integratsiya doirasi, muddat va shartlarni tasdiqlaydi.'],
                items: [
                    { title: 'Muvaffaqiyatni belgilang', text: 'Birinchi qo‘ng‘iroqdan oldin kuzatiladigan natijalar va tekshiruv mezonlarini kelishib oling.' },
                    { title: 'Haqiqiy kirishlar', text: 'Amaliy ssenariy, tillar aralashmasi, audio sharoiti va mijoz savollaridan foydalaning.' },
                    { title: 'Istisnolarni tekshiring', text: 'Muvaffaqiyatli suhbatlar bilan birga xato, eskalatsiya va tugallanmagan holatlarni ham ko‘ring.' },
                ],
            },
        ],
        related: ['features', 'integrations', 'use-cases/lead-qualification'],
        cta: {
            title: 'Ssenariyingiz uchun narx muhokamasini so‘rang',
            body: 'Oylik qo‘ng‘iroq hajmi, tillar, integratsiyalar va joylashtirish tanlovini tayyorlang.',
        },
    },
    about: {
        meta: {
            title: 'Syncall AI haqida | Toshkentdagi ovozli AI jamoasi',
            description: 'Syncall — 2024-yilda tashkil etilgan, o‘zbek, rus va ingliz call-markaz avtomatizatsiyasiga ixtisoslashgan Toshkent kompaniyasi.',
        },
        eyebrow: 'Syncall haqida',
        title: 'Markaziy Osiyo nutqi uchun ovozli AI yaratamiz',
        lead: 'Syncall — 2024-yilda tashkil etilgan Toshkent kompaniyasi bo‘lib, o‘zbek, rus va ingliz tillarida call-markazlar uchun AI ovozli agentlar va chatbotlar yaratadi.',
        linkLabel: 'Syncall jamoasi haqida',
        linkDescription: 'Kompaniya va hali qo‘shilishi kerak bo‘lgan jamoa ma’lumotlarini ko‘ring.',
        sections: [
            {
                title: 'Kompaniya yo‘nalishi',
                body: ['Jamoa jonli o‘zbek shevalari, o‘zbek-rus til almashinuvi, mahalliy call-markaz jarayonlari va turli infratuzilma talablari uchun joylashtirish variantlariga e’tibor qaratadi.'],
                items: [
                    { title: 'Tashkil etilgan', text: '2024' },
                    { title: 'Joylashuv', text: 'Toshkent, O‘zbekiston' },
                    { title: 'Mahsulotlar', text: 'AI ovozli agentlar, qo‘ng‘iroq tahlili, nutq API’lari va chatbotlar.' },
                ],
            },
            {
                title: 'Jamoa bilan tanishing',
                body: ['Nashrdan oldin quyidagi ma’lumotlarni tasdiqlangan ism, lavozim, tarjimai hol va suratlar bilan almashtirish kerak.'],
                items: [
                    { title: '{{JAMOA_A’ZOSI}} — {{LAVOZIM}}', text: 'PLACEHOLDER — tasdiqlangan tarjimai hol va surat kerak.', placeholder: true },
                    { title: '{{JAMOA_A’ZOSI}} — {{LAVOZIM}}', text: 'PLACEHOLDER — tasdiqlangan tarjimai hol va surat kerak.', placeholder: true },
                    { title: '{{JAMOA_A’ZOSI}} — {{LAVOZIM}}', text: 'PLACEHOLDER — tasdiqlangan tarjimai hol va surat kerak.', placeholder: true },
                ],
            },
        ],
        related: ['features', 'case-studies', 'use-cases/banking'],
        cta: {
            title: 'Qo‘ng‘iroq jarayoningizni jamoa bilan muhokama qiling',
            body: 'Loyihangizdagi tillar, tizimlar va joylashtirish talablarini yuboring.',
        },
    },
    'case-studies': {
        meta: {
            title: 'Syncall AI ovozli agent mijoz tajribalari',
            description: 'Tasdiqlangan Syncall mijoz hikoyalari, joriy etish konteksti, o‘lchangan natijalar va metodologiya uchun ochiq shablon.',
        },
        eyebrow: 'Mijoz tajribalari',
        title: 'AI ovozli agentlarni joriy etish tajribalari',
        lead: 'Mijoz, joriy etish konteksti, o‘lchov va nashr ruxsati hujjatlashtirilgandan keyingina hikoyalar shu yerda paydo bo‘ladi.',
        linkLabel: 'Syncall mijoz tajribalari',
        linkDescription: 'Tasdiqlangan dalillarni kutayotgan ochiq shablonni ko‘ring.',
        sections: [
            {
                title: 'Tasdiqni kutayotgan mijoz hikoyalari',
                body: ['Uydirma logotip, iqtibos yoki ko‘rsatkich nashr qilmang. Har bir karta haqiqiy dalil kelguncha placeholder sifatida aniq belgilangan.'],
                items: [
                    { title: '{{MIJOZ_NOMI}} — {{SSENARIY}}', text: 'PLACEHOLDER — mijoz roziligi, vazifa, joriy etish doirasi, o‘lchangan natija va metodologiya kerak.', placeholder: true },
                    { title: '{{MIJOZ_NOMI}} — {{SSENARIY}}', text: 'PLACEHOLDER — mijoz roziligi, vazifa, joriy etish doirasi, o‘lchangan natija va metodologiya kerak.', placeholder: true },
                    { title: '{{MIJOZ_NOMI}} — {{SSENARIY}}', text: 'PLACEHOLDER — mijoz roziligi, vazifa, joriy etish doirasi, o‘lchangan natija va metodologiya kerak.', placeholder: true },
                ],
            },
            {
                title: 'Har bir nashr etiladigan tajriba uchun dalil',
                body: ['Foydali tajriba faqat eng yaxshi natijani emas, boshlang‘ich holat, doira, o‘lchash davri va cheklovlarni ham tushuntiradi.'],
                items: [
                    { title: 'Mijoz va kontekst', text: 'Tasdiqlangan nom yoki anonimlik, soha, qo‘ng‘iroq turi, tillar va joylashtirish modeli.' },
                    { title: 'Metodologiya', text: 'Ko‘rsatkich ta’rifi, boshlang‘ich daraja, namuna, davr, istisnolar va mas’ul tekshiruvchi.' },
                    { title: 'Tasdiqlangan isbot', text: 'Mijoz tasdiqlagan iqtibos, logotip huquqi, natija matni va nashr sanasi.' },
                ],
            },
        ],
        related: ['about', 'features', 'use-cases/banking'],
        cta: {
            title: 'Syncall’ni o‘z dalillaringiz bilan baholang',
            body: 'Tasdiqlangan tajribalar tayyor bo‘lguncha, aniq doiradagi sinovni so‘rang va o‘lchash mezonlarini oldindan kelishing.',
        },
    },
};

export const marketingContent = { en, ru, uz };

export function normalizeMarketingPath(path = '') {
    const pathname = String(path).split(/[?#]/, 1)[0];
    return pathname.replace(/^\/+|\/+$/g, '');
}

export function withLocalePath(path, locale = 'en') {
    const safeLocale = MARKETING_LOCALES.includes(locale) ? locale : 'en';
    const normalized = normalizeMarketingPath(path).replace(/^(en|ru|uz)(?:\/|$)/, '');
    const suffix = normalized ? `/${normalized}` : '/';
    return safeLocale === 'en' ? suffix : `/${safeLocale}${suffix}`;
}

export function resolveMarketingPage(path, locale) {
    const normalized = normalizeMarketingPath(path);
    const segments = normalized.split('/').filter(Boolean);
    const pathLocale = MARKETING_LOCALES.includes(segments[0]) ? segments.shift() : null;
    const safeLocale = MARKETING_LOCALES.includes(locale) ? locale : (pathLocale || 'en');
    const pagePath = segments.join('/');
    const page = marketingContent[safeLocale]?.[pagePath] || null;

    return {
        locale: safeLocale,
        path: pagePath,
        page,
        ui: marketingUi[safeLocale],
    };
}

export function getRelatedMarketingPages(page, locale = 'en') {
    if (!page) return [];

    return page.related
        .map((path) => {
            const relatedPage = marketingContent[locale]?.[path];
            if (!relatedPage) return null;
            return {
                path,
                href: withLocalePath(path, locale),
                label: relatedPage.linkLabel,
                description: relatedPage.linkDescription,
            };
        })
        .filter(Boolean);
}
