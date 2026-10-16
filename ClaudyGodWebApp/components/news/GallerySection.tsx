'use client';

import { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  MapPin,
  Globe2,
  CalendarCheck,
  Users2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Send,
  Eye,
} from 'lucide-react';
import { tourStates, nextDestinations, type TourPhoto, type TourState } from '@/data/Tour';
import { Button } from '@/components/ui/Button';

/* ── Flatten all state photos with complete indexation ───────── */
interface IndexedPhoto extends TourPhoto {
  stateId: string;
  stateName: string;
  globalIdx: number;
}

const allPhotos: IndexedPhoto[] = tourStates
  .flatMap((state) =>
    state.photos.map((photo) => ({
      ...photo,
      stateId: state.id,
      stateName: state.stateName,
      globalIdx: 0,
    }))
  )
  .map((photo, i) => ({ ...photo, globalIdx: i }));

type TabMode = 'all' | 'portharcourt' | 'lagos' | 'abuja' | 'imo' | 'abia' | 'global';

interface TabItem {
  id: TabMode;
  label: string;
  badge?: string;
  icon?: typeof MapPin;
}

const tabs: TabItem[] = [
  { id: 'all', label: 'All 5 States', badge: `${allPhotos.length} Photos` },
  { id: 'portharcourt', label: 'Port Harcourt', badge: 'Rivers' },
  { id: 'lagos', label: 'Lagos', badge: 'Commercial Hub' },
  { id: 'abuja', label: 'Abuja', badge: 'FCT Capital' },
  { id: 'imo', label: 'Imo', badge: 'Owerri' },
  { id: 'abia', label: 'Abia', badge: 'Aba & Umuahia' },
  { id: 'global', label: 'Global Horizon', badge: 'Next Stops', icon: Globe2 },
];

