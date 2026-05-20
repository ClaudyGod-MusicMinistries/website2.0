import Link from 'next/link';
import { navigationItems } from '@/data/navbar';
import { socialLinks } from '@/data/socials';
import { Container } from '@/components/ui/Layout';
import { Text, Label } from '@/components/ui/Typography';
import { Divider } from '@/components/ui/Divider';

const legalLinks = [
  { href: '/legal/privacy', label: 'Privacy Policy' },
  { href: '/legal/terms', label: 'Terms of Service' },
  { href: '/legal/cookies', label: 'Cookie Policy' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-base border-t border-gold-500/20">
      <Container>
        <div className="py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-abril text-gold-500 text-2xl tracking-wide w-fit">
              ClaudyGod
            </Link>
            <Text size="sm" color="muted" leading="relaxed">
              Gospel music artist, minister, and worship leader spreading the love of God
              through music.
            </Text>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <Label color="gold">Navigate</Label>
            <nav className="flex flex-col gap-2">
              {navigationItems
                .filter((item) => item.label !== 'Donate')
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-neutral-400 hover:text-gold-400 transition-colors duration-200 w-fit"
                  >
                    {item.label}
                  </Link>
                ))}
            </nav>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <Label color="gold">Follow Along</Label>
            <div className="flex flex-col gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center gap-3 text-sm text-neutral-400 hover:text-gold-400 transition-colors duration-200 group w-fit"
                  >
                    <span
                      className={`inline-flex items-center justify-center h-7 w-7 rounded-full ${social.color} ${social.hover} transition-colors duration-200 shrink-0`}
                    >
                      <Icon className="h-3.5 w-3.5 text-white" />
                    </span>
                    {social.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <Label color="gold">Legal</Label>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-400 hover:text-gold-400 transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <Divider />

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Text size="sm" color="dim">
            © {year} ClaudyGod Music Ministries. All rights reserved.
          </Text>
          <Text size="sm" color="dim">
            Made with love for God&apos;s glory
          </Text>
        </div>
      </Container>
    </footer>
  );
}
