import Image from 'next/image';
import Link from 'next/link';
import { FaSpotify, FaApple, FaYoutube, FaDeezer } from 'react-icons/fa6';
import { albums } from '@/data/music';

const icons = { spotify: FaSpotify, apple: FaApple, youtube: FaYoutube, deezer: FaDeezer } as const;

export function MusicHighlight() {
  return (
    <section className="bg-[#080808] section-py border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="rule-gold" />
              <span className="label-eyebrow">Discography</span>
            </div>
            <h2 className="font-raleway font-extralight text-white text-4xl md:text-5xl tracking-tight">
              Albums
            </h2>
          </div>
          <Link
            href="/music"
            className="hidden md:inline font-worksans text-[0.6rem] tracking-[0.2em] uppercase text-neutral-600 hover:text-gold-400 transition-colors duration-300 border-b border-neutral-800 hover:border-gold-500/30 pb-px"
          >
            All Albums →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {albums.map((album) => (
            <div key={album.title} className="group">
              {/* Art */}
              <div className="relative aspect-square mb-5 overflow-hidden">
                <Image
                  src={album.image}
                  alt={album.title}
                  fill
                  className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width:768px) 90vw, 33vw"
                />
              </div>

              {/* Info */}
              <h3 className="font-raleway font-light text-white text-xl tracking-wide mb-3">
                {album.title}
              </h3>

              {/* Platform icons */}
              <div className="flex items-center gap-2">
                {(Object.entries(album.links) as [keyof typeof icons, string][]).map(([key, url]) => {
                  const Icon = icons[key];
                  if (!Icon) return null;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${album.title} on ${key}`}
                      className="w-7 h-7 flex items-center justify-center border border-white/10 hover:border-gold-500/40 text-neutral-600 hover:text-gold-400 transition-all duration-300"
                    >
                      <Icon className="h-3 w-3" />
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <Link
            href="/music"
            className="font-worksans text-[0.6rem] tracking-[0.2em] uppercase text-neutral-600 hover:text-gold-400 transition-colors border-b border-neutral-800 pb-px"
          >
            View All Albums →
          </Link>
        </div>
      </div>
    </section>
  );
}
