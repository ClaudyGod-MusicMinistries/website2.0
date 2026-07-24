import { SITE_URL } from '@/lib/config/site';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/shared/PageHero';
import { EventsSection } from '@/components/news/EventsSection';
import { JournalSection } from '@/components/news/JournalSection';
import { GridSkeleton } from '@/components/shared/GridSkeleton';
import { AnimateOnView } from '@/components/shared/AnimateOnView';
import { newsAlbums, socialShareLinks } from '@/data/news';
import { breadcrumb } from '@/lib/utils/jsonLd';
import { FaFacebookF, FaYoutube, FaXTwitter, FaTiktok, FaSpotify, FaApple } from 'react-icons/fa6';
import { platformColors } from '@/lib/utils/platformColors';

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

      {/* New releases */}
      <section className="bg-cream-100 section-py border-t border-black/[0.05]">
        <div className="container-site">
          <div className="flex items-center gap-4 mb-4">
            <span className="rule-gold" />
            <span className="label-eyebrow">New Releases</span>
          </div>
          <h2 className="font-raleway font-light text-neutral-900 text-3xl md:text-4xl tracking-normal mb-12">
            Latest Music
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsAlbums.map((album) => (
              <div
                key={album.title}
                className="group bg-white rounded-xl shadow-card-light hover:shadow-card-light-hover border border-black/[0.04] overflow-hidden flex gap-6 p-6 items-center transition-all duration-300"
              >
                <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={album.image}
                    alt={album.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-neutral-900 text-lg leading-snug mb-1 group-hover:text-purple-700 transition-colors duration-300">
                    {album.title}
                  </p>
                  <p className="font-sans text-[0.55rem] tracking-[0.15em] uppercase text-neutral-400 mb-4">
                    Available on all platforms
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={album.links.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ '--brand': platformColors.spotify } as React.CSSProperties}
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:text-[var(--brand)] hover:border-[var(--brand)]/40 transition-all duration-300"
                    >
                      <FaSpotify className="h-4 w-4" />
                    </a>
                    <a
                      href={album.links.apple}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:border-neutral-400 transition-all duration-300"
                    >
                      <FaApple className="h-4 w-4" />
                    </a>
                    <a
                      href={album.links.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ '--brand': platformColors.youtube } as React.CSSProperties}
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:text-[var(--brand)] hover:border-[var(--brand)]/40 transition-all duration-300"
                    >
                      <FaYoutube className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/music"
              className="inline-flex items-center gap-2.5 font-sans text-xs tracking-[0.18em] uppercase bg-neutral-900 hover:bg-purple-700 text-white px-8 h-11 rounded-xl transition-all duration-300 group"
            >
              View Full Discography
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

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
