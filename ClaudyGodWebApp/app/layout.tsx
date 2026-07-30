import type { Metadata, Viewport } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlobalOverlays } from '@/components/layout/GlobalOverlays';
import { musicGroup, webSite, person } from '@/lib/utils/jsonLd';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE_PATH } from '@/lib/config/site';
import '@fontsource-variable/montserrat/wght.css';
import '@fontsource-variable/montserrat/wght-italic.css';
import '@fontsource-variable/open-sans/wght.css';
import '@fontsource-variable/open-sans/wght-italic.css';
import '@fontsource-variable/raleway/wght.css';
import './globals.css';

// ─── Viewport ──────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// ─── Root Metadata ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} — Gospel Artist, Minister & Worship Leader`,
  },

  description: SITE_DESCRIPTION,

  keywords: [
    'ClaudyGod',
    'Minister ClaudyGod',
    'ClaudyGod Music Ministries',
    'Nigerian gospel artist',
    'gospel music Nigeria',
    'Christian music Nigeria',
    'worship leader Port Harcourt',
    'gospel singer Nigeria',
    'Very Glorious ClaudyGod',
    'You Are Our Everything ClaudyGod',
    'gospel album 2024 Nigeria',
    'gospel concert Nigeria',
    'book gospel artist Nigeria',
    'Nigerian worship songs',
    'gospel music streaming',
    'ClaudyGod Spotify',
    'ClaudyGod YouTube',
    'spirit filled worship',
    'gospel ministry Nigeria',
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Music',

  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    url: SITE_URL,
    title: `${SITE_NAME} — Gospel Artist & Worship Leader`,
    description:
      'Spirit-filled gospel music, ministry, and worship from Minister ClaudyGod — spreading the love of God to the ends of the earth.',
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1730,
        height: 909,
        alt: SITE_NAME,
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@claudygod',
    creator: '@claudygod',
    title: SITE_NAME,
    description: 'Spirit-filled gospel music, ministry, and worship from Minister ClaudyGod.',
    images: [{ url: OG_IMAGE_PATH, alt: SITE_NAME }],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  manifest: '/manifest.json',

  verification: {
    google: 'uRQ-mtCDzE4I0xSrGiOFM-EiBW9ylzZwBdfOgcURaaQ',
    other: { 'msvalidate.01': 'CDC0BA45440A0A1BB38769D83C132EBB' },
  },

  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

// ─── JSON-LD Graph — multiple schemas bundled ──────────────────────────────
const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [webSite(), musicGroup(), person()],
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
      <body className="font-display bg-surface-base text-white antialiased min-h-dvh">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-sans focus:text-sm focus:font-semibold focus:text-neutral-900"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="min-h-dvh">
          {children}
        </main>
        <Footer />
        <GlobalOverlays />
      </body>
    </html>
  );
}
