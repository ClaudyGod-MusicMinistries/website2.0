import Image from 'next/image';
import { latestReleasePlatforms, albums } from '@/data/music';
import { Section, Container } from '@/components/ui/Layout';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function LatestRelease() {
  const latest = albums[1]; // Very Glorious — latest album

  return (
    <Section bg="muted" py="lg">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Album art */}
          <div className="relative aspect-square max-w-sm mx-auto lg:mx-0 w-full rounded-2xl overflow-hidden shadow-gold-lg">
            <Image
              src={latest.image}
              alt={latest.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-gold-500/20" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="New Release"
              title={latest.title}
              align="left"
              subtitle="Available now on all major streaming platforms. Experience worship that transforms."
            />

            <div className="flex flex-wrap gap-3">
              {latestReleasePlatforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bricolage font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg ${platform.bgColor} ${platform.textColor}`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {platform.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
