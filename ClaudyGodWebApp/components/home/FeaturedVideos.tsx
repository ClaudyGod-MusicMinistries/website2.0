'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X, ChevronRight } from 'lucide-react';
import { featuredVideos } from '@/data/featured';

function getYouTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|\/embed\/)([^?&]+)/);
  return m ? m[1] : null;
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

export function FeaturedVideos() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeVideo = featuredVideos.find((v) => v.id === activeId);
  const ytId = activeVideo ? getYouTubeId(activeVideo.youtubeUrl) : null;

  const featured   = featuredVideos[0];
  const sideList   = featuredVideos.slice(1, 4);
  const bottomRow  = featuredVideos.slice(4, 8);

  return (
    <>
      <section className="bg-white section-py border-t border-black/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          {/* Header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="rule-gold" />
                <span className="label-eyebrow">Watch & Worship</span>
              </div>
              <h2 className="font-bricolage font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight leading-tight">
                Featured Videos
              </h2>
            </div>
            <Link
              href="/videos"
              className="hidden sm:inline-flex items-center gap-2 font-worksans text-xs tracking-[0.18em] uppercase border border-neutral-300 hover:border-purple-600 text-neutral-700 hover:text-purple-700 px-6 h-10 rounded-xl transition-all duration-300 group"
            >
              See All
              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Main: featured + side list */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 mb-4"
          >
            {/* Featured large card */}
            <motion.button
              variants={cardVariant}
              onClick={() => setActiveId(featured.id)}
              className="group relative aspect-video overflow-hidden bg-[#111] cursor-pointer rounded-2xl"
            >
              <Image
                src={featured.thumbnailUrl}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width:1024px) 100vw, 65vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent" />
              {/* Purple glow play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover:border-purple-400/70 group-hover:bg-purple-600/30 group-hover:scale-110 transition-all duration-400">
                  <Play className="h-6 w-6 text-white fill-white ml-0.5" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-raleway text-white text-base font-normal leading-snug line-clamp-2 mb-1">
                  {featured.title}
                </p>
                <span className="font-worksans text-[0.52rem] tracking-[0.15em] uppercase text-gold-400/70">
                  {featured.duration}
                </span>
              </div>
            </motion.button>

            {/* Side list */}
            <motion.div variants={cardVariant} className="flex flex-col gap-3">
              {sideList.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setActiveId(video.id)}
                  className="group relative flex gap-4 items-center bg-[#0e0e0e] hover:bg-[#141414] border border-white/[0.04] hover:border-white/[0.08] p-3 rounded-xl transition-all duration-300 cursor-pointer text-left overflow-hidden"
                >
                  <div className="relative w-28 h-16 flex-shrink-0 overflow-hidden">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="112px"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-purple-600/70 transition-colors duration-300">
                        <Play className="h-3 w-3 text-white fill-white ml-px" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-raleway text-white/80 text-sm font-normal leading-snug line-clamp-2 mb-1 group-hover:text-white transition-colors duration-300">
                      {video.title}
                    </p>
                    <span className="font-worksans text-[0.48rem] tracking-[0.12em] uppercase text-neutral-600">
                      {video.duration}
                    </span>
                  </div>
                  {/* Gold left accent on hover */}
                  <span className="absolute left-0 inset-y-0 w-0.5 bg-gold-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom row */}
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
                className="group relative aspect-video overflow-hidden bg-[#111] cursor-pointer rounded-xl"
              >
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-600 group-hover:scale-[1.06] opacity-80 group-hover:opacity-100"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-purple-600/80 flex items-center justify-center">
                    <Play className="h-4 w-4 text-white fill-white ml-px" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-raleway text-white/80 text-xs font-normal leading-snug line-clamp-2">
                    {video.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Mobile see all */}
          <div className="mt-8 flex justify-center sm:hidden">
            <Link
              href="/videos"
              className="inline-flex items-center gap-2.5 font-worksans text-xs tracking-[0.18em] uppercase bg-neutral-900 hover:bg-purple-700 text-white px-8 h-11 rounded-xl transition-all duration-300 group"
            >
              See All Videos
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Video lightbox modal */}
      <AnimatePresence>
        {activeId && ytId && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[600] bg-black/92 backdrop-blur-md"
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
                  <p className="font-raleway text-white/70 text-sm font-light line-clamp-1 max-w-[80%]">
                    {activeVideo?.title}
                  </p>
                  <button
                    onClick={() => setActiveId(null)}
                    aria-label="Close"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="relative aspect-video bg-black ring-1 ring-white/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
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
