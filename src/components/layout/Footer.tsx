import { getTranslations } from 'next-intl/server';
import { ArrowUpRight, Clock, Mail, MapPin } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Separator } from '@/components/ui/separator';
import LanguageSwitcher from './LanguageSwitcher';
import BrandLogo from './BrandLogo';
import BackToTop from './BackToTop';

export default async function Footer() {
  const t = await getTranslations('Navigation');
  const common = await getTranslations('Common');
  const tHome = await getTranslations('HomePage');
  const tContact = await getTranslations('ContactPage');

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/capabilities', label: t('capabilities') },
    { href: '/leadership', label: t('leadership') },
    { href: '/contact', label: t('contact') },
  ] as const;

  const capabilityItems = [
    { href: '/capabilities', label: tHome('capability.building.title') },
    { href: '/capabilities', label: tHome('capability.controls.title') },
    { href: '/capabilities', label: tHome('capability.quality.title') },
    { href: '/capabilities', label: tHome('capability.procurement.title') },
  ] as const;

  return (
    <footer
      role="contentinfo"
      aria-label={t('footerNavigation')}
      className="relative overflow-hidden bg-gradient-to-b from-[#092c63] via-[#06204c] to-[#041433] text-brand-foreground"
    >
      {/* Architectural Top Accent Hairline */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent/80 to-transparent" />

      {/* Subtle Blueprint Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient Accent Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 start-1/2 -translate-x-1/2 size-96 rounded-full bg-accent/5 blur-3xl"
      />

      <div className="dxw-container relative z-10 py-12 md:py-16 lg:py-20">
        {/* Executive Action & Scope Bar */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold uppercase tracking-[0.14em] text-accent">
              {tContact('licenseLabel')}: <span className="font-mono text-white">{tContact('licenseValue')}</span>
            </span>
            <span className="hidden text-white/30 sm:inline">•</span>
            <span className="text-white/75">
              {tContact('activityValue')}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="mailto:contact@dxwconstruction.com"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-white/85 transition-colors hover:text-accent"
            >
              <Mail className="size-3.5 text-accent" aria-hidden="true" />
              <span>contact@dxwconstruction.com</span>
            </a>
            <Link
              href="/contact"
              className="group inline-flex min-h-10 items-center gap-2 rounded bg-accent px-4 py-2 text-xs font-semibold tracking-wider uppercase text-accent-foreground shadow-sm transition-all hover:bg-accent/90 hover:shadow-md"
            >
              <span>{t('startAnEnquiry')}</span>
              <ArrowUpRight
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 rtl:-scale-x-100"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Main 4-Column Directory Grid */}
        <div className="grid gap-12 pt-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.85fr_1.05fr_1.2fr] lg:gap-12">
          {/* Column 1: Identity & Foundation */}
          <div className="space-y-4">
            <Link href="/" className="inline-block" aria-label={common('brandName')}>
              <BrandLogo
                dark
                className="shadow-sm ring-1 ring-white/15 transition-all hover:ring-accent/40"
              />
            </Link>
            <div className="space-y-1.5 pt-1">
              <p className="font-display text-base font-semibold tracking-tight text-white md:text-lg">
                {common('brandName')}
              </p>
              <p className="font-display text-sm font-medium leading-relaxed text-accent">
                {common('positioningLine')}
              </p>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-white/70">
              {tHome('heroDescription')}
            </p>
            <div className="pt-0.5">
              <span className="inline-flex items-center gap-1.5 rounded border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/80">
                <span className="text-accent">{tContact('licenseLabel')}:</span>
                <span className="font-mono text-white">{tContact('licenseValue')}</span>
              </span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <nav aria-label={t('footerNavigation')}>
            <div className="flex items-center gap-2">
              <span className="h-3 w-0.5 bg-accent" />
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-accent">
                {t('navigationLabel')}
              </p>
            </div>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/75 transition-all duration-200 hover:text-white ltr:hover:translate-x-1 rtl:hover:-translate-x-1"
                  >
                    <span className="size-1 rounded-full bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Core Disciplines */}
          <div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-0.5 bg-accent" />
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-accent">
                {t('capabilities')}
              </p>
            </div>
            <ul className="mt-5 space-y-3">
              {capabilityItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/75 transition-all duration-200 hover:text-white ltr:hover:translate-x-1 rtl:hover:-translate-x-1"
                  >
                    <span className="size-1 rounded-full bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Dubai Office Particulars */}
          <div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-0.5 bg-accent" />
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-accent">
                {t('contact')}
              </p>
            </div>
            <div className="mt-5 space-y-4 text-xs text-white/80">
              <div className="flex items-start gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded border border-white/10 bg-white/5 text-accent">
                  <MapPin className="size-3.5" aria-hidden="true" />
                </div>
                <div className="pt-0.5 leading-relaxed">
                  <p className="font-semibold text-white">{common('brandLocation')}</p>
                  <p className="text-white/60">{tContact('locationLabel')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded border border-white/10 bg-white/5 text-accent">
                  <Mail className="size-3.5" aria-hidden="true" />
                </div>
                <div className="pt-0.5 leading-relaxed">
                  <a
                    href="mailto:contact@dxwconstruction.com"
                    className="font-medium text-white/90 underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    contact@dxwconstruction.com
                  </a>
                  <p className="text-white/60">{tContact('inquiriesLabel')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded border border-white/10 bg-white/5 text-accent">
                  <Clock className="size-3.5" aria-hidden="true" />
                </div>
                <div className="pt-0.5 leading-relaxed">
                  <p className="font-semibold text-white">{tContact('hoursValue')}</p>
                  <p className="text-white/60">{tContact('hoursLabel')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        {/* Sub-Footer / Legal & Utility Bar */}
        <div className="flex flex-col gap-6 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
            <p>© {new Date().getFullYear()} {common('brandName')}</p>
            <span className="hidden text-white/30 sm:inline">•</span>
            <p>{tContact('licenseLabel')}: {tContact('licenseValue')}</p>
            <span className="hidden text-white/30 sm:inline">•</span>
            <p>{common('legalLine')}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <LanguageSwitcher variant="footer" />
            <BackToTop label={t('backToTop')} />
          </div>
        </div>
      </div>
    </footer>
  );
}
