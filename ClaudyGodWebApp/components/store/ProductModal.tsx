'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X, ShoppingBag, Star } from 'lucide-react';
import { useCartStore } from './cartStore';
import { formatPrice } from '@/utils/format';
import type { Product } from '@/types/store';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart  = useCartStore((s) => s.openCart);

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
            <div className="relative bg-[#0e0e0e] border border-white/[0.08] w-full max-w-3xl pointer-events-auto">
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
                <div className="relative aspect-square bg-[#111]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 ring-1 ring-white/[0.05] pointer-events-none" />
                </div>

                {/* Details */}
                <div className="flex flex-col p-8">
                  {/* Category eyebrow */}
                  <p className="font-worksans text-[0.48rem] tracking-[0.2em] uppercase text-gold-400/70 mb-3 capitalize">
                    {product.category}
                  </p>

                  {/* Name */}
                  <h2 className="font-bricolage font-bold text-white text-xl leading-snug tracking-tight mb-3">
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
                      <span className="font-worksans text-[0.48rem] tracking-[0.1em] text-neutral-600 ml-1">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                  )}

                  {/* Separator */}
                  <div className="h-px bg-white/[0.06] mb-5" />

                  {/* Description */}
                  <p className="font-roboto text-neutral-500 text-sm font-light leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-8">
                    {['Premium quality materials', 'Official ClaudyGod merchandise', 'Ships worldwide'].map((b) => (
                      <li key={b} className="flex items-center gap-2.5 font-roboto text-xs text-neutral-600">
                        <span className="w-1 h-1 rounded-full bg-gold-500/60 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    {/* Price */}
                    <p className="font-bricolage font-bold text-white text-2xl tracking-tight mb-4">
                      {formatPrice(product.price)}
                    </p>

                    {/* CTA */}
                    <button
                      onClick={handleAdd}
                      className="w-full h-12 bg-purple-600 hover:bg-purple-500 text-white font-worksans text-[0.6rem] tracking-[0.22em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5 group"
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
