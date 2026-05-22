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
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      {/* Scripture band */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-9">
          <div className="flex items-center gap-6 justify-center">
            <span className="hidden sm:block flex-1 h-px bg-gradient-to-r from-transparent to-white/[0.07]" />
            <p className="font-raleway italic text-neutral-500 text-sm md:text-base text-center max-w-lg leading-relaxed">
              &ldquo;Sing praises to God, sing praises; sing praises to our King, sing praises.&rdquo;
              <span className="not-italic text-neutral-600 ml-2 text-xs">— Psalm 47:6</span>
            </p>
            <span className="hidden sm:block flex-1 h-px bg-gradient-to-l from-transparent to-white/[0.07]" />
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-14">

          {/* Brand column — 2 cols on lg */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-5 w-fit block">
              <Image
                src="/ClaudyGoLogo.webp"
                alt="ClaudyGod Music Ministries"
                width={110}
                height={34}
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="font-raleway text-neutral-500 text-sm leading-relaxed max-w-xs mb-6">
              Spirit-filled gospel music, ministry, and worship — spreading the love of God to the ends of the earth.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4 mb-7">
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
                    className="text-neutral-600 hover:text-[var(--brand)] transition-colors duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

            {/* Streaming row */}
            <div>
              <p className="font-worksans text-[0.46rem] tracking-[0.18em] uppercase text-neutral-700 mb-3">
                Stream on
              </p>
              <div className="flex items-center flex-wrap gap-3.5">
                {streamingLinks.map(({ Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Listen on ${label}`}
                    style={{ '--brand': color } as React.CSSProperties}
                    className="text-neutral-600 hover:text-[var(--brand)] transition-colors duration-300"
                    title={label}
                  >
                    <Icon className="h-[1.05rem] w-[1.05rem]" />
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
                <p className="font-worksans text-[0.5rem] tracking-[0.22em] uppercase text-neutral-500 mb-6">
                  {col.heading}
                </p>
                <ul className="space-y-3.5">
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
        <div className="border-t border-white/[0.06] pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-worksans text-[0.48rem] tracking-[0.18em] uppercase text-neutral-700">
            © {year} ClaudyGod Music Ministries. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-worksans text-[0.48rem] tracking-[0.18em] uppercase text-neutral-700 hover:text-neutral-400 transition-colors duration-300"
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
