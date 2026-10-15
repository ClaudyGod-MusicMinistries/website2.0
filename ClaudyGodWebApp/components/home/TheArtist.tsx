'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ParallaxLayer } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

const stats = [
  { value: '7', label: 'Studio Albums' },
  { value: '8+', label: 'Years in Ministry' },
  { value: '2018', label: 'Debut Release' },
  { value: '4', label: 'Music Genres' },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const statItem = {
  hidden: { opacity: 0, scale: 0.92, y: 14 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function TheArtist() {
  return (
    <section className="relative bg-white section-py overflow-hidden border-t border-neutral-200/70">
      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1fr] gap-12 sm:gap-16 lg:gap-20 items-center">
          {/* Portrait with defined architectural outlook — clean, unpadded, professional */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 lg:order-1"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card-light-lg border border-neutral-200/90 bg-neutral-100 group">
              <ParallaxLayer distance={20} className="absolute inset-0">
                <Image
                  src="/mum1.jpg"
                  alt="Minister ClaudyGod"
                  fill
                  priority
                  className="object-cover object-[center_top] transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </ParallaxLayer>
            </div>
          </motion.div>

          {/* Copy + Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="order-2 lg:order-2 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3.5 mb-4 sm:mb-5">
              <span className="h-px w-8 bg-gold-500" />
              <span className="label-eyebrow text-gold-700 font-semibold">The Artist</span>
            </div>

            <h2 className="font-raleway font-light text-neutral-900 text-3xl sm:text-4xl md:text-5xl tracking-normal leading-[1.18] mb-5 sm:mb-6">
              Minister <span className="font-normal text-purple-900">ClaudyGod</span>
            </h2>

            <p className="font-sans text-neutral-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              A gospel artist of Nigerian and Sierra Leonean heritage, called to ministry in 2003.
              What began as a season of prayer and fasting for the New Year became her debut album,{' '}
              <em className="not-italic font-semibold text-neutral-900">
                &ldquo;Lord of My Heart,&rdquo;
              </em>{' '}
              in 2018 — the first of seven records carrying a single message: God&rsquo;s love for a
              searching world.
            </p>

            {/* Interactive Stat Cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6 sm:my-8"
            >
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  variants={statItem}
                  className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 hover:border-gold-400 shadow-2xs hover:shadow-card-light-hover transition-all duration-300"
                >
                  <p className="font-display font-bold text-purple-900 text-2xl sm:text-3xl tracking-tight">
                    {s.value}
                  </p>
                  <p className="font-sans text-neutral-600 text-[0.72rem] sm:text-xs mt-1 leading-snug font-medium">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* High-end Encapsulated Button — Never spans full width on mobile */}
            <div className="pt-2">
              <Button
                href="/about"
                variant="dark"
                size="lg"
                uppercase
                rightIcon={
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                }
              >
                Read the Full Story
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
