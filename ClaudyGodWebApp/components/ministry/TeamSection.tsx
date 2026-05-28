'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { teamMembers } from '@/data/music';

const aspectCycle = [
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[4/5]',
  'aspect-square',
  'aspect-[3/4]',
  'aspect-[4/5]',
  'aspect-square',
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden:  { opacity: 0, y: 18, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export function TeamSection() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const prev = useCallback(() =>
    setLightboxIdx((i) => i !== null ? (i - 1 + teamMembers.length) % teamMembers.length : null),
    [],
  );
  const next = useCallback(() =>
    setLightboxIdx((i) => i !== null ? (i + 1) % teamMembers.length : null),
    [],
  );

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape')     setLightboxIdx(null);
  }, [prev, next]);

  return (
    <>
      <section
        className="bg-white section-py border-t border-black/[0.05]"
        onKeyDown={onKeyDown}
        tabIndex={-1}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="rule-gold" />
                <span className="label-eyebrow">The Team</span>
              </div>
              <h2 className="font-bricolage font-bold text-neutral-900 text-3xl sm:text-4xl md:text-5xl tracking-tight">
                Ministry Gallery
              </h2>
              <p className="mt-2 font-raleway text-neutral-500 text-sm leading-relaxed max-w-md">
                The dedicated people behind the mission — serving with purpose, faith, and joy.
              </p>
            </div>
            <p className="font-worksans text-[0.6rem] tracking-[0.12em] uppercase text-neutral-400 shrink-0">
              {teamMembers.length} photos
            </p>
          </div>

          {/* Masonry photo grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4"
          >
            {teamMembers.map((member, i) => (
              <motion.div key={member.id} variants={item} className="break-inside-avoid mb-3 sm:mb-4">
                <button
                  onClick={() => setLightboxIdx(i)}
                  className={`group relative w-full overflow-hidden rounded-xl bg-neutral-100 block ${aspectCycle[i % aspectCycle.length]}`}
                  aria-label={`View ministry photo ${i + 1}`}
                >
                  <Image
                    src={member.image}
                    alt={`Ministry team photo ${i + 1}`}
                    fill
                    unoptimized
                    className="object-cover object-center transition-all duration-500 group-hover:scale-[1.06]"
                    sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-400" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <ZoomIn className="h-4 w-4 text-neutral-800" />
                    </div>
                  </div>
                  {/* Photo number badge */}
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-worksans text-[0.48rem] tracking-[0.12em] uppercase text-white/75 bg-black/40 rounded-md px-2 py-1 inline-block backdrop-blur-sm">
                      Photo {i + 1}
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <>
            <motion.div
              key="lb-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[700] bg-black/96 backdrop-blur-md"
              onClick={() => setLightboxIdx(null)}
            />

            <motion.div
              key="lb-panel"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-0 z-[701] flex flex-col items-center justify-center p-4 md:p-8 pointer-events-none"
            >
              <div className="w-full max-w-xl pointer-events-auto">

                {/* Top bar */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <p className="font-worksans text-[0.54rem] tracking-[0.14em] uppercase text-white/40">
                    {lightboxIdx + 1} / {teamMembers.length}
                  </p>
                  <button
                    onClick={() => setLightboxIdx(null)}
                    aria-label="Close"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Main image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightboxIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22 }}
                    className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
                  >
                    <Image
                      src={teamMembers[lightboxIdx].image}
                      alt={`Ministry team photo ${lightboxIdx + 1}`}
                      fill
                      unoptimized
                      className="object-cover object-center"
                      sizes="80vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Thumbnail strip */}
                <div className="flex items-center gap-2 justify-center mt-4 overflow-x-auto pb-1">
                  {teamMembers.map((m, i) => (
                    <button
                      key={m.id}
                      onClick={() => setLightboxIdx(i)}
                      aria-label={`View photo ${i + 1}`}
                      className={`relative w-10 h-10 shrink-0 rounded-lg overflow-hidden transition-all duration-200 ring-2 ${
                        i === lightboxIdx ? 'ring-gold-400 opacity-100' : 'ring-transparent opacity-40 hover:opacity-70'
                      }`}
                    >
                      <Image src={m.image} alt="" fill unoptimized className="object-cover" sizes="40px" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Prev / Next */}
              <button
                onClick={prev}
                aria-label="Previous photo"
                className="pointer-events-auto fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 backdrop-blur-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next photo"
                className="pointer-events-auto fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 backdrop-blur-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
