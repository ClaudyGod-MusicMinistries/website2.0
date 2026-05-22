import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/shared/PageHero';
import { StreamingPlatforms } from '@/components/music/StreamingPlatforms';
import { GridSkeleton } from '@/components/shared/GridSkeleton';
import { AnimateOnView } from '@/components/shared/AnimateOnView';

export const metadata: Metadata = {
  title: 'Music & Discography — ClaudyGod',
  description: 'Stream ClaudyGod\'s full discography — 7 albums of spirit-filled gospel music available on Spotify, Apple Music, YouTube, Deezer, and Amazon Music.',
  keywords: ['ClaudyGod music', 'gospel albums', 'worship songs Spotify', 'Nigerian gospel discography', 'ClaudyGod albums'],
  openGraph: { title: 'ClaudyGod Music & Discography', description: '7 albums of spirit-filled gospel worship music.', url: '/music' },
  alternates: { canonical: 'https://claudygod.com/music' },
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
        backgroundImage="https://cdn.jsdelivr.net/gh/ClaudyGod-MusicMinistries/CGM-Assets@latest/Bg_13.webp"
      />
      <StreamingPlatforms />
      <AnimateOnView><AlbumGrid /></AnimateOnView>
    </>
  );
}
