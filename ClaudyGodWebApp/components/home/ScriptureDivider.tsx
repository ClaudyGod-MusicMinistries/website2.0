'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function ScriptureDivider() {
  return (
    <section className="relative bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 border-t border-b border-purple-800/80 py-20 sm:py-28 overflow-hidden">
      {/* Structured atmospheric celestial sanctuary background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 opacity-25 mix-blend-screen">
          <Image src="/veryGlorious.jpg" alt="" fill className="object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/85 via-purple-900/60 to-purple-950/85" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-400/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="container-site relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <span className="w-12 h-px bg-gold-400/80" />
            <span className="w-2 h-2 rounded-full bg-gold-400 shadow-gold-sm" />
            <span className="w-12 h-px bg-gold-400/80" />
          </div>
          <blockquote className="font-raleway italic text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.4] tracking-normal font-light drop-shadow-sm">
            &ldquo;Let everything that has breath praise the Lord.&rdquo;
          </blockquote>
          <p className="mt-6 font-sans text-xs tracking-[0.24em] uppercase text-gold-300 font-semibold">
            Psalm 150 : 6
          </p>
        </motion.div>
      </div>
    </section>
  );
}
