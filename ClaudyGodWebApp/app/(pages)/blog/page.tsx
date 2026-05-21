import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/shared/PageHero';

const posts = [
  {
    slug: 'the-power-of-worship',
    title: 'The Power of Worship in a Believer\'s Life',
    excerpt: 'Worship is more than singing — it\'s a lifestyle of surrender that transforms us from the inside out. Discover how a consistent worship practice changes everything.',
    date: 'May 10, 2025',
    category: 'Devotional',
  },
  {
    slug: 'seven-albums-journey',
    title: 'From One Album to Seven — A Ministry Journey',
    excerpt: 'When God called ClaudyGod to write songs in 2018, she never imagined it would lead to seven albums. Here\'s the story of obedience and multiplication.',
    date: 'April 22, 2025',
    category: 'Ministry',
  },
  {
    slug: 'how-to-grow-in-worship',
    title: 'How to Grow in Your Personal Worship Life',
    excerpt: 'Practical steps for deepening your private worship — from creating a dedicated space to learning to worship through difficulty.',
    date: 'March 15, 2025',
    category: 'Devotional',
  },
  {
    slug: 'gospel-music-mission',
    title: 'Why Gospel Music Is Still One of the Most Powerful Mission Tools',
    excerpt: 'Music crosses language barriers, softens hearts, and creates space for the Holy Spirit. Here\'s why we keep writing and singing.',
    date: 'February 28, 2025',
    category: 'Music',
  },
];

export const metadata: Metadata = {
  title: 'Blog — ClaudyGod Music Ministries',
  description: 'Devotionals, ministry insights, and encouragement from ClaudyGod Music Ministries.',
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Words of Life"
        subtitle="Devotionals, ministry insights, and encouragement for your journey."
      />

      <section className="bg-[#080808] section-py">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-[#080808] p-8 block">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-worksans text-[0.45rem] tracking-[0.18em] uppercase text-gold-400/70">
                    {post.category}
                  </span>
                  <span className="text-neutral-700 text-[0.5rem]">—</span>
                  <span className="font-worksans text-[0.45rem] tracking-[0.12em] uppercase text-neutral-700">
                    {post.date}
                  </span>
                </div>
                <h2 className="font-raleway font-light text-white text-xl leading-snug mb-3 group-hover:text-gold-100 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="font-raleway text-neutral-600 text-sm font-light leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <span className="font-worksans text-[0.52rem] tracking-[0.18em] uppercase text-neutral-600 group-hover:text-gold-400 transition-colors duration-300 border-b border-neutral-800 group-hover:border-gold-500/40 pb-px">
                  Read More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
