import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero }    from '@/components/shared/PageHero';
import { CrossPromo }  from '@/components/shared/CrossPromo';
import { GridSkeleton }from '@/components/shared/GridSkeleton';
import { breadcrumb, videoObject, itemList } from '@/utils/jsonLd';

export const metadata: Metadata = {
  title: 'Watch ClaudyGod Videos — Music Videos, Live Worship & More',
  description:
    'Watch official ClaudyGod music videos, live worship sessions, visualizers, and ministry recordings. Subscribe on YouTube @claudygodministries for new gospel music content.',
  keywords: [
    'ClaudyGod videos', 'ClaudyGod music videos', 'ClaudyGod YouTube',
    'gospel music videos Nigeria', 'worship video YouTube',
    'ClaudyGod live worship', 'live gospel session Nigeria',
    'ClaudyGod visualizer', 'Very Glorious video', 'You Are Our Everything video',
    'Nigerian gospel music video 2024', 'ClaudyGod official video',
    'gospel concert video Nigeria', 'Christian music video Nigeria',
    'ClaudyGod worship YouTube', 'Nigerian gospel YouTube channel',
    'gospel ministry videos', 'ClaudyGod live performance',
  ],
  openGraph: {
    title:       'ClaudyGod Videos — Official Music Videos & Live Worship',
    description: 'Watch music videos, live worship sessions & more from Minister ClaudyGod. Subscribe on YouTube for new gospel content.',
    url:         '/videos',
    images: [{
      url:    '/Tour_Ph_1.webp',
      width:  1920,
      height: 1080,
      alt:    'ClaudyGod Videos — Watch & Worship',
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'ClaudyGod Videos — Music Videos & Live Worship',
    description: 'Watch official music videos & live sessions from Minister ClaudyGod.',
    images:      ['/Tour_Ph_1.webp'],
  },
  alternates: { canonical: 'https://claudygod.com/videos' },
};

const VideoGrid = dynamic(
  () => import('@/components/videos/VideoGrid').then((m) => m.VideoGrid),
  { loading: () => <GridSkeleton cols={4} rows={2} /> }
);

/* ── Structured data ── */
const schemas = [
  breadcrumb([{ name: 'Videos', href: '/videos' }]),
  videoObject({
    name:         'Very Glorious — Official Music Video | ClaudyGod',
    description:  "Official music video for 'Very Glorious' by ClaudyGod — a Spirit-filled gospel worship anthem.",
    youtubeId:    'F36AiXSSADQ',
    uploadDate:   '2024-01-01',
    duration:     'PT4M30S',
    thumbnailUrl: 'https://img.youtube.com/vi/F36AiXSSADQ/maxresdefault.jpg',
  }),
  itemList('ClaudyGod Official Videos', [
    { name: 'Very Glorious — Official Music Video', url: 'https://www.youtube.com/watch?v=F36AiXSSADQ' },
    { name: 'You Are Our Everything',               url: 'https://www.youtube.com/watch?v=fK_tCBcnqGs' },
    { name: 'Lover of My Soul',                     url: 'https://youtu.be/ivj5gVeTCJQ'                },
  ]),
];

export default function VideosPage() {
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
