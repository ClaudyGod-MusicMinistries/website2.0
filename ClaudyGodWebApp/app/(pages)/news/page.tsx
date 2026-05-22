import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Calendar, ExternalLink } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { tourDates, newsAlbums, socialShareLinks } from '@/data/news';
import { FaFacebookF, FaYoutube, FaXTwitter, FaTiktok, FaSpotify, FaApple } from 'react-icons/fa6';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaFacebookF, FaYoutube, FaXTwitter, FaTiktok, FaSpotify, FaApple,
};

export const metadata: Metadata = {
  title: 'News & Tour Dates — ClaudyGod Music Ministries',
  description: 'Latest news, upcoming tour dates in Nigeria and beyond, new releases, and ministry updates from Minister ClaudyGod.',
  keywords: ['ClaudyGod tour dates', 'gospel concerts Nigeria 2025', 'ClaudyGod news', 'Port Harcourt gospel concert'],
  openGraph: { title: 'ClaudyGod News & Tour Dates', description: 'Tour dates, new releases, and ministry updates.', url: '/news' },
  alternates: { canonical: 'https://claudygod.com/news' },
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Updates"
        title="What's Happening"
        subtitle="Tour dates, new releases, and ministry updates — all in one place."
        backgroundImage="/tour_1.jpg"
      />

      {/* Tour dates */}
      <section className="bg-white section-py">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="rule-gold" />
            <span className="label-eyebrow">Upcoming Tour</span>
          </div>
          <h2 className="font-raleway font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight mb-14">
            2025 Ministry Tour
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tourDates.map((date) => {
              const d    = new Date(date.date);
              const day  = d.toLocaleDateString('en-GB', { day: '2-digit' });
              const mon  = d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
              const full = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
              const past = d < new Date();
              return (
                <div key={date.id} className="group relative overflow-hidden rounded-2xl border border-neutral-200 hover:border-purple-300 bg-white hover:shadow-[0_8px_32px_rgba(124,58,237,0.08)] transition-all duration-300">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={date.image}
                      alt={date.city}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      sizes="(max-width:768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
                    <div className="absolute top-4 left-4 bg-white rounded-xl px-3 py-2 text-center shadow-lg">
                      <p className="font-raleway font-bold text-neutral-900 text-xl leading-none">{day}</p>
                      <p className="font-worksans text-[0.5rem] tracking-[0.15em] uppercase text-purple-600 mt-0.5">{mon}</p>
                    </div>
                    {past && (
                      <span className="absolute top-4 right-4 font-worksans text-[0.5rem] tracking-[0.15em] uppercase bg-black/60 text-white/60 px-2.5 py-1 rounded-full backdrop-blur-sm">Past Event</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-raleway font-bold text-neutral-900 text-xl mb-1 group-hover:text-purple-700 transition-colors duration-300">
                      {date.city}
                    </h3>
                    <p className="flex items-center gap-1.5 font-worksans text-[0.58rem] tracking-[0.1em] uppercase text-neutral-400 mb-1">
                      <MapPin className="h-3 w-3 shrink-0" />{date.venue}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center gap-1.5 font-worksans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400">
                        <Calendar className="h-3 w-3" />{full}
                      </span>
                      <span className="flex items-center gap-1.5 font-worksans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400">
                        <Clock className="h-3 w-3" />{date.time}
                      </span>
                    </div>
                    {!past && date.ticketUrl !== '#' && (
                      <a
                        href={date.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 font-worksans text-[0.6rem] tracking-[0.18em] uppercase bg-purple-600 hover:bg-purple-700 text-white px-5 h-9 rounded-xl transition-all duration-300"
                      >
                        Get Tickets <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* New releases */}
      <section className="bg-cream-100 section-py border-t border-black/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="rule-gold" />
            <span className="label-eyebrow">New Releases</span>
          </div>
          <h2 className="font-raleway font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight mb-12">
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
                  <p className="font-raleway font-bold text-neutral-900 text-lg leading-snug mb-1 group-hover:text-purple-700 transition-colors duration-300">
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
              <p className="font-raleway font-bold text-neutral-900 text-2xl tracking-tight">
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
