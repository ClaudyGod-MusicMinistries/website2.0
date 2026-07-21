'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Section, Container } from '@/components/ui';
import { placeholderEvents } from '@/data/events';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString('en-US', { day: '2-digit' }),
    mon: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    full: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  };
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const rowVariant = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * A real dated list — city, venue, date, ticket link — not a 3-card teaser.
 * For a live-performing gospel artist, tour presence is core identity;
 * every reference site studied for this rebuild (Sinach in particular)
 * treats it as a substantial section, not an afterthought.
 */
export function TourDatesStrip() {
  const dates = placeholderEvents
    .filter((e) => e.status === 'upcoming' || e.status === 'ongoing')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (dates.length === 0) return null;

  return (
    <Section bg="muted" py="lg" className="border-t border-b border-white/[0.05]">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="block w-8 h-px bg-gold-500 opacity-70" />
              <span className="label-eyebrow">On Tour</span>
            </div>
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Live Dates
            </h2>
          </div>
          <Link
            href="/events"
            className="hidden sm:inline-flex items-center gap-2 font-sans text-xs tracking-[0.18em] uppercase border border-white/15 hover:border-gold-500/60 text-white/60 hover:text-white px-6 h-10 rounded-xl transition-all duration-300 group shrink-0"
          >
            Full Schedule
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="divide-y divide-white/[0.06] border-y border-white/[0.06]"
        >
          {dates.map((event) => {
            const { day, mon, full } = formatDate(event.date);
            return (
              <motion.div key={event.id} variants={rowVariant}>
                <Link
                  href="/events"
                  className="group flex items-center gap-5 sm:gap-8 py-5 sm:py-6 hover:bg-white/[0.02] transition-colors duration-300 px-2 -mx-2 rounded-lg"
                >
                  <div className="shrink-0 w-14 text-center">
                    <span className="block font-display font-bold text-white text-2xl leading-none">{day}</span>
                    <span className="block font-sans text-[0.65rem] tracking-[0.12em] uppercase text-gold-400 mt-1">{mon}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-display font-semibold text-white text-base sm:text-lg leading-snug group-hover:text-gold-300 transition-colors duration-300 truncate">
                      {event.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      {event.location && (
                        <p className="flex items-center gap-1.5 font-sans text-neutral-500 text-sm">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          {event.location}
                        </p>
                      )}
                      <p className="hidden sm:block font-sans text-neutral-600 text-sm">{full}</p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex shrink-0 items-center gap-2 font-sans text-[0.65rem] tracking-[0.18em] uppercase text-white/50 group-hover:text-white transition-colors duration-300">
                    Details
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-8 flex sm:hidden justify-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2.5 font-sans text-xs tracking-[0.18em] uppercase bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white px-8 h-11 rounded-xl transition-all duration-300"
          >
            Full Schedule
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
