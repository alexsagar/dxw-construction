'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const PILLARS = [
  {
    key: 'oversight',
    id: '01',
    image: '/images/home/why-oversight.jpg',
  },
  {
    key: 'leadership',
    id: '02',
    image: '/images/home/why-leadership.jpg',
  },
  {
    key: 'accountability',
    id: '03',
    image: '/images/home/why-accountability.jpg',
  },
  {
    key: 'reporting',
    id: '04',
    image: '/images/home/why-reporting.jpg',
  },
] as const;

export default function WhySection() {
  const t = useTranslations('HomePage');

  return (
    <section
      aria-labelledby="why-heading"
      className="bg-[#0B3D91] py-24 text-white md:py-32"
    >
      <div className="dxw-container">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            <span className="font-display text-sm font-semibold text-[#D4AF37]">03</span>
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span>{t('whyLabel')}</span>
          </p>
          <h2
            id="why-heading"
            className="dxw-h2 mt-6 text-white"
          >
            {t('whyHeading')}
          </h2>
        </div>

        {/* Simple, intuitive 4-column card layout */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.key}
              className="group flex flex-col overflow-hidden border border-white/15 bg-white/[0.03] transition-colors duration-300 hover:border-[#D4AF37]"
            >
              {/* Crisp, natural image without blue tint */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#082e6e]">
                <Image
                  src={pillar.image}
                  alt={t(`why.${pillar.key}.altText`)}
                  fill
                  quality={85}
                  sizes="(min-width: 1280px) 340px, (min-width: 1024px) 28vw, (min-width: 640px) 52vw, 105vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text content below photo */}
              <div className="flex flex-1 flex-col p-6">
                <p className="font-display text-xs font-semibold tracking-[0.16em] text-[#D4AF37]">
                  {pillar.id}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold text-white md:text-xl">
                  {t(`why.${pillar.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  {t(`why.${pillar.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
