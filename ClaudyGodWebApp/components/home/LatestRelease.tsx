'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { latestReleasePlatforms, albums } from '@/data/music';
import { featuredVideos } from '@/data/featured';

function getYouTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|\/embed\/)([^?&]+)/);
  return m ? m[1] : null;
}

export function LatestRelease() {
  const [videoOpen, setVideoOpen] = useState(false);
  const latest = albums[0];
  const latestVideo = featuredVideos[0];
  const ytId = getYouTubeId(latestVideo.youtubeUrl);

  return (
    <>
    <section className="bg-white section-py">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-10 sm:mb-14">
          <span className="rule-gold" />
          <span className="label-eyebrow">New Release</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">

          {/* Album art & Video preview */}
          <div className="flex flex-col gap-4">
            {/* Album art */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
                <Image
                  src={latest.image}
                  alt={latest.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 45vw"
                  quality={90}
                  priority={true}
                />
                <div className="absolute inset-0 ring-1 ring-black/5 pointer-events-none" />
              </div>
            </div>

            {/* Video preview */}
            <button
              onClick={() => setVideoOpen(true)}
              className="relative w-full max-w-sm mx-auto aspect-video rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] group cursor-pointer"
            >
              <Image
                src={latestVideo.thumbnailUrl}
                alt={latestVideo.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 45vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 group-hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 shadow-lg">
                  <Play className="h-6 w-6 text-white fill-white ml-1" />
                </div>
              </div>
              <div className="absolute inset-0 ring-1 ring-black/5 pointer-events-none" />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <h2 className="font-bricolage font-bold text-neutral-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-3 sm:mb-4">
              {latest.title}
            </h2>
            <p className="font-worksans text-xs tracking-[0.18em] uppercase text-gold-500 mb-8 sm:mb-10">
              Latest Album — Available Everywhere
            </p>

            <p className="font-roboto text-neutral-600 text-base sm:text-lg leading-relaxed max-w-sm mb-8 sm:mb-10">
              Experience worship that transforms — available now on all major streaming platforms.
            </p>

            {/* Platform list */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
              {latestReleasePlatforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ '--brand': platform.brandColor } as React.CSSProperties}
                    className="inline-flex items-center gap-2.5 px-4 sm:px-5 h-10 sm:h-11 border border-neutral-200 hover:border-[var(--brand)]/50 text-neutral-500 hover:text-[var(--brand)] font-worksans text-xs tracking-[0.15em] uppercase rounded-xl transition-all duration-300"
                  >
                    <Icon className="h-3 w-3 shrink-0" />
                    <span className="hidden sm:inline">{platform.name}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-8 sm:pt-10 border-t border-neutral-100 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/music"
                className="inline-flex items-center justify-center sm:justify-start gap-2.5 font-worksans text-xs tracking-[0.18em] uppercase bg-neutral-900 hover:bg-purple-700 text-white px-6 sm:px-8 h-11 rounded-xl transition-all duration-300 group"
              >
                View Full Discography
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/store"
                className="inline-flex items-center justify-center sm:justify-start gap-2.5 font-worksans text-xs tracking-[0.18em] uppercase border border-neutral-300 hover:border-purple-600 text-neutral-700 hover:text-purple-700 px-6 sm:px-8 h-11 rounded-xl transition-all duration-300"
              >
                Visit Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Video lightbox modal */}
    <AnimatePresence>
      {videoOpen && ytId && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[600] bg-black/94 backdrop-blur-md"
            onClick={() => setVideoOpen(false)}
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
                <p className="font-bricolage font-semibold text-white/80 text-sm line-clamp-1 max-w-[80%]">
                  {latestVideo.title}
                </p>
                <button
                  onClick={() => setVideoOpen(false)}
                  aria-label="Close"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden ring-1 ring-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
                  title={latestVideo.title}
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
