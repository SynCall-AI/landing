import { useEffect, useId, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { submitLead } from '../../lib/api';
import { CONTACT_PRODUCTS, validateContactLead } from '../../lib/leadValidation';
import './ContactForm.css';

const EMPTY_FORM = { name: '', company: '', email: '', phone: '', monthlyCallVolume: '', languages: [], message: '', contactMethod: 'phone' };
const LANGUAGE_OPTIONS = [{ value: 'uz', label: "O‘zbek" }, { value: 'ru', label: 'Русский' }, { value: 'en', label: 'English' }];
const PRODUCT_KEYS = { voice: 'contactProductVoice', analytics: 'contactProductAnalytics', chatbots: 'contactProductChatbots' };

export default function ContactForm({ id = 'contact', intent = 'demo_or_trial' }) {
    const { language, t } = useLanguage();
    const [params] = useSearchParams();
    const requestedProduct = params.get('product');
    const initialProduct = CONTACT_PRODUCTS.includes(requestedProduct) ? requestedProduct : 'voice';
    const uid = useId().replace(/:/g, '');
    const statusRef = useRef(null);
    const optionalRef = useRef(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [productOverride, setProductOverride] = useState(null);
    const product = productOverride?.requested === requestedProduct ? productOverride.value : initialProduct;
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ type: 'idle', message: '' });
    const fieldId = (name) => `${uid}-${name}`;
    const isPilot = intent === 'trial';
    const submitLabel = isPilot ? t('ctaTrial') : t('ctaDemo');

    useEffect(() => {
        if (status.type === 'success' || status.type === 'error') statusRef.current?.focus();
    }, [status]);

    const change = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: undefined }));
        setStatus({ type: 'idle', message: '' });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (status.type === 'pending') return;
        const payload = {
            ...form, product,
            email: form.contactMethod === 'email' ? form.email.trim() : '',
            phone: form.contactMethod === 'phone' ? form.phone.trim() : '',
            name: form.name.trim(), company: form.company.trim(), message: form.message.trim(),
            language, source: 'contact_form', intent,
            website: new FormData(event.currentTarget).get('website'),
        };
        const nextErrors = validateContactLead(payload);
        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            if (nextErrors.monthlyCallVolume && optionalRef.current) optionalRef.current.open = true;
            const firstField = Object.keys(nextErrors)[0];
            requestAnimationFrame(() => document.getElementById(fieldId(firstField))?.focus());
            return;
        }
        setErrors({});
        setStatus({ type: 'pending', message: t('contactSubmitting') });
        try {
            await submitLead(payload);
            setForm(EMPTY_FORM);
            setProductOverride(null);
            setStatus({ type: 'success', message: t('contactSuccess') });
        } catch (error) {
            setStatus({ type: 'error', message: t(error?.code === 'NOT_CONFIGURED' ? 'contactConfigError' : 'contactError') });
        }
    };

    const input = (name, label, type = 'text', autoComplete, required = false) => (
        <div className="contact-field" key={name}>
            <label htmlFor={fieldId(name)}>{t(label)}{required && <span aria-hidden="true"> *</span>}</label>
            <input id={fieldId(name)} name={name} type={type} autoComplete={autoComplete} value={form[name]} onChange={change} required={required}
                disabled={status.type === 'pending'} maxLength={name === 'email' ? 254 : name === 'phone' ? 32 : 120} min={type === 'number' ? 1 : undefined} max={type === 'number' ? 1_000_000_000 : undefined} step={type === 'number' ? 1 : undefined}
                aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${fieldId(name)}-error` : undefined} />
            {errors[name] && <span id={`${fieldId(name)}-error`} className="contact-field-error" role="alert">{t(errors[name])}</span>}
        </div>
    );

    return (
        <section id={id} tabIndex="-1" className="contact-section" aria-labelledby={`${uid}-heading`}>
            <div className="contact-container">
                <div className="contact-intro">
                    <h2 id={`${uid}-heading`}>{t(isPilot ? 'contactPilotTitle' : 'contactDemoTitle')}</h2>
                    <p>{t(isPilot ? 'contactPilotSubtitle' : 'contactDemoSubtitle')}</p>
                    <a className="contact-telegram" href="https://t.me/syncall_ai" target="_blank" rel="noopener noreferrer">{t('ctaTelegram')}</a>
                </div>
                <form className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={status.type === 'pending'}>
                    {input('name', 'contactName', 'text', 'name', true)}
                    {input('company', 'contactCompany', 'text', 'organization', true)}
                    <div className="contact-field contact-field-full">
                        <label htmlFor={fieldId('product')}>{t('contactProduct')}</label>
                        <select disabled={status.type === 'pending'} id={fieldId('product')} value={product} onChange={(event) => setProductOverride({ requested: requestedProduct, value: event.target.value })}>
                            {CONTACT_PRODUCTS.map((item) => <option key={item} value={item}>{t(PRODUCT_KEYS[item])}</option>)}
                        </select>
                    </div>
                    <fieldset className="contact-method contact-field-full">
                        <legend>{t('contactMethod')}</legend>
                        <div className="contact-method-options">
                            {['phone', 'email'].map((method) => <label key={method}><input disabled={status.type === 'pending'} type="radio" name="contactMethod" value={method} checked={form.contactMethod === method} onChange={change} /><span>{t(method === 'phone' ? 'contactByPhone' : 'contactByEmail')}</span></label>)}
                        </div>
                    </fieldset>
                    <div className="contact-field-full">
                        {form.contactMethod === 'phone' ? input('phone', 'contactPhone', 'tel', 'tel', true) : input('email', 'contactEmail', 'email', 'email', true)}
                    </div>
                    <details ref={optionalRef} className="contact-optional contact-field-full">
                        <summary>{t('contactOptional')}</summary>
                        <div className="contact-optional-fields">
                            {input('monthlyCallVolume', 'contactVolume', 'number')}
                            <fieldset className="contact-languages">
                                <legend>{t('contactLanguages')}</legend>
                                <div className="contact-language-options">{LANGUAGE_OPTIONS.map(({ value, label }) => (
                                    <label key={value}><input disabled={status.type === 'pending'} type="checkbox" name="languages" value={value} checked={form.languages.includes(value)} onChange={(event) => {
                                        const checked = event.target.checked;
                                        setForm((current) => ({ ...current, languages: checked ? [...current.languages, value] : current.languages.filter((item) => item !== value) }));
                                    }} /><span>{label}</span></label>
                                ))}</div>
                            </fieldset>
                            <div className="contact-field"><label htmlFor={fieldId('message')}>{t('contactMessage')}</label><textarea disabled={status.type === 'pending'} id={fieldId('message')} name="message" rows={3} maxLength={1500} value={form.message} onChange={change} /></div>
                        </div>
                    </details>
                    <div className="contact-honeypot" aria-hidden="true"><label htmlFor={fieldId('website')}>Website</label><input id={fieldId('website')} name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
                    <div className="contact-submit-row contact-field-full">
                        <button className="btn-primary contact-submit" type="submit" disabled={status.type === 'pending'}>{status.type === 'pending' ? t('contactSubmitting') : submitLabel}</button>
                        {status.type !== 'idle' && <p ref={statusRef} className={`contact-status ${status.type}`} role={status.type === 'error' ? 'alert' : 'status'} tabIndex="-1">{status.message}</p>}
                    </div>
                </form>
            </div>
        </section>
    );
}
