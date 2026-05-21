import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { LatestRelease } from '@/components/home/LatestRelease';
import { FeaturedVideos } from '@/components/home/FeaturedVideos';
import { MusicHighlight } from '@/components/home/MusicHighlight';
import { NewsletterBanner } from '@/components/home/NewsletterBanner';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Official website of ClaudyGod — gospel music artist, minister, and worship leader. Stream new music, watch worship videos, book for events, and more.',
  openGraph: {
    title: 'ClaudyGod Music Ministries',
    url: '/',
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <LatestRelease />
      <FeaturedVideos />
      <MusicHighlight />
      <NewsletterBanner />
    </>
  );
}
