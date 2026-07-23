'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStoreProducts } from '@/hooks/useStoreProducts';
import { toProduct } from '@/lib/data/adapters';
import { ProductCard } from '@/components/store/ProductCard';
import { buttonVariants } from '@/lib/theme/buttons';
import { Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

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
  const router = useRouter();
  const { products: rawProducts, loading } = useStoreProducts();
  const preview = rawProducts.slice(0, 4).map(toProduct);

  // useStoreProducts falls back to real curated products on a failed fetch,
  // so this only stays empty if there's truly nothing (loading finished with
  // zero products either way) — not on every transient API error.
  if (!loading && preview.length === 0) return null;

  return (
    <section className="bg-cream-100 section-py border-t border-black/[0.05]">
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-4 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="rule-gold" />
              <span className="label-eyebrow">Merchandise</span>
            </div>
            <h2 className="font-raleway font-light text-neutral-900 text-2xl sm:text-3xl md:text-4xl tracking-normal leading-tight">
              Official Store
            </h2>
            <p className="mt-2 sm:mt-3 font-sans text-neutral-500 text-sm sm:text-base font-light max-w-md leading-relaxed">
              Music, apparel, and accessories — wear your faith, carry the anointing.
            </p>
          </div>
          <Link
            href="/store"
            className={cn(
              buttonVariants({ variant: 'outline-dark', size: 'lg', uppercase: true }),
              'hidden md:inline-flex whitespace-nowrap group'
            )}
          >
            Browse All
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

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
                <ProductCard product={product} onViewDetails={() => router.push('/store')} />
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
    </section>
  );
}
