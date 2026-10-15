'use client';

import { ShoppingBag } from 'lucide-react';
import { useCartStore } from './cartStore';

export function CartIcon() {
  const cartCount = useCartStore((s) => s.cartCount);
  const openCart = useCartStore((s) => s.openCart);
  const count = cartCount();

  return (
    <button
      onClick={openCart}
      aria-label={`Cart — ${count} item${count !== 1 ? 's' : ''}`}
      className="relative flex items-center justify-center w-9 h-9 rounded-full text-neutral-600 hover:text-purple-800 hover:bg-neutral-100 transition-colors duration-200"
    >
      <ShoppingBag className="h-4 w-4" />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-gold-500 flex items-center justify-center font-sans text-[0.38rem] text-black">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
}
