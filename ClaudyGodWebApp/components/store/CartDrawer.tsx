'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from './cartStore';
import { formatPrice } from '@/utils/format';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useCartStore();
  const total = cartTotal();

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
            className="fixed inset-0 z-[500] bg-black/70"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[501] w-full max-w-sm bg-[#0a0a0a] border-l border-white/[0.06] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-4 w-4 text-gold-400/60" />
                <p className="font-worksans text-[0.55rem] tracking-[0.2em] uppercase text-neutral-500">
                  Cart ({items.length})
                </p>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-neutral-600 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag className="h-8 w-8 text-neutral-800" />
                  <p className="font-raleway text-neutral-600 text-sm font-light">
                    Your cart is empty.
                  </p>
                  <button
                    onClick={closeCart}
                    className="font-worksans text-[0.55rem] tracking-[0.15em] uppercase text-neutral-500 hover:text-gold-400 transition-colors border-b border-neutral-700 hover:border-gold-500/40 pb-px"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-0 divide-y divide-white/[0.04]">
                  {items.map((item) => (
                    <li key={item.id} className="py-5 flex gap-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-raleway text-sm text-white font-light leading-snug mb-1 truncate">
                          {item.name}
                        </p>
                        <p className="font-raleway text-xs text-neutral-600 font-light mb-2">
                          {formatPrice(item.price)}
                        </p>
                        {/* Qty stepper */}
                        <div className="flex items-center gap-0">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center border border-white/10 hover:border-gold-500/30 text-neutral-500 hover:text-white transition-all"
                          >
                            <Minus className="h-2.5 w-2.5" />
                          </button>
                          <span className="w-8 h-7 flex items-center justify-center border-y border-white/10 font-worksans text-[0.55rem] text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center border border-white/10 hover:border-gold-500/30 text-neutral-500 hover:text-white transition-all"
                          >
                            <Plus className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="text-neutral-700 hover:text-white transition-colors self-start mt-0.5"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/[0.06] px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-neutral-500">
                    Total
                  </p>
                  <p className="font-raleway font-light text-white text-lg">
                    {formatPrice(total)}
                  </p>
                </div>
                <Link
                  href="/store/cart"
                  onClick={closeCart}
                  className="block w-full h-11 bg-gold-500 hover:bg-gold-400 text-[#080808] font-worksans text-[0.58rem] tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center"
                >
                  Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full font-worksans text-[0.5rem] tracking-[0.15em] uppercase text-neutral-600 hover:text-neutral-400 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
