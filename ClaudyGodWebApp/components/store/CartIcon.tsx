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
      className="relative text-neutral-500 hover:text-white transition-colors duration-300"
    >
      <ShoppingBag className="h-4 w-4" />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-gold-500 flex items-center justify-center font-worksans text-[0.38rem] text-[#080808]">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
}
