import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { PageProps } from '@/types';
import HomeSections from '@/components/home/HomeSections';
import StructuredData from '@/components/seo/StructuredData';
import {
  buildPageMetadata,
  getCanonicalUrl,
  getWebPageSchema,
} from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO.home' });

  return buildPageMetadata({
    locale,
    path: '',
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  const tSeo = await getTranslations({ locale, namespace: 'SEO.home' });

  const webPageSchema = getWebPageSchema({
    title: tSeo('title'),
    description: tSeo('description'),
    url: getCanonicalUrl(locale, ''),
    locale,
    type: 'WebPage',
  });

  return (
    <>
      <StructuredData data={webPageSchema} />
      <HomeSections t={t} />
    </>
  );
}
