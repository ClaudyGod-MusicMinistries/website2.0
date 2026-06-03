import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero }         from '@/components/shared/PageHero';
import { GridSkeleton }     from '@/components/shared/GridSkeleton';
import { AnimateOnView }    from '@/components/shared/AnimateOnView';
import { VolunteersSection }from '@/components/ministry/VolunteersSection';
import { breadcrumb, organization } from '@/utils/jsonLd';

export const metadata: Metadata = {
  title: 'ClaudyGod Ministry — Teachings, Podcast, Gallery & Outreach',
  description:
    'Explore ClaudyGod Music Ministries — Spirit-filled teachings, CGM Podcast episodes, worship gallery, community outreach, and the dedicated team spreading the gospel across Nigeria and beyond.',
  keywords: [
    'ClaudyGod ministry', 'CGM podcast', 'gospel teachings Nigeria',
    'ClaudyGod live teaching', 'Christian podcast Nigeria',
    'ministry gallery ClaudyGod', 'gospel outreach Nigeria',
    'ClaudyGod discipleship', 'Christian ministry Port Harcourt',
    'spirit filled teachings', 'Nigerian gospel church ministry',
    'ClaudyGod community outreach', 'ClaudyGod music ministry gallery',
  ],
  openGraph: {
    title:       'ClaudyGod Ministry — Teachings, Gallery & Outreach',
    description: 'Spirit-filled teachings, CGM Podcast, worship gallery, and gospel outreach — the full scope of ClaudyGod Music Ministries.',
    url:         '/ministry',
    images: [{ url: '/manBack.jpg', width: 1920, height: 1280, alt: 'ClaudyGod Ministry' }],
  },
  twitter: {
    card:  'summary_large_image',
    title: 'ClaudyGod Ministry — Teachings & Outreach',
    images:['/manBack.jpg'],
  },
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

const schemas = [
  breadcrumb([{ name: 'Ministry', href: '/ministry' }]),
  organization(),
];

export default function MinistryPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
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
