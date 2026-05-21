import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/shared/PageHero';
import { GridSkeleton } from '@/components/shared/GridSkeleton';

export const metadata: Metadata = {
  title: 'Videos — ClaudyGod Music Ministries',
  description: 'Watch music videos, visualizers, live worship sessions, and more from Minister ClaudyGod.',
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
      />
      <VideoGrid />
    </>
  );
}
