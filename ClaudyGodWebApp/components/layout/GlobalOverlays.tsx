'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const WelcomeModal = dynamic(
  () => import('@/components/shared/WelcomeModal').then((module) => module.WelcomeModal),
  { ssr: false }
);
const CookieConsent = dynamic(
  () => import('@/components/shared/CookieConsent').then((module) => module.CookieConsent),
  { ssr: false }
);
const AIChatWidget = dynamic(
  () => import('@/components/ui/AIChatWidget').then((module) => module.AIChatWidget),
  { ssr: false }
);
const CartDrawer = dynamic(
  () => import('@/components/store/CartDrawer').then((module) => module.CartDrawer),
  { ssr: false }
);

const FOCUSED_ROUTES = [
  '/bookings',
  '/contact',
  '/donate',
  '/prayer',
  '/store/checkout',
  '/volunteer',
];

export function GlobalOverlays() {
  const pathname = usePathname();
  const [idleFeaturesReady, setIdleFeaturesReady] = useState(false);
  const focused = FOCUSED_ROUTES.some((route) => pathname.startsWith(route));

  useEffect(() => {
    // Chat is useful, but it must not compete with navigation, fonts, or the
    // largest image during the critical first render. Load it once the main
    // thread is idle, with a short fallback for browsers without idle tasks.
    const browser = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

    if (browser.requestIdleCallback) {
      const handle = browser.requestIdleCallback(() => setIdleFeaturesReady(true), {
        timeout: 2500,
      });
      return () => browser.cancelIdleCallback?.(handle);
    }

    const timeout = window.setTimeout(() => setIdleFeaturesReady(true), 1500);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      {pathname === '/' && <WelcomeModal />}
      {pathname.startsWith('/store') && !pathname.startsWith('/store/checkout') && <CartDrawer />}
      <CookieConsent />
      {!focused && idleFeaturesReady && <AIChatWidget />}
    </>
  );
}
