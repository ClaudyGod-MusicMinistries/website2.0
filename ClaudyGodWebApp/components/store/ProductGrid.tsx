'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { products, categories } from '@/data/store';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { cn } from '@/utils/cn';
import type { Product } from '@/types/store';

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
];

function sortProducts(list: Product[], sortId: string): Product[] {
  switch (sortId) {
    case 'price-asc':  return [...list].sort((a, b) => a.price - b.price);
    case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
    case 'rating':     return [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    default:           return list;
  }
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort,     setActiveSort]     = useState('featured');
  const [query,          setQuery]          = useState('');
  const [showFilters,    setShowFilters]    = useState(false);
  const [modalProduct,   setModalProduct]   = useState<Product | null>(null);

  const filtered = products
    .filter((p) => activeCategory === 'all' || p.category === activeCategory)
    .filter((p) =>
      query.trim() === '' ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );

  const sorted = sortProducts(filtered, activeSort);

  return (
    <section className="bg-white section-py">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full h-11 pl-10 pr-9 bg-cream-100 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 font-worksans text-xs tracking-[0.05em] focus:outline-none focus:border-purple-400 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Sort */}
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="h-11 px-3 bg-white border border-neutral-200 rounded-xl text-neutral-700 font-worksans text-xs tracking-[0.05em] focus:outline-none focus:border-purple-400 transition-colors cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>

            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={cn(
                'sm:hidden h-11 w-11 flex items-center justify-center rounded-xl border transition-colors',
                showFilters
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-purple-400'
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div
          className={cn(
            'mb-10',
            'sm:block',
            showFilters ? 'block' : 'hidden'
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-5 h-10 rounded-full font-worksans text-xs tracking-[0.12em] uppercase border transition-all duration-300',
                  activeCategory === cat.id
                    ? 'bg-purple-600 border-purple-600 text-white shadow-[0_4px_14px_rgba(124,58,237,0.35)]'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-purple-400 hover:text-purple-600'
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="font-worksans text-[0.65rem] tracking-[0.18em] uppercase text-neutral-400 mb-6">
          {sorted.length} {sorted.length === 1 ? 'product' : 'products'}
          {activeCategory !== 'all' && ` in ${categories.find((c) => c.id === activeCategory)?.name}`}
          {query && ` matching "${query}"`}
        </p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {sorted.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${activeSort}-${query}`}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {sorted.map((product) => (
                <motion.div key={product.id} variants={cardVariant}>
                  <ProductCard
                    product={product}
                    onViewDetails={() => setModalProduct(product)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 flex flex-col items-center gap-4 text-center"
            >
              <Search className="h-10 w-10 text-neutral-300" />
              <p className="font-raleway text-neutral-400 text-lg">No products found</p>
              <button
                onClick={() => { setQuery(''); setActiveCategory('all'); }}
                className="font-worksans text-xs tracking-[0.15em] uppercase text-purple-600 hover:text-purple-800 underline underline-offset-4 transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust row */}
        <div className="mt-16 pt-10 border-t border-black/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: '🔒', label: 'Secure Checkout',    sub: 'SSL encrypted payment' },
            { icon: '📦', label: 'Fast Shipping',       sub: 'Worldwide delivery' },
            { icon: '↩️',  label: 'Easy Returns',       sub: '30-day return policy' },
            { icon: '🎵', label: 'Digital Downloads',   sub: 'Instant access' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{item.icon}</span>
              <div>
                <p className="font-worksans text-xs tracking-[0.1em] uppercase text-neutral-800 font-medium">{item.label}</p>
                <p className="font-raleway text-neutral-500 text-xs mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
    </section>
  );
}
