import { SITE_URL } from '@/lib/config/site';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/shared/PageHero';
import { GridSkeleton } from '@/components/shared/GridSkeleton';
import { AnimateOnView } from '@/components/shared/AnimateOnView';
import { VolunteerCTA } from '@/components/ministry/VolunteerCTA';
import { breadcrumb, organization } from '@/lib/utils/jsonLd';

export const metadata: Metadata = {
  title: 'ClaudyGod Ministry — Teachings, Podcast & Media Interviews',
  description:
    'Explore ClaudyGod Music Ministries — Spirit-filled teachings, CGM Podcast episodes, media interviews, community outreach, and how to get involved.',
  keywords: [
    'ClaudyGod ministry',
    'CGM podcast',
    'gospel teachings Nigeria',
    'ClaudyGod live teaching',
    'Christian podcast Nigeria',
    'ClaudyGod media interview',
    'gospel outreach Nigeria',
    'ClaudyGod discipleship',
    'Christian ministry Port Harcourt',
    'spirit filled teachings',
    'Nigerian gospel church ministry',
    'ClaudyGod community outreach',
    'ClaudyGod volunteer',
  ],
  openGraph: {
    title: 'ClaudyGod Ministry — Teachings, Podcast & Interviews',
    description:
      'Spirit-filled teachings, CGM Podcast, media interviews, and gospel outreach — the full scope of ClaudyGod Music Ministries.',
    url: '/ministry',
    images: [{ url: '/manBack.jpg', width: 1920, height: 1280, alt: 'ClaudyGod Ministry' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClaudyGod Ministry — Teachings & Outreach',
    images: ['/manBack.jpg'],
  },
  alternates: { canonical: `${SITE_URL}/ministry` },
};

const TeachingsGrid = dynamic(
  () => import('@/components/ministry/TeachingsGrid').then((m) => m.TeachingsGrid),
  { loading: () => <GridSkeleton cols={3} rows={2} /> }
);

const InterviewsSection = dynamic(
  () => import('@/components/ministry/InterviewsSection').then((m) => m.InterviewsSection),
  { loading: () => <GridSkeleton cols={3} rows={2} /> }
);

const schemas = [breadcrumb([{ name: 'Ministry', href: '/ministry' }]), organization()];

export default function MinistryPage() {
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
        eyebrow="Ministry"
        title="Beyond the Music"
        subtitle="Teachings, community impact, and a team devoted to spreading the love of God."
      />
      <AnimateOnView>
        <TeachingsGrid />
      </AnimateOnView>
      <AnimateOnView delay={0.1}>
        <InterviewsSection />
      </AnimateOnView>
      <AnimateOnView delay={0.1}>
        <VolunteerCTA />
      </AnimateOnView>
    </>
  );
}
