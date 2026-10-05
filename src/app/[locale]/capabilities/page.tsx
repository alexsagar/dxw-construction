import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { PageProps } from '@/types';
import CapabilitiesContent from '@/components/capabilities/CapabilitiesContent';
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
  const t = await getTranslations({ locale, namespace: 'SEO.capabilities' });

  return buildPageMetadata({
    locale,
    path: 'capabilities',
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
  });
}

export default async function CapabilitiesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'CapabilitiesPage' });
  const tSeo = await getTranslations({ locale, namespace: 'SEO.capabilities' });
  const tNav = await getTranslations({ locale, namespace: 'Navigation' });

  const capabilitiesPageSchema = getWebPageSchema({
    title: tSeo('title'),
    description: tSeo('description'),
    url: getCanonicalUrl(locale, 'capabilities'),
    locale,
    type: 'WebPage',
  });

  const breadcrumbSchema = getBreadcrumbSchema(locale, [
    { name: tNav('home'), path: '' },
    { name: tSeo('breadcrumb'), path: 'capabilities' },
  ]);

  return (
    <>
      <StructuredData data={[capabilitiesPageSchema, breadcrumbSchema]} />
      <CapabilitiesContent t={t} />
    </>
  );
}
