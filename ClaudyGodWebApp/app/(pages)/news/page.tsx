import { SITE_URL } from '@/lib/config/site';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/shared/PageHero';
import { EventsSection } from '@/components/news/EventsSection';
import { LatestMusicSection } from '@/components/news/LatestMusicSection';
import { JournalSection } from '@/components/news/JournalSection';
import { GridSkeleton } from '@/components/shared/GridSkeleton';
import { AnimateOnView } from '@/components/shared/AnimateOnView';
import { socialShareLinks } from '@/data/news';
import { breadcrumb } from '@/lib/utils/jsonLd';
import { FaFacebookF, FaYoutube, FaXTwitter, FaTiktok, FaSpotify, FaApple } from 'react-icons/fa6';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
  FaTiktok,
  FaSpotify,
  FaApple,
};

export const metadata: Metadata = {
  title: 'News, Tour Dates & Updates — ClaudyGod Music Ministries',
  description:
    'Stay updated with ClaudyGod — upcoming gospel concerts and tour dates, new album releases, the journal, tour photos, and the ministry team.',
  keywords: [
    'ClaudyGod tour dates',
    'gospel concerts Nigeria',
    'ClaudyGod news',
    'ClaudyGod new release',
    'gospel concert Port Harcourt',
    'gospel concert Lagos',
    'ClaudyGod Aba concert',
    'ClaudyGod Imo concert',
    'Nigerian gospel tour',
    'gospel music events Nigeria',
    'ClaudyGod ministry update',
    'ClaudyGod tour photos',
    'ClaudyGod ministry team',
    'gospel artist tour Nigeria',
    'Christian concert Nigeria',
  ],
  openGraph: {
    title: 'ClaudyGod News, Tour Dates & Updates',
    description:
      'Upcoming gospel concerts, new music releases, tour photos, and the ministry team behind ClaudyGod Music Ministries.',
    url: '/news',
    images: [{ url: '/tour_3.jpg', width: 1920, height: 1080, alt: 'ClaudyGod Tour Dates & News' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClaudyGod News & Tour Dates',
    images: ['/tour_3.jpg'],
  },
  alternates: { canonical: `${SITE_URL}/news` },
};

const GallerySection = dynamic(
  () => import('@/components/news/GallerySection').then((m) => m.GallerySection),
  { loading: () => <GridSkeleton cols={3} rows={2} /> }
);

const TeamSection = dynamic(
  () => import('@/components/news/TeamSection').then((m) => m.TeamSection),
  { loading: () => <GridSkeleton cols={4} rows={1} /> }
);

export default async function NewsPage() {
  // Event JSON-LD previously hardcoded four 2025 concert dates here — all
  // now in the past, which makes them invalid for Google's Event rich
  // results (meant for upcoming events) and duplicates data/events.ts's
  // separate event list. Removed rather than inventing new fake dates;
  // real Event schema belongs on the canonical /tour page once it exists.
  const schemas = [breadcrumb([{ name: 'News & Tours', href: '/news' }])];

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
        eyebrow="News & Updates"
        title="What's Happening"
        subtitle="Tour dates, new releases, and ministry updates — all in one place."
        backgroundImage="/tour_1.jpg"
        objectPosition="center center"
      />

      {/* Events & Tours — highlights + reservation portal */}
      <EventsSection />

      {/* New releases — real backend albums (see components/news/LatestMusicSection.tsx) */}
      <LatestMusicSection />

      {/* Journal — moved here from the old Blog listing page */}
      <JournalSection />

      {/* Tour photos — moved here from the Ministry page */}
      <AnimateOnView>
        <GallerySection />
      </AnimateOnView>

      {/* Team — moved here from the Ministry page */}
      <AnimateOnView delay={0.1}>
        <TeamSection />
      </AnimateOnView>

      {/* Follow */}
      <section className="bg-white py-16 border-t border-black/[0.05]">
        <div className="container-site">
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-16">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <span className="rule-gold" />
                <span className="label-eyebrow">Follow Along</span>
              </div>
              <p className="font-display font-bold text-neutral-900 text-2xl tracking-tight">
                Stay Connected
              </p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {socialShareLinks.map((link) => {
                const Icon = iconMap[link.iconName];
                return Icon ? (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="w-11 h-11 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-purple-600 hover:border-purple-300 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
