'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { useStoreProducts } from '@/hooks/useStoreProducts';
import { toProduct } from '@/lib/data/adapters';
import { formatPrice } from '@/lib/utils/format';
import { buttonVariants } from '@/lib/theme/buttons';
import { useCartStore } from '@/components/store/cartStore';
import { Skeleton } from '@/components/ui';
import type { Product } from '@/types/store';
import { cn } from '@/lib/utils/cn';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const rowVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

interface AccordionRowProps {
  product: Product;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionRow({ product, isOpen, onToggle }: AccordionRowProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const gallery = product.images && product.images.length > 1 ? product.images : null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setQty(1);
    setTimeout(() => setAdded(false), 1800);
  };

  const panelId = `store-panel-${product.id}`;

  return (
    <motion.div variants={rowVariant} className="border-b border-black/[0.07] last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center gap-4 sm:gap-5 py-4 sm:py-5 text-left group"
      >
        <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white ring-1 ring-black/[0.06]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={gallery ? gallery[activeImage] : product.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Image
                src={gallery ? gallery[activeImage] : product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                sizes="80px"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-sans text-[0.65rem] tracking-[0.18em] uppercase text-neutral-400 mb-0.5 capitalize">
            {product.category}
          </p>
          <p className="font-display font-semibold text-neutral-900 text-sm sm:text-base leading-snug truncate group-hover:text-purple-700 transition-colors duration-300">
            {product.name}
          </p>
          <p className="font-sans text-neutral-500 text-sm mt-0.5">{formatPrice(product.price)}</p>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border transition-colors duration-300',
            isOpen
              ? 'bg-purple-600 border-purple-600 text-white'
              : 'border-neutral-200 text-neutral-400 group-hover:border-purple-300 group-hover:text-purple-600'
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 sm:pb-6 sm:pl-[6.25rem] flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
              <div className="flex-1">
                <p className="font-sans text-neutral-600 text-sm leading-relaxed">
                  {product.description}
                </p>

                {gallery && (
                  <div className="flex items-center gap-2 mt-3">
                    {gallery.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setActiveImage(i)}
                        aria-label={`View ${i === 0 ? 'front' : i === 1 ? 'back' : `view ${i + 1}`}`}
                        className={cn(
                          'relative w-10 h-10 rounded-lg overflow-hidden border-2 transition-colors duration-200 shrink-0',
                          activeImage === i
                            ? 'border-purple-600'
                            : 'border-black/[0.08] hover:border-purple-300'
                        )}
                      >
                        <Image src={src} alt="" fill className="object-cover" sizes="40px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center border border-neutral-200 rounded-full overflow-hidden bg-white">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-purple-700 hover:bg-neutral-50 transition-colors duration-200"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-7 text-center font-sans text-sm font-semibold text-neutral-900 tabular-nums">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-purple-700 hover:bg-neutral-50 transition-colors duration-200"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <motion.button
                  onClick={handleAdd}
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    buttonVariants({
                      variant: added ? 'secondary' : 'primary',
                      size: 'sm',
                      uppercase: true,
                    }),
                    'min-w-[132px]'
                  )}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {added ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-1.5"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Added
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-1.5"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function StorePreview() {
  const { products: rawProducts, loading, error } = useStoreProducts();
  const preview = rawProducts.slice(0, 4).map(toProduct);
  const [openId, setOpenId] = useState<string | null>(null);

  if (error) return null;

  return (
    <section className="bg-cream-100 section-py border-t border-black/[0.05]">
      <div className="container-site">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-14">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="rule-gold" />
              <span className="label-eyebrow">Merchandise</span>
            </div>
            <h2 className="font-display font-bold text-neutral-900 text-2xl sm:text-3xl md:text-4xl tracking-tight">
              Official Store
            </h2>
            <p className="mt-2 sm:mt-3 font-sans text-neutral-500 text-sm sm:text-base font-light max-w-md leading-relaxed">
              Music, apparel, and accessories — wear your faith, carry the anointing.
            </p>
          </div>
          <Link
            href="/store"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg', uppercase: true }),
              'hidden sm:inline-flex shrink-0 group'
            )}
          >
            Browse All
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Accordion list */}
        {loading ? (
          <div className="max-w-3xl mx-auto sm:mx-0 border-t border-black/[0.07] divide-y divide-black/[0.07]">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 sm:gap-5 py-4 sm:py-5">
                <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 shrink-0" rounded="lg" />
                <Skeleton className="h-5 flex-1 max-w-xs" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="max-w-3xl mx-auto sm:mx-0 border-t border-black/[0.07]"
          >
            {preview.map((product) => (
              <AccordionRow
                key={product.id}
                product={product}
                isOpen={openId === product.id}
                onToggle={() => setOpenId((id) => (id === product.id ? null : product.id))}
              />
            ))}
          </motion.div>
        )}

        {/* CTA row */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
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
          <Link
            href="/store"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg', uppercase: true }),
              'sm:hidden'
            )}
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
