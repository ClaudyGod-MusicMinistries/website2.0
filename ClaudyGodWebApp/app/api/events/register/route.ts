import { type NextRequest } from 'next/server';
import { ticketReservationSchema } from '@/lib/validation/publicForms';
import { validateAndProxy } from '@/lib/validation/validateRequest';

// Forwards ticket reservation to the .NET backend: POST /api/v1.0/tickets
export async function POST(req: NextRequest) {
  return validateAndProxy(req, '/tickets', ticketReservationSchema);
}
