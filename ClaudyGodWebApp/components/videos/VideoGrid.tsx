'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X, Clock } from 'lucide-react';
import { useMedia } from '@/hooks/useMedia';
import { toVideoView, type VideoView } from '@/lib/data/adapters';
import { GridSkeleton } from '@/components/shared/GridSkeleton';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

export function VideoGrid() {
  const { media, loading, error, refetch } = useMedia('video');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const videos = media.map(toVideoView).filter((v): v is VideoView & { youtubeId: string } => v.youtubeId !== null);

  if (loading) return <GridSkeleton cols={4} rows={2} />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <>
      <section className="bg-white section-py">
        <div className="container-site">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="rule-gold" />
                <span className="label-eyebrow">Watch & Worship</span>
              </div>
              <h2 className="font-display font-semibold text-neutral-900 text-2xl sm:text-3xl md:text-4xl tracking-tight">
                All Videos
              </h2>
            </div>
            <p className="font-sans text-[0.55rem] tracking-[0.18em] uppercase text-neutral-400 sm:pb-1">
              {videos.length} video{videos.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {videos.map((video) => (
                <motion.div key={video.id} variants={cardAnim}>
                  <VideoCard video={video} onPlay={() => setPlayingId(video.youtubeId)} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom link */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/videos"
              className="inline-flex items-center gap-2.5 font-sans text-xs tracking-[0.18em] uppercase border border-neutral-300 hover:border-purple-600 text-neutral-700 hover:text-purple-700 px-8 h-11 rounded-xl transition-all duration-300 group"
            >
              See All on YouTube
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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

function VideoCard({ video, onPlay }: { video: VideoView & { youtubeId: string }; onPlay: () => void }) {
  return (
    <button
      onClick={onPlay}
      className="group w-full text-left overflow-hidden rounded-xl bg-neutral-950 shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:shadow-[0_10px_36px_rgba(0,0,0,0.22)] transition-all duration-400 border border-white/[0.03] hover:border-purple-500/20"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.title}
          fill
          unoptimized
          className="object-cover opacity-75 group-hover:opacity-100 transition-all duration-500 group-hover:scale-[1.05]"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center bg-black/25 backdrop-blur-sm group-hover:border-purple-400 group-hover:bg-purple-600/70 group-hover:scale-110 transition-all duration-300">
            <Play className="h-4.5 w-4.5 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="font-display font-semibold text-base text-neutral-200 group-hover:text-white leading-snug line-clamp-2 transition-colors duration-300 mb-2">
          {video.title}
        </p>
        {video.duration && (
          <span className="inline-flex items-center gap-1.5 font-sans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-600">
            <Clock className="h-3 w-3" />
            {video.duration}
          </span>
        )}
      </div>
    </button>
  );
}
