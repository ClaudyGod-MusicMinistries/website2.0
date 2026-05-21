import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/shared/PageHero';
import { StreamingPlatforms } from '@/components/music/StreamingPlatforms';
import { GridSkeleton } from '@/components/shared/GridSkeleton';
import { AnimateOnView } from '@/components/shared/AnimateOnView';

export const metadata: Metadata = {
  title: 'Music — ClaudyGod Music Ministries',
  description: 'Explore the full discography of Minister ClaudyGod — gospel albums and worship music available on all major streaming platforms.',
};

const AlbumGrid = dynamic(
  () => import('@/components/music/AlbumGrid').then((m) => m.AlbumGrid),
  { loading: () => <GridSkeleton cols={3} rows={2} /> }
);

export default function MusicPage() {
  return (
    <>
      <PageHero
        eyebrow="Music"
        title="Worship That Transforms"
        subtitle="Seven albums of spirit-filled gospel music — available everywhere you stream."
      />
      <StreamingPlatforms />
      <AnimateOnView><AlbumGrid /></AnimateOnView>
    </>
  );
}
