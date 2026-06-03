'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from './cartStore';
import { formatPrice } from '@/utils/format';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useCartStore();
  const total = cartTotal();

  /* Close on Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, closeCart]);

  /* Trap body scroll when open */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else        document.body.style.overflow = '';
    return ()  => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[500] bg-black/75 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[501] w-full max-w-sm bg-[#111015] border-l border-white/[0.08] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-white/[0.07]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-4 w-4 text-gold-400" aria-hidden="true" />
                <h2 className="font-bricolage font-semibold text-white text-sm">
                  Cart
                  <span className="ml-2 font-worksans text-[0.5rem] tracking-[0.15em] text-neutral-400">
                    ({items.length} item{items.length !== 1 ? 's' : ''})
                  </span>
                </h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4" role="list" aria-label="Cart items">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <ShoppingBag className="h-7 w-7 text-neutral-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bricolage font-semibold text-neutral-300 text-base mb-1">
                      Your cart is empty
                    </p>
                    <p className="font-roboto text-neutral-600 text-sm leading-relaxed">
                      Add items from the store to get started.
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="font-worksans text-[0.6rem] tracking-[0.18em] uppercase text-purple-400 hover:text-purple-300 transition-colors border border-purple-500/30 hover:border-purple-400/50 px-5 h-9 rounded-xl"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-white/[0.05]" role="list">
                  {items.map((item) => (
                    <li key={item.id} className="py-4 sm:py-5 flex gap-4" role="listitem">
                      {/* Product image */}
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0 rounded-xl overflow-hidden bg-white/[0.04] border border-white/[0.06]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bricolage font-semibold text-sm text-white leading-snug mb-0.5 truncate">
                          {item.name}
                        </p>
                        <p className="font-roboto text-sm text-neutral-400 mb-3">
                          {formatPrice(item.price)}
                        </p>

                        {/* Quantity stepper — larger touch targets */}
                        <div className="flex items-center gap-0 w-fit rounded-xl overflow-hidden border border-white/[0.1]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="w-9 h-9 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                          >
                            <Minus className="h-3 w-3" aria-hidden="true" />
                          </button>
                          <span
                            aria-live="polite"
                            aria-label={`Quantity: ${item.quantity}`}
                            className="w-8 h-9 flex items-center justify-center border-x border-white/[0.1] font-worksans text-xs text-white"
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="w-9 h-9 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                          >
                            <Plus className="h-3 w-3" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal + remove */}
                      <div className="flex flex-col items-end justify-between shrink-0">
                        <p className="font-bricolage font-semibold text-sm text-white">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-red-500/15 border border-white/[0.06] hover:border-red-500/30 flex items-center justify-center text-neutral-600 hover:text-red-400 transition-all duration-200"
                        >
                          <X className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/[0.07] px-5 sm:px-6 py-5 space-y-3 bg-white/[0.02]">
                {/* Subtotal */}
                <div className="flex items-center justify-between py-1">
                  <p className="font-roboto text-sm text-neutral-400">Subtotal</p>
                  <p className="font-bricolage font-bold text-white text-lg">
                    {formatPrice(total)}
                  </p>
                </div>
                <p className="font-roboto text-xs text-neutral-600 leading-relaxed">
                  Shipping and taxes calculated at checkout.
                </p>

                {/* Checkout CTA */}
                <Link
                  href="/store/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2.5 w-full h-12 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-worksans text-[0.62rem] tracking-[0.2em] uppercase rounded-xl transition-all duration-200 shadow-[0_4px_16px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_24px_rgba(124,58,237,0.5)]"
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>

                {/* View full cart */}
                <Link
                  href="/store/cart"
                  onClick={closeCart}
                  className="flex items-center justify-center w-full h-10 border border-white/[0.1] hover:border-white/[0.2] text-neutral-400 hover:text-white font-worksans text-[0.55rem] tracking-[0.18em] uppercase rounded-xl transition-all duration-200"
                  aria-label="View full cart page"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
