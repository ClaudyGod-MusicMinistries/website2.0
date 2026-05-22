import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Smartphone, Mail } from 'lucide-react';

const promos = [
  {
    icon: ShoppingBag,
    eyebrow: 'Official Store',
    title: 'Wear Your Worship',
    body: 'Browse exclusive ClaudyGod merchandise — gospel music, apparel, and accessories.',
    cta: 'Visit the Store',
    href: '/store',
    image: '/CD1.png',
    accent: 'from-purple-600/20 to-transparent',
  },
  {
    icon: Smartphone,
    eyebrow: 'Mobile App',
    title: 'Worship on the Go',
    body: 'Download our mobile app for devotionals, teachings, and worship wherever you are.',
    cta: 'Download App',
    href: '/download',
    image: '/ClaudySocial.jpg',
    accent: 'from-gold-500/15 to-transparent',
  },
  {
    icon: Mail,
    eyebrow: 'Newsletter',
    title: 'Stay in the Spirit',
    body: 'Join 10,000+ subscribers for new releases, event invitations, and ministry updates.',
    cta: 'Subscribe Free',
    href: '#newsletter',
    image: '/mum1.jpg',
    accent: 'from-purple-800/20 to-transparent',
  },
];

export function CrossPromo() {
  return (
    <section className="bg-white section-py border-t border-black/[0.05]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-10">
          <span className="rule-gold" />
          <span className="label-eyebrow">Explore More</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map(({ icon: Icon, eyebrow, title, body, cta, href, image, accent }) => (
            <Link
              key={href}
              href={href}
              className="group relative overflow-hidden rounded-2xl bg-neutral-950 flex flex-col min-h-[260px] shadow-[0_4px_24px_rgba(0,0,0,0.14)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-shadow duration-400"
            >
              {/* Background image */}
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-[1.04] scale-100 transition-transform"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/50 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex flex-col flex-1 p-7">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-5 group-hover:border-purple-400/40 transition-colors duration-300">
                  <Icon className="h-4 w-4 text-white/70" />
                </div>

                <p className="font-worksans text-[0.55rem] tracking-[0.2em] uppercase text-gold-400/80 mb-2">{eyebrow}</p>
                <h3 className="font-bricolage font-bold text-white text-xl leading-snug mb-3 group-hover:text-purple-200 transition-colors duration-300">
                  {title}
                </h3>
                <p className="font-raleway text-neutral-400 text-sm leading-relaxed flex-1 mb-6">
                  {body}
                </p>

                <span className="inline-flex items-center gap-2 font-worksans text-[0.6rem] tracking-[0.18em] uppercase text-white bg-white/10 hover:bg-purple-600 border border-white/10 group-hover:border-purple-500 px-5 h-9 rounded-xl self-start transition-all duration-300">
                  {cta}
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
