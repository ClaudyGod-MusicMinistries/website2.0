import Image from 'next/image';
import Link from 'next/link';

const sections = [
  {
    href:        '/about',
    eyebrow:     'About',
    title:       'Our Story',
    description: 'Twenty years of faithful ministry — discover the calling, the journey, and the woman behind the music.',
    image:       '/aboutUs.webp',
    cta:         'Read the Story',
  },
  {
    href:        '/music',
    eyebrow:     'Music',
    title:       'Full Discography',
    description: 'Seven studio albums of Spirit-filled worship. Stream on Spotify, Apple Music, YouTube, and beyond.',
    image:       '/resize_abt.webp',
    cta:         'Explore Music',
  },
  {
    href:        '/videos',
    eyebrow:     'Videos',
    title:       'Watch & Worship',
    description: 'Live worship sessions, official music videos, and recorded ministry services.',
    image:       '/tour_1.jpg',
    cta:         'Watch Videos',
  },
  {
    href:        '/ministry',
    eyebrow:     'Ministry',
    title:       'Ministry Work',
    description: 'Teachings, outreach programmes, ministry gallery, and the global reach of the mission.',
    image:       '/manBack.jpg',
    cta:         'Visit Ministry',
  },
  {
    href:        '/blog',
    eyebrow:     'Blog',
    title:       'Words of Life',
    description: 'Devotionals, ministry insights, and encouragement written for the believer\'s daily journey.',
    image:       '/mum1.jpg',
    cta:         'Read the Blog',
  },
  {
    href:        '/news',
    eyebrow:     'News',
    title:       'Latest Updates',
    description: 'Tour dates, ministry announcements, upcoming events, and everything happening in the ClaudyGod world.',
    image:       '/tour_1.jpg',
    cta:         'See All News',
  },
];

export function PagesExplorer() {
  return (
    <section className="bg-cream-100 section-py border-t border-black/[0.05]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section header */}
        <div className="mb-7 sm:mb-12 lg:mb-14">
          <div className="flex items-center gap-4 mb-3 sm:mb-4">
            <span className="rule-gold" />
            <span className="label-eyebrow">Explore</span>
          </div>
          <h2 className="font-bricolage font-bold text-neutral-900 text-2xl sm:text-4xl md:text-5xl tracking-tight">
            Everything You&apos;ll Find Here
          </h2>
        </div>

        {/* Grid — 2 cols on mobile, 2 on sm, 3 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-white overflow-hidden flex flex-col rounded-xl sm:rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-shadow duration-400"
            >
              {/* Image */}
              <div className="relative h-28 sm:h-44 md:h-52 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/30" />
              </div>

              {/* Card body */}
              <div className="flex-1 flex flex-col p-3 sm:p-5 lg:p-7">
                {/* Eyebrow */}
                <span className="font-worksans text-[0.45rem] sm:text-[0.52rem] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-purple-600 mb-1.5 sm:mb-3 block">
                  {s.eyebrow}
                </span>

                {/* Title */}
                <h3 className="font-bricolage font-bold text-neutral-900 text-sm sm:text-xl leading-snug mb-1.5 sm:mb-3 group-hover:text-purple-700 transition-colors duration-300">
                  {s.title}
                </h3>

                {/* Description — hidden on mobile (too long for compact 2-col grid) */}
                <p className="hidden sm:block font-raleway text-neutral-500 text-sm leading-relaxed flex-1 mb-5 sm:mb-7">
                  {s.description}
                </p>

                {/* CTA button */}
                <span className="mt-auto w-full sm:w-auto sm:self-start inline-flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5 font-worksans text-[0.55rem] sm:text-xs tracking-[0.12em] sm:tracking-[0.18em] uppercase bg-neutral-900 group-hover:bg-purple-700 text-white px-3 sm:px-6 h-8 sm:h-10 rounded-lg sm:rounded-xl transition-all duration-300">
                  {s.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
