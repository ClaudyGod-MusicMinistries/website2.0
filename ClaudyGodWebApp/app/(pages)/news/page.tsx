import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/shared/PageHero';
import { EventsSection } from '@/components/news/EventsSection';
import { newsAlbums, socialShareLinks } from '@/data/news';
import { breadcrumb, event as eventSchema } from '@/utils/jsonLd';
import { FaFacebookF, FaYoutube, FaXTwitter, FaTiktok, FaSpotify, FaApple } from 'react-icons/fa6';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaFacebookF, FaYoutube, FaXTwitter, FaTiktok, FaSpotify, FaApple,
};

export const metadata: Metadata = {
  title: 'News, Tour Dates & New Releases — ClaudyGod Music Ministries',
  description:
    'Stay updated with ClaudyGod — upcoming gospel concerts and tour dates in Nigeria and the UK, new album releases, media interviews, and ministry announcements. Never miss a ClaudyGod event.',
  keywords: [
    'ClaudyGod tour dates 2025', 'gospel concerts Nigeria 2025',
    'ClaudyGod news', 'ClaudyGod new release 2025',
    'gospel concert Port Harcourt', 'gospel concert Lagos 2025',
    'ClaudyGod Aba concert', 'ClaudyGod Imo concert',
    'Nigerian gospel tour 2025', 'gospel music events Nigeria',
    'ClaudyGod media interview', 'ClaudyGod ministry update',
    'gospel artist tour Nigeria', 'Christian concert Nigeria 2025',
  ],
  openGraph: {
    title:       'ClaudyGod News, Tour Dates & New Releases',
    description: 'Upcoming gospel concerts across Nigeria, new music releases, and ministry updates from Minister ClaudyGod.',
    url:         '/news',
    images: [{ url: '/tour_3.jpg', width: 1920, height: 1080, alt: 'ClaudyGod Tour Dates & News' }],
  },
  twitter: {
    card:  'summary_large_image',
    title: 'ClaudyGod News & Tour Dates 2025',
    images:['/tour_3.jpg'],
  },
  alternates: { canonical: 'https://claudygod.com/news' },
};

export default async function NewsPage() {
  

  const schemas = [
    breadcrumb([{ name: 'News & Tours', href: '/news' }]),
    eventSchema({ name: 'ClaudyGod Live Ministry Concert — Port Harcourt', startDate: '2025-07-12T17:00:00+01:00', location: 'University of Port Harcourt Auditorium', city: 'Port Harcourt', country: 'NG', image: 'https://claudygod.com/tour_3.jpg' }),
    eventSchema({ name: 'ClaudyGod Live Ministry Concert — Lagos',         startDate: '2025-08-02T18:00:00+01:00', location: 'Tafawa Balewa Square',                    city: 'Lagos',         country: 'NG', image: 'https://claudygod.com/tour_3.jpg' }),
    eventSchema({ name: 'ClaudyGod Live Ministry Concert — Aba',           startDate: '2025-08-16T17:00:00+01:00', location: 'Enyimba Cultural Centre',                  city: 'Aba',           country: 'NG', image: 'https://claudygod.com/tour_3.jpg' }),
    eventSchema({ name: 'ClaudyGod Live Ministry Concert — Imo',           startDate: '2025-09-06T17:00:00+01:00', location: 'Imo State University',                     city: 'Imo',           country: 'NG', image: 'https://claudygod.com/tour_3.jpg' }),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
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
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="rule-gold" />
            <span className="label-eyebrow">New Releases</span>
          </div>
          <h2 className="font-bricolage font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight mb-12">
            Latest Music
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsAlbums.map((album) => (
              <div key={album.title} className="group bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] border border-black/[0.04] overflow-hidden flex gap-6 p-6 items-center transition-all duration-300">
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
                  <p className="font-bricolage font-bold text-neutral-900 text-lg leading-snug mb-1 group-hover:text-purple-700 transition-colors duration-300">
                    {album.title}
                  </p>
                  <p className="font-worksans text-[0.55rem] tracking-[0.15em] uppercase text-neutral-400 mb-4">
                    Available on all platforms
                  </p>
                  <div className="flex items-center gap-3">
                    <a href={album.links.spotify} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:text-[#1DB954] hover:border-[#1DB954]/40 transition-all duration-300">
                      <FaSpotify className="h-4 w-4" />
                    </a>
                    <a href={album.links.apple} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:border-neutral-400 transition-all duration-300">
                      <FaApple className="h-4 w-4" />
                    </a>
                    <a href={album.links.youtube} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:text-[#FF0000] hover:border-[#FF0000]/40 transition-all duration-300">
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
              className="inline-flex items-center gap-2.5 font-worksans text-xs tracking-[0.18em] uppercase bg-neutral-900 hover:bg-purple-700 text-white px-8 h-11 rounded-xl transition-all duration-300 group"
            >
              View Full Discography
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Follow */}
      <section className="bg-white py-16 border-t border-black/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-16">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <span className="rule-gold" />
                <span className="label-eyebrow">Follow Along</span>
              </div>
              <p className="font-bricolage font-bold text-neutral-900 text-2xl tracking-tight">
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
