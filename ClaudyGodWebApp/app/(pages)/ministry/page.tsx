import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { TeachingsGrid } from '@/components/ministry/TeachingsGrid';
import { GallerySection } from '@/components/ministry/GallerySection';
import { TeamSection } from '@/components/ministry/TeamSection';

export const metadata: Metadata = {
  title: 'Ministry — ClaudyGod Music Ministries',
  description: 'Explore the ministry of ClaudyGod — teachings, podcasts, gallery, and the team behind the mission.',
};

export default function MinistryPage() {
  return (
    <>
      <PageHero
        eyebrow="Ministry"
        title="Beyond the Music"
        subtitle="Teachings, community impact, and a team devoted to spreading the love of God."
      />
      <TeachingsGrid />
      <GallerySection />
      <TeamSection />
    </>
  );
}
