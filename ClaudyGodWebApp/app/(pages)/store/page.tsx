import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/shared/PageHero';
import { GridSkeleton } from '@/components/shared/GridSkeleton';
import { AnimateOnView } from '@/components/shared/AnimateOnView';

export const metadata: Metadata = {
  title: 'Official ClaudyGod Merchandise Store',
  description: 'Shop exclusive ClaudyGod merchandise — gospel music, worship apparel, and accessories. Wear your faith.',
  keywords: ['ClaudyGod merchandise', 'gospel music store', 'Christian apparel', 'ministry store'],
  openGraph: { title: 'ClaudyGod Official Store', description: 'Exclusive merchandise — music, apparel, and accessories.', url: '/store' },
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

export default function StorePage() {
  return (
    <>
      <PageHero
        eyebrow="Store"
        title="Official Merchandise"
        subtitle="Music, apparel, and accessories — wear your worship."
        backgroundImage="/MusicBanner1.webp"
        objectPosition="center center"
      />
      <AnimateOnView><ProductGrid /></AnimateOnView>
      <CartDrawer />
    </>
  );
}
