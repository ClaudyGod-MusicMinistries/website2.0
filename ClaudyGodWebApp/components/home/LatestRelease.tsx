'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Sparkles } from 'lucide-react';
import { latestReleasePlatforms } from '@/data/music';
import { useMedia } from '@/hooks/useMedia';
import { toVideoView } from '@/lib/data/adapters';
import { buttonVariants } from '@/lib/theme/buttons';
import { AmbientGlow, Skeleton, YoutubeThumbnail } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

/**
 * The homepage's video-content spotlight, deliberately split in two:
 * this section picks the single most recent video as an editorial
 * "spotlight" (large, cinematic, one clear focal point); FeaturedVideos
 * further down shows the rest of the catalog in a grid. Both pull from
 * the same useMedia('video') source — LatestRelease takes item 0,
 * FeaturedVideos explicitly skips it — so the two sections read as one
 * intentional flow (spotlight, then browse) instead of two competing,
 * overlapping "watch a video" experiences.
 */
export function LatestRelease() {
  const { media, loading } = useMedia('video');
  const [videoOpen, setVideoOpen] = useState(false);

  const videos = media.map(toVideoView).filter((v) => v.youtubeId !== null);
  const latest = videos[0];

  // `error` no longer hides the section — useMedia falls back to real curated
  // videos on a failed fetch, so only bail out if there's truly nothing to show.
  if (!loading && !latest) return null;

  return (
    <>
      <section className="relative bg-white section-py overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AmbientGlow
            color="purple"
            size={600}
            opacity={0.05}
            animate={false}
            className="-top-[250px] -right-[200px]"
          />
        </div>

        <div className="relative container-site">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-12 sm:mb-16">
            <span className="rule-gold" />
            <span className="label-eyebrow">Latest Release</span>
          </div>

          {loading ? (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-11 w-40" rounded="lg" />
              </div>
              <Skeleton className="aspect-video w-full" rounded="lg" />
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              {/* Text — title, description, play CTA — read first, the
                  thumbnail follows immediately after as the visual payoff. */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <h2 className="font-raleway font-light text-neutral-900 text-2xl sm:text-3xl md:text-4xl tracking-normal leading-[1.15] mb-4 sm:mb-5">
                  {latest.title}
                </h2>

                <p className="font-sans text-neutral-500 text-base leading-relaxed mb-8 max-w-md mx-auto">
                  Experience the powerful visuals and soul-stirring worship from our latest release.
                  Watch, listen, and share this anointed moment with your community.
                </p>

                <button
                  onClick={() => setVideoOpen(true)}
                  className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'px-8')}
                >
                  <Play className="h-4 w-4 fill-white" />
                  Play Video
                </button>
              </motion.div>

              {/* Video — immediately after the text + Play Video button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setVideoOpen(true)}
                className="group relative mt-10 sm:mt-12 w-full aspect-video rounded-xl overflow-hidden shadow-card-light-lg cursor-pointer ring-1 ring-black/[0.04]"
              >
                <YoutubeThumbnail
                  youtubeId={latest.youtubeId!}
                  alt={latest.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  sizes="(max-width:1024px) 100vw, 672px"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

                {/* Play button — small, gold-accented on hover, scales cleanly */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gold-400/50"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-colors duration-300"
                  >
                    <Play className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem] text-white fill-white ml-0.5 group-hover:text-black group-hover:fill-black transition-colors duration-300" />
                  </motion.div>
                </div>

                {/* Badge */}
                <div className="absolute top-6 left-6 inline-flex items-center gap-1.5 bg-gold-500 text-black font-sans font-semibold text-[0.62rem] tracking-[0.18em] uppercase px-4 py-1.5 rounded-full shadow-lg">
                  <Sparkles className="h-3 w-3 fill-current" />
                  New Video
                </div>
              </motion.button>

              {/* Listen on platforms + browse links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 sm:mt-12 text-center"
              >
                <p className="font-sans text-[0.65rem] tracking-[0.18em] uppercase text-neutral-400 font-semibold mb-4">
                  Listen Everywhere
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  {latestReleasePlatforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <a
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ '--brand': platform.brandColor } as React.CSSProperties}
                        className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-neutral-200 hover:border-[var(--brand)]/60 hover:bg-[var(--brand)]/5 text-neutral-500 hover:text-[var(--brand)] transition-all duration-300 group/icon"
                        title={platform.name}
                      >
                        <Icon className="h-4 w-4 transition-transform duration-300 group-hover/icon:scale-110" />
                      </a>
                    );
                  })}
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-8 border-t border-neutral-200">
                  <Link
                    href="/music"
                    className={cn(
                      buttonVariants({ variant: 'secondary', size: 'lg', uppercase: true }),
                      'group'
                    )}
                  >
                    View All Music
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                  <Link
                    href="/videos"
                    className={buttonVariants({
                      variant: 'outline-dark',
                      size: 'lg',
                      uppercase: true,
                    })}
                  >
                    More Videos
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </div>
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
