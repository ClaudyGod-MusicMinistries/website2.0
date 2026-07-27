import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { getRelease, releases } from '@/data/releases';
import { SITE_NAME, SITE_URL } from '@/lib/config/site';

export function generateStaticParams() {
  return releases.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const release = getRelease(params.slug);
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

export default function ReleasePage({ params }: { params: { slug: string } }) {
  const release = getRelease(params.slug);
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
    <section className="min-h-screen bg-surface-base pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container-narrow">
        <Link href="/music" className="font-sans text-sm text-gold-400 hover:text-gold-300">
          ← Back to music
        </Link>
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center mt-8">
          <div className="relative aspect-square overflow-hidden rounded-2xl shadow-popup">
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
            <p className="label-eyebrow text-gold-400 mb-3">Official Release</p>
            <h1 className="font-raleway font-light text-4xl md:text-5xl text-white leading-tight">
              {release.title}
            </h1>
            <p className="font-sans text-neutral-400 leading-relaxed mt-5">{release.description}</p>
            <div className="flex flex-col gap-3 mt-8">
              {Object.entries(release.links).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 font-sans text-sm text-white hover:border-gold-500/40 hover:bg-white/[0.07]"
                >
                  Listen on {platform}
                  <ExternalLink className="h-4 w-4 text-gold-400" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
