'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Music } from 'lucide-react';
import { latestReleasePlatforms } from '@/data/music';
import { featuredVideos } from '@/data/featured';
import { buttonVariants } from '@/lib/theme/buttons';
import { cn } from '@/utils/cn';

function getYouTubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|\/embed\/)([^?&]+)/);
  return m ? m[1] : null;
}

export function LatestRelease() {
  const [videoOpen, setVideoOpen] = useState(false);
  const latestVideo = featuredVideos[0];
  const ytId = getYouTubeId(latestVideo.youtubeUrl);

  return (
    <>
    <section className="bg-gradient-to-b from-white via-white to-neutral-50 section-py">
      <div className="container-site">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-12 sm:mb-16">
          <span className="rule-gold" />
          <span className="label-eyebrow">Latest Release</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">

          {/* Video - Main Focus */}
          <button
            onClick={() => setVideoOpen(true)}
            className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-card-light-lg group cursor-pointer order-2 lg:order-1"
          >
            <Image
              src={latestVideo.thumbnailUrl}
              alt={latestVideo.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="100vw"
              quality={95}
              priority={true}
            />

            {/* Enhanced overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center shadow-glow-purple backdrop-blur-sm"
              >
                <Play className="h-8 w-8 text-white fill-white ml-1" />
              </motion.div>
            </div>

            {/* Badge */}
            <div className="absolute top-6 left-6 bg-gradient-to-r from-gold-500 to-gold-400 text-surface-deep font-sans font-bold text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full shadow-lg">
              🎬 New Video
            </div>
          </button>

          {/* Content */}
          <div className="flex flex-col justify-center order-1 lg:order-2">
            {/* Badge for mobile */}
            <div className="lg:hidden mb-4 inline-flex items-center gap-2 w-fit">
              <Music className="h-4 w-4 text-gold-500" />
              <span className="font-sans text-xs tracking-[0.15em] uppercase text-gold-600 font-semibold">Latest Release</span>
            </div>

            <h2 className="font-display font-bold text-neutral-900 text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.1] mb-4 sm:mb-6">
              {latestVideo.title}
            </h2>

            <p className="font-sans text-sm tracking-[0.15em] uppercase text-neutral-500 font-semibold mb-6">
              Exclusive Music Video
            </p>

            <p className="font-sans text-neutral-600 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
              Experience the powerful visuals and soul-stirring worship from our latest release. Watch, listen, and share this anointed moment with your community.
            </p>

            {/* CTA Button */}
            <motion.button
              onClick={() => setVideoOpen(true)}
              whileTap={{ scale: 0.97 }}
              className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'w-fit px-8 mb-10')}
            >
              <Play className="h-5 w-5 fill-white" />
              Play Video
            </motion.button>

            {/* Listen on platforms */}
            <div className="mb-8">
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-neutral-500 font-semibold mb-4">
                Listen Everywhere
              </p>
              <div className="flex flex-wrap gap-2">
                {latestReleasePlatforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ '--brand': platform.brandColor } as React.CSSProperties}
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-neutral-200 hover:border-[var(--brand)]/60 hover:bg-[var(--brand)]/5 text-neutral-600 hover:text-[var(--brand)] transition-all duration-300 group/icon"
                      title={platform.name}
                    >
                      <Icon className="h-5 w-5 transition-transform duration-300 group-hover/icon:scale-110" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-neutral-200">
              <Link
                href="/music"
                className={cn(buttonVariants({ variant: 'secondary', size: 'lg', uppercase: true }), 'group flex-1')}
              >
                View All Music
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/videos"
                className={cn(buttonVariants({ variant: 'outline', size: 'lg', uppercase: true }), 'flex-1')}
              >
                More Videos
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
                <p className="font-display font-semibold text-white/80 text-sm line-clamp-1 max-w-[80%]">
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
