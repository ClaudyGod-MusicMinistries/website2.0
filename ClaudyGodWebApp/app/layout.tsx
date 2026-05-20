import type { Metadata, Viewport } from 'next';
import './globals.css';

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

// ─── Root layout ────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-bricolage bg-surface-base text-white antialiased min-h-dvh">
        {children}
      </body>
    </html>
  );
}
