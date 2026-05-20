import { withHandler, parseBody, created, conflict, methodNotAllowed } from '@/utils/api';
import { newsletterSchema } from '@/utils/validators';
import { sendMail }         from '@/utils/mail';
import type { NewsletterResponse } from '@/types/api';

export const dynamic = 'force-dynamic';

export const POST = withHandler(async (req) => {
  const body  = await parseBody(req);
  const input = newsletterSchema.parse(body);

  // TODO: integrate with Mailchimp / ConvertKit / SendinBlue
  // const alreadySubscribed = await newsletterService.isSubscribed(input.email);
  // if (alreadySubscribed) return conflict('This email is already subscribed.');
  // await newsletterService.subscribe(input);

  const adminEmail = process.env.ADMIN_EMAIL ?? 'info@claudygod.com';

  await sendMail({
    to:      adminEmail,
    subject: `[Newsletter] New subscriber — ${input.email}`,
    html: `<p>New newsletter subscription from <strong>${input.firstName ?? ''} ${input.email}</strong></p>`,
  });

  const payload: NewsletterResponse = {
    email:        input.email,
    subscribedAt: new Date().toISOString(),
  };

  return created(payload, 'You have been subscribed. Thank you!');
});

export function GET()    { return methodNotAllowed(['POST']); }
export function PUT()    { return methodNotAllowed(['POST']); }
export function DELETE() { return methodNotAllowed(['POST']); }
