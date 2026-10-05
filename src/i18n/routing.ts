import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Supported locales for DXW Construction
  locales: ['en', 'ar'],

  // Default locale is English
  defaultLocale: 'en',

  // Ensure /en and /ar are explicitly present in routes
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];

// Export localized navigation helpers
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
