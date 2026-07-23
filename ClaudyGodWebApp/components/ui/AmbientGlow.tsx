'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface AmbientGlowProps {
  /** Brand hue — matches the button/shadow token rgb pairs, not a new value. */
  color?: 'gold' | 'purple';
  /** Diameter in px — used for both axes unless width/height are given. */
  size?: number;
  /** Overrides `size` for non-circular (wide/tall) ellipses. */
  width?: number;
  height?: number;
  /** Peak opacity of the radial gradient core. */
  opacity?: number;
  /** Disable the slow drift animation for a static glow. */
  animate?: boolean;
  /** Drift distance in px. */
  drift?: number;
  duration?: number;
  delay?: number;
  /** Positioning — pass Tailwind position utilities, e.g. "-bottom-32 -left-24". */
  className?: string;
}

const GLOW_RGB = {
  gold: '181, 101, 29', // gold-500
  purple: '97, 73, 145', // purple-600
} as const;

/**
 * A single configurable radial-gradient orb, replacing the ~5 hand-rolled
 * copies of this same pattern that had drifted slightly out of sync
 * (Hero, FeaturedVideos, DonateSection, NewsletterBanner, Loader).
 */
export function AmbientGlow({
  color = 'purple',
  size = 600,
  width,
  height,
  opacity = 0.12,
  animate = true,
  drift = 24,
  duration = 18,
  delay = 0,
  className,
}: AmbientGlowProps) {
  const style = {
    width: width ?? size,
    height: height ?? size,
    background: `radial-gradient(ellipse at center, rgba(${GLOW_RGB[color]}, ${opacity}) 0%, transparent 70%)`,
  };

  if (!animate) {
    return <div className={cn('absolute pointer-events-none', className)} style={style} />;
  }

  return (
    <motion.div
      animate={{ x: [0, drift, 0], y: [0, -drift * 0.7, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      className={cn('absolute pointer-events-none', className)}
      style={style}
    />
  );
}
