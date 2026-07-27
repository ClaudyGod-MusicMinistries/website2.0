'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

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
  const focused = FOCUSED_ROUTES.some((route) => pathname.startsWith(route));

  return (
    <>
      {pathname === '/' && <WelcomeModal />}
      {pathname.startsWith('/store') && !pathname.startsWith('/store/checkout') && <CartDrawer />}
      <CookieConsent />
      {!focused && <AIChatWidget />}
    </>
  );
}
