import type { Variants, Transition } from 'framer-motion';

// ─── Shared transitions ────────────────────────────────────────────────────

export const ease = {
  smooth:   [0.4, 0, 0.2, 1],
  in:       [0.4, 0, 1, 1],
  out:      [0, 0, 0.2, 1],
  spring:   { type: 'spring', stiffness: 120, damping: 14 } as Transition,
  bounce:   { type: 'spring', stiffness: 200, damping: 10 } as Transition,
  gentle:   { type: 'spring', stiffness: 80,  damping: 20 } as Transition,
} as const;

// ─── Fade variants ────────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: ease.smooth } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.smooth } },
  exit:    { opacity: 0, y: 12, transition: { duration: 0.2 } },
};

export const fadeInDown: Variants = {
  hidden:  { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.smooth } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export const fadeInLeft: Variants = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: ease.smooth } },
  exit:    { opacity: 0, x: -16, transition: { duration: 0.2 } },
};

export const fadeInRight: Variants = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: ease.smooth } },
  exit:    { opacity: 0, x: 16, transition: { duration: 0.2 } },
};

// ─── Scale variants ────────────────────────────────────────────────────────

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: ease.spring },
  exit:    { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
};

export const scaleUp: Variants = {
  hidden:  { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: ease.bounce },
  exit:    { opacity: 0, scale: 0.8 },
};

// ─── Slide variants ────────────────────────────────────────────────────────

export const slideInFromLeft: Variants = {
  hidden:  { x: '-100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: ease.smooth } },
  exit:    { x: '-100%', opacity: 0, transition: { duration: 0.3 } },
};

export const slideInFromRight: Variants = {
  hidden:  { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: ease.smooth } },
  exit:    { x: '100%', opacity: 0, transition: { duration: 0.3 } },
};

export const slideInFromBottom: Variants = {
  hidden:  { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: ease.smooth } },
  exit:    { y: '100%', opacity: 0, transition: { duration: 0.3 } },
};

// ─── Stagger containers ────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export const staggerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
};

// ─── Hero-specific ────────────────────────────────────────────────────────

export const heroSlide: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.8, ease: ease.smooth } },
  exit:  (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.8, ease: ease.smooth },
  }),
};

export const heroImage: Variants = {
  hidden:  { scale: 1.08, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: ease.smooth } },
};

// ─── Modal variants ────────────────────────────────────────────────────────

export const modalOverlay: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

export const modalContent: Variants = {
  hidden:  { opacity: 0, scale: 0.92, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: ease.spring },
  exit:    { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.15 } },
};

// ─── Navbar variants ──────────────────────────────────────────────────────

export const navbarSlide: Variants = {
  hidden:  { y: -80, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: ease.smooth } },
};

export const mobileMenu: Variants = {
  hidden:  { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: ease.smooth } },
  exit:    { opacity: 0, height: 0, transition: { duration: 0.25 } },
};
