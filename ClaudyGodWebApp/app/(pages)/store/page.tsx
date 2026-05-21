import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { ProductGrid } from '@/components/store/ProductGrid';
import { CartDrawer } from '@/components/store/CartDrawer';

export const metadata: Metadata = {
  title: 'Store — ClaudyGod Music Ministries',
  description: 'Shop exclusive ClaudyGod merchandise — music, apparel, and accessories.',
};

export default function StorePage() {
  return (
    <>
      <PageHero
        eyebrow="Store"
        title="Official Merchandise"
        subtitle="Music, apparel, and accessories — wear your worship."
      />
      <ProductGrid />
      <CartDrawer />
    </>
  );
}
