'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Skeleton, ContainedImage } from '@/components/ui';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

/**
 * Moved here from the old Blog listing page — journal posts are ministry
 * updates/announcements, the same "recent news" family as tour dates and
 * releases above, so they live on News now instead of a separate Blog tab.
 * Individual posts still resolve at /blog/[slug] — only the listing moved.
 */
export function JournalSection() {
  const { posts, loading, error } = useBlogPosts();

  if (!loading && !error && posts.length === 0) return null;

  return (
    <section className="bg-white section-py border-t border-black/[0.05]">
      <div className="container-site">
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <span className="rule-gold" />
          <span className="label-eyebrow">Journal</span>
        </div>
        <h2 className="font-raleway font-light text-neutral-900 text-2xl sm:text-3xl md:text-4xl tracking-normal leading-tight mb-8 sm:mb-10">
          Recent Updates
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="h-52 w-full" rounded="lg" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            {posts.map((post) => (
              <motion.div key={post.id} variants={item}>
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
                        Read
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
