import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { VideoGrid } from '@/components/videos/VideoGrid';

export const metadata: Metadata = {
  title: 'Videos — ClaudyGod Music Ministries',
  description: 'Watch music videos, visualizers, live worship sessions, and more from Minister ClaudyGod.',
};

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
