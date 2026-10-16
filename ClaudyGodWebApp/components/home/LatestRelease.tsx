'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Volume2, ArrowRight } from 'lucide-react';
import { latestReleasePlatforms } from '@/data/music';
import { useMedia } from '@/hooks/useMedia';
import { toVideoView } from '@/lib/data/adapters';
import { Button } from '@/components/ui/Button';
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
      <section className="relative bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950 section-py overflow-hidden border-t border-b border-purple-800/80">
        {/* Structured atmospheric studio background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute inset-0 opacity-25 mix-blend-screen">
            <Image src="/MusicBanner5.webp" alt="" fill className="object-cover object-center" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/80 via-transparent to-purple-950/90" />
          <AmbientGlow
            color="gold"
            size={650}
            opacity={0.18}
            animate={true}
            className="-top-[200px] -right-[150px]"
          />
          <AmbientGlow
            color="purple"
            size={700}
            opacity={0.3}
            animate={false}
            className="-bottom-[200px] -left-[150px]"
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
              <span className="h-px w-8 bg-gold-400" />
              <span className="label-eyebrow text-gold-300 font-semibold tracking-[0.18em]">
                Latest Releases
              </span>
              <span className="h-px w-8 bg-gold-400" />
            </div>
            <h2 className="font-raleway font-light text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-normal leading-[1.15] mb-4 sm:mb-5">
              New songs of worship and praise.
            </h2>
            <p className="font-sans text-purple-200/90 text-base leading-relaxed max-w-lg mx-auto">
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
                    className="group relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer ring-1 ring-gold-400/30 hover:ring-gold-400/80 transition-all duration-500"
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

                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-950/20 to-transparent" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

                    {/* Play button — gold luxury pill, scales cleanly */}
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
                        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gold-500 border border-gold-300 flex items-center justify-center group-hover:bg-gold-400 transition-colors duration-300 shadow-gold-md"
                      >
                        <Play className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem] text-purple-950 fill-purple-950 ml-0.5" />
                      </motion.div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-purple-950/85 backdrop-blur-md text-gold-300 border border-gold-400/40 font-sans font-semibold text-[0.62rem] tracking-[0.14em] uppercase px-3 py-1.5 rounded-full shadow-md">
                      <Volume2 className="h-3.5 w-3.5 text-gold-400" />
                      {video.badge}
                    </div>

                    {/* Title */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-left">
                      <p className="font-display font-bold text-white group-hover:text-gold-200 transition-colors text-lg sm:text-xl leading-snug line-clamp-2">
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
                <p className="font-sans text-[0.68rem] tracking-[0.2em] uppercase text-gold-300/80 font-semibold mb-4">
                  Listen Everywhere
                </p>
                <div className="flex flex-wrap justify-center gap-2.5 mb-10">
                  {latestReleasePlatforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <a
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ '--brand': platform.brandColor } as React.CSSProperties}
                        className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-purple-800/80 bg-purple-900/60 backdrop-blur-sm text-purple-200 hover:text-[var(--brand)] hover:border-[var(--brand)]/80 hover:bg-[var(--brand)]/10 transition-all duration-300 group/icon shadow-2xs"
                        title={platform.name}
                      >
                        <Icon className="h-4 w-4 transition-transform duration-300 group-hover/icon:scale-110" />
                      </a>
                    );
                  })}
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-8 border-t border-purple-800/60">
                  <Button
                    href="/music"
                    variant="primary"
                    size="lg"
                    uppercase
                    rightIcon={
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    }
                  >
                    View All Music
                  </Button>
                  <Button href="/videos" variant="outline-white" size="lg" uppercase>
                    More Videos
                  </Button>
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
