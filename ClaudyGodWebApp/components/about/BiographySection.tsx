import Image from 'next/image';
import { firstSectionTexts, secondSectionTexts } from '@/data/biography';


export function BiographySection() {
  return (
    <section className="bg-white section-py">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* First block: text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start mb-10 sm:mb-16 lg:mb-28">
          <div className="lg:pt-4">
            <div className="flex items-center gap-4 mb-6">
              <span className="rule-gold" />
              <span className="label-eyebrow">Biography</span>
            </div>
            <h2 className="font-bricolage font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight leading-tight mb-8">
              Called to Worship
            </h2>
            <div className="space-y-5">
              {firstSectionTexts.map((text, i) => (
                <p key={i} className="font-roboto text-neutral-600 text-base leading-[1.85]">
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
              src="/ClaudySocial.jpg"
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
            <h2 className="font-bricolage font-bold text-neutral-900 text-3xl md:text-4xl tracking-tight leading-tight mb-8">
              Spreading God&apos;s Love
            </h2>
            <div className="space-y-5">
              {secondSectionTexts.map((text, i) => (
                <p key={i} className="font-roboto text-neutral-600 text-base leading-[1.85]">
                  {text.trim()}
                </p>
              ))}
            </div>

            {/* Ministry pillars */}
            <div className="mt-12 pt-10 border-t border-black/[0.07] grid grid-cols-1 gap-5">
              {[
                { title: 'Spirit-Led Worship',   body: 'Every song written and recorded in prayer — music that opens heaven.' },
                { title: 'Gospel Outreach',       body: 'Concerts, community events, and digital platforms carrying the Word.' },
                { title: 'Discipleship & Growth', body: 'Teaching believers to walk deeper in faith through the Word.' },
              ].map(({ title, body }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 shrink-0" />
                  <div>
                    <p className="font-bricolage font-semibold text-neutral-800 text-sm leading-snug">{title}</p>
                    <p className="font-roboto text-neutral-500 text-sm leading-relaxed mt-0.5">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
