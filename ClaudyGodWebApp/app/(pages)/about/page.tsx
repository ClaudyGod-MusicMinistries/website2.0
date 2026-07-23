import Image from 'next/image';
import { SITE_URL } from '@/lib/config/site';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ParallaxLayer } from '@/components/ui';
import { AlbumTimeline } from './AlbumTimeline';
import { firstSectionTexts, secondSectionTexts } from '@/data/biography';
import { breadcrumb, person } from '@/lib/utils/jsonLd';

export const metadata: Metadata = {
  title: 'About ClaudyGod — Nigerian Gospel Artist, Minister & Worship Leader',
  description:
    'Discover the story of Minister ClaudyGod — Nigerian gospel artist, songwriter, evangelist, and worship leader from Port Harcourt. Over 20 years of Spirit-filled ministry, 7 studio albums, and a global gospel impact.',
  keywords: [
    'ClaudyGod biography',
    'who is ClaudyGod',
    'Minister ClaudyGod story',
    'Nigerian gospel artist biography',
    'gospel minister Port Harcourt',
    'Port Harcourt worship leader',
    'gospel songwriter Nigeria',
    'Nigerian evangelist singer',
    'ClaudyGod ministry history',
    'ClaudyGod albums',
    'gospel music minister Nigeria',
    'ClaudyGod 20 years ministry',
    'Rivers State gospel artist',
    'Christian music artist Nigeria',
    'ClaudyGod calling testimony',
  ],
  openGraph: {
    title: 'About Minister ClaudyGod — Nigerian Gospel Artist & Worship Leader',
    description:
      'Over 20 years of faithful ministry, 7 studio albums, and a God-breathed calling — discover the woman behind the worship.',
    url: '/about',
    type: 'profile',
    images: [
      {
        url: '/ClaudySocial.jpg',
        width: 1200,
        height: 800,
        alt: 'Minister ClaudyGod — Nigerian Gospel Artist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Minister ClaudyGod — Nigerian Gospel Artist',
    description: 'Over 20 years of ministry, 7 albums, and a God-given calling.',
    images: ['/ClaudySocial.jpg'],
  },
  alternates: { canonical: `${SITE_URL}/about` },
};

/* ── Structured data ── */
const schemas = [
  breadcrumb([{ name: 'About', href: '/about' }]),
  {
    ...person(),
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Gospel Music Artist and Minister',
      occupationLocation: { '@type': 'Country', name: 'Nigeria' },
      skills: 'Gospel singing, songwriting, worship leading, preaching, evangelism',
    },
    award: 'Over 20 years of faithful gospel ministry',
    numberOfAlbums: 7,
  },
];

function Biography() {
  return (
    <section className="bg-white section-py">
      <div className="container-site">
        {/* First block: text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start mb-10 sm:mb-16 lg:mb-28">
          <div className="lg:pt-4">
            <div className="flex items-center gap-4 mb-6">
              <span className="rule-gold" />
              <span className="label-eyebrow">Biography</span>
            </div>
            <h2 className="font-display font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight leading-tight mb-8">
              Called to Worship
            </h2>
            <div className="space-y-5">
              {firstSectionTexts.map((text, i) => (
                <p key={i} className="font-sans text-neutral-600 text-base leading-[1.85]">
                  {text.trim()}
                </p>
              ))}
            </div>
          </div>

          <div className="relative aspect-[3/4] w-full max-w-sm lg:max-w-none">
            <ParallaxLayer distance={30} className="absolute inset-0">
              <Image
                src="/mum1.jpg"
                alt="Minister ClaudyGod in ministry"
                fill
                className="object-cover object-top"
                sizes="(max-width:1024px) 90vw, 45vw"
              />
            </ParallaxLayer>
            <div className="absolute inset-0 ring-1 ring-black/5 pointer-events-none" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-black/[0.06] mb-20 lg:mb-32" />

        {/* Second block: image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="relative aspect-[4/5] w-full max-w-sm lg:max-w-none order-2 lg:order-1">
            <ParallaxLayer distance={30} className="absolute inset-0">
              <Image
                src="/ClaudySocial.jpg"
                alt="Minister ClaudyGod worship"
                fill
                className="object-cover object-top"
                sizes="(max-width:1024px) 90vw, 45vw"
              />
            </ParallaxLayer>
            <div className="absolute inset-0 ring-1 ring-black/5 pointer-events-none" />
          </div>

          <div className="lg:pt-4 order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-6">
              <span className="rule-gold" />
              <span className="label-eyebrow">Ministry</span>
            </div>
            <h2 className="font-display font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight leading-tight mb-8">
              Spreading God&apos;s Love
            </h2>
            <div className="space-y-5">
              {secondSectionTexts.map((text, i) => (
                <p key={i} className="font-sans text-neutral-600 text-base leading-[1.85]">
                  {text.trim()}
                </p>
              ))}
            </div>

            {/* Ministry pillars */}
            <div className="mt-12 pt-10 border-t border-black/[0.07] grid grid-cols-1 gap-5">
              {[
                {
                  title: 'Spirit-Led Worship',
                  body: 'Every song written and recorded in prayer — music that opens heaven.',
                },
                {
                  title: 'Gospel Outreach',
                  body: 'Concerts, community events, and digital platforms carrying the Word.',
                },
                {
                  title: 'Discipleship & Growth',
                  body: 'Teaching believers to walk deeper in faith through the Word.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 shrink-0" />
                  <div>
                    <p className="font-display font-semibold text-neutral-800 text-sm leading-snug">
                      {title}
                    </p>
                    <p className="font-sans text-neutral-500 text-sm leading-relaxed mt-0.5">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <PageHero
        eyebrow="About ClaudyGod"
        title="Minister, Artist & Worshipper"
        subtitle="A Nigerian gospel music minister whose God-breathed songs have touched lives across the world."
        backgroundImage="/ClaudySocial.jpg"
        objectPosition="center top"
      />
      <Biography />
      <AlbumTimeline />
    </>
  );
}
