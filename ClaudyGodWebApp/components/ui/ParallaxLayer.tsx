'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ParallaxLayerProps {
  /** Max drift in px as the layer scrolls through view. */
  distance?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Wraps an image/background layer with a subtle scroll-linked drift.
 * Applied deliberately to a handful of real spots (About page portraits,
 * TheArtist section) rather than blanket-applied across every image —
 * parallax on everything reads as gimmicky and costs performance.
 *
 * The inner layer is taller than its container by 2x `distance` so the
 * translateY range never exposes empty edges.
 */
export function ParallaxLayer({ distance = 50, className, children }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        style={{ y, top: -distance, height: `calc(100% + ${distance * 2}px)` }}
        className="absolute inset-x-0"
      >
        {children}
      </motion.div>
    </div>
  );
}