/* ── Animation presets ────────────────────────────────────────── */
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export function GallerySection() {
  const [activeTab, setActiveTab] = useState<TabMode>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  /* Active state details (if filtered by a single state) */
  const activeState: TourState | undefined = useMemo(
    () => tourStates.find((s) => s.id === activeTab),
    [activeTab]
  );

  /* Filtered photos for active tab (for lightbox navigation) */
  const visiblePhotos: IndexedPhoto[] = useMemo(() => {
    if (activeTab === 'all') return allPhotos;
    if (activeTab === 'global') return [];
    return allPhotos.filter((p) => p.stateId === activeTab);
  }, [activeTab]);

  /* Lightbox handlers */
  const openAt = (globalIdx: number) => setLightboxIdx(globalIdx);
  const closeLB = () => setLightboxIdx(null);

  const filteredIdx =
    lightboxIdx !== null ? visiblePhotos.findIndex((p) => p.globalIdx === lightboxIdx) : -1;

  const prevLB = useCallback(() => {
    if (filteredIdx < 0 || visiblePhotos.length === 0) return;
    const prev = (filteredIdx - 1 + visiblePhotos.length) % visiblePhotos.length;
    setLightboxIdx(visiblePhotos[prev].globalIdx);
  }, [filteredIdx, visiblePhotos]);

  const nextLB = useCallback(() => {
    if (filteredIdx < 0 || visiblePhotos.length === 0) return;
    const next = (filteredIdx + 1) % visiblePhotos.length;
    setLightboxIdx(visiblePhotos[next].globalIdx);
  }, [filteredIdx, visiblePhotos]);

  const activeImage =
    lightboxIdx !== null ? (allPhotos.find((p) => p.globalIdx === lightboxIdx) ?? null) : null;

  /* Keyboard listener */
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevLB();
      if (e.key === 'ArrowRight') nextLB();
      if (e.key === 'Escape') closeLB();
    },
    [prevLB, nextLB]
  );

  return (
    <>
      <section
        className="relative bg-white section-py overflow-hidden border-t border-neutral-200/80"
        onKeyDown={onKeyDown}
        tabIndex={-1}
      >
        <div className="container-site relative z-10">
          {/* ── Section Header ────────────────────────────────────── */}
          <div className="max-w-3xl mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="rule-gold" />
              <span className="label-eyebrow">Past Outings & The Global Calling</span>
            </div>

            <h2 className="font-raleway font-light text-neutral-900 text-3xl sm:text-4xl md:text-5xl tracking-normal leading-tight mb-3">
              Where We&rsquo;ve Been &amp; The Journey Ahead
            </h2>

            <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
              Minister ClaudyGod has ministered across Abia, Imo, Port Harcourt, Abuja, and Lagos —
              carrying Spirit-filled worship, community outreach, and campus revivals. Explore each
              tour state below, and discover our expanding global horizon.
            </p>
          </div>

          {/* ── High-End Tour Metrics Strip (WordPress/Wix style) ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 shadow-2xs hover:shadow-card-light transition-all duration-300">
              <div className="flex items-center gap-2 text-gold-500 mb-1.5">
                <MapPin className="h-4 w-4" />
                <span className="font-sans text-[0.68rem] tracking-wider uppercase font-semibold text-neutral-500">
                  Nigerian Tour
                </span>
              </div>
              <p className="font-display font-bold text-purple-900 text-2xl sm:text-3xl">
                5 States
              </p>
              <p className="font-sans text-neutral-600 text-xs mt-1">
                Abia, Imo, Port Harcourt, Abuja, Lagos
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 shadow-2xs hover:shadow-card-light transition-all duration-300">
              <div className="flex items-center gap-2 text-purple-600 mb-1.5">
                <CalendarCheck className="h-4 w-4" />
                <span className="font-sans text-[0.68rem] tracking-wider uppercase font-semibold text-neutral-500">
                  Outings Completed
                </span>
              </div>
              <p className="font-display font-bold text-purple-900 text-2xl sm:text-3xl">
                26+ Outings
              </p>
              <p className="font-sans text-neutral-600 text-xs mt-1">
                Concerts, campus rallies &amp; outreach
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 shadow-2xs hover:shadow-card-light transition-all duration-300">
              <div className="flex items-center gap-2 text-gold-500 mb-1.5">
                <Users2 className="h-4 w-4" />
                <span className="font-sans text-[0.68rem] tracking-wider uppercase font-semibold text-neutral-500">
                  Worshippers Touched
                </span>
              </div>
              <p className="font-display font-bold text-purple-900 text-2xl sm:text-3xl">43,000+</p>
              <p className="font-sans text-neutral-600 text-xs mt-1">
                Joined in surrender &amp; salvation
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 shadow-2xs hover:shadow-card-light transition-all duration-300">
              <div className="flex items-center gap-2 text-purple-600 mb-1.5">
                <Globe2 className="h-4 w-4" />
                <span className="font-sans text-[0.68rem] tracking-wider uppercase font-semibold text-neutral-500">
                  Global Horizon
                </span>
              </div>
              <p className="font-display font-bold text-gold-600 text-2xl sm:text-3xl">Expanding</p>
              <p className="font-sans text-neutral-600 text-xs mt-1">
                UK, US, Sierra Leone, Ghana &amp; beyond
              </p>
            </div>
          </div>

          {/* ── Interactive State Navigation Tabs (Wix / WP High-End Pills) ── */}
          <div className="relative mb-8 sm:mb-12">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 sm:pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const IconComponent = tab.icon ?? MapPin;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-sans tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-950 text-white shadow-md'
                        : 'bg-neutral-100/90 text-neutral-700 hover:bg-neutral-200/80 hover:text-purple-950 border border-neutral-200/70'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeTourTab"
                        className="absolute inset-0 rounded-full bg-purple-950"
                        transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5 font-medium">
                      <IconComponent
                        className={`h-3.5 w-3.5 ${isActive ? 'text-gold-300' : 'text-neutral-500'}`}
                      />
                      {tab.label}
                    </span>
                    {tab.badge && (
                      <span
                        className={`relative z-10 text-[0.62rem] px-2 py-0.5 rounded-full font-medium ${
                          isActive
                            ? 'bg-purple-800 text-purple-200'
                            : 'bg-neutral-200/90 text-neutral-600'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── State Detail Showcase (Rendered when a specific single state is selected) ── */}
          <AnimatePresence mode="wait">
            {activeState && (
              <motion.div
                key={activeState.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mb-10 sm:mb-14 p-6 sm:p-8 lg:p-10 rounded-3xl bg-neutral-50/70 border border-neutral-200/90 shadow-card-light"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-sans font-semibold bg-purple-900 text-white">
                        <MapPin className="h-3 w-3 text-gold-400" />
                        {activeState.stateName} &bull; {activeState.region}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-sans font-medium bg-gold-400/20 text-gold-700 border border-gold-400/40">
                        <Sparkles className="h-3 w-3" />
                        {activeState.badge}
                      </span>
                    </div>

                    <h3 className="font-raleway font-semibold text-neutral-900 text-2xl sm:text-3xl leading-snug mb-3">
                      {activeState.theme}
                    </h3>

                    <p className="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                      {activeState.description}
                    </p>

                    {activeState.quote && (
                      <blockquote className="p-4 rounded-xl bg-white border-l-4 border-gold-500 shadow-2xs mb-6">
                        <p className="font-serif italic text-purple-950 text-sm sm:text-base leading-relaxed">
                          &ldquo;{activeState.quote}&rdquo;
                        </p>
                      </blockquote>
                    )}

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-6">
                      <p className="font-sans text-xs tracking-wider uppercase font-bold text-neutral-500">
                        Outing Highlights &amp; Encounters
                      </p>
                      {activeState.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-sans"
                        >
                          <CheckCircle2 className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* State Impact Stats */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-200">
                      <div>
                        <span className="font-display font-bold text-purple-900 text-lg sm:text-xl block">
                          {activeState.stats.worshippers}
                        </span>
                        <span className="font-sans text-[0.68rem] sm:text-xs text-neutral-500">
                          Attendees
                        </span>
                      </div>
                      <div>
                        <span className="font-display font-bold text-purple-900 text-lg sm:text-xl block">
                          {activeState.stats.gatherings}
                        </span>
                        <span className="font-sans text-[0.68rem] sm:text-xs text-neutral-500">
                          Meetings
                        </span>
                      </div>
                      <div>
                        <span className="font-sans font-semibold text-neutral-800 text-xs sm:text-sm block truncate">
                          {activeState.stats.keyVenue}
                        </span>
                        <span className="font-sans text-[0.68rem] sm:text-xs text-neutral-500">
                          Key Venue
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Feature Image for the active state */}
                  {activeState.photos[0] && (
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card-light-lg border border-neutral-200/90 group">
                      <Image
                        src={activeState.photos[0].src}
                        alt={`${activeState.stateName} tour highlight`}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[0.62rem] font-sans font-bold uppercase tracking-wider bg-gold-500 text-purple-950 mb-1">
                          Featured Outing
                        </span>
                        <p className="font-sans text-xs sm:text-sm text-white line-clamp-2">
                          {activeState.photos[0].caption}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── PHOTO PRESENTATION: DISTINCT SECTIONS BY STATE (When All States is active) ── */}
          {activeTab === 'all' && (
            <div className="space-y-12 sm:space-y-16">
              {tourStates.map((state, stateIndex) => (
                <div
                  key={state.id}
                  className="p-5 sm:p-7 lg:p-8 rounded-3xl bg-neutral-50/60 border border-neutral-200/80 transition-all duration-300"
                >
                  {/* State Section Sub-Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b border-neutral-200/70">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[0.68rem] font-sans font-bold tracking-widest uppercase text-gold-600 bg-gold-400/15 px-2.5 py-0.5 rounded-full">
                          Chapter 0{stateIndex + 1} &bull; {state.region}
                        </span>
                        <span className="text-neutral-400 text-xs hidden sm:inline">&bull;</span>
                        <span className="text-xs font-sans text-neutral-500 hidden sm:inline">
                          {state.photos.length} Photos
                        </span>
                      </div>
                      <h3 className="font-raleway font-semibold text-neutral-900 text-xl sm:text-2xl">
                        {state.stateName} &mdash;{' '}
                        <span className="font-normal text-neutral-600 text-base sm:text-xl">
                          {state.theme}
                        </span>
                      </h3>
                      <p className="font-sans text-neutral-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                        {state.description}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab(state.id as TabMode)}
                      className="self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-medium text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
                    >
                      <span>Focus {state.stateName}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Clean, Responsive Photo Grid (2 columns on mobile, 3-4 on larger screens) */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                    {state.photos.map((photo) => {
                      const globalIdx = allPhotos.findIndex((p) => p.src === photo.src);
                      return (
                        <div
                          key={photo.src}
                          className="group rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-card-light-hover hover:border-gold-400/80 transition-all duration-300 overflow-hidden flex flex-col"
                        >
                          <button
                            onClick={() => openAt(globalIdx >= 0 ? globalIdx : 0)}
                            className="w-full text-left focus:outline-hidden flex-1 flex flex-col"
                            aria-label={`View photo from ${photo.city}`}
                          >
                            {/* Photo Container — Crisp, vibrant, unobscured */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                              <Image
                                src={photo.src}
                                alt={photo.caption}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                              />

                              {/* Hover center view badge */}
                              <div className="absolute inset-0 bg-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-purple-950 text-xs font-sans font-semibold shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                  <Eye className="h-3.5 w-3.5 text-gold-500" />
                                  <span className="hidden sm:inline">Enlarge</span>
                                </span>
                              </div>
                            </div>

                            {/* Card Body — Clean typography placed beneath the photo */}
                            <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between bg-white">
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1.5">
                                  <span className="inline-flex items-center gap-1 text-[0.62rem] sm:text-[0.68rem] font-sans font-semibold text-purple-950 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                                    <MapPin className="h-2.5 w-2.5 text-gold-500 shrink-0" />
                                    {photo.city}
                                  </span>
                                  <span className="text-[0.58rem] sm:text-[0.62rem] font-sans font-medium text-neutral-500 px-1.5 py-0.5 rounded bg-neutral-100">
                                    {photo.category}
                                  </span>
                                </div>

                                <p className="font-sans text-[0.72rem] sm:text-xs text-neutral-700 leading-snug line-clamp-2">
                                  {photo.caption}
                                </p>
                              </div>
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── PHOTO PRESENTATION: SINGLE STATE VIEW (When an individual state is selected) ── */}
          {activeTab !== 'all' && activeTab !== 'global' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-raleway font-semibold text-neutral-900 text-xl sm:text-2xl">
                    {activeState?.stateName} Photo Gallery
                  </h3>
                  <p className="font-sans text-neutral-500 text-xs sm:text-sm mt-0.5">
                    Click any photo to explore the full story, location, and high-resolution view.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('all')}
                  className="inline-flex items-center gap-1 text-xs font-sans text-purple-900 hover:text-gold-600 font-medium"
                >
                  <span>&larr; View All States</span>
                </button>
              </div>

              <motion.div
                key={activeTab}
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
              >
                {visiblePhotos.map((img) => (
                  <motion.div
                    key={`${img.src}-${img.globalIdx}`}
                    variants={itemVariants}
                    className="group rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-card-light-hover hover:border-gold-400/80 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    <button
                      onClick={() => openAt(img.globalIdx)}
                      className="w-full text-left focus:outline-hidden flex-1 flex flex-col"
                      aria-label={`View photo from ${img.city}, ${img.state}`}
                    >
                      {/* Photo Area — Clean, unobstructed */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                        <Image
                          src={img.src}
                          alt={img.caption}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                        />

                        {/* Hover center view badge */}
                        <div className="absolute inset-0 bg-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-purple-950 text-xs font-sans font-semibold shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            <Eye className="h-3.5 w-3.5 text-gold-500" />
                            <span className="hidden sm:inline">Enlarge</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between bg-white">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="inline-flex items-center gap-1 text-[0.62rem] sm:text-[0.68rem] font-sans font-semibold text-purple-950 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                              <MapPin className="h-2.5 w-2.5 text-gold-500 shrink-0" />
                              {img.city}
                            </span>
                            <span className="text-[0.58rem] sm:text-[0.62rem] font-sans font-medium text-neutral-500 px-1.5 py-0.5 rounded bg-neutral-100">
                              {img.category}
                            </span>
                          </div>

                          <p className="font-sans text-[0.72rem] sm:text-xs text-neutral-700 leading-snug line-clamp-2">
                            {img.caption}
                          </p>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* ── Global Horizon & Next Destinations Section ───────── */}
          <div className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-neutral-200/90">
            <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 text-white shadow-card-light-lg relative overflow-hidden">
              {/* Subtle background glow */}
              <div
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gold-400/10 blur-3xl pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="max-w-2xl mb-8 sm:mb-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold tracking-wider uppercase bg-gold-400/20 text-gold-300 border border-gold-400/30 mb-4">
                    <Globe2 className="h-3.5 w-3.5" />
                    Expanding Beyond Borders
                  </div>

                  <h3 className="font-raleway font-light text-white text-2xl sm:text-3xl md:text-4xl leading-tight mb-3">
                    The Global Calling &amp; Next Tour Horizons
                  </h3>

                  <p className="font-sans text-purple-200/90 text-sm sm:text-base leading-relaxed">
                    Minister ClaudyGod is preparing to carry the sound of revival to additional
                    states across Nigeria and the global diaspora. See our upcoming target cities,
                    or submit a formal invitation to host a worship gathering in your area.
                  </p>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
                  {nextDestinations.map((dest, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-purple-900/60 border border-purple-800/70 hover:border-gold-400/60 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl" role="img" aria-label="country flag">
                            {dest.flag}
                          </span>
                          <span className="font-display font-bold text-white text-base">
                            {dest.city}
                          </span>
                        </div>
                        <span
                          className={`text-[0.62rem] font-sans font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            dest.status === 'Confirmed'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : dest.status === 'Planning'
                                ? 'bg-gold-400/20 text-gold-300 border border-gold-400/40'
                                : 'bg-purple-800/80 text-purple-200 border border-purple-700'
                          }`}
                        >
                          {dest.status}
                        </span>
                      </div>

                      <p className="font-sans text-xs text-purple-300 font-medium mb-1">
                        {dest.regionOrCountry}
                      </p>
                      <p className="font-sans text-xs text-purple-200/80 leading-relaxed">
                        {dest.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Interactive Booking & Partnership Call to Action */}
                <div className="p-6 sm:p-8 rounded-2xl bg-purple-950/80 border border-purple-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="font-raleway font-semibold text-white text-lg sm:text-xl mb-1">
                      Bring the Tour to Your City or Fellowship
                    </h4>
                    <p className="font-sans text-purple-300 text-xs sm:text-sm max-w-xl">
                      Church leadership, conference hosts, and ministry coordinators can submit a
                      formal tour invitation or partner with our outreach mission.
                    </p>
                  </div>

                  {/* Standard high-end buttons — w-auto inline-flex, never stretched */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <Button
                      href="/bookings"
                      variant="primary"
                      size="lg"
                      uppercase
                      rightIcon={
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      }
                    >
                      Request Tour Stop
                    </Button>
                    <Button
                      href="/contact"
                      variant="outline-white"
                      size="lg"
                      uppercase
                      rightIcon={<Send className="h-3.5 w-3.5" />}
                    >
                      Partner With Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── High-End Lightbox Modal ─────────────────────────── */}
      <AnimatePresence>
        {activeImage && (
          <>
            <motion.div
              key="lb-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[700] bg-black/96 backdrop-blur-md"
              onClick={closeLB}
            />

            <motion.div
              key="lb-panel"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[701] flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 pointer-events-none"
            >
              <div className="w-full max-w-5xl pointer-events-auto flex flex-col max-h-[92vh]">
                {/* Header Bar */}
                <div className="flex items-center justify-between gap-4 mb-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-sans font-semibold bg-purple-900 text-gold-300">
                      <MapPin className="h-3 w-3" />
                      {activeImage.city}, {activeImage.state}
                    </span>
                    <span className="text-neutral-400 text-xs font-sans hidden sm:inline">
                      &bull; {activeImage.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-neutral-400 text-xs font-sans">
                      {filteredIdx >= 0 ? `${filteredIdx + 1} / ${visiblePhotos.length}` : ''}
                    </span>
                    <button
                      onClick={closeLB}
                      aria-label="Close photo view"
                      className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Main Image Frame */}
                <div className="relative flex-1 min-h-[260px] sm:min-h-[460px] max-h-[72vh] rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                  <Image
                    src={activeImage.src}
                    alt={activeImage.caption}
                    fill
                    unoptimized
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />

                  {/* Previous / Next buttons */}
                  {visiblePhotos.length > 1 && (
                    <>
                      <button
                        onClick={prevLB}
                        aria-label="Previous photo"
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all border border-white/10 hover:border-gold-400"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextLB}
                        aria-label="Next photo"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all border border-white/10 hover:border-gold-400"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Bottom Caption */}
                <div className="mt-3 px-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <p className="font-sans text-xs sm:text-sm text-neutral-200 leading-snug">
                    {activeImage.caption}
                  </p>
                  <span className="font-sans text-xs text-gold-400 shrink-0">
                    Minister ClaudyGod Tour Archives
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
