'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import {
  FaSpotify, FaApple, FaYoutube, FaDeezer, FaAmazon, FaMusic,
} from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { heroSlides } from '@/data/heroSlides';
import { cn } from '@/utils/cn';

const DURATION = 8000;

const iconMap: Record<string, IconType> = {
  FaSpotify, FaApple, FaYoutube, FaDeezer, FaAmazon, FaMusic,
};

const bgVariants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] } },
  exit:   { opacity: 0, transition: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] } },
};

// Clip-path wipe from bottom
const reveal = {
  hidden:  { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: (d = 0) => ({
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 1.0, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Fade-up for smaller elements
const fadeUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const startRef = useRef<number>(Date.now());
  const rafRef   = useRef<number>(0);
  const total    = heroSlides.length;

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
    startRef.current = Date.now();
  }, [total]);

  useEffect(() => {
    if (paused) { cancelAnimationFrame(rafRef.current); return; }
    const tick = () => {
      if (Date.now() - startRef.current >= DURATION) advance();
      else rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, current, advance]);

  const goTo = (i: number) => { setCurrent(i); startRef.current = Date.now(); };

  const slide = heroSlides[current];
  const isMusic = slide.type === 'music';

  return (
    <section
      className="relative w-full min-h-[100dvh] min-h-screen overflow-hidden bg-[#080808]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background — lighter overlay so images are clearly visible */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${slide.id}`}
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {(slide.imageUrlDesktop || slide.imageUrl) && (
            <Image
              src={(slide.imageUrlDesktop ?? slide.imageUrl)!}
              alt=""
              fill
              priority={current <= 1}
              className="object-cover"
              style={{ objectPosition: slide.objectPosition ?? 'center center' }}
              sizes="100vw"
            />
          )}

          {/* Top vignette — navbar readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

          {/* Left gradient — stronger for CTA slide (portrait image sits right) */}
          <div className={`absolute inset-0 ${
            slide.type === 'cta'
              ? 'bg-gradient-to-r from-black/85 via-black/50 to-black/10'
              : 'bg-gradient-to-r from-black/70 via-black/30 to-transparent'
          }`} />

          {/* Bottom gradient — text anchor */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 -left-24 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.12)_0%,transparent_70%)]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute -top-20 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.07)_0%,transparent_70%)]"
        />
      </div>

      {/* Slide content */}
      <div className={cn(
        'absolute inset-0 flex flex-col pt-24 pb-24',
        isMusic ? 'justify-center' : 'justify-end md:pb-32'
      )}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <AnimatePresence mode="wait">
            <motion.div key={`content-${slide.id}`} className="max-w-2xl">
              <SlideContent slide={slide} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-0 right-0 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="pointer-events-auto group p-2 -m-2"
            >
              <span className={cn(
                'block rounded-full transition-all duration-500',
                i === current
                  ? 'w-8 h-1.5 bg-gold-400'
                  : 'w-2 h-2 bg-white/30 group-hover:bg-white/60'
              )} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Per-slide content ────────────────────────────────────────────────────────

