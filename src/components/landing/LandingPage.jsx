import { useEffect, useId, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, AudioLines, BarChart3, Check, ChevronDown, Headphones, Languages, MessageCircle, Mic, Phone, PhoneOutgoing, Play, RotateCcw, ShieldCheck, Sparkles, Wallet } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { demoScenarios, landingContent } from '../../content/landingContent';
import { poytaxtClient, qwattClient } from '../../content/clients';
import ClientLogo from '../ui/ClientLogo';
import { landingVisualContent } from '../../content/landingVisualContent';
import { Ambient, VoiceOrb, VoiceWave, ClientMarquee, StoryVisual, HumanSection, ProductVisual } from './LandingVisuals';
import { normalizeUzPhone, validateBusinessLead } from '../../lib/leadValidation';
import { submitLead } from '../../lib/api';
import VoiceCallWidget from '../sections/VoiceCallWidget';
import './LandingPage.css';

const scenarioIcons = [Headphones, Wallet, PhoneOutgoing];
const productIcons = [BarChart3, MessageCircle, AudioLines, Mic];

function Reveal({ children, className = '' }) {
    const ref = useRef(null);
    useEffect(() => {
        const element = ref.current;
        if (!element || !window.IntersectionObserver || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                element.classList.add('lp-revealed');
                observer.disconnect();
            }
        }, { threshold: .06 });
        element.classList.add('lp-will-reveal');
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return <div ref={ref} className={`lp-reveal ${className}`}>{children}</div>;
}

