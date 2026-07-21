'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationItems, type NavGroup } from '@/data/navbar';
import { cn } from '@/utils/cn';
import { buttonVariants } from '@/lib/theme/buttons';
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

  useEffect(() => { setOpen(false); }, [pathname]);

  // Tablet shows exactly the 2 'tablet'-tier items; desktop shows those
  // same 2 plus the 3 'desktop'-tier items (5 total). One data source
  // (data/navbar.ts), filtered by the `header` field — not three
  // hand-typed name arrays.
  const tabletLinks = navigationItems.filter((i) => i.header === 'tablet');
  const desktopLinks = navigationItems.filter((i) => i.header === 'tablet' || i.header === 'desktop');
  const bookingLink = navigationItems.find((i) => i.href === '/bookings');
  const donateLink = navigationItems.find((i) => i.href === '/donate');
  const mobileLinksByGroup = GROUP_ORDER.map((group) => ({
    group,
    items: navigationItems.filter((i) => i.group === group && i.href !== '/donate'),
  }));

  const headerBg = scrolled
    ? 'bg-white/[0.98] backdrop-blur-2xl border-b border-neutral-100 shadow-header'
    : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent';

  const linkBase    = 'font-sans text-[0.68rem] tracking-[0.14em] uppercase transition-colors duration-250';
  const linkColor   = scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/85 hover:text-white';
  const activeColor = scrolled ? 'text-purple-600 font-semibold' : 'text-gold-400 font-medium';

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      {/* z-[600]: must stay above the mobile Dialog overlay (z-[550]) so the
          toggle button inside it stays visible/clickable while the menu is open. */}
      <header className={cn('fixed top-0 inset-x-0 z-[600] transition-all duration-300', headerBg)}>
        <div className="container-site h-[68px] lg:h-[76px] flex items-center justify-between gap-4">

          {/* ── Brand lockup ────────────────────────────────────────────── */}
          <Link href="/" className="shrink-0 flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 lg:w-11 lg:h-11 rounded-full overflow-hidden ring-2 ring-gold-500/30 shrink-0">
              <Image
                src="/ClaudyGoLogo.webp"
                alt="ClaudyGod"
                fill
                className="object-contain p-0.5"
                sizes="44px"
                priority
              />
            </div>

            <span className={cn(
              'w-px h-8 shrink-0 transition-colors duration-300',
              scrolled ? 'bg-neutral-200' : 'bg-white/20'
            )} />

            <div className={cn(
              'hidden sm:flex flex-col gap-0 transition-colors duration-300',
              scrolled ? 'text-neutral-900' : 'text-white/95'
            )}>
              <span className="font-display font-semibold text-[0.82rem] lg:text-sm tracking-tight leading-none">ClaudyGod</span>
              <span className="font-sans text-[0.46rem] lg:text-[0.52rem] tracking-[0.2em] uppercase opacity-55 leading-none mt-0.5">Music Ministries</span>
            </div>
          </Link>

          {/* ── Right cluster: nav links + cart + Book Now ───────────────── */}
          <div className="flex items-center gap-6 lg:gap-8">
            {/* Tablet nav — exactly 2 links, hidden once desktop's 5-link nav takes over */}
            <nav className="hidden md:flex lg:hidden items-center gap-5">
              {tabletLinks.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href} className={cn(linkBase, active ? activeColor : linkColor)}>
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
                  <Link key={item.href} href={item.href} className={cn(linkBase, active ? activeColor : linkColor)}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-2.5 lg:gap-4 shrink-0">
              <CartIcon />
              {bookingLink && (
                <Link
                  href={bookingLink.href}
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'sm', uppercase: true }),
                    'lg:h-10 lg:px-6',
                    !scrolled && 'bg-transparent border border-white/30 hover:border-white/70 hover:bg-white/10 hover:shadow-none',
                  )}
                >
                  Book Now
                </Link>
              )}
            </div>

            {/* ── Mobile toggle — the only thing visible in the header below md ── */}
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((p) => !p)}
              className={cn(
                'md:hidden relative flex items-center justify-center w-9 h-9',
                open ? 'text-white' : scrolled ? 'text-neutral-800' : 'text-white'
              )}
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
          className="z-[550] md:hidden bg-surface-raised border-none rounded-none flex flex-col p-0"
        >
          {/* Mobile header bar */}
          <div className="h-[68px] shrink-0 border-b border-white/[0.06] flex items-center px-4 gap-2.5">
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-gold-500/25 shrink-0">
              <Image src="/ClaudyGoLogo.webp" alt="ClaudyGod" fill className="object-contain p-0.5" sizes="36px" />
            </div>
            <span className="w-px h-7 bg-white/15 shrink-0" />
            <div className="flex flex-col gap-0 text-white">
              <span className="font-display font-semibold text-[0.82rem] tracking-tight leading-none">ClaudyGod</span>
              <span className="font-sans text-[0.45rem] tracking-[0.2em] uppercase opacity-45 leading-none mt-0.5">Music Ministries</span>
            </div>
          </div>

          {/* Nav links — grouped by Explore / Connect / Support */}
          <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
            {mobileLinksByGroup.map(({ group, items }) => (
              <div key={group}>
                <p className="font-sans text-[0.55rem] tracking-[0.2em] uppercase text-white/30 mb-3">
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
                          'flex items-center justify-between py-2.5 font-display font-medium text-base tracking-wide transition-colors duration-200 border-b border-white/[0.06]',
                          active ? 'text-gold-400' : 'text-white/65 hover:text-white'
                        )}
                      >
                        {item.label}
                        {active && <span className="w-1 h-1 rounded-full bg-gold-400 shrink-0" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-2.5 flex-wrap pt-2">
              {bookingLink && (
                <Link href={bookingLink.href} className={buttonVariants({ variant: 'secondary', uppercase: true })}>
                  Book Now
                </Link>
              )}
              {donateLink && (
                <Link href={donateLink.href} className={buttonVariants({ variant: 'primary', uppercase: true })}>
                  Donate
                </Link>
              )}
            </div>
          </nav>

          <p className="px-6 pb-8 font-sans text-[0.5rem] tracking-[0.22em] uppercase text-white/20">
            ClaudyGod Music Ministries © {new Date().getFullYear()}
          </p>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
