'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationItems, type NavGroup } from '@/data/navbar';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Button';
import { CartIcon } from '@/components/store/CartIcon';
import { Dialog } from '@/components/ui';

const GROUP_LABELS: Record<NavGroup, string> = {
  explore: 'Explore',
  connect: 'Connect',
  support: 'Support',
};

const GROUP_ORDER: NavGroup[] = ['explore', 'connect', 'support'];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Tablet shows exactly the 2 'tablet'-tier items; desktop shows those
  // same 2 plus the 3 'desktop'-tier items (5 total). One data source
  // (data/navbar.ts), filtered by the `header` field — not three
  // hand-typed name arrays.
  const tabletLinks = navigationItems.filter((i) => i.header === 'tablet');
  const desktopLinks = navigationItems.filter(
    (i) => i.header === 'tablet' || i.header === 'desktop'
  );
  const bookingLink = navigationItems.find((i) => i.href === '/bookings');
  const donateLink = navigationItems.find((i) => i.href === '/donate');
  const mobileLinksByGroup = GROUP_ORDER.map((group) => ({
    group,
    items: navigationItems.filter((i) => i.group === group && i.href !== '/donate'),
  }));

  const headerBg = scrolled
    ? 'bg-white/95 backdrop-blur-2xl border-b border-neutral-200/80 shadow-sm'
    : 'bg-white/85 backdrop-blur-xl border-b border-neutral-200/60 shadow-xs';

  const linkBase =
    'relative font-sans text-xs tracking-[0.1em] uppercase transition-colors duration-250 py-1';
  const linkColor = 'text-neutral-600 hover:text-neutral-900';
  const activeColor =
    'text-purple-700 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-600 after:rounded-full';

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      {/* z-[600]: must stay above the mobile Dialog overlay (z-[550]) so the
          toggle button inside it stays visible/clickable while the menu is open. */}
      <header className={cn('fixed top-0 inset-x-0 z-[600] transition-all duration-300', headerBg)}>
        <div className="container-site h-[68px] lg:h-[76px] flex items-center justify-between gap-4">
          {/* ── Brand lockup ────────────────────────────────────────────── */}
          <Link href="/" className="shrink-0 flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 lg:w-11 lg:h-11 rounded-full overflow-hidden ring-2 ring-gold-500/30 shrink-0 bg-white">
              <Image
                src="/ClaudyGoLogo.webp"
                alt="ClaudyGod"
                fill
                className="object-contain p-0.5"
                sizes="44px"
                priority
              />
            </div>

            <span className="w-px h-8 shrink-0 bg-neutral-200" />

            <div className="hidden sm:flex flex-col gap-0 text-neutral-900">
              <span className="font-display font-semibold text-[0.82rem] lg:text-sm tracking-tight leading-none">
                ClaudyGod
              </span>
              <span className="font-sans text-[0.46rem] lg:text-[0.52rem] tracking-[0.2em] uppercase text-neutral-500 leading-none mt-0.5">
                Music Ministries
              </span>
            </div>
          </Link>

          {/* ── Right cluster: nav links + cart + Book Now ───────────────── */}
          <div className="flex items-center gap-5 lg:gap-7">
            {/* Tablet nav — exactly 2 links, hidden once desktop's 5-link nav takes over */}
            <nav className="hidden md:flex lg:hidden items-center gap-5">
              {tabletLinks.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(linkBase, active ? activeColor : linkColor)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop nav — 5 links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
              {desktopLinks.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(linkBase, active ? activeColor : linkColor)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-3 shrink-0">
              <CartIcon />
              {bookingLink && (
                <Button href={bookingLink.href} variant="secondary" size="sm" uppercase>
                  Book Now
                </Button>
              )}
            </div>

            {/* ── Mobile toggle — the only thing visible in the header below md ── */}
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((p) => !p)}
              className="md:hidden relative flex items-center justify-center w-9 h-9 text-neutral-800 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ─────────────────────────────────────── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Content
          title="Site navigation"
          hideTitle
          variant="fullscreen"
          showClose={false}
          className="z-[550] md:hidden bg-white border-none rounded-none flex flex-col p-0 text-neutral-900"
        >
          {/* Mobile header bar */}
          <div className="h-[68px] shrink-0 border-b border-neutral-100 flex items-center px-4 gap-2.5">
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-gold-500/25 shrink-0 bg-white">
              <Image
                src="/ClaudyGoLogo.webp"
                alt="ClaudyGod"
                fill
                className="object-contain p-0.5"
                sizes="36px"
              />
            </div>
            <span className="w-px h-7 bg-neutral-200 shrink-0" />
            <div className="flex flex-col gap-0 text-neutral-900">
              <span className="font-display font-semibold text-[0.82rem] tracking-tight leading-none">
                ClaudyGod
              </span>
              <span className="font-sans text-[0.45rem] tracking-[0.2em] uppercase text-neutral-500 leading-none mt-0.5">
                Music Ministries
              </span>
            </div>

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="ml-auto flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-700 transition-colors shrink-0"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Nav links — grouped by Explore / Connect / Support */}
          <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
            {mobileLinksByGroup.map(({ group, items }) => (
              <div key={group}>
                <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-neutral-400 font-semibold mb-3">
                  {GROUP_LABELS[group]}
                </p>
                <div className="space-y-0">
                  {items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'flex items-center justify-between py-3 font-display font-medium text-base tracking-wide transition-colors duration-200 border-b border-neutral-100',
                          active
                            ? 'text-purple-700 font-semibold'
                            : 'text-neutral-700 hover:text-neutral-900'
                        )}
                      >
                        {item.label}
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3 flex-wrap pt-4">
              {bookingLink && (
                <Button href={bookingLink.href} variant="secondary" size="sm" uppercase>
                  Book Now
                </Button>
              )}
              {donateLink && (
                <Button href={donateLink.href} variant="primary" size="sm" uppercase>
                  Donate
                </Button>
              )}
            </div>
          </nav>

          <p className="px-6 pb-8 font-sans text-[0.55rem] tracking-[0.22em] uppercase text-neutral-400">
            ClaudyGod Music Ministries © {new Date().getFullYear()}
          </p>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
