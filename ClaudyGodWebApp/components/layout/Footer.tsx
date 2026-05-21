import Link from 'next/link';
import Image from 'next/image';
import { navigationItems } from '@/data/navbar';
import { socialLinks } from '@/data/socials';

const legalLinks = [
  { href: '/legal/privacy', label: 'Privacy' },
  { href: '/legal/terms',   label: 'Terms' },
  { href: '/legal/cookies', label: 'Cookies' },
];

const colLinks = [
  { heading: 'Music',    items: ['Music', 'Videos', 'Store'] },
  { heading: 'Ministry', items: ['About', 'Ministry', 'Blog', 'News'] },
  { heading: 'Connect',  items: ['Contact', 'Bookings', 'Donate'] },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">

          {/* Brand — 2 cols on lg */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 w-fit">
              <Image src="/CD1.png" alt="ClaudyGod" width={22} height={22} className="opacity-80" />
              <div className="flex flex-col leading-none">
                <span className="font-abril text-white text-[0.85rem] tracking-wide">ClaudyGod</span>
                <span className="font-worksans text-gold-400/60 text-[0.44rem] tracking-[0.24em] uppercase mt-px">
                  Music Ministries
                </span>
              </div>
            </Link>
            <p className="font-raleway text-neutral-600 text-sm leading-relaxed max-w-xs font-light">
              Gospel music artist, minister, and worship leader spreading the love of God through music.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-neutral-700 hover:text-gold-400 transition-colors duration-300"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav columns */}
          {colLinks.map((col) => {
            const items = navigationItems.filter((n) => col.items.includes(n.label));
            return (
              <div key={col.heading}>
                <p className="font-worksans text-[0.55rem] tracking-[0.22em] uppercase text-neutral-700 mb-5">
                  {col.heading}
                </p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-raleway text-sm text-neutral-500 hover:text-white font-light transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-worksans text-[0.55rem] tracking-[0.18em] uppercase text-neutral-700">
            © {year} ClaudyGod Music Ministries
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-worksans text-[0.55rem] tracking-[0.18em] uppercase text-neutral-700 hover:text-neutral-400 transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
