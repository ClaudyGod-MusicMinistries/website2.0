import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Confirming Order',
  robots: { index: false, follow: false },
};

export default function CheckoutCompleteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
