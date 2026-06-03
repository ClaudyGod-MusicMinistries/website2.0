import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/utils/cn';

type Section = {
  href:      string;
  eyebrow:   string;
  title:     string;
  desc:      string;
  meta:      string;
  image:     string;
  objectPos: string;
  featured?: boolean;
  cta:       string;
};

const sections: Section[] = [
  {
    href:      '/about',
    eyebrow:   'About',
    title:     'Our Story',
    desc:      'Twenty years of faithful ministry — discover the calling, the journey, and the woman behind the music.',
    meta:      '20+ Years of Ministry',
    image:     '/aboutUs.webp',
    objectPos: 'center 20%',
    featured:  true,
    cta:       'Read the Story',
  },
  {
    href:      '/music',
    eyebrow:   'Music',
    title:     'Full Discography',
    desc:      'Seven studio albums of Spirit-filled worship — available on all major platforms.',
    meta:      '7 Studio Albums',
    image:     '/MusicBanner1.webp',
    objectPos: 'center center',
    cta:       'Explore Music',
  },
  {
    href:      '/videos',
    eyebrow:   'Videos',
    title:     'Watch & Worship',
    desc:      'Live sessions, official music videos, and recorded ministry services.',
    meta:      'Live & Official Videos',
    image:     '/tour_1.jpg',
    objectPos: 'center 30%',
    cta:       'Watch Now',
  },
  {
    href:      '/ministry',
    eyebrow:   'Ministry',
    title:     'Ministry Work',
    desc:      'Teachings, outreach programmes, ministry gallery, and global mission impact.',
    meta:      'Teachings & Gallery',
    image:     '/manBack.jpg',
    objectPos: 'center 15%',
    cta:       'Visit Ministry',
  },
  {
    href:      '/blog',
    eyebrow:   'Blog & News',
    title:     'Words of Life',
    desc:      'Devotionals, ministry insights, and encouragement written for the daily journey.',
    meta:      'Devotionals & Updates',
    image:     '/mum1.jpg',
    objectPos: 'center top',
    cta:       'Read the Blog',
  },
  {
    href:      '/news',
    eyebrow:   'Events',
    title:     'Events & Tours',
    desc:      'Tour dates, ministry announcements, and everything happening in the ClaudyGod world.',
    meta:      'Tours & Announcements',
    image:     '/tour_3.jpg',
    objectPos: 'center center',
    cta:       'See All Events',
  },
];

