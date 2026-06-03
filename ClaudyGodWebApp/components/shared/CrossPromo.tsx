import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Smartphone, Mail, ArrowRight } from 'lucide-react';

const promos = [
  {
    icon:    ShoppingBag,
    eyebrow: 'Official Store',
    title:   'Wear Your Worship',
    body:    'Browse exclusive ClaudyGod merchandise — gospel apparel and accessories.',
    cta:     'Visit the Store',
    href:    '/store',
    image:   '/CD1.png',
    accent:  'bg-purple-600',
    badge:   'Merch',
  },
  {
    icon:    Smartphone,
    eyebrow: 'Stream Everywhere',
    title:   'Worship on the Go',
    body:    'Stream all ClaudyGod music on Spotify, Apple Music, YouTube, and all major platforms.',
    cta:     'Listen Now',
    href:    '/music',
    image:   '/ClaudySocial.jpg',
    accent:  'bg-gold-500',
    badge:   'Music',
  },
  {
    icon:    Mail,
    eyebrow: 'Newsletter',
    title:   'Stay in the Spirit',
    body:    'Join 10,000+ subscribers — new releases, event invites, and ministry updates.',
    cta:     'Subscribe Free',
    href:    '#newsletter',
    image:   '/mum1.jpg',
    accent:  'bg-purple-700',
    badge:   'Free',
  },
];

export function CrossPromo() {
  return (
    <section className="bg-[#09080f] overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
          <span className="block w-8 h-px bg-gold-500 opacity-70" />
          <span className="label-eyebrow">Explore More</span>
        </div>

        {/* Cards — horizontal scroll on mobile, 3-col on desktop */}
        <div className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 sm:pb-0 sm:grid sm:grid-cols-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          {promos.map(({ icon: Icon, eyebrow, title, body, cta, href, image, accent, badge }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex-none snap-start w-[82vw] sm:w-auto overflow-hidden rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:border-white/[0.15] transition-all duration-400 flex flex-col"
            >
              {/* Image strip */}
              <div className="relative h-44 sm:h-40 lg:h-48 overflow-hidden shrink-0">
                <Image
                  src={image}
                  alt={title}
                  fill
                  loading="lazy"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.06] opacity-60 group-hover:opacity-75"
                  sizes="(max-width: 640px) 82vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-[#09080f]/90" />

                {/* Badge */}
                <span className={`absolute top-3 left-3 ${accent} text-white font-worksans text-[0.45rem] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full`}>
                  {badge}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 sm:p-4 lg:p-6">
                {/* Icon + eyebrow */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/[0.1] flex items-center justify-center shrink-0 group-hover:border-purple-400/30 transition-colors duration-300">
                    <Icon className="h-3.5 w-3.5 text-gold-400/80" />
                  </div>
                  <span className="font-worksans text-[0.48rem] tracking-[0.2em] uppercase text-neutral-500">
                    {eyebrow}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bricolage font-bold text-white text-lg sm:text-base lg:text-xl leading-snug mb-2 group-hover:text-purple-200 transition-colors duration-300">
                  {title}
                </h3>

                {/* Body */}
                <p className="font-roboto text-neutral-400 text-sm sm:text-xs lg:text-sm leading-relaxed flex-1 mb-4 sm:mb-5">
                  {body}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 font-worksans text-[0.58rem] sm:text-[0.55rem] tracking-[0.16em] uppercase text-white/70 group-hover:text-white transition-colors duration-300">
                  {cta}
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll dots — mobile only */}
        <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
          {promos.map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </section>
  );
}
