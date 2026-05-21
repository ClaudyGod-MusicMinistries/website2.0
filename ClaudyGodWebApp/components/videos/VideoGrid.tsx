'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { videos } from '@/data/videos';
import type { VideoType } from '@/data/videos';
import { cn } from '@/utils/cn';

const categories = ['All', 'Music Videos', 'Visualizers', 'Live Sessions', 'Christmas'] as const;
type Filter = (typeof categories)[number];

export function VideoGrid() {
  const [active, setActive] = useState<Filter>('All');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filtered = active === 'All' ? videos : videos.filter((v) => v.category === active);

  return (
    <>
      <section className="bg-[#080808] section-py">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          {/* Filter tabs */}
          <div className="flex items-center gap-4 mb-14 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  'shrink-0 font-worksans text-[0.55rem] tracking-[0.2em] uppercase pb-3 border-b transition-all duration-300',
                  active === cat
                    ? 'text-gold-400 border-gold-500/50'
                    : 'text-neutral-600 border-transparent hover:text-neutral-400'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/[0.04]">
            {filtered.map((video) => (
              <VideoCard key={video.id} video={video} onPlay={() => setPlayingId(video.youtubeId)} />
            ))}
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
              className="fixed inset-0 z-[600] bg-black/92 backdrop-blur-md"
              onClick={() => setPlayingId(null)}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-0 z-[601] flex items-center justify-center p-6 pointer-events-none"
            >
              <div className="relative w-full max-w-5xl pointer-events-auto">
                <button
                  onClick={() => setPlayingId(null)}
                  aria-label="Close video"
                  className="absolute -top-10 right-0 text-white/40 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${playingId}?autoplay=1`}
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

function VideoCard({ video, onPlay }: { video: VideoType; onPlay: () => void }) {
  return (
    <button
      onClick={onPlay}
      className="group relative bg-[#080808] text-left overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.title}
          fill
          className="object-cover opacity-70 group-hover:opacity-90 transition-all duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
        />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:border-gold-400/60 group-hover:bg-black/40 transition-all duration-300">
            <Play className="h-3.5 w-3.5 text-white fill-white ml-0.5" />
          </div>
        </div>
        {/* Category badge */}
        <span className="absolute top-3 left-3 font-worksans text-[0.45rem] tracking-[0.15em] uppercase text-gold-400/80 bg-black/60 backdrop-blur-sm px-2 py-1">
          {video.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 border-t border-white/[0.04]">
        <p className="font-raleway text-sm text-neutral-400 group-hover:text-white font-light leading-snug line-clamp-2 transition-colors duration-300">
          {video.title}
        </p>
      </div>
    </button>
  );
}
