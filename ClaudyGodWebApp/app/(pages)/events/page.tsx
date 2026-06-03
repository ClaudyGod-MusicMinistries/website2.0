import { Metadata } from 'next';
import { EventsPageClient } from '@/components/events/EventsPageClient';

export const metadata: Metadata = {
  title: 'Events & Tours',
  description: 'Upcoming and completed events, concerts, and ministry tours by Minister ClaudyGod. Register for events and view highlights.',
};

export default function EventsPage() {
  return <EventsPageClient />;
}
