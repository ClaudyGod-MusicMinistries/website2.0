import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { AlbumGrid } from '@/components/music/AlbumGrid';
import { StreamingPlatforms } from '@/components/music/StreamingPlatforms';

export const metadata: Metadata = {
  title: 'Music — ClaudyGod Music Ministries',
  description: 'Explore the full discography of Minister ClaudyGod — gospel albums and worship music available on all major streaming platforms.',
};

export default function MusicPage() {
  return (
    <>
      <PageHero
        eyebrow="Music"
        title="Worship That Transforms"
        subtitle="Seven albums of spirit-filled gospel music — available everywhere you stream."
      />
      <StreamingPlatforms />
      <AlbumGrid />
    </>
  );
}
