import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero }    from '@/components/shared/PageHero';
import { GridSkeleton }from '@/components/shared/GridSkeleton';
import { AnimateOnView }from '@/components/shared/AnimateOnView';
import { breadcrumb, itemList } from '@/utils/jsonLd';

export const metadata: Metadata = {
  title: 'Official ClaudyGod Store — Gospel Merchandise & Apparel',
  description:
    'Shop exclusive ClaudyGod merchandise — gospel music T-shirts, hoodies, caps, tote bags, and accessories. Wear your faith. International shipping available.',
  keywords: [
    'ClaudyGod merchandise', 'gospel music store Nigeria',
    'ClaudyGod T-shirt', 'ClaudyGod hoodie', 'ClaudyGod cap',
    'Christian apparel Nigeria', 'gospel ministry store',
    'buy ClaudyGod merch', 'worship tote bag', 'gospel music gift',
    'Christian clothing Nigeria', 'ClaudyGod official store',
    'Nigeria gospel merchandise', 'gospel artist merchandise',
    'faith wear Nigeria', 'ministry apparel',
  ],
  openGraph: {
    title:       'ClaudyGod Official Store — Gospel Merchandise & Apparel',
    description: 'Shop exclusive ClaudyGod merchandise — T-shirts, hoodies, caps & accessories. International shipping available.',
    url:         '/store',
    images: [{ url: '/Bg_13.webp', width: 1920, height: 1080, alt: 'ClaudyGod Official Store' }],
  },
  twitter: {
    card:  'summary_large_image',
    title: 'ClaudyGod Official Store — Gospel Merch',
    images:['/Bg_13.webp'],
  },
  alternates: { canonical: 'https://claudygod.com/store' },
};

const ProductGrid = dynamic(
  () => import('@/components/store/ProductGrid').then((m) => m.ProductGrid),
  { loading: () => <GridSkeleton cols={4} rows={2} /> }
);

const CartDrawer = dynamic(
  () => import('@/components/store/CartDrawer').then((m) => m.CartDrawer),
  { ssr: false }
);

const schemas = [
  breadcrumb([{ name: 'Store', href: '/store' }]),
  itemList('ClaudyGod Official Merchandise', [
    { name: 'ClaudyGod Premium T-Shirt', url: 'https://claudygod.com/store', imageUrl: 'https://claudygod.com/Product1.webp' },
    { name: 'ClaudyGod Exclusive Hoodie', url: 'https://claudygod.com/store', imageUrl: 'https://claudygod.com/Product2.webp' },
    { name: 'ClaudyGod Cap Collection',   url: 'https://claudygod.com/store', imageUrl: 'https://claudygod.com/Product3.webp' },
    { name: 'ClaudyGod Worship Tote Bag', url: 'https://claudygod.com/store', imageUrl: 'https://claudygod.com/Product4.webp' },
  ]),
];

export default function StorePage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <PageHero
        eyebrow="Store"
        title="Official Merchandise"
        subtitle="Music, apparel, and accessories — wear your worship."
        backgroundImage="/Bg_13.webp"
        objectPosition="center center"
      />
      <AnimateOnView><ProductGrid /></AnimateOnView>
      <CartDrawer />
    </>
  );
}
