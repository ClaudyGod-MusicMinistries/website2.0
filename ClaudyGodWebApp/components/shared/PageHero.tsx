'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { AmbientGlow } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  backgroundImage?: string;
  /**
   * CSS object-position. Defaults to 'center top' (safe for portrait images).
   * Pass 'center center' for landscape images.
   */
  objectPosition?: string;
  className?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

/**
 * The compact counterpart to the homepage Hero — same type scale (Raleway
 * Light), same gold accent language, same entrance motion — just shorter,
 * since every inner page needs its content visible without a full viewport
 * banner. Keep eyebrow/title/subtitle short: this is a banner, not a place
 * for paragraph copy.
 */
export function PageHero({
  title,
  subtitle,
  eyebrow,
  backgroundImage,
  objectPosition = 'center top',
  className,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        'relative w-full min-h-[48vh] sm:min-h-[55vh] md:min-h-[62vh] lg:min-h-[68vh] flex items-end pb-10 sm:pb-14 md:pb-20 lg:pb-24 pt-[var(--navbar-height)] overflow-hidden',
        className
      )}
    >
      {/* Background */}
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover"
            style={{ objectPosition }}
            sizes="100vw"
          />
          {/* Strong bottom fade for text legibility over any image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/92" />
          {/* Left gradient — text always readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
          {/* Purple brand tint */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/35 via-transparent to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-surface-deep overflow-hidden pointer-events-none">
          <AmbientGlow
            color="purple"
            size={600}
            opacity={0.18}
            animate={false}
            className="-bottom-[220px] -left-[160px]"
          />
          <AmbientGlow
            color="gold"
            size={380}
            opacity={0.07}
            animate={false}
            className="-top-[140px] -right-[120px]"
          />
        </div>
      )}

      {/* Gold bottom line — the seam into the page content below */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full container-site">
        {eyebrow && (
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 mb-3 sm:mb-5"
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: '2.5rem' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-gold-500/80"
            />
            <span className="label-eyebrow text-gold-400">{eyebrow}</span>
          </motion.div>
        )}
        <motion.h1
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-raleway font-light text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl tracking-normal leading-[1.15] max-w-3xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-3 sm:mt-5 font-sans text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl line-clamp-2"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
