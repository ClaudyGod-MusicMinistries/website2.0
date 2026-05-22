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

  /* Dynamic classes based on scroll state */
  const headerBg  = scrolled
    ? 'bg-white/96 backdrop-blur-2xl border-b border-black/[0.07] shadow-[0_1px_12px_rgba(0,0,0,0.07)]'
    : 'bg-transparent';

  const linkBase  = 'font-worksans text-[0.6rem] tracking-[0.2em] uppercase transition-colors duration-300';
  const linkColor = scrolled
    ? 'text-neutral-600 hover:text-neutral-900'
    : 'text-white/80 hover:text-white';
  const activeColor = scrolled ? 'text-purple-600' : 'text-gold-400';

  return (
    <>
      <header className={cn('fixed top-0 inset-x-0 z-[500] transition-all duration-400', headerBg)}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between gap-6">

          {/* Brand lockup — logo + ClaudyGod · Music · Ministries */}
          <Link href="/" className="shrink-0 flex items-center gap-3 group">
            <Image
              src="/ClaudyGoLogo.webp"
              alt="ClaudyGod"
              width={38}
              height={38}
              className="object-contain flex-shrink-0"
              priority
            />
            <div className={cn(
              'hidden md:flex items-center gap-2 transition-colors duration-300',
              scrolled ? 'text-neutral-800' : 'text-white/95'
            )}>
              <span className="font-raleway font-semibold text-[0.95rem] tracking-tight leading-none">
                ClaudyGod
              </span>
              <span className="w-px h-3.5 bg-current opacity-20" />
              <span className="font-worksans text-[0.5rem] tracking-[0.2em] uppercase opacity-60">
                Music
              </span>
              <span className="w-px h-3.5 bg-current opacity-20" />
              <span className="font-worksans text-[0.5rem] tracking-[0.2em] uppercase opacity-60">
                Ministries
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
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

          {/* Desktop right: Cart + Bookings */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <CartIcon />
            {bookingLink && (
              <Link
                href={bookingLink.href}
                className={cn(
                  'font-worksans text-[0.6rem] tracking-[0.2em] uppercase px-5 h-9 inline-flex items-center transition-all duration-300',
                  scrolled
                    ? 'text-white bg-purple-600 hover:bg-purple-500'
                    : 'text-white border border-white/25 hover:border-white/60 hover:bg-white/10'
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
              'lg:hidden relative z-[510] flex items-center justify-center w-9 h-9',
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
            <div className="h-[72px] shrink-0 border-b border-white/[0.05] flex items-center px-6">
              <div className="flex items-center gap-2.5 text-white">
                <Image
                  src="/ClaudyGoLogo.webp"
                  alt="ClaudyGod"
                  width={34}
                  height={34}
                  className="object-contain"
                />
                <span className="font-raleway font-semibold text-sm tracking-tight">ClaudyGod</span>
              </div>
            </div>

            <motion.nav
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="flex-1 flex flex-col justify-center px-8 gap-1"
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
                      'block py-3 font-raleway font-light text-[2rem] tracking-wide transition-colors duration-200 border-b border-white/[0.05]',
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
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center gap-3"
              >
                {bookingLink && (
                  <Link
                    href={bookingLink.href}
                    className="inline-flex items-center font-worksans text-[0.6rem] tracking-[0.2em] uppercase bg-purple-600 hover:bg-purple-500 text-white px-7 h-10 transition-colors duration-300"
                  >
                    Book Now
                  </Link>
                )}
                <Link
                  href="/donate"
                  className="inline-flex items-center font-worksans text-[0.6rem] tracking-[0.2em] uppercase bg-gold-500 hover:bg-gold-400 text-[#080808] px-7 h-10 transition-colors duration-300"
                >
                  Donate
                </Link>
              </motion.div>
            </motion.nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="px-8 pb-10 font-worksans text-[0.5rem] tracking-[0.22em] uppercase text-white/30"
            >
              ClaudyGod Music Ministries © {new Date().getFullYear()}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
