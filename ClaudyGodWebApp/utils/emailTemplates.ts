/**
 * Professional Email Templates for ClaudyGod Ministry
 * All templates use modern design with proper branding
 */

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

const BRAND_LOGO_URL = 'https://claudygod.org/ClaudyGoLogo.webp';
const BRAND_COLOR = '#7C3AED'; // Purple
const BRAND_PRIMARY = '#0D0B1A'; // Dark background

function getEmailHeader(): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, ${BRAND_PRIMARY} 0%, #1a1628 100%);">
      <tr>
        <td align="center" style="padding: 40px 20px;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
            <img src="${BRAND_LOGO_URL}" alt="ClaudyGod" width="48" height="48" style="border-radius: 50%; border: 2px solid ${BRAND_COLOR};" />
            <div>
              <h1 style="margin: 0; font-family: 'Bricolage Grotesque', sans-serif; font-size: 24px; font-weight: bold; color: white; letter-spacing: 0.5px;">ClaudyGod</h1>
              <p style="margin: 4px 0 0 0; font-family: 'Work Sans', sans-serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #D4AF37;">Music Ministries</p>
            </div>
          </div>
        </td>
      </tr>
    </table>
  `;
}

function getEmailFooter(): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="background: #0a0915; border-top: 1px solid rgba(124, 58, 237, 0.2); margin-top: 40px;">
      <tr>
        <td align="center" style="padding: 40px 20px;">
          <p style="margin: 0; font-family: 'Raleway', sans-serif; font-size: 13px; color: #999; line-height: 1.6;">
            Spirit-filled gospel music, worship, and ministry<br />
            <a href="https://claudygod.org" style="color: ${BRAND_COLOR}; text-decoration: none; font-weight: 600;">Visit our website</a> •
            <a href="https://twitter.com/claudygod" style="color: ${BRAND_COLOR}; text-decoration: none; font-weight: 600;">Follow us</a>
          </p>
          <p style="margin: 20px 0 0 0; font-family: 'Raleway', sans-serif; font-size: 12px; color: #666;">
            © 2026 ClaudyGod Music Ministries. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  `;
}

