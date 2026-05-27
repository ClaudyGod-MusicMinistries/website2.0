import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/shared/PageHero';
import { CrossPromo } from '@/components/shared/CrossPromo';
import { GridSkeleton } from '@/components/shared/GridSkeleton';

export const metadata: Metadata = {
  title: 'Watch ClaudyGod Videos — Music & Worship',
  description: 'Watch music videos, live worship sessions, visualizers, and ministry recordings from Minister ClaudyGod on YouTube.',
  keywords: ['ClaudyGod videos', 'gospel music videos', 'worship videos YouTube', 'live worship sessions'],
  openGraph: { title: 'ClaudyGod Videos', description: 'Music videos, live worship sessions, and more.', url: '/videos' },
  alternates: { canonical: 'https://claudygod.com/videos' },
};

const VideoGrid = dynamic(
  () => import('@/components/videos/VideoGrid').then((m) => m.VideoGrid),
  { loading: () => <GridSkeleton cols={4} rows={2} /> }
);

export default function VideosPage() {
  return (
    <>
      <PageHero
        eyebrow="Watch & Worship"
        title="Videos"
        subtitle="Music videos, live sessions, visualizers — a visual worship experience."
        backgroundImage="/Tour_Ph_1.webp"
        objectPosition="center center"
      />
      <VideoGrid />
      <CrossPromo />
    </>
  );
}
