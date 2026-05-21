import type { Metadata } from 'next';
import Link from 'next/link';

const posts: Record<string, { title: string; date: string; category: string; content: string }> = {
  'the-power-of-worship': {
    title: 'The Power of Worship in a Believer\'s Life',
    date: 'May 10, 2025',
    category: 'Devotional',
    content: `Worship is not just what we do on Sunday morning — it is a posture of the heart that we carry through every moment of our lives. When we truly understand what it means to worship, everything changes.

The word "worship" in Hebrew — שׁחה (shachah) — means to bow down, to prostrate oneself. It is an act of total surrender before a holy God. This is not a passive act. It takes intention, vulnerability, and faith.

When we worship, we are declaring the worth of God over the circumstances of our lives. We are saying, "You are greater than this problem. You are greater than my fear. You are worthy of my praise regardless of what I am walking through."

There is a reason why worship is one of the most powerful spiritual weapons available to a believer. In 2 Chronicles 20, when the people of Judah were surrounded by enemies with no way of escape, King Jehoshaphat appointed singers to worship God at the front of the army. As they worshipped, God moved.

Practical steps to deepen your worship life:

1. Create a dedicated time and space for private worship
2. Learn to worship through difficulty, not just in joy
3. Study the Psalms — they teach us how to be honest with God and still praise
4. Let worship lead you to prayer and scripture
5. Find a community of worshippers who will encourage your growth

Worship is a journey. It deepens as we deepen in our understanding of who God is. And the more we know Him, the more naturally worship flows from our hearts.`,
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  return {
    title: post ? `${post.title} — ClaudyGod Blog` : 'Blog — ClaudyGod Music Ministries',
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#080808] pt-[var(--navbar-height)] flex flex-col items-center justify-center gap-4 text-center px-6">
        <p className="font-raleway font-extralight text-white text-2xl tracking-tight">
          Post not found
        </p>
        <Link
          href="/blog"
          className="font-worksans text-[0.55rem] tracking-[0.2em] uppercase text-neutral-500 hover:text-gold-400 transition-colors border-b border-neutral-700 hover:border-gold-500/40 pb-px"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] pt-[var(--navbar-height)]">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-20 md:py-28">
        {/* Breadcrumb */}
        <Link
          href="/blog"
          className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-neutral-600 hover:text-gold-400 transition-colors mb-12 block"
        >
          ← Blog
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="label-eyebrow">{post.category}</span>
            <span className="text-neutral-700 text-[0.5rem]">—</span>
            <span className="font-worksans text-[0.48rem] tracking-[0.12em] uppercase text-neutral-600">
              {post.date}
            </span>
          </div>
          <h1 className="font-raleway font-extralight text-white text-4xl md:text-5xl tracking-tight leading-[1.05] mb-6">
            {post.title}
          </h1>
          <div className="rule-gold" />
        </div>

        {/* Content */}
        <div className="space-y-5">
          {post.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="font-raleway text-neutral-400 text-sm leading-[1.9] font-light">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-10 border-t border-white/[0.05]">
          <Link
            href="/blog"
            className="font-worksans text-[0.55rem] tracking-[0.2em] uppercase text-neutral-500 hover:text-gold-400 transition-colors border-b border-neutral-700 hover:border-gold-500/40 pb-px"
          >
            ← All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
