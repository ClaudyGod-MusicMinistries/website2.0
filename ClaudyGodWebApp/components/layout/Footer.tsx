import Link from 'next/link';
import Image from 'next/image';
import { FaSpotify, FaApple, FaYoutube, FaDeezer, FaAmazon } from 'react-icons/fa6';
import { navigationItems, type NavGroup } from '@/data/navbar';
import { socialLinks } from '@/data/socials';
import { SOCIAL_URLS } from '@/lib/config/site';
import { CookieSettingsButton } from '@/components/shared/CookieSettingsButton';

const legalLinks = [
  { href: '/legal/privacy', label: 'Privacy' },
  { href: '/legal/terms', label: 'Terms' },
  { href: '/legal/cookies', label: 'Cookies' },
];

const GROUP_LABELS: Record<NavGroup, string> = {
  explore: 'Explore',
  connect: 'Connect',
  support: 'Support',
};

const GROUP_ORDER: NavGroup[] = ['explore', 'connect', 'support'];

const streamingLinks = [
  {
    Icon: FaSpotify,
    label: 'Spotify',
    href: SOCIAL_URLS.spotify,
    color: '#1DB954',
  },
  {
    Icon: FaApple,
    label: 'Apple Music',
    href: SOCIAL_URLS.appleMusic,
    color: '#FC3C44',
  },
  {
    Icon: FaYoutube,
    label: 'YouTube',
    href: SOCIAL_URLS.youtube,
    color: '#FF0000',
  },
  {
    Icon: FaDeezer,
    label: 'Deezer',
    href: SOCIAL_URLS.deezer,
    color: '#FEAA2D',
  },
  {
    Icon: FaAmazon,
    label: 'Amazon Music',
    href: SOCIAL_URLS.amazonMusic,
    color: '#FF9900',
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  // Every nav item lands in exactly one footer column via its `group` — no
  // more manually curated column lists that can silently drift out of sync
  // with the nav (this is how /volunteer ended up in neither before).
  const columns = GROUP_ORDER.map((group) => ({
    group,
    items: navigationItems.filter((i) => i.group === group),
  }));

  return (
    <footer className="bg-purple-950 border-t border-purple-800/80 text-white">
      {/* Gold top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      {/* Streaming CTA band */}
      <div className="border-b border-purple-800/60 bg-purple-900/70 backdrop-blur-sm">
        <div className="container-site py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-sans text-[0.62rem] tracking-[0.2em] uppercase font-semibold text-gold-300 mb-1.5">
                Stream the Ministry
              </p>
              <p className="font-display font-semibold text-white text-xl sm:text-2xl tracking-tight">
                Listen on All Platforms
              </p>
            </div>
            <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
              {streamingLinks.map(({ Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Listen on ${label}`}
                  title={label}
                  style={{ '--brand': color } as React.CSSProperties}
                  className="flex items-center gap-2 h-9 sm:h-10 px-3.5 sm:px-4 rounded-full border border-purple-700/80 bg-purple-950/80 text-purple-200 hover:text-white hover:border-gold-400/80 hover:bg-purple-800/80 transition-all duration-200 shadow-2xs"
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="font-sans text-xs tracking-wider uppercase font-medium hidden sm:block">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="container-site py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-10 lg:mb-14">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="mb-6 w-fit block group">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold-400/40 flex-shrink-0 bg-white shadow-2xs">
                  <Image
                    src="/ClaudyGoLogo.webp"
                    alt="ClaudyGod Music Ministries"
                    fill
                    className="object-contain p-0.5"
                    sizes="48px"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-display font-semibold text-white text-xl tracking-tight leading-none group-hover:text-gold-300 transition-colors">
                    ClaudyGod
                  </span>
                  <span className="font-sans text-[0.52rem] tracking-[0.22em] uppercase text-gold-300 font-semibold leading-none">
                    Music Ministries
                  </span>
                </div>
              </div>
            </Link>

            <p className="font-sans text-purple-200/80 text-sm leading-relaxed max-w-sm mb-7">
              Spirit-filled gospel music, ministry, and worship — spreading the love of God to the
              ends of the earth.
            </p>

            {/* Social icons */}
            <div>
              <p className="font-sans text-[0.65rem] tracking-[0.16em] uppercase font-semibold text-gold-300/80 mb-3">
                Follow the Ministry
              </p>
              <div className="flex items-center gap-2.5 flex-wrap">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      style={{ '--brand': s.brandColor } as React.CSSProperties}
                      className="w-9 h-9 rounded-full border border-purple-800/80 bg-purple-900/60 flex items-center justify-center text-purple-200 hover:text-gold-300 hover:border-gold-400/70 hover:bg-purple-800 transition-all duration-200 shadow-2xs"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Nav columns — Explore / Connect / Support */}
          {columns.map(({ group, items }) => (
            <div key={group}>
              <p className="font-display font-semibold text-gold-300 text-sm tracking-tight mb-4 pb-2.5 border-b border-purple-800/60">
                {GROUP_LABELS[group]}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-sans text-sm text-purple-200/90 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2.5 h-px bg-gold-400 transition-all duration-200 overflow-hidden flex-shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-purple-800/60 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-sans text-xs tracking-wider uppercase text-purple-300/70">
            © {year} ClaudyGod Music Ministries. All rights reserved.
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            <CookieSettingsButton />
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-xs tracking-wider uppercase text-purple-300/70 hover:text-white transition-colors duration-200"
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
