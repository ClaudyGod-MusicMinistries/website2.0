'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X, Calendar, MapPin, Clock, ExternalLink, Newspaper, Mic2, CalendarDays } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { interviewVideos } from '@/data/interviews';
import { tourDates } from '@/data/news';
import { cn } from '@/utils/cn';

// ── Static article posts ──────────────────────────────────────────────────────
const articles = [
  {
    slug: 'the-power-of-worship',
    title: 'The Power of Worship in a Believer\'s Life',
    excerpt: 'Worship is more than singing — it\'s a lifestyle of surrender that transforms us from the inside out. Discover how a consistent worship practice changes everything.',
    date: 'May 10, 2025',
    category: 'Devotional',
    image: '/mum1.jpg',
    readTime: '5 min read',
  },
  {
    slug: 'seven-albums-journey',
    title: 'From One Album to Seven — A Ministry Journey',
    excerpt: 'When God called ClaudyGod to write songs in 2018, she never imagined it would lead to seven albums. Here\'s the story of obedience and multiplication.',
    date: 'April 22, 2025',
    category: 'Ministry',
    image: '/aboutUs.webp',
    readTime: '7 min read',
  },
  {
    slug: 'how-to-grow-in-worship',
    title: 'How to Grow in Your Personal Worship Life',
    excerpt: 'Practical steps for deepening your private worship — from creating a dedicated space to learning to worship through difficulty.',
    date: 'March 15, 2025',
    category: 'Devotional',
    image: '/resize_abt.webp',
    readTime: '4 min read',
  },
  {
    slug: 'gospel-music-mission',
    title: 'Why Gospel Music Is Still One of the Most Powerful Mission Tools',
    excerpt: 'Music crosses language barriers, softens hearts, and creates space for the Holy Spirit. Here\'s why we keep writing and singing.',
    date: 'February 28, 2025',
    category: 'Music',
    image: '/CD1.png',
    readTime: '6 min read',
  },
  {
    slug: 'ministry-tour-2025',
    title: 'ClaudyGod Nigeria Ministry Tour 2025 — What to Expect',
    excerpt: 'Four cities, thousands of worshippers, and one mission — spreading the love of God through spirit-filled music and ministry.',
    date: 'January 14, 2025',
    category: 'News',
    image: '/tour_1.jpg',
    readTime: '3 min read',
  },
  {
    slug: 'new-album-very-glorious',
    title: '"Very Glorious" — Behind the New Single',
    excerpt: 'The story behind the anointed new single that has been touching hearts across Nigeria and beyond. Available on all streaming platforms.',
    date: 'December 5, 2024',
    category: 'Music',
    image: '/manBack.jpg',
    readTime: '4 min read',
  },
];

const tabs = ['All', 'Articles', 'Interviews', 'Events & Tours'] as const;
type Tab = (typeof tabs)[number];

