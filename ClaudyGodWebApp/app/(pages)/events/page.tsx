import { redirect } from 'next/navigation';

/**
 * /events used to be a second, static-placeholder-data events page
 * (data/events.ts, never fetched from the real backend) that duplicated
 * components/news/EventsSection.tsx — the actual working, backend-driven
 * (useEvents() -> GET /api/events -> the real .NET EventController)
 * events + ticket-reservation experience already live at /news. Rather
 * than maintain two implementations of the same thing, /events now
 * points to the one real one.
 */
export default function EventsPage() {
  redirect('/news');
}
