import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  phone:   z.string().optional(),
  eventId: z.number().int().positive(),
  city:    z.string().min(2).max(80),
  notes:   z.string().max(500).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // TODO: persist to database / send confirmation email
    // For now: log and return success so the frontend can integrate later
    console.log('[EVENT REGISTRATION]', data);

    return NextResponse.json(
      { success: true, message: 'Registration received', data },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: err.issues }, { status: 422 });
    }
    return NextResponse.json({ success: false, message: 'Internal error' }, { status: 500 });
  }
}