function SlideContent({ slide }: { slide: (typeof heroSlides)[number] }) {
  const { type, content } = slide;

  // ── Scripture / quote slide ──────────────────────────────────────────────
  if (type === 'quote' && content?.quote) {
    return (
      <div className="text-center sm:text-left">
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="flex items-center gap-3 mb-8 justify-center sm:justify-start"
        >
          <span className="block w-10 h-px bg-gold-500/80" />
          <span className="label-eyebrow text-gold-300/90">Scripture</span>
          <span className="block w-10 h-px bg-gold-500/80 sm:hidden" />
        </motion.div>

        <div className="overflow-hidden">
          <motion.blockquote
            custom={0.12} variants={reveal} initial="hidden" animate="visible"
            className="font-abril text-white text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] leading-[1.25] tracking-tight max-w-2xl"
          >
            {content.quote}
          </motion.blockquote>
        </div>

        {content.reference && (
          <motion.p
            custom={0.5} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-7 font-worksans text-[0.62rem] tracking-[0.28em] uppercase text-gold-400/80"
          >
            {content.reference}
          </motion.p>
        )}

        {/* Play button — links to worship channel */}
        <motion.div
          custom={0.65} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-8"
        >
          <a
            href="https://www.youtube.com/@claudygodministries"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 group"
          >
            <span className="relative w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:border-gold-400/80 group-hover:bg-gold-500/20 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_40px_rgba(201,168,76,0.35)]">
              <Play className="h-5 w-5 text-white fill-white ml-0.5 group-hover:text-gold-300 transition-colors duration-300" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-worksans text-[0.58rem] tracking-[0.2em] uppercase text-gold-400/75 group-hover:text-gold-400 transition-colors duration-300">
                Watch on YouTube
              </span>
              <span className="font-bricolage font-semibold text-white/80 text-sm group-hover:text-white transition-colors duration-300">
                Worship with ClaudyGod
              </span>
            </span>
          </a>
        </motion.div>
      </div>
    );
  }

  // ── CTA slide ────────────────────────────────────────────────────────────
  if (type === 'cta') {
    return (
      <>
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="flex items-center gap-3 mb-7"
        >
          <span className="block w-10 h-px bg-gold-500/80" />
          <span className="label-eyebrow">ClaudyGod Music Ministries</span>
        </motion.div>

        <div className="overflow-hidden mb-1">
          <motion.h1
            custom={0.1} variants={reveal} initial="hidden" animate="visible"
            className="font-abril text-white text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.0] tracking-tight"
          >
            Worship.
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-1">
          <motion.p
            custom={0.22} variants={reveal} initial="hidden" animate="visible"
            className="font-abril text-gold-300/95 text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.0] tracking-tight"
          >
            Music.
          </motion.p>
        </div>
        <div className="overflow-hidden mb-7">
          <motion.p
            custom={0.34} variants={reveal} initial="hidden" animate="visible"
            className="font-abril text-purple-300/90 text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.0] tracking-tight"
          >
            Ministry.
          </motion.p>
        </div>

        <motion.p
          custom={0.52} variants={fadeUp} initial="hidden" animate="visible"
          className="font-raleway text-neutral-300 text-sm md:text-base leading-relaxed max-w-md mb-8"
        >
          Spirit-filled gospel music from Minister ClaudyGod — spreading the love of God through worship and song.
        </motion.p>

        <motion.div
          custom={0.65} variants={fadeUp} initial="hidden" animate="visible"
          className="flex items-center flex-wrap gap-4"
        >
          <Link
            href="/bookings"
            className="font-worksans text-[0.65rem] tracking-[0.2em] uppercase text-white bg-purple-600 hover:bg-purple-500 px-8 h-12 inline-flex items-center rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(109,40,217,0.5)] hover:shadow-[0_6px_28px_rgba(109,40,217,0.6)]"
          >
            Book Now
          </Link>
          <Link
            href="/music"
            className="font-worksans text-[0.65rem] tracking-[0.2em] uppercase text-white/80 hover:text-white border border-white/25 hover:border-white/60 px-8 h-12 inline-flex items-center rounded-xl transition-all duration-300 backdrop-blur-sm gap-2 group"
          >
            Listen Now
            <span className="text-gold-400 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </>
    );
  }

  // ── Music / streaming slide ──────────────────────────────────────────────
  if (type === 'music' && content?.streamingPlatforms) {
    return (
      <>
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="flex items-center gap-3 mb-6"
        >
          <span className="block w-10 h-px bg-gold-500/80" />
          <span className="label-eyebrow">Now Streaming</span>
        </motion.div>

        {content.listenText && (
          <div className="overflow-hidden mb-8">
            <motion.h2
              custom={0.1} variants={reveal} initial="hidden" animate="visible"
              className="font-abril text-white text-4xl md:text-5xl lg:text-[3.8rem] leading-[1.1] tracking-tight"
            >
              {content.listenText}
            </motion.h2>
          </div>
        )}

        <motion.div
          custom={0.35} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap gap-2.5"
        >
          {content.streamingPlatforms.map((platform) => {
            const Icon = iconMap[platform.iconName] ?? FaMusic;
            return (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 h-10 border border-white/20 hover:border-gold-500/60 bg-black/20 hover:bg-black/30 text-white/75 hover:text-white font-worksans text-[0.58rem] tracking-[0.15em] uppercase transition-all duration-300 backdrop-blur-sm rounded-xl"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {platform.name}
              </a>
            );
          })}
        </motion.div>
      </>
    );
  }

  return null;
}
