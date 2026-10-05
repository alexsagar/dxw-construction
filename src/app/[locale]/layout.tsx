import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Inter, Manrope, Noto_Sans_Arabic } from 'next/font/google';
import { routing, type Locale } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StructuredData from '@/components/seo/StructuredData';
import {
  SITE_URL,
  SITE_NAME,
  AR_SITE_NAME,
  LEGAL_NAME,
  getCanonicalUrl,
  getLanguageAlternates,
  getOrganizationSchema,
  getWebSiteSchema,
} from '@/lib/seo';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-arabic',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isArabic = locale === 'ar';
  const siteName = isArabic ? AR_SITE_NAME : SITE_NAME;
  const defaultTitle = isArabic
    ? 'دي إكس دبليو للمقاولات | شركة مقاولات وإنشاءات في دبي'
    : 'DXW Construction | Construction Company in Dubai, UAE';
  const defaultDesc = isArabic
    ? 'دي إكس دبليو هي شركة مقاولات في دبي تركز على التنفيذ المنضبط والقيادة المتمرسة والنمو المسؤول في دولة الإمارات.'
    : 'DXW Construction is a Dubai construction company focused on disciplined delivery, experienced leadership, and responsible growth in the UAE.';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${siteName}`,
      default: defaultTitle,
    },
    description: defaultDesc,
    alternates: {
      canonical: getCanonicalUrl(locale),
      languages: getLanguageAlternates(),
    },
    openGraph: {
      title: defaultTitle,
      description: defaultDesc,
      url: getCanonicalUrl(locale),
      siteName,
      locale: isArabic ? 'ar_AE' : 'en_US',
      alternateLocale: isArabic ? ['en_US'] : ['ar_AE'],
      type: 'website',
      images: [
        {
          url: isArabic
            ? `${SITE_URL}/images/og/og-dxw-construction-ar.jpg`
            : `${SITE_URL}/images/og/og-dxw-construction.jpg`,
          width: 1200,
          height: 630,
          alt: `${LEGAL_NAME} - Dubai, UAE`,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description: defaultDesc,
      images: [
        isArabic
          ? `${SITE_URL}/images/og/og-dxw-construction-ar.jpg`
          : `${SITE_URL}/images/og/og-dxw-construction.jpg`,
      ],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/brand/dxw-logo-mark.png',
    },
    robots: {
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Retrieve messages for client components
  const messages = await getMessages();

  const isRtl = locale === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';

  // Global structured data entities
  const organizationSchema = getOrganizationSchema(locale);
  const webSiteSchema = getWebSiteSchema(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${manrope.variable} ${notoArabic.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <StructuredData data={[organizationSchema, webSiteSchema]} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
