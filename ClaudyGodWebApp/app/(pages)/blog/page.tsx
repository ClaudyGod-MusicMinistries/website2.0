'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X, Calendar, MapPin, Clock, ExternalLink, Music2, Mic2, CalendarDays } from 'lucide-react';
import { FaSpotify, FaApple, FaYoutube, FaDeezer } from 'react-icons/fa6';
import { PageHero } from '@/components/shared/PageHero';
import { interviewVideos } from '@/data/interviews';
import { tourDates, newsAlbums } from '@/data/news';
import { cn } from '@/utils/cn';

const tabs = ['All', 'Releases', 'Interviews', 'Events & Tours'] as const;
type Tab = (typeof tabs)[number];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

// ── Release card ──────────────────────────────────────────────────────────────
function ReleaseCard({ album }: { album: typeof newsAlbums[number] }) {
  return (
    <motion.div variants={item}>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_36px_rgba(0,0,0,0.11)] border border-black/[0.04] hover:border-purple-200/60 transition-all duration-400 flex flex-col h-full">
        {/* Album artwork — fixed height */}
        <div className="relative h-52 overflow-hidden flex-shrink-0 bg-neutral-100">
          <Image
            src={album.image}
            alt={album.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className="absolute top-3 left-3 font-worksans text-[0.52rem] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full font-medium bg-gold-100 text-gold-700">
            Release
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col p-6">
          <h3 className="font-bricolage font-bold text-neutral-900 text-lg leading-snug mb-1 group-hover:text-purple-700 transition-colors duration-300">
            {album.title}
          </h3>
          <p className="font-worksans text-[0.52rem] tracking-[0.14em] uppercase text-neutral-400 mb-4">
            Available on all platforms
          </p>

          {/* Streaming links */}
          <div className="flex items-center gap-2.5 mt-auto">
            <a href={album.links.spotify} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 hover:text-[#1DB954] hover:border-[#1DB954]/40 hover:bg-[#1DB954]/5 transition-all duration-300">
              <FaSpotify className="h-4 w-4" />
            </a>
            <a href={album.links.apple} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:border-neutral-400 transition-all duration-300">
              <FaApple className="h-4 w-4" />
            </a>
            <a href={album.links.youtube} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 hover:text-[#FF0000] hover:border-[#FF0000]/40 hover:bg-[#FF0000]/5 transition-all duration-300">
              <FaYoutube className="h-4 w-4" />
            </a>
            {album.links.deezer && (
              <a href={album.links.deezer} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 hover:text-[#FEAA2D] hover:border-[#FEAA2D]/40 hover:bg-[#FEAA2D]/5 transition-all duration-300">
                <FaDeezer className="h-4 w-4" />
              </a>
            )}
            <Link href="/music"
              className="ml-auto inline-flex items-center gap-1.5 font-worksans text-[0.52rem] tracking-[0.14em] uppercase text-purple-600 hover:text-purple-800 transition-colors duration-300">
              More <ExternalLink className="h-2.5 w-2.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Interview card ────────────────────────────────────────────────────────────
function InterviewCard({ v, onPlay }: { v: typeof interviewVideos[number]; onPlay: () => void }) {
  return (
    <motion.button
      variants={item}
      onClick={onPlay}
      className="group w-full text-left bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_36px_rgba(0,0,0,0.11)] border border-black/[0.04] hover:border-purple-200/60 transition-all duration-400 flex flex-col h-full"
    >
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <Image
          src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
          alt={v.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-2 border-white/50 flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover:border-purple-400 group-hover:bg-purple-600/60 group-hover:scale-110 transition-all duration-300">
            <Play className="h-5 w-5 text-white fill-white ml-0.5" />
          </div>
        </div>
        <span className="absolute top-3 left-3 font-worksans text-[0.52rem] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full font-medium bg-purple-100 text-purple-700">
          Interview
        </span>
      </div>
      <div className="flex-1 flex flex-col p-6">
        <p className="font-worksans text-[0.52rem] tracking-[0.14em] uppercase text-gold-600 mb-2">{v.channel}</p>
        <h3 className="font-bricolage font-bold text-neutral-900 text-[1.05rem] leading-snug mb-2 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2 flex-1 text-left">
          {v.title}
        </h3>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/[0.05]">
          <span className="flex items-center gap-1.5 font-worksans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400">
            <Calendar className="h-3 w-3" />{v.date}
          </span>
          {v.duration && (
            <span className="flex items-center gap-1.5 font-worksans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400">
              <Clock className="h-3 w-3" />{v.duration}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// ── Tour card ─────────────────────────────────────────────────────────────────
function TourCard({ t }: { t: typeof tourDates[number] }) {
  const d    = new Date(t.date);
  const day  = d.toLocaleDateString('en-GB', { day: '2-digit' });
  const mon  = d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
  const full = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const past = d < new Date();

  return (
    <motion.div
      variants={item}
      className={cn(
        'group relative overflow-hidden rounded-2xl border transition-all duration-300 flex flex-col h-full',
        past
          ? 'bg-neutral-50 border-neutral-200 opacity-60'
          : 'bg-white border-neutral-200 hover:border-purple-300 hover:shadow-[0_8px_32px_rgba(124,58,237,0.08)]'
      )}
    >
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <Image
          src={t.image}
          alt={t.city}
          fill
          className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
          sizes="(max-width:768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <div className="absolute top-4 left-4 bg-white rounded-xl px-3 py-2 text-center shadow-lg min-w-[52px]">
          <p className="font-bricolage font-bold text-neutral-900 text-lg leading-none">{day}</p>
          <p className="font-worksans text-[0.5rem] tracking-[0.15em] uppercase text-purple-600 mt-0.5">{mon}</p>
        </div>
        {past && (
          <span className="absolute top-4 right-4 font-worksans text-[0.5rem] tracking-[0.15em] uppercase bg-black/60 text-white/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
            Past Event
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col p-5">
        <p className="font-bricolage font-bold text-neutral-900 text-lg leading-tight mb-1 group-hover:text-purple-700 transition-colors duration-300">
          {t.city}
        </p>
        <p className="flex items-center gap-1.5 font-worksans text-[0.58rem] tracking-[0.1em] uppercase text-neutral-400 mb-1">
          <MapPin className="h-3 w-3 shrink-0" />{t.venue}
        </p>
        <p className="font-worksans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400 mb-4">
          {full} · {t.time}
        </p>

        {!past && (
          <div className="mt-auto">
            <a
              href={t.ticketUrl !== '#' ? t.ticketUrl : undefined}
              onClick={t.ticketUrl === '#' ? (e) => e.preventDefault() : undefined}
              className={cn(
                'inline-flex items-center gap-2 font-worksans text-[0.6rem] tracking-[0.18em] uppercase px-5 h-9 rounded-xl transition-all duration-300',
                t.ticketUrl !== '#'
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-neutral-100 text-neutral-400 cursor-default'
              )}
            >
              {t.ticketUrl !== '#' ? 'Get Tickets' : 'Coming Soon'}
              {t.ticketUrl !== '#' && <ExternalLink className="h-3 w-3" />}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionTitle({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="block w-8 h-px bg-gold-500 opacity-70" />
      <Icon className="h-5 w-5 text-purple-600" />
      <h2 className="font-bricolage font-bold text-neutral-900 text-2xl">{label}</h2>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const tabIcons: Record<Tab, React.ComponentType<{ className?: string }> | null> = {
    All:              null,
    Releases:         Music2,
    Interviews:       Mic2,
    'Events & Tours': CalendarDays,
  };

  return (
    <>
      <PageHero
        eyebrow="Blog & News"
        title="News & Updates"
        subtitle="New releases, media interviews, and upcoming tour events from ClaudyGod Music Ministries."
        backgroundImage="/mum1.jpg"
        objectPosition="center top"
      />

      <section className="bg-cream-100 section-py">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          {/* Tab navigation */}
          <div className="flex flex-wrap gap-2.5 mb-12">
            {tabs.map((tab) => {
              const Icon = tabIcons[tab];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'inline-flex items-center gap-2 px-5 h-11 rounded-full font-worksans text-xs font-medium tracking-[0.1em] uppercase border transition-all duration-300',
                    activeTab === tab
                      ? 'bg-purple-600 border-purple-600 text-white shadow-[0_4px_16px_rgba(124,58,237,0.35)]'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:border-purple-400 hover:text-purple-600'
                  )}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {tab}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-20"
            >

              {/* ── RELEASES ── */}
              {(activeTab === 'All' || activeTab === 'Releases') && (
                <div>
                  {activeTab === 'All' && <SectionTitle icon={Music2} label="New Releases" />}
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
                  >
                    {newsAlbums.map((album) => (
                      <ReleaseCard key={album.title} album={album} />
                    ))}
                  </motion.div>
                </div>
              )}

              {/* ── INTERVIEWS ── */}
              {(activeTab === 'All' || activeTab === 'Interviews') && (
                <div>
                  {activeTab === 'All' && <SectionTitle icon={Mic2} label="Media Interviews" />}
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
                  >
                    {interviewVideos.map((v) => (
                      <InterviewCard key={v.id} v={v} onPlay={() => setPlayingId(v.id)} />
                    ))}
                  </motion.div>
                </div>
              )}

              {/* ── EVENTS & TOURS ── */}
              {(activeTab === 'All' || activeTab === 'Events & Tours') && (
                <div>
                  {activeTab === 'All' && <SectionTitle icon={CalendarDays} label="Events & Tours" />}
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch"
                  >
                    {tourDates.map((t) => <TourCard key={t.id} t={t} />)}
                  </motion.div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Interview lightbox */}
      <AnimatePresence>
        {playingId && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[600] bg-black/94 backdrop-blur-md"
              onClick={() => setPlayingId(null)}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-0 z-[601] flex items-center justify-center p-4 md:p-10 pointer-events-none"
            >
              <div className="relative w-full max-w-4xl pointer-events-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-worksans text-[0.55rem] tracking-[0.18em] uppercase text-white/40">
                    {interviewVideos.find(v => v.id === playingId)?.channel}
                  </span>
                  <button
                    onClick={() => setPlayingId(null)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black ring-1 ring-white/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${playingId}?autoplay=1&rel=0`}
                    title="Interview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
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