/* ─────────────────────────────────────────── Card ── */
function Card({ s, priority }: { s: Section; priority?: boolean }) {
  return (
    <Link
      href={s.href}
      className={cn(
        'group relative flex overflow-hidden cursor-pointer',
        'rounded-xl sm:rounded-2xl',
        /* Aspect ratio: mobile → tablet → desktop (grid-row controls height on lg) */
        'aspect-[3/2] sm:aspect-[4/3] lg:aspect-auto',
      )}
    >
      {/* ── Background image ── */}
      <Image
        src={s.image}
        alt={s.title}
        fill
        loading={priority ? 'eager' : 'lazy'}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.07]"
        style={{ objectPosition: s.objectPos }}
        sizes={
          s.featured
            ? '(max-width: 1023px) 100vw, 67vw'
            : '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'
        }
      />

      {/* ── Cinematic gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      {/* ── Hover dimming ── */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

      {/* ── TOP ROW: badge + arrow ── */}
      <div className="absolute top-3.5 left-4 right-4 flex items-start justify-between sm:top-4 lg:top-5 sm:left-5 sm:right-5 lg:left-6 lg:right-6">
        {/* Category pill */}
        <span className="inline-flex items-center gap-1.5 font-worksans text-[0.45rem] sm:text-[0.5rem] tracking-[0.22em] uppercase text-white/75 bg-black/30 backdrop-blur-sm border border-white/[0.14] px-2.5 sm:px-3 py-1 rounded-full">
          {s.eyebrow}
        </span>

        {/* Arrow button — slides in on hover */}
        <span className="
          w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center
          bg-white/10 backdrop-blur-sm border border-white/15
          opacity-0 -translate-y-1 scale-90
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
          transition-all duration-300
        ">
          <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
        </span>
      </div>

      {/* ── BOTTOM CONTENT ── */}
      <div className="
        absolute bottom-0 left-0 right-0
        p-4 sm:p-5 lg:p-6
      ">
        {/* Meta tag */}
        <p className="font-worksans text-[0.45rem] sm:text-[0.5rem] tracking-[0.2em] uppercase text-gold-400/70 mb-1 sm:mb-1.5">
          {s.meta}
        </p>

        {/* Title */}
        <h3 className={cn(
          'font-bricolage font-bold text-white leading-tight tracking-tight',
          s.featured
            ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl'
            : 'text-base sm:text-lg lg:text-xl',
        )}>
          {s.title}
        </h3>

        {/* Description:
            - Featured: always visible
            - Non-featured mobile/tablet: visible (line-clamped)
            - Non-featured desktop: hidden, slides up on hover */}
        <p className={cn(
          'font-roboto text-white/70 leading-relaxed',
          s.featured
            ? 'text-xs sm:text-sm mt-1.5 sm:mt-2 max-w-xs sm:max-w-sm lg:max-w-md line-clamp-3 sm:line-clamp-none'
            : [
                'text-xs mt-1 line-clamp-2',
                'lg:mt-0 lg:line-clamp-none lg:max-h-0 lg:opacity-0 lg:translate-y-2',
                'lg:group-hover:max-h-20 lg:group-hover:mt-1.5 lg:group-hover:opacity-100 lg:group-hover:translate-y-0',
                'lg:overflow-hidden lg:transition-all lg:duration-400 lg:ease-out',
              ].join(' '),
        )}>
          {s.desc}
        </p>

        {/* CTA row */}
        <div className={cn(
          'flex items-center gap-1.5 mt-2 sm:mt-2.5',
          !s.featured && [
            'lg:opacity-0 lg:translate-y-1.5',
            'lg:group-hover:opacity-100 lg:group-hover:translate-y-0',
            'lg:transition-all lg:duration-300 lg:delay-75',
          ].join(' '),
        )}>
          <span className="font-worksans text-[0.52rem] sm:text-[0.55rem] tracking-[0.18em] uppercase text-gold-400/75 group-hover:text-gold-400 transition-colors duration-300">
            {s.cta}
          </span>
          <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gold-400/75 group-hover:text-gold-400 transition-colors duration-300" />
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────── Section ── */
export function PagesExplorer() {
  return (
    <section className="relative bg-[#09080f] overflow-hidden">
      {/* Top accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_right,rgba(109,40,217,0.09)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.05)_0%,transparent_65%)]" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-28">

        {/* ── Section header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-8 mb-7 sm:mb-10 lg:mb-12">
          <div>
            <div className="flex items-center gap-4 mb-2.5 sm:mb-3">
              <span className="block w-8 h-px bg-gold-500 opacity-70" />
              <span className="label-eyebrow">Explore</span>
            </div>
            <h2 className="font-abril text-white text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
              Explore the Ministry
            </h2>
          </div>
          <p className="font-roboto text-neutral-500 text-sm leading-relaxed sm:text-right sm:max-w-[220px] lg:max-w-xs">
            Music, ministry, worship, and community — all in one place.
          </p>
        </div>

        {/* ── Bento grid ──
            Mobile:  1 col  – all cards aspect-[3/2]
            Tablet:  2 cols – all cards aspect-[4/3]
            Desktop: 3 col bento — featured spans 2 col × 2 row
        ── */}
        <div className={cn(
          'grid gap-2.5 sm:gap-3',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          'lg:[grid-template-rows:280px_280px_260px]',
        )}>
          {sections.map((s, i) => (
            <div
              key={s.href}
              className={cn(
                s.featured && 'lg:col-span-2 lg:row-span-2',
              )}
            >
              <Card s={s} priority={i === 0} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </section>
  );
}
