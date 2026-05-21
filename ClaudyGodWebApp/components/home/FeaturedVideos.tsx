'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { featuredVideos } from '@/data/featured';
import { cn } from '@/utils/cn';

function getYouTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|\/embed\/)([^?&]+)/);
  return m ? m[1] : null;
}

export function FeaturedVideos() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeVideo = featuredVideos.find((v) => v.id === activeId);
  const ytId = activeVideo ? getYouTubeId(activeVideo.youtubeUrl) : null;

  return (
    <>
      <section className="bg-[#0a0a0a] section-py">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          {/* Header row */}
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="rule-gold" />
                <span className="label-eyebrow">Watch & Worship</span>
              </div>
              <h2 className="font-raleway font-extralight text-white text-4xl md:text-5xl tracking-tight leading-tight">
                Featured Videos
              </h2>
            </div>
          </div>

          {/* Grid: first video large, rest smaller */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {featuredVideos.slice(0, 6).map((video, i) => (
              <button
                key={video.id}
                onClick={() => setActiveId(video.id)}
                className={cn(
                  'group relative overflow-hidden bg-[#0a0a0a] cursor-pointer text-left',
                  i === 0 ? 'md:col-span-2 md:row-span-2 aspect-[16/10]' : 'aspect-video'
                )}
              >
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-90"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                {/* Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:border-gold-400/60 group-hover:bg-black/40 transition-all duration-300">
                    <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                  </div>
                </div>
                {/* Title overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-raleway text-white text-sm font-light leading-snug line-clamp-2">
                    {video.title}
                  </p>
                  <span className="font-worksans text-[0.55rem] tracking-[0.15em] uppercase text-gold-400/70 mt-1 block">
                    {video.duration}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeId && ytId && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[600] bg-black/90 backdrop-blur-md"
              onClick={() => setActiveId(null)}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-0 z-[601] flex items-center justify-center p-6 pointer-events-none"
            >
              <div className="relative w-full max-w-5xl pointer-events-auto">
                <button
                  onClick={() => setActiveId(null)}
                  aria-label="Close"
                  className="absolute -top-10 right-0 text-white/50 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                    title={activeVideo?.title}
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