function SampleDemo({ scenario, copy, phone, setPhone, onCapture, onComplete, retry }) {
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    const audioRef = useRef(null);
    const completeRef = useRef(false);
    const uid = useId();
    const finish = () => {
        if (!completeRef.current) {
            completeRef.current = true;
            onComplete();
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (status === 'pending') return;
        const normalized = normalizeUzPhone(phone);
        if (!normalized) { setError(copy.invalidPhone); return; }
        setError('');
        setStatus('pending');
        try {
            await onCapture(normalized, 'recording');
            setStatus('ready');
            // Playback remains an explicit gesture; this also works on iOS.
            requestAnimationFrame(() => audioRef.current?.focus());
        } catch {
            setError(copy.saveError);
            setStatus('idle');
        }
    };
    if (!scenario.recording) return <div className="lp-sample lp-sample-coming-soon">
        <span className="lp-status"><span />{copy.sampleBadge}</span>
        <span className="lp-sample-icon" aria-hidden="true"><Headphones size={28} strokeWidth={1.4} /></span>
        <h3>{copy.recordingComingSoon}</h3>
        <p className="lp-sample-note">{copy.recordingPending}</p>
        <a className="lp-button lp-button-dark" href="#contact">{copy.talkTeam}<ArrowRight size={16} /></a>
    </div>;
    const recordingLanguage = { uz: 'O‘zbekcha', ru: 'Русский', en: 'English' }[scenario.recordingLanguage];
    return <div className="lp-sample">
        <span className="lp-status"><span />{copy.sampleBadge}{recordingLanguage && ` · ${recordingLanguage}`}</span>
        <span className="lp-sample-icon" aria-hidden="true"><Headphones size={28} strokeWidth={1.4} /></span>
        <h3>{scenario.direction === 'incoming' ? copy.recordingLabel : copy.outgoingRecordingLabel}</h3>
        <p className="lp-sample-note">{scenario.mode === 'live-or-recording' ? copy.sampleNote : copy.recordingNote}</p>
        {status !== 'ready' ? <form onSubmit={handleSubmit} noValidate aria-busy={status === 'pending'}>
            <label htmlFor={`${uid}-phone`}>{copy.phone}</label>
            <input id={`${uid}-phone`} type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="+998 90 123 45 67" value={phone} onChange={(e) => { setPhone(e.target.value); setError(''); }} maxLength={24} required disabled={status === 'pending'} aria-invalid={Boolean(error)} aria-describedby={`${uid}-hint${error ? ` ${uid}-error` : ''}`} />
            <p id={`${uid}-hint`} className="lp-fine">{copy.recordingHint}</p>
            {error && <p id={`${uid}-error`} className="lp-form-error" role="alert">{error}</p>}
            <button className="lp-button lp-button-dark" disabled={status === 'pending'}><Play size={16} />{status === 'pending' ? copy.submitting : copy.recording}</button>
        </form> : <div className="lp-sample-player">
            <p className="lp-fine" role="status">{copy.saved}</p>
            <audio ref={audioRef} controls preload="metadata" src={scenario.recording} aria-label={scenario.direction === 'incoming' ? copy.recordingLabel : copy.outgoingRecordingLabel} onEnded={finish} onTimeUpdate={(e) => { if (e.currentTarget.currentTime >= 12) finish(); }} />
            <a className="lp-text-link" href="#contact" onClick={finish}>{copy.talkTeam}<ArrowRight size={16} /></a>
        </div>}
        {retry && <button type="button" className="lp-sample-retry" onClick={retry}>{copy.retryLive}</button>}
    </div>;
}

function DemoSection({ copy, phone, setPhone, onComplete, onSelect, scenarioIndex, onCapture }) {
    const scenario = demoScenarios[scenarioIndex];
    const scenarioCopy = copy.scenarios[scenarioIndex];
    const [attempt, setAttempt] = useState(0);
    const Icon = scenarioIcons[scenarioIndex];
    return <section id="live-demo" className="lp-section lp-demo" data-scenario={scenario.id} aria-labelledby="lp-demo-title">
        <Reveal className="lp-section-heading"><div><span className="lp-eyebrow">{copy.demoEyebrow}</span><h2 id="lp-demo-title">{copy.demoTitle}</h2></div><p>{copy.demoIntro}</p></Reveal>
        <div className="lp-scenario-tabs" role="tablist" aria-label={copy.demoEyebrow}>
            {demoScenarios.map((item, index) => {
                const ItemIcon = scenarioIcons[index];
                return <button key={item.id} role="tab" id={`scenario-${item.id}`} data-scenario={item.id} aria-selected={scenarioIndex === index} aria-controls="scenario-panel" tabIndex={scenarioIndex === index ? 0 : -1}
                    onClick={() => onSelect(index)} onKeyDown={(e) => {
                        let next;
                        if (e.key === 'ArrowRight') next = (index + 1) % 3;
                        if (e.key === 'ArrowLeft') next = (index + 2) % 3;
                        if (e.key === 'Home') next = 0;
                        if (e.key === 'End') next = 2;
                        if (next !== undefined) { e.preventDefault(); onSelect(next); document.getElementById(`scenario-${demoScenarios[next].id}`)?.focus(); }
                    }}><ItemIcon size={21} /><span>{copy.scenarios[index].title}<small>{item.company}</small></span><ArrowUpRight className="lp-tab-arrow" size={17} /></button>;
            })}
        </div>
        <div id="scenario-panel" className="lp-demo-panel" role="tabpanel" aria-labelledby={`scenario-${scenario.id}`}>
            <div className={`lp-demo-story lp-demo-story-${scenario.id}`} key={scenario.id}>
                <span className="lp-status"><span />{scenarioCopy.tag}</span>
                <div className="lp-demo-identity">{scenario.id === 'support' ? <ClientLogo client={poytaxtClient} compact /> : <><Icon size={28} /><strong>{scenario.company}</strong></>}</div>
                <div className="lp-demo-orbit"><VoiceOrb /><span className="lp-conversation-question">{scenarioCopy.prompt}</span><span className="lp-orbit-caption"><AudioLines size={17} />{copy.languages}</span></div>
                <h3>{scenarioCopy.title}</h3><p>{scenarioCopy.description}</p>
            </div>
            <div className="lp-demo-widget" id="demo">
                {scenario.mode === 'live-or-recording' ? <VoiceCallWidget key={`${scenario.id}-${attempt}`} scenario={scenario} initialPhone={phone} onPhoneChange={setPhone} onLeadCaptured={onCapture} onComplete={onComplete}
                    fallback={<SampleDemo key={scenario.id} scenario={scenario} copy={copy} phone={phone} setPhone={setPhone} onCapture={onCapture} onComplete={onComplete} retry={() => setAttempt((value) => value + 1)} />} />
                    : <SampleDemo key={scenario.id} scenario={scenario} copy={copy} phone={phone} setPhone={setPhone} onCapture={onCapture} onComplete={onComplete} />}
            </div>
        </div>
    </section>;
}

function CustomerStories({ copy }) {
    const stories = [
        { id: 'parking', client: poytaxtClient, context: copy.parkingContext, metric: copy.parkingMetric, label: copy.parkingLabel, body: copy.parkingBody, tags: copy.parkingTags },
        { id: 'qwatt', client: qwattClient, context: copy.qwattContext, metric: copy.qwattMetric, label: copy.qwattLabel, body: copy.qwattBody, tags: copy.qwattTags },
    ];
    return <section className="lp-section lp-stories" id="customers" aria-labelledby="lp-stories-title">
        <Reveal className="lp-section-heading"><div><span className="lp-eyebrow">{copy.storiesEyebrow}</span><h2 id="lp-stories-title">{copy.storiesTitle}</h2></div><p>{copy.storiesIntro}</p></Reveal>
        <div className="lp-story-grid">{stories.map(story => <Reveal key={story.id} className={`lp-story lp-${story.id}-story`}>
            <div className="lp-story-content"><div className="lp-story-top"><ClientLogo client={story.client} compact dark={story.id === 'qwatt'} /><span>{story.context}</span></div>
                <div className="lp-story-result"><strong>{story.metric}</strong><p>{story.label}</p></div>
                <p className="lp-story-body">{story.body}</p><div className="lp-story-bottom"><div className="lp-tags">{story.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href="#live-demo" aria-label={`${copy.tryAgent} · ${story.client.name}`}><ArrowUpRight size={22} /></a></div>
            </div><StoryVisual type={story.id} copy={copy} />
        </Reveal>)}</div>
    </section>;
}

function ProcessPreview({ tab, selected, copy }) {
    const [cycle, setCycle] = useState(0);
    return <div className={`lp-preview lp-preview-${selected}`}>
        <div className="lp-preview-toolbar"><span className="lp-window-dots" aria-hidden="true"><i /><i /><i /></span><span>{copy.previewLabel}</span><span className="lp-preview-status"><span />{tab.label}</span><button type="button" className="lp-preview-replay" onClick={() => setCycle(value => value + 1)} aria-label={copy.replay}><RotateCcw size={14} /><span>{copy.replay}</span></button></div>
        <div className="lp-preview-body" key={`${selected}-${cycle}`}>
            <div className="lp-flow-canvas">
                {selected === 4 ? <div className="lp-dashboard-preview"><div className="lp-dashboard-title"><BarChart3 size={20} />{tab.nodes[0]}<span>{copy.languages}</span></div><div className="lp-dashboard-bars">{[36, 57, 43, 69, 51, 83, 72, 94, 78, 98, 84, 91].map((height, index) => <div key={index}><i style={{ '--height': `${height}%`, '--delay': `${index * .12}s` }} /></div>)}</div><div className="lp-dashboard-topics">{tab.items.map((item, index) => <div key={item} style={{ '--step-delay': `${index * .6}s` }}><span>0{index + 1}</span>{item}<Check size={16} /></div>)}</div></div> : selected === 3 ? <div className="lp-quality-preview"><div className="lp-quality-heading"><ShieldCheck size={24} /><span>{tab.nodes[1]}</span><AudioLines size={22} /></div>{tab.items.map((item, index) => <div className="lp-quality-item" key={item} style={{ '--step-delay': `${index * 1.2}s` }}><span>0{index + 1}</span><div><strong>{item}</strong><i /><i /></div><Check size={18} /></div>)}<div className="lp-quality-result"><Check size={17} />{tab.nodes[3]}</div></div> : <>
                    <div className="lp-flow-start"><Phone size={15} />{tab.nodes[0]}</div><span className="lp-flow-line" />
                    <div className="lp-flow-node lp-flow-primary"><div><Sparkles size={17} /><strong>{tab.nodes[1]}</strong><span className="lp-node-dot" /></div><p>{tab.items[0]}</p><span className="lp-node-placeholder" /><span className="lp-node-placeholder short" /></div>
                    <div className="lp-flow-branches"><span /><span /></div>
                    <div className="lp-flow-pair"><div className="lp-flow-node lp-flow-answer"><div><MessageCircle size={16} /><strong>{tab.nodes[2]}</strong></div><VoiceWave /></div><div className="lp-flow-node lp-flow-result"><div><Check size={16} /><strong>{tab.nodes[3]}</strong></div><span className="lp-node-placeholder" /><span className="lp-node-placeholder short" /></div></div>
                </>}
                <span className="lp-preview-caption">{copy.previewNote}</span>
            </div>
            <div className="lp-preview-inspector"><div className="lp-inspector-label"><span className="lp-mini-orb" />{tab.panel}</div>
                <div className="lp-inspector-orb"><VoiceOrb />{selected === 1 ? <Mic size={26} /> : selected === 3 ? <ShieldCheck size={26} /> : selected === 4 ? <BarChart3 size={26} /> : <AudioLines size={26} />}</div>
                <div className="lp-inspector-items">{tab.items.map((item, index) => <span key={item} style={{ '--step-delay': `${2.8 + index * .8}s` }}><Check size={15} />{item}</span>)}</div>
                <div className="lp-inspector-complete"><Check size={15} />{copy.previewReady}</div>
            </div>
        </div>
    </div>;
}

function PlatformShowcase({ copy }) {
    const [selected, setSelected] = useState(0);
    const [inView, setInView] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const playing = inView && !reducedMotion;
    const ref = useRef(null);
    useEffect(() => {
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = (event) => setReducedMotion(event.matches);
        preference.addEventListener('change', update);
        return () => preference.removeEventListener('change', update);
    }, []);
    useEffect(() => {
        if (!window.IntersectionObserver) return;
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .35 });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        if (!playing) return;
        const timer = setInterval(() => { if (!document.hidden) setSelected((value) => (value + 1) % copy.tabs.length); }, 7500);
        return () => clearInterval(timer);
    }, [playing, selected, copy.tabs.length]);
    const tab = copy.tabs[selected];
    const selectTab = (index) => setSelected(index);
    return <section id="how" className="lp-platform" aria-labelledby="lp-platform-title">
        <Reveal className="lp-centered-heading"><div><span className="lp-eyebrow">{copy.platformEyebrow}</span><h2 id="lp-platform-title">{copy.platformTitle}</h2></div><p>{copy.platformIntro}</p></Reveal>
        <div className="lp-showcase" ref={ref}>
            <div className="lp-showcase-inner" id="platform-panel" role="tabpanel" aria-labelledby={`platform-tab-${selected}`} tabIndex="0">
                <ProcessPreview key={inView ? 'visible' : 'hidden'} tab={tab} selected={selected} copy={copy} />
                <div className="lp-showcase-copy" key={selected}><h3>{tab.title}</h3><p>{tab.body}</p></div>
            </div>
            <div className="lp-platform-controls"><div className="lp-platform-tabs" role="tablist" aria-label={copy.platformEyebrow}>{copy.tabs.map((item, index) => <button key={item.label} id={`platform-tab-${index}`} role="tab" aria-controls="platform-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => selectTab(index)} onKeyDown={(e) => {
                let next;
                if (e.key === 'ArrowRight') next = (index + 1) % copy.tabs.length;
                if (e.key === 'ArrowLeft') next = (index + copy.tabs.length - 1) % copy.tabs.length;
                if (e.key === 'Home') next = 0;
                if (e.key === 'End') next = copy.tabs.length - 1;
                if (next !== undefined) { e.preventDefault(); selectTab(next); document.getElementById(`platform-tab-${next}`)?.focus(); }
            }}><span className="lp-tab-indicator" data-playing={playing && selected === index || undefined} />{item.label}</button>)}</div></div>
        </div>
    </section>;
}

