import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import type { ApiResponse, BlogPostDetail } from '@/lib/data/types';
import { ReactionBar } from '@/components/blog/ReactionBar';
import { CommentsSection } from '@/components/blog/CommentsSection';
import { SITE_NAME, SITE_URL, LOGO_URL } from '@/lib/config/site';
import { breadcrumb } from '@/lib/utils/jsonLd';
import { getBackendServiceHeaders, getBackendUrl } from '@/lib/data/backendConfig';

/**
 * Server-side fetch straight to the backend — this runs during SSR only
 * (never in the browser), so API_BASE_URL stays server-only exactly like
 * the app/api/* proxy routes. No client hook here: this is a Server
 * Component and the post content belongs in the initial HTML for SEO.
 *
 * Blog reads are anonymous; write operations remain protected by the
 * backend's authorization policy.
 */
async function getPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  try {
    const res = await fetch(getBackendUrl(`/blog/${encodeURIComponent(slug)}`), {
      headers: { Accept: 'application/json', ...getBackendServiceHeaders() },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(15_000),
    });
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
    title: post ? post.title : 'Article Not Found',
    description:
      post?.excerpt ?? 'Read journal entries and ministry updates from ClaudyGod Music Ministries.',
    alternates: post ? { canonical: `${SITE_URL}/blog/${post.slug}` } : undefined,
    robots: post ? undefined : { index: false, follow: false },
    openGraph: post
      ? {
          type: 'article',
          title: post.title,
          description: post.excerpt,
          url: `${SITE_URL}/blog/${post.slug}`,
          publishedTime: post.publishedAt,
          authors: post.authorName ? [post.authorName] : [SITE_NAME],
          tags: post.tags,
          images: post.featuredImagePath
            ? [{ url: post.featuredImagePath, alt: post.title }]
            : [{ url: '/ClaudySocial-wide.png', width: 1730, height: 909, alt: SITE_NAME }],
        }
      : undefined,
    twitter: post
      ? {
          card: 'summary_large_image',
          title: post.title,
          description: post.excerpt,
          images: [post.featuredImagePath || '/ClaudySocial-wide.png'],
        }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const catColor = categoryColors[post.categoryName ?? ''] ?? 'bg-neutral-100 text-neutral-600';
  const schemas = [
    breadcrumb([
      { name: 'News', href: '/news' },
      { name: post.title, href: `/blog/${post.slug}` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.featuredImagePath
        ? `${SITE_URL}${post.featuredImagePath}`
        : `${SITE_URL}/ClaudySocial-wide.png`,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
      author: { '@type': 'Person', name: post.authorName || 'ClaudyGod', url: `${SITE_URL}/about` },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: { '@type': 'ImageObject', url: LOGO_URL },
      },
    },
  ];

  return (
    <article className="min-h-screen bg-white pt-[var(--navbar-height)]">
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="max-w-[820px] mx-auto px-6 lg:px-8 py-16 md:py-24">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 font-sans text-[0.6rem] tracking-[0.15em] uppercase text-neutral-400 hover:text-purple-600 transition-colors mb-12"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to News
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
          <h1 className="font-raleway font-light text-neutral-900 text-3xl md:text-4xl lg:text-5xl tracking-normal leading-[1.08] mb-6">
            {post.title}
          </h1>
          <div className="w-12 h-0.5 bg-amber-400 opacity-70" />
        </div>

        {post.featuredImagePath && (
          <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-xl bg-neutral-100">
            <Image
              src={post.featuredImagePath}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 820px"
            />
          </div>
        )}

        <div className="space-y-6">
          {post.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="font-sans text-neutral-600 text-base md:text-lg leading-[1.9]">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10">
          <ReactionBar target={{ type: 'post', id: post.id }} />
        </div>

        <CommentsSection postId={post.id} />

        <div className="mt-16 pt-10 border-t border-black/[0.06] flex items-center justify-between gap-4 flex-wrap">
          <Link
            href="/news"
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
    </article>
  );
}
