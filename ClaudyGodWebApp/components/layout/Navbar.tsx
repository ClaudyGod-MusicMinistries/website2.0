'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navigationItems } from '@/data/navbar';
import { cn } from '@/utils/cn';
import { CartIcon } from '@/components/store/CartIcon';

// Items shown in the desktop horizontal bar
const PRIMARY_NAV = ['About', 'Music', 'Videos', 'Events', 'Ministry', 'Blog', 'News', 'Store', 'Contact'];

// On tablet (md) we show a reduced set so they fit without overflow
const TABLET_NAV = ['About', 'Music', 'Videos', 'Events', 'Ministry', 'Blog', 'Contact'];

export function Navbar() {
  const pathname   = usePathname();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const primaryLinks = navigationItems.filter((i) => PRIMARY_NAV.includes(i.label));
  const tabletLinks  = navigationItems.filter((i) => TABLET_NAV.includes(i.label));
  const bookingLink  = navigationItems.find((i)  => i.label === 'Bookings');
  const mobileLinks  = navigationItems.filter((i) => !['Donate'].includes(i.label));

  const headerBg = scrolled
    ? 'bg-white/[0.98] backdrop-blur-2xl border-b border-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
    : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent';

  const linkBase    = 'font-worksans text-[0.68rem] tracking-[0.14em] uppercase transition-colors duration-250';
  const linkColor   = scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/85 hover:text-white';
  const activeColor = scrolled ? 'text-purple-600 font-semibold' : 'text-gold-400 font-medium';

  return (
    <>
      <header className={cn('fixed top-0 inset-x-0 z-[500] transition-all duration-300', headerBg)}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 h-[68px] lg:h-[76px] flex items-center justify-between gap-4">

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
              <span className="font-bricolage font-bold text-[0.82rem] lg:text-sm tracking-tight leading-none">ClaudyGod</span>
              <span className="font-worksans text-[0.46rem] lg:text-[0.52rem] tracking-[0.2em] uppercase opacity-55 leading-none mt-0.5">Music Ministries</span>
            </div>
          </Link>

          {/* ── Desktop nav (lg+) ──────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 flex-1 justify-center">
            {primaryLinks.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
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

          {/* ── Tablet nav (md only) ────────────────────────────────────── */}
          <nav className="hidden md:flex lg:hidden items-center gap-4 flex-1 justify-center">
            {tabletLinks.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(linkBase, 'text-[0.62rem]', active ? activeColor : linkColor)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop right: Cart + Book Now ────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
            <CartIcon />
            {bookingLink && (
              <Link
                href={bookingLink.href}
                className={cn(
                  'font-worksans text-[0.65rem] tracking-[0.18em] uppercase px-5 xl:px-6 h-9 xl:h-10 inline-flex items-center rounded-xl transition-all duration-300',
                  scrolled
                    ? 'text-white bg-purple-600 hover:bg-purple-500'
                    : 'text-white border border-white/30 hover:border-white/70 hover:bg-white/10'
                )}
              >
                Book Now
              </Link>
            )}
          </div>

          {/* ── Tablet right: Cart ─────────────────────────────────────── */}
          <div className="hidden md:flex lg:hidden items-center gap-2 shrink-0">
            <CartIcon />
            {bookingLink && (
              <Link
                href={bookingLink.href}
                className={cn(
                  'font-worksans text-[0.6rem] tracking-[0.14em] uppercase px-4 h-8 inline-flex items-center rounded-lg transition-all duration-300',
                  scrolled
                    ? 'text-white bg-purple-600 hover:bg-purple-500'
                    : 'text-white border border-white/30 hover:border-white/70 hover:bg-white/10'
                )}
              >
                Book
              </Link>
            )}
          </div>

          {/* ── Mobile toggle ──────────────────────────────────────────── */}
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((p) => !p)}
            className={cn(
              'md:hidden relative z-[510] flex items-center justify-center w-9 h-9',
              scrolled ? 'text-neutral-800' : 'text-white'
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="x"
                  initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span key="m"
                  initial={{ opacity: 0, rotate: 45 }} animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ─────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-[490] bg-[#0c0a1a] flex flex-col"
          >
            {/* Mobile header bar */}
            <div className="h-[68px] shrink-0 border-b border-white/[0.06] flex items-center px-4 gap-2.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-gold-500/25 shrink-0">
                <Image src="/ClaudyGoLogo.webp" alt="ClaudyGod" fill className="object-contain p-0.5" sizes="36px" />
              </div>
              <span className="w-px h-7 bg-white/15 shrink-0" />
              <div className="flex flex-col gap-0 text-white">
                <span className="font-bricolage font-semibold text-[0.82rem] tracking-tight leading-none">ClaudyGod</span>
                <span className="font-worksans text-[0.45rem] tracking-[0.2em] uppercase opacity-45 leading-none mt-0.5">Music Ministries</span>
              </div>
            </div>

            {/* Nav links — compact, medium weight */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.06 }}
              className="flex-1 flex flex-col justify-center px-6 gap-0"
            >
              {mobileLinks.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.04, duration: 0.28 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between py-3 font-bricolage font-medium text-lg tracking-wide transition-colors duration-200 border-b border-white/[0.06]',
                        active ? 'text-gold-400' : 'text-white/65 hover:text-white'
                      )}
                    >
                      {item.label}
                      {active && <span className="w-1 h-1 rounded-full bg-gold-400 shrink-0" />}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-8 flex items-center gap-2.5 flex-wrap"
              >
                {bookingLink && (
                  <Link
                    href={bookingLink.href}
                    className="inline-flex items-center font-worksans text-[0.65rem] tracking-[0.18em] uppercase bg-purple-600 hover:bg-purple-500 text-white px-6 h-10 rounded-xl transition-colors duration-300"
                  >
                    Book Now
                  </Link>
                )}
                <Link
                  href="/donate"
                  className="inline-flex items-center font-worksans text-[0.65rem] tracking-[0.18em] uppercase bg-gold-500 hover:bg-gold-400 text-[#080808] px-6 h-10 rounded-xl transition-colors duration-300"
                >
                  Donate
                </Link>
              </motion.div>
            </motion.nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="px-6 pb-8 font-worksans text-[0.5rem] tracking-[0.22em] uppercase text-white/20"
            >
              ClaudyGod Music Ministries © {new Date().getFullYear()}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
