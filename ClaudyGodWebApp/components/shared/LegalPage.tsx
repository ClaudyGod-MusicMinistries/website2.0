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
    <div className="min-h-screen bg-[#080808] pt-[var(--navbar-height)]">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-20 md:py-28">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="rule-gold" />
            <span className="label-eyebrow">Legal</span>
          </div>
          <h1 className="font-raleway font-extralight text-white text-4xl md:text-5xl tracking-tight leading-tight mb-4">
            {title}
          </h1>
          <p className="font-worksans text-[0.5rem] tracking-[0.18em] uppercase text-neutral-600">
            Last updated: {lastUpdated}
          </p>
        </div>

        {intro && (
          <p className="font-raleway text-neutral-400 text-sm leading-[1.85] font-light mb-12 pb-12 border-b border-white/[0.05]">
            {intro}
          </p>
        )}

        <div className="space-y-10">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="font-raleway font-light text-white text-lg tracking-tight mb-3">
                {s.heading}
              </h2>
              <p className="font-raleway text-neutral-500 text-sm leading-[1.85] font-light">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
