import type { Metadata } from 'next';
import { HelpPageClient } from '@/components/help/HelpPageClient';

export const metadata: Metadata = {
  title: 'Help & FAQ',
  description: 'Frequently asked questions and support resources for ClaudyGod Music Ministries. Get answers about bookings, events, music, volunteering, and more.',
  openGraph: {
    title: 'Help & FAQ - ClaudyGod Music Ministries',
    description: 'Support center with answers to common questions about our music, events, bookings, and services.',
  },
};

export default function HelpPage() {
  return <HelpPageClient />;
}
