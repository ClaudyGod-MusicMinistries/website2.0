'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/components/store/cartStore';
import { formatPrice } from '@/utils/format';
import { Minus, Plus, X, ShoppingBag, ArrowLeft, Shield, Package } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, cartTotal } = useCartStore();
  const total = cartTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-100 pt-[var(--navbar-height)] flex flex-col items-center justify-center gap-6 text-center px-6">
        <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center">
          <ShoppingBag className="h-9 w-9 text-neutral-300" />
        </div>
        <div>
          <p className="font-raleway font-bold text-neutral-900 text-2xl tracking-tight mb-2">
            Your cart is empty
          </p>
          <p className="font-raleway text-neutral-500 text-sm">
            Browse the store and add some items.
          </p>
        </div>
        <Link
          href="/store"
          className="mt-2 font-worksans text-xs tracking-[0.18em] uppercase text-white bg-purple-600 hover:bg-purple-700 transition-colors h-11 px-8 inline-flex items-center gap-2 rounded-xl"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Go to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100 pt-[var(--navbar-height)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 md:py-20">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <span className="rule-gold" />
            <h1 className="font-raleway font-bold text-neutral-900 text-3xl tracking-tight">Your Cart</h1>
          </div>
          <Link
            href="/store"
            className="hidden sm:inline-flex items-center gap-2 font-worksans text-xs tracking-[0.15em] uppercase text-neutral-500 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-black/[0.04] overflow-hidden divide-y divide-neutral-100">
              {items.map((item) => (
                <div key={item.id} className="p-6 flex gap-5">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-cream-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-raleway font-semibold text-neutral-900 text-sm leading-snug mb-0.5">
                      {item.name}
                    </p>
                    <p className="font-raleway text-neutral-400 text-xs mb-4 capitalize">
                      {item.category} — {item.description}
                    </p>
                    <div className="flex items-center gap-5">
                      <div className="flex items-center rounded-xl border border-neutral-200 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-purple-600 hover:bg-purple-50 transition-all"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center border-x border-neutral-200 font-worksans text-xs text-neutral-800 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-purple-600 hover:bg-purple-50 transition-all"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-raleway font-semibold text-neutral-900 text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-300 hover:text-red-400 hover:bg-red-50 transition-all self-start mt-0.5"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={clearCart}
              className="mt-4 font-worksans text-[0.6rem] tracking-[0.15em] uppercase text-neutral-400 hover:text-red-400 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-black/[0.04] p-6">
              <p className="font-worksans text-xs tracking-[0.18em] uppercase text-neutral-500 mb-6">
                Order Summary
              </p>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-3">
                    <p className="font-raleway text-neutral-500 text-sm truncate flex-1">
                      {item.name} <span className="text-neutral-300">× {item.quantity}</span>
                    </p>
                    <p className="font-raleway font-medium text-neutral-700 text-sm shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-100 pt-4 flex justify-between mb-6">
                <p className="font-worksans text-xs tracking-[0.15em] uppercase text-neutral-500">Total</p>
                <p className="font-raleway font-bold text-neutral-900 text-xl">{formatPrice(total)}</p>
              </div>
              <button className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-worksans text-xs font-semibold tracking-[0.12em] uppercase rounded-xl transition-all duration-300 shadow-[0_4px_14px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.45)]">
                Proceed to Checkout
              </button>
              <Link
                href="/store"
                className="mt-3 w-full h-11 border border-neutral-200 hover:border-purple-300 text-neutral-500 hover:text-purple-600 font-worksans text-xs tracking-[0.12em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Continue Shopping
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-5 bg-white rounded-2xl border border-black/[0.04] p-5 space-y-3">
              {[
                { icon: Shield,  text: 'SSL-secured checkout' },
                { icon: Package, text: 'Fast worldwide shipping' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-neutral-300 shrink-0" />
                  <p className="font-worksans text-[0.6rem] tracking-[0.1em] uppercase text-neutral-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
