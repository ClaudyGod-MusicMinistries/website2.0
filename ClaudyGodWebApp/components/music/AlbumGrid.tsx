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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
          {albums.map((album, i) => (
            <div key={album.title} className="group bg-[#080808] p-8">
              {/* Album art */}
              <div className="relative aspect-square mb-6 overflow-hidden">
                <Image
                  src={album.image}
                  alt={album.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 ring-1 ring-white/5 pointer-events-none" />
              </div>

              {/* Title */}
              <p className="font-raleway font-light text-white text-xl leading-tight mb-1 group-hover:text-gold-100 transition-colors duration-300">
                {album.title}
              </p>
              <p className="font-worksans text-[0.5rem] tracking-[0.2em] uppercase text-neutral-600 mb-5">
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
                        className="w-8 h-8 flex items-center justify-center border border-white/10 hover:border-[var(--brand)]/40 text-neutral-600 hover:text-[var(--brand)] transition-all duration-300"
                      >
                        <Icon className="h-3 w-3" />
                      </a>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
