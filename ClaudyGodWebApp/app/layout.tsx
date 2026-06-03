import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { Navbar }  from '@/components/layout/Navbar';
import { Footer }  from '@/components/layout/Footer';
import { Loader }  from '@/components/shared/Loader';
import { musicGroup, webSite, person } from '@/utils/jsonLd';
import './globals.css';

const WelcomeModal  = dynamic(() => import('@/components/shared/WelcomeModal').then(m => m.WelcomeModal),  { ssr: false });
const CookieConsent = dynamic(() => import('@/components/shared/CookieConsent').then(m => m.CookieConsent),{ ssr: false });
const AIChatWidget  = dynamic(() => import('@/components/ui/AIChatWidget').then(m => m.AIChatWidget),     { ssr: false });

// ─── Viewport ──────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor:   '#080808',
  width:        'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// ─── Root Metadata ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://claudygod.com'),

  title: {
    template: '%s | ClaudyGod Music Ministries',
    default:  'ClaudyGod Music Ministries — Gospel Artist, Minister & Worship Leader',
  },

  description:
    'Official website of Minister ClaudyGod — Nigerian gospel music artist, worship leader, and evangelist. Stream 7 albums, watch worship videos, book for events, and follow the ministry.',

  keywords: [
    'ClaudyGod', 'Minister ClaudyGod', 'ClaudyGod Music Ministries',
    'Nigerian gospel artist', 'gospel music Nigeria', 'Christian music Nigeria',
    'worship leader Port Harcourt', 'gospel singer Nigeria',
    'Very Glorious ClaudyGod', 'You Are Our Everything ClaudyGod',
    'gospel album 2024 Nigeria', 'gospel concert Nigeria',
    'book gospel artist Nigeria', 'Nigerian worship songs',
    'gospel music streaming', 'ClaudyGod Spotify', 'ClaudyGod YouTube',
    'spirit filled worship', 'gospel ministry Nigeria',
  ],

  authors:   [{ name: 'ClaudyGod Music Ministries', url: 'https://claudygod.com' }],
  creator:   'ClaudyGod Music Ministries',
  publisher: 'ClaudyGod Music Ministries',
  category:  'Music',

  openGraph: {
    type:        'website',
    siteName:    'ClaudyGod Music Ministries',
    locale:      'en_US',
    url:         'https://claudygod.com',
    title:       'ClaudyGod Music Ministries — Gospel Artist & Worship Leader',
    description: 'Spirit-filled gospel music, ministry, and worship from Minister ClaudyGod — spreading the love of God to the ends of the earth.',
    images: [{
      url:    '/ClaudySocial.jpg',
      width:  1200,
      height: 630,
      alt:    'ClaudyGod Music Ministries',
      type:   'image/jpeg',
    }],
  },

  twitter: {
    card:        'summary_large_image',
    site:        '@claudygod',
    creator:     '@claudygod',
    title:       'ClaudyGod Music Ministries',
    description: 'Spirit-filled gospel music, ministry, and worship from Minister ClaudyGod.',
    images:      [{ url: '/ClaudySocial.jpg', alt: 'ClaudyGod Music Ministries' }],
  },

  robots: {
    index:     true,
    follow:    true,
    nocache:   false,
    googleBot: {
      index:               true,
      follow:              true,
      noimageindex:        false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  alternates: {
    canonical: 'https://claudygod.com',
  },

  manifest: '/manifest.json',

  verification: {
    google: 'uRQ-mtCDzE4I0xSrGiOFM-EiBW9ylzZwBdfOgcURaaQ',
    other:  { 'msvalidate.01': 'CDC0BA45440A0A1BB38769D83C132EBB' },
  },

  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

// ─── JSON-LD Graph — multiple schemas bundled ──────────────────────────────
const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    webSite(),
    musicGroup(),
    person(),
  ],
};

// ─── Root layout ────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ── Structured data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />

        {/* ── DNS preconnects for faster external resource loading ── */}
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://open.spotify.com" />
        <link rel="dns-prefetch" href="https://music.apple.com" />
      </head>
      <body className="font-bricolage bg-surface-base text-white antialiased min-h-dvh">
        <Loader />
        <Navbar />
        <main className="min-h-dvh">
          {children}
        </main>
        <Footer />
        <WelcomeModal />
        <CookieConsent />
        <AIChatWidget />
      </body>
    </html>
  );
}
