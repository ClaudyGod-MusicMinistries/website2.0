'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Play, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section, AmbientGlow } from '@/components/ui';
import { heroContent } from '@/data/hero';

const reveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0, letterSpacing: '0.04em' },
  visible: (d = 0) => ({
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    letterSpacing: '0em',
    transition: { duration: 1.0, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <Section
      as="section"
      ref={sectionRef}
      bg="base"
      py="none"
      className="relative w-full min-h-[100dvh] overflow-hidden bg-purple-950 flex flex-col justify-end lg:justify-center"
    >
      {/* 1. Background Image Layer — Anchored right on desktop so Minister ClaudyGod has room to breathe */}
      <motion.div
        style={{ y: photoY }}
        className="absolute inset-y-0 right-0 w-full lg:w-[65%] xl:w-[60%] select-none pointer-events-none"
      >
        <Image
          src={heroContent.backgroundImage}
          alt="Minister ClaudyGod"
          fill
          priority
          quality={95}
          className="object-cover object-[center_top] sm:object-[center_12%] lg:object-[center_15%]"
          sizes="(min-width: 1024px) 65vw, 100vw"
        />

        {/* Desktop smooth inner edge fade: merges the left edge of the photo into the purple-950 canvas */}
        <div className="absolute inset-y-0 left-0 hidden lg:block w-48 xl:w-64 bg-gradient-to-r from-purple-950 via-purple-950/70 to-transparent pointer-events-none" />
      </motion.div>

      {/* 2. Linear Gradients — Scoped for text legibility and clean contrast */}
      {/* Top vignette for clean navbar readability */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-purple-950/80 to-transparent pointer-events-none" />

      {/* Mobile/Tablet Vertical Linear Gradient: Bottom-to-top contrast */}
      <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-purple-950 via-purple-950/90 via-purple-950/40 to-transparent pointer-events-none" />

      {/* Bottom transition seam into TheArtist white background */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* 3. Ambient Lighting Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <AmbientGlow
          color="gold"
          size={600}
          opacity={0.16}
          duration={20}
          className="-top-24 right-1/4 pointer-events-none"
        />
        <AmbientGlow
          color="purple"
          size={700}
          opacity={0.25}
          duration={24}
          delay={2}
          className="-bottom-32 -left-32 pointer-events-none"
        />
      </div>

      {/* 4. Main Hero Content */}
      <div className="relative z-10 container-site w-full pt-28 pb-14 sm:pb-16 lg:py-32">
        <div className="max-w-2xl text-left">
          {/* Live Soundwave Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-950/75 backdrop-blur-md border border-gold-400/50 shadow-xs mb-4 sm:mb-5 w-fit"
          >
            <div className="flex items-end gap-0.5 h-3.5 w-3.5 text-gold-400" aria-hidden="true">
              <motion.span
                animate={{ height: ['30%', '90%', '40%'] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                className="w-0.5 bg-current rounded-full"
              />
              <motion.span
                animate={{ height: ['90%', '30%', '80%'] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                className="w-0.5 bg-current rounded-full"
              />
              <motion.span
                animate={{ height: ['40%', '100%', '30%'] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-0.5 bg-current rounded-full"
              />
              <motion.span
                animate={{ height: ['70%', '40%', '90%'] }}
                transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut' }}
                className="w-0.5 bg-current rounded-full"
              />
            </div>
            <span className="font-sans text-[0.65rem] sm:text-[0.68rem] tracking-[0.14em] uppercase font-semibold text-gold-200">
              Latest Single &bull; Holy One of Israel
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 mb-3 sm:mb-4"
          >
            <span className="h-px w-8 bg-gold-400" />
            <span className="label-eyebrow text-gold-300 font-semibold tracking-[0.16em]">
              {heroContent.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-3.5 sm:mb-5">
            <motion.h1
              custom={0.1}
              variants={reveal}
              initial="hidden"
              animate="visible"
              className="font-raleway font-light text-white text-3xl sm:text-5xl lg:text-5.5xl leading-[1.12] tracking-tight drop-shadow-md"
            >
              {heroContent.headingLine1}
              <span className="block font-medium text-gold-300 mt-1 sm:mt-2">
                {heroContent.headingLine2}
              </span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            custom={0.25}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-sans text-purple-100/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-7 sm:mb-8 max-w-xl drop-shadow-sm"
          >
            {heroContent.subtitle}
          </motion.p>

          {/* Sleek Action Buttons — Tactile, never shrinked, never full-width on mobile */}
          <motion.div
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            <Button
              href="/music"
              variant="primary"
              size="lg"
              uppercase
              leftIcon={<Play className="h-4 w-4 fill-current" />}
            >
              Listen to Music
            </Button>

            <Button
              href="/bookings"
              variant="outline-white"
              size="lg"
              uppercase
              leftIcon={<CalendarDays className="h-4 w-4" />}
            >
              Book Minister
            </Button>
          </motion.div>

          {/* Credibility Micro-Strip */}
          <motion.div
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="pt-5 sm:pt-6 border-t border-purple-800/60 flex items-center gap-6 sm:gap-10 text-xs sm:text-sm text-purple-200/80 font-sans"
          >
            <div>
              <span className="font-display font-bold text-white text-base sm:text-xl block">
                7
              </span>
              Studio Albums
            </div>
            <div className="w-px h-8 bg-purple-800/60" />
            <div>
              <span className="font-display font-bold text-white text-base sm:text-xl block">
                8+
              </span>
              Years in Ministry
            </div>
            <div className="w-px h-8 bg-purple-800/60" />
            <div>
              <span className="font-display font-bold text-gold-300 text-base sm:text-xl block">
                Global
              </span>
              Worship Calling
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden sm:flex absolute z-10 bottom-4 right-6 sm:right-10 flex-col items-center gap-1.5 text-purple-300/70 pointer-events-none"
      >
        <span className="font-sans text-[0.55rem] tracking-[0.25em] uppercase font-medium">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </motion.div>
    </Section>
  );
}
