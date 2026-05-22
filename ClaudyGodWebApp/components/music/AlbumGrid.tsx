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
    <section className="bg-[#080808] section-py">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-14">
          <span className="rule-gold" />
          <span className="label-eyebrow">Discography</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {albums.map((album, i) => (
            <div key={album.title} className="group bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
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
                <div className="absolute inset-0 ring-1 ring-black/[0.05] pointer-events-none" />
              </div>

              <div className="p-7">
                {/* Title */}
                <p className="font-raleway font-normal text-neutral-900 text-xl md:text-2xl leading-tight mb-1 group-hover:text-purple-700 transition-colors duration-300">
                  {album.title}
                </p>
                <p className="font-worksans text-[0.58rem] tracking-[0.2em] uppercase text-neutral-400 mb-5">
                  Album
                </p>

                {/* Platform links */}
                <div className="flex items-center gap-3 flex-wrap">
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
                          className="w-10 h-10 flex items-center justify-center border border-neutral-200 hover:border-[var(--brand)]/50 text-neutral-400 hover:text-[var(--brand)] transition-all duration-300"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
