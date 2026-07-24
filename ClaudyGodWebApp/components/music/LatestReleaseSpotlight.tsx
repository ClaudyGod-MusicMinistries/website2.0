'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Headphones, Play, X } from 'lucide-react';
import { useMedia } from '@/hooks/useMedia';
import { toVideoView } from '@/lib/data/adapters';
import { latestReleasePlatforms, latestReleaseAnnouncement } from '@/data/music';
import { buttonVariants } from '@/lib/theme/buttons';
import { AmbientGlow, Skeleton, YoutubeThumbnail } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

/**
 * The Music page's own spotlight — sits above StreamingPlatforms/MusicPlayer
 * so the newest release is the first thing a visitor sees, not buried below
 * the fold. Deliberately sourced from the same useMedia('video') list (and
 * takes the same index 0) as the homepage's LatestRelease, so both pages
 * agree on what "latest" means instead of drifting — this one used to read
 * from useAlbums() and could show a different release than the homepage.
 * The announcement copy and smart-link live in data/music.tsx since they
 * aren't part of the Media entity.
 */
export function LatestReleaseSpotlight() {
  const { media, loading } = useMedia('video');
  const [videoOpen, setVideoOpen] = useState(false);

  const videos = media.map(toVideoView).filter((v) => v.youtubeId !== null);
  const latest = videos[0];

  // `error` doesn't hide the section — useMedia falls back to real curated
  // videos on a failed fetch (see data/fallback.ts), so this only stays
  // empty if there's truly nothing, loading finished either way.
  if (!loading && !latest) return null;

  return (
    <>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
              <Skeleton className="aspect-video w-full" rounded="lg" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-11 w-44" rounded="lg" />
              </div>
            </div>
          ) : (
            latest && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
                {/* Thumbnail — click to watch in-app. aspect-video, not
                    aspect-square: this is a YouTube frame (naturally 16:9),
                    matching its real shape instead of cropping it into one
                    that doesn't fit. */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setVideoOpen(true)}
                  className="group relative aspect-video w-full rounded-xl overflow-hidden shadow-card-hover ring-1 ring-white/[0.06] cursor-pointer"
                >
                  <YoutubeThumbnail
                    youtubeId={latest.youtubeId!}
                    alt={latest.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 1024px) 90vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-gold-500 text-black font-sans font-semibold text-[0.62rem] tracking-[0.18em] uppercase px-4 py-1.5 rounded-full shadow-lg">
                    <Sparkles className="h-3 w-3 fill-current" />
                    New Release
                  </div>

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="absolute w-14 h-14 rounded-full border border-gold-400/50"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:scale-110 transition-all duration-300">
                      <Play className="h-5 w-5 text-white fill-white ml-0.5 group-hover:text-black group-hover:fill-black transition-colors duration-300" />
                    </div>
                  </div>
                </motion.button>

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

      {/* Video lightbox modal */}
      <AnimatePresence>
        {videoOpen && latest?.youtubeId && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[600] bg-black/94 backdrop-blur-md"
              onClick={() => setVideoOpen(false)}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-0 z-[601] flex items-center justify-center p-4 md:p-8 pointer-events-none"
            >
              <div className="relative w-full max-w-5xl pointer-events-auto">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-display font-semibold text-white/80 text-sm line-clamp-1 max-w-[80%]">
                    {latest.title}
                  </p>
                  <button
                    onClick={() => setVideoOpen(false)}
                    aria-label="Close"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden ring-1 ring-white/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${latest.youtubeId}?autoplay=1&rel=0`}
                    title={latest.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
