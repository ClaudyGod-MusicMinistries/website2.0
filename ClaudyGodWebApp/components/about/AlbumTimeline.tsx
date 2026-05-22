import Image from 'next/image';
import Link from 'next/link';
import { albums } from '@/data/music';
import { FaSpotify, FaApple, FaYoutube } from 'react-icons/fa6';
import { platformColors } from '@/utils/platformColors';

const platformIcons = {
  spotify: FaSpotify,
  apple: FaApple,
  youtube: FaYoutube,
} as const;

export function AlbumTimeline() {
  return (
    <section className="bg-cream-100 section-py">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-14">
          <span className="rule-gold" />
          <span className="label-eyebrow">Discography</span>
        </div>

        <h2 className="font-bricolage font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight leading-tight mb-16">
          Albums & Releases
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-black/[0.08] hidden md:block" />

          <div className="space-y-0">
            {albums.map((album, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={album.title}
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-0 ${
                    i < albums.length - 1 ? 'mb-1' : ''
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-0 lg:left-1/2 top-8 w-2.5 h-2.5 rounded-full bg-gold-500/40 border border-gold-500/60 -translate-x-1/2 hidden md:block z-10" />

                  {/* Content — alternates sides */}
                  <div
                    className={`lg:col-start-${isEven ? '1' : '2'} flex ${
                      isEven ? 'lg:justify-end lg:pr-16' : 'lg:justify-start lg:pl-16'
                    } py-8`}
                  >
                    <div className="group w-full max-w-md">
                      <div className="flex gap-5 items-start">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={album.image}
                            alt={album.title}
                            fill
                            className="object-cover ring-1 ring-black/[0.06] group-hover:ring-gold-500/30 transition-all duration-300"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bricolage font-semibold text-neutral-800 text-xl leading-tight mb-2 group-hover:text-purple-700 transition-colors duration-300">
                            {album.title}
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            {(Object.entries(album.links) as [keyof typeof platformIcons, string][])
                              .filter(([key]) => key in platformIcons)
                              .map(([key, url]) => {
                                const Icon = platformIcons[key];
                                return (
                                  <a
                                    key={key}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={key}
                                    style={{ '--brand': platformColors[key] } as React.CSSProperties}
                                    className="text-neutral-700 hover:text-[var(--brand)] transition-colors duration-300"
                                  >
                                    <Icon className="h-3.5 w-3.5" />
                                  </a>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 border-b border-black/[0.06]" />
                    </div>
                  </div>

                  {/* Empty opposite column for layout */}
                  <div className={`hidden lg:block lg:col-start-${isEven ? '2' : '1'}`} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-black/[0.06] flex flex-wrap gap-4">
          <Link
            href="/music"
            className="inline-flex items-center gap-2.5 font-worksans text-xs tracking-[0.18em] uppercase bg-neutral-900 hover:bg-purple-700 text-white px-8 h-11 transition-all duration-300 group"
          >
            View Full Music Catalogue
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
