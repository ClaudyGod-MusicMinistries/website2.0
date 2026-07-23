import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import type { ApiResponse, BlogPostDetail } from '@/lib/data/types';

const API_BASE = process.env.API_BASE_URL ?? 'http://localhost:8080';

/**
 * Server-side fetch straight to the backend — this runs during SSR only
 * (never in the browser), so API_BASE_URL stays server-only exactly like
 * the app/api/* proxy routes. No client hook here: this is a Server
 * Component and the post content belongs in the initial HTML for SEO.
 */
async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1.0/blog/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse<BlogPostDetail>;
    return json.data;
  } catch {
    return null;
  }
}

function readTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function formatDate(iso?: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

const categoryColors: Record<string, string> = {
  Devotional: 'bg-purple-100 text-purple-700',
  Ministry: 'bg-amber-100 text-amber-700',
  Music: 'bg-blue-100 text-blue-700',
  News: 'bg-green-100 text-green-700',
};

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post ? `${post.title} — ClaudyGod Blog` : 'Blog — ClaudyGod Music Ministries',
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-cream-100 pt-[var(--navbar-height)] flex flex-col items-center justify-center gap-5 text-center px-6">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center">
          <span className="text-2xl">📄</span>
        </div>
        <p className="font-display font-bold text-neutral-900 text-2xl tracking-tight">
          Post not found
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase bg-purple-600 hover:bg-purple-700 text-white px-6 h-10 rounded-xl transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const catColor = categoryColors[post.categoryName ?? ''] ?? 'bg-neutral-100 text-neutral-600';

  return (
    <div className="min-h-screen bg-white pt-[var(--navbar-height)]">
      <div className="max-w-[760px] mx-auto px-6 lg:px-8 py-16 md:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-sans text-[0.6rem] tracking-[0.15em] uppercase text-neutral-400 hover:text-purple-600 transition-colors mb-12"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Blog
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            {post.categoryName && (
              <span
                className={`font-sans text-[0.52rem] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full font-medium ${catColor}`}
              >
                {post.categoryName}
              </span>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-1.5 font-sans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400">
                <Calendar className="h-3 w-3" />
                {formatDate(post.publishedAt)}
              </span>
            )}
            <span className="flex items-center gap-1.5 font-sans text-[0.55rem] tracking-[0.1em] uppercase text-neutral-400">
              <Clock className="h-3 w-3" />
              {readTime(post.content)}
            </span>
          </div>
          <h1 className="font-display font-bold text-neutral-900 text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.08] mb-6">
            {post.title}
          </h1>
          <div className="w-12 h-0.5 bg-amber-400 opacity-70" />
        </div>

        <div className="space-y-6">
          {post.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="font-sans text-neutral-600 text-base md:text-lg leading-[1.9]">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-black/[0.06] flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-neutral-500 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Posts
          </Link>
          <span className="font-sans text-[0.55rem] tracking-[0.15em] uppercase text-neutral-300">
            ClaudyGod Music Ministries
          </span>
        </div>
      </div>
    </div>
  );
}
