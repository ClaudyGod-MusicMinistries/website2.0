'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, CalendarDays, ChevronDown } from 'lucide-react';
import { buttonVariants } from '@/lib/theme/buttons';
import { cn } from '@/utils/cn';

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
 */
export function Hero() {
  return (
    <section className="relative w-full min-h-[100dvh] min-h-screen overflow-hidden bg-surface-base">
      {/* Background portrait — Ken Burns zoom, once */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 14, ease: 'linear' }}
      >
        <Image
          src="/ClaudySocial.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 20%' }}
          sizes="100vw"
        />
      </motion.div>

      {/* Legibility gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 -left-24 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(97, 73, 145,0.12)_0%,transparent_70%)]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute -top-20 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(181, 101, 29,0.07)_0%,transparent_70%)]"
        />
      </div>

      {/* Content — below lg (mobile + tablet) the copy is pushed up off the
          bottom edge and sits inside a blurred glass box instead of
          directly on the image; desktop (lg+) reverts to the original
          bottom-anchored, borderless layout. */}
      <div className="absolute inset-0 flex flex-col justify-center pb-0 lg:justify-end lg:pb-32">
        <div className="container-site w-full">
          <div className="max-w-2xl text-center sm:text-left mx-auto sm:mx-0 bg-white/[0.07] backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-popup lg:bg-transparent lg:backdrop-blur-none lg:border-none lg:rounded-none lg:p-0 lg:shadow-none">
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="flex items-center gap-3 mb-6 justify-center sm:justify-start"
            >
              <span className="hidden sm:block w-10 h-px bg-gold-500/80" />
              <span className="label-eyebrow">ClaudyGod Music Ministries</span>
            </motion.div>

            <div className="overflow-hidden mb-3">
              <motion.h1
                custom={0.12} variants={reveal} initial="hidden" animate="visible"
                className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight"
              >
                Spirit-Filled Worship,
                <span className="block text-gold-300">Sent to the Nations.</span>
              </motion.h1>
            </div>

            <motion.p
              custom={0.4} variants={fadeUp} initial="hidden" animate="visible"
              className="font-sans text-neutral-300 text-base md:text-lg leading-relaxed max-w-lg mb-9 mx-auto sm:mx-0"
            >
              Gospel music, ministry, and worship from Minister ClaudyGod — seven albums,
              two decades of ministry, one calling.
            </motion.p>

            <motion.div
              custom={0.6} variants={fadeUp} initial="hidden" animate="visible"
              className="flex items-center flex-wrap gap-3 justify-center sm:justify-start"
            >
              <Link
                href="/music"
                className={cn(buttonVariants({ variant: 'primary', size: 'lg', uppercase: true }), 'shadow-gold-cta hover:shadow-gold-cta-hover')}
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Listen Now
              </Link>
              <Link
                href="/videos"
                className={buttonVariants({ variant: 'outline-white', size: 'lg', uppercase: true })}
              >
                Watch
              </Link>
              <Link
                href="/events"
                className={cn(buttonVariants({ variant: 'link', uppercase: true }), 'text-white/80 hover:text-white gap-2.5 group')}
              >
                <CalendarDays className="h-3.5 w-3.5" />
                See Tour Dates
                <span className="text-gold-400 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden sm:flex absolute bottom-6 right-6 sm:right-10 flex-col items-center gap-2 text-white/50"
      >
        <span className="font-sans text-[0.55rem] tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
