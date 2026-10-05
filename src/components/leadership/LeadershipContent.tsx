import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

type Translator = (key: string) => string;

export default function LeadershipContent({ t }: { t: Translator }) {
  const leaders = ['devendra', 'shen', 'deng', 'tan'] as const;
  const pillars = ['shareholder', 'technical', 'controls'] as const;
  const matrix = ['corporate', 'construction', 'controls', 'workforce', 'risk', 'procurement'] as const;

  return (
    <div className="leadership-page">
      {/* Hero Section - Full Width Edge to Edge */}
      <section className="relative w-full overflow-hidden border-b border-border bg-[#0B1F33]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/leadership/leadership-governance.jpg"
            alt={t('heroVisualLabel')}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35 md:bg-gradient-to-r md:from-[#07172b]/95 md:via-[#07172b]/75 md:to-black/30 rtl:md:bg-gradient-to-l rtl:md:from-[#07172b]/95 rtl:md:via-[#07172b]/75 rtl:md:to-black/30" />
        </div>

        <div className="dxw-container relative z-10 flex min-h-[520px] flex-col justify-center py-20 md:min-h-[600px] md:py-24">
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
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand/90 hover:shadow-lg"
              >
                {t('contactCta')}
                <ArrowUpRight aria-hidden="true" className="ms-2 size-4 rtl:-scale-x-100" />
              </Link>
              <Link
                href="/capabilities"
                className="inline-flex min-h-12 items-center border border-white/40 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-accent hover:bg-white/20"
              >
                {t('capabilitiesCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 01 Operating Model & Governance Philosophy */}
      <section aria-labelledby="model-heading" className="bg-background py-24 md:py-32">
        <div className="dxw-container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="section-label">
                01 <span>{t('modelLabel')}</span>
              </p>
              <h2 id="model-heading" className="dxw-h2 mt-6">
                {t('modelHeading')}
              </h2>
            </div>
            <div className="dxw-reading lg:pt-8">
              <p className="border-s-2 border-brand ps-6 text-2xl font-medium leading-relaxed text-foreground md:text-3xl">
                “{t('modelStatement')}”
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {pillars.map((key, index) => (
              <div
                key={key}
                className="flex flex-col border border-border border-t-2 border-t-brand bg-surface p-8 transition-colors duration-300 hover:border-brand hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-semibold tracking-[0.16em] text-accent">
                    0{index + 1}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                  {t(`model.${key}.title`)}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {t(`model.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 Leadership Profiles */}
      <section aria-labelledby="profiles-heading" className="bg-surface py-24 md:py-32">
        <div className="dxw-container">
          <div className="max-w-3xl">
            <p className="section-label">
              02 <span>{t('profilesLabel')}</span>
            </p>
            <h2 id="profiles-heading" className="dxw-h2 mt-6">
              {t('profilesHeading')}
            </h2>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              {t('profilesDescription')}
            </p>

            {/* Quick in-page anchor jump to profiles */}
            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              {leaders.map((key, index) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="inline-flex items-center gap-2 border border-border bg-white px-4 py-2 text-xs font-semibold text-foreground transition-all duration-200 hover:border-brand hover:bg-brand hover:text-white"
                >
                  <span className="font-display text-[10px] text-accent">0{index + 1}</span>
                  <span>{t(`profile.${key}.name`)}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {leaders.map((key, index) => (
              <article
                key={key}
                id={key}
                className="scroll-mt-28 md:scroll-mt-32 flex flex-col justify-between border border-border bg-white p-8 transition-all duration-300 hover:border-brand/60 hover:shadow-sm md:p-10"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
                    <div>
                      <span className="font-display text-xs font-semibold tracking-[0.16em] text-accent">
                        LEADER 0{index + 1}
                      </span>
                      <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                        {t(`profile.${key}.name`)}
                      </h3>
                    </div>
                    <span className="inline-block border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
                      {t(`profile.${key}.origin`)}
                    </span>
                  </div>

                  <p className="mt-4 font-display text-sm font-semibold text-brand">
                    {t(`profile.${key}.role`)}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    {t(`profile.${key}.bio`)}
                  </p>
                </div>

                <div className="mt-8 border-s-2 border-accent bg-surface p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
                    Distinctive Contribution
                  </p>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">
                    {t(`profile.${key}.contribution`)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 Management Strength Matrix */}
      <section aria-labelledby="matrix-heading" className="bg-brand py-24 text-brand-foreground md:py-32">
        <div className="dxw-container">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              <span className="font-display text-sm font-semibold text-accent">03</span>
              <span className="h-px w-8 bg-accent" />
              <span>{t('matrixLabel')}</span>
            </p>
            <h2 id="matrix-heading" className="dxw-h2 mt-6 text-white">
              {t('matrixHeading')}
            </h2>
            <p className="mt-6 text-base leading-7 text-white/75">
              {t('matrixDescription')}
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matrix.map((key, index) => (
              <div
                key={key}
                className="flex flex-col border border-white/15 bg-white/[0.04] p-7 transition-colors duration-300 hover:border-accent"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-semibold tracking-[0.16em] text-accent">
                    0{index + 1}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-accent/60" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">
                  {t(`matrix.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {t(`matrix.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Responsible Growth Quote Banner */}
      <section aria-labelledby="growth-quote" className="bg-surface py-20 md:py-28">
        <div className="dxw-container">
          <div className="border-y border-brand py-10 md:py-14">
            <p className="section-label">
              04 <span>Operating Discipline</span>
            </p>
            <h2 id="growth-quote" className="mt-8 max-w-5xl font-display text-2xl font-semibold leading-tight text-foreground md:text-4xl">
              “{t('growthQuote')}”
            </h2>
          </div>
        </div>
      </section>

      {/* 05 Next Step CTA */}
      <section aria-labelledby="leadership-cta-heading" className="bg-background py-24 md:py-28">
        <div className="dxw-container flex flex-col items-start justify-between gap-8 border-t border-border pt-8 md:flex-row md:items-end">
          <div>
            <p className="section-label">
              05 <span>{t('nextLabel')}</span>
            </p>
            <h2 id="leadership-cta-heading" className="dxw-h2 mt-6">
              {t('nextHeading')}
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
            >
              {t('contactCta')}
              <ArrowUpRight aria-hidden="true" className="ms-2 size-4 rtl:-scale-x-100" />
            </Link>
            <Link
              href="/capabilities"
              className="inline-flex min-h-12 items-center border border-brand px-6 text-sm font-semibold text-brand transition-colors hover:bg-surface-muted"
            >
              {t('capabilitiesCta')}
              <ArrowUpRight aria-hidden="true" className="ms-2 size-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
