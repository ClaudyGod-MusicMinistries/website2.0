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

const PRIMARY_NAV = ['About', 'Music', 'Videos', 'Ministry', 'Store', 'Blog', 'Contact'];

export function Navbar() {
  const pathname   = usePathname();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56);
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
  const bookingLink  = navigationItems.find((i)  => i.label === 'Bookings');
  const mobileLinks  = navigationItems.filter((i) => !['Donate'].includes(i.label));

  const headerBg  = scrolled
    ? 'bg-white/96 backdrop-blur-2xl border-b border-black/[0.07] shadow-[0_1px_16px_rgba(0,0,0,0.08)]'
    : 'bg-transparent';

  const linkBase    = 'font-worksans text-xs tracking-[0.15em] uppercase transition-colors duration-300';
  const linkColor   = scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/80 hover:text-white';
  const activeColor = scrolled ? 'text-purple-600' : 'text-gold-400';

  return (
    <>
      <header className={cn('fixed top-0 inset-x-0 z-[500] transition-all duration-400', headerBg)}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-[76px] flex items-center justify-between gap-6">

          {/* Brand lockup */}
          <Link href="/" className="shrink-0 flex items-center gap-3.5 group">
            {/* Rounded logo */}
            <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-gold-500/30 shrink-0 flex-shrink-0">
              <Image
                src="/ClaudyGoLogo.webp"
                alt="ClaudyGod"
                width={44}
                height={44}
                className="object-cover w-full h-full"
                priority
              />
            </div>

            {/* Vertical divider */}
            <span className={cn(
              'w-px h-9 shrink-0 transition-colors duration-300',
              scrolled ? 'bg-neutral-200' : 'bg-white/20'
            )} />

            {/* Brand text — stacked vertically */}
            <div className={cn(
              'hidden sm:flex flex-col gap-0.5 transition-colors duration-300',
              scrolled ? 'text-neutral-800' : 'text-white/95'
            )}>
              <span className="font-raleway font-semibold text-sm tracking-tight leading-none">ClaudyGod</span>
              <span className="font-worksans text-[0.52rem] tracking-[0.2em] uppercase opacity-55 leading-none mt-0.5">Music Ministries</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
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

          {/* Desktop right: Cart + Book Now */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <CartIcon />
            {bookingLink && (
              <Link
                href={bookingLink.href}
                className={cn(
                  'font-worksans text-xs tracking-[0.18em] uppercase px-6 h-10 inline-flex items-center transition-all duration-300',
                  scrolled
                    ? 'text-white bg-purple-600 hover:bg-purple-500'
                    : 'text-white border border-white/30 hover:border-white/70 hover:bg-white/10'
                )}
              >
                Book Now
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((p) => !p)}
            className={cn(
              'lg:hidden relative z-[510] flex items-center justify-center w-10 h-10',
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

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-[490] bg-[#0c0a1a] flex flex-col"
          >
            {/* Mobile header bar */}
            <div className="h-[76px] shrink-0 border-b border-white/[0.06] flex items-center px-6 gap-3.5">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gold-500/25 shrink-0">
                <Image
                  src="/ClaudyGoLogo.webp"
                  alt="ClaudyGod"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="w-px h-8 bg-white/15 shrink-0" />
              <div className="flex flex-col gap-0.5 text-white">
                <span className="font-raleway font-semibold text-sm tracking-tight leading-none">ClaudyGod</span>
                <span className="font-worksans text-[0.5rem] tracking-[0.2em] uppercase opacity-50 leading-none mt-0.5">Music Ministries</span>
              </div>
            </div>

            <motion.nav
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="flex-1 flex flex-col justify-center px-8 gap-0.5"
            >
              {mobileLinks.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.045, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'block py-3.5 font-raleway font-normal text-2xl tracking-wide transition-colors duration-200 border-b border-white/[0.05]',
                      pathname === item.href ? 'text-gold-400' : 'text-white/70 hover:text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex items-center gap-3 flex-wrap"
              >
                {bookingLink && (
                  <Link
                    href={bookingLink.href}
                    className="inline-flex items-center font-worksans text-xs tracking-[0.2em] uppercase bg-purple-600 hover:bg-purple-500 text-white px-7 h-11 transition-colors duration-300"
                  >
                    Book Now
                  </Link>
                )}
                <Link
                  href="/donate"
                  className="inline-flex items-center font-worksans text-xs tracking-[0.2em] uppercase bg-gold-500 hover:bg-gold-400 text-[#080808] px-7 h-11 transition-colors duration-300"
                >
                  Donate
                </Link>
              </motion.div>
            </motion.nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="px-8 pb-10 font-worksans text-[0.55rem] tracking-[0.22em] uppercase text-white/25"
            >
              ClaudyGod Music Ministries © {new Date().getFullYear()}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
