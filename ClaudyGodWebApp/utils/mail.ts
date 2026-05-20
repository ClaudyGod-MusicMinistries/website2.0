import nodemailer from 'nodemailer';

// ─── Transport ────────────────────────────────────────────────────────────

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    // In dev, fall back to Ethereal (prints preview URL to console)
    if (process.env.NODE_ENV === 'development') {
      return nodemailer.createTransport({ host: 'localhost', port: 1025 });
    }
    throw new Error('SMTP configuration missing. Set SMTP_HOST, SMTP_USER, SMTP_PASS.');
  }

  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

// ─── Types ────────────────────────────────────────────────────────────────

export interface MailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  cc?: string | string[];
}

// ─── Send ─────────────────────────────────────────────────────────────────

export async function sendMail(options: MailOptions): Promise<void> {
  const transport = createTransport();
  const from = `"${process.env.MAIL_FROM_NAME ?? 'ClaudyGod Ministries'}" <${process.env.MAIL_FROM ?? 'noreply@claudygod.com'}>`;

  await transport.sendMail({ from, ...options });
}

// ─── Email templates ──────────────────────────────────────────────────────

export function contactEmailHtml(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
}): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
      <div style="background:#C9A84C;padding:24px 32px;border-radius:8px 8px 0 0">
        <h1 style="color:#fff;margin:0;font-size:22px">New Contact Message</h1>
      </div>
      <div style="background:#f9f9f9;padding:32px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#666;width:120px"><strong>From</strong></td>
              <td style="padding:8px 0">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#666"><strong>Email</strong></td>
              <td style="padding:8px 0"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          ${data.phone ? `<tr><td style="padding:8px 0;color:#666"><strong>Phone</strong></td>
              <td style="padding:8px 0">${data.phone}</td></tr>` : ''}
          ${data.subject ? `<tr><td style="padding:8px 0;color:#666"><strong>Subject</strong></td>
              <td style="padding:8px 0">${data.subject}</td></tr>` : ''}
        </table>
        <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0">
        <p style="color:#666;margin:0 0 8px"><strong>Message</strong></p>
        <p style="line-height:1.7;white-space:pre-wrap;margin:0">${data.message}</p>
      </div>
      <p style="text-align:center;color:#999;font-size:12px;margin-top:16px">
        ClaudyGod Music Ministries — claudygod.com
      </p>
    </div>`;
}

export function bookingEmailHtml(data: {
  firstName: string; lastName: string; email: string; phone: string;
  organization: string; orgType: string; eventType: string;
  eventDate: string; city: string; country: string; eventDetails?: string;
}): string {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
      <div style="background:#C9A84C;padding:24px 32px;border-radius:8px 8px 0 0">
        <h1 style="color:#fff;margin:0;font-size:22px">New Booking Request</h1>
      </div>
      <div style="background:#f9f9f9;padding:32px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
        <h3 style="color:#C9A84C;margin:0 0 16px">Contact Details</h3>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#666;width:140px"><strong>Name</strong></td>
              <td>${data.firstName} ${data.lastName}</td></tr>
          <tr><td style="padding:6px 0;color:#666"><strong>Email</strong></td>
              <td><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:6px 0;color:#666"><strong>Phone</strong></td>
              <td>${data.phone}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0">
        <h3 style="color:#C9A84C;margin:0 0 16px">Event Details</h3>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#666;width:140px"><strong>Organization</strong></td>
              <td>${data.organization} (${data.orgType})</td></tr>
          <tr><td style="padding:6px 0;color:#666"><strong>Event Type</strong></td>
              <td>${data.eventType}</td></tr>
          <tr><td style="padding:6px 0;color:#666"><strong>Date</strong></td>
              <td>${data.eventDate}</td></tr>
          <tr><td style="padding:6px 0;color:#666"><strong>Location</strong></td>
              <td>${data.city}, ${data.country}</td></tr>
        </table>
        ${data.eventDetails ? `
        <hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0">
        <p style="color:#666;margin:0 0 8px"><strong>Additional Details</strong></p>
        <p style="line-height:1.7;white-space:pre-wrap;margin:0">${data.eventDetails}</p>` : ''}
      </div>
      <p style="text-align:center;color:#999;font-size:12px;margin-top:16px">
        ClaudyGod Music Ministries — claudygod.com
      </p>
    </div>`;
}

export function orderConfirmationEmailHtml(data: {
  orderId: string;
  firstName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  currency: string;
  shipping?: {
    address: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
}): string {
  const itemRows = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #e0e0e0">${item.name}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e0e0e0;text-align:center">${item.quantity}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e0e0e0;text-align:right">${data.currency} ${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join('');

  const shippingBlock = data.shipping
    ? `<hr style="border:none;border-top:1px solid #e0e0e0;margin:24px 0">
       <h3 style="color:#C9A84C;margin:0 0 8px;font-size:15px">Shipping Address</h3>
       <p style="margin:0;line-height:1.7">
         ${data.shipping.address}<br>
         ${data.shipping.city}${data.shipping.state ? ', ' + data.shipping.state : ''} ${data.shipping.postalCode}<br>
         ${data.shipping.country}
       </p>`
    : '';

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
      <div style="background:#C9A84C;padding:24px 32px;border-radius:8px 8px 0 0">
        <h1 style="color:#fff;margin:0;font-size:22px">Order Confirmation</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px">Order #${data.orderId}</p>
      </div>
      <div style="background:#f9f9f9;padding:32px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px">
        <p>Hi <strong>${data.firstName}</strong>, thank you for your order! We've received it and will process it shortly.</p>
        <table style="width:100%;border-collapse:collapse;margin-top:24px">
          <thead>
            <tr style="background:#f0f0f0">
              <th style="padding:10px;text-align:left">Item</th>
              <th style="padding:10px;text-align:center">Qty</th>
              <th style="padding:10px;text-align:right">Total</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding:12px 0;font-weight:bold">Total</td>
              <td style="padding:12px 0;text-align:right;font-weight:bold;color:#C9A84C">
                ${data.currency} ${data.total.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
        ${shippingBlock}
      </div>
      <p style="text-align:center;color:#999;font-size:12px;margin-top:16px">
        ClaudyGod Music Ministries — claudygod.com
      </p>
    </div>`;
}
