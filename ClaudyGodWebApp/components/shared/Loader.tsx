'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { AmbientGlow, Particles } from '@/components/ui';

const burstRings = [0, 1, 2];

export function Loader() {
  const [visible,  setVisible]  = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = [
      { target: 35,  delay: 0,    duration: 380  },
      { target: 65,  delay: 380,  duration: 460  },
      { target: 88,  delay: 840,  duration: 380  },
      { target: 100, delay: 1220, duration: 180  },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];
    let currentFrom = 0;

    steps.forEach(({ target, delay, duration }) => {
      const from = currentFrom;
      currentFrom = target;
      timers.push(
        setTimeout(() => {
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const frac    = Math.min(elapsed / duration, 1);
            const eased   = 1 - Math.pow(1 - frac, 3);
            setProgress(Math.round(from + (target - from) * eased));
            if (frac < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }, delay)
      );
    });

    timers.push(setTimeout(() => setVisible(false), 1900));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ clipPath: 'inset(0% 0 0% 0)' }}
          exit={{ clipPath: 'inset(100% 0 0% 0)' }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface-deep select-none overflow-hidden"
        >
          {/* ── Background gradient mesh — same language as the Hero ──── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, #07060f 0%, #1a0f2e 50%, #07060f 100%)' }}
          />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <AmbientGlow color="purple" size={700} opacity={0.20} duration={12} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <AmbientGlow color="gold" size={320} opacity={0.14} duration={9} delay={0.5} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-[62%]" />
          </div>

          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* ── Rising particles — worship "rising up", not random drift ── */}
          <Particles color="gold" glyph="✦" count={9} direction="rise" />

          {/* ── Centre content ───────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-8">

            {/* Glory burst — concentric rings radiating outward, logo
                emerging through the light at the burst's peak, rather
                than a static logo sitting inside a spinning ring. */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
              {burstRings.map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-gold-400/60"
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: [0.3, 1.9], opacity: [0, 0.7, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.55, ease: 'easeOut' }}
                />
              ))}

              {/* Pulsing core glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gold-500/25 blur-xl"
                animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.15, 0.9] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Logo emerging through the burst */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-gold-500/40 bg-white/[0.06] shadow-gold-lg"
              >
                <Image
                  src="/ClaudyGoLogo.webp"
                  alt="ClaudyGod"
                  fill
                  className="object-contain p-2.5"
                  sizes="96px"
                  priority
                />
              </motion.div>
            </div>

            {/* Brand name — staggered reveal */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.p
                className="font-display font-bold text-white text-2xl tracking-widest"
                initial={{ letterSpacing: '0.3em', opacity: 0 }}
                animate={{ letterSpacing: '0.12em', opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.9, ease: 'easeOut' }}
              >
                ClaudyGod
              </motion.p>
              <motion.p
                className="font-sans text-[0.62rem] tracking-[0.32em] uppercase text-neutral-500 mt-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                Music Ministries
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="w-48 sm:w-56"
            >
              <div className="relative h-[3px] bg-white/[0.07] rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-500/60 via-gold-400 to-gold-300 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.04 }}
                />
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
                  animate={{ x: ['-4rem', '14rem'] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-sans text-[0.5rem] tracking-[0.12em] uppercase text-neutral-700">Loading</span>
                <span className="font-sans text-[0.5rem] tracking-[0.1em] text-neutral-600">{progress}%</span>
              </div>
            </motion.div>

            {/* Waveform dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.5 }}
              className="flex items-end gap-1 h-5"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-gold-400/50"
                  animate={{ height: ['6px', '20px', '10px', '18px', '6px'] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* ── Bottom scripture ─────────────────────────── */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="absolute z-10 bottom-6 sm:bottom-10 font-sans italic text-neutral-600/80 text-[0.68rem] sm:text-[0.78rem] tracking-wide px-6 text-center [@media(max-height:500px)]:hidden"
          >
            &ldquo;Sing praises to God, sing praises; sing praises to our King, sing praises.&rdquo;
            <span className="block font-sans not-italic text-[0.54rem] tracking-[0.16em] uppercase text-neutral-700/60 mt-1.5">
              Psalm 47:6
            </span>
          </motion.p>

          {/* ── Wipe-reveal gold seam — tracks the clip-path exit above ── */}
          <motion.div
            initial={{ top: '0%' }}
            exit={{ top: '100%' }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent shadow-gold pointer-events-none z-20"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
