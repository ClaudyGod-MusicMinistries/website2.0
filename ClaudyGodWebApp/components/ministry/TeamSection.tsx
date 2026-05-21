import Image from 'next/image';
import { teamMembers } from '@/data/music';

export function TeamSection() {
  return (
    <section className="bg-[#080808] section-py border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-14">
          <span className="rule-gold" />
          <span className="label-eyebrow">The Team</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
          {teamMembers.map((member) => (
            <div key={member.id} className="group bg-[#080808] p-6">
              <div className="relative aspect-[4/3] mb-5 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top opacity-80 group-hover:opacity-95 transition-all duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
              </div>
              <p className="font-worksans text-[0.5rem] tracking-[0.2em] uppercase text-gold-400/70 mb-1">
                {member.role}
              </p>
              <p className="font-raleway font-light text-white text-base leading-tight mb-3">
                {member.name}
              </p>
              <p className="font-raleway text-neutral-600 text-xs leading-relaxed font-light italic">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
