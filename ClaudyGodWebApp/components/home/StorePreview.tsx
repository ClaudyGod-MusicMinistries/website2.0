'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { products } from '@/data/store';
import { formatPrice } from '@/utils/format';
import { buttonVariants } from '@/lib/theme/buttons';
import { cn } from '@/utils/cn';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function StorePreview() {
  const preview = products.slice(0, 4);

  return (
    <section className="bg-cream-100 section-py border-t border-black/[0.05]">
      <div className="container-site">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-14">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="rule-gold" />
              <span className="label-eyebrow">Merchandise</span>
            </div>
            <h2 className="font-display font-bold text-neutral-900 text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Official Store
            </h2>
            <p className="mt-2 sm:mt-3 font-sans text-neutral-500 text-sm sm:text-base font-light max-w-md leading-relaxed">
              Music, apparel, and accessories — wear your faith, carry the anointing.
            </p>
          </div>
          <Link
            href="/store"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg', uppercase: true }), 'hidden sm:inline-flex shrink-0 group')}
          >
            Browse All
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Product grid — proper gap */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7"
        >
          {preview.map((product) => (
            <motion.div key={product.id} variants={cardVariant}>
            <Link
              href="/store"
              className="group bg-white overflow-hidden flex flex-col rounded-xl sm:rounded-2xl shadow-card-light hover:shadow-card-light-hover transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-cream-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
              </div>

              {/* Info */}
              <div className="p-3 sm:p-4 lg:p-5 flex flex-col gap-1 sm:gap-1.5 border-t border-black/[0.05]">
                <p className="font-sans text-[0.68rem] tracking-[0.18em] uppercase text-neutral-400 capitalize">
                  {product.category}
                </p>
                <p className="font-sans font-normal text-neutral-800 text-sm leading-snug group-hover:text-purple-700 transition-colors duration-300 line-clamp-2">
                  {product.name}
                </p>
                <p className="font-display text-neutral-900 text-base font-semibold mt-1">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA row */}
        <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/store"
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg', uppercase: true }), 'group')}
          >
            Visit Official Store
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/store"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg', uppercase: true }), 'sm:hidden')}
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
