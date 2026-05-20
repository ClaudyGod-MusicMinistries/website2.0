import Image from 'next/image';
import Link from 'next/link';
import { FaSpotify, FaApple, FaYoutube, FaDeezer } from 'react-icons/fa6';
import { albums } from '@/data/music';
import { Section, Container, Grid } from '@/components/ui/Layout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { cn } from '@/utils/cn';

const platformIcons = {
  spotify: FaSpotify,
  apple: FaApple,
  youtube: FaYoutube,
  deezer: FaDeezer,
} as const;

export function MusicHighlight() {
  return (
    <Section bg="elevated" py="lg">
      <Container>
        <SectionHeader
          eyebrow="Discography"
          title="Albums"
          subtitle="Seven albums of God-inspired worship, from contemporary gospel to Afro-gospel and covered hymns."
          className="mb-10"
        />

        <Grid cols={3} gap="lg">
          {albums.map((album) => (
            <div
              key={album.title}
              className="group flex flex-col gap-4 p-4 rounded-2xl bg-surface-muted border border-surface-border hover:border-gold-500/30 transition-all duration-300"
            >
              {/* Cover */}
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={album.image}
                  alt={album.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-3">
                <p className="font-bricolage font-semibold text-white text-base">{album.title}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  {(Object.entries(album.links) as [keyof typeof platformIcons, string][]).map(
                    ([key, url]) => {
                      const Icon = platformIcons[key];
                      if (!Icon) return null;
                      return (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Listen on ${key}`}
                          className="h-8 w-8 rounded-full bg-surface-elevated hover:bg-gold-500/20 border border-surface-border hover:border-gold-500/30 flex items-center justify-center text-neutral-400 hover:text-gold-400 transition-all duration-200"
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </a>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          ))}
        </Grid>

        <div className="flex justify-center mt-10">
          <Link
            href="/music"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg', uppercase: true }))}
          >
            See Full Discography
          </Link>
        </div>
      </Container>
    </Section>
  );
}
