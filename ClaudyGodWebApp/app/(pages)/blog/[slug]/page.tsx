import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

const posts: Record<string, { title: string; date: string; category: string; readTime: string; content: string }> = {
  'the-power-of-worship': {
    title: "The Power of Worship in a Believer's Life",
    date: 'May 10, 2025',
    category: 'Devotional',
    readTime: '5 min read',
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
  'seven-albums-journey': {
    title: 'From One Album to Seven — A Ministry Journey',
    date: 'April 22, 2025',
    category: 'Ministry',
    readTime: '7 min read',
    content: `When God called ClaudyGod to write songs, she never imagined it would lead to seven albums. Here is the story of obedience and multiplication.

Every step in this journey has been one of faith — producing in seasons of limited resources, recording while trusting God for provision, and releasing music into a world that needed to hear the gospel.

The albums span every emotion of the Christian walk: joy, grief, perseverance, praise, thanksgiving, and intercession. Each project is not just a collection of songs — it is a prophetic declaration over the generation that hears it.

For anyone feeling called to create for God but uncertain of where to start: start where you are. Use what you have. Obey the prompting. The multiplication is God's business.`,
  },
};

const categoryColors: Record<string, string> = {
  Devotional: 'bg-purple-100 text-purple-700',
  Ministry:   'bg-amber-100 text-amber-700',
  Music:      'bg-blue-100 text-blue-700',
  News:       'bg-green-100 text-green-700',
};

type PageProps = { params: Promise<{ slug: string }> };

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
      <div className="min-h-screen bg-cream-100 pt-[var(--navbar-height)] flex flex-col items-center justify-center gap-5 text-center px-6">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center">
          <span className="text-2xl">📄</span>
        </div>
        <p className="font-raleway font-bold text-neutral-900 text-2xl tracking-tight">Post not found</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-worksans text-xs tracking-[0.15em] uppercase bg-purple-600 hover:bg-purple-700 text-white px-6 h-10 rounded-xl transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const catColor = categoryColors[post.category] ?? 'bg-neutral-100 text-neutral-600';

  return (
    <div className="min-h-screen bg-white pt-[var(--navbar-height)]">
      <div className="max-w-[760px] mx-auto px-6 lg:px-8 py-16 md:py-24">

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-worksans text-[0.6rem] tracking-[0.15em] uppercase text-neutral-400 hover:text-purple-600 transition-colors mb-12"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Blog
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className={`font-worksans text-[0.52rem] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full font-medium ${catColor}`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 font-worksans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400">
              <Calendar className="h-3 w-3" />{post.date}
            </span>
            <span className="flex items-center gap-1.5 font-worksans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400">
              <Clock className="h-3 w-3" />{post.readTime}
            </span>
          </div>
          <h1 className="font-raleway font-bold text-neutral-900 text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.08] mb-6">
            {post.title}
          </h1>
          <div className="w-12 h-0.5 bg-amber-400 opacity-70" />
        </div>

        <div className="space-y-6">
          {post.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="font-raleway text-neutral-600 text-base md:text-lg leading-[1.9]">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-black/[0.06] flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-worksans text-xs tracking-[0.15em] uppercase text-neutral-500 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Posts
          </Link>
          <span className="font-worksans text-[0.55rem] tracking-[0.15em] uppercase text-neutral-300">
            ClaudyGod Music Ministries
          </span>
        </div>
      </div>
    </div>
  );
}