const categoryColors: Record<string, string> = {
  Devotional: 'bg-purple-100 text-purple-700',
  Ministry:   'bg-gold-100 text-gold-700',
  Music:      'bg-blue-100 text-blue-700',
  News:       'bg-green-100 text-green-700',
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ── Interview video card ──────────────────────────────────────────────────────
function InterviewCard({ v, onPlay }: { v: typeof interviewVideos[number]; onPlay: () => void }) {
  return (
    <motion.button
      variants={item}
      onClick={onPlay}
      className="group w-full text-left bg-neutral-950 rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.22)] border border-white/[0.04] hover:border-purple-500/30 transition-all duration-400"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
          alt={v.title}
          fill
          className="object-cover opacity-70 group-hover:opacity-95 transition-all duration-500 group-hover:scale-[1.04]"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover:border-purple-400 group-hover:bg-purple-600/60 group-hover:scale-110 transition-all duration-300">
            <Play className="h-5 w-5 text-white fill-white ml-0.5" />
          </div>
        </div>
        <span className="absolute top-3 left-3 font-worksans text-[0.5rem] tracking-[0.15em] uppercase text-white/80 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
          Interview
        </span>
      </div>
      <div className="p-5">
        <p className="font-worksans text-[0.55rem] tracking-[0.12em] uppercase text-gold-400/80 mb-1.5">{v.channel}</p>
        <p className="font-bricolage font-semibold text-base text-neutral-200 group-hover:text-white leading-snug line-clamp-2 transition-colors duration-300 mb-2">
          {v.title}
        </p>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-worksans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-600">
            <Calendar className="h-3 w-3" />{v.date}
          </span>
          {v.duration && (
            <span className="flex items-center gap-1.5 font-worksans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-600">
              <Clock className="h-3 w-3" />{v.duration}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// ── Tour date card ────────────────────────────────────────────────────────────
function TourCard({ t }: { t: typeof tourDates[number] }) {
  const d    = new Date(t.date);
  const day  = d.toLocaleDateString('en-GB', { day: '2-digit' });
  const mon  = d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase();
  const year = d.getFullYear();
  const past = d < new Date();

  return (
    <motion.div
      variants={item}
      className={cn(
        'group relative overflow-hidden rounded-2xl border transition-all duration-300',
        past
          ? 'bg-neutral-50 border-neutral-200 opacity-60'
          : 'bg-white border-neutral-200 hover:border-purple-300 hover:shadow-[0_8px_32px_rgba(124,58,237,0.08)]'
      )}
    >
      {/* Image strip */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={t.image}
          alt={t.city}
          fill
          className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
          sizes="(max-width:768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        {/* Date badge */}
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

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-bricolage font-bold text-neutral-900 text-lg leading-tight mb-1 group-hover:text-purple-700 transition-colors duration-300">
              {t.city}
            </p>
            <p className="flex items-center gap-1.5 font-worksans text-[0.58rem] tracking-[0.1em] uppercase text-neutral-400 mb-2">
              <MapPin className="h-3 w-3 shrink-0" />{t.venue}
            </p>
            <p className="font-worksans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400">
              {t.state} · {year} · {t.time}
            </p>
          </div>
        </div>

        {!past && (
          <a
            href={t.ticketUrl}
            className="mt-4 inline-flex items-center gap-2 font-worksans text-[0.6rem] tracking-[0.18em] uppercase bg-purple-600 hover:bg-purple-700 text-white px-5 h-9 rounded-xl transition-all duration-300"
          >
            Get Tickets
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ── Article card ──────────────────────────────────────────────────────────────
function ArticleCard({ post }: { post: typeof articles[number] }) {
  const color = categoryColors[post.category] ?? 'bg-neutral-100 text-neutral-600';
  return (
    <motion.div variants={item}>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_36px_rgba(0,0,0,0.11)] border border-black/[0.04] hover:border-purple-200/60 transition-all duration-400"
      >
        <div className="relative h-52 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <div className="flex-1 flex flex-col p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={cn('font-worksans text-[0.52rem] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full font-medium', color)}>
              {post.category}
            </span>
          </div>
          <h3 className="font-bricolage font-bold text-neutral-900 text-lg leading-snug mb-2 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2 flex-1">
            {post.title}
          </h3>
          <p className="font-raleway text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/[0.05]">
            <span className="font-worksans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400">{post.date}</span>
            <span className="font-worksans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400">{post.readTime}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Blog & News"
        title="Words of Life"
        subtitle="Devotionals, ministry insights, interviews, and the latest from the ClaudyGod world."
        backgroundImage="/mum1.jpg"
      />

      <section className="bg-cream-100 section-py">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

          {/* Tab navigation */}
          <div className="flex flex-wrap gap-2.5 mb-12">
            {tabs.map((tab) => {
              const icons: Record<Tab, React.ReactNode> = {
                All:              null,
                Articles:         <Newspaper className="h-3.5 w-3.5" />,
                Interviews:       <Mic2 className="h-3.5 w-3.5" />,
                'Events & Tours': <CalendarDays className="h-3.5 w-3.5" />,
              };
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
                  {icons[tab]}
                  {tab}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {/* ── ARTICLES ── */}
            {(activeTab === 'All' || activeTab === 'Articles') && (
              <motion.div key="articles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                {activeTab === 'All' && (
                  <div className="flex items-center gap-4 mb-8">
                    <Newspaper className="h-5 w-5 text-purple-600" />
                    <h2 className="font-bricolage font-bold text-neutral-900 text-2xl">Latest Articles</h2>
                  </div>
                )}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {articles.map((post) => <ArticleCard key={post.slug} post={post} />)}
                </motion.div>
              </motion.div>
            )}

            {/* ── INTERVIEWS ── */}
            {(activeTab === 'All' || activeTab === 'Interviews') && (
              <motion.div key="interviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                className={activeTab === 'All' ? 'mt-20' : ''}
              >
                {activeTab === 'All' && (
                  <div className="flex items-center gap-4 mb-8">
                    <Mic2 className="h-5 w-5 text-purple-600" />
                    <h2 className="font-bricolage font-bold text-neutral-900 text-2xl">Media Interviews</h2>
                  </div>
                )}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {interviewVideos.map((v) => (
                    <InterviewCard key={v.id} v={v} onPlay={() => setPlayingId(v.id)} />
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* ── EVENTS & TOURS ── */}
            {(activeTab === 'All' || activeTab === 'Events & Tours') && (
              <motion.div key="tours" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                className={activeTab === 'All' ? 'mt-20' : ''}
              >
                {activeTab === 'All' && (
                  <div className="flex items-center gap-4 mb-8">
                    <CalendarDays className="h-5 w-5 text-purple-600" />
                    <h2 className="font-bricolage font-bold text-neutral-900 text-2xl">Events & Tours</h2>
                  </div>
                )}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
                >
                  {tourDates.map((t) => <TourCard key={t.id} t={t} />)}
                </motion.div>
              </motion.div>
            )}
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
