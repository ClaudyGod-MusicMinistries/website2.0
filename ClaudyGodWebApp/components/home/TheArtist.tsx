'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ParallaxLayer } from '@/components/ui';

const stats = [
  { value: '7', label: 'Studio Albums' },
  { value: '20+', label: 'Years in Ministry' },
  { value: '2018', label: 'Debut Release' },
  { value: '4', label: 'Music Genres Spanned' },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Real credibility (album count, years, a concrete bio) instead of the
 * generic "Spirit-Led Worship / Global Outreach" virtue-pillar copy this
 * replaced — every reference site (Sinach, CeCe Winans, Dunsin Oyekan)
 * establishes the artist with specific proof, not abstractions.
 */
export function TheArtist() {
  return (
    <section className="bg-white section-py">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-10 sm:gap-14 lg:gap-20 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-card-light-lg order-2 lg:order-1"
          >
            <ParallaxLayer distance={30} className="absolute inset-0">
              <Image
                src="/mum1.jpg"
                alt="Minister ClaudyGod"
                fill
                className="object-cover"
                style={{ objectPosition: 'center top' }}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </ParallaxLayer>
          </motion.div>

          {/* Copy + stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="rule-gold" />
              <span className="label-eyebrow">The Artist</span>
            </div>

            <h2 className="font-display font-bold text-neutral-900 text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight mb-6">
              Minister ClaudyGod
            </h2>

            <p className="font-sans text-neutral-600 text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
              A California-based gospel artist of Nigerian and Sierra Leonean heritage, called to
              ministry in 2003. What began as a season of prayer and fasting for the New Year became
              her debut album,{' '}
              <em className="not-italic font-semibold text-neutral-800">
                &ldquo;Lord of My Heart,&rdquo;
              </em>{' '}
              in 2018 — the first of seven records carrying a single message: God&rsquo;s love for a
              searching world.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 py-8 my-2 border-y border-neutral-200">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display font-bold text-neutral-900 text-3xl sm:text-4xl tracking-tight">
                    {s.value}
                  </p>
                  <p className="font-sans text-neutral-500 text-xs mt-1 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 font-sans text-xs tracking-[0.18em] uppercase text-neutral-900 hover:text-purple-700 transition-colors duration-300 group mt-4"
            >
              Read the Full Story
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
