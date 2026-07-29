import { type NextRequest } from 'next/server';
import { prayerRequestSchema } from '@/lib/validation/publicForms';
import { validateAndProxy } from '@/lib/validation/validateRequest';

export async function POST(req: NextRequest) {
  return validateAndProxy(req, '/prayer-requests', prayerRequestSchema);
}
