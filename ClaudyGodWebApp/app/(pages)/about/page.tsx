import type { Metadata } from 'next';
import { PageHero }        from '@/components/shared/PageHero';
import { BiographySection }from '@/components/about/BiographySection';
import { AlbumTimeline }   from '@/components/about/AlbumTimeline';
import { breadcrumb, person } from '@/utils/jsonLd';

export const metadata: Metadata = {
  title: 'About ClaudyGod — Nigerian Gospel Artist, Minister & Worship Leader',
  description:
    'Discover the story of Minister ClaudyGod — Nigerian gospel artist, songwriter, evangelist, and worship leader from Port Harcourt. Over 20 years of Spirit-filled ministry, 7 studio albums, and a global gospel impact.',
  keywords: [
    'ClaudyGod biography', 'who is ClaudyGod', 'Minister ClaudyGod story',
    'Nigerian gospel artist biography', 'gospel minister Port Harcourt',
    'Port Harcourt worship leader', 'gospel songwriter Nigeria',
    'Nigerian evangelist singer', 'ClaudyGod ministry history',
    'ClaudyGod albums', 'gospel music minister Nigeria',
    'ClaudyGod 20 years ministry', 'Rivers State gospel artist',
    'Christian music artist Nigeria', 'ClaudyGod calling testimony',
  ],
  openGraph: {
    title:       'About Minister ClaudyGod — Nigerian Gospel Artist & Worship Leader',
    description: 'Over 20 years of faithful ministry, 7 studio albums, and a God-breathed calling — discover the woman behind the worship.',
    url:         '/about',
    type:        'profile',
    images: [{
      url:    '/aboutUs.webp',
      width:  1200,
      height: 800,
      alt:    'Minister ClaudyGod — Nigerian Gospel Artist',
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'About Minister ClaudyGod — Nigerian Gospel Artist',
    description: 'Over 20 years of ministry, 7 albums, and a God-given calling.',
    images:      ['/aboutUs.webp'],
  },
  alternates: { canonical: 'https://claudygod.com/about' },
};

/* ── Structured data ── */
const schemas = [
  breadcrumb([{ name: 'About', href: '/about' }]),
  {
    ...person(),
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Gospel Music Artist and Minister',
      occupationLocation: { '@type': 'Country', name: 'Nigeria' },
      skills: 'Gospel singing, songwriting, worship leading, preaching, evangelism',
    },
    award: 'Over 20 years of faithful gospel ministry',
    numberOfAlbums: 7,
  },
];

export default function AboutPage() {
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
        eyebrow="About ClaudyGod"
        title="Minister, Artist & Worshipper"
        subtitle="A Nigerian gospel music minister whose God-breathed songs have touched lives across the world."
        backgroundImage="/aboutUs.webp"
        objectPosition="center top"
      />
      <BiographySection />
      <AlbumTimeline />
    </>
  );
}
