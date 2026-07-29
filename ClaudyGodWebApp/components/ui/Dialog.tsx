'use client';

import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

/**
 * Shared dialog/drawer/full-screen-overlay primitive, modeled on
 * components/store/CartDrawer.tsx's already-correct accessibility pattern
 * (role="dialog", aria-modal, Escape handling, body-scroll lock). Built on
 * Radix so focus trap, outside-click, Escape, and ARIA wiring come for free
 * instead of being hand-rolled (and forgotten) per component.
 *
 * Every full-screen `fixed inset-0` overlay in the app — EventDetailModal,
 * ProductModal, TeachingsGrid's lightbox, VideoGrid, FeaturedVideos,
 * LatestRelease, the mobile nav overlay — should be migrated onto this as
 * each is touched, rather than patched individually.
 */

const variantStyles = {
  /** Centered modal — product quick-view, event detail, lightboxes. */
  center: cn(
    'fixed left-1/2 top-1/2 z-modal w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2',
    'rounded-xl max-h-[85dvh] overflow-y-auto',
    'data-[state=open]:animate-dialog-scale-in'
  ),
  /** Bottom sheet on phones, centered dialog from sm upward. */
  responsive: cn(
    'fixed inset-x-0 bottom-0 z-modal max-h-[88dvh] w-full overflow-y-auto rounded-t-xl',
    'sm:bottom-auto sm:left-1/2 sm:right-auto sm:top-1/2 sm:w-[calc(100%-2rem)] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl',
    'data-[state=open]:animate-fade-in'
  ),
  /** Side drawer — cart, filters. */
  right: cn(
    'fixed right-0 top-0 bottom-0 z-modal w-full max-w-sm',
    'data-[state=open]:animate-slide-in-right'
  ),
  /** Full-bleed overlay — mobile nav, immersive galleries. */
  fullscreen: cn(
    'fixed inset-0 z-modal w-full h-full overflow-y-auto',
    'data-[state=open]:animate-fade-in'
  ),
} as const;

type DialogVariant = keyof typeof variantStyles;

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixDialog.Root>
  );
}

interface DialogContentProps {
  children: ReactNode;
  /** Required for screen readers even when visually hidden — every dialog needs an accessible name. */
  title: string;
  hideTitle?: boolean;
  description?: string;
  variant?: DialogVariant;
  className?: string;
  showClose?: boolean;
}

Dialog.Content = function DialogContent({
  children,
  title,
  hideTitle = false,
  description,
  variant = 'center',
  className,
  showClose = true,
}: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-overlay bg-black/75 backdrop-blur-sm data-[state=open]:animate-fade-in" />
      <RadixDialog.Content
        className={cn(
          'bg-surface-raised border border-white/10 shadow-card-hover focus:outline-none',
          variantStyles[variant],
          className
        )}
      >
        <RadixDialog.Title className={hideTitle ? 'sr-only' : undefined}>{title}</RadixDialog.Title>
        {description && (
          <RadixDialog.Description className="sr-only">{description}</RadixDialog.Description>
        )}
        {showClose && (
          <RadixDialog.Close
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </RadixDialog.Close>
        )}
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
};
