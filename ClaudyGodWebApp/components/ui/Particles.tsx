'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ParticlesProps {
  /** Character rendered per-particle. */
  glyph?: string;
  color?: 'gold' | 'purple' | 'white';
  count?: number;
  /** 'rise' = straight up, no sway (deliberate/majestic). 'drift' = gentle horizontal sway. */
  direction?: 'rise' | 'drift';
  className?: string;
}

interface ParticleSeed {
  delay: number;
  x: string;
  size: number;
}

/** Deterministic spread (no Math.random) so server/client markup match on first paint. */
function generateSeeds(count: number): ParticleSeed[] {
  return Array.from({ length: count }, (_, i) => ({
    delay: (i * 0.53) % 3.5,
    x: `${8 + ((i * 37) % 84)}%`,
    size: 8 + ((i * 13) % 10),
  }));
}

const COLOR_CLASS = {
  gold: 'text-gold-400/25',
  purple: 'text-purple-400/25',
  white: 'text-white/20',
} as const;

/**
 * Generalized floating-particle field — extracted from the Loader's
 * one-off `MusicNote` helper so the Loader and Hero share one particle
 * system instead of two unrelated implementations.
 */
export function Particles({
  glyph = '●',
  color = 'gold',
  count = 7,
  direction = 'drift',
  className,
}: ParticlesProps) {
  const seeds = useMemo(() => generateSeeds(count), [count]);

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none overflow-hidden select-none', className)}
    >
      {seeds.map((p, i) => (
        <motion.div
          key={i}
          className={cn('absolute bottom-0 font-serif', COLOR_CLASS[color])}
          style={{ left: p.x, fontSize: p.size }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: '-100vh',
            x: direction === 'drift' ? [0, 10, -6, 0] : 0,
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + (p.size % 3),
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {glyph}
        </motion.div>
      ))}
    </div>
  );
}
