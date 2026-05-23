import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Loader } from '@/components/shared/Loader';
import './globals.css';

const WelcomeModal   = dynamic(() => import('@/components/shared/WelcomeModal').then(m => m.WelcomeModal),   { ssr: false });
const CookieConsent  = dynamic(() => import('@/components/shared/CookieConsent').then(m => m.CookieConsent), { ssr: false });
const ChatWidget     = dynamic(() => import('@/components/shared/ChatWidget').then(m => m.ChatWidget),       { ssr: false });
const AIChatWidget   = dynamic(() => import('@/components/ui/AIChatWidget').then(m => m.AIChatWidget),      { ssr: false });

// ─── Viewport ──────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor:    '#080808',
  width:         'device-width',
  initialScale:  1,
  maximumScale:  5,
};

// ─── Metadata ──────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://claudygod.com'),
  title: {
    template: '%s | ClaudyGod Music Ministries',
    default:  'ClaudyGod Music Ministries',
  },
  description:
    'Official website of ClaudyGod — Gospel music artist, minister, and worship leader spreading the love of God through music.',
  keywords: [
    'ClaudyGod',
    'gospel music',
    'Christian music',
    'worship',
    'ministry',
    'Nigerian gospel',
  ],
  authors:   [{ name: 'ClaudyGod Music Ministries' }],
  creator:   'ClaudyGod Music Ministries',
  publisher: 'ClaudyGod Music Ministries',
  openGraph: {
    type:      'website',
    siteName:  'ClaudyGod Music Ministries',
    locale:    'en_US',
    images:    [{ url: '/ClaudySocial.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card:   'summary_large_image',
    images: ['/ClaudySocial.jpg'],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  manifest: '/manifest.json',
};

// ─── JSON-LD Structured Data ────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'ClaudyGod Music Ministries',
  url: 'https://claudygod.com',
  image: 'https://claudygod.com/ClaudySocial.jpg',
  description:
    'ClaudyGod is a Nigerian gospel music artist, minister, and worship leader with over 20 years in ministry and 7 studio albums. Known for Spirit-filled worship that transforms lives.',
  genre: ['Gospel', 'Christian Music', 'Worship', 'Contemporary Gospel'],
  foundingDate: '2003',
  areaServed: { '@type': 'Country', name: 'Nigeria' },
  sameAs: [
    'https://www.facebook.com/ClaudyGod/',
    'https://www.instagram.com/singerclaudygod/',
    'https://twitter.com/claudygod',
    'https://www.tiktok.com/@claudygod',
    'https://open.spotify.com/artist/claudygod',
    'https://music.apple.com/artist/claudygod',
    'https://www.youtube.com/channel/UC0RUDNzIiSLxoWGcNQbrLNQ',
    'https://www.deezer.com/us/album/695949191',
    'https://music.amazon.com/albums/B0DSM7QGLF',
  ],
};

// ─── Root layout ────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
