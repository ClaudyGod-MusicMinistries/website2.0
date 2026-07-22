'use client';

import { useState } from 'react';
import {
  Display, Heading, Text, Label, Caption, Accent,
  Button,
  IconButton,
  Card, CardHeader, CardBody, CardFooter,
  Badge,
  Dialog,
  Divider, GoldBar,
  Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar,
  Spinner,
  Logo,
} from '@/components/ui';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';

const COLOR_SCALES: Record<string, Record<string, string>> = {
  gold:   { 50: '#FFFBEB', 100: '#FEF3C7', 200: '#FDE68A', 300: '#FCD34D', 400: '#FBBF24', 500: '#B5651D', 600: '#A88A2E', 700: '#834915', 800: '#6B4D00', 900: '#4A3400' },
  purple: { 50: '#F5F3FF', 100: '#EDE9FE', 200: '#DDD6FE', 300: '#C4B5FD', 400: '#A78BFA', 500: '#614991', 600: '#4C3873', 700: '#382957', 800: '#4C1D95', 900: '#2E1065' },
  cream:  { 50: '#FDFCFB', 100: '#F8F5F0', 200: '#F5F0E8', 300: '#EDE4D5', 400: '#DDD0BC' },
  surface:{ base: '#080808', muted: '#0E0E0E', elevated: '#161616', overlay: '#1E1E1E', deep: '#07060f', raised: '#0d0b1a' },
  status: { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#3B82F6' },
};

const BUTTON_VARIANTS = ['primary', 'outline', 'ghost', 'soft', 'white', 'danger', 'link'] as const;
const BUTTON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const BADGE_VARIANTS = ['gold', 'white', 'success', 'warning', 'error', 'info', 'muted', 'outline'] as const;
const CARD_VARIANTS = ['default', 'elevated', 'glass', 'outline', 'gold', 'flat'] as const;

function SectionTitle({ children, eyebrow }: { children: React.ReactNode; eyebrow: string }) {
  return (
    <div className="mb-6">
      <Label size="sm" color="gold">{eyebrow}</Label>
      <Heading level={2} className="mt-1">{children}</Heading>
    </div>
  );
}

export function DesignSystemShowcase() {
  const [centerOpen, setCenterOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-surface-base text-white py-16">
      <div className="container-site space-y-20">

        {/* ── Header ── */}
        <header className="space-y-4">
          <Badge variant="warning">Internal — not indexed, not linked from any page</Badge>
          <Display as="h1" size="lg">Design System</Display>
          <Text size="lg" color="secondary" className="max-w-2xl">
            Every primitive in <code className="text-gold-400">components/ui/</code>, rendered here so
            it&apos;s visible and gets reused instead of re-invented per page. If a component you need
            doesn&apos;t exist below, add it here — don&apos;t hand-roll markup in a page component.
          </Text>
        </header>

        <Divider variant="gold" />

        {/* ── Typography ── */}
        <section>
          <SectionTitle eyebrow="Typography">Type roles</SectionTitle>
          <div className="space-y-8">
            <div>
              <Caption>Display — Fraunces, hero-level only</Caption>
              <Display size="xl">Spirit-Filled Worship</Display>
            </div>
            <div>
              <Caption>Heading — Fraunces, levels 1–6</Caption>
              <div className="space-y-2 mt-2">
                {([1, 2, 3, 4, 5, 6] as const).map((level) => (
                  <Heading key={level} level={level}>Heading level {level}</Heading>
                ))}
              </div>
            </div>
            <div>
              <Caption>Text — Inter, body copy</Caption>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                <Text size="lg">Large body text</Text>
                <Text size="base">Base body text</Text>
                <Text size="sm">Small body text</Text>
                <Text size="xs">Extra-small body text</Text>
              </div>
            </div>
            <div>
              <Caption>Label — Inter, tracked uppercase (eyebrows, tags)</Caption>
              <div className="flex flex-wrap gap-4 mt-2">
                <Label color="gold">Gold label</Label>
                <Label color="white">White label</Label>
                <Label color="muted">Muted label</Label>
              </div>
            </div>
            <div>
              <Caption>Accent — Fraunces italic (scripture / pull-quotes only)</Caption>
              <Accent className="mt-2">&ldquo;Sing unto the Lord a new song.&rdquo; — Psalm 96:1</Accent>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── Color tokens ── */}
        <section>
          <SectionTitle eyebrow="Tokens">Color scales</SectionTitle>
          <div className="space-y-6">
            {Object.entries(COLOR_SCALES).map(([name, steps]) => (
              <div key={name}>
                <Caption className="capitalize mb-2 block">{name}</Caption>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(steps).map(([step, hex]) => (
                    <div key={step} className="flex flex-col items-center gap-1">
                      <div
                        className="h-12 w-12 rounded-lg border border-white/10"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-[0.6rem] font-sans text-neutral-500">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Buttons ── */}
        <section>
          <SectionTitle eyebrow="Actions">Buttons</SectionTitle>
          <div className="space-y-4">
            {BUTTON_VARIANTS.map((variant) => (
              <div key={variant} className="flex flex-wrap items-center gap-3">
                <span className="w-16 shrink-0 text-xs font-sans text-neutral-500">{variant}</span>
                {BUTTON_SIZES.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    Button
                  </Button>
                ))}
                <Button variant={variant} isLoading>Loading</Button>
                <Button variant={variant} disabled>Disabled</Button>
              </div>
            ))}
          </div>

          <Caption className="mt-8 mb-3 block">Icon buttons</Caption>
          <div className="flex flex-wrap items-center gap-3">
            <IconButton label="Like" variant="primary"><Heart className="h-4 w-4" /></IconButton>
            <IconButton label="Add to bag" variant="outline"><ShoppingBag className="h-4 w-4" /></IconButton>
            <IconButton label="Delete" variant="soft"><Trash2 className="h-4 w-4" /></IconButton>
            <IconButton label="Like" variant="ghost"><Heart className="h-4 w-4" /></IconButton>
            <IconButton label="Like" variant="white"><Heart className="h-4 w-4" /></IconButton>
          </div>
        </section>

        <Divider />

        {/* ── Badges ── */}
        <section>
          <SectionTitle eyebrow="Status">Badges</SectionTitle>
          <div className="flex flex-wrap gap-3">
            {BADGE_VARIANTS.map((variant) => (
              <Badge key={variant} variant={variant} dot>{variant}</Badge>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Cards ── */}
        <section>
          <SectionTitle eyebrow="Surfaces">Cards</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARD_VARIANTS.map((variant) => (
              <Card key={variant} variant={variant} interactive>
                <CardHeader>
                  <Heading level={5}>{variant}</Heading>
                </CardHeader>
                <CardBody>
                  <Text size="sm">Card body content goes here, using the Text primitive.</Text>
                </CardBody>
                <CardFooter>
                  <Button variant="ghost" size="sm">Action</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Dialog ── */}
        <section>
          <SectionTitle eyebrow="Overlays">Dialog</SectionTitle>
          <Text size="sm" className="mb-4 max-w-xl">
            Built on Radix (focus trap, Escape, outside-click, ARIA all included) — the fix for
            every hand-rolled `fixed inset-0` modal in the app that was missing them. Three variants:
            centered modal, side drawer, and full-screen overlay.
          </Text>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => setCenterOpen(true)}>Open centered modal</Button>
            <Button variant="outline" onClick={() => setRightOpen(true)}>Open side drawer</Button>
            <Button variant="outline" onClick={() => setFullscreenOpen(true)}>Open full-screen</Button>
          </div>

          <Dialog open={centerOpen} onOpenChange={setCenterOpen}>
            <Dialog.Content title="Example centered dialog" variant="center" className="p-6">
              <Heading level={4} className="mb-2">Centered modal</Heading>
              <Text size="sm">Used for product quick-view, event detail, lightboxes.</Text>
            </Dialog.Content>
          </Dialog>

          <Dialog open={rightOpen} onOpenChange={setRightOpen}>
            <Dialog.Content title="Example side drawer" variant="right" className="p-6">
              <Heading level={4} className="mb-2">Side drawer</Heading>
              <Text size="sm">Used for cart, filters — same pattern as CartDrawer.</Text>
            </Dialog.Content>
          </Dialog>

          <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
            <Dialog.Content title="Example full-screen overlay" variant="fullscreen" className="p-6 flex items-center justify-center">
              <div className="text-center">
                <Heading level={4} className="mb-2">Full-screen overlay</Heading>
                <Text size="sm">Used for the mobile nav, immersive galleries.</Text>
              </div>
            </Dialog.Content>
          </Dialog>
        </section>

        <Divider />

        {/* ── Feedback / loading ── */}
        <section>
          <SectionTitle eyebrow="Feedback">Loading states</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <Caption className="mb-3 block">Spinners</Caption>
              <div className="flex items-center gap-4">
                <Spinner size="xs" /><Spinner size="sm" /><Spinner size="md" /><Spinner size="lg" /><Spinner size="2xl" />
              </div>
            </div>
            <div>
              <Caption className="mb-3 block">Skeletons</Caption>
              <div className="flex items-center gap-4">
                <SkeletonAvatar />
                <div className="flex-1"><SkeletonText lines={2} /></div>
              </div>
            </div>
          </div>
          <Caption className="mt-6 mb-3 block">Skeleton card</Caption>
          <div className="max-w-xs">
            <SkeletonCard />
          </div>
        </section>

        <Divider />

        {/* ── Dividers / brand marks ── */}
        <section>
          <SectionTitle eyebrow="Misc">Dividers &amp; brand</SectionTitle>
          <div className="space-y-6">
            <div>
              <Caption className="mb-2 block">Divider with label</Caption>
              <Divider label="or" />
            </div>
            <div>
              <Caption className="mb-2 block">Gold accent bar</Caption>
              <GoldBar />
            </div>
            <div>
              <Caption className="mb-2 block">Logo</Caption>
              <div className="flex items-center gap-6">
                <Logo size="sm" />
                <Logo size="md" />
                <Logo size="lg" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
