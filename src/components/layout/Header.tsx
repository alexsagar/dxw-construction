'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Separator } from '@/components/ui/separator';
import LanguageSwitcher from './LanguageSwitcher';
import MobileNavigation from './MobileNavigation';
import BrandLogo from './BrandLogo';

export default function Header() {
  const t = useTranslations('Navigation');
  const tCommon = useTranslations('Common');
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/capabilities', label: t('capabilities') },
    { href: '/leadership', label: t('leadership') },
    { href: '/contact', label: t('contact') },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-surface/95 backdrop-blur-md">
      <div className="dxw-container flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label={tCommon('brandName')} className="flex shrink-0 items-center">
          <BrandLogo />
        </Link>

        <nav aria-label={t('mainNavigation')} className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative inline-flex h-20 items-center px-1 text-sm font-medium transition-colors ${
                  active
                    ? 'font-semibold text-brand'
                    : 'text-muted-foreground hover:text-brand'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center bg-brand px-5 text-sm font-semibold text-brand-foreground transition-all hover:bg-brand/90 hover:shadow-sm"
          >
            {t('startAnEnquiry')}
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <Separator orientation="vertical" className="h-6" />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
