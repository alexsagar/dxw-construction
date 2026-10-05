'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const PHONE_REGEX = /^[0-9+\-\s()]{6,40}$/;

interface FormDataState {
  name: string;
  company: string;
  email: string;
  phone: string;
  enquiryType: string;
  scope: string;
  message: string;
  website_hp: string;
}

const INITIAL_FORM_DATA: FormDataState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  enquiryType: 'contracting',
  scope: '',
  message: '',
  website_hp: '',
};

export default function ContactForm() {
  const t = useTranslations('ContactPage');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = (): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = t('form.validation.nameRequired');
    }
    if (!formData.company.trim() || formData.company.trim().length < 2) {
      errors.company = t('form.validation.companyRequired');
    }
    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = t('form.validation.emailInvalid');
    }
    if (!formData.phone.trim() || !PHONE_REGEX.test(formData.phone.trim())) {
      errors.phone = t('form.validation.phoneRequired');
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = t('form.validation.messageRequired');
    }

    return errors;
  };

  const handleFieldChange = (field: keyof FormDataState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStatus('submitting');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !data?.success) {
        setStatus('error');
        setErrorMessage(data?.error || t('form.errorMessage'));
        return;
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage(t('form.errorMessage'));
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setFieldErrors({});
    setErrorMessage(null);
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div
        role="region"
        aria-live="polite"
        className="flex flex-col items-center justify-center border border-brand/20 bg-surface p-10 text-center md:p-14"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
          <CheckCircle2 className="h-8 w-8 text-brand" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-bold text-foreground">
          {t('form.successTitle')}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
          {t('form.successMessage')}
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-8 inline-flex min-h-11 items-center border border-brand px-6 text-sm font-semibold text-brand transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
        >
          {t('form.submitAnother')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-border bg-white p-8 md:p-10">
      <div className="border-b border-border pb-6">
        <h3 className="font-display text-2xl font-bold text-foreground">
          {t('formHeading')}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {t('formDescription')}
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {/* Anti-spam honeypot field - visually hidden, inaccessible to screen-readers, traps automated bots */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            opacity: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <label htmlFor="website_hp">Leave this field blank</label>
          <input
            id="website_hp"
            name="website_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website_hp}
            onChange={(e) => handleFieldChange('website_hp', e.target.value)}
          />
        </div>

        {status === 'error' && errorMessage && (
          <div
            role="alert"
            aria-live="polite"
            className="flex items-start gap-3 border border-red-500/20 bg-red-50/80 p-4 text-sm text-red-800 dark:bg-red-950/30 dark:text-red-300"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600 dark:text-red-400" />
            <p className="leading-5">{errorMessage}</p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
              {t('form.name')} <span className="text-brand">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? 'name-error' : undefined}
              value={formData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder={t('form.namePlaceholder')}
              className={`mt-2.5 block w-full border bg-surface px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:bg-white focus:outline-none focus:ring-1 ${
                fieldErrors.name
                  ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500'
                  : 'border-border focus:border-brand focus:ring-brand'
              }`}
            />
            {fieldErrors.name && (
              <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="company" className="block text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
              {t('form.company')} <span className="text-brand">*</span>
            </label>
            <input
              id="company"
              type="text"
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.company}
              aria-describedby={fieldErrors.company ? 'company-error' : undefined}
              value={formData.company}
              onChange={(e) => handleFieldChange('company', e.target.value)}
              placeholder={t('form.companyPlaceholder')}
              className={`mt-2.5 block w-full border bg-surface px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:bg-white focus:outline-none focus:ring-1 ${
                fieldErrors.company
                  ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500'
                  : 'border-border focus:border-brand focus:ring-brand'
              }`}
            />
            {fieldErrors.company && (
              <p id="company-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                {fieldErrors.company}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
              {t('form.email')} <span className="text-brand">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              value={formData.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              placeholder={t('form.emailPlaceholder')}
              className={`mt-2.5 block w-full border bg-surface px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:bg-white focus:outline-none focus:ring-1 ${
                fieldErrors.email
                  ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500'
                  : 'border-border focus:border-brand focus:ring-brand'
              }`}
            />
            {fieldErrors.email && (
              <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
              {t('form.phone')} <span className="text-brand">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              aria-required="true"
              aria-invalid={!!fieldErrors.phone}
              aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
              value={formData.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              placeholder={t('form.phonePlaceholder')}
              className={`mt-2.5 block w-full border bg-surface px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:bg-white focus:outline-none focus:ring-1 ${
                fieldErrors.phone
                  ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500'
                  : 'border-border focus:border-brand focus:ring-brand'
              }`}
            />
            {fieldErrors.phone && (
              <p id="phone-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                {fieldErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="enquiryType" className="block text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
            {t('form.enquiryType')}
          </label>
          <select
            id="enquiryType"
            value={formData.enquiryType}
            onChange={(e) => handleFieldChange('enquiryType', e.target.value)}
            className="mt-2.5 block w-full border border-border bg-surface px-4 py-3 text-sm text-foreground transition-colors focus:border-brand focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="contracting">{t('form.types.contracting')}</option>
            <option value="procurement">{t('form.types.procurement')}</option>
            <option value="workforce">{t('form.types.workforce')}</option>
            <option value="partnership">{t('form.types.partnership')}</option>
            <option value="general">{t('form.types.general')}</option>
          </select>
        </div>

        <div>
          <label htmlFor="scope" className="block text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
            {t('form.scope')}
          </label>
          <input
            id="scope"
            type="text"
            value={formData.scope}
            onChange={(e) => handleFieldChange('scope', e.target.value)}
            placeholder={t('form.scopePlaceholder')}
            className="mt-2.5 block w-full border border-border bg-surface px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-brand focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
            {t('form.message')} <span className="text-brand">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
            value={formData.message}
            onChange={(e) => handleFieldChange('message', e.target.value)}
            placeholder={t('form.messagePlaceholder')}
            className={`mt-2.5 block w-full border bg-surface px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/60 focus:bg-white focus:outline-none focus:ring-1 ${
              fieldErrors.message
                ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500'
                : 'border-border focus:border-brand focus:ring-brand'
            }`}
          />
          {fieldErrors.message && (
            <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
              {fieldErrors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex min-h-12 w-full items-center justify-center bg-brand px-8 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === 'submitting' ? (
            <>
              {t('form.submitting')}
              <Loader2 aria-hidden="true" className="ms-2 size-4 animate-spin rtl:-scale-x-100" />
            </>
          ) : (
            <>
              {t('form.submit')}
              <Send aria-hidden="true" className="ms-2 size-4 rtl:-scale-x-100" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
