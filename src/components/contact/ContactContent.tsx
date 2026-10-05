import Image from 'next/image';
import { Mail, MapPin, Clock, Building2, ShieldCheck, FileCheck, Users } from 'lucide-react';
import ContactForm from './ContactForm';

type Translator = (key: string) => string;

export default function ContactContent({ t }: { t: Translator }) {
  const sequence = ['consultation', 'review', 'commercial', 'mobilisation'] as const;
  const commitments = ['access', 'review', 'transparency'] as const;

  return (
    <div className="contact-page">
      {/* Hero Section - Full Width Edge to Edge */}
      <section className="relative w-full overflow-hidden border-b border-border bg-[#0B1F33]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact/contact-dubai.jpg"
            alt={t('heroVisualLabel')}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35 md:bg-gradient-to-r md:from-[#07172b]/95 md:via-[#07172b]/75 md:to-black/30 rtl:md:bg-gradient-to-l rtl:md:from-[#07172b]/95 rtl:md:via-[#07172b]/75 rtl:md:to-black/30" />
        </div>

        <div className="dxw-container relative z-10 flex min-h-[500px] flex-col justify-center py-20 md:min-h-[580px] md:py-24">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="h-px w-8 bg-accent" />
              {t('heroLabel')}
            </p>
            <h1 className="dxw-h1 mt-6 text-white">
              {t('heroTitle')}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/85 md:text-xl md:leading-9">
              {t('heroDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Particulars & Form Section */}
      <section aria-labelledby="contact-main-heading" className="bg-background py-24 md:py-32">
        <div className="dxw-container">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
            {/* Left: Company Details & Dialogue Commitment */}
            <div className="space-y-12">
              <div>
                <p className="section-label">
                  01 <span>{t('detailsLabel')}</span>
                </p>
                <h2 id="contact-main-heading" className="dxw-h2 mt-6">
                  {t('detailsHeading')}
                </h2>
              </div>

              {/* Company Info Card */}
              <div className="border border-border border-s-4 border-s-brand bg-surface p-8">
                <div className="flex items-center gap-3">
                  <Building2 className="size-5 text-brand" />
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {t('companyName')}
                  </h3>
                </div>

                <div className="mt-6 space-y-5 border-t border-border pt-6 text-sm">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        {t('licenseLabel')}
                      </span>
                      <p className="mt-1 font-mono font-semibold tracking-wider text-foreground">
                        {t('licenseValue')}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      {t('activityLabel')}
                    </span>
                    <p className="mt-1 font-medium text-foreground">
                      {t('activityValue')}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        {t('locationLabel')}
                      </span>
                      <p className="mt-1 font-medium text-foreground">
                        {t('locationValue')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        {t('inquiriesLabel')}
                      </span>
                      <a
                        href={`mailto:${t('inquiriesValue')}`}
                        className="mt-1 block font-medium text-brand hover:underline"
                      >
                        {t('inquiriesValue')}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-accent" />
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        {t('hoursLabel')}
                      </span>
                      <p className="mt-1 font-medium text-foreground">
                        {t('hoursValue')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commitments Card */}
              <div className="border border-border bg-white p-8">
                <h4 className="font-display text-base font-semibold text-foreground">
                  {t('dialogueCommitment')}
                </h4>
                <div className="mt-6 space-y-6">
                  {commitments.map((key) => (
                    <div key={key} className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-brand">
                        {key === 'access' && <Users className="size-4" />}
                        {key === 'review' && <FileCheck className="size-4" />}
                        {key === 'transparency' && <ShieldCheck className="size-4" />}
                      </div>
                      <div>
                        <h5 className="font-display text-sm font-semibold text-foreground">
                          {t(`commitment.${key}.title`)}
                        </h5>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {t(`commitment.${key}.description`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Interactive Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* 02 Engagement Process */}
      <section aria-labelledby="sequence-heading" className="bg-surface py-24 md:py-32">
        <div className="dxw-container">
          <div className="max-w-3xl">
            <p className="section-label">
              02 <span>{t('sequenceLabel')}</span>
            </p>
            <h2 id="sequence-heading" className="dxw-h2 mt-6">
              {t('sequenceHeading')}
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sequence.map((key) => (
              <div
                key={key}
                className="flex flex-col justify-between border border-border border-t-2 border-t-brand bg-white p-7 transition-colors duration-300 hover:border-brand"
              >
                <div>
                  <span className="font-display text-xs font-semibold tracking-[0.16em] text-accent">
                    STEP {t(`sequence.${key}.step`)}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {t(`sequence.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {t(`sequence.${key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 UAE Commitment Statement Banner */}
      <section aria-labelledby="contact-uae-banner" className="bg-brand py-20 text-white md:py-24">
        <div className="dxw-container text-center">
          <h2 id="contact-uae-banner" className="mx-auto max-w-4xl font-display text-2xl font-semibold leading-relaxed text-white md:text-3xl">
            “{t('uaeBanner')}”
          </h2>
          <p className="mt-6 text-sm font-semibold tracking-[0.2em] uppercase text-accent">
            D X W CONSTRUCTION L.L.C. • DUBAI, UAE
          </p>
        </div>
      </section>
    </div>
  );
}
