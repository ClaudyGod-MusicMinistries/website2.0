import Image from 'next/image';
import { firstSectionTexts, secondSectionTexts } from '@/data/biography';


export function BiographySection() {
  return (
    <section className="bg-white section-py">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* First block: text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20 lg:mb-32">
          <div className="lg:pt-4">
            <div className="flex items-center gap-4 mb-6">
              <span className="rule-gold" />
              <span className="label-eyebrow">Biography</span>
            </div>
            <h2 className="font-raleway font-normal text-neutral-900 text-3xl md:text-4xl tracking-tight leading-tight mb-8">
              Called to Worship
            </h2>
            <div className="space-y-5">
              {firstSectionTexts.map((text, i) => (
                <p key={i} className="font-raleway text-neutral-600 text-base leading-[1.85]">
                  {text.trim()}
                </p>
              ))}
            </div>
          </div>

          <div className="relative aspect-[3/4] w-full max-w-sm lg:max-w-none">
            <Image
              src="/mum1.jpg"
              alt="Minister ClaudyGod in ministry"
              fill
              className="object-cover object-top"
              sizes="(max-width:1024px) 90vw, 45vw"
            />
            <div className="absolute inset-0 ring-1 ring-black/5 pointer-events-none" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-black/[0.06] mb-20 lg:mb-32" />

        {/* Second block: image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="relative aspect-[4/5] w-full max-w-sm lg:max-w-none order-2 lg:order-1">
            <Image
              src="/aboutUs.webp"
              alt="Minister ClaudyGod worship"
              fill
              className="object-cover object-top"
              sizes="(max-width:1024px) 90vw, 45vw"
            />
            <div className="absolute inset-0 ring-1 ring-black/5 pointer-events-none" />
          </div>

          <div className="lg:pt-4 order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-6">
              <span className="rule-gold" />
              <span className="label-eyebrow">Ministry</span>
            </div>
            <h2 className="font-raleway font-normal text-neutral-900 text-3xl md:text-4xl tracking-tight leading-tight mb-8">
              Spreading God&apos;s Love
            </h2>
            <div className="space-y-5">
              {secondSectionTexts.map((text, i) => (
                <p key={i} className="font-raleway text-neutral-600 text-base leading-[1.85]">
                  {text.trim()}
                </p>
              ))}
            </div>

            {/* Stat row */}
            <div className="mt-12 pt-10 border-t border-black/[0.07] grid grid-cols-3 gap-6">
              {[
                { number: '7', label: 'Albums Released' },
                { number: '2003', label: 'Called to Ministry' },
                { number: '∞', label: 'Lives Touched' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-raleway font-medium text-gold-400 text-2xl md:text-3xl tracking-tight">
                    {stat.number}
                  </p>
                  <p className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-neutral-500 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
