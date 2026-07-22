'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X, ShoppingBag, Star } from 'lucide-react';
import { useCartStore } from './cartStore';
import { formatPrice } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import type { Product } from '@/types/store';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart  = useCartStore((s) => s.openCart);
  const [activeImage, setActiveImage] = useState(0);

  const gallery = product?.images && product.images.length > 1 ? product.images : null;

  useEffect(() => {
    setActiveImage(0);
  }, [product?.id]);

  const handleAdd = () => {
    if (!product) return;
    addToCart(product);
    openCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[700] bg-black/85 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[701] flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div className="relative bg-surface-deep border border-white/[0.08] w-full max-w-3xl pointer-events-auto">
              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-neutral-500 hover:text-white transition-all duration-200"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
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
                          sizes="(max-width:768px) 100vw, 50vw"
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
                            activeImage === i ? 'border-gold-500' : 'border-white/[0.08] hover:border-white/25'
                          )}
                        >
                          <Image src={src} alt="" fill className="object-cover" sizes="56px" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col p-8">
                  {/* Category eyebrow */}
                  <p className="font-sans text-[0.48rem] tracking-[0.2em] uppercase text-gold-400/70 mb-3 capitalize">
                    {product.category}
                  </p>

                  {/* Name */}
                  <h2 className="font-display font-bold text-white text-xl leading-snug tracking-tight mb-3">
                    {product.name}
                  </h2>

                  {/* Rating */}
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

                  {/* Separator */}
                  <div className="h-px bg-white/[0.06] mb-5" />

                  {/* Description */}
                  <p className="font-sans text-neutral-500 text-sm font-light leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-8">
                    {['Premium quality materials', 'Official ClaudyGod merchandise', 'Ships worldwide'].map((b) => (
                      <li key={b} className="flex items-center gap-2.5 font-sans text-xs text-neutral-600">
                        <span className="w-1 h-1 rounded-full bg-gold-500/60 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    {/* Price */}
                    <p className="font-display font-bold text-white text-2xl tracking-tight mb-4">
                      {formatPrice(product.price)}
                    </p>

                    {/* CTA */}
                    <button
                      onClick={handleAdd}
                      className="w-full h-12 bg-purple-600 hover:bg-purple-500 text-white font-sans text-[0.6rem] tracking-[0.22em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5 group"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Add to Cart
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
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
