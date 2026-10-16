import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { getRelease, releases } from '@/data/releases';
import { SITE_NAME, SITE_URL } from '@/lib/config/site';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return releases.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = getRelease(slug);
  if (!release) return {};
  return {
    title: release.title,
    description: release.description,
    alternates: { canonical: `${SITE_URL}/music/${release.slug}` },
    openGraph: {
      type: 'music.album',
      title: `${release.title} — ${SITE_NAME}`,
      description: release.description,
      images: [{ url: release.artwork, alt: `${release.title} cover artwork` }],
    },
  };
}

export default async function ReleasePage({ params }: PageProps) {
  const { slug } = await params;
  const release = getRelease(slug);
  if (!release) notFound();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MusicAlbum',
    name: release.title,
    image: `${SITE_URL}${release.artwork}`,
    url: `${SITE_URL}/music/${release.slug}`,
    byArtist: { '@type': 'MusicGroup', name: SITE_NAME, url: SITE_URL },
    sameAs: Object.values(release.links),
  };

  return (
    <section className="min-h-screen bg-white text-neutral-900 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container-narrow">
        <Button
          href="/music"
          variant="outline-dark"
          size="sm"
          uppercase
          leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}
          className="mb-6"
        >
          Back to Music
        </Button>
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center mt-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl shadow-card-light-lg border border-neutral-200/80 bg-neutral-100">
            <Image
              src={release.artwork}
              alt={`${release.title} cover artwork`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-6 bg-gold-500" />
              <span className="label-eyebrow text-gold-700 font-semibold">Official Release</span>
            </div>
            <h1 className="font-raleway font-light text-4xl md:text-5xl text-neutral-900 leading-tight">
              {release.title}
            </h1>
            <p className="font-sans text-neutral-600 leading-relaxed mt-4 text-base">
              {release.description}
            </p>
            <div className="flex flex-col gap-3 mt-8">
              {Object.entries(release.links).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-cream-50/70 px-5 py-4 font-sans text-sm font-medium text-neutral-800 hover:border-gold-400 hover:bg-gold-50/50 hover:text-gold-900 transition-all duration-200 shadow-2xs"
                >
                  <span className="capitalize">Listen on {platform}</span>
                  <ExternalLink className="h-4 w-4 text-gold-600" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
