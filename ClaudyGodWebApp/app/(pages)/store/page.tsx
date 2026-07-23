import { SITE_URL } from '@/lib/config/site';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/shared/PageHero';
import { GridSkeleton } from '@/components/shared/GridSkeleton';
import { AnimateOnView } from '@/components/shared/AnimateOnView';
import { breadcrumb } from '@/lib/utils/jsonLd';

export const metadata: Metadata = {
  title: 'Official ClaudyGod Store — Gospel Merchandise & Apparel',
  description:
    'Shop exclusive ClaudyGod merchandise — gospel music T-shirts, hoodies, caps, tote bags, and accessories. Wear your faith. International shipping available.',
  keywords: [
    'ClaudyGod merchandise',
    'gospel music store Nigeria',
    'ClaudyGod T-shirt',
    'ClaudyGod hoodie',
    'ClaudyGod cap',
    'Christian apparel Nigeria',
    'gospel ministry store',
    'buy ClaudyGod merch',
    'worship tote bag',
    'gospel music gift',
    'Christian clothing Nigeria',
    'ClaudyGod official store',
    'Nigeria gospel merchandise',
    'gospel artist merchandise',
    'faith wear Nigeria',
    'ministry apparel',
  ],
  openGraph: {
    title: 'ClaudyGod Official Store — Gospel Merchandise & Apparel',
    description:
      'Shop exclusive ClaudyGod merchandise — T-shirts, hoodies, caps & accessories. International shipping available.',
    url: '/store',
    images: [{ url: '/Bg_13.webp', width: 1920, height: 1080, alt: 'ClaudyGod Official Store' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClaudyGod Official Store — Gospel Merch',
    images: ['/Bg_13.webp'],
  },
  alternates: { canonical: `${SITE_URL}/store` },
};

const ProductGrid = dynamic(
  () => import('@/components/store/ProductGrid').then((m) => m.ProductGrid),
  { loading: () => <GridSkeleton cols={4} rows={2} /> }
);

const CartDrawer = dynamic(
  () => import('@/components/store/CartDrawer').then((m) => m.CartDrawer),
  { ssr: false }
);

// Product itemList JSON-LD dropped: it previously enumerated a static
// placeholder list that had already drifted from real content once, and
// now that products are fetched client-side from the real backend, an
// accurate list isn't available here in a Server Component without a
// second server-side fetch. Breadcrumb schema alone is honest; a stale
// or empty itemList is worse than no itemList.
const schemas = [breadcrumb([{ name: 'Store', href: '/store' }])];

export default function StorePage() {
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
        eyebrow="Store"
        title="Official Merchandise"
        subtitle="Music, apparel, and accessories — wear your worship."
        backgroundImage="/Bg_13.webp"
        objectPosition="center center"
      />
      <AnimateOnView>
        <ProductGrid />
      </AnimateOnView>
      <CartDrawer />
    </>
  );
}
