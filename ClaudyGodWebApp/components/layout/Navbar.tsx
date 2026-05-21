'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navigationItems } from '@/data/navbar';
import { cn } from '@/utils/cn';

const PRIMARY_NAV = ['About', 'Music', 'Videos', 'Ministry', 'Store', 'Contact'];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const primaryLinks  = navigationItems.filter((i) => PRIMARY_NAV.includes(i.label));
  const bookingLink   = navigationItems.find((i) => i.label === 'Bookings');
  const mobileLinks   = navigationItems.filter((i) => !['Donate'].includes(i.label));

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-[500] transition-all duration-500',
          scrolled
            ? 'bg-[#080808]/92 backdrop-blur-2xl border-b border-white/[0.06]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src="/CD1.png"
              alt="ClaudyGod"
              width={26}
              height={26}
              className="opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="flex flex-col leading-none">
              <span className="font-abril text-white text-[0.9rem] tracking-wide">ClaudyGod</span>
              <span className="font-worksans text-gold-400/80 text-[0.48rem] tracking-[0.24em] uppercase mt-px">
                Music Ministries
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            {primaryLinks.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'font-worksans text-[0.6rem] tracking-[0.2em] uppercase transition-colors duration-300',
                    active ? 'text-gold-400' : 'text-neutral-500 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {bookingLink && (
              <Link
                href={bookingLink.href}
                className="font-worksans text-[0.6rem] tracking-[0.2em] uppercase text-white/70 border border-white/15 hover:border-gold-500/50 hover:text-gold-400 px-5 h-8 inline-flex items-center transition-all duration-300"
              >
                Bookings
              </Link>
            )}
            <Link
              href="/donate"
              className="font-worksans text-[0.6rem] tracking-[0.2em] uppercase text-[#080808] bg-gold-500 hover:bg-gold-400 px-5 h-8 inline-flex items-center transition-all duration-300"
            >
              Donate
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((p) => !p)}
            className="lg:hidden relative z-[510] flex items-center justify-center text-white w-8 h-8"
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
            className="lg:hidden fixed inset-0 z-[490] bg-[#080808] flex flex-col"
          >
            <div className="h-16 shrink-0" />

            <motion.nav
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex-1 flex flex-col justify-center px-8 gap-1"
            >
              {mobileLinks.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'block py-3 font-raleway text-[2.2rem] font-extralight tracking-wide transition-colors duration-200 border-b border-white/5',
                      pathname === item.href ? 'text-gold-400' : 'text-white/60 hover:text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-8"
              >
                <Link
                  href="/donate"
                  className="inline-flex items-center font-worksans text-[0.65rem] tracking-[0.2em] uppercase bg-gold-500 hover:bg-gold-400 text-[#080808] px-7 h-10 transition-colors duration-300"
                >
                  Donate
                </Link>
              </motion.div>
            </motion.nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="px-8 pb-10 font-worksans text-[0.55rem] tracking-[0.22em] uppercase text-neutral-700"
            >
              ClaudyGod Music Ministries
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
