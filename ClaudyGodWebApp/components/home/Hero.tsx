'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { buttonVariants } from '@/lib/theme/buttons';
import { Section, AmbientGlow, Particles } from '@/components/ui';
import { heroContent, heroCTAs } from '@/data/hero';
import { cn } from '@/lib/utils/cn';

const reveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: (d = 0) => ({
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 1.0, delay: d, ease: [0.16, 1, 0.3, 1] },
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
 * The photo layer is capped at max-w-[1700px] rather than stretched true
 * full-bleed: past that width (ultra-wide/4K viewports) the source photo
 * would be upscaled beyond its native resolution and read as soft/blurry.
 * The animated gradient-mesh canvas behind it fills the remaining edges,
 * so the cap reads as an intentional "framed portrait" instead of a seam.
 * Below 1700px — i.e. every phone, tablet, and normal desktop — this is
 * visually identical to a true full-bleed background.
 */
export function Hero() {
  return (
    <Section
      as="section"
      bg="base"
      py="none"
      className="relative w-full min-h-[130dvh] sm:min-h-[120dvh] lg:min-h-screen overflow-hidden"
    >
      {/* Animated gradient-mesh canvas — the base layer, visible at the
          edges beyond the capped photo on ultra-wide screens. */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-base via-purple-900 to-surface-base" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AmbientGlow color="purple" size={900} opacity={0.18} duration={20} className="-bottom-52 -left-40" />
        <AmbientGlow color="gold" size={650} opacity={0.10} duration={24} delay={3} className="-top-40 -right-32" />
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

      {/* Capped-width photo layer */}
      <div className="absolute inset-0 flex justify-center">
        <div className="relative h-full w-full max-w-[1700px]">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: 14, ease: 'linear' }}
          >
            <Image
              src={heroContent.backgroundImage}
              alt=""
              fill
              priority
              className="object-cover object-[center_18%] sm:object-[center_14%] md:object-[center_10%] lg:object-center"
              sizes="(min-width: 1700px) 1700px, 100vw"
            />
          </motion.div>

          {/* Legibility gradients — scoped to the photo box */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

          {/* Floating gold particles rising through the frame */}
          <Particles color="gold" glyph="✦" count={8} direction="rise" />
        </div>
      </div>

      {/* Content — below lg (mobile + tablet) the copy sits inside a
          blurred glass box instead of directly on the image; desktop
          (lg+) reverts to the original bottom-anchored, borderless layout. */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-40 sm:pb-40 lg:pb-32">
        <div className="container-site w-full">
          <div className="max-w-2xl text-center sm:text-left mx-auto sm:mx-0 bg-black/25 backdrop-blur-sm border border-white/15 rounded-xl p-6 sm:p-8 shadow-popup lg:bg-transparent lg:backdrop-blur-none lg:border-none lg:rounded-none lg:p-0 lg:shadow-none">
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="flex items-center gap-3 mb-6 justify-center sm:justify-start"
            >
              <span className="hidden sm:block w-10 h-px bg-gold-500/80" />
              <span className="label-eyebrow">{heroContent.eyebrow}</span>
            </motion.div>

            <div className="overflow-hidden mb-3">
              <motion.h1
                custom={0.12} variants={reveal} initial="hidden" animate="visible"
                className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight"
              >
                {heroContent.headingLine1}
                <span className="block text-gold-300">{heroContent.headingLine2}</span>
              </motion.h1>
            </div>

            <motion.p
              custom={0.4} variants={fadeUp} initial="hidden" animate="visible"
              className="font-sans text-neutral-300 text-base md:text-lg leading-relaxed max-w-lg mb-9 mx-auto sm:mx-0"
            >
              {heroContent.subtitle}
            </motion.p>

            <motion.div
              custom={0.6} variants={fadeUp} initial="hidden" animate="visible"
              className="flex items-center flex-wrap gap-3 justify-center sm:justify-start"
            >
              {heroCTAs.map((cta) => {
                const Icon = cta.icon;
                if (cta.variant === 'link') {
                  return (
                    <Link
                      key={cta.href}
                      href={cta.href}
                      className={cn(buttonVariants({ variant: 'link', uppercase: true }), 'text-white/80 hover:text-white gap-2.5 group')}
                    >
                      {Icon && <Icon className="h-3.5 w-3.5" />}
                      {cta.label}
                      <span className="text-gold-400 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  );
                }
                return (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className={cn(
                      buttonVariants({ variant: cta.variant, size: 'lg', uppercase: true }),
                      cta.variant === 'primary' && 'shadow-gold-cta hover:shadow-gold-cta-hover'
                    )}
                  >
                    {Icon && <Icon className="h-3.5 w-3.5 fill-current" />}
                    {cta.label}
                  </Link>
                );
              })}
            </motion.div>
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
