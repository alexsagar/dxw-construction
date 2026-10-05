import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

import WhySection from '@/components/home/WhySection';

type Translator = (key: string) => string;

function ActionLink({
  href,
  children,
  secondary = false,
  onDark = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
  onDark?: boolean;
}) {
  let style = 'bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand/90';
  if (onDark) {
    if (secondary) {
      style = 'border border-white/40 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-accent hover:bg-white/20';
    } else {
      style = 'bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand/90 hover:shadow-lg';
    }
  } else if (secondary) {
    style = 'border border-brand px-6 text-sm font-semibold text-brand transition-colors hover:bg-surface-muted';
  }

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center ${style}`}
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="ms-2 size-4 rtl:-scale-x-100" />
    </Link>
  );
}

export default function HomeSections({ t }: { t: Translator }) {
  const capabilities = ['building', 'controls', 'quality', 'procurement'] as const;
  const leadership = ['devendra', 'shen', 'deng', 'tan'] as const;
  const principles = ['integrity', 'safety', 'quality', 'accountability'] as const;

  return (
    <div>
      {/* Hero Section - Full Width Edge to Edge */}
      <section aria-labelledby="home-hero-title" className="relative w-full overflow-hidden border-b border-border bg-[#0B1F33]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home/home-hero.png"
            alt={t('heroVisualLabel')}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35 md:bg-gradient-to-r md:from-[#07172b]/95 md:via-[#07172b]/75 md:to-black/30 rtl:md:bg-gradient-to-l rtl:md:from-[#07172b]/95 rtl:md:via-[#07172b]/75 rtl:md:to-black/30" />
        </div>

        <div className="dxw-container relative z-10 flex min-h-[560px] flex-col justify-center py-20 md:min-h-[640px] md:py-28 lg:min-h-[700px]">
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="h-px w-8 bg-accent" />
              {t('heroLabel')}
            </p>
            <h1 id="home-hero-title" className="dxw-h1 text-white">
              {t('heroTitleLineOne')}<br />{t('heroTitleLineTwo')}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/85 md:text-xl md:leading-9">
              {t('heroDescription')}
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <ActionLink href="/contact" onDark>{t('startAnEnquiry')}</ActionLink>
              <ActionLink href="/capabilities" secondary onDark>{t('secondaryCta')}</ActionLink>
            </div>
            <p className="mt-12 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              {t('location')}
            </p>
          </div>
        </div>
      </section>

      {/* 01 Company Statement */}
      <section aria-labelledby="company-heading" className="bg-background py-24 md:py-32">
        <div className="dxw-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="section-label">
              01 <span>{t('companyLabel')}</span>
            </p>
            <h2 id="company-heading" className="dxw-h2 mt-6 max-w-xl">
              {t('companyHeading')}
            </h2>
          </div>
          <div className="dxw-reading lg:pt-12">
            <p className="text-2xl font-medium leading-relaxed text-foreground md:text-3xl">
              {t('companyStatement')}
            </p>
            <div className="mt-8 h-px w-16 bg-accent" />
            <p className="mt-8 text-base leading-7 text-muted-foreground">
              {t('companyDescription')}
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center text-sm font-semibold text-brand transition-colors hover:text-charcoal"
              >
                {t('exploreCompany')}
                <ArrowUpRight aria-hidden="true" className="ms-2 size-4 rtl:-scale-x-100" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Capabilities Overview */}
      <section aria-labelledby="capabilities-heading" className="bg-surface py-24 md:py-32">
        <div className="dxw-container">
          <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
            <div>
              <p className="section-label">
                02 <span>{t('capabilitiesLabel')}</span>
              </p>
              <h2 id="capabilities-heading" className="dxw-h2 mt-6">
                {t('capabilitiesHeading')}
              </h2>
            </div>
            <p className="dxw-reading text-muted-foreground">
              {t('capabilitiesIntro')}
            </p>
          </div>

          <div className="mt-4">
            {capabilities.map((key, index) => (
              <Link
                href="/capabilities"
                key={key}
                className="group grid grid-cols-[52px_1fr_auto] items-center gap-4 border-b border-border py-7 transition-colors hover:border-brand md:grid-cols-[72px_1fr_1.1fr_auto] md:gap-8"
              >
                <span className="font-display text-sm font-semibold text-accent">0{index + 1}</span>
                <h3 className="dxw-h3 transition-colors group-hover:text-brand">
                  {t(`capability.${key}.title`)}
                </h3>
                <p className="hidden text-sm leading-6 text-muted-foreground md:block">
                  {t(`capability.${key}.description`)}
                </p>
                <ArrowUpRight aria-hidden="true" className="size-5 text-brand transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100" />
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/capabilities"
              className="inline-flex items-center text-sm font-semibold text-brand transition-colors hover:text-charcoal"
            >
              {t('viewCapabilities')}
              <ArrowUpRight aria-hidden="true" className="ms-2 size-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>

      {/* 03 Why DXW */}
      <WhySection />

      {/* 04 Leadership Overview */}
      <section aria-labelledby="leadership-heading" className="bg-background py-24 md:py-32">
        <div className="dxw-container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="section-label">
                04 <span>{t('leadershipLabel')}</span>
              </p>
              <h2 id="leadership-heading" className="dxw-h2 mt-6 max-w-2xl">
                {t('leadershipHeading')}
              </h2>
            </div>
            <p className="dxw-reading text-muted-foreground">
              {t('leadershipIntro')}
            </p>
          </div>

          <div className="mt-14 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((key, index) => (
              <Link
                href={`/leadership#${key}`}
                key={key}
                className="group border-b border-border py-8 transition-colors hover:bg-surface/50 sm:nth-[odd]:border-e sm:px-6 lg:border-e lg:last:border-e-0 lg:px-6 lg:first:ps-0 lg:last:pe-0"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold tracking-[0.16em] text-accent">0{index + 1}</p>
                  <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand rtl:group-hover:-translate-x-0.5 rtl:-scale-x-100" />
                </div>

                <h3 className="mt-6 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-brand">
                  {t(`leadership.${key}.name`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t(`leadership.${key}.descriptor`)}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/leadership"
              className="inline-flex items-center text-sm font-semibold text-brand transition-colors hover:text-charcoal"
            >
              {t('meetLeadership')}
              <ArrowUpRight aria-hidden="true" className="ms-2 size-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>

      {/* 05 Operating Principles */}
      <section aria-labelledby="principles-heading" className="relative overflow-hidden bg-surface py-24 md:py-32">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/home/home-principles.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#f7f7f5]/85 backdrop-blur-[1px]" />
        </div>

        <div className="dxw-container relative z-10">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              <span className="font-display text-sm font-semibold text-accent">05</span>
              <span className="h-px w-8 bg-accent" />
              <span>{t('principlesLabel')}</span>
            </p>
            <h2 id="principles-heading" className="dxw-h2 mt-6 text-foreground">
              {t('principlesHeading')}
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((key, index) => (
              <div
                key={key}
                className="flex flex-col border border-border border-t-2 border-t-brand bg-white/95 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-brand hover:bg-white hover:shadow-md md:p-8"
              >
                <p className="font-display text-xs font-semibold tracking-[0.16em] text-accent">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                  {t(`principle.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(`principle.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 UAE Commitment */}
      <section aria-labelledby="uae-heading" className="bg-background py-24 md:py-32">
        <div className="dxw-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-surface shadow-sm">
            <Image
              src="/images/home/home-uae-commitment.png"
              alt={t('uaeHeading')}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div>
            <p className="section-label">
              06 <span>{t('uaeLabel')}</span>
            </p>
            <h2 id="uae-heading" className="dxw-h2 mt-6 max-w-xl">
              {t('uaeHeading')}
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
              {t('uaeDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* 07 Next Steps CTA */}
      <section aria-labelledby="cta-heading" className="bg-surface py-24 md:py-32">
        <div className="dxw-container">
          <div className="border-t border-brand pt-8 md:flex md:items-end md:justify-between md:gap-12">
            <div>
              <p className="section-label">
                07 <span>{t('ctaLabel')}</span>
              </p>
              <h2 id="cta-heading" className="dxw-h2 mt-6 max-w-2xl">
                {t('ctaHeading')}
              </h2>
            </div>
            <div className="mt-8 md:mt-0">
              <ActionLink href="/contact">{t('startAnEnquiry')}</ActionLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
