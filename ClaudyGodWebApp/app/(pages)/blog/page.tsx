'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Play,
  X,
  Calendar,
  Clock,
  ExternalLink,
  Music2,
  Mic2,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { FaSpotify, FaApple, FaYoutube, FaDeezer } from 'react-icons/fa6';
import { PageHero } from '@/components/shared/PageHero';
import { interviewVideos } from '@/data/interviews';
import { newsAlbums } from '@/data/news';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Skeleton, ContainedImage, YoutubeThumbnail } from '@/components/ui';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { cn } from '@/lib/utils/cn';
import { platformColors } from '@/lib/utils/platformColors';

const tabs = ['All', 'Releases', 'Interviews', 'Journal'] as const;
type Tab = (typeof tabs)[number];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

// ── Release card ──────────────────────────────────────────────────────────────
function ReleaseCard({ album }: { album: (typeof newsAlbums)[number] }) {
  return (
    <motion.div variants={item}>
      <div className="group bg-white rounded-xl overflow-hidden shadow-card-light hover:shadow-card-light-hover border border-black/[0.04] hover:border-purple-200/60 transition-all duration-400 flex flex-col h-full">
        {/* Album artwork — fixed height */}
        <div className="relative h-52 overflow-hidden flex-shrink-0 bg-neutral-100">
          <ContainedImage
            src={album.image}
            alt={album.title}
            className="transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className="absolute top-3 left-3 font-sans text-[0.52rem] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full font-medium bg-gold-100 text-gold-700">
            Release
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col p-6">
          <h3 className="font-display font-bold text-neutral-900 text-lg leading-snug mb-1 group-hover:text-purple-700 transition-colors duration-300">
            {album.title}
          </h3>
          <p className="font-sans text-[0.52rem] tracking-[0.14em] uppercase text-neutral-400 mb-4">
            Available on all platforms
          </p>

          {/* Streaming links */}
          <div className="flex items-center gap-2.5 mt-auto">
            <a
              href={album.links.spotify}
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--brand': platformColors.spotify } as React.CSSProperties}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 hover:text-[var(--brand)] hover:border-[var(--brand)]/40 hover:bg-[var(--brand)]/5 transition-all duration-300"
            >
              <FaSpotify className="h-4 w-4" />
            </a>
            <a
              href={album.links.apple}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:border-neutral-400 transition-all duration-300"
            >
              <FaApple className="h-4 w-4" />
            </a>
            <a
              href={album.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--brand': platformColors.youtube } as React.CSSProperties}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 hover:text-[var(--brand)] hover:border-[var(--brand)]/40 hover:bg-[var(--brand)]/5 transition-all duration-300"
            >
              <FaYoutube className="h-4 w-4" />
            </a>
            {album.links.deezer && (
              <a
                href={album.links.deezer}
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--brand': platformColors.deezer } as React.CSSProperties}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 hover:text-[var(--brand)] hover:border-[var(--brand)]/40 hover:bg-[var(--brand)]/5 transition-all duration-300"
              >
                <FaDeezer className="h-4 w-4" />
              </a>
            )}
            <Link
              href="/music"
              className="ml-auto inline-flex items-center gap-1.5 font-sans text-[0.52rem] tracking-[0.14em] uppercase text-purple-600 hover:text-purple-800 transition-colors duration-300"
            >
              More <ExternalLink className="h-2.5 w-2.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Interview card ────────────────────────────────────────────────────────────
function InterviewCard({ v, onPlay }: { v: (typeof interviewVideos)[number]; onPlay: () => void }) {
  return (
    <motion.button
      variants={item}
      onClick={onPlay}
      className="group w-full text-left bg-white rounded-xl overflow-hidden shadow-card-light hover:shadow-card-light-hover border border-black/[0.04] hover:border-purple-200/60 transition-all duration-400 flex flex-col h-full"
    >
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <YoutubeThumbnail
          youtubeId={v.id}
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
        <span className="absolute top-3 left-3 font-sans text-[0.52rem] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full font-medium bg-purple-100 text-purple-700">
          Interview
        </span>
      </div>
      <div className="flex-1 flex flex-col p-6">
        <p className="font-sans text-[0.52rem] tracking-[0.14em] uppercase text-gold-600 mb-2">
          {v.channel}
        </p>
        <h3 className="font-display font-bold text-neutral-900 text-[1.05rem] leading-snug mb-2 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2 flex-1 text-left">
          {v.title}
        </h3>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/[0.05]">
          <span className="flex items-center gap-1.5 font-sans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400">
            <Calendar className="h-3 w-3" />
            {v.date}
          </span>
          {v.duration && (
            <span className="flex items-center gap-1.5 font-sans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400">
              <Clock className="h-3 w-3" />
              {v.duration}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// ── Journal card ──────────────────────────────────────────────────────────────
function JournalCard({ post }: { post: import('@/lib/data/types').BlogPost }) {
  return (
    <motion.div variants={item}>
      <Link
        href={`/blog/${post.slug}`}
        className="group bg-white rounded-xl overflow-hidden shadow-card-light hover:shadow-card-light-hover border border-black/[0.04] hover:border-purple-200/60 transition-all duration-400 flex flex-col h-full"
      >
        <div className="relative h-52 overflow-hidden flex-shrink-0 bg-neutral-100">
          {post.featuredImagePath && (
            <ContainedImage
              src={post.featuredImagePath}
              alt={post.title}
              className="transition-transform duration-700 group-hover:scale-[1.05]"
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {post.categoryName && (
            <span className="absolute top-3 left-3 font-sans text-[0.52rem] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full font-medium bg-purple-100 text-purple-700">
              {post.categoryName}
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col p-6">
          <h3 className="font-display font-bold text-neutral-900 text-lg leading-snug mb-2 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="font-sans text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/[0.05]">
            {post.publishedAt && (
              <span className="flex items-center gap-1.5 font-sans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400">
                <Calendar className="h-3 w-3" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 font-sans text-[0.55rem] tracking-[0.14em] uppercase text-purple-600 group-hover:text-purple-800 transition-colors duration-300 ml-auto">
              Read{' '}
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionTitle({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="block w-8 h-px bg-gold-500 opacity-70" />
      <Icon className="h-5 w-5 text-purple-600" />
      <h2 className="font-raleway font-light text-neutral-900 text-2xl">{label}</h2>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { posts, loading: postsLoading, error: postsError } = useBlogPosts();

  const tabIcons: Record<Tab, React.ComponentType<{ className?: string }> | null> = {
    All: null,
    Releases: Music2,
    Interviews: Mic2,
    Journal: BookOpen,
  };

  return (
    <>
      <PageHero
        eyebrow="Blog & News"
        title="News & Updates"
        subtitle="New releases, media interviews, and upcoming tour events from ClaudyGod Music Ministries."
        backgroundImage="/tour_3.jpg"
        objectPosition="center center"
      />

      <section className="bg-cream-100 section-py">
        <div className="container-site">
          {/* Tab navigation */}
          <div className="flex items-center gap-2 overflow-x-auto flex-nowrap sm:flex-wrap mb-8 sm:mb-12 pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => {
              const Icon = tabIcons[tab];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'inline-flex items-center gap-2 px-5 h-11 rounded-full font-sans text-xs font-medium tracking-[0.1em] uppercase border transition-all duration-300 shrink-0',
                    activeTab === tab
                      ? 'bg-purple-600 border-purple-600 text-white shadow-purple-cta'
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

              {/* ── JOURNAL ── */}
              {(activeTab === 'All' || activeTab === 'Journal') && (
                <div>
                  {activeTab === 'All' && <SectionTitle icon={BookOpen} label="Journal" />}
                  {postsLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="flex flex-col gap-3">
                          <Skeleton className="h-52 w-full" rounded="lg" />
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      ))}
                    </div>
                  ) : postsError ? (
                    <ErrorMessage message={postsError} />
                  ) : posts.length === 0 ? (
                    <p className="font-sans text-neutral-400 text-sm py-8">
                      No journal posts yet — check back soon.
                    </p>
                  ) : (
                    <motion.div
                      variants={stagger}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
                    >
                      {posts.map((post) => (
                        <JournalCard key={post.id} post={post} />
                      ))}
                    </motion.div>
                  )}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
                  <span className="font-sans text-[0.55rem] tracking-[0.18em] uppercase text-white/40">
                    {interviewVideos.find((v) => v.id === playingId)?.channel}
                  </span>
                  <button
                    onClick={() => setPlayingId(null)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black ring-1 ring-white/10">
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