export function newsletterWelcome(email: string): EmailTemplate {
  return {
    subject: 'Welcome to ClaudyGod Music Ministries! 🎵',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
            a { color: ${BRAND_COLOR}; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background: #f5f5f5;">
          ${getEmailHeader()}

          <table width="100%" cellpadding="0" cellspacing="0" style="background: white;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <div style="max-width: 600px; margin: 0 auto;">
                  <h2 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 28px; font-weight: bold; color: #0D0B1A; margin: 0 0 20px 0;">Welcome to Our Community! 🙏</h2>

                  <p style="font-family: 'Raleway', sans-serif; font-size: 16px; color: #333; line-height: 1.8; margin: 0 0 20px 0;">
                    Hi ${email},<br /><br />
                    Thank you for subscribing to ClaudyGod Music Ministries! You're now part of our growing community of spirit-filled believers from around the world.
                  </p>

                  <div style="background: linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%); border-left: 4px solid ${BRAND_COLOR}; padding: 20px; margin: 30px 0; border-radius: 4px;">
                    <h3 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 16px; font-weight: bold; color: #0D0B1A; margin: 0 0 10px 0;">What You'll Receive:</h3>
                    <ul style="font-size: 14px; color: #555; margin: 0; padding-left: 20px; line-height: 1.8;">
                      <li>Latest music releases and singles</li>
                      <li>Exclusive worship videos and performances</li>
                      <li>Ministry updates and event announcements</li>
                      <li>Inspiring messages and devotionals</li>
                      <li>Special offers and behind-the-scenes content</li>
                    </ul>
                  </div>

                  <p style="font-family: 'Raleway', sans-serif; font-size: 16px; color: #333; line-height: 1.8; margin: 30px 0;">
                    Explore our content and stay connected with the latest from ClaudyGod Music Ministries.
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                    <tr>
                      <td align="center">
                        <a href="https://claudygod.org/music" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, ${BRAND_COLOR} 0%, #6D28D9 100%); color: white; font-family: 'Bricolage Grotesque', sans-serif; font-size: 14px; font-weight: bold; text-decoration: none; border-radius: 8px; letter-spacing: 0.5px;">LISTEN NOW</a>
                      </td>
                    </tr>
                  </table>

                  <p style="font-family: 'Raleway', sans-serif; font-size: 14px; color: #666; margin: 30px 0;">
                    In faith and music,<br />
                    <strong>Minister ClaudyGod</strong>
                  </p>
                </div>
              </td>
            </tr>
          </table>

          ${getEmailFooter()}
        </body>
      </html>
    `,
    text: `Welcome to ClaudyGod Music Ministries!\n\nHi ${email},\n\nThank you for subscribing! You're now part of our community.\n\nWhat You'll Receive:\n- Latest music releases\n- Exclusive worship videos\n- Ministry updates\n- Inspiring messages\n- Special offers\n\nVisit: https://claudygod.org/music\n\nIn faith and music,\nMinister ClaudyGod`,
  };
}

export function eventRegistrationConfirmation(name: string, eventTitle: string, eventDate: string): EmailTemplate {
  return {
    subject: `Event Registration Confirmed: ${eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background: #f5f5f5; font-family: 'Raleway', sans-serif;">
          ${getEmailHeader()}

          <table width="100%" cellpadding="0" cellspacing="0" style="background: white;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <div style="max-width: 600px; margin: 0 auto;">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                      <span style="font-size: 32px;">✓</span>
                    </div>
                    <h2 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 28px; font-weight: bold; color: #0D0B1A; margin: 0;">Registration Confirmed!</h2>
                  </div>

                  <p style="font-size: 16px; color: #333; line-height: 1.8; margin: 20px 0;">
                    Hi ${name},<br /><br />
                    Your registration for <strong>${eventTitle}</strong> has been confirmed!
                  </p>

                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
                    <h3 style="font-family: 'Bricolage Grotesque', sans-serif; color: #0D0B1A; margin: 0 0 15px 0;">Event Details:</h3>
                    <p style="margin: 10px 0; color: #555; font-size: 14px;">
                      <strong>Date:</strong> ${eventDate}
                    </p>
                    <p style="margin: 10px 0; color: #555; font-size: 14px;">
                      <strong>Event:</strong> ${eventTitle}
                    </p>
                  </div>

                  <p style="font-size: 14px; color: #666; line-height: 1.8;">
                    A confirmation email with additional details will be sent closer to the event date. If you have any questions, feel free to contact us.
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                    <tr>
                      <td align="center">
                        <a href="https://claudygod.org/events" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, ${BRAND_COLOR} 0%, #6D28D9 100%); color: white; font-family: 'Bricolage Grotesque', sans-serif; font-size: 14px; font-weight: bold; text-decoration: none; border-radius: 8px;">VIEW EVENT</a>
                      </td>
                    </tr>
                  </table>

                  <p style="font-size: 14px; color: #999; margin: 30px 0;">
                    We look forward to seeing you there! 🙏
                  </p>
                </div>
              </td>
            </tr>
          </table>

          ${getEmailFooter()}
        </body>
      </html>
    `,
    text: `Event Registration Confirmed!\n\nHi ${name},\n\nYour registration for ${eventTitle} has been confirmed!\n\nDate: ${eventDate}\n\nWe look forward to seeing you there!\n\nView Event: https://claudygod.org/events`,
  };
}

export function contactFormConfirmation(name: string, subject: string): EmailTemplate {
  return {
    subject: `We Received Your Message - ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background: #f5f5f5; font-family: 'Raleway', sans-serif;">
          ${getEmailHeader()}

          <table width="100%" cellpadding="0" cellspacing="0" style="background: white;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <div style="max-width: 600px; margin: 0 auto;">
                  <h2 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 28px; font-weight: bold; color: #0D0B1A; margin: 0 0 20px 0;">Thank You for Reaching Out! 📬</h2>

                  <p style="font-size: 16px; color: #333; line-height: 1.8; margin: 20px 0;">
                    Hi ${name},<br /><br />
                    We've received your message and appreciate you taking the time to contact ClaudyGod Music Ministries.
                  </p>

                  <div style="background: linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%); border-left: 4px solid ${BRAND_COLOR}; padding: 20px; margin: 30px 0; border-radius: 4px;">
                    <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.8;">
                      <strong>Subject:</strong> ${subject}<br />
                      Our team will review your message and respond within 24-48 hours.
                    </p>
                  </div>

                  <p style="font-size: 14px; color: #666; line-height: 1.8; margin: 20px 0;">
                    In the meantime, feel free to explore our website, listen to our latest music, or check out our upcoming events.
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                    <tr>
                      <td align="center">
                        <a href="https://claudygod.org" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, ${BRAND_COLOR} 0%, #6D28D9 100%); color: white; font-family: 'Bricolage Grotesque', sans-serif; font-size: 14px; font-weight: bold; text-decoration: none; border-radius: 8px;">BACK TO WEBSITE</a>
                      </td>
                    </tr>
                  </table>

                  <p style="font-size: 14px; color: #999;">
                    In faith and music,<br />
                    <strong>ClaudyGod Music Ministries</strong>
                  </p>
                </div>
              </td>
            </tr>
          </table>

          ${getEmailFooter()}
        </body>
      </html>
    `,
    text: `Thank You for Reaching Out!\n\nHi ${name},\n\nWe've received your message about: ${subject}\n\nOur team will respond within 24-48 hours.\n\nThank you for contacting us!\n\nClaudyGod Music Ministries`,
  };
}

export function volunteerApplicationConfirmation(name: string, role: string): EmailTemplate {
  return {
    subject: `Volunteer Application Received - ${role}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background: #f5f5f5; font-family: 'Raleway', sans-serif;">
          ${getEmailHeader()}

          <table width="100%" cellpadding="0" cellspacing="0" style="background: white;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <div style="max-width: 600px; margin: 0 auto;">
                  <h2 style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 28px; font-weight: bold; color: #0D0B1A; margin: 0 0 20px 0;">Application Received! 🙌</h2>

                  <p style="font-size: 16px; color: #333; line-height: 1.8; margin: 20px 0;">
                    Hi ${name},<br /><br />
                    Thank you for your interest in volunteering with ClaudyGod Music Ministries as a <strong>${role}</strong>.
                  </p>

                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
                    <h3 style="font-family: 'Bricolage Grotesque', sans-serif; color: #0D0B1A; margin: 0 0 15px 0;">What's Next?</h3>
                    <ol style="margin: 0; padding-left: 20px; color: #555; font-size: 14px; line-height: 1.8;">
                      <li>We review all applications carefully</li>
                      <li>Our team will contact you within 3-5 business days</li>
                      <li>We'll discuss available opportunities that match your skills</li>
                      <li>Onboarding and training will be provided</li>
                    </ol>
                  </div>

                  <p style="font-size: 14px; color: #666; line-height: 1.8;">
                    We're excited to have passionate individuals like you interested in our ministry. Your contribution will make a real difference in our mission to spread the love of God through music and ministry.
                  </p>

                  <p style="font-size: 14px; color: #999; margin: 30px 0;">
                    Questions? Feel free to reply to this email or visit our volunteer page.<br />
                    <strong>In faith and service,</strong><br />
                    ClaudyGod Music Ministries Team
                  </p>
                </div>
              </td>
            </tr>
          </table>

          ${getEmailFooter()}
        </body>
      </html>
    `,
    text: `Volunteer Application Received!\n\nHi ${name},\n\nThank you for applying to volunteer as a ${role}!\n\nWhat's Next:\n1. We review all applications\n2. Our team contacts you in 3-5 business days\n3. We discuss opportunities\n4. Training provided\n\nIn faith and service,\nClaudyGod Music Ministries`,
  };
}
