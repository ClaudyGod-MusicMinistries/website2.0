import Link from 'next/link';
import Image from 'next/image';
import { FaSpotify, FaApple, FaYoutube, FaDeezer, FaAmazon } from 'react-icons/fa6';
import { navigationItems, type NavGroup } from '@/data/navbar';
import { socialLinks } from '@/data/socials';
import { SOCIAL_URLS } from '@/lib/config/site';

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
    <footer className="bg-surface-deep">
      {/* Gold top accent — thicker */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" />

      {/* Streaming CTA band */}
      <div className="border-b border-white/[0.05] bg-gradient-to-r from-purple-900/30 via-surface-raised to-purple-900/20">
        <div className="container-site py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-sans text-[0.55rem] tracking-[0.22em] uppercase text-gold-500/70 mb-2">
                Stream the Ministry
              </p>
              <p className="font-display font-semibold text-white text-xl md:text-2xl tracking-tight">
                Listen on All Platforms
              </p>
            </div>
            <div className="flex items-center flex-wrap gap-3">
              {streamingLinks.map(({ Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Listen on ${label}`}
                  title={label}
                  style={{ '--brand': color } as React.CSSProperties}
                  className="flex items-center gap-2.5 h-10 px-4 rounded-xl border border-white/[0.08] bg-white/[0.04] text-neutral-400 hover:text-[var(--brand)] hover:border-[var(--brand)]/30 hover:bg-[var(--brand)]/[0.06] transition-all duration-300"
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="font-sans text-xs tracking-[0.08em] uppercase hidden sm:block">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="container-site py-10 sm:py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-10 mb-10 lg:mb-14">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="mb-7 w-fit block group">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold-500/20 flex-shrink-0 group-hover:ring-gold-500/50 transition-all duration-300 bg-white/5">
                  <Image
                    src="/ClaudyGoLogo.webp"
                    alt="ClaudyGod Music Ministries"
                    fill
                    className="object-contain p-1"
                    sizes="56px"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display font-semibold text-white text-lg tracking-tight leading-none">
                    ClaudyGod
                  </span>
                  <span className="font-sans text-[0.5rem] tracking-[0.22em] uppercase text-gold-500/70 leading-none mt-0.5">
                    Music Ministries
                  </span>
                </div>
              </div>
            </Link>

            <p className="font-sans text-neutral-400 text-sm leading-[1.8] max-w-xs mb-8">
              Spirit-filled gospel music, ministry, and worship — spreading the love of God to the
              ends of the earth.
            </p>

            {/* Social icons */}
            <div>
              <p className="font-sans text-xs tracking-[0.12em] uppercase text-neutral-500 mb-4">
                Follow the Ministry
              </p>
              <div className="flex items-center gap-3 flex-wrap">
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
                      className="w-9 h-9 rounded-xl border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-neutral-500 hover:text-[var(--brand)] hover:border-[var(--brand)]/30 hover:bg-[var(--brand)]/[0.06] transition-all duration-300"
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
              <p className="font-display font-semibold text-white text-sm tracking-tight mb-5 pb-3 border-b border-white/[0.08]">
                {GROUP_LABELS[group]}
              </p>
              <ul className="space-y-3.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-sans text-sm text-neutral-500 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-gold-500/60 transition-all duration-300 overflow-hidden flex-shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.07] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-sans text-xs tracking-[0.1em] uppercase text-neutral-500">
            © {year} ClaudyGod Music Ministries. All rights reserved.
          </p>
          <div className="flex items-center gap-5 flex-wrap">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-xs tracking-[0.1em] uppercase text-neutral-500 hover:text-neutral-300 transition-colors duration-300"
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
