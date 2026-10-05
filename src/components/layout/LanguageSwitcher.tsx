'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';

interface LanguageSwitcherProps {
  mobile?: boolean;
  variant?: 'default' | 'mobile' | 'footer';
  className?: string;
}

export default function LanguageSwitcher({
  mobile = false,
  variant,
  className = '',
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('Common');
  const nextLocale = locale === 'en' ? 'ar' : 'en';

  const effectiveVariant = variant || (mobile ? 'mobile' : 'default');

  // Footer dark variant
  if (effectiveVariant === 'footer') {
    return (
      <Link
        href={pathname}
        locale={nextLocale}
        aria-label={t('switchLanguage')}
        className={`group inline-flex min-h-10 items-center gap-2 rounded border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-white/85 backdrop-blur-sm transition-all hover:border-accent hover:bg-white/10 hover:text-white focus-visible:outline-white ${className}`}
      >
        <Globe
          className="size-3.5 text-accent transition-transform duration-300 group-hover:rotate-12"
          aria-hidden="true"
        />
        <span>{locale === 'en' ? 'العربية' : 'English'}</span>
      </Link>
    );
  }

  // Mobile drawer variant
  if (effectiveVariant === 'mobile') {
    return (
      <Link
        href={pathname}
        locale={nextLocale}
        aria-label={t('switchLanguage')}
        className={`group flex min-h-12 w-full items-center justify-between rounded border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:border-brand/40 hover:bg-surface-muted hover:text-brand ${className}`}
      >
        <span className="flex items-center gap-2.5">
          <Globe
            className="size-4 text-brand transition-transform duration-300 group-hover:rotate-12"
            aria-hidden="true"
          />
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            {locale === 'en' ? 'Language' : 'اللغة'}
          </span>
        </span>
        <span className="rounded bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
          {locale === 'en' ? 'العربية' : 'English'}
        </span>
      </Link>
    );
  }

  // Navbar default variant (Desktop & Mobile Header)
  return (
    <Link
      href={pathname}
      locale={nextLocale}
      aria-label={t('switchLanguage')}
      className={`group inline-flex min-h-10 items-center gap-2 rounded border border-border/80 bg-white/90 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-foreground shadow-2xs backdrop-blur-sm transition-all hover:border-brand/40 hover:bg-surface-muted hover:text-brand focus-visible:outline-brand ${className}`}
    >
      <Globe
        className="size-3.5 text-brand transition-transform duration-300 group-hover:rotate-12"
        aria-hidden="true"
      />
      <span>{locale === 'en' ? 'العربية' : 'English'}</span>
    </Link>
  );
}
