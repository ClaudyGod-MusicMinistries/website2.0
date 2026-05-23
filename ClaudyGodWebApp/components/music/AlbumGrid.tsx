'use client';

import Image from 'next/image';
import { albums, securedMusicPlatforms } from '@/data/music';
import { FaSpotify, FaApple, FaYoutube, FaDeezer } from 'react-icons/fa6';
import { platformColors } from '@/utils/platformColors';

const platformIconMap = {
  spotify: FaSpotify,
  apple: FaApple,
  youtube: FaYoutube,
  deezer: FaDeezer,
} as const;

export function AlbumGrid() {
  return (
    <section className="bg-cream-100 section-py">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-14">
          <span className="rule-gold" />
          <span className="label-eyebrow">Discography</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {albums.map((album, i) => (
            <div key={album.title} className="group bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] overflow-hidden transition-shadow duration-400 border border-black/[0.04]">
              {/* Album art */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={album.image}
                  alt={album.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-7">
                {/* Title */}
                <p className="font-bricolage font-semibold text-neutral-900 text-xl md:text-2xl leading-tight mb-1 group-hover:text-purple-700 transition-colors duration-300">
                  {album.title}
                </p>
                <p className="font-worksans text-[0.58rem] tracking-[0.2em] uppercase text-neutral-400 mb-6">
                  Full Album
                </p>

                {/* Platform links */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  {(Object.entries(album.links) as [keyof typeof platformIconMap, string][])
                    .filter(([key]) => key in platformIconMap)
                    .map(([key, url]) => {
                      const Icon = platformIconMap[key];
                      return (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Listen on ${key}`}
                          style={{ '--brand': platformColors[key] } as React.CSSProperties}
                          className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-200 hover:border-[var(--brand)]/60 bg-white hover:bg-[var(--brand)]/8 text-neutral-400 hover:text-[var(--brand)] transition-all duration-300"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
                </div>

                {/* Stream CTA */}
                <div className="mt-6 pt-5 border-t border-black/[0.06]">
                  <a
                    href={album.links.spotify || album.links.youtube || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-worksans text-[0.6rem] tracking-[0.18em] uppercase text-neutral-700 hover:text-purple-600 transition-colors duration-300 group/cta"
                  >
                    Stream Now
                    <span className="transition-transform duration-300 group-hover/cta:translate-x-0.5">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
