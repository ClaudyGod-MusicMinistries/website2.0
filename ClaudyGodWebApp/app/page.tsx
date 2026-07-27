import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TheArtist } from '@/components/home/TheArtist';
import { LatestRelease } from '@/components/home/LatestRelease';
import { TourDatesStrip } from '@/components/home/TourDatesStrip';
import { FeaturedVideos } from '@/components/home/FeaturedVideos';
import { ScriptureDivider } from '@/components/home/ScriptureDivider';
import { NewsletterBanner } from '@/components/home/NewsletterBanner';
import { AnimateOnView } from '@/components/shared/AnimateOnView';
import { SITE_URL } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'ClaudyGod Music Ministries — Official Website',
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
    url: '/',
  },
  alternates: { canonical: SITE_URL },
};

export default function Home() {
  return (
    <>
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

      {/* Final capture before footer */}
      <NewsletterBanner />
    </>
  );
}
