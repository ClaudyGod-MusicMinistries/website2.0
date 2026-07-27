import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Headphones, Mic2 } from 'lucide-react';

const pathways = [
  {
    eyebrow: 'Listen',
    title: 'Music for worship, prayer, and everyday faith.',
    body: 'Explore the discography and continue listening on Spotify, Apple Music, YouTube, Deezer, or Amazon Music.',
    href: '/music',
    cta: 'Explore the music',
    icon: Headphones,
  },
  {
    eyebrow: 'Gather',
    title: 'Experience the ministry in person.',
    body: 'See confirmed worship gatherings, ministry outings, and upcoming appearances.',
    href: '/events',
    cta: 'View upcoming events',
    icon: CalendarDays,
  },
  {
    eyebrow: 'Invite',
    title: 'Bring ClaudyGod to your church or event.',
    body: 'Share your date, venue, and vision with the ministry team through the official booking request.',
    href: '/bookings',
    cta: 'Start a booking request',
    icon: Mic2,
  },
] as const;

export function ExplorePathways() {
  return (
    <section className="bg-cream-100 section-py" aria-labelledby="explore-heading">
      <div className="container-site">
        <div className="max-w-2xl mb-10 md:mb-14">
          <div className="flex items-center gap-4 mb-5">
            <span className="rule-gold" />
            <span className="label-eyebrow">Explore ClaudyGod</span>
          </div>
          <h2
            id="explore-heading"
            className="font-raleway text-3xl font-light leading-tight text-neutral-900 sm:text-4xl"
          >
            Music, ministry, and moments of worship.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 lg:grid-cols-3">
          {pathways.map(({ eyebrow, title, body, href, cta, icon: Icon }, index) => (
            <article
              key={href}
              className="group relative flex min-h-[330px] flex-col bg-white p-7 sm:p-9"
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-purple-700">
                  {eyebrow}
                </span>
                <span className="font-sans text-xs text-neutral-400">0{index + 1}</span>
              </div>
              <Icon className="mb-6 h-6 w-6 text-gold-600" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="font-display text-xl font-semibold leading-snug text-neutral-900">
                {title}
              </h3>
              <p className="mt-4 font-sans text-sm leading-7 text-neutral-500">{body}</p>
              <Link
                href={href}
                className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-6 font-sans text-sm font-semibold text-neutral-800 transition-colors hover:text-purple-700"
              >
                {cta}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
