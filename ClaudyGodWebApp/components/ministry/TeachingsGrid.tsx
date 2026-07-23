'use client';

import { useState, useMemo, useId } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X, Search, SearchX } from 'lucide-react';
import { teachingsData } from '@/data/ministry';
import { cn } from '@/lib/utils/cn';

type Filter = 'All' | 'Live Teachings' | 'CGM Podcasts';
const filters: Filter[] = ['All', 'Live Teachings', 'CGM Podcasts'];

const gridReveal = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

export function TeachingsGrid() {
  const pillLayoutId = useId();
  const [active, setActive] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const byCategory =
    active === 'All' ? teachingsData : teachingsData.filter((t) => t.scripture === active);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () => (q ? byCategory.filter((t) => t.title.toLowerCase().includes(q)) : byCategory),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [byCategory, q]
  );

  return (
    <>
      <section className="bg-cream-100 section-py">
        <div className="container-site">
          <div className="flex items-center gap-4 mb-4 sm:mb-6">
            <span className="rule-gold" />
            <span className="label-eyebrow">Teachings & Podcasts</span>
          </div>
          <h2 className="font-raleway font-light text-neutral-900 text-2xl sm:text-3xl md:text-4xl tracking-normal leading-tight mb-8 sm:mb-10">
            Ministry Content
          </h2>

          {/* Toolbar — search + segmented filter control */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 sm:mb-10">
            {/* Segmented control — single sliding indicator, no counts */}
            <div className="relative inline-flex items-center gap-1 p-1 bg-white border border-neutral-200 rounded-full shadow-sm w-full sm:w-auto overflow-x-auto">
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

            {/* Search */}
            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search teachings & podcasts…"
                aria-label="Search teachings and podcasts"
                className="w-full h-11 pl-11 pr-10 bg-white border border-neutral-200 rounded-full font-sans text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-300"
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

          {/* Grid — animates in on filter change instead of swapping instantly */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={active}
                variants={gridReveal}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filtered.map((teaching) => (
                  <motion.button
                    key={teaching.id}
                    variants={cardReveal}
                    onClick={() => setPlayingId(teaching.youtubeId)}
                    className="group relative bg-neutral-900 text-left overflow-hidden rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300"
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
                      <span className="absolute top-3 left-3 font-sans text-[0.45rem] tracking-[0.15em] uppercase text-gold-400/80 bg-black/60 backdrop-blur-sm px-2 py-1">
                        {teaching.scripture}
                      </span>
                    </div>
                    <div className="p-4 border-t border-white/[0.06]">
                      <p className="font-sans text-base text-neutral-300 group-hover:text-white font-light leading-snug line-clamp-2 transition-colors duration-300">
                        {teaching.title}
                      </p>
                    </div>
                  </motion.button>
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
                      ? `Nothing matches “${query.trim()}”. Try a different search term.`
                      : 'Check back soon — new content is added regularly.'}
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
