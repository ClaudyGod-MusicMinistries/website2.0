import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { BiographySection } from '@/components/about/BiographySection';
import { AlbumTimeline } from '@/components/about/AlbumTimeline';

export const metadata: Metadata = {
  title: 'About — ClaudyGod Music Ministries',
  description: 'Learn about Minister ClaudyGod — gospel artist, songwriter, evangelist, and worship leader spreading the love of God through music.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ClaudyGod"
        title="Minister, Artist & Worshipper"
        subtitle="A California-based gospel music minister whose God-breathed songs have touched lives across the world."
      />
      <BiographySection />
      <AlbumTimeline />
    </>
  );
}
