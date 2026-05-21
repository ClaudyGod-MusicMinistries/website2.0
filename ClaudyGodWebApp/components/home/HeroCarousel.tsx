'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSpotify, FaApple, FaYoutube, FaDeezer, FaAmazon, FaMusic,
} from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { heroSlides } from '@/data/heroSlides';
import { cn } from '@/utils/cn';

const DURATION = 7000; // ms per slide

const iconMap: Record<string, IconType> = {
  FaSpotify, FaApple, FaYoutube, FaDeezer, FaAmazon, FaMusic,
};

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } },
  exit:   { opacity: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const textVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function HeroCarousel() {
  const [current, setCurrent]   = useState(0);
  const [paused, setPaused]     = useState(false);
  const [progress, setProgress] = useState(0);
  const startRef  = useRef<number>(Date.now());
  const rafRef    = useRef<number>(0);

  const total = heroSlides.length;

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
    startRef.current = Date.now();
    setProgress(0);
  }, [total]);

  // Progress bar animation
  useEffect(() => {
    if (paused) { cancelAnimationFrame(rafRef.current); return; }
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(elapsed / DURATION, 1);
      setProgress(pct);
      if (pct < 1) { rafRef.current = requestAnimationFrame(tick); }
      else { advance(); }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, current, advance]);

  const goTo = (i: number) => {
    setCurrent(i);
    startRef.current = Date.now();
    setProgress(0);
  };

  const slide = heroSlides[current];

  return (
    <section
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#080808]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background image crossfade ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${slide.id}`}
          variants={fadeVariants}
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
              priority={current === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          )}
          <div className="image-overlay absolute inset-0" />
        </motion.div>
      </AnimatePresence>

      {/* ── Slide content — bottom-left editorial ── */}
      <div className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <AnimatePresence mode="wait">
            <motion.div key={`content-${slide.id}`} className="max-w-2xl">
              <SlideContent slide={slide} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Progress indicators ── */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center gap-3">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="relative h-px flex-1 max-w-[60px] bg-white/15 overflow-hidden"
            >
              {i === current && (
                <motion.span
                  className="absolute inset-y-0 left-0 bg-gold-400"
                  style={{ width: `${progress * 100}%` }}
                />
              )}
              {i < current && (
                <span className="absolute inset-0 bg-white/40" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Slide counter ── */}
      <div className="absolute bottom-8 right-6 lg:right-12 hidden md:flex items-center gap-2">
        <span className="font-worksans text-[0.58rem] tracking-[0.2em] text-gold-400">
          {String(current + 1).padStart(2, '0')}
        </span>
        <span className="w-6 h-px bg-white/20" />
        <span className="font-worksans text-[0.58rem] tracking-[0.2em] text-neutral-600">
          {String(total).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}

// ─── Slide content renderers ──────────────────────────────────────────────────

function SlideContent({ slide }: { slide: (typeof heroSlides)[number] }) {
  const { type, content } = slide;

  if (type === 'quote' && content?.quote) {
    return (
      <>
        <motion.span
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="label-eyebrow block mb-4"
        >
          Scripture
        </motion.span>
        <motion.blockquote
          custom={0.15}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-raleway font-light text-white text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide max-w-xl text-balance"
        >
          &ldquo;{content.quote}&rdquo;
        </motion.blockquote>
        {content.reference && (
          <motion.p
            custom={0.35}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 font-worksans text-[0.6rem] tracking-[0.2em] uppercase text-gold-400/70"
          >
            {content.reference}
          </motion.p>
        )}
      </>
    );
  }

  if (type === 'cta') {
    return (
      <>
        <motion.span
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="label-eyebrow block mb-5"
        >
          ClaudyGod Music Ministries
        </motion.span>
        <motion.h1
          custom={0.15}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-raleway font-extralight text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
        >
          Worship.<br />
          <span className="italic text-gold-300/80">Music.</span>{' '}
          Ministry.
        </motion.h1>
        <motion.div
          custom={0.4}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 flex items-center gap-6"
        >
          <Link
            href="/bookings"
            className="font-worksans text-[0.65rem] tracking-[0.2em] uppercase text-[#080808] bg-gold-500 hover:bg-gold-400 px-7 h-10 inline-flex items-center transition-all duration-300"
          >
            Book Now
          </Link>
          <Link
            href="/music"
            className="font-worksans text-[0.65rem] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300 border-b border-white/20 hover:border-white/60 pb-px"
          >
            Listen Now →
          </Link>
        </motion.div>
      </>
    );
  }

  if (type === 'music' && content?.streamingPlatforms) {
    return (
      <>
        <motion.span
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="label-eyebrow block mb-4"
        >
          Now Streaming
        </motion.span>
        {content.listenText && (
          <motion.h2
            custom={0.15}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="font-raleway font-light text-white text-3xl md:text-4xl leading-snug tracking-wide mb-7"
          >
            {content.listenText}
          </motion.h2>
        )}
        <motion.div
          custom={0.3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3"
        >
          {content.streamingPlatforms.map((platform) => {
            const Icon = iconMap[platform.iconName] ?? FaMusic;
            return (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 h-9 border border-white/15 hover:border-gold-500/50 text-white/70 hover:text-white font-worksans text-[0.6rem] tracking-[0.15em] uppercase transition-all duration-300 backdrop-blur-sm"
              >
                <Icon className="h-3 w-3" />
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
