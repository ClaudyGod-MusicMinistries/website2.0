'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast initial ramp, then slow in the middle, then instant-complete
    const steps = [
      { target: 40,  delay: 0,    duration: 400  },
      { target: 70,  delay: 400,  duration: 500  },
      { target: 90,  delay: 900,  duration: 400  },
      { target: 100, delay: 1300, duration: 200  },
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach(({ target, delay, duration }) => {
      timers.push(
        setTimeout(() => {
          const start = Date.now();
          const from = progress;
          const tick = () => {
            const elapsed = Date.now() - start;
            const frac = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - frac, 3); // ease-out-cubic
            setProgress(Math.round(from + (target - from) * eased));
            if (frac < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }, delay)
      );
    });

    // Hide after animation completes
    timers.push(setTimeout(() => setVisible(false), 1700));

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080808] select-none"
        >
          {/* Radial ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[300px] h-[300px] rounded-full bg-gold-500/10 blur-[80px]" />
          </div>

          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 flex flex-col items-center gap-7"
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-gold-500/30 bg-white/5">
              <Image
                src="/ClaudyGoLogo.webp"
                alt="ClaudyGod"
                fill
                className="object-contain p-2"
                sizes="80px"
                priority
              />
            </div>

            {/* Brand name */}
            <div className="text-center">
              <p className="font-raleway font-semibold text-white text-xl tracking-wide">
                ClaudyGod
              </p>
              <p className="font-worksans text-[0.6rem] tracking-[0.28em] uppercase text-neutral-500 mt-1">
                Music Ministries
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-px bg-white/[0.08] relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-500/60 to-gold-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>

            {/* Animated dots */}
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-1 h-1 rounded-full bg-gold-400/50"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Bottom scripture */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute bottom-10 font-raleway italic text-neutral-700 text-[0.75rem] tracking-wide px-6 text-center"
          >
            &ldquo;Sing praises to God, sing praises.&rdquo; — Psalm 47:6
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
