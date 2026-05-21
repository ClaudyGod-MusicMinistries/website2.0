import Image from 'next/image';
import Link from 'next/link';
import { latestReleasePlatforms, albums } from '@/data/music';

export function LatestRelease() {
  const latest = albums[1];

  return (
    <section className="bg-[#080808] section-py">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-14">
          <span className="rule-gold" />
          <span className="label-eyebrow">New Release</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Album art */}
          <div className="relative aspect-square max-w-md w-full">
            <Image
              src={latest.image}
              alt={latest.title}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 90vw, 45vw"
            />
            {/* Subtle gold frame */}
            <div className="absolute inset-0 ring-1 ring-gold-500/10 pointer-events-none" />
          </div>

          {/* Content */}
          <div>
            <h2 className="font-raleway font-extralight text-white text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.05] mb-3">
              {latest.title}
            </h2>
            <p className="font-worksans text-[0.6rem] tracking-[0.22em] uppercase text-gold-400/70 mb-10">
              Latest Album — Available Everywhere
            </p>

            <p className="font-raleway text-neutral-400 text-base leading-relaxed max-w-sm mb-10 font-light">
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
                    className="inline-flex items-center gap-2.5 px-5 h-10 border border-white/10 hover:border-[var(--brand)]/40 text-white/60 hover:text-[var(--brand)] font-worksans text-[0.6rem] tracking-[0.15em] uppercase transition-all duration-300"
                  >
                    <Icon className="h-3 w-3 shrink-0" />
                    {platform.name}
                  </a>
                );
              })}
            </div>

            <div className="mt-10 pt-10 border-t border-white/5">
              <Link
                href="/music"
                className="font-worksans text-[0.6rem] tracking-[0.2em] uppercase text-neutral-500 hover:text-gold-400 transition-colors duration-300 border-b border-neutral-700 hover:border-gold-500/40 pb-px"
              >
                View Full Discography →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
