import { SITE_URL } from '@/lib/config/site';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { EventsSection } from '@/components/news/EventsSection';
import { GallerySection } from '@/components/news/GallerySection';
import { AnimateOnView } from '@/components/shared/AnimateOnView';
import { breadcrumb } from '@/lib/utils/jsonLd';

export const metadata: Metadata = {
  title: 'Events & Ministry Outings — ClaudyGod Music Ministries',
  description:
    'Upcoming gospel concerts, tour dates, and ministry outings from ClaudyGod — reserve tickets and see highlights from past events, worship gatherings, and community outreach.',
  keywords: [
    'ClaudyGod tour dates',
    'gospel concerts Nigeria',
    'ClaudyGod events',
    'ClaudyGod ministry outing',
    'gospel concert Port Harcourt',
    'gospel concert Lagos',
    'ClaudyGod Aba concert',
    'ClaudyGod Imo concert',
    'Nigerian gospel tour',
    'gospel music events Nigeria',
    'ClaudyGod tour photos',
    'gospel artist tour Nigeria',
    'Christian concert Nigeria',
    'ClaudyGod community outreach',
  ],
  openGraph: {
    title: 'ClaudyGod Events & Ministry Outings',
    description:
      'Upcoming gospel concerts and tour dates, plus highlights from past ministry outings, worship gatherings, and community outreach.',
    url: '/events',
    images: [
      { url: '/tour_3.jpg', width: 1920, height: 1080, alt: 'ClaudyGod Events & Ministry Outings' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClaudyGod Events & Ministry Outings',
    images: ['/tour_3.jpg'],
  },
  alternates: { canonical: `${SITE_URL}/events` },
};

/**
 * Events is the "what's ahead and what we've already done in the field"
 * page — upcoming tour dates + ticket reservations (EventsSection), plus a
 * past-outings recap (GallerySection: tour photos, worship moments, student
 * and community outreach) so it reads as a real events hub, not just a
 * ticketing form. Distinct from News, which is now the readable blog/journal
 * + store destination — the two used to collapse into one page via a
 * redirect, which is why they looked identical.
 */
export default function EventsPage() {
  const schemas = [breadcrumb([{ name: 'Events', href: '/events' }])];

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
        eyebrow="Events & Outings"
        title="Where We're Headed"
        subtitle="Upcoming concerts, tour dates, and ministry outings — reserve your spot and see where we've already been."
        backgroundImage="/tour_1.jpg"
        objectPosition="center center"
      />

      {/* Upcoming events — highlights + ticket reservation portal */}
      <EventsSection />

      {/* Past ministry outings — tour, worship, student & community photos */}
      <AnimateOnView>
        <GallerySection />
      </AnimateOnView>
    </>
  );
}
