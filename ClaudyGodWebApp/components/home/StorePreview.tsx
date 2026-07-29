'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useStoreProducts } from '@/hooks/useStoreProducts';
import { toProduct } from '@/lib/data/adapters';
import { ProductCard } from '@/components/store/ProductCard';
import { ProductModal } from '@/components/store/ProductModal';
import { buttonVariants } from '@/lib/theme/buttons';
import { Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import type { Product } from '@/types/store';
import { SectionHeading } from '@/components/shared/SectionHeading';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Homepage store teaser — reuses the exact ProductCard used on the full
 * /store page (same hover states, quick-view overlay, rating stars, add-to-
 * cart) so this section reads as the same product experience rather than a
 * simplified preview, and mirrors MusicHighlight's grid/stagger pattern so
 * the two commerce/media sections feel like one consistent homepage system.
 */
export function StorePreview() {
  const { products: rawProducts, loading } = useStoreProducts();
  const preview = rawProducts.slice(0, 4).map(toProduct);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  // useStoreProducts falls back to real curated products on a failed fetch,
  // so this only stays empty if there's truly nothing (loading finished with
  // zero products either way) — not on every transient API error.
  if (!loading && preview.length === 0) return null;

  return (
    <section className="bg-cream-100 section-py border-t border-black/[0.05]">
      <div className="container-site">
        <SectionHeading
          eyebrow="Merchandise"
          title="Official store"
          description="Music, clothing, and accessories."
          action={
            <Link
              href="/store"
              className={cn(
                buttonVariants({ variant: 'outline-dark', size: 'lg', uppercase: true }),
                'hidden md:inline-flex whitespace-nowrap group'
              )}
            >
              Browse all
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          }
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="aspect-square w-full" rounded="lg" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {preview.map((product) => (
              <motion.div key={product.id} variants={cardVariant}>
                <ProductCard product={product} onViewDetails={() => setModalProduct(product)} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-10 sm:mt-12 flex md:hidden justify-center sm:justify-start">
          <Link
            href="/store"
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'lg', uppercase: true }),
              'group'
            )}
          >
            Visit Official Store
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
    </section>
  );
}
