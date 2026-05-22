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

const DURATION = 7000;

const iconMap: Record<string, IconType> = {
  FaSpotify, FaApple, FaYoutube, FaDeezer, FaAmazon, FaMusic,
};

const fadeVariants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: { duration: 1.6, ease: [0.25, 0.1, 0.25, 1] } },
  exit:   { opacity: 0, transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] } },
};

// Clip-path wipe reveal from bottom
const revealVariants = {
  hidden:  { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: (delay = 0) => ({
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Simple fade-up for smaller elements
const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
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
      const elapsed = Date.now() - startRef.current;
      if (elapsed >= DURATION) { advance(); }
      else { rafRef.current = requestAnimationFrame(tick); }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, current, advance]);

  const goTo = (i: number) => {
    setCurrent(i);
    startRef.current = Date.now();
  };

  const slide = heroSlides[current];

  return (
    <section
      className="relative w-full min-h-[100dvh] min-h-screen overflow-hidden bg-[#080808]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image crossfade */}
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
              className="object-cover object-center scale-[1.02]"
              sizes="100vw"
            />
          )}
          {/* Rich cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/50 via-[#080808]/10 to-[#080808]/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/85 via-[#080808]/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Ambient glow orbs — purely decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 -left-24 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(109,40,217,0.18)_0%,transparent_70%)]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute -top-20 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08)_0%,transparent_70%)]"
        />
      </div>

      {/* Slide content */}
      <div className="absolute inset-0 flex flex-col justify-center md:justify-end pt-20 pb-20 md:pt-0 md:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <AnimatePresence mode="wait">
            <motion.div key={`content-${slide.id}`} className="max-w-2xl">
              <SlideContent slide={slide} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-9 left-0 right-0 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="pointer-events-auto group p-1.5 -m-1.5"
            >
              <span
                className={cn(
                  'block rounded-full transition-all duration-500',
                  i === current
                    ? 'w-6 h-1.5 bg-gold-400'
                    : 'w-1.5 h-1.5 bg-white/25 group-hover:bg-white/50'
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SlideContent({ slide }: { slide: (typeof heroSlides)[number] }) {
  const { type, content } = slide;

  if (type === 'quote' && content?.quote) {
    return (
      <>
        <motion.span
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="label-eyebrow block mb-5"
        >
          Scripture
        </motion.span>

        {/* Clip-reveal blockquote using AbrilFatface */}
        <div className="overflow-hidden">
          <motion.blockquote
            custom={0.1} variants={revealVariants} initial="hidden" animate="visible"
            className="font-abril text-white text-2xl md:text-3xl lg:text-4xl leading-[1.3] tracking-wide max-w-xl"
          >
            &ldquo;{content.quote}&rdquo;
          </motion.blockquote>
        </div>

        {content.reference && (
          <motion.p
            custom={0.45} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-5 font-worksans text-[0.6rem] tracking-[0.22em] uppercase text-gold-400/70"
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
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="flex items-center gap-3 mb-7"
        >
          <span className="block w-10 h-px bg-gold-500/80" />
          <span className="label-eyebrow">ClaudyGod Music Ministries</span>
        </motion.div>

        {/* Main display headline — AbrilFatface for maximum impact */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            custom={0.1} variants={revealVariants} initial="hidden" animate="visible"
            className="font-abril text-white text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.0] tracking-tight"
          >
            Worship.
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-1">
          <motion.p
            custom={0.22} variants={revealVariants} initial="hidden" animate="visible"
            className="font-abril text-gold-300/95 text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.0] tracking-tight"
          >
            Music.
          </motion.p>
        </div>
        <div className="overflow-hidden mb-7">
          <motion.p
            custom={0.34} variants={revealVariants} initial="hidden" animate="visible"
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
            className="font-worksans text-[0.62rem] tracking-[0.22em] uppercase text-white bg-purple-600 hover:bg-purple-500 px-8 h-12 inline-flex items-center rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(109,40,217,0.5)] hover:shadow-[0_6px_28px_rgba(109,40,217,0.6)]"
          >
            Book Now
          </Link>
          <Link
            href="/music"
            className="font-worksans text-[0.62rem] tracking-[0.22em] uppercase text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-8 h-12 inline-flex items-center rounded-xl transition-all duration-300 backdrop-blur-sm gap-2 group"
          >
            Listen Now
            <span className="text-gold-400 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </>
    );
  }

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
              custom={0.1} variants={revealVariants} initial="hidden" animate="visible"
              className="font-abril text-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
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
                className="inline-flex items-center gap-2 px-5 h-10 border border-white/15 hover:border-gold-500/60 text-white/70 hover:text-white font-worksans text-[0.58rem] tracking-[0.15em] uppercase transition-all duration-300 backdrop-blur-sm rounded-xl"
              >
                <Icon className="h-3 w-3 shrink-0" />
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
