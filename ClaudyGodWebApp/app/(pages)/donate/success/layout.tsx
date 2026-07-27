import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donation Confirmation',
  robots: { index: false, follow: false },
};

export default function DonationSuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
