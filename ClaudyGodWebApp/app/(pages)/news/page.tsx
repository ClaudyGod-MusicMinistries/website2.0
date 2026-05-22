import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
      <section className="bg-[#080808] section-py">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-14">
            <span className="rule-gold" />
            <span className="label-eyebrow">Upcoming Tour</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
            {tourDates.map((date) => (
              <div key={date.id} className="group bg-[#080808] p-6 flex gap-5 items-start">
                <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
                  <Image
                    src={date.image}
                    alt={date.city}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-raleway font-light text-white text-base leading-snug mb-0.5">
                    {date.city}
                  </p>
                  <p className="font-raleway text-neutral-600 text-xs font-light mb-1">
                    {date.venue}, {date.state}
                  </p>
                  <p className="font-worksans text-[0.48rem] tracking-[0.18em] uppercase text-gold-400/70 mb-3">
                    {new Date(date.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} — {date.time}
                  </p>
                  {date.ticketUrl !== '#' && (
                    <a
                      href={date.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-neutral-500 hover:text-gold-400 transition-colors border-b border-neutral-700 hover:border-gold-500/40 pb-px"
                    >
                      Get Tickets →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New albums */}
      <section className="bg-[#0a0a0a] section-py border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-14">
            <span className="rule-gold" />
            <span className="label-eyebrow">New Releases</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
            {newsAlbums.map((album) => (
              <div key={album.title} className="group bg-[#0a0a0a] flex gap-6 p-6 items-center">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={album.image}
                    alt={album.title}
                    fill
                    className="object-cover ring-1 ring-white/5 group-hover:ring-gold-500/20 transition-all duration-300"
                    sizes="96px"
                  />
                </div>
                <div>
                  <p className="font-raleway font-light text-white text-lg leading-snug mb-1">
                    {album.title}
                  </p>
                  <p className="font-worksans text-[0.48rem] tracking-[0.18em] uppercase text-neutral-600 mb-4">
                    Available on all platforms
                  </p>
                  <div className="flex items-center gap-3">
                    <a href={album.links.spotify} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-[#1DB954] transition-colors">
                      <FaSpotify className="h-3.5 w-3.5" />
                    </a>
                    <a href={album.links.apple} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-white transition-colors">
                      <FaApple className="h-3.5 w-3.5" />
                    </a>
                    <a href={album.links.youtube} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-[#FF0000] transition-colors">
                      <FaYoutube className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/[0.05]">
            <Link
              href="/music"
              className="font-worksans text-[0.6rem] tracking-[0.2em] uppercase text-neutral-500 hover:text-gold-400 transition-colors duration-300 border-b border-neutral-700 hover:border-gold-500/40 pb-px"
            >
              View Full Discography →
            </Link>
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="bg-[#080808] py-16 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
            <div>
              <p className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-neutral-600 mb-1">
                Follow Along
              </p>
              <p className="font-raleway font-extralight text-white text-xl tracking-tight">
                Stay Connected
              </p>
            </div>
            <div className="flex items-center gap-5">
              {socialShareLinks.map((link) => {
                const Icon = iconMap[link.iconName];
                return Icon ? (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="text-neutral-700 hover:text-gold-400 transition-colors duration-300"
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
