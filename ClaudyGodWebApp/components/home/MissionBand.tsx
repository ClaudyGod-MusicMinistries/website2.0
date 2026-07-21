'use client';

import Link from 'next/link';
import { Mic2, Globe2, Heart, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section, Container } from '@/components/ui';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const pillarVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const pillars = [
  {
    icon: Mic2,
    title: 'Spirit-Led Worship',
    body: 'Every song is born in prayer — crafted to usher believers into the presence of God.',
    accent: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  {
    icon: Globe2,
    title: 'Global Outreach',
    body: 'Through recordings, live events, and digital platforms the message reaches nations.',
    accent: 'text-gold-600',
    bg: 'bg-gold-50',
  },
  {
    icon: Heart,
    title: 'Community Impact',
    body: 'Ministering to the broken, the hopeful, and everyone in between — one life at a time.',
    accent: 'text-red-500',
    bg: 'bg-red-50/60',
  },
  {
    icon: BookOpen,
    title: 'Rooted in Scripture',
    body: 'Sound biblical teaching woven through music, sermons, and discipleship programmes.',
    accent: 'text-blue-500',
    bg: 'bg-blue-50/60',
  },
] as const;

export function MissionBand() {
  return (
    <Section bg="transparent" py="none" className="bg-cream-100 border-t border-b border-black/[0.06]">
      <Container className="py-12 sm:py-16 md:py-20">
        {/* Scripture */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center mb-12 sm:mb-16"
        >
          <span className="block w-8 h-px bg-gold-500 opacity-60 mx-auto mb-6 sm:mb-8" />
          <blockquote className="font-sans text-neutral-700 text-xl sm:text-2xl md:text-3xl leading-[1.6] tracking-tight">
            &ldquo;Let everything that has breath praise the Lord.&rdquo;
          </blockquote>
          <p className="mt-5 font-sans text-[0.68rem] tracking-[0.28em] uppercase text-gold-500">
            Psalm 150 : 6
          </p>
        </motion.div>

        {/* Pillars */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-black/[0.06] pt-10 sm:pt-12 border-t border-black/[0.06]"
        >
          {pillars.map(({ icon: Icon, title, body, accent, bg }) => (
            <motion.div key={title} variants={pillarVariant} className="flex flex-col gap-3 lg:px-10 first:lg:pl-0 last:lg:pr-0">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon className={`h-5 w-5 ${accent}`} />
              </div>
              <p className="font-display font-bold text-neutral-900 text-[0.92rem] leading-snug">
                {title}
              </p>
              <p className="font-sans text-neutral-500 text-sm leading-relaxed">
                {body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* This band explains the "why" — every homepage section should
            hand the visitor a next step, not just present information and
            stop. */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2.5 font-sans text-xs tracking-[0.18em] uppercase text-neutral-700 hover:text-purple-700 transition-colors duration-300 group"
          >
            More About the Ministry
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
