'use client';

import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from './cartStore';
import { formatPrice } from '@/utils/format';
import type { Product } from '@/types/store';

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useCartStore((s) => s.openCart);

  const handleAdd = () => {
    addToCart(product);
    openCart();
  };

  return (
    <div className="group bg-[#080808]">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 ring-1 ring-white/5 pointer-events-none" />
      </div>

      {/* Info */}
      <div className="p-5 border-t border-white/[0.04]">
        <p className="font-worksans text-[0.48rem] tracking-[0.18em] uppercase text-neutral-600 mb-1 capitalize">
          {product.category}
        </p>
        <p className="font-raleway font-light text-white text-base leading-snug mb-1 group-hover:text-gold-100 transition-colors duration-300">
          {product.name}
        </p>
        <p className="font-raleway text-neutral-600 text-xs font-light mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-raleway font-light text-white text-base">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 h-8 px-4 border border-white/10 hover:border-purple-500/50 text-neutral-500 hover:text-purple-400 font-worksans text-[0.5rem] tracking-[0.15em] uppercase transition-all duration-300"
          >
            <ShoppingBag className="h-3 w-3" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
