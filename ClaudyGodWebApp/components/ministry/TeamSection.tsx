import Image from 'next/image';
import { teamMembers } from '@/data/music';

export function TeamSection() {
  return (
    <section className="bg-white section-py border-t border-black/[0.05]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-14">
          <span className="rule-gold" />
          <span className="label-eyebrow">The Team</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="group bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] overflow-hidden transition-shadow duration-300 border border-black/[0.04]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-all duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="font-worksans text-[0.62rem] tracking-[0.2em] uppercase text-purple-600 mb-1">
                  {member.role}
                </p>
                <p className="font-bricolage font-bold text-neutral-900 text-lg leading-tight mb-2">
                  {member.name}
                </p>
                <p className="font-raleway text-neutral-500 text-sm leading-relaxed font-light italic">
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
