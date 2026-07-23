'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X, ChevronRight, Clock } from 'lucide-react';
import { useMedia } from '@/hooks/useMedia';
import { toVideoView } from '@/lib/data/adapters';
import { buttonVariants } from '@/lib/theme/buttons';
import { AmbientGlow, Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Shows the catalog beyond the single video LatestRelease already
 * spotlights (that section takes item 0 of the same useMedia('video')
 * list; this one explicitly skips it) — the two sections read as one
 * "spotlight, then browse" flow instead of two competing video showcases.
 */
export function FeaturedVideos() {
  const { media, loading } = useMedia('video');
  const [activeId, setActiveId] = useState<string | null>(null);

  const videos = media
    .map(toVideoView)
    .filter((v) => v.youtubeId !== null)
    .slice(1);
  const activeVideo = videos.find((v) => v.id === activeId);

  const featured = videos[0];
  const sideList = videos.slice(1, 4);
  const bottomRow = videos.slice(4, 8);

  // `error` no longer hides the section — useMedia falls back to real curated
  // videos on a failed fetch, so only bail out if there's truly nothing to show.
  if (!loading && !featured) return null;

  return (
    <>
      <section className="relative bg-surface-deep overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AmbientGlow
            color="purple"
            size={600}
            opacity={0.12}
            animate={false}
            className="-top-[300px] -right-[300px]"
          />
          <AmbientGlow
            color="gold"
            size={400}
            opacity={0.06}
            animate={false}
            className="-bottom-[200px] -left-[200px]"
          />
        </div>

        {/* Top gold accent */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

        <div className="relative container-site py-12 sm:py-16 md:py-20 lg:py-28">
          {/* Header */}
          <div className="flex items-end justify-between mb-8 sm:mb-12">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="block w-8 h-px bg-gold-500 opacity-70" />
                <span className="label-eyebrow">Watch & Worship</span>
              </div>
              <h2 className="font-display text-white text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight">
                Featured Videos
              </h2>
            </div>
            <Link
              href="/videos"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg', uppercase: true }),
                'hidden sm:inline-flex group'
              )}
            >
              See All
              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-3 sm:gap-4">
              <Skeleton className="aspect-video w-full" rounded="lg" />
              <div className="flex flex-col gap-3">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="flex-1 min-h-[88px]" rounded="lg" />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Main layout: featured + side list */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-1 lg:grid-cols-[1fr_340px] items-start gap-3 sm:gap-4 mb-3 sm:mb-4"
              >
                {/* Featured large card */}
                <motion.button
                  variants={cardVariant}
                  onClick={() => setActiveId(featured.id)}
                  className="group relative overflow-hidden bg-neutral-900 cursor-pointer rounded-xl ring-1 ring-white/[0.06] hover:ring-purple-500/40 transition-all duration-400"
                  style={{ aspectRatio: '16/9' }}
                >
                  <Image
                    src={featured.thumbnailUrl}
                    alt={featured.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05] opacity-80 group-hover:opacity-100"
                    sizes="(max-width:1024px) 100vw, 65vw"
                  />
                  {/* Cinematic gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                  {/* Play button — small, gold-accented on hover, matches LatestRelease */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/25 flex items-center justify-center bg-black/30 group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:scale-110 transition-all duration-300">
                      <Play className="h-5 w-5 sm:h-6 sm:w-6 text-white fill-white ml-0.5 group-hover:text-black group-hover:fill-black transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="inline-block font-sans text-[0.65rem] tracking-[0.18em] uppercase text-gold-400 bg-black/60 px-3 py-1 rounded-full mb-3">
                      Featured
                    </span>
                    <p className="font-display font-bold text-white text-xl md:text-2xl leading-snug line-clamp-2 mb-2">
                      {featured.title}
                    </p>
                    {featured.duration && (
                      <span className="flex items-center gap-1.5 font-sans text-[0.65rem] tracking-[0.12em] uppercase text-white/50">
                        <Clock className="h-3 w-3" />
                        {featured.duration}
                      </span>
                    )}
                  </div>
                </motion.button>

                {/* Side list */}
                {sideList.length > 0 && (
                  <motion.div variants={cardVariant} className="flex flex-col gap-3">
                    {sideList.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => setActiveId(video.id)}
                        className="group relative flex gap-4 items-center shrink-0 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.05] hover:border-purple-500/30 p-3.5 rounded-xl transition-all duration-300 cursor-pointer text-left overflow-hidden"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-28 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={video.thumbnailUrl}
                            alt={video.title}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.07] opacity-75 group-hover:opacity-100"
                            sizes="112px"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-purple-600/80 transition-colors duration-300">
                              <Play className="h-3 w-3 text-white fill-white ml-px" />
                            </div>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-xs text-white/75 group-hover:text-white leading-snug line-clamp-2 mb-1.5 transition-colors duration-300">
                            {video.title}
                          </p>
                          {video.duration && (
                            <span className="flex items-center gap-1 font-sans text-[0.65rem] tracking-[0.1em] uppercase text-white/30">
                              <Clock className="h-2.5 w-2.5" />
                              {video.duration}
                            </span>
                          )}
                        </div>

                        {/* Gold left border on hover */}
                        <span className="absolute left-0 inset-y-0 w-0.5 bg-gold-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded-full" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {/* Bottom row — grid cards */}
              {bottomRow.length > 0 && (
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                >
                  {bottomRow.map((video) => (
                    <motion.button
                      key={video.id}
                      variants={cardVariant}
                      onClick={() => setActiveId(video.id)}
                      className="group relative aspect-video overflow-hidden bg-neutral-900 cursor-pointer rounded-xl ring-1 ring-white/[0.04] hover:ring-purple-500/30 transition-all duration-300"
                    >
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.07] opacity-70 group-hover:opacity-95"
                        sizes="(max-width:768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      {/* Play on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center shadow-gold">
                          <Play className="h-4 w-4 text-white fill-white ml-px" />
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <p className="font-display font-semibold text-white/85 text-xs leading-snug line-clamp-2 group-hover:text-white transition-colors duration-300">
                          {video.title}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </>
          )}

          {/* Mobile see all */}
          <div className="mt-10 flex justify-center sm:hidden">
            <Link
              href="/videos"
              className={cn(
                buttonVariants({ variant: 'soft', size: 'lg', uppercase: true }),
                'group'
              )}
            >
              See All Videos
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Bottom gold accent */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      </section>

      {/* Video lightbox modal */}
      <AnimatePresence>
        {activeVideo?.youtubeId && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[600] bg-black/94 backdrop-blur-md"
              onClick={() => setActiveId(null)}
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
                    {activeVideo?.title}
                  </p>
                  <button
                    onClick={() => setActiveId(null)}
                    aria-label="Close"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden ring-1 ring-white/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                    title={activeVideo?.title}
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
