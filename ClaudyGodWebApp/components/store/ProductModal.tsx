'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X, ShoppingBag, Star, Check } from 'lucide-react';
import { useCartStore } from './cartStore';
import { formatPrice } from '@/lib/utils/format';
import { buttonVariants } from '@/lib/theme/buttons';
import { cn } from '@/lib/utils/cn';
import type { Product } from '@/types/store';

interface Props {
  product: Product | null;
  onClose: () => void;
}

const benefits = ['Premium quality materials', 'Official ClaudyGod merchandise', 'Ships worldwide'];

/**
 * A bottom sheet on mobile (slides up, anchored to the viewport bottom —
 * the natural mobile pattern for "more detail on this thing I tapped"),
 * a centered panel on desktop. Same responsive-shape technique as
 * WelcomeModal: `items-end sm:items-center` + `rounded-t-xl sm:rounded-xl`.
 */
export function ProductModal({ product, onClose }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useCartStore((s) => s.openCart);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const gallery = product?.images && product.images.length > 1 ? product.images : null;

  useEffect(() => {
    setActiveImage(0);
    setAdded(false);
  }, [product?.id]);

  const handleAdd = () => {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    openCart();
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[700] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            className="fixed inset-0 z-[701] flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <div className="relative w-full sm:max-w-3xl max-h-[92svh] sm:max-h-[85vh] overflow-y-auto bg-surface-raised border border-white/[0.08] rounded-t-xl sm:rounded-xl shadow-popup">
              {/* Drag handle — mobile only, signals "swipe/tap to dismiss" */}
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <span className="w-10 h-1 rounded-full bg-white/15" />
              </div>

              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-neutral-400 hover:text-white transition-all duration-200"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Image */}
                <div className="flex flex-col">
                  <div className="relative aspect-square bg-surface-elevated overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={gallery ? gallery[activeImage] : product.image}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={gallery ? gallery[activeImage] : product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width:640px) 100vw, 50vw"
                        />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 ring-1 ring-white/[0.05] pointer-events-none" />
                  </div>

                  {/* Thumbnail strip — front/back/angles */}
                  {gallery && (
                    <div className="flex items-center gap-2 p-4 bg-surface-elevated">
                      {gallery.map((src, i) => (
                        <button
                          key={src}
                          onClick={() => setActiveImage(i)}
                          aria-label={`View ${i === 0 ? 'front' : i === 1 ? 'back' : `view ${i + 1}`}`}
                          className={cn(
                            'relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors duration-200 shrink-0',
                            activeImage === i
                              ? 'border-gold-500'
                              : 'border-white/[0.08] hover:border-white/25'
                          )}
                        >
                          <Image src={src} alt="" fill className="object-cover" sizes="56px" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col p-6 sm:p-8">
                  <p className="font-sans text-[0.48rem] tracking-[0.2em] uppercase text-gold-400/70 mb-3 capitalize">
                    {product.category}
                  </p>

                  <h2 className="font-raleway font-light text-white text-2xl leading-snug tracking-normal mb-3">
                    {product.name}
                  </h2>

                  {product.rating && (
                    <div className="flex items-center gap-1.5 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.round(product.rating!) ? 'text-gold-400 fill-gold-400' : 'text-neutral-700'}`}
                        />
                      ))}
                      <span className="font-sans text-[0.48rem] tracking-[0.1em] text-neutral-600 ml-1">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                  )}

                  <div className="h-px bg-white/[0.06] mb-5" />

                  <p className="font-sans text-neutral-500 text-sm font-light leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2.5 font-sans text-xs text-neutral-600"
                      >
                        <span className="w-1 h-1 rounded-full bg-gold-500/60 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <p className="font-display font-bold text-white text-2xl tracking-tight mb-4">
                      {formatPrice(product.price)}
                    </p>

                    <button
                      onClick={handleAdd}
                      className={cn(
                        buttonVariants({
                          variant: 'secondary',
                          size: 'xl',
                          fullWidth: true,
                          uppercase: true,
                        }),
                        'group'
                      )}
                    >
                      {added ? (
                        <>
                          <Check className="h-4 w-4" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-4 w-4" />
                          Add to Cart
                          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                            →
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
