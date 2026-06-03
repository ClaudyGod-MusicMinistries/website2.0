export function BibleVerse() {
  return (
    <section className="bg-cream-100 py-12 sm:py-16 md:py-20 border-t border-b border-black/[0.06]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <span className="block w-8 h-px bg-gold-500 opacity-60 mx-auto mb-6 sm:mb-10" />
          <blockquote className="font-roboto text-neutral-700 text-xl sm:text-2xl md:text-3xl lg:text-[2rem] leading-[1.6] tracking-tight">
            &ldquo;Let everything that has breath praise the Lord.&rdquo;
          </blockquote>
          <p className="mt-5 sm:mt-7 font-worksans text-[0.58rem] tracking-[0.28em] uppercase text-gold-500">
            Psalm 150 : 6
          </p>
          <span className="block w-8 h-px bg-gold-500 opacity-40 mx-auto mt-6 sm:mt-10" />
        </div>
      </div>
    </section>
  );
}
