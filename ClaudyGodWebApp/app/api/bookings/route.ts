import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { proxyPost } from '@/lib/data/backendProxy';
import { bookingSchema } from '@/lib/validation/booking';

function validationResponse(error: z.ZodError) {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? 'request');
    (fieldErrors[field] ??= []).push(issue.message);
  }
  return NextResponse.json(
    {
      success: false,
      message: 'Please correct the highlighted booking details.',
      data: null,
      errors: ['The booking request did not pass validation.'],
      fieldErrors,
    },
    { status: 422 }
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid request body.',
        data: null,
        errors: ['Expected JSON.'],
        fieldErrors: {},
      },
      { status: 400 }
    );
  }
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) return validationResponse(parsed.error);
  return proxyPost(req, '/bookings', { body: parsed.data });
}
