'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { buttonVariants } from '@/lib/theme/buttons';
import { Section, AmbientGlow, Particles } from '@/components/ui';
import { heroContent, heroCTAs } from '@/data/hero';
import { cn } from '@/lib/utils/cn';

const reveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0, letterSpacing: '0.06em' },
  visible: (d = 0) => ({
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    letterSpacing: '0em',
    transition: { duration: 1.1, delay: d, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

/**
 * One statement, not a five-slide carousel. Every gospel-artist reference
 * site studied for this rebuild (Sinach, Dunsin Oyekan, CeCe Winans) leads
 * with a single hero message and puts direct action right there — not a
 * rotating set of competing messages that dilute the first three seconds.
 *
 * The photo layer is true full-bleed (no max-width cap) — Next/Image's
 * `sizes="100vw"` requests a source large enough for the viewport at every
 * breakpoint, so there's no upscaling artifact to guard against even on
 * ultra-wide/4K screens.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <Section
      as="section"
      ref={sectionRef}
      bg="base"
      py="none"
      className="relative w-full min-h-[100dvh] lg:min-h-[100vh] xl:min-h-[110vh] overflow-hidden"
    >
      {/* Animated gradient-mesh canvas — the base layer, visible at the
          edges beyond the capped photo on ultra-wide screens. */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-base via-purple-900 to-surface-base" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AmbientGlow
          color="purple"
          size={900}
          opacity={0.18}
          duration={20}
          className="-bottom-52 -left-40"
        />
        <AmbientGlow
          color="gold"
          size={650}
          opacity={0.1}
          duration={24}
          delay={3}
          className="-top-40 -right-32"
        />
      </div>

      {/* Fine grid texture — subtle graphical depth, matches the Loader's treatment */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Full-bleed photo layer — edge to edge at every breakpoint.
          Scroll-linked parallax (drift + slow scale) instead of a fixed
          timed animation, so the motion reads as depth rather than a loop. */}
      <div className="absolute inset-0">
        <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
          <Image
            src={heroContent.backgroundImage}
            alt=""
            fill
            priority
            className="object-cover object-[center_18%]"
            sizes="100vw"
          />
        </motion.div>

        {/* Legibility gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        {/* Floating gold particles rising through the frame */}
        <Particles color="gold" glyph="✦" count={8} direction="rise" />
      </div>

      {/* Content — a frosted glass panel at every breakpoint, not just mobile.
          The photo's subject sits in the lower portion of the frame, so text
          printed directly on raw pixels there read as covering her face;
          blurring the backdrop behind the copy softens that into "text on
          glass over the photo" instead. */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end lg:pb-24 xl:pb-28">
        <div className="w-full bg-black/35 backdrop-blur-md border-t border-white/15 pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-10 lg:pb-14 shadow-popup">
          <div className="container-site w-full">
            <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center sm:text-left mx-auto sm:mx-0">
              <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3 mb-5 lg:mb-7 justify-center sm:justify-start"
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '2.5rem' }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden sm:block h-px bg-gold-500/80"
                />
                <span className="label-eyebrow lg:text-sm text-gold-400">
                  {heroContent.eyebrow}
                </span>
              </motion.div>

              <div className="overflow-hidden mb-4 lg:mb-6">
                <motion.h1
                  custom={0.12}
                  variants={reveal}
                  initial="hidden"
                  animate="visible"
                  className="font-raleway font-light text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-[1.2] tracking-normal"
                >
                  {heroContent.headingLine1}
                  <span className="block text-gold-300">{heroContent.headingLine2}</span>
                </motion.h1>
              </div>

              <motion.p
                custom={0.4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-sans text-neutral-300 text-base md:text-lg lg:text-lg leading-relaxed max-w-lg lg:max-w-xl mb-9 lg:mb-11 mx-auto sm:mx-0"
              >
                {heroContent.subtitle}
              </motion.p>

              <motion.div
                custom={0.6}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex items-center flex-wrap gap-3 justify-center sm:justify-start"
              >
                {heroCTAs.map((cta) => {
                  const Icon = cta.icon;
                  return (
                    <motion.div
                      key={cta.href}
                      whileHover={{ scale: 1.035 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="relative inline-flex"
                    >
                      {cta.variant === 'primary' && (
                        <motion.span
                          aria-hidden="true"
                          animate={{ opacity: [0.45, 0.85, 0.45] }}
                          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute inset-0 rounded-lg bg-gold-500/40 blur-md -z-10"
                        />
                      )}
                      <Link
                        href={cta.href}
                        className={cn(
                          buttonVariants({ variant: cta.variant, size: 'lg', uppercase: true }),
                          'group',
                          cta.variant === 'primary' && 'shadow-gold-cta hover:shadow-gold-cta-hover'
                        )}
                      >
                        {Icon && (
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-surface-base/90 group-hover:bg-surface-base shrink-0 transition-colors duration-200">
                            <Icon className="h-2.5 w-2.5 text-gold-400 fill-current" />
                          </span>
                        )}
                        {cta.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden sm:flex absolute z-10 bottom-6 right-6 sm:right-10 flex-col items-center gap-2 text-white/50"
      >
        <span className="font-sans text-[0.55rem] tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </motion.div>
    </Section>
  );
}
