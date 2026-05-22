import Link from 'next/link';
import Image from 'next/image';
import { FaSpotify, FaApple, FaYoutube, FaDeezer, FaAmazon } from 'react-icons/fa6';
import { navigationItems } from '@/data/navbar';
import { socialLinks } from '@/data/socials';

const legalLinks = [
  { href: '/legal/privacy', label: 'Privacy' },
  { href: '/legal/terms',   label: 'Terms'   },
  { href: '/legal/cookies', label: 'Cookies' },
];

const colLinks = [
  { heading: 'Music',    items: ['Music', 'Videos', 'Store'] },
  { heading: 'Ministry', items: ['About', 'Ministry', 'Blog', 'News'] },
  { heading: 'Connect',  items: ['Contact', 'Bookings', 'Donate'] },
];

const streamingLinks = [
  { Icon: FaSpotify, label: 'Spotify',      href: 'https://open.spotify.com/artist/claudygod',                 color: '#1DB954' },
  { Icon: FaApple,   label: 'Apple Music',  href: 'https://music.apple.com/artist/claudygod',                  color: '#FC3C44' },
  { Icon: FaYoutube, label: 'YouTube',      href: 'https://www.youtube.com/channel/UC0RUDNzIiSLxoWGcNQbrLNQ', color: '#FF0000' },
  { Icon: FaDeezer,  label: 'Deezer',       href: 'https://www.deezer.com/us/album/695949191',                  color: '#FEAA2D' },
  { Icon: FaAmazon,  label: 'Amazon Music', href: 'https://music.amazon.com/albums/B0DSM7QGLF',                color: '#FF9900' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0914]">
      {/* Gold top accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      {/* Scripture band */}
      <div className="border-b border-white/[0.07]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
          <div className="flex items-center gap-8 justify-center">
            <span className="hidden sm:block flex-1 h-px bg-gradient-to-r from-transparent to-gold-500/15" />
            <p className="font-raleway italic text-neutral-400 text-base md:text-lg text-center max-w-xl leading-relaxed">
              &ldquo;Sing praises to God, sing praises; sing praises to our King, sing praises.&rdquo;
              <span className="not-italic text-neutral-500 ml-3 text-sm font-normal">— Psalm 47:6</span>
            </p>
            <span className="hidden sm:block flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/15" />
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-14 mb-16">

          {/* Brand column — 2 cols on lg */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="mb-6 w-fit block group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold-500/20 flex-shrink-0 group-hover:ring-gold-500/40 transition-all duration-300">
                  <Image
                    src="/ClaudyGoLogo.webp"
                    alt="ClaudyGod Music Ministries"
                    width={56}
                    height={56}
                    className="object-cover w-full h-full brightness-0 invert"
                  />
                </div>
                <div className="flex flex-col gap-0.5 text-white">
                  <span className="font-raleway font-semibold text-base tracking-tight leading-none">ClaudyGod</span>
                  <span className="font-worksans text-[0.55rem] tracking-[0.2em] uppercase text-neutral-500 leading-none mt-0.5">Music Ministries</span>
                </div>
              </div>
            </Link>

            <p className="font-raleway text-neutral-400 text-sm leading-relaxed max-w-xs mb-7">
              Spirit-filled gospel music, ministry, and worship — spreading the love of God to the ends of the earth.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-5 mb-8">
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
                    className="text-neutral-500 hover:text-[var(--brand)] transition-colors duration-300"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Streaming row */}
            <div>
              <p className="font-worksans text-xs tracking-[0.18em] uppercase text-neutral-600 mb-4">
                Stream on
              </p>
              <div className="flex items-center flex-wrap gap-4">
                {streamingLinks.map(({ Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Listen on ${label}`}
                    style={{ '--brand': color } as React.CSSProperties}
                    className="text-neutral-500 hover:text-[var(--brand)] transition-colors duration-300"
                    title={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Nav columns */}
          {colLinks.map((col) => {
            const items = navigationItems.filter((n) => col.items.includes(n.label));
            return (
              <div key={col.heading}>
                <p className="font-worksans text-xs tracking-[0.22em] uppercase text-neutral-400 mb-6 pb-2 border-b border-white/[0.07]">
                  {col.heading}
                </p>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-raleway text-sm text-neutral-500 hover:text-white transition-colors duration-300"
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
        <div className="border-t border-white/[0.07] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p className="font-worksans text-xs tracking-[0.15em] uppercase text-neutral-600">
            © {year} ClaudyGod Music Ministries. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-worksans text-xs tracking-[0.15em] uppercase text-neutral-600 hover:text-neutral-300 transition-colors duration-300"
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
