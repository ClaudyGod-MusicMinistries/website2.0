import Image from 'next/image';
import { teamMembers } from '@/data/music';

export function TeamSection() {
  return (
    <section className="bg-cream-100 section-py border-t border-black/[0.05]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="rule-gold" />
              <span className="label-eyebrow">The Team</span>
            </div>
            <h2 className="font-bricolage font-bold text-neutral-900 text-3xl sm:text-4xl md:text-5xl tracking-tight">
              Our Ministry Team
            </h2>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-5">
          {teamMembers.map((member, idx) => (
            <div
              key={member.id}
              className="group flex flex-col h-full overflow-hidden rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-500 border border-black/[0.04] hover:border-purple-300/30"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square overflow-hidden bg-neutral-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={90}
                  priority={idx === 0}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between p-5 sm:p-6">
                <div>
                  <p className="font-worksans text-[0.55rem] sm:text-[0.6rem] tracking-[0.2em] uppercase text-purple-600 mb-2 font-semibold">
                    {member.role}
                  </p>
                  <p className="font-bricolage font-semibold text-neutral-900 text-base sm:text-lg leading-snug mb-3 group-hover:text-purple-700 transition-colors duration-300">
                    {member.name}
                  </p>
                </div>

                <p className="font-raleway text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
