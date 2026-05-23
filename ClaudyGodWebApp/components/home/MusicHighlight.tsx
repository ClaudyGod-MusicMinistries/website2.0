import Image from 'next/image';
import Link from 'next/link';
import { FaSpotify, FaApple, FaYoutube, FaDeezer } from 'react-icons/fa6';
import { albums } from '@/data/music';

const icons = { spotify: FaSpotify, apple: FaApple, youtube: FaYoutube, deezer: FaDeezer } as const;

export function MusicHighlight() {
  return (
    <section className="relative section-py border-t border-black/[0.05] overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Bg_13.webp"
          alt="Background"
          fill
          className="object-cover object-center"
          quality={85}
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream-100/98 via-cream-100/95 to-cream-100/98" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-4 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="rule-gold" />
              <span className="label-eyebrow">Discography</span>
            </div>
            <h2 className="font-bricolage font-bold text-neutral-900 text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
              Albums
            </h2>
          </div>
          <Link
            href="/music"
            className="hidden md:inline-flex items-center gap-2 font-worksans text-xs tracking-[0.18em] uppercase border border-neutral-300 hover:border-purple-600 text-neutral-700 hover:text-purple-700 px-6 h-10 rounded-xl transition-all duration-300 whitespace-nowrap"
          >
            All Albums →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {albums.map((album, idx) => (
            <div key={album.title} className="group flex flex-col h-full">
              {/* Album Art Container */}
              <div className="relative w-full aspect-square mb-4 sm:mb-5 overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.10)] bg-neutral-100">
                <Image
                  src={album.image}
                  alt={album.title}
                  fill
                  className="object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(50vw - 1.5rem), calc(33.333vw - 1.5rem)"
                  priority={idx === 0}
                  quality={90}
                />
                <div className="absolute inset-0 ring-1 ring-black/5 pointer-events-none" />
              </div>

              {/* Album Info - flex-1 to push content down */}
              <div className="flex-1 flex flex-col">
                <h3 className="font-bricolage font-semibold text-neutral-800 text-lg sm:text-xl md:text-2xl tracking-wide mb-2 sm:mb-3 line-clamp-2">
                  {album.title}
                </h3>

                {/* Platform icons */}
                <div className="flex items-center gap-2 mt-auto pt-2">
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
                        className="w-9 h-9 flex items-center justify-center border border-neutral-200 hover:border-gold-400/50 text-neutral-400 hover:text-gold-500 rounded-lg transition-all duration-300 hover:bg-gold-50"
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

        <div className="mt-10 sm:mt-12 flex md:hidden justify-center sm:justify-start">
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
