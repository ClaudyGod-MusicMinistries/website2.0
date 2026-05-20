import { withHandler, parseBody, created, methodNotAllowed } from '@/utils/api';
import { bookingSchema }                                       from '@/utils/validators';
import { sendMail, bookingEmailHtml }                         from '@/utils/mail';
import type { BookingResponse }                               from '@/types/api';

export const dynamic = 'force-dynamic';

export const POST = withHandler(async (req) => {
  const body  = await parseBody(req);
  const input = bookingSchema.parse(body);

  const adminEmail = process.env.ADMIN_EMAIL ?? 'bookings@claudygod.com';

  await sendMail({
    to:      adminEmail,
    replyTo: input.email,
    subject: `[Booking Request] ${input.eventType} — ${input.organization}`,
    html:    bookingEmailHtml({
      ...input,
      eventDate: input.eventDate,
    }),
  });

  // Confirmation to requester
  await sendMail({
    to:      input.email,
    subject: 'We received your booking request — ClaudyGod Ministries',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#C9A84C;padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:22px">Booking Request Received</h1>
        </div>
        <div style="background:#f9f9f9;padding:32px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
          <p>Hi <strong>${input.firstName}</strong>,</p>
          <p>Thank you for reaching out to book Minister ClaudyGod for your event. We've received your request and will review it shortly.</p>
          <p>Our team will contact you within <strong>2–3 business days</strong> to discuss availability and details.</p>
          <p>God bless you!</p>
          <p><em>— ClaudyGod Ministries Team</em></p>
        </div>
        <p style="text-align:center;color:#999;font-size:12px;margin-top:16px">ClaudyGod Music Ministries</p>
      </div>`,
  });

  const payload: BookingResponse = {
    id:          crypto.randomUUID(),
    status:      'pending',
    submittedAt: new Date().toISOString(),
  };

  return created(payload, 'Booking request submitted. We will contact you within 2–3 business days.');
});

export function GET()    { return methodNotAllowed(['POST']); }
export function PUT()    { return methodNotAllowed(['POST']); }
export function DELETE() { return methodNotAllowed(['POST']); }
