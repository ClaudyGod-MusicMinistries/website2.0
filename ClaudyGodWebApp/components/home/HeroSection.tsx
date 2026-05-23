'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const fn = () => setShowScroll(window.scrollY < 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-end overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/mainBanner.webm" type="video/webm" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080808]/30 to-[#080808]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 md:pb-32">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="block w-8 h-px bg-gold-500 opacity-70" />
          <span className="font-worksans text-[0.58rem] tracking-[0.28em] uppercase text-gold-400/80">
            ClaudyGod Music Ministries
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-bricolage font-extrabold text-white text-5xl md:text-6xl tracking-tight leading-[1.04] max-w-2xl"
        >
          Worship.{' '}
          <em className="not-italic text-gold-400">Music.</em>{' '}
          Ministry.
        </motion.h1>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center gap-5 mt-10"
        >
          <Link
            href="/bookings"
            className="h-12 px-8 bg-purple-600 hover:bg-purple-500 text-white font-worksans text-[0.6rem] tracking-[0.22em] uppercase transition-all duration-300 inline-flex items-center"
          >
            Book Now
          </Link>
          <Link
            href="/music"
            className="h-12 px-8 border border-white/20 hover:border-white/50 text-white/80 hover:text-white font-worksans text-[0.6rem] tracking-[0.22em] uppercase transition-all duration-300 inline-flex items-center gap-2"
          >
            Listen Now
            <span className="text-gold-400">→</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            key="scroll-cue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            aria-label="Scroll down"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/40 hover:text-purple-400 transition-colors duration-300"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
