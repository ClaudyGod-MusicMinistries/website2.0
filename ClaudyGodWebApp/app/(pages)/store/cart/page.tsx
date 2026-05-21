'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/components/store/cartStore';
import { formatPrice } from '@/utils/format';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, cartTotal } = useCartStore();
  const total = cartTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#080808] pt-[var(--navbar-height)] flex flex-col items-center justify-center gap-5 text-center px-6">
        <ShoppingBag className="h-10 w-10 text-neutral-800" />
        <p className="font-raleway font-extralight text-white text-2xl tracking-tight">
          Your cart is empty
        </p>
        <p className="font-raleway text-neutral-600 text-sm font-light">
          Browse the store and add some items.
        </p>
        <Link
          href="/store"
          className="mt-4 font-worksans text-[0.58rem] tracking-[0.2em] uppercase text-[#080808] bg-gold-500 hover:bg-gold-400 transition-colors h-10 px-7 inline-flex items-center"
        >
          Go to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] pt-[var(--navbar-height)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 md:py-20">
        <div className="flex items-center gap-4 mb-12">
          <span className="rule-gold" />
          <span className="label-eyebrow">Your Cart</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Items */}
          <div className="lg:col-span-2">
            <ul className="divide-y divide-white/[0.05]">
              {items.map((item) => (
                <li key={item.id} className="py-6 flex gap-5">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-raleway font-light text-white text-sm leading-snug mb-0.5">
                      {item.name}
                    </p>
                    <p className="font-raleway text-neutral-600 text-xs font-light mb-4 capitalize">
                      {item.category} — {item.description}
                    </p>
                    <div className="flex items-center gap-5">
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
                      <span className="font-raleway font-light text-white text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    className="text-neutral-700 hover:text-white transition-colors self-start mt-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-white/[0.05]">
              <button
                onClick={clearCart}
                className="font-worksans text-[0.52rem] tracking-[0.15em] uppercase text-neutral-700 hover:text-red-400/80 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="border border-white/[0.06] p-6">
              <p className="font-worksans text-[0.52rem] tracking-[0.18em] uppercase text-neutral-600 mb-6">
                Order Summary
              </p>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <p className="font-raleway text-neutral-500 text-xs font-light truncate max-w-[65%]">
                      {item.name} × {item.quantity}
                    </p>
                    <p className="font-raleway text-neutral-400 text-xs">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/[0.06] pt-4 flex justify-between mb-6">
                <p className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-neutral-500">
                  Total
                </p>
                <p className="font-raleway font-light text-white text-lg">
                  {formatPrice(total)}
                </p>
              </div>
              <button
                className="w-full h-11 bg-gold-500 hover:bg-gold-400 text-[#080808] font-worksans text-[0.58rem] tracking-[0.2em] uppercase transition-all duration-300"
              >
                Proceed to Checkout
              </button>
              <Link
                href="/store"
                className="block mt-3 w-full h-10 border border-white/10 hover:border-white/20 text-neutral-500 hover:text-white font-worksans text-[0.52rem] tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
