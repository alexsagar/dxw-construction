import type { Metadata } from 'next';

/**
 * Single source of truth for SEO and domain configuration.
 * Configurable via NEXT_PUBLIC_SITE_URL environment variable.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dxwconstruction.com'
).replace(/\/+$/, '');

export const SITE_NAME = 'DXW Construction';
export const LEGAL_NAME = 'D X W CONSTRUCTION L.L.C.';
export const AR_SITE_NAME = 'دي إكس دبليو للمقاولات ذ.م.م';
export const LICENSE_NUMBER = '1654877';

export const LOCALES = ['en', 'ar'] as const;
export type SupportedLocale = (typeof LOCALES)[number];

/**
 * Returns the fully qualified canonical URL for a given locale and subpath.
 */
export function getCanonicalUrl(locale: string, path = ''): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  if (!cleanPath) {
    return `${SITE_URL}/${locale}`;
  }
  return `${SITE_URL}/${locale}/${cleanPath}`;
}

/**
 * Returns alternate language URLs (hreflang) including x-default (English).
 */
export function getLanguageAlternates(path = ''): Record<string, string> {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const suffix = cleanPath ? `/${cleanPath}` : '';
  return {
    en: `${SITE_URL}/en${suffix}`,
    ar: `${SITE_URL}/ar${suffix}`,
    'x-default': `${SITE_URL}/en${suffix}`,
  };
}

interface PageMetadataOptions {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords?: string[] | string;
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Reusable metadata builder compliant with Next.js App Router Metadata API.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  ogImage,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const isArabic = locale === 'ar';
  const canonicalUrl = getCanonicalUrl(locale, path);
  const siteTitle = isArabic ? AR_SITE_NAME : SITE_NAME;
  const defaultOgPath = isArabic
    ? '/images/og/og-dxw-construction-ar.jpg'
    : '/images/og/og-dxw-construction.jpg';
  const resolvedOgImage = ogImage || defaultOgPath;
  const ogImageUrl = resolvedOgImage.startsWith('http')
    ? resolvedOgImage
    : `${SITE_URL}${resolvedOgImage}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteTitle,
      locale: isArabic ? 'ar_AE' : 'en_US',
      alternateLocale: isArabic ? ['en_US'] : ['ar_AE'],
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${LEGAL_NAME} - ${title}`,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

/**
 * Primary Organization Structured Data (JSON-LD).
 * Note: Conservative Organization schema is preferred over LocalBusiness
 * because local SEO remains incomplete pending verified street address/phone.
 */
export function getOrganizationSchema(locale: string) {
  const isArabic = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: LEGAL_NAME,
    alternateName: isArabic
      ? ['DXW Construction', 'دي إكس دبليو للمقاولات ذ.م.م']
      : ['DXW Construction', 'دي إكس دبليو للمقاولات'],
    url: SITE_URL,
    logo: `${SITE_URL}/brand/dxw-logo-mark.png`,
    image: `${SITE_URL}/brand/dxw-logo-full.png`,
    description: isArabic
      ? 'شركة إنشاءات تركز على دبي ومبنية لتحقيق نمو مسؤول ومستدام على المدى الطويل. قيادة متمرسة. تنفيذ منضبط.'
      : 'A Dubai-focused construction company built for responsible long-term growth. Experienced Leadership. Disciplined Delivery.',
    foundingDate: '2026',
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'Dubai Commercial License',
      value: LICENSE_NUMBER,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'contact@dxwconstruction.com',
      areaServed: 'AE',
      availableLanguage: ['English', 'Arabic'],
    },
    knowsAbout: [
      'Commercial Construction Delivery',
      'Project Management & Controls',
      'Construction Quality Management',
      'Health, Safety & Environment (HSE)',
      'Procurement & Supply Chain Logistics',
    ],
  };
}

/**
 * WebSite Structured Data (JSON-LD).
 */
export function getWebSiteSchema(locale: string) {
  const isArabic = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: isArabic ? AR_SITE_NAME : SITE_NAME,
    alternateName: LEGAL_NAME,
    inLanguage: ['en', 'ar'],
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

/**
 * WebPage Structured Data (JSON-LD).
 */
export function getWebPageSchema({
  title,
  description,
  url,
  locale,
  type = 'WebPage',
}: {
  title: string;
  description: string;
  url: string;
  locale: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}/#${type.toLowerCase()}`,
    url,
    name: title,
    description,
    inLanguage: locale === 'ar' ? 'ar' : 'en',
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

/**
 * BreadcrumbList Structured Data (JSON-LD).
 */
export function getBreadcrumbSchema(
  locale: string,
  items: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(locale, item.path),
    })),
  };
}

/**
 * Leadership Person Structured Data (JSON-LD).
 * Strictly evidence-based: Uses only publicly supported information from Leadership profiles.
 * Omits unverified executive job titles or external credentials.
 */
export function getLeadershipPersonsSchema(locale: string = 'en') {
  const isArabic = locale === 'ar';
  const leaders = isArabic
    ? [
        {
          name: 'ديفيندرا باجاي',
          description:
            'قيادة الأعمال، أنظمة القوى العاملة، إدارة المخاطر، وشبكات التوظيف الدولية.',
        },
        {
          name: 'شين بو',
          description:
            'عمليات الإنشاءات، إدارة تسليم المشاريع، مشتريات مواد البناء، والإدارة التجارية.',
        },
        {
          name: 'دينغ جونهونغ',
          description:
            'عضوية مجالس إدارة شركات الإنشاءات، الحوكمة المؤسسية، وتنسيق الشركاء والامتثال.',
        },
        {
          name: 'تان سيوك هيانغ',
          description:
            'استراتيجية القوى العاملة، تخطيط وحشد الموارد البشرية، والشراكات التشغيلية الدولية.',
        },
      ]
    : [
        {
          name: 'Devendra Bajgai',
          description:
            'Business leadership, workforce systems, risk discipline, and international recruitment networks context.',
        },
        {
          name: 'Shen Pu',
          description:
            'Construction operations, practical project delivery management, building materials procurement, and commercial management.',
        },
        {
          name: 'Deng Junhong',
          description:
            'Construction-company directorship, corporate governance, partner coordination, and operational compliance.',
        },
        {
          name: 'Tan Seok Hiang',
          description:
            'Workforce strategy, manpower planning and mobilisation, multinational client engagement, and operating partnerships.',
        },
      ];

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isArabic
      ? 'قيادة وحوكمة دي إكس دبليو للمقاولات'
      : 'DXW Construction Leadership & Governance',
    itemListElement: leaders.map((leader, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: leader.name,
        description: leader.description,
        worksFor: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
    })),
  };
}
