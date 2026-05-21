'use client';

import { useState } from 'react';
import { products, categories } from '@/data/store';
import { ProductCard } from './ProductCard';
import { cn } from '@/utils/cn';

export function ProductGrid() {
  const [active, setActive] = useState('all');

  const filtered =
    active === 'all' ? products : products.filter((p) => p.category === active);

  return (
    <section className="bg-[#080808] section-py">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Filter tabs */}
        <div className="flex items-center gap-6 mb-12 border-b border-white/[0.06]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                'font-worksans text-[0.55rem] tracking-[0.2em] uppercase pb-4 border-b-2 -mb-px transition-all duration-300',
                active === cat.id
                  ? 'text-gold-400 border-gold-500'
                  : 'text-neutral-600 border-transparent hover:text-neutral-400'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
