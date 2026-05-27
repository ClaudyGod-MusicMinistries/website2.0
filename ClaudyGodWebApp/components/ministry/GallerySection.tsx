'use client';

import { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid3X3 } from 'lucide-react';
import { galleryCategories } from '@/data/music';

/* ── Flatten all images with metadata ───────────────────── */
const allImages = galleryCategories.flatMap((cat, catIdx) =>
  cat.images.map((src, imgIdx) => ({
    src,
    label:       cat.title,
    description: cat.description,
    catIdx,
    globalIdx:   0, // filled below
  }))
).map((img, i) => ({ ...img, globalIdx: i }));

/* ── Per-category image sets for tabs ───────────────────── */
type TabId = 'all' | string;

const tabs: { id: TabId; label: string }[] = [
  { id: 'all', label: 'All Photos' },
  ...galleryCategories.map((cat) => ({ id: cat.title, label: cat.title })),
];

/* ── Staggered grid variants ─────────────────────────────── */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 18, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

/* ── Aspect ratio cycle for visual variety ───────────────── */
const aspectCycle = [
  'aspect-square',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[4/3]',
  'aspect-square',
];

export function GallerySection() {
  const [activeTab,   setActiveTab]   = useState<TabId>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  /* Filtered images for active tab */
  const filtered = useMemo(
    () =>
      activeTab === 'all'
        ? allImages
        : allImages.filter((img) => img.label === activeTab),
    [activeTab]
  );

  /* Lightbox helpers — navigate within the filtered set */
  const openAt   = (globalIdx: number) => setLightboxIdx(globalIdx);
  const closeLB  = () => setLightboxIdx(null);

  const filteredIdx = lightboxIdx !== null
    ? filtered.findIndex((img) => img.globalIdx === lightboxIdx)
    : -1;

  const prevLB = useCallback(() => {
    if (filteredIdx < 0) return;
    const prev = (filteredIdx - 1 + filtered.length) % filtered.length;
    setLightboxIdx(filtered[prev].globalIdx);
  }, [filteredIdx, filtered]);

  const nextLB = useCallback(() => {
    if (filteredIdx < 0) return;
    const next = (filteredIdx + 1) % filtered.length;
    setLightboxIdx(filtered[next].globalIdx);
  }, [filteredIdx, filtered]);

  const activeImage = lightboxIdx !== null
    ? allImages.find((img) => img.globalIdx === lightboxIdx) ?? null
    : null;

  /* Keyboard nav */
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  prevLB();
    if (e.key === 'ArrowRight') nextLB();
    if (e.key === 'Escape')     closeLB();
  }, [prevLB, nextLB]);

  /* Find active category description */
  const catDescription =
    activeTab === 'all'
      ? 'A visual journey through ministry moments, worship gatherings, and community impact.'
      : galleryCategories.find((c) => c.title === activeTab)?.description ?? '';

  return (
    <>
      <section
        className="bg-white section-py border-t border-black/[0.05]"
        onKeyDown={onKeyDown}
        tabIndex={-1}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <span className="rule-gold" />
            <span className="label-eyebrow">Gallery</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-bricolage font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight leading-tight mb-2">
                Ministry Moments
              </h2>
              <p className="font-raleway text-neutral-500 text-sm leading-relaxed max-w-lg">
                {catDescription}
              </p>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 shrink-0">
              <Grid3X3 className="h-4 w-4" />
              <span className="font-worksans text-[0.6rem] tracking-[0.12em] uppercase">
                {filtered.length} photo{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto flex-nowrap sm:flex-wrap mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-black/[0.05] -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 px-5 py-2 rounded-full font-worksans text-[0.62rem] tracking-[0.14em] uppercase transition-all duration-300 ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Staggered photo grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
            >
              {filtered.map((img, i) => (
                <motion.div
                  key={`${img.src}-${img.globalIdx}`}
                  variants={itemVariants}
                  className="break-inside-avoid mb-4"
                >
                  <button
                    onClick={() => openAt(img.globalIdx)}
                    className="group relative w-full overflow-hidden rounded-xl bg-cream-100 block"
                    style={{ aspectRatio: aspectCycle[i % aspectCycle.length].replace('aspect-[', '').replace(']', '').replace('/', ':').replace('aspect-square', '1') }}
                    aria-label={`View ${img.label} photo ${i + 1}`}
                  >
                    <div className={`relative w-full ${aspectCycle[i % aspectCycle.length]}`}>
                      <Image
                        src={img.src}
                        alt={`${img.label} — photo ${i + 1}`}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-[1.06]"
                        sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-400" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                          <ZoomIn className="h-4 w-4 text-neutral-800" />
                        </div>
                      </div>
                      {/* Category label on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="font-worksans text-[0.52rem] tracking-[0.12em] uppercase text-white/80 bg-black/40 rounded-md px-2 py-1 inline-block backdrop-blur-sm">
                          {img.label}
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-raleway text-neutral-400 text-sm">No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ───────────────────────────────────────── */}
      <AnimatePresence>
        {activeImage && (
          <>
            {/* Backdrop */}
            <motion.div
              key="lb-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[700] bg-black/96 backdrop-blur-md"
              onClick={closeLB}
            />

            {/* Panel */}
            <motion.div
              key="lb-panel"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-0 z-[701] flex flex-col items-center justify-center p-4 md:p-8 pointer-events-none"
            >
              <div className="w-full max-w-5xl pointer-events-auto">

                {/* Header bar */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <div>
                    <p className="font-bricolage font-semibold text-white text-sm">{activeImage.label}</p>
                    <p className="font-worksans text-[0.54rem] tracking-[0.14em] uppercase text-white/40 mt-0.5">
                      {filteredIdx + 1} of {filtered.length}
                    </p>
                  </div>
                  <button
                    onClick={closeLB}
                    aria-label="Close lightbox"
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
                    className="relative aspect-[4/3] md:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
                  >
                    <Image
                      src={activeImage.src}
                      alt={activeImage.label}
                      fill
                      className="object-contain"
                      sizes="90vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Caption */}
                <p className="font-raleway text-white/50 text-xs leading-relaxed text-center mt-4 max-w-lg mx-auto">
                  {activeImage.description}
                </p>

                {/* Thumbnail strip */}
                <div className="flex items-center gap-2 justify-center mt-5 overflow-x-auto pb-1">
                  {filtered.map((img, i) => {
                    const isActive = img.globalIdx === lightboxIdx;
                    return (
                      <button
                        key={img.globalIdx}
                        onClick={() => setLightboxIdx(img.globalIdx)}
                        aria-label={`View photo ${i + 1}`}
                        className={`relative w-12 h-12 shrink-0 rounded-lg overflow-hidden transition-all duration-200 ring-2 ${
                          isActive ? 'ring-gold-400 opacity-100' : 'ring-transparent opacity-40 hover:opacity-70'
                        }`}
                      >
                        <Image src={img.src} alt="" fill className="object-cover" sizes="48px" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prev / Next arrows */}
              <button
                onClick={prevLB}
                aria-label="Previous photo"
                className="pointer-events-auto fixed left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 backdrop-blur-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextLB}
                aria-label="Next photo"
                className="pointer-events-auto fixed right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 backdrop-blur-sm"
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
