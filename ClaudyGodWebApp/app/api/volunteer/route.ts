import { withHandler, parseBody, created, methodNotAllowed } from '@/utils/api';
import { volunteerSchema } from '@/utils/validators';
import { sendMail }        from '@/utils/mail';
import type { VolunteerResponse } from '@/types/api';

export const dynamic = 'force-dynamic';

export const POST = withHandler(async (req) => {
  const body  = await parseBody(req);
  const input = volunteerSchema.parse(body);

  const adminEmail = process.env.ADMIN_EMAIL ?? 'info@claudygod.com';

  await sendMail({
    to:      adminEmail,
    replyTo: input.email,
    subject: `[Volunteer] ${input.firstName} ${input.lastName} — ${input.skills.join(', ')}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:#C9A84C;padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:22px">New Volunteer Application</h1>
        </div>
        <div style="background:#f9f9f9;padding:32px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#666;width:140px"><strong>Name</strong></td>
                <td>${input.firstName} ${input.lastName}</td></tr>
            <tr><td style="padding:6px 0;color:#666"><strong>Email</strong></td>
                <td><a href="mailto:${input.email}">${input.email}</a></td></tr>
            ${input.phone ? `<tr><td style="padding:6px 0;color:#666"><strong>Phone</strong></td>
                <td>${input.phone}</td></tr>` : ''}
            ${input.city ? `<tr><td style="padding:6px 0;color:#666"><strong>Location</strong></td>
                <td>${input.city}${input.country ? ', ' + input.country : ''}</td></tr>` : ''}
            <tr><td style="padding:6px 0;color:#666"><strong>Skills</strong></td>
                <td>${input.skills.join(', ')}</td></tr>
            ${input.availability ? `<tr><td style="padding:6px 0;color:#666"><strong>Availability</strong></td>
                <td>${input.availability}</td></tr>` : ''}
          </table>
          ${input.message ? `
          <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0">
          <p style="color:#666;margin:0 0 8px"><strong>Message</strong></p>
          <p style="line-height:1.7;white-space:pre-wrap;margin:0">${input.message}</p>` : ''}
        </div>
      </div>`,
  });

  const payload: VolunteerResponse = {
    id:          crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };

  return created(payload, 'Thank you for your interest in volunteering. We will be in touch!');
});

export function GET()    { return methodNotAllowed(['POST']); }
export function PUT()    { return methodNotAllowed(['POST']); }
export function DELETE() { return methodNotAllowed(['POST']); }
