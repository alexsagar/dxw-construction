import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { PageProps } from '@/types';
import LeadershipContent from '@/components/leadership/LeadershipContent';
import StructuredData from '@/components/seo/StructuredData';
import {
  buildPageMetadata,
  getCanonicalUrl,
  getWebPageSchema,
  getBreadcrumbSchema,
  getLeadershipPersonsSchema,
} from '@/lib/seo';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SEO.leadership' });

  return buildPageMetadata({
    locale,
    path: 'leadership',
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
  });
}

export default async function LeadershipPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'LeadershipPage' });
  const tSeo = await getTranslations({ locale, namespace: 'SEO.leadership' });
  const tNav = await getTranslations({ locale, namespace: 'Navigation' });

  const leadershipPageSchema = getWebPageSchema({
    title: tSeo('title'),
    description: tSeo('description'),
    url: getCanonicalUrl(locale, 'leadership'),
    locale,
    type: 'WebPage',
  });

  const breadcrumbSchema = getBreadcrumbSchema(locale, [
    { name: tNav('home'), path: '' },
    { name: tSeo('breadcrumb'), path: 'leadership' },
  ]);

  const personsSchema = getLeadershipPersonsSchema(locale);

  return (
    <>
      <StructuredData
        data={[leadershipPageSchema, breadcrumbSchema, personsSchema]}
      />
      <LeadershipContent t={t} />
    </>
  );
}
