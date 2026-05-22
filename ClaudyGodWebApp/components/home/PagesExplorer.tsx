import Image from 'next/image';
import Link from 'next/link';

const CDN = 'https://cdn.jsdelivr.net/gh/ClaudyGod-MusicMinistries/CGM-Assets@latest';

const sections = [
  {
    href:        '/about',
    label:       'About',
    title:       'Our Story',
    description: 'Twenty years of faithful ministry — discover the calling, the journey, and the woman behind the music.',
    image:       '/aboutUs.webp',
    cta:         'Read the Story',
  },
  {
    href:        '/music',
    label:       'Music',
    title:       'Full Discography',
    description: 'Seven studio albums of Spirit-filled worship. Stream on Spotify, Apple Music, YouTube, and beyond.',
    image:       `${CDN}/Bg_13.webp`,
    cta:         'Explore Music',
  },
  {
    href:        '/videos',
    label:       'Videos',
    title:       'Watch & Worship',
    description: 'Live worship sessions, official music videos, and recorded ministry services.',
    image:       `${CDN}/desktopBg.jpg`,
    cta:         'Watch Videos',
  },
  {
    href:        '/ministry',
    label:       'Ministry',
    title:       'Ministry Work',
    description: 'Teachings, outreach programmes, ministry gallery, and the global reach of the mission.',
    image:       `${CDN}/Ministry1.jpg`,
    cta:         'Visit Ministry',
  },
  {
    href:        '/blog',
    label:       'Blog',
    title:       'Words of Life',
    description: 'Devotionals, ministry insights, and encouragement written for the believer\'s daily journey.',
    image:       `${CDN}/abt_2.webp`,
    cta:         'Read the Blog',
  },
  {
    href:        '/news',
    label:       'News',
    title:       'Latest Updates',
    description: 'Tour dates, ministry announcements, upcoming events, and everything happening in the ClaudyGod world.',
    image:       '/tour_1.jpg',
    cta:         'See All News',
  },
];

export function PagesExplorer() {
  return (
    <section className="bg-cream-100 section-py border-t border-black/[0.05]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="rule-gold" />
          <span className="label-eyebrow">Explore</span>
        </div>
        <div className="flex items-end justify-between mb-14">
          <h2 className="font-raleway font-normal text-neutral-900 text-4xl md:text-5xl tracking-tight">
            Everything You&apos;ll Find Here
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.06]">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative bg-white overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05] brightness-[0.88] group-hover:brightness-[0.75]"
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
                {/* Gradient overlay for label readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Eyebrow label on image */}
                <span className="absolute bottom-4 left-5 font-worksans text-[0.52rem] tracking-[0.2em] uppercase text-white/70">
                  {s.label}
                </span>
              </div>

              {/* Text */}
              <div className="flex-1 flex flex-col p-6 border-b border-black/[0.06]">
                <h3 className="font-raleway font-normal text-neutral-900 text-xl leading-snug mb-2.5 group-hover:text-purple-700 transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="font-raleway text-neutral-500 text-sm font-light leading-relaxed flex-1">
                  {s.description}
                </p>
                <span className="mt-5 font-worksans text-[0.54rem] tracking-[0.18em] uppercase text-neutral-400 group-hover:text-purple-600 transition-colors duration-300 flex items-center gap-1.5">
                  {s.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>

              {/* Left gold accent on hover */}
              <span className="absolute left-0 inset-y-0 w-0.5 bg-gold-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-bottom" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
