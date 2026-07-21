'use client';

import Image from 'next/image';
import { ShoppingBag, Star, Eye } from 'lucide-react';
import { useCartStore } from './cartStore';
import { formatPrice } from '@/utils/format';
import { cn } from '@/utils/cn';
import type { Product } from '@/types/store';

interface ProductCardProps {
  product: Product;
  onViewDetails?: () => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart  = useCartStore((s) => s.openCart);
  const gallery   = product.images && product.images.length > 1 ? product.images : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    openCart();
  };

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-card-light hover:shadow-card-light-hover transition-all duration-400 cursor-pointer border border-black/[0.04] hover:border-purple-200/60 flex flex-col"
      onClick={onViewDetails}
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-cream-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={cn(
            'object-cover transition-all duration-700 group-hover:scale-[1.06]',
            gallery && 'group-hover:opacity-0'
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          quality={90}
          priority={false}
        />
        {/* Second view — crossfades in on hover for multi-image products (front/back) */}
        {gallery && (
          <Image
            src={gallery[1]}
            alt={`${product.name} — alternate view`}
            fill
            className="object-cover opacity-0 scale-[1.06] transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            quality={90}
          />
        )}
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-neutral-900 font-sans text-[0.6rem] tracking-[0.15em] uppercase px-4 h-9 rounded-full shadow-card-light-lg">
              <Eye className="h-3 w-3" />
              Quick View
            </span>
          </div>
        </div>
        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-neutral-600 font-sans text-[0.5rem] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full shadow-card-light capitalize">
          {product.category}
        </span>
        {/* Multi-view badge */}
        {gallery && (
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-neutral-500 font-sans text-[0.5rem] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full shadow-card-light">
            {gallery.length} views
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col p-5">
        {/* Rating */}
        {product.rating != null && (
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating!) ? 'fill-gold-400 text-gold-400' : 'fill-neutral-200 text-neutral-200'}`}
              />
            ))}
            <span className="font-sans text-[0.55rem] tracking-wide text-neutral-400 ml-1">
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}

        <p className="font-sans font-medium text-neutral-900 text-base leading-snug mb-1 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2">
          {product.name}
        </p>
        <p className="font-sans text-neutral-400 text-xs leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-3 mt-auto">
          <span className="font-display font-semibold text-neutral-900 text-lg">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 h-10 px-4 bg-neutral-900 hover:bg-purple-600 text-white font-sans text-[0.55rem] tracking-[0.15em] uppercase rounded-xl transition-all duration-300 shadow-sm hover:shadow-purple"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
