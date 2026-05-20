import { withHandler, parseBody, created, methodNotAllowed } from '@/utils/api';
import { orderSchema }                                        from '@/utils/validators';
import { sendMail, orderConfirmationEmailHtml }               from '@/utils/mail';
import type { OrderResponse }                                 from '@/types/api';

export const dynamic = 'force-dynamic';

export const POST = withHandler(async (req) => {
  const body  = await parseBody(req);
  const input = orderSchema.parse(body);

  const { shipping, payment, items } = input;

  const orderId = crypto.randomUUID();
  const total   = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const adminEmail = process.env.ADMIN_EMAIL ?? 'orders@claudygod.com';

  await sendMail({
    to:      adminEmail,
    replyTo: shipping.email,
    subject: `[Order] #${orderId.slice(0, 8).toUpperCase()} — ${shipping.firstName} ${shipping.lastName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:#C9A84C;padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:22px">New Order Received</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px">Order #${orderId}</p>
        </div>
        <div style="background:#f9f9f9;padding:32px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <thead>
              <tr style="background:#f0f0f0">
                <th style="padding:10px;text-align:left">Item</th>
                <th style="padding:10px;text-align:right">Qty</th>
                <th style="padding:10px;text-align:right">Price</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item) => `
              <tr style="border-bottom:1px solid #f0f0f0">
                <td style="padding:8px 0">${item.name}</td>
                <td style="text-align:right;padding:8px 0">${item.quantity}</td>
                <td style="text-align:right;padding:8px 0">${payment.currency} ${(item.price * item.quantity).toFixed(2)}</td>
              </tr>`,
                )
                .join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="text-align:right;padding:12px 0;font-weight:bold">Total</td>
                <td style="text-align:right;padding:12px 0;font-weight:bold;color:#C9A84C">
                  ${payment.currency} ${total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
          <hr style="border:none;border-top:1px solid #e0e0e0;margin:0 0 16px">
          <p style="margin:0 0 4px"><strong>Customer:</strong> ${shipping.firstName} ${shipping.lastName}</p>
          <p style="margin:0 0 4px"><strong>Email:</strong> ${shipping.email}</p>
          ${shipping.phone ? `<p style="margin:0 0 4px"><strong>Phone:</strong> ${shipping.phone}</p>` : ''}
          <p style="margin:0 0 4px"><strong>Payment:</strong> ${payment.method} (${payment.currency})</p>
          <p style="margin:8px 0 0"><strong>Ship to:</strong><br>
            ${shipping.address1}${shipping.address2 ? ', ' + shipping.address2 : ''}<br>
            ${shipping.city}, ${shipping.state} ${shipping.zipCode}<br>
            ${shipping.country}
          </p>
          ${input.notes ? `<p style="margin:12px 0 0"><strong>Notes:</strong> ${input.notes}</p>` : ''}
        </div>
      </div>`,
  });

  await sendMail({
    to:      shipping.email,
    subject: `Order Confirmed — #${orderId.slice(0, 8).toUpperCase()} | ClaudyGod Ministries`,
    html:    orderConfirmationEmailHtml({
      orderId,
      firstName: shipping.firstName,
      items,
      total,
      currency:  payment.currency,
      shipping: {
        address:    shipping.address1,
        city:       shipping.city,
        state:      shipping.state,
        postalCode: shipping.zipCode,
        country:    shipping.country,
      },
    }),
  });

  const payload: OrderResponse = {
    orderId,
    status:    'pending',
    total,
    currency:  payment.currency,
    createdAt: new Date().toISOString(),
  };

  return created(payload, 'Order placed successfully. A confirmation has been sent to your email.');
});

export function GET()    { return methodNotAllowed(['POST']); }
export function PUT()    { return methodNotAllowed(['POST']); }
export function DELETE() { return methodNotAllowed(['POST']); }
