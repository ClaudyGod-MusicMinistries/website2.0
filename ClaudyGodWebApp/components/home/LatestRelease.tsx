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

interface SpotlightVideo {
  key: string;
  title: string;
  youtubeId: string;
  badge: string;
}

// Pinned alongside whatever the backend reports as the newest upload — not
// every release gets uploaded to the CMS the same day it drops, so this
// guarantees the newest single (Holy One of Israel) shows up here the
// moment it's public, instead of waiting on a separate content-entry step.
// Deduped against the live feed below by youtubeId, so once the backend
// catches up this doesn't render twice.
const pinnedVideo: SpotlightVideo = {
  key: 'pinned-holy-one-of-israel',
  title: 'Holy One of Israel (Praise You)',
  youtubeId: 'mooJfJI2NbQ',
  badge: 'New Song',
};

/**
 * The homepage's video-content spotlight, deliberately split in two: this
 * section pairs the single most recent CMS video with the pinned latest
 * single as a two-up editorial spotlight; FeaturedVideos further down shows
 * the rest of the catalog in a grid. LatestRelease and FeaturedVideos both
 * pull from the same useMedia('video') source — LatestRelease takes item 0,
 * FeaturedVideos explicitly skips it — so the two sections read as one
 * intentional flow (spotlight, then browse) instead of two competing,
 * overlapping "watch a video" experiences.
 */
export function LatestRelease() {
  const { media, loading } = useMedia('video');
  const [openVideo, setOpenVideo] = useState<SpotlightVideo | null>(null);

  const videos = media.map(toVideoView).filter((v) => v.youtubeId !== null);
  const latest = videos[0];

  const candidates: SpotlightVideo[] = [];
  if (latest?.youtubeId) {
    candidates.push({
      key: latest.id,
      title: latest.title,
      youtubeId: latest.youtubeId,
      badge: 'New Video',
    });
  }
  candidates.push(pinnedVideo);

  const seen = new Set<string>();
  const spotlightVideos = candidates.filter((v) => {
    if (seen.has(v.youtubeId)) return false;
    seen.add(v.youtubeId);
    return true;
  });

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
          {/* Eyebrow + heading — one shared intro above both spotlight cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="rule-gold" />
              <span className="label-eyebrow">Latest Releases</span>
            </div>
            <h2 className="font-raleway font-light text-neutral-900 text-2xl sm:text-3xl md:text-4xl tracking-normal leading-[1.15] mb-4 sm:mb-5">
              New songs of worship and praise.
            </h2>
            <p className="font-sans text-neutral-500 text-base leading-relaxed max-w-md mx-auto">
              Watch the newest visuals and share these anointed moments with your community.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <Skeleton className="aspect-video w-full" rounded="lg" />
              <Skeleton className="aspect-video w-full" rounded="lg" />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Two spotlight cards — stacks to one column below md, so
                  each card keeps a full-width 16:9 frame instead of being
                  squeezed into an illegibly small tile on mobile. */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
              >
                {spotlightVideos.map((video, idx) => (
                  <button
                    key={video.key}
                    onClick={() => setOpenVideo(video)}
                    className="group relative w-full aspect-video rounded-xl overflow-hidden shadow-card-light-lg cursor-pointer ring-1 ring-black/[0.04]"
                    aria-label={`Play ${video.title}`}
                  >
                    <YoutubeThumbnail
                      youtubeId={video.youtubeId}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      sizes="(max-width:768px) 100vw, 50vw"
                      priority={idx === 0}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

                    {/* Play button — small, gold-accented on hover, scales cleanly */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-gold-400/50"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: idx * 0.3,
                        }}
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
                    <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 bg-gold-500 text-black font-sans font-semibold text-[0.6rem] tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full shadow-lg">
                      <Sparkles className="h-3 w-3 fill-current" />
                      {video.badge}
                    </div>

                    {/* Title */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-left">
                      <p className="font-display font-bold text-white text-lg sm:text-xl leading-snug line-clamp-2">
                        {video.title}
                      </p>
                    </div>
                  </button>
                ))}
              </motion.div>

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
        {openVideo && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[600] bg-black/94 backdrop-blur-md"
              onClick={() => setOpenVideo(null)}
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
                    {openVideo.title}
                  </p>
                  <button
                    onClick={() => setOpenVideo(null)}
                    aria-label="Close"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden ring-1 ring-white/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${openVideo.youtubeId}?autoplay=1&rel=0`}
                    title={openVideo.title}
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
