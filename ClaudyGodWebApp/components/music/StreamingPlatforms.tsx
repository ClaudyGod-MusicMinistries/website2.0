import { securedMusicPlatforms } from '@/data/music';

export function StreamingPlatforms() {
  return (
    <section className="bg-[#0a0a0a] py-16 border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="rule-gold" />
              <span className="label-eyebrow">Available On</span>
            </div>
            <p className="font-raleway font-extralight text-white text-2xl tracking-tight">
              All Major Platforms
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-3">
            {securedMusicPlatforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 h-10 border border-white/10 hover:border-gold-500/40 text-neutral-500 hover:text-white font-worksans text-[0.58rem] tracking-[0.15em] uppercase transition-all duration-300"
                >
                  <Icon className="h-3 w-3 shrink-0" />
                  {platform.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
