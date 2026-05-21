import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/shared/PageHero';
import { GridSkeleton } from '@/components/shared/GridSkeleton';
import { AnimateOnView } from '@/components/shared/AnimateOnView';

export const metadata: Metadata = {
  title: 'Store — ClaudyGod Music Ministries',
  description: 'Shop exclusive ClaudyGod merchandise — music, apparel, and accessories.',
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
      />
      <AnimateOnView><ProductGrid /></AnimateOnView>
      <CartDrawer />
    </>
  );
}
