import type { MetadataRoute } from 'next';
import { SITE_URL, LOCALES, getCanonicalUrl } from '@/lib/seo';

/**
 * Generates sitemap.xml for all 10 public localized pages.
 * Supports multilingual cross-language alternates for search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', 'about', 'capabilities', 'leadership', 'contact'];
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of LOCALES) {
      const cleanSuffix = page ? `/${page}` : '';
      entries.push({
        url: getCanonicalUrl(locale, page),
        lastModified: now,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority:
          page === ''
            ? 1.0
            : page === 'capabilities' || page === 'about'
            ? 0.8
            : 0.7,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${cleanSuffix}`,
            ar: `${SITE_URL}/ar${cleanSuffix}`,
            'x-default': `${SITE_URL}/en${cleanSuffix}`,
          },
        },
      });
    }
  }

  return entries;
}
