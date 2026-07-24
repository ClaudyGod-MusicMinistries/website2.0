'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Star, Eye, RotateCw, Check } from 'lucide-react';
import { useCartStore } from './cartStore';
import { formatPrice } from '@/lib/utils/format';
import { buttonVariants } from '@/lib/theme/buttons';
import { cn } from '@/lib/utils/cn';
import type { Product } from '@/types/store';

interface ProductCardProps {
  product: Product;
  onViewDetails?: () => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useCartStore((s) => s.openCart);
  const [flipped, setFlipped] = useState(false);
  const [added, setAdded] = useState(false);
  const backImage = product.images && product.images.length > 1 ? product.images[1] : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    openCart();
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const handleFlipToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped((f) => !f);
  };

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-card-light hover:shadow-card-light-hover transition-shadow duration-400 border border-black/[0.04] hover:border-purple-200/60 flex flex-col cursor-pointer"
      onClick={onViewDetails}
      onMouseEnter={() => backImage && setFlipped(true)}
      onMouseLeave={() => backImage && setFlipped(false)}
    >
      {/* Image — real 3D flip between front/back when a second angle exists,
          not a crossfade, so "the same mug from two sides" reads as one
          object being turned over rather than two images dissolving. */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-cream-100 [perspective:1200px]">
        <div
          className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] [transform-style:preserve-3d]"
          style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Front */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              quality={90}
            />
          </div>
          {/* Back */}
          {backImage && (
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <Image
                src={backImage}
                alt={`${product.name} — back`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                quality={90}
              />
            </div>
          )}
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center pointer-events-none">
          <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-2 bg-white text-neutral-900 font-sans text-[0.6rem] tracking-[0.15em] uppercase px-4 h-9 rounded-full shadow-card-light-lg">
            <Eye className="h-3 w-3" />
            Quick View
          </span>
        </div>

        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white text-neutral-600 font-sans text-[0.5rem] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full shadow-card-light capitalize">
          {product.category}
        </span>

        {/* Flip control — explicit tap target for touch devices, where
            hover doesn't exist to trigger the flip automatically. */}
        {backImage && (
          <button
            onClick={handleFlipToggle}
            aria-label={flipped ? 'Show front' : 'Show back'}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-neutral-600 hover:text-purple-600 shadow-card-light flex items-center justify-center transition-colors duration-200"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col p-5">
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
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'sm' }),
              'w-[92px] justify-center'
            )}
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
