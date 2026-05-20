'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navigationItems } from '@/data/navbar';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { IconButton } from '@/components/ui/IconButton';
import { mobileMenu, navbarSlide } from '@/utils/animations';
import { cn } from '@/utils/cn';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = navigationItems.filter((item) => item.label !== 'Donate');
  const donateItem = navigationItems.find((item) => item.label === 'Donate');

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navbarSlide}
      className={cn(
        'fixed top-0 left-0 right-0 z-sticky navbar-blur transition-colors duration-300',
        scrolled && 'border-b border-surface-border'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[var(--navbar-height)]">
          {/* Logo */}
          <Link href="/" className="font-abril text-gold-500 text-2xl tracking-wide shrink-0">
            ClaudyGod
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-bricolage font-medium rounded-md transition-colors duration-200',
                    'underline-gold',
                    active
                      ? 'text-gold-500'
                      : 'text-neutral-300 hover:text-gold-400'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {donateItem && (
              <Link
                href={donateItem.href}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm', uppercase: true }))}
              >
                {donateItem.label}
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <IconButton
            label={mobileOpen ? 'Close menu' : 'Open menu'}
            variant="ghost"
            size="md"
            className="lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </IconButton>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenu}
            className="lg:hidden overflow-hidden border-t border-surface-border bg-surface-base/95 backdrop-blur-md"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {navigationItems.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;

                if (item.label === 'Donate') {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        buttonVariants({ variant: 'outline', fullWidth: true, uppercase: true }),
                        'mt-2 gap-2'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bricolage font-medium transition-colors duration-200',
                      active
                        ? 'bg-gold-500/10 text-gold-500'
                        : 'text-neutral-300 hover:bg-surface-elevated hover:text-gold-400'
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
