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
  center: { opacity: 1, transition: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] } },
  exit:   { opacity: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};

const textVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
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
              className="object-cover object-[50%_30%]"
              sizes="100vw"
            />
          )}
          {/* Rich cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/30 via-transparent to-[#080808]/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-[#080808]/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Slide content — bottom-left editorial */}
      <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <AnimatePresence mode="wait">
            <motion.div key={`content-${slide.id}`} className="max-w-2xl">
              <SlideContent slide={slide} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot indicators — replaces progress bars */}
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
          custom={0} variants={textVariants} initial="hidden" animate="visible"
          className="label-eyebrow block mb-5"
        >
          Scripture
        </motion.span>
        <motion.blockquote
          custom={0.15} variants={textVariants} initial="hidden" animate="visible"
          className="font-raleway font-normal text-white text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide max-w-xl"
        >
          &ldquo;{content.quote}&rdquo;
        </motion.blockquote>
        {content.reference && (
          <motion.p
            custom={0.35} variants={textVariants} initial="hidden" animate="visible"
            className="mt-5 font-worksans text-[0.6rem] tracking-[0.2em] uppercase text-gold-400/70"
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
          custom={0} variants={textVariants} initial="hidden" animate="visible"
          className="flex items-center gap-3 mb-6"
        >
          <span className="block w-8 h-px bg-gold-500 opacity-70" />
          <span className="label-eyebrow">ClaudyGod Music Ministries</span>
        </motion.div>
        <motion.h1
          custom={0.15} variants={textVariants} initial="hidden" animate="visible"
          className="font-raleway font-medium text-white text-5xl md:text-6xl lg:text-[4rem] leading-[1.04] tracking-tight"
        >
          Worship.<br />
          <em className="not-italic text-gold-300/90">Music.</em>{' '}
          Ministry.
        </motion.h1>
        <motion.p
          custom={0.3} variants={textVariants} initial="hidden" animate="visible"
          className="mt-5 font-raleway text-neutral-400 text-sm md:text-base leading-relaxed max-w-md font-light"
        >
          Spirit-filled gospel music from Minister ClaudyGod — spreading the love of God through worship and song.
        </motion.p>
        <motion.div
          custom={0.45} variants={textVariants} initial="hidden" animate="visible"
          className="mt-8 flex items-center gap-5"
        >
          <Link
            href="/bookings"
            className="font-worksans text-[0.62rem] tracking-[0.22em] uppercase text-white bg-purple-600 hover:bg-purple-500 px-8 h-11 inline-flex items-center transition-all duration-300"
          >
            Book Now
          </Link>
          <Link
            href="/music"
            className="font-worksans text-[0.62rem] tracking-[0.22em] uppercase text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
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
          custom={0} variants={textVariants} initial="hidden" animate="visible"
          className="flex items-center gap-3 mb-5"
        >
          <span className="block w-8 h-px bg-gold-500 opacity-70" />
          <span className="label-eyebrow">Now Streaming</span>
        </motion.div>
        {content.listenText && (
          <motion.h2
            custom={0.15} variants={textVariants} initial="hidden" animate="visible"
            className="font-raleway font-normal text-white text-3xl md:text-4xl leading-snug tracking-wide mb-7"
          >
            {content.listenText}
          </motion.h2>
        )}
        <motion.div
          custom={0.3} variants={textVariants} initial="hidden" animate="visible"
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
                className="inline-flex items-center gap-2 px-4 h-9 border border-white/15 hover:border-gold-500/50 text-white/70 hover:text-white font-worksans text-[0.58rem] tracking-[0.15em] uppercase transition-all duration-300 backdrop-blur-sm"
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
