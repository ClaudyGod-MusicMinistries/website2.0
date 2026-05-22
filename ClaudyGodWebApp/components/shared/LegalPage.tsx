interface LegalSection {
  heading: string;
  body: string;
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}

export function LegalPage({ title, lastUpdated, intro, sections }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-white pt-[var(--navbar-height)]">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-20 md:py-28">

        <div className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="rule-gold" />
            <span className="label-eyebrow">Legal</span>
          </div>
          <h1 className="font-raleway font-bold text-neutral-900 text-4xl md:text-5xl tracking-tight leading-tight mb-4">
            {title}
          </h1>
          <p className="font-worksans text-[0.6rem] tracking-[0.18em] uppercase text-neutral-400">
            Last updated: {lastUpdated}
          </p>
        </div>

        {intro && (
          <p className="font-raleway text-neutral-600 text-base leading-[1.85] mb-12 pb-12 border-b border-black/[0.06]">
            {intro}
          </p>
        )}

        <div className="space-y-10">
          {sections.map((s, i) => (
            <div key={i} className="border-b border-black/[0.05] pb-10 last:border-0">
              <h2 className="font-raleway font-bold text-neutral-900 text-xl tracking-tight mb-3">
                {s.heading}
              </h2>
              <p className="font-raleway text-neutral-500 text-base leading-[1.85]">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
