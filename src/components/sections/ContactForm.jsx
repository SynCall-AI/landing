import { useEffect, useId, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { submitLead } from '../../lib/api';
import './ContactForm.css';

const EMPTY_FORM = {
    name: '',
    company: '',
    email: '',
    phone: '',
    monthlyCallVolume: '',
    languages: [],
    message: '',
};

const LANGUAGE_OPTIONS = [
    { value: 'uz', label: "O'zbek" },
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'English' },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = ({ id = 'contact', intent = 'demo_or_trial' }) => {
    const { language, t } = useLanguage();
    const uid = useId().replace(/:/g, '');
    const formRef = useRef(null);
    const statusRef = useRef(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ type: 'idle', message: '' });

    const fieldId = (name) => `${uid}-${name}`;

    useEffect(() => {
        if (status.type === 'success' || status.type === 'error') {
            statusRef.current?.focus();
        }
    }, [status]);

    const clearError = (name) => {
        setErrors((current) => {
            if (!current[name]) return current;
            const next = { ...current };
            delete next[name];
            return next;
        });
    };

    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        clearError(name);
    };

    const handleLanguageChange = (event) => {
        const { checked, value } = event.target;
        setForm((current) => ({
            ...current,
            languages: checked
                ? [...current.languages, value]
                : current.languages.filter((item) => item !== value),
        }));
        clearError('languages');
    };

    const validate = () => {
        const nextErrors = {};
        const requiredFields = ['name', 'company', 'email', 'phone', 'monthlyCallVolume'];

        requiredFields.forEach((name) => {
            if (!form[name].trim()) nextErrors[name] = t('contactRequired');
        });

        if (form.email && !EMAIL_PATTERN.test(form.email.trim())) {
            nextErrors.email = t('contactEmailInvalid');
        }

        if (form.phone && form.phone.replace(/\D/g, '').length < 7) {
            nextErrors.phone = t('callWidgetInvalidPhone');
        }

        if (form.monthlyCallVolume) {
            const volume = Number(form.monthlyCallVolume);
            if (!/^\d+$/.test(form.monthlyCallVolume)
                || !Number.isSafeInteger(volume)
                || volume < 1
                || volume > 1_000_000_000) {
                nextErrors.monthlyCallVolume = t('contactRequired');
            }
        }

        if (form.languages.length === 0) {
            nextErrors.languages = t('contactRequired');
        }

        return nextErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (status.type === 'pending') return;

        const nextErrors = validate();
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setStatus({ type: 'error', message: t('contactRequired') });
            const firstInvalidName = Object.keys(nextErrors)[0];
            const focusTarget = firstInvalidName === 'languages'
                ? `${fieldId('languages')}-${LANGUAGE_OPTIONS[0].value}`
                : fieldId(firstInvalidName);
            requestAnimationFrame(() => {
                document.getElementById(focusTarget)?.focus();
            });
            return;
        }

        setErrors({});
        setStatus({ type: 'pending', message: t('contactSubmitting') });

        const honeypot = new FormData(event.currentTarget).get('website');

        try {
            await submitLead({
                name: form.name.trim(),
                company: form.company.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                monthlyCallVolume: form.monthlyCallVolume,
                languages: form.languages,
                message: form.message.trim(),
                language,
                source: 'contact_form',
                intent,
                website: honeypot,
            });
            setForm(EMPTY_FORM);
            setStatus({ type: 'success', message: t('contactSuccess') });
        } catch (error) {
            const message = error?.code === 'NOT_CONFIGURED'
                ? t('contactConfigError')
                : t('contactError');
            setStatus({ type: 'error', message });
        }
    };

    const describedBy = (name) => errors[name] ? `${fieldId(name)}-error` : undefined;

    return (
        <section id={id} tabIndex="-1" className="contact-section" aria-labelledby={`${uid}-heading`}>
            <div className="contact-container">
                <div className="contact-intro">
                    <span className="section-label">{t('ctaDemo')}</span>
                    <h2 id={`${uid}-heading`}>{t('contactTitle')}</h2>
                    <p>{t('contactSubtitle')}</p>
                    <a
                        className="contact-telegram"
                        href="https://t.me/syncall_ai"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t('ctaTelegram')}
                    </a>
                </div>

                <form
                    ref={formRef}
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                    aria-busy={status.type === 'pending'}
                >
                    <div className="contact-field">
                        <label htmlFor={fieldId('name')}>
                            {t('contactName')} <span aria-hidden="true">*</span>
                        </label>
                        <input
                            id={fieldId('name')}
                            name="name"
                            type="text"
                            autoComplete="name"
                            maxLength={100}
                            value={form.name}
                            onChange={handleFieldChange}
                            required
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={describedBy('name')}
                        />
                        {errors.name && <span id={`${fieldId('name')}-error`} className="contact-field-error">{errors.name}</span>}
                    </div>

                    <div className="contact-field">
                        <label htmlFor={fieldId('company')}>
                            {t('contactCompany')} <span aria-hidden="true">*</span>
                        </label>
                        <input
                            id={fieldId('company')}
                            name="company"
                            type="text"
                            autoComplete="organization"
                            maxLength={120}
                            value={form.company}
                            onChange={handleFieldChange}
                            required
                            aria-invalid={Boolean(errors.company)}
                            aria-describedby={describedBy('company')}
                        />
                        {errors.company && <span id={`${fieldId('company')}-error`} className="contact-field-error">{errors.company}</span>}
                    </div>

                    <div className="contact-field">
                        <label htmlFor={fieldId('email')}>
                            {t('contactEmail')} <span aria-hidden="true">*</span>
                        </label>
                        <input
                            id={fieldId('email')}
                            name="email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            maxLength={254}
                            value={form.email}
                            onChange={handleFieldChange}
                            required
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={describedBy('email')}
                        />
                        {errors.email && <span id={`${fieldId('email')}-error`} className="contact-field-error">{errors.email}</span>}
                    </div>

                    <div className="contact-field">
                        <label htmlFor={fieldId('phone')}>
                            {t('contactPhone')} <span aria-hidden="true">*</span>
                        </label>
                        <input
                            id={fieldId('phone')}
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            maxLength={32}
                            value={form.phone}
                            onChange={handleFieldChange}
                            required
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={describedBy('phone')}
                        />
                        {errors.phone && <span id={`${fieldId('phone')}-error`} className="contact-field-error">{errors.phone}</span>}
                    </div>

                    <div className="contact-field contact-field-full">
                        <label htmlFor={fieldId('monthlyCallVolume')}>
                            {t('contactVolume')} <span aria-hidden="true">*</span>
                        </label>
                        <input
                            id={fieldId('monthlyCallVolume')}
                            name="monthlyCallVolume"
                            type="number"
                            inputMode="numeric"
                            min="1"
                            max="1000000000"
                            step="1"
                            value={form.monthlyCallVolume}
                            onChange={handleFieldChange}
                            required
                            aria-invalid={Boolean(errors.monthlyCallVolume)}
                            aria-describedby={describedBy('monthlyCallVolume')}
                        />
                        {errors.monthlyCallVolume && <span id={`${fieldId('monthlyCallVolume')}-error`} className="contact-field-error">{errors.monthlyCallVolume}</span>}
                    </div>

                    <fieldset
                        className="contact-languages contact-field-full"
                        aria-invalid={Boolean(errors.languages)}
                        aria-describedby={describedBy('languages')}
                    >
                        <legend>
                            {t('contactLanguages')} <span aria-hidden="true">*</span>
                        </legend>
                        <div className="contact-language-options">
                            {LANGUAGE_OPTIONS.map((option) => (
                                <label key={option.value} htmlFor={`${fieldId('languages')}-${option.value}`}>
                                    <input
                                        id={`${fieldId('languages')}-${option.value}`}
                                        name="languages"
                                        type="checkbox"
                                        value={option.value}
                                        checked={form.languages.includes(option.value)}
                                        onChange={handleLanguageChange}
                                    />
                                    <span>{option.label}</span>
                                </label>
                            ))}
                        </div>
                        {errors.languages && <span id={`${fieldId('languages')}-error`} className="contact-field-error">{errors.languages}</span>}
                    </fieldset>

                    <div className="contact-field contact-field-full">
                        <label htmlFor={fieldId('message')}>{t('contactMessage')}</label>
                        <textarea
                            id={fieldId('message')}
                            name="message"
                            rows={5}
                            maxLength={2000}
                            value={form.message}
                            onChange={handleFieldChange}
                        />
                    </div>

                    <div className="contact-honeypot" aria-hidden="true">
                        <label htmlFor={fieldId('website')}>Website</label>
                        <input
                            id={fieldId('website')}
                            name="website"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>

                    <div className="contact-submit-row contact-field-full">
                        <button className="btn-primary contact-submit" type="submit" disabled={status.type === 'pending'}>
                            {status.type === 'pending' ? t('contactSubmitting') : t('contactSubmit')}
                        </button>
                        {status.type !== 'idle' && (
                            <p
                                ref={statusRef}
                                className={`contact-status ${status.type}`}
                                role={status.type === 'error' ? 'alert' : 'status'}
                                tabIndex={-1}
                            >
                                {status.message}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
