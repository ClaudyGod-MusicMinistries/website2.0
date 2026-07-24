'use client';

import { useId, useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X, Clock, Search, SearchX } from 'lucide-react';
import { useMedia } from '@/hooks/useMedia';
import { toVideoView, type VideoView } from '@/lib/data/adapters';
import { videos as legacyVideos, type VideoType } from '@/data/videos';
import { GridSkeleton } from '@/components/shared/GridSkeleton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { YoutubeThumbnail } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

type Filter = 'All' | VideoType['category'];
const filters: Filter[] = ['All', 'Music Videos', 'Visualizers', 'Live Sessions', 'Christmas'];

// The real backend's MediaItem has no category field (see toVideoView) — this
// maps youtubeId -> category from the curated catalog (data/videos.ts) so
// known videos can still be filtered by type. A video the backend returns
// that isn't in that catalog yet just won't match a specific tab (still
// shows under "All"), rather than the whole feature requiring a backend
// field that doesn't exist.
const categoryByYoutubeId = new Map(legacyVideos.map((v) => [v.youtubeId, v.category]));

export function VideoGrid() {
  const pillLayoutId = useId();
  const { media, loading, error, refetch } = useMedia('video');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [active, setActive] = useState<Filter>('All');
  const [query, setQuery] = useState('');

  const videos = media
    .map(toVideoView)
    .filter((v): v is VideoView & { youtubeId: string } => v.youtubeId !== null);

  const byCategory =
    active === 'All'
      ? videos
      : videos.filter((v) => categoryByYoutubeId.get(v.youtubeId) === active);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () => (q ? byCategory.filter((v) => v.title.toLowerCase().includes(q)) : byCategory),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [byCategory, q]
  );

  if (loading) {
    return (
      <section className="bg-white section-py">
        <div className="container-site">
          <GridSkeleton cols={4} rows={2} />
        </div>
      </section>
    );
  }
  // `error` alone doesn't block the grid — useMedia falls back to the real
  // curated catalog (data/fallback.ts) on a failed fetch, so this only
  // shows the error screen if there's truly nothing to display.
  if (error && videos.length === 0) {
    return (
      <section className="bg-white section-py">
        <div className="container-site">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white section-py">
        <div className="container-site">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-4 sm:mb-6">
            <span className="rule-gold" />
            <span className="label-eyebrow">Watch & Worship</span>
          </div>
          <h2 className="font-raleway font-light text-neutral-900 text-2xl sm:text-3xl md:text-4xl tracking-normal leading-tight mb-8 sm:mb-10">
            All Videos
          </h2>

          {/* Toolbar — search + segmented filter control, matching
              TeachingsGrid's pattern so the two catalogs feel like one
              system instead of two different browsing experiences. */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 sm:mb-10">
            <div className="relative inline-flex items-center gap-1 p-1 bg-cream-100 border border-neutral-200 rounded-full shadow-sm w-full sm:w-auto overflow-x-auto">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  aria-pressed={active === f}
                  className={cn(
                    'relative z-10 shrink-0 flex-1 sm:flex-none px-5 h-10 rounded-full font-sans text-xs font-semibold tracking-[0.08em] uppercase transition-colors duration-300',
                    active === f ? 'text-white' : 'text-neutral-500 hover:text-purple-600'
                  )}
                >
                  {active === f && (
                    <motion.span
                      layoutId={pillLayoutId}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 -z-10 bg-purple-600 rounded-full shadow-purple-cta"
                    />
                  )}
                  {f}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search videos…"
                aria-label="Search videos"
                className="w-full h-11 pl-11 pr-10 bg-cream-100 border border-neutral-200 rounded-full font-sans text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Result count */}
          <p className="font-sans text-[0.55rem] tracking-[0.18em] uppercase text-neutral-400 mb-6">
            {filtered.length} video{filtered.length !== 1 ? 's' : ''}
            {active !== 'All' && ` in ${active}`}
            {query && ` matching "${query.trim()}"`}
          </p>

          {/* Grid — animates in on filter change instead of swapping instantly */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${active}-${q}`}
                variants={stagger}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filtered.map((video) => (
                  <motion.div key={video.id} variants={cardAnim}>
                    <VideoCard video={video} onPlay={() => setPlayingId(video.youtubeId)} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4 py-20"
              >
                <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center">
                  <SearchX className="h-6 w-6 text-neutral-400" />
                </div>
                <div className="text-center">
                  <p className="font-display font-semibold text-neutral-800 text-base mb-1">
                    {q ? 'No matches found' : 'Nothing here yet'}
                  </p>
                  <p className="font-sans text-neutral-500 text-sm">
                    {q
                      ? `Nothing matches "${query.trim()}". Try a different search term.`
                      : 'Check back soon — new videos are added regularly.'}
                  </p>
                </div>
                {q && (
                  <button
                    onClick={() => setQuery('')}
                    className="font-sans text-xs font-semibold tracking-[0.08em] uppercase text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom link */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/videos"
              className="inline-flex items-center gap-2.5 font-sans text-xs tracking-[0.18em] uppercase border border-neutral-300 hover:border-purple-600 text-neutral-700 hover:text-purple-700 px-8 h-11 rounded-xl transition-all duration-300 group"
            >
              See All on YouTube
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {playingId && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[600] bg-black/94 backdrop-blur-md"
              onClick={() => setPlayingId(null)}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-0 z-[601] flex items-center justify-center p-4 md:p-8 pointer-events-none"
            >
              <div className="relative w-full max-w-5xl pointer-events-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-[0.55rem] tracking-[0.18em] uppercase text-white/40">
                    Now Playing
                  </span>
                  <button
                    onClick={() => setPlayingId(null)}
                    aria-label="Close video"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden ring-1 ring-white/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${playingId}?autoplay=1&rel=0`}
                    title="Video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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

function VideoCard({
  video,
  onPlay,
}: {
  video: VideoView & { youtubeId: string };
  onPlay: () => void;
}) {
  return (
    <button
      onClick={onPlay}
      className="group relative w-full aspect-video overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/[0.06] hover:ring-gold-500/40 shadow-card hover:shadow-card-hover transition-all duration-400 text-left"
    >
      {/* Full-bleed thumbnail — a single cinematic frame, not a photo-plus-
          caption card, so this reads as its own "watch" identity distinct
          from Teachings' editorial list-card layout. */}
      <YoutubeThumbnail
        youtubeId={video.youtubeId}
        alt={video.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/5" />

      {/* Play button — hidden until hover, keeps the frame clean by default */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-11 h-11 rounded-full bg-gold-500 flex items-center justify-center shadow-gold scale-90 group-hover:scale-100 transition-transform duration-300">
          <Play className="h-4 w-4 text-black fill-black ml-0.5" />
        </div>
      </div>

      {video.duration && (
        <span className="absolute top-3 right-3 flex items-center gap-1 font-sans text-[0.5rem] tracking-[0.1em] uppercase text-white/70 bg-black/50 px-2 py-1 rounded">
          <Clock className="h-2.5 w-2.5" />
          {video.duration}
        </span>
      )}

      {/* Title — overlaid in the frame, slim weight, capped to two lines */}
      <p className="absolute inset-x-0 bottom-0 p-3.5 font-sans text-[0.8rem] text-white/90 group-hover:text-white font-light leading-snug line-clamp-2 tracking-[0.01em] transition-colors duration-300">
        {video.title}
      </p>
    </button>
  );
}
