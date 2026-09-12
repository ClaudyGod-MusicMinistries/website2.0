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
const CartDrawer = dynamic(
  () => import('@/components/store/CartDrawer').then((module) => module.CartDrawer),
  { ssr: false }
);

export function GlobalOverlays() {
  const pathname = usePathname();

  return (
    <>
      {pathname === '/' && <WelcomeModal />}
      {pathname.startsWith('/store') && !pathname.startsWith('/store/checkout') && <CartDrawer />}
      <CookieConsent />
    </>
  );
}
