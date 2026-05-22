import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { BiographySection } from '@/components/about/BiographySection';
import { AlbumTimeline } from '@/components/about/AlbumTimeline';

export const metadata: Metadata = {
  title: 'About ClaudyGod — Gospel Artist & Minister',
  description: 'Learn about Minister ClaudyGod — Nigerian gospel artist, songwriter, evangelist, and worship leader. Over 20 years of ministry, 7 albums, and countless lives touched.',
  keywords: ['ClaudyGod biography', 'Nigerian gospel artist', 'gospel minister', 'Port Harcourt worship leader', 'gospel songwriter'],
  openGraph: { title: 'About ClaudyGod', description: 'The story of a God-called gospel minister and worship leader.', url: '/about' },
  alternates: { canonical: 'https://claudygod.com/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ClaudyGod"
        title="Minister, Artist & Worshipper"
        subtitle="A Nigerian gospel music minister whose God-breathed songs have touched lives across the world."
        backgroundImage="/aboutUs.webp"
        objectPosition="center top"
      />
      <BiographySection />
      <AlbumTimeline />
    </>
  );
}
