import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { PageProps } from '@/types';
import ContactContent from '@/components/contact/ContactContent';
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
  const t = await getTranslations({ locale, namespace: 'SEO.contact' });

  return buildPageMetadata({
    locale,
    path: 'contact',
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'ContactPage' });
  const tSeo = await getTranslations({ locale, namespace: 'SEO.contact' });
  const tNav = await getTranslations({ locale, namespace: 'Navigation' });

  const contactPageSchema = getWebPageSchema({
    title: tSeo('title'),
    description: tSeo('description'),
    url: getCanonicalUrl(locale, 'contact'),
    locale,
    type: 'ContactPage',
  });

  const breadcrumbSchema = getBreadcrumbSchema(locale, [
    { name: tNav('home'), path: '' },
    { name: tSeo('breadcrumb'), path: 'contact' },
  ]);

  return (
    <>
      <StructuredData data={[contactPageSchema, breadcrumbSchema]} />
      <ContactContent t={t} />
    </>
  );
}
