import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { proxyPost } from '@/lib/data/backendProxy';

const optionalTrimmed = (maximum: number) => z.string().trim().max(maximum).optional();
const bookingSchema = z.object({
  firstName: z.string().trim().min(2).max(60),
  lastName: z.string().trim().min(2).max(60),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  phone: z.string().regex(/^\+[1-9]\d{6,14}$/, 'Use a valid international phone number.'),
  countryCode: z.string().regex(/^[A-Z]{2}$/, 'Choose a valid country.'),
  organization: z.string().trim().min(2).max(150),
  orgType: z.string().trim().min(2).max(100),
  eventType: z.string().trim().min(2).max(100),
  eventDetails: z.string().trim().min(30).max(2000),
  eventDate: z.string().datetime().refine((value) => new Date(value) > new Date(), 'Choose a future event date.'),
  addressLine1: z.string().trim().min(3).max(200),
  addressLine2: optionalTrimmed(200),
  city: z.string().trim().min(2).max(100),
  state: z.string().trim().min(2).max(100),
  country: z.string().trim().min(2).max(100),
  agreeTerms: z.literal(true, { errorMap: () => ({ message: 'Booking terms must be accepted.' }) }),
}).strict();

function validationResponse(error: z.ZodError) {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? 'request');
    (fieldErrors[field] ??= []).push(issue.message);
  }
  return NextResponse.json({
    success: false,
    message: 'Please correct the highlighted booking details.',
    data: null,
    errors: ['The booking request did not pass validation.'],
    fieldErrors,
  }, { status: 422 });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.', data: null, errors: ['Expected JSON.'], fieldErrors: {} }, { status: 400 });
  }
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) return validationResponse(parsed.error);
  return proxyPost(req, '/bookings', { body: parsed.data });
}
