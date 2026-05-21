'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { galleryCategories } from '@/data/music';

export function GallerySection() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      <section className="bg-[#0a0a0a] section-py border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-14">
            <span className="rule-gold" />
            <span className="label-eyebrow">Gallery</span>
          </div>

          <div className="space-y-20">
            {galleryCategories.map((cat) => (
              <div key={cat.title}>
                <div className="mb-6">
                  <h3 className="font-raleway font-light text-white text-xl tracking-tight mb-1">
                    {cat.title}
                  </h3>
                  <p className="font-raleway text-neutral-600 text-sm font-light leading-relaxed max-w-lg">
                    {cat.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/[0.04]">
                  {cat.images.map((src, j) => (
                    <button
                      key={j}
                      onClick={() => setLightboxSrc(src)}
                      className="group relative aspect-square overflow-hidden bg-[#0a0a0a]"
                    >
                      <Image
                        src={src}
                        alt={`${cat.title} ${j + 1}`}
                        fill
                        className="object-cover opacity-70 group-hover:opacity-95 transition-all duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 50vw, 25vw"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[600] bg-black/95"
              onClick={() => setLightboxSrc(null)}
            />
            <motion.div
              key="image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[601] flex items-center justify-center p-6 pointer-events-none"
            >
              <div className="relative max-w-4xl w-full max-h-[85vh] pointer-events-auto">
                <button
                  onClick={() => setLightboxSrc(null)}
                  aria-label="Close"
                  className="absolute -top-10 right-0 text-white/40 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={lightboxSrc}
                    alt="Gallery image"
                    fill
                    className="object-contain"
                    sizes="90vw"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
