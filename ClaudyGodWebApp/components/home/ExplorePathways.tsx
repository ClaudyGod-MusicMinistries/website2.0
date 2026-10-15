'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, Headphones, Mic2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const pathways = [
  {
    eyebrow: 'Discography',
    title: 'Music for worship, prayer, and faith.',
    body: 'Explore seven studio albums spanning soulful praise, intimate worship, and uplifting gospel rhythms.',
    href: '/music',
    cta: 'Explore Music',
    icon: Headphones,
  },
  {
    eyebrow: 'Gatherings',
    title: 'Experience the ministry live.',
    body: 'Join confirmed worship nights, international ministry tours, and spirit-filled congregational gatherings.',
    href: '/events',
    cta: 'View Events',
    icon: CalendarDays,
  },
  {
    eyebrow: 'Ministry Booking',
    title: 'Invite Minister ClaudyGod.',
    body: 'Invite Minister ClaudyGod to your church, conference, or crusade through the official booking portal.',
    href: '/bookings',
    cta: 'Book Minister',
    icon: Mic2,
  },
] as const;

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function ExplorePathways() {
  return (
    <section
      className="relative overflow-hidden bg-white py-16 sm:py-24 border-t border-neutral-200/70"
      aria-labelledby="explore-heading"
    >
      <div className="container-site relative z-10">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-6 bg-gold-500" />
            <span className="label-eyebrow text-gold-700 font-semibold">Explore ClaudyGod</span>
          </div>
          <h2
            id="explore-heading"
            className="font-raleway text-3xl sm:text-4xl font-light leading-tight text-neutral-900 tracking-tight"
          >
            Music, Ministry & Moments of Worship
          </h2>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {pathways.map(({ eyebrow, title, body, href, cta, icon: Icon }, index) => (
            <motion.article
              key={href}
              custom={index}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="group relative flex min-h-[360px] flex-col rounded-3xl border border-neutral-200/80 bg-neutral-50/70 p-7 sm:p-8 shadow-xs hover:border-gold-400 hover:bg-white hover:shadow-card-light-hover transition-colors duration-300 overflow-hidden"
            >
              {/* Dynamic top gold accent line that activates on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-t-3xl"
              />

              {/* Top Row: Eyebrow Pill + High-Grade Squircle Icon */}
              <div className="mb-6 flex items-center justify-between relative z-10">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200/70 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-purple-800 shadow-2xs">
                  {eyebrow}
                </span>

                <div className="w-12 h-12 rounded-2xl border border-purple-200/80 bg-white text-purple-800 flex items-center justify-center transition-all duration-300 group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-purple-950 group-hover:scale-110 shadow-2xs shrink-0">
                  <Icon
                    className="h-5 w-5 transition-transform duration-300"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Title & Body */}
              <h3 className="font-display text-xl sm:text-2xl font-semibold leading-snug text-neutral-900 mb-3 group-hover:text-purple-900 transition-colors relative z-10">
                {title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-neutral-500 mb-6 relative z-10 flex-1">
                {body}
              </p>

              {/* Encapsulated Button — Sleek pill, never full-width */}
              <div className="mt-auto pt-6 border-t border-neutral-200/60 relative z-10">
                <Button
                  href={href}
                  variant="outline-dark"
                  size="sm"
                  uppercase
                  rightIcon={
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  }
                >
                  {cta}
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
