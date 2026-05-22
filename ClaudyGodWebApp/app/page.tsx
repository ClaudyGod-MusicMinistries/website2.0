import type { Metadata } from 'next';
import { HeroCarousel }    from '@/components/home/HeroCarousel';
import { MinistryStats }   from '@/components/home/MinistryStats';
import { LatestRelease }   from '@/components/home/LatestRelease';
import { FeaturedVideos }  from '@/components/home/FeaturedVideos';
import { MusicHighlight }  from '@/components/home/MusicHighlight';
import { NewsletterBanner } from '@/components/home/NewsletterBanner';
import { AnimateOnView }   from '@/components/shared/AnimateOnView';

export const metadata: Metadata = {
  title: 'ClaudyGod Music Ministries — Official Website',
  description:
    'Official website of Minister ClaudyGod — gospel music artist, worship leader and minister from Port Harcourt, Nigeria. Stream new music, watch worship videos, book for events, and more.',
  keywords: [
    'ClaudyGod', 'gospel music', 'Christian music', 'worship leader',
    'Nigerian gospel artist', 'ministry', 'worship songs', 'gospel albums',
  ],
  openGraph: {
    title: 'ClaudyGod Music Ministries',
    description: 'Spirit-filled gospel music, worship videos, and ministry from Minister ClaudyGod.',
    url: '/',
  },
  alternates: { canonical: 'https://claudygod.com' },
};

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <MinistryStats />
      <AnimateOnView><LatestRelease /></AnimateOnView>
      <AnimateOnView><FeaturedVideos /></AnimateOnView>
      <AnimateOnView><MusicHighlight /></AnimateOnView>
      <NewsletterBanner />
    </>
  );
}
