import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/store';
import { formatPrice } from '@/utils/format';

export function StorePreview() {
  const preview = products.slice(0, 4);

  return (
    <section className="bg-cream-100 section-py border-t border-black/[0.05]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="rule-gold" />
              <span className="label-eyebrow">Merchandise</span>
            </div>
            <h2 className="font-raleway font-bold text-neutral-900 text-4xl md:text-5xl tracking-tight">
              Official Store
            </h2>
            <p className="mt-3 font-raleway text-neutral-500 text-base font-light max-w-md leading-relaxed">
              Music, apparel, and accessories — wear your faith, carry the anointing.
            </p>
          </div>
          <Link
            href="/store"
            className="hidden sm:inline-flex items-center gap-2.5 font-worksans text-xs tracking-[0.18em] uppercase border border-neutral-300 hover:border-purple-600 text-neutral-700 hover:text-purple-700 px-7 h-11 transition-all duration-300 shrink-0"
          >
            Browse All
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Product grid — proper gap */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
          {preview.map((product) => (
            <Link
              key={product.id}
              href="/store"
              className="group bg-white overflow-hidden flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-shadow duration-300"
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
              <div className="p-5 flex flex-col gap-1.5 border-t border-black/[0.05]">
                <p className="font-worksans text-[0.56rem] tracking-[0.18em] uppercase text-neutral-400 capitalize">
                  {product.category}
                </p>
                <p className="font-raleway font-normal text-neutral-800 text-sm leading-snug group-hover:text-purple-700 transition-colors duration-300 line-clamp-2">
                  {product.name}
                </p>
                <p className="font-raleway text-neutral-900 text-base font-medium mt-1">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/store"
            className="inline-flex items-center gap-3 font-worksans text-xs tracking-[0.22em] uppercase bg-neutral-900 hover:bg-purple-700 text-white px-10 h-12 transition-all duration-300 group"
          >
            Visit Official Store
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
