import { withHandler, parseBody, created, methodNotAllowed } from '@/utils/api';
import { contactSchema }                                       from '@/utils/validators';
import { sendMail, contactEmailHtml }                         from '@/utils/mail';
import type { ContactResponse }                               from '@/types/api';

export const dynamic = 'force-dynamic';

export const POST = withHandler(async (req) => {
  const body  = await parseBody(req);
  const input = contactSchema.parse(body);

  const adminEmail = process.env.ADMIN_EMAIL ?? 'info@claudygod.com';

  await sendMail({
    to:      adminEmail,
    replyTo: input.email,
    subject: `[Contact] ${input.subject ?? input.name} — claudygod.com`,
    html:    contactEmailHtml(input),
  });

  const payload: ContactResponse = {
    id:          crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };

  return created(payload, 'Your message has been sent. We will get back to you soon.');
});

export function GET()    { return methodNotAllowed(['POST']); }
export function PUT()    { return methodNotAllowed(['POST']); }
export function DELETE() { return methodNotAllowed(['POST']); }
