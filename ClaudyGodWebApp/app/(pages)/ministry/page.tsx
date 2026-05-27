import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/shared/PageHero';
import { GridSkeleton } from '@/components/shared/GridSkeleton';
import { AnimateOnView } from '@/components/shared/AnimateOnView';
import { VolunteersSection } from '@/components/ministry/VolunteersSection';

export const metadata: Metadata = {
  title: 'ClaudyGod Ministry — Teachings, Gallery & Team',
  description: 'Explore the ministry of ClaudyGod — live teachings, podcast episodes, ministry gallery, and the dedicated team spreading the gospel.',
  keywords: ['ClaudyGod ministry', 'gospel teachings', 'CGM podcast', 'ministry gallery', 'Christian ministry Nigeria'],
  openGraph: { title: 'ClaudyGod Ministry', description: 'Teachings, gallery, and the team behind the mission.', url: '/ministry' },
  alternates: { canonical: 'https://claudygod.com/ministry' },
};

const TeachingsGrid = dynamic(
  () => import('@/components/ministry/TeachingsGrid').then((m) => m.TeachingsGrid),
  { loading: () => <GridSkeleton cols={3} rows={2} /> }
);

const GallerySection = dynamic(
  () => import('@/components/ministry/GallerySection').then((m) => m.GallerySection),
  { loading: () => <GridSkeleton cols={3} rows={2} /> }
);

const TeamSection = dynamic(
  () => import('@/components/ministry/TeamSection').then((m) => m.TeamSection),
  { loading: () => <GridSkeleton cols={4} rows={1} /> }
);

export default function MinistryPage() {
  return (
    <>
      <PageHero
        eyebrow="Ministry"
        title="Beyond the Music"
        subtitle="Teachings, community impact, and a team devoted to spreading the love of God."
        backgroundImage="/Tour_Ph_2.webp"
        objectPosition="center center"
      />
      <AnimateOnView><TeachingsGrid /></AnimateOnView>
      <AnimateOnView delay={0.1}><GallerySection /></AnimateOnView>
      <AnimateOnView delay={0.1}><TeamSection /></AnimateOnView>
      <AnimateOnView delay={0.1}><VolunteersSection /></AnimateOnView>
    </>
  );
}
