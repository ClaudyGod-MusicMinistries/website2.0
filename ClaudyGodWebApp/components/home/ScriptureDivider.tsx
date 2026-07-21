'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * A slim tonal breather between Videos and Store — not a content section.
 * Replaces MissionBand, whose four generic virtue pillars ("Spirit-Led
 * Worship", "Global Outreach"...) duplicated the abstraction TheArtist.tsx
 * deliberately moved away from in favor of concrete bio/stats. Only the
 * scripture beat was worth keeping.
 */
export function ScriptureDivider() {
  return (
    <section className="bg-cream-100 border-t border-b border-black/[0.06] py-14 sm:py-20">
      <div className="container-site">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="block w-8 h-px bg-gold-500 opacity-60 mx-auto mb-6 sm:mb-8" />
          <blockquote className="font-sans text-neutral-700 text-xl sm:text-2xl md:text-3xl leading-[1.6] tracking-tight">
            &ldquo;Let everything that has breath praise the Lord.&rdquo;
          </blockquote>
          <p className="mt-5 font-sans text-[0.68rem] tracking-[0.28em] uppercase text-gold-500">
            Psalm 150 : 6
          </p>
        </motion.div>
      </div>
    </section>
  );
}
