'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { teachingsData } from '@/data/ministry';
import { cn } from '@/utils/cn';

type Filter = 'All' | 'Live Teachings' | 'CGM Podcasts';
const filters: Filter[] = ['All', 'Live Teachings', 'CGM Podcasts'];

export function TeachingsGrid() {
  const [active, setActive] = useState<Filter>('All');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filtered =
    active === 'All' ? teachingsData : teachingsData.filter((t) => t.scripture === active);

  return (
    <>
      <section className="bg-cream-100 section-py">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-4 sm:mb-6">
            <span className="rule-gold" />
            <span className="label-eyebrow">Teachings & Podcasts</span>
          </div>
          <h2 className="font-bricolage font-bold text-neutral-900 text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-8 sm:mb-10">
            Ministry Content
          </h2>

          {/* Filter tabs — pill style, horizontal scroll on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto flex-nowrap sm:flex-wrap mb-8 sm:mb-10 pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={cn(
                  'shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 h-10 sm:h-11 rounded-full font-worksans text-[0.6rem] sm:text-xs font-medium tracking-[0.1em] uppercase border transition-all duration-300',
                  active === f
                    ? 'bg-purple-600 border-purple-600 text-white shadow-[0_4px_16px_rgba(124,58,237,0.35)]'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-purple-400 hover:text-purple-600'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((teaching) => (
              <button
                key={teaching.id}
                onClick={() => setPlayingId(teaching.youtubeId)}
                className="group relative bg-neutral-900 text-left overflow-hidden rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-shadow duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={`https://img.youtube.com/vi/${teaching.youtubeId}/hqdefault.jpg`}
                    alt={teaching.title}
                    fill
                    unoptimized
                    className="object-cover opacity-60 group-hover:opacity-85 transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover:border-gold-400/60 transition-all duration-300">
                      <Play className="h-3.5 w-3.5 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 font-worksans text-[0.45rem] tracking-[0.15em] uppercase text-gold-400/80 bg-black/60 backdrop-blur-sm px-2 py-1">
                    {teaching.scripture}
                  </span>
                </div>
                <div className="p-4 border-t border-white/[0.06]">
                  <p className="font-roboto text-base text-neutral-300 group-hover:text-white font-light leading-snug line-clamp-2 transition-colors duration-300">
                    {teaching.title}
                  </p>
                </div>
              </button>
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
                  aria-label="Close"
                  className="absolute -top-10 right-0 text-white/40 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${playingId}?autoplay=1`}
                    title="Teaching"
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
