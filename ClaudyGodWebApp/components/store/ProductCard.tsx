'use client';

import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from './cartStore';
import { formatPrice } from '@/utils/format';
import type { Product } from '@/types/store';

interface ProductCardProps {
  product: Product;
  onViewDetails?: () => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart  = useCartStore((s) => s.openCart);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    openCart();
  };

  return (
    <div
      className="group bg-white cursor-pointer"
      onClick={onViewDetails}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 ring-1 ring-black/[0.05] pointer-events-none" />
      </div>

      {/* Info */}
      <div className="p-5 border-t border-black/[0.06]">
        <p className="font-worksans text-[0.46rem] tracking-[0.18em] uppercase text-neutral-400 mb-1 capitalize">
          {product.category}
        </p>
        <p className="font-raleway font-normal text-neutral-800 text-base leading-snug mb-1 group-hover:text-purple-700 transition-colors duration-300">
          {product.name}
        </p>
        <p className="font-raleway text-neutral-500 text-xs font-light mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-raleway font-normal text-neutral-900 text-base">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 h-8 px-4 border border-neutral-200 hover:border-purple-400 hover:bg-purple-50 text-neutral-500 hover:text-purple-600 font-worksans text-[0.5rem] tracking-[0.15em] uppercase transition-all duration-300"
          >
            <ShoppingBag className="h-3 w-3" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
