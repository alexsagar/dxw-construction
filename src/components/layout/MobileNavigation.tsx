'use client';

import { Menu } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import LanguageSwitcher from './LanguageSwitcher';

export default function MobileNavigation() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  const common = useTranslations('Common');

  const items = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/capabilities', label: t('capabilities') },
    { href: '/leadership', label: t('leadership') },
    { href: '/contact', label: t('contact') },
  ] as const;

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon-lg" aria-label={t('openMenu')} />
        }
      >
        <Menu aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side={locale === 'ar' ? 'left' : 'right'}
        className="w-[min(88vw,380px)] border-border bg-background p-0"
      >
        <SheetHeader className="border-b border-border px-6 py-6 text-start">
          <SheetTitle className="font-display text-sm font-semibold tracking-[0.12em] text-brand">
            {common('brandName')}
          </SheetTitle>
        </SheetHeader>
        <nav aria-label={t('mainNavigation')} className="flex-1 px-6 py-8">
          <ul className="space-y-1">
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex min-h-14 items-center border-b px-1 text-lg transition-colors ${
                      active
                        ? 'border-accent font-semibold text-brand'
                        : 'border-border text-foreground hover:border-accent hover:text-brand'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8">
            <LanguageSwitcher mobile />
          </div>
        </nav>
        <SheetFooter className="border-t border-border px-6 py-6">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center bg-brand px-5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
          >
            {t('startAnEnquiry')}
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
