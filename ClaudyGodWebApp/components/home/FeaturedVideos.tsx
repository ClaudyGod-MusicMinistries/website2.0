'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X, ChevronRight, Clock } from 'lucide-react';
import { useMedia } from '@/hooks/useMedia';
import { toVideoView } from '@/lib/data/adapters';
import { Button } from '@/components/ui/Button';
import { Skeleton, YoutubeThumbnail } from '@/components/ui';
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
 *
 * Selecting any video (side list, bottom row, or the big card itself)
 * swaps and plays it directly in the big display — not a separate lightbox
 * — the same "picker updates the one player" pattern MusicPlayer uses.
 */
export function FeaturedVideos() {
  const { media, loading } = useMedia('video');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos = media
    .map(toVideoView)
    .filter((v) => v.youtubeId !== null)
    .slice(1);

  const featured = videos[0];
  const display = videos.find((v) => v.id === selectedId) ?? featured;
  const sideList = videos.slice(1, 4);
  const bottomRow = videos.slice(4, 8);

  // `error` no longer hides the section — useMedia falls back to real curated
  // videos on a failed fetch, so only bail out if there's truly nothing to show.
  if (!loading && !featured) return null;

  const play = (id: string) => {
    setSelectedId(id);
    setIsPlaying(true);
  };

  return (
    <section className="relative bg-white py-16 sm:py-24 border-t border-neutral-200/70 overflow-hidden">
      <div className="relative container-site z-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-6 bg-gold-500" />
              <span className="label-eyebrow text-gold-700 font-semibold">Watch & Worship</span>
            </div>
            <h2 className="font-raleway font-light text-neutral-900 text-3xl sm:text-4xl tracking-tight">
              Featured Videos & Ministration
            </h2>
          </div>
          <Button
            href="/videos"
            variant="dark"
            size="sm"
            uppercase
            rightIcon={<ChevronRight className="h-3.5 w-3.5" />}
            className="hidden sm:inline-flex"
          >
            See All Videos
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
            <Skeleton className="aspect-video w-full rounded-2xl" />
            <div className="flex flex-col gap-3">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="flex-1 min-h-[88px] rounded-2xl" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Main layout: display + side list */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_340px] items-start gap-4 mb-4"
            >
              {/* Display card — plays inline once a video is selected */}
              <motion.div
                variants={cardVariant}
                className="group relative overflow-hidden bg-neutral-900 rounded-2xl border border-neutral-200/80 shadow-card-light-lg"
                style={{ aspectRatio: '16/9' }}
              >
                {isPlaying && display.youtubeId ? (
                  <>
                    <iframe
                      key={display.id}
                      src={`https://www.youtube.com/embed/${display.youtubeId}?autoplay=1&rel=0`}
                      title={display.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                    <button
                      onClick={() => setIsPlaying(false)}
                      aria-label="Stop video"
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => play(display.id)}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    aria-label={`Play ${display.title}`}
                  >
                    <YoutubeThumbnail
                      youtubeId={display.youtubeId!}
                      alt={display.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width:1024px) 100vw, 65vw"
                    />
                    {/* Cinematic gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/40 flex items-center justify-center bg-white/20 backdrop-blur-md group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:scale-110 transition-all duration-300 shadow-md">
                        <Play className="h-5 w-5 sm:h-6 sm:w-6 text-white fill-white ml-0.5 group-hover:text-black group-hover:fill-black transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-left">
                      <span className="inline-block font-sans text-[0.62rem] tracking-[0.16em] uppercase font-semibold text-gold-300 bg-black/60 px-3 py-1 rounded-full mb-2.5 backdrop-blur-xs">
                        {display.id === featured.id ? 'Featured Visual' : 'Now Playing'}
                      </span>
                      <p className="font-display font-semibold text-white text-lg sm:text-2xl leading-snug line-clamp-2 mb-2">
                        {display.title}
                      </p>
                      {display.duration && (
                        <span className="flex items-center gap-1.5 font-sans text-[0.65rem] tracking-[0.12em] uppercase text-white/70">
                          <Clock className="h-3 w-3" />
                          {display.duration}
                        </span>
                      )}
                    </div>
                  </button>
                )}
              </motion.div>

              {/* Side list */}
              {sideList.length > 0 && (
                <motion.div variants={cardVariant} className="flex flex-col gap-3">
                  {sideList.map((video) => {
                    const active = video.id === display.id;
                    return (
                      <button
                        key={video.id}
                        onClick={() => play(video.id)}
                        className={cn(
                          'group relative flex gap-3.5 items-center shrink-0 border p-3 rounded-2xl transition-all duration-200 cursor-pointer text-left overflow-hidden',
                          active
                            ? 'bg-purple-50/90 border-purple-300 shadow-xs'
                            : 'bg-cream-50/80 hover:bg-white border-neutral-200/80 hover:border-gold-300/80 shadow-2xs'
                        )}
                      >
                        {/* Thumbnail */}
                        <div className="relative w-24 h-15 sm:w-28 sm:h-16 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                          <YoutubeThumbnail
                            youtubeId={video.youtubeId!}
                            alt={video.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                            sizes="112px"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                            <div
                              className={cn(
                                'w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-colors duration-200',
                                active
                                  ? 'bg-gold-500 text-black'
                                  : 'bg-black/60 text-white group-hover:bg-purple-600'
                              )}
                            >
                              <Play className="h-2.5 w-2.5 fill-current ml-px" />
                            </div>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              'font-display font-medium text-xs leading-snug line-clamp-2 mb-1 transition-colors duration-200',
                              active
                                ? 'text-purple-900 font-semibold'
                                : 'text-neutral-800 group-hover:text-purple-700'
                            )}
                          >
                            {video.title}
                          </p>
                          {video.duration && (
                            <span className="flex items-center gap-1 font-sans text-[0.62rem] tracking-wider uppercase text-neutral-400">
                              <Clock className="h-2.5 w-2.5" />
                              {video.duration}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
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
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4"
              >
                {bottomRow.map((video) => {
                  const active = video.id === display.id;
                  return (
                    <motion.button
                      key={video.id}
                      variants={cardVariant}
                      onClick={() => play(video.id)}
                      className={cn(
                        'group relative aspect-video overflow-hidden bg-neutral-900 cursor-pointer rounded-2xl border transition-all duration-300 shadow-xs',
                        active
                          ? 'border-purple-500 ring-2 ring-purple-400/40'
                          : 'border-neutral-200/80 hover:border-gold-300'
                      )}
                    >
                      <YoutubeThumbnail
                        youtubeId={video.youtubeId!}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        sizes="(max-width:768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                      <div
                        className={cn(
                          'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
                          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        )}
                      >
                        <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center shadow-md">
                          <Play className="h-3.5 w-3.5 text-black fill-black ml-px" />
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                        <p className="font-display font-medium text-xs leading-snug line-clamp-1 text-white group-hover:text-gold-300 transition-colors">
                          {video.title}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </>
        )}

        {/* Mobile see all — Compact, sleek pill */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Button
            href="/videos"
            variant="dark"
            size="md"
            uppercase
            rightIcon={<ChevronRight className="h-3.5 w-3.5" />}
          >
            See All Videos
          </Button>
        </div>
      </div>
    </section>
  );
}
