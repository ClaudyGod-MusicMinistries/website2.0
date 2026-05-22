'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  { value: 20,   suffix: '+', label: 'Years of Ministry',  description: 'Serving God faithfully since 2003' },
  { value: 7,    suffix: '',  label: 'Albums Released',    description: 'Spirit-filled worship collections' },
  { value: 100,  suffix: '+', label: 'Live Concerts',      description: 'Across Nigeria and beyond' },
  { value: 10,   suffix: 'K+', label: 'Lives Touched',    description: 'Through music and ministry' },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
      else setCount(target);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, target]);

  return (
    <span>
      {count}
      <span className="text-gold-500">{suffix}</span>
    </span>
  );
}

export function MinistryStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-cream-100 border-t border-b border-black/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-black/[0.07]">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col lg:px-10 first:lg:pl-0 last:lg:pr-0"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
              }}
            >
              <p className="font-raleway font-medium text-neutral-900 text-4xl md:text-5xl tracking-tight leading-none mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} active={isInView} />
              </p>
              <p className="font-worksans text-[0.6rem] tracking-[0.2em] uppercase text-purple-600 mb-1.5">
                {stat.label}
              </p>
              <p className="font-raleway text-neutral-500 text-xs leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
