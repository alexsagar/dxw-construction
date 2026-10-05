import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { PageProps } from '@/types';
import AboutContent from '@/components/about/AboutContent';
import StructuredData from '@/components/seo/StructuredData';
import {
  buildPageMetadata,
  getCanonicalUrl,
  getWebPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO.about' });

  return buildPageMetadata({
    locale,
    path: 'about',
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'AboutPage' });
  const tSeo = await getTranslations({ locale, namespace: 'SEO.about' });
  const tNav = await getTranslations({ locale, namespace: 'Navigation' });

  const aboutPageSchema = getWebPageSchema({
    title: tSeo('title'),
    description: tSeo('description'),
    url: getCanonicalUrl(locale, 'about'),
    locale,
    type: 'AboutPage',
  });

  const breadcrumbSchema = getBreadcrumbSchema(locale, [
    { name: tNav('home'), path: '' },
    { name: tSeo('breadcrumb'), path: 'about' },
  ]);

  return (
    <>
      <StructuredData data={[aboutPageSchema, breadcrumbSchema]} />
      <AboutContent t={t} />
    </>
  );
}