function BusinessForm({ copy, phone, setPhone, language, initialUseCase, product, intent }) {
    const [form, setForm] = useState({ company: '', useCase: '', monthlyVolume: '', volumeUnit: 'calls' });
    const [editedUseCase, setEditedUseCase] = useState(false);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle');
    const uid = useId();
    const statusRef = useRef(null);
    const useCase = editedUseCase ? form.useCase : initialUseCase;
    useEffect(() => {
        if (status === 'success' || status === 'error') statusRef.current?.focus();
    }, [status]);
    const change = (event) => {
        const { name, value } = event.target;
        if (name === 'phone') setPhone(value);
        else setForm((current) => ({ ...current, [name]: value }));
        if (name === 'useCase') setEditedUseCase(true);
        setErrors((current) => ({ ...current, [name]: undefined }));
        setStatus('idle');
    };
    const submit = async (event) => {
        event.preventDefault();
        if (status === 'pending') return;
        const payload = { ...form, phone, useCase, language, source: 'business_request', intent, product, website: new FormData(event.currentTarget).get('website') };
        const nextErrors = validateBusinessLead(payload);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) { document.getElementById(`${uid}-${Object.keys(nextErrors)[0]}`)?.focus(); return; }
        setStatus('pending');
        try {
            await submitLead({ ...payload, phone: normalizeUzPhone(phone), company: form.company.trim(), useCase: useCase.trim() });
            setStatus('success');
        } catch { setStatus('error'); }
    };
    const field = (name, label, value, type, placeholder, autoComplete) => <div className="lp-field">
        <label htmlFor={`${uid}-${name}`}>{label}</label>
        <input id={`${uid}-${name}`} name={name} value={value} onChange={change} type={type} placeholder={placeholder} autoComplete={autoComplete} required disabled={status === 'pending'} maxLength={name === 'phone' ? 24 : 120} min={type === 'number' ? 1 : undefined} max={type === 'number' ? 1_000_000_000 : undefined} step={type === 'number' ? 1 : undefined} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${uid}-${name}-error` : undefined} />
        {errors[name] && <span className="lp-form-error" id={`${uid}-${name}-error`}>{copy[errors[name]]}</span>}
    </div>;
    return <section className="lp-contact-wrap" id="contact" tabIndex="-1" aria-labelledby="lp-contact-title"><div className="lp-contact"><Ambient />
        <div className="lp-contact-intro"><span className="lp-eyebrow">SYNCALL AI</span><h2 id="lp-contact-title">{copy.formTitle}</h2><p>{copy.formIntro}</p><a href="https://t.me/syncall_ai" target="_blank" rel="noopener noreferrer">{copy.contactLink}<ArrowUpRight size={17} /></a><div className="lp-contact-art" aria-hidden="true"><VoiceWave /><span>syncall<span className="lp-logo-dot">✳</span></span></div></div>
        {status === 'success' ? <div className="lp-form-success" ref={statusRef} role="status" tabIndex="-1"><span><Check size={32} /></span><h3>{copy.success}</h3></div> : <form className="lp-business-form" onSubmit={submit} noValidate aria-busy={status === 'pending'}>
            <input type="hidden" name="product" value={product} /><input type="hidden" name="intent" value={intent} />
            {field('phone', copy.phone, phone, 'tel', '+998 90 123 45 67', 'tel')}
            {field('company', copy.company, form.company, 'text', copy.companyPlaceholder, 'organization')}
            <div className="lp-field"><label htmlFor={`${uid}-useCase`}>{copy.useCase}</label><textarea id={`${uid}-useCase`} name="useCase" value={useCase} onChange={change} placeholder={copy.useCasePlaceholder} rows="2" maxLength={1000} required disabled={status === 'pending'} aria-invalid={Boolean(errors.useCase)} aria-describedby={errors.useCase ? `${uid}-useCase-error` : undefined} />{errors.useCase && <span className="lp-form-error" id={`${uid}-useCase-error`}>{copy.invalid}</span>}</div>
            <div className="lp-volume-fields">{field('monthlyVolume', copy.volume, form.monthlyVolume, 'number', '5 000', 'off')}<div className="lp-field lp-volume-unit"><label htmlFor={`${uid}-volumeUnit`}>{language === 'ru' ? 'Единица' : language === 'uz' ? 'Birlik' : 'Unit'}</label><select id={`${uid}-volumeUnit`} name="volumeUnit" value={form.volumeUnit} onChange={change} disabled={status === 'pending'}><option value="calls">{copy.calls}</option><option value="minutes">{copy.minutes}</option></select></div></div>
            <div className="lp-honeypot" aria-hidden="true"><label htmlFor={`${uid}-website`}>Website</label><input id={`${uid}-website`} name="website" type="text" tabIndex="-1" autoComplete="off" /></div>
            {status === 'error' && <p className="lp-form-error" ref={statusRef} role="alert" tabIndex="-1">{copy.saveError}</p>}
            <button className="lp-button lp-button-dark" disabled={status === 'pending'}>{status === 'pending' ? copy.submitting : copy.submit}<ArrowUpRight size={18} /></button><p className="lp-fine">{copy.formNote}</p>
        </form>}
    </div></section>;
}

export default function LandingPage() {
    const { language, localePath } = useLanguage();
    const [params] = useSearchParams();
    const product = ['voice', 'analytics', 'chatbots'].includes(params.get('product')) ? params.get('product') : 'voice';
    const intent = ['demo', 'trial'].includes(params.get('intent')) ? params.get('intent') : 'launch';
    const copy = { ...(landingContent[language] || landingContent.ru), ...(landingVisualContent[language] || landingVisualContent.ru) };
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [phone, setPhone] = useState('');
    const [completed, setCompleted] = useState(false);
    const captured = useRef(new Set());
    const captureLead = async (number, kind = 'live') => {
        setPhone(number);
        const key = `${number}:${demoScenarios[scenarioIndex].id}:${kind}`;
        if (captured.current.has(key)) return;
        await submitLead({ phone: number, language, source: 'landing_demo', event: 'demo_started', scenario: demoScenarios[scenarioIndex].id, demoMode: kind, phoneVerified: false });
        captured.current.add(key);
    };
    return <main id="main-content" tabIndex="-1" className="lp" data-gradient={params.get('gradient') === 'blue' ? 'blue' : 'aurora'}>
        <section className="lp-hero" aria-labelledby="lp-hero-title">
            <Ambient />
            <div className="lp-hero-content">
                <span className="lp-hero-eyebrow">{copy.eyebrow}</span>
                <h1 id="lp-hero-title">{copy.title[0]}<br /><span>{copy.title[1]}</span></h1>
                <p className="lp-hero-intro">{copy.intro}</p>
                <div className="lp-hero-actions">
                    <a className="lp-button lp-hero-primary" href="#live-demo"><AudioLines size={19} aria-hidden="true" />{copy.tryAgent}<ArrowUpRight size={17} aria-hidden="true" /></a>
                    <a className="lp-button lp-hero-secondary" href="#contact">{copy.talkTeam}<ArrowRight size={17} aria-hidden="true" /></a>
                </div>
                <span className="lp-hero-languages"><Languages size={14} aria-hidden="true" />{copy.languages}</span>
                <div className="lp-hero-signature" aria-hidden="true"><VoiceWave /></div>
            </div>
        </section>
        <ClientMarquee copy={copy} />
        <DemoSection copy={copy} phone={phone} setPhone={setPhone} scenarioIndex={scenarioIndex} onSelect={setScenarioIndex} onCapture={captureLead} onComplete={() => setCompleted(true)} />
        {completed && <div className="lp-after-demo" role="status"><div><strong>{copy.afterTitle}</strong><p>{copy.afterText}</p></div><a href="#contact" className="lp-button lp-button-dark">{copy.talkTeam}<ArrowRight size={17} /></a></div>}
        <CustomerStories copy={copy} />
        <PlatformShowcase copy={copy} />
        <HumanSection copy={copy} />
        <section id="capabilities" className="lp-section lp-products" aria-labelledby="lp-products-title"><Reveal className="lp-section-heading"><div><span className="lp-eyebrow">{copy.productsEyebrow}</span><h2 id="lp-products-title">{copy.productsTitle}</h2></div><p>{copy.productsIntro}</p></Reveal><div className="lp-products-grid">{copy.products.map((product, index) => { const Icon = productIcons[index]; return <Reveal key={product.path} className={`lp-product lp-product-${index}`}><span className="lp-product-badge">{product.badge}</span><ProductVisual index={index} copy={copy} /><Icon size={24} strokeWidth={1.5} /><h3>{product.title}</h3><p>{product.body}</p><Link to={localePath(product.path)}>{product.label}<ArrowUpRight size={17} /></Link></Reveal>; })}</div></section>
        <section className="lp-section lp-faq" id="faq" aria-labelledby="lp-faq-title"><Reveal><span className="lp-eyebrow">FAQ</span><h2 id="lp-faq-title">{copy.faqTitle}</h2></Reveal><div>{copy.faq.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={20} /></summary><p>{answer}</p></details>)}</div></section>
        <BusinessForm copy={copy} phone={phone} setPhone={setPhone} language={language} product={product} intent={intent} initialUseCase={completed ? copy.scenarios[scenarioIndex].title : ''} />
    </main>;
}
