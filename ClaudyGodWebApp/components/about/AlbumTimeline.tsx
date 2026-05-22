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
    <section className="bg-[#0a0a0a] section-py">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-14">
          <span className="rule-gold" />
          <span className="label-eyebrow">Discography</span>
        </div>

        <h2 className="font-raleway font-extralight text-white text-3xl md:text-4xl tracking-tight leading-tight mb-16">
          Albums & Releases
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] hidden md:block" />

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
                            className="object-cover ring-1 ring-white/10 group-hover:ring-gold-500/30 transition-all duration-300"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-raleway font-light text-white text-lg leading-tight mb-2 group-hover:text-gold-100 transition-colors duration-300">
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
                      <div className="mt-4 border-b border-white/[0.04]" />
                    </div>
                  </div>

                  {/* Empty opposite column for layout */}
                  <div className={`hidden lg:block lg:col-start-${isEven ? '2' : '1'}`} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-white/[0.06]">
          <Link
            href="/music"
            className="font-worksans text-[0.6rem] tracking-[0.2em] uppercase text-neutral-500 hover:text-gold-400 transition-colors duration-300 border-b border-neutral-700 hover:border-gold-500/40 pb-px"
          >
            View Full Music Catalogue →
          </Link>
        </div>
      </div>
    </section>
  );
}
