import { securedMusicPlatforms } from '@/data/music';

export function StreamingPlatforms() {
  return (
    <section className="bg-white py-14 border-t border-black/[0.05]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="rule-gold" />
              <span className="label-eyebrow">Available On</span>
            </div>
            <p className="font-bricolage font-bold text-neutral-900 text-2xl tracking-tight">
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
                  style={{ '--brand': platform.brandColor } as React.CSSProperties}
                  className="inline-flex items-center gap-2.5 px-5 h-11 border border-neutral-200 rounded-xl hover:border-[var(--brand)]/60 bg-white hover:bg-[var(--brand)]/5 text-neutral-500 hover:text-[var(--brand)] font-worksans text-xs tracking-[0.15em] uppercase transition-all duration-300 shadow-sm"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
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
