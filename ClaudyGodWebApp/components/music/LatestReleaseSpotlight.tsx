'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Headphones } from 'lucide-react';
import { useAlbums } from '@/hooks/useAlbums';
import { toAlbumView } from '@/lib/data/adapters';
import { latestReleasePlatforms, latestReleaseAnnouncement } from '@/data/music';
import { buttonVariants } from '@/lib/theme/buttons';
import { AmbientGlow, Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import type { Album } from '@/lib/data/types';

function pickLatest(albums: Album[]): Album | undefined {
  const dated = albums.filter((a) => a.releasedAt);
  if (dated.length === 0) return albums[0];
  return dated.reduce((latest, a) =>
    new Date(a.releasedAt!).getTime() > new Date(latest.releasedAt!).getTime() ? a : latest
  );
}

/**
 * The Music page's own spotlight — sits above StreamingPlatforms/MusicPlayer
 * so the newest release is the first thing a visitor sees, not buried below
 * the fold. Cover art + title come from the real backend (useAlbums); the
 * announcement copy and smart-link live in data/music.tsx since they aren't
 * part of the Album entity.
 */
export function LatestReleaseSpotlight() {
  const { albums: rawAlbums, loading } = useAlbums();
  const latestRaw = pickLatest(rawAlbums);
  const latest = latestRaw ? toAlbumView(latestRaw) : undefined;

  // `error` doesn't hide the section — useAlbums falls back to real curated
  // albums on a failed fetch (see data/fallback.ts), so this only stays
  // empty if there's truly nothing, loading finished either way.
  if (!loading && !latest) return null;

  return (
    <section className="relative bg-surface-deep overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AmbientGlow
          color="gold"
          size={600}
          opacity={0.08}
          animate={false}
          className="-top-[240px] -right-[180px]"
        />
        <AmbientGlow
          color="purple"
          size={500}
          opacity={0.16}
          animate={false}
          className="-bottom-[200px] -left-[160px]"
        />
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative container-site py-14 sm:py-20 lg:py-24">
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1fr] gap-10 sm:gap-14 lg:gap-20 items-center">
            <Skeleton className="aspect-square w-full max-w-sm mx-auto lg:mx-0" rounded="lg" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-11 w-44" rounded="lg" />
            </div>
          </div>
        ) : (
          latest && (
            <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1fr] gap-10 sm:gap-14 lg:gap-20 items-center">
              {/* Cover art */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-square w-full max-w-sm mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-card-hover ring-1 ring-white/[0.06]"
              >
                {latest.image && (
                  <Image
                    src={latest.image}
                    alt={latest.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 400px"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-gold-500 text-black font-sans font-semibold text-[0.62rem] tracking-[0.18em] uppercase px-4 py-1.5 rounded-full shadow-lg">
                  <Sparkles className="h-3 w-3 fill-current" />
                  New Release
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="block w-8 h-px bg-gold-500 opacity-70" />
                  <span className="label-eyebrow text-gold-400">Latest Release</span>
                </div>

                <h2 className="font-raleway font-light text-white text-3xl sm:text-4xl md:text-5xl tracking-normal leading-[1.15] mb-4">
                  {latest.title}
                </h2>

                <p className="font-sans text-neutral-300 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                  {latestReleaseAnnouncement.message}
                </p>

                <a
                  href={latestReleaseAnnouncement.streamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: 'primary', size: 'lg', uppercase: true }),
                    'group shadow-gold-cta hover:shadow-gold-cta-hover w-fit mb-9'
                  )}
                >
                  <Headphones className="h-3.5 w-3.5" />
                  Stream Now
                </a>

                {/* Platform icons */}
                <div>
                  <p className="font-sans text-[0.65rem] tracking-[0.18em] uppercase text-neutral-500 font-semibold mb-4">
                    Listen Everywhere
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {latestReleasePlatforms.map((platform) => {
                      const Icon = platform.icon;
                      return (
                        <a
                          key={platform.name}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ '--brand': platform.brandColor } as React.CSSProperties}
                          className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/10 hover:border-[var(--brand)]/60 hover:bg-[var(--brand)]/10 text-neutral-400 hover:text-[var(--brand)] transition-all duration-300 group/icon"
                          title={platform.name}
                        >
                          <Icon className="h-4 w-4 transition-transform duration-300 group-hover/icon:scale-110" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          )
        )}
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
