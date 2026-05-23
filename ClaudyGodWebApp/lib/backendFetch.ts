import type { ApiResponse, PaginatedResult, EventDto } from '@/types/api';
import { tourDates } from '@/data/news';

const API_BASE = process.env.API_BASE_URL ?? 'http://localhost:8080';
const API_PREFIX = '/api/v1.0';

export interface EventShape {
  id: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  image: string;
  ticketUrl: string;
  availableSeats: number;
  isFree: boolean;
  status: string;
}

function mapEventDto(ev: EventDto): EventShape {
  const d = new Date(ev.startDate);
  return {
    id:             ev.id,
    title:          ev.title,
    venue:          ev.venue ?? 'Venue TBD',
    date:           ev.startDate.split('T')[0],
    time:           d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    image:          ev.flyerImagePath ?? '/tour_1.jpg',
    ticketUrl:      '#',
    availableSeats: ev.availableSeats,
    isFree:         ev.isFree,
    status:         ev.status,
  };
}

function mapStaticTourDate(t: (typeof tourDates)[number]): EventShape {
  return {
    id:             t.id.toString(),
    title:          t.city,
    venue:          t.venue,
    date:           t.date,
    time:           t.time,
    image:          t.image,
    ticketUrl:      t.ticketUrl,
    availableSeats: 0,
    isFree:         true,
    status:         'Published',
  };
}

export async function fetchEvents(): Promise<EventShape[]> {
  try {
    const res = await fetch(`${API_BASE}${API_PREFIX}/events?pageSize=20&status=Published`, {
      next: { revalidate: 300 }, // cache 5 minutes
    });

    if (!res.ok) throw new Error(`Backend returned ${res.status}`);

    const body = (await res.json()) as ApiResponse<PaginatedResult<EventDto>>;
    if (!body.success || !body.data) throw new Error('Empty response');

    return body.data.items.map(mapEventDto);
  } catch {
    // Backend unavailable — fall back to static tour dates
    return tourDates.map(mapStaticTourDate);
  }
}
