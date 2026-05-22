import Image from 'next/image';
import Link from 'next/link';
import { latestReleasePlatforms, albums } from '@/data/music';

export function LatestRelease() {
  const latest = albums[1];

  return (
    <section className="bg-white section-py">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-14">
          <span className="rule-gold" />
          <span className="label-eyebrow">New Release</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Album art */}
          <div className="relative aspect-square max-w-md w-full rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
            <Image
              src={latest.image}
              alt={latest.title}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 90vw, 45vw"
            />
            <div className="absolute inset-0 ring-1 ring-black/5 pointer-events-none" />
          </div>

          {/* Content */}
          <div>
            <h2 className="font-bricolage font-bold text-neutral-900 text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-3">
              {latest.title}
            </h2>
            <p className="font-worksans text-[0.6rem] tracking-[0.22em] uppercase text-gold-500/80 mb-10">
              Latest Album — Available Everywhere
            </p>

            <p className="font-raleway text-neutral-600 text-base md:text-lg leading-relaxed max-w-sm mb-10">
              Experience worship that transforms — available now on all major streaming platforms.
            </p>

            {/* Platform list */}
            <div className="flex flex-wrap gap-3">
              {latestReleasePlatforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ '--brand': platform.brandColor } as React.CSSProperties}
                    className="inline-flex items-center gap-2.5 px-5 h-11 border border-neutral-200 hover:border-[var(--brand)]/50 text-neutral-500 hover:text-[var(--brand)] font-worksans text-xs tracking-[0.15em] uppercase rounded-xl transition-all duration-300"
                  >
                    <Icon className="h-3 w-3 shrink-0" />
                    {platform.name}
                  </a>
                );
              })}
            </div>

            <div className="mt-10 pt-10 border-t border-neutral-100 flex flex-wrap gap-4">
              <Link
                href="/music"
                className="inline-flex items-center gap-2.5 font-worksans text-xs tracking-[0.18em] uppercase bg-neutral-900 hover:bg-purple-700 text-white px-8 h-11 rounded-xl transition-all duration-300 group"
              >
                View Full Discography
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/store"
                className="inline-flex items-center gap-2.5 font-worksans text-xs tracking-[0.18em] uppercase border border-neutral-300 hover:border-purple-600 text-neutral-700 hover:text-purple-700 px-8 h-11 rounded-xl transition-all duration-300"
              >
                Visit Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
