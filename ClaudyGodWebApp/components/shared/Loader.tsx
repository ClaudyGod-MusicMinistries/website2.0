'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/* Floating music note particle */
function MusicNote({ delay, x, size }: { delay: number; x: string; size: number }) {
  return (
    <motion.div
      className="absolute bottom-0 select-none pointer-events-none text-gold-400/20 font-serif"
      style={{ left: x, fontSize: size }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: '-100vh', opacity: [0, 0.6, 0] }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      ♪
    </motion.div>
  );
}

const notes = [
  { delay: 0,    x: '12%',  size: 14 },
  { delay: 0.8,  x: '28%',  size: 10 },
  { delay: 1.4,  x: '55%',  size: 16 },
  { delay: 0.3,  x: '72%',  size: 12 },
  { delay: 1.9,  x: '88%',  size: 10 },
  { delay: 2.5,  x: '40%',  size: 8  },
  { delay: 3.1,  x: '65%',  size: 14 },
];

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
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070611] select-none overflow-hidden"
        >
          {/* ── Background ambience ─────────────────────── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Deep purple core glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-purple-900/25 blur-[140px]" />
            {/* Gold soft glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[62%] w-[280px] h-[280px] rounded-full bg-gold-500/12 blur-[90px]" />
            {/* Subtle grid texture */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            {/* Animated ring 1 */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-purple-700/15"
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Animated ring 2 */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold-500/8"
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />
          </div>

          {/* ── Floating music notes ─────────────────────── */}
          {notes.map((n, i) => (
            <MusicNote key={i} {...n} />
          ))}

          {/* ── Centre content ───────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center gap-8">

            {/* Logo with pulsing ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1,   y: 0  }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Outer animated ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-gold-500/25"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-2 rounded-full border border-dashed border-purple-500/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />
              {/* Pulse glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gold-500/15 blur-md"
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Logo image */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-gold-500/30 bg-white/6 shadow-[0_0_40px_rgba(201,168,76,0.2)]">
                <Image
                  src="/ClaudyGoLogo.webp"
                  alt="ClaudyGod"
                  fill
                  className="object-contain p-2.5"
                  sizes="96px"
                  priority
                />
              </div>
            </motion.div>

            {/* Brand name — staggered reveal */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.p
                className="font-bricolage font-bold text-white text-2xl tracking-widest"
                initial={{ letterSpacing: '0.3em', opacity: 0 }}
                animate={{ letterSpacing: '0.12em', opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.9, ease: 'easeOut' }}
              >
                ClaudyGod
              </motion.p>
              <motion.p
                className="font-worksans text-[0.62rem] tracking-[0.32em] uppercase text-neutral-500 mt-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Music Ministries
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-56"
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
                <span className="font-worksans text-[0.5rem] tracking-[0.12em] uppercase text-neutral-700">Loading</span>
                <span className="font-worksans text-[0.5rem] tracking-[0.1em] text-neutral-600">{progress}%</span>
              </div>
            </motion.div>

            {/* Waveform dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
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
            transition={{ delay: 0.55, duration: 0.9 }}
            className="absolute bottom-10 font-raleway italic text-neutral-600/80 text-[0.78rem] tracking-wide px-6 text-center"
          >
            &ldquo;Sing praises to God, sing praises; sing praises to our King, sing praises.&rdquo;
            <span className="block font-worksans not-italic text-[0.54rem] tracking-[0.16em] uppercase text-neutral-700/60 mt-1.5">
              Psalm 47:6
            </span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
