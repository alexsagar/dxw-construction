import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

type Translator = (key: string) => string;

export default function AboutContent({ t }: { t: Translator }) {
  const values = ['integrity', 'safety', 'quality', 'accountability', 'performance', 'respect', 'partnership', 'improvement'] as const;

  return (
    <div className="about-page">
      {/* Hero Section - Full Width Edge to Edge */}
      <section className="relative w-full overflow-hidden border-b border-border bg-[#0B1F33]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/about-planning.png"
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

      {/* 01 Who We Are */}
      <section aria-labelledby="who-heading" className="bg-background py-24 md:py-32">
        <div className="dxw-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="section-label">
              01 <span>{t('whoLabel')}</span>
            </p>
            <h2 id="who-heading" className="dxw-h2 mt-6">{t('whoHeading')}</h2>
          </div>
          <div className="dxw-reading lg:pt-8">
            <p className="border-s-2 border-brand ps-6 text-2xl font-medium leading-relaxed text-foreground md:text-3xl">
              {t('whoStatement')}
            </p>
            <p className="mt-8 text-base leading-7 text-muted-foreground">
              {t('whoDescription')}
            </p>
            <div className="mt-8">
              <Link
                href="/capabilities"
                className="inline-flex items-center text-sm font-semibold text-brand transition-colors hover:text-charcoal"
              >
                {t('exploreCapabilities')}
                <ArrowUpRight aria-hidden="true" className="ms-2 size-4 rtl:-scale-x-100" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02 The DXW Story */}
      <section aria-labelledby="story-heading" className="bg-surface py-24 md:py-32">
        <div className="dxw-container">
          <div className="max-w-2xl">
            <p className="section-label">
              02 <span>{t('storyLabel')}</span>
            </p>
            <h2 id="story-heading" className="dxw-h2 mt-6">{t('storyHeading')}</h2>
          </div>
          <div className="mt-14 grid border-t border-border md:grid-cols-3">
            {(['established', 'experience', 'nextChapter'] as const).map((key) => (
              <div
                key={key}
                className="border-b border-border py-8 md:border-e md:px-8 md:first:ps-0 md:last:border-e-0 md:last:pe-0"
              >
                <p className="font-display text-3xl font-semibold text-brand">
                  {t(`story.${key}.title`)}
                </p>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  {t(`story.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 & 04 Vision & Mission */}
      <section aria-labelledby="vision-heading" className="bg-gradient-to-br from-[#0b3d91] via-[#093275] to-[#062456] py-24 text-brand-foreground md:py-32">
        <div className="dxw-container grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              <span className="font-display text-sm font-semibold text-accent">03</span>
              <span className="h-px w-8 bg-accent" />
              <span>{t('visionLabel')}</span>
            </p>
            <h2 id="vision-heading" className="dxw-h2 mt-6 text-white">{t('visionTitle')}</h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/80">{t('visionDescription')}</p>
          </div>
          <div className="border-t border-white/20 pt-8 lg:border-s lg:border-t-0 lg:ps-12 lg:pt-0">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              <span className="font-display text-sm font-semibold text-accent">04</span>
              <span className="h-px w-8 bg-accent" />
              <span>{t('missionLabel')}</span>
            </p>
            <h2 className="dxw-h2 mt-6 text-white">{t('missionTitle')}</h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/80">{t('missionDescription')}</p>
          </div>
        </div>
      </section>

      {/* 05 Growth Principle */}
      <section aria-labelledby="growth-heading" className="bg-background py-24 md:py-32">
        <div className="dxw-container">
          <div className="border-y border-brand py-10 md:py-14">
            <p className="section-label">
              05 <span>{t('growthLabel')}</span>
            </p>
            <h2 id="growth-heading" className="mt-8 max-w-5xl font-display text-2xl font-semibold leading-tight text-foreground md:text-4xl">
              “{t('growthStatement')}”
            </h2>
          </div>
        </div>
      </section>

      {/* 06 Values */}
      <section aria-labelledby="values-heading" className="bg-surface py-24 md:py-32">
        <div className="dxw-container">
          <div className="max-w-2xl">
            <p className="section-label">
              06 <span>{t('valuesLabel')}</span>
            </p>
            <h2 id="values-heading" className="dxw-h2 mt-6">{t('valuesHeading')}</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((key, index) => (
              <div
                key={key}
                className="flex flex-col border border-border border-t-2 border-t-brand bg-white p-7 shadow-sm transition-all duration-300 hover:border-brand hover:shadow-md md:p-8"
              >
                <p className="font-display text-xs font-semibold tracking-[0.16em] text-accent">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                  {t(`value.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {t(`value.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 Next Steps CTA */}
      <section aria-labelledby="about-cta-heading" className="bg-background py-24 md:py-28">
        <div className="dxw-container flex flex-col items-start justify-between gap-8 border-t border-border pt-8 md:flex-row md:items-end">
          <div>
            <p className="section-label">
              07 <span>{t('nextLabel')}</span>
            </p>
            <h2 id="about-cta-heading" className="dxw-h2 mt-6">{t('nextHeading')}</h2>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/leadership"
              className="inline-flex min-h-12 items-center bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
            >
              {t('leadershipCta')}
              <ArrowUpRight aria-hidden="true" className="ms-2 size-4 rtl:-scale-x-100" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center border border-brand px-6 text-sm font-semibold text-brand transition-colors hover:bg-surface-muted"
            >
              {t('contactCta')}
              <ArrowUpRight aria-hidden="true" className="ms-2 size-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
