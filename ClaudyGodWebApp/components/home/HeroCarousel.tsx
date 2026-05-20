'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  FaSpotify, FaApple, FaYoutube, FaDeezer, FaAmazon, FaMusic,
} from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { heroSlides, textVariants } from '@/data/heroSlides';
import { heroSlide } from '@/utils/animations';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/utils/cn';

const iconMap: Record<string, IconType> = {
  FaSpotify, FaApple, FaYoutube, FaDeezer, FaAmazon, FaMusic,
};

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const total = heroSlides.length;

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent((index + total) % total);
    },
    [total]
  );

  const prev = () => goTo(current - 1, -1);
  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = heroSlides[current];

  return (
    <div
      className="relative w-full min-h-hero overflow-hidden bg-surface-base"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={heroSlide}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Background image */}
          {(slide.imageUrl || slide.imageUrlDesktop) && (
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

          {/* Slide content */}
          <div className="relative z-10 flex items-center min-h-hero">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-[var(--navbar-height)]">
              <SlideContent type={slide.type} content={slide.content} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next */}
      <IconButton
        label="Previous slide"
        variant="ghost"
        size="md"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white border-white/20"
      >
        <ChevronLeft className="h-5 w-5" />
      </IconButton>
      <IconButton
        label="Next slide"
        variant="ghost"
        size="md"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white border-white/20"
      >
        <ChevronRight className="h-5 w-5" />
      </IconButton>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={cn(
              'rounded-full transition-all duration-300',
              i === current
                ? 'w-6 h-2 bg-gold-500'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Slide content by type ────────────────────────────────────────────────────

function SlideContent({
  type,
  content,
}: {
  type: string;
  content?: {
    quote?: string;
    reference?: string;
    listenText?: string;
    streamingPlatforms?: { name: string; iconName: string; url: string }[];
  };
}) {
  if (type === 'quote' && content?.quote) {
    return (
      <div className="max-w-3xl">
        <motion.blockquote
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-abril text-white text-2xl md:text-4xl lg:text-5xl leading-snug text-balance"
        >
          &ldquo;{content.quote}&rdquo;
        </motion.blockquote>
        {content.reference && (
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 font-worksans uppercase tracking-widest text-gold-400 text-sm"
          >
            {content.reference}
          </motion.p>
        )}
      </div>
    );
  }

  if (type === 'cta') {
    return (
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-start gap-4"
      >
        <p className="font-worksans uppercase tracking-widest text-gold-400 text-sm">
          ClaudyGod Music Ministries
        </p>
        <h1 className="font-abril text-white text-4xl md:text-6xl lg:text-7xl leading-none">
          Worship. <br />
          <span className="text-gradient-gold">Music.</span> Ministry.
        </h1>
        <div className="flex flex-wrap gap-3 mt-2">
          <Link
            href="/bookings"
            className={cn(buttonVariants({ variant: 'primary', size: 'lg', uppercase: true }))}
          >
            Book Now
          </Link>
          <Link
            href="/music"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg', uppercase: true }))}
          >
            Listen Now
          </Link>
        </div>
      </motion.div>
    );
  }

  if (type === 'music' && content?.streamingPlatforms) {
    return (
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-start gap-6"
      >
        {content.listenText && (
          <div>
            <p className="font-worksans uppercase tracking-widest text-gold-400 text-sm mb-2">
              Now Streaming
            </p>
            <h2 className="font-abril text-white text-3xl md:text-5xl leading-tight">
              {content.listenText}
            </h2>
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          {content.streamingPlatforms.map((platform) => {
            const Icon = iconMap[platform.iconName] ?? FaMusic;
            return (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bricolage font-medium transition-all duration-200 backdrop-blur-sm"
              >
                <Icon className="h-4 w-4" />
                {platform.name}
              </a>
            );
          })}
        </div>
      </motion.div>
    );
  }

  return null;
}
