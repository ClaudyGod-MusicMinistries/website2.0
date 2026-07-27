import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TheArtist } from '@/components/home/TheArtist';
import { LatestRelease } from '@/components/home/LatestRelease';
import { TourDatesStrip } from '@/components/home/TourDatesStrip';
import { FeaturedVideos } from '@/components/home/FeaturedVideos';
import { ScriptureDivider } from '@/components/home/ScriptureDivider';
import { NewsletterBanner } from '@/components/home/NewsletterBanner';
import { ExplorePathways } from '@/components/home/ExplorePathways';
import { AnimateOnView } from '@/components/shared/AnimateOnView';
import { SITE_URL } from '@/lib/config/site';
import { releases } from '@/data/releases';

export const metadata: Metadata = {
  title: { absolute: 'ClaudyGod Music Ministries | Gospel Artist & Worship Leader' },
  description:
    'Official website of Minister ClaudyGod — gospel music artist, worship leader and minister from Port Harcourt, Nigeria. Stream new music, watch worship videos, book for events, and more.',
  keywords: [
    'ClaudyGod',
    'gospel music',
    'Christian music',
    'worship leader',
    'Nigerian gospel artist',
    'ministry',
    'worship songs',
    'gospel albums',
  ],
  openGraph: {
    title: 'ClaudyGod Music Ministries',
    description:
      'Spirit-filled gospel music, worship videos, and ministry from Minister ClaudyGod.',
    url: SITE_URL,
    type: 'website',
    images: [
      {
        url: '/ClaudySocial-wide.png',
        width: 1730,
        height: 909,
        alt: 'ClaudyGod Music Ministries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClaudyGod Music Ministries | Gospel Artist & Worship Leader',
    description:
      'Stream gospel music, watch worship videos, explore events, and invite Minister ClaudyGod to your gathering.',
    images: ['/ClaudySocial-wide.png'],
  },
  alternates: { canonical: SITE_URL },
};

export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#home`,
    url: SITE_URL,
    name: 'ClaudyGod Music Ministries',
    description:
      'Official website of Minister ClaudyGod — gospel artist, worship leader, and minister.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#person` },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Featured ClaudyGod releases',
      itemListElement: releases.map((release, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/music/${release.slug}`,
        name: release.title,
      })),
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* 1. Hero — one statement, direct action, not a carousel */}
      <Hero />

      {/* 2. Who this is — real credibility (7 albums, 20+ years), not abstractions */}
      <TheArtist />

      {/* 3. Latest release — the #1 reason a returning fan visits */}
      <AnimateOnView>
        <LatestRelease />
      </AnimateOnView>
      {/* 4. Tour dates — reason to see them live */}
      <TourDatesStrip />

      {/* 5. One strong video moment */}
      <AnimateOnView>
        <FeaturedVideos />
      </AnimateOnView>

      {/* 6. Scripture breather before commerce */}
      <ScriptureDivider />

      <ExplorePathways />

      {/* Final capture before footer */}
      <NewsletterBanner />
    </>
  );
}
