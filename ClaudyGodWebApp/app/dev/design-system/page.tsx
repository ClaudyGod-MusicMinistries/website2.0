import type { Metadata } from 'next';
import { DesignSystemShowcase } from './DesignSystemShowcase';

export const metadata: Metadata = {
  title: 'Design System — Internal',
  robots: { index: false, follow: false },
};

export default function DesignSystemPage() {
  return <DesignSystemShowcase />;
}
