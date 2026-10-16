'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Section, Container, Skeleton } from '@/components/ui';
import { useEvents } from '@/hooks/useEvents';
import { Button, buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

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
 * Backed by useEvents() (GET /api/events -> the real .NET EventController),
 * not a static placeholder file — see components/news/EventsSection.tsx for
 * the original working reference this hook usage is copied from.
 */
export function TourDatesStrip() {
  const { events, loading, error } = useEvents();

  const dates = events
    .filter((e) => e.status === 'upcoming' || e.status === 'ongoing')
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  if (error) return null;

  if (loading) {
    return (
      <section className="bg-cream-50 py-16 sm:py-20 border-t border-b border-neutral-200/60">
        <div className="container-site">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-6 bg-gold-500" />
                <span className="label-eyebrow text-gold-700 font-semibold">On Tour</span>
              </div>
              <h2 className="font-raleway font-light text-neutral-900 text-3xl sm:text-4xl tracking-tight">
                Upcoming Live Gatherings
              </h2>
            </div>
          </div>
          <div className="space-y-4 py-4">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex items-center gap-5 sm:gap-8 bg-white p-5 rounded-2xl border border-neutral-200/70"
              >
                <Skeleton className="h-10 w-14 shrink-0 rounded-lg" />
                <Skeleton className="h-5 flex-1 max-w-xs" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (dates.length === 0) return null;

  return (
    <section className="relative bg-neutral-50 py-16 sm:py-24 border-t border-b border-neutral-200/70 overflow-hidden">
      <div className="container-site relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-6 bg-gold-500" />
              <span className="label-eyebrow text-gold-700 font-semibold">Live Ministry</span>
            </div>
            <h2 className="font-raleway font-light text-neutral-900 text-3xl sm:text-4xl tracking-tight">
              Tour Dates & Worship Gatherings
            </h2>
          </div>
          <Button
            href="/events"
            variant="dark"
            size="sm"
            uppercase
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            className="hidden sm:inline-flex"
          >
            Full Schedule
          </Button>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-3.5 sm:space-y-4"
        >
          {dates.map((event) => {
            const { day, mon, full } = formatDate(event.startDate);
            return (
              <motion.div key={event.id} variants={rowVariant}>
                <Link
                  href="/events"
                  className="group flex items-center gap-4 sm:gap-8 p-4 sm:p-5 bg-white rounded-2xl border border-neutral-200/80 hover:border-gold-300 shadow-2xs hover:shadow-card-light-hover transition-all duration-300"
                >
                  {/* Calendar Chip */}
                  <div className="shrink-0 w-12 sm:w-16 py-2 rounded-xl bg-gold-50/90 border border-gold-300/60 text-center shadow-2xs">
                    <span className="block font-display font-bold text-neutral-900 text-xl sm:text-2xl leading-none">
                      {day}
                    </span>
                    <span className="block font-sans text-[0.62rem] sm:text-[0.68rem] tracking-[0.14em] uppercase font-semibold text-gold-700 mt-0.5">
                      {mon}
                    </span>
                  </div>

                  {/* Title & Venue */}
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-semibold text-neutral-900 text-base sm:text-lg leading-snug group-hover:text-purple-800 transition-colors duration-200 truncate">
                      {event.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs sm:text-sm text-neutral-500">
                      {event.venue && (
                        <p className="flex items-center gap-1.5 font-sans">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-600" />
                          {event.venue}
                        </p>
                      )}
                      <p className="hidden md:block font-sans text-neutral-400">{full}</p>
                    </div>
                  </div>

                  {/* Encapsulated Action Button — Not loose text */}
                  <span
                    className={cn(
                      buttonVariants({ variant: 'outline-dark', size: 'xs', uppercase: true }),
                      'hidden sm:inline-flex shrink-0'
                    )}
                  >
                    Details
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile Button — Compact, centered pill */}
        <div className="mt-8 flex sm:hidden justify-center">
          <Button
            href="/events"
            variant="dark"
            size="md"
            uppercase
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
          >
            View Full Schedule
          </Button>
        </div>
      </div>
    </section>
  );
}
