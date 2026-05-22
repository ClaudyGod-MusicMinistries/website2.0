'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryCategories } from '@/data/music';

const allImages = galleryCategories.flatMap((cat) =>
  cat.images.map((src) => ({ src, label: cat.title }))
);

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open  = (src: string) => {
    const idx = allImages.findIndex((img) => img.src === src);
    setActiveIndex(idx);
  };
  const close = () => setActiveIndex(null);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + allImages.length) % allImages.length));
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % allImages.length));
  }, []);

  const activeImage = activeIndex !== null ? allImages[activeIndex] : null;

  return (
    <>
      <section className="bg-white section-py border-t border-black/[0.05]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-14">
            <span className="rule-gold" />
            <span className="label-eyebrow">Gallery</span>
          </div>

          <div className="space-y-16">
            {galleryCategories.map((cat) => (
              <div key={cat.title}>
                <div className="mb-6">
                  <h3 className="font-raleway font-normal text-neutral-900 text-xl tracking-tight mb-1">
                    {cat.title}
                  </h3>
                  <p className="font-raleway text-neutral-500 text-sm font-light leading-relaxed max-w-lg">
                    {cat.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {cat.images.map((src, j) => (
                    <button
                      key={j}
                      onClick={() => open(src)}
                      className="group relative aspect-square overflow-hidden bg-cream-100 rounded-xl"
                    >
                      <Image
                        src={src}
                        alt={`${cat.title} ${j + 1}`}
                        fill
                        className="object-cover opacity-85 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox with prev/next */}
      <AnimatePresence>
        {activeImage && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[600] bg-black/95 backdrop-blur-sm"
              onClick={close}
            />
            <motion.div
              key="lightbox"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[601] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="relative max-w-5xl w-full pointer-events-auto">
                {/* Header bar */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-white/40">
                    {activeImage.label} · {activeIndex! + 1} / {allImages.length}
                  </span>
                  <button
                    onClick={close}
                    aria-label="Close"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="relative aspect-[4/3]"
                  >
                    <Image
                      src={activeImage.src}
                      alt={activeImage.label}
                      fill
                      className="object-contain"
                      sizes="90vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev / Next */}
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
