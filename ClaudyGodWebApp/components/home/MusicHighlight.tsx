import Image from 'next/image';
import Link from 'next/link';
import { FaSpotify, FaApple, FaYoutube, FaDeezer } from 'react-icons/fa6';
import { albums } from '@/data/music';

const icons = { spotify: FaSpotify, apple: FaApple, youtube: FaYoutube, deezer: FaDeezer } as const;

export function MusicHighlight() {
  return (
    <section className="bg-cream-100 section-py border-t border-black/[0.05]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="rule-gold" />
              <span className="label-eyebrow">Discography</span>
            </div>
            <h2 className="font-raleway font-bold text-neutral-900 text-4xl md:text-5xl tracking-tight">
              Albums
            </h2>
          </div>
          <Link
            href="/music"
            className="hidden md:inline-flex items-center gap-2 font-worksans text-xs tracking-[0.18em] uppercase border border-neutral-300 hover:border-purple-600 text-neutral-700 hover:text-purple-700 px-6 h-10 rounded-xl transition-all duration-300"
          >
            All Albums →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {albums.map((album) => (
            <div key={album.title} className="group">
              {/* Art */}
              <div className="relative aspect-square mb-5 overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.10)]">
                <Image
                  src={album.image}
                  alt={album.title}
                  fill
                  className="object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width:768px) 90vw, 33vw"
                />
              </div>

              {/* Info */}
              <h3 className="font-raleway font-normal text-neutral-800 text-xl md:text-2xl tracking-wide mb-3">
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
                      className="w-9 h-9 flex items-center justify-center border border-neutral-200 hover:border-gold-400/50 text-neutral-400 hover:text-gold-500 rounded-lg transition-all duration-300"
                    >
                      <Icon className="h-4 w-4" />
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
            className="inline-flex items-center gap-2.5 font-worksans text-xs tracking-[0.18em] uppercase bg-neutral-900 hover:bg-purple-700 text-white px-8 h-11 rounded-xl transition-all duration-300 group"
          >
            View All Albums
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
