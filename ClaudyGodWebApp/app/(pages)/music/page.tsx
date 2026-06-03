import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero }          from '@/components/shared/PageHero';
import { StreamingPlatforms }from '@/components/music/StreamingPlatforms';
import { MusicPlayer }       from '@/components/music/MusicPlayer';
import { CrossPromo }        from '@/components/shared/CrossPromo';
import { GridSkeleton }      from '@/components/shared/GridSkeleton';
import { AnimateOnView }     from '@/components/shared/AnimateOnView';
import { breadcrumb, musicAlbum, itemList } from '@/utils/jsonLd';

export const metadata: Metadata = {
  title: 'Music & Discography — ClaudyGod | Gospel Albums & Worship Songs',
  description:
    "Stream ClaudyGod's full discography — 7 Spirit-filled gospel albums including 'Very Glorious', 'You Are Our Everything', and 'Lover of My Soul'. Available on Spotify, Apple Music, YouTube, Deezer & Amazon Music.",
  keywords: [
    'ClaudyGod music', 'ClaudyGod albums', 'ClaudyGod discography',
    'Very Glorious ClaudyGod', 'You Are Our Everything ClaudyGod',
    'Lover of My Soul ClaudyGod', 'gospel album Nigeria 2024',
    'Nigerian gospel songs', 'Christian worship music Nigeria',
    'ClaudyGod Spotify', 'ClaudyGod Apple Music', 'ClaudyGod YouTube',
    'gospel music streaming Nigeria', 'best Nigerian gospel albums',
    'spirit filled worship songs', 'Nigerian gospel discography',
    'ClaudyGod new music', 'gospel music download Nigeria',
  ],
  openGraph: {
    title:       "ClaudyGod Music & Discography — 7 Gospel Albums",
    description: "Stream 7 albums of Spirit-filled worship — 'Very Glorious', 'You Are Our Everything', and more. Listen on Spotify, Apple Music, YouTube & beyond.",
    url:         '/music',
    type:        'profile',
    images: [{
      url:    '/Bg_13.webp',
      width:  1920,
      height: 1080,
      alt:    'ClaudyGod Music & Discography',
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'ClaudyGod Music — 7 Gospel Albums',
    description: "Stream 'Very Glorious', 'You Are Our Everything' & more on all platforms.",
    images:      ['/Bg_13.webp'],
  },
  alternates: { canonical: 'https://claudygod.com/music' },
};

const AlbumGrid = dynamic(
  () => import('@/components/music/AlbumGrid').then((m) => m.AlbumGrid),
  { loading: () => <GridSkeleton cols={3} rows={2} /> }
);

/* ── Structured data ── */
const schemas = [
  breadcrumb([{ name: 'Music & Discography', href: '/music' }]),
  musicAlbum({
    name:        'You Are Our Everything',
    description: "ClaudyGod's latest gospel album — a Spirit-filled collection of worship songs celebrating God's glory and faithfulness.",
    imageUrl:    '/CoverArt.webp',
    releaseDate: '2024-11-01',
    spotifyUrl:  'https://open.spotify.com/album/1zCT0YUVggnzkZJK5VP0yd',
    appleUrl:    'https://music.apple.com/ng/album/you-are-our-everything-single/1803827230',
    youtubeUrl:  'https://www.youtube.com/watch?v=fK_tCBcnqGs',
  }),
  musicAlbum({
    name:        'Very Glorious',
    description: "ClaudyGod's acclaimed gospel worship album — Spirit-filled songs of praise and adoration.",
    imageUrl:    '/veryGlorious.jpg',
    releaseDate: '2024-01-01',
    spotifyUrl:  'https://open.spotify.com/track/4Y59X6LBT2FZQbkcQAa2AQ',
    appleUrl:    'https://music.apple.com/ng/song/very-glorious/1789665670',
  }),
  itemList('ClaudyGod Gospel Albums', [
    { name: 'You Are Our Everything', url: 'https://claudygod.com/music#you-are-our-everything' },
    { name: 'Very Glorious',          url: 'https://claudygod.com/music#very-glorious'          },
    { name: 'We Would Reign',         url: 'https://claudygod.com/music#we-would-reign'         },
    { name: 'Lover of My Soul',       url: 'https://claudygod.com/music#lover-of-my-soul'       },
  ]),
];

export default function MusicPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <PageHero
        eyebrow="Music"
        title="Worship That Transforms"
        subtitle="Seven albums of spirit-filled gospel music — available everywhere you stream."
        backgroundImage="/Bg_13.webp"
        objectPosition="center center"
      />
      <StreamingPlatforms />
      <MusicPlayer />
      <AnimateOnView><AlbumGrid /></AnimateOnView>
      <CrossPromo />
    </>
  );
}
