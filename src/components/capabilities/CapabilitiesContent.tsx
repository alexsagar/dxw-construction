import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

type Translator = (key: string) => string;

export default function CapabilitiesContent({ t }: { t: Translator }) {
  const capabilities = ['construction', 'controls', 'quality', 'hse', 'workforce', 'procurement', 'digital'] as const;
  const sequence = ['plan', 'mobilise', 'control', 'inspect', 'record', 'correct', 'handover'] as const;
  return <div className="capabilities-page">
    {/* Hero Section - Full Width Edge to Edge */}
    <section className="relative w-full overflow-hidden border-b border-border bg-[#0B1F33]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/capabilities/capabilities-procurement.png"
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
          <h1 className="dxw-h1 mt-6 text-white">{t('heroTitle')}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/85 md:text-xl md:leading-9">
            {t('heroDescription')}
          </p>
        </div>
      </div>
    </section>
    <section aria-labelledby="focus-heading" className="bg-background py-24 md:py-32"><div className="dxw-container"><div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24"><div><p className="section-label">01 <span>{t('focusLabel')}</span></p><h2 id="focus-heading" className="dxw-h2 mt-6">{t('focusHeading')}</h2></div><p className="dxw-reading text-2xl font-medium leading-relaxed md:text-3xl">{t('focusStatement')}</p></div><div className="mt-16 border-t border-border">{capabilities.map((key, index) => <div key={key} className="grid gap-5 border-b border-border py-8 md:grid-cols-[72px_0.8fr_1.2fr] md:items-start md:gap-8"><span className="font-display text-sm font-semibold text-accent">0{index + 1}</span><h3 className="dxw-h3">{t(`capability.${key}.title`)}</h3><p className="text-sm leading-7 text-muted-foreground">{t(`capability.${key}.description`)}</p></div>)}</div></div></section>
    <section aria-labelledby="sequence-heading" className="bg-brand py-24 text-brand-foreground md:py-32">
      <div className="dxw-container">
        <div className="max-w-3xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            <span className="font-display text-sm font-semibold text-accent">02</span>
            <span className="h-px w-8 bg-accent" />
            <span>{t('sequenceLabel')}</span>
          </p>
          <h2 id="sequence-heading" className="dxw-h2 mt-6 text-white">
            {t('sequenceHeading')}
          </h2>
        </div>

        <div className="mt-12 overflow-hidden border border-white/20 bg-[#082e6e]">
          <div className="relative aspect-[16/9] w-full sm:aspect-[21/9] lg:aspect-[24/8]">
            <Image
              src="/images/capabilities/capabilities-sequence.jpg"
              alt={t('sequenceHeading')}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {sequence.map((key, index) => (
            <div
              key={key}
              className="flex flex-col border border-white/15 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-accent"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xs font-semibold tracking-[0.16em] text-accent">
                  0{index + 1}
                </span>
                <span className="h-1 w-1 rounded-full bg-accent/60" />
              </div>
              <p className="mt-4 font-display text-base font-semibold text-white md:text-lg">
                {t(`sequence.${key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section aria-labelledby="controls-heading" className="bg-surface py-24 md:py-32"><div className="dxw-container grid gap-12 lg:grid-cols-2 lg:gap-24"><div><p className="section-label">03 <span>{t('controlsLabel')}</span></p><h2 id="controls-heading" className="dxw-h2 mt-6">{t('controlsHeading')}</h2><p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">{t('controlsDescription')}</p></div><div className="border-t border-border">{(['programme', 'visibility', 'documents', 'change', 'risk'] as const).map((key, index) => <div key={key} className="flex items-center justify-between gap-6 border-b border-border py-5"><span className="text-sm font-medium">{t(`control.${key}`)}</span><span className="text-xs font-semibold tracking-[0.16em] text-accent">0{index + 1}</span></div>)}</div></div><div className="dxw-container mt-20 border-y border-brand py-10"><p className="max-w-4xl font-display text-2xl font-semibold leading-tight md:text-4xl">“{t('earlyWarning')}”</p></div></section>
    <section aria-labelledby="quality-heading" className="bg-background py-24 md:py-32">
      <div className="dxw-container">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            <span className="font-display text-sm font-semibold text-accent">04</span>
            <span className="h-px w-8 bg-accent" />
            <span>{t('qualityLabel')}</span>
          </p>
          <h2 id="quality-heading" className="dxw-h2 mt-6 text-foreground">
            {t('qualityHeading')}
          </h2>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <p className="border-s-2 border-brand ps-5 font-display text-2xl font-medium leading-relaxed text-foreground md:text-3xl">
              “{t('qualityStatement')}”
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {(['material', 'method', 'workmanship', 'record'] as const).map((key, index) => (
                <div
                  key={key}
                  className="flex flex-col border border-border border-t-2 border-t-brand bg-surface p-6 transition-colors duration-300 hover:border-brand hover:bg-white"
                >
                  <p className="font-display text-xs font-semibold tracking-[0.16em] text-accent">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                    {t(`quality.${key}`)}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-surface shadow-sm">
              <Image
                src="/images/capabilities/capabilities-quality-management.jpg"
                alt={t('qualityHeading')}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section aria-labelledby="safety-heading" className="bg-surface py-24 md:py-32"><div className="dxw-container grid gap-12 lg:grid-cols-2 lg:gap-24"><div><p className="section-label">05 <span>{t('safetyLabel')}</span></p><h2 id="safety-heading" className="dxw-h2 mt-6">{t('safetyHeading')}</h2></div><div><p className="text-xl leading-8 text-muted-foreground md:text-2xl">{t('safetyStatement')}</p><p className="mt-8 border-s-2 border-accent ps-5 text-base font-medium leading-7">{t('safetyPrinciple')}</p></div></div></section>
    <section aria-labelledby="roadmap-heading" className="bg-background py-24 md:py-32"><div className="dxw-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><div><p className="section-label">06 <span>{t('roadmapLabel')}</span></p><h2 id="roadmap-heading" className="dxw-h2 mt-6">{t('roadmapHeading')}</h2></div><div className="dxw-reading"><p className="text-lg leading-8 text-muted-foreground">{t('roadmapDescription')}</p><div className="mt-8 border-t border-border">{(['controls', 'procurement', 'workforce', 'quality'] as const).map((key, index) => <div key={key} className="flex gap-5 border-b border-border py-5"><span className="text-xs font-semibold tracking-[0.16em] text-accent">0{index + 1}</span><p className="text-sm leading-6">{t(`roadmap.${key}`)}</p></div>)}</div></div></div></section>
    <section aria-labelledby="capabilities-cta-heading" className="bg-surface py-24 md:py-28"><div className="dxw-container flex flex-col items-start justify-between gap-8 border-t border-brand pt-8 md:flex-row md:items-end"><div><p className="section-label">07 <span>{t('ctaLabel')}</span></p><h2 id="capabilities-cta-heading" className="dxw-h2 mt-6 max-w-2xl">{t('ctaHeading')}</h2></div><Link href="/contact" className="inline-flex min-h-12 items-center bg-brand px-5 text-sm font-semibold text-white hover:bg-brand/90">{t('ctaButton')}<ArrowUpRight aria-hidden="true" className="ms-2 size-4 rtl:-scale-x-100" /></Link></div></section>
  </div>;
}
