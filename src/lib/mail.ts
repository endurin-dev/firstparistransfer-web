import nodemailer from "nodemailer";

// Configure these in your .env / .env.local
// SMTP_HOST=...
// SMTP_PORT=587
// SMTP_USER=booking@firstparistransfer.com
// SMTP_PASS=...
// SMTP_FROM="First Paris Transfer <booking@firstparistransfer.com>"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const BRAND_YELLOW = "#eab308";
const BRAND_BLACK = "#111111";

interface BookingEmailData {
  bookingId: string;
  tripType: string;
  fromText: string;
  toText: string;
  date: string; // ISO date
  time: string;
  vehicleName: string;
  price: number;
  name: string;
  country?: string | null;
  phone: string;
  email: string;
  note?: string | null;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function baseLayout(opts: {
  headerTitle: string;
  headerSubtitle: string;
  bodyHtml: string;
  footerHtml: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${opts.headerTitle}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

            <!-- Header -->
            <tr>
              <td style="background-color:${BRAND_BLACK};padding:32px 40px;text-align:center;">
                <div style="color:${BRAND_YELLOW};font-size:13px;letter-spacing:3px;text-transform:uppercase;font-weight:600;margin-bottom:6px;">
                  First Paris Transfer
                </div>
                <div style="color:#ffffff;font-size:24px;font-weight:700;">
                  ${opts.headerTitle}
                </div>
                <div style="color:#c9c9c9;font-size:14px;margin-top:6px;">
                  ${opts.headerSubtitle}
                </div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:36px 40px;">
                ${opts.bodyHtml}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#fafafa;padding:24px 40px;border-top:1px solid #eee;">
                ${opts.footerHtml}
              </td>
            </tr>

          </table>
          <div style="color:#999;font-size:11px;margin-top:16px;">
            © ${new Date().getFullYear()} First Paris Transfer. All rights reserved.
          </div>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

function detailRow(label: string, value?: string | number | null) {
  if (value === undefined || value === null || value === "") return "";
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#888;font-size:13px;width:40%;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:${BRAND_BLACK};font-size:14px;font-weight:600;text-align:right;">${value}</td>
    </tr>
  `;
}

function detailsTable(d: BookingEmailData, includeContact: boolean) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
      ${detailRow("Booking Ref", `#${d.bookingId.slice(0, 8).toUpperCase()}`)}
      ${detailRow("Trip Type", d.tripType)}
      ${detailRow("From", d.fromText)}
      ${detailRow("To", d.toText)}
      ${detailRow("Date", formatDate(d.date))}
      ${detailRow("Pickup Time", d.time)}
      ${detailRow("Vehicle", d.vehicleName)}
      ${includeContact ? detailRow("Passenger", d.name) : ""}
      ${includeContact ? detailRow("Country", d.country) : ""}
      ${includeContact ? detailRow("Phone", d.phone) : ""}
      ${includeContact ? detailRow("Email", d.email) : ""}
      ${detailRow("Special Requests", d.note)}
    </table>
  `;
}

export async function sendBookingEmails(d: BookingEmailData) {
  const priceHtml = `
    <div style="margin-top:20px;padding:16px 20px;background-color:#fffbea;border:1px solid #fde68a;border-radius:10px;display:flex;justify-content:space-between;align-items:center;">
      <span style="color:${BRAND_BLACK};font-size:14px;font-weight:600;">Total Price</span>
      <span style="color:${BRAND_YELLOW};font-size:24px;font-weight:800;">€${d.price}</span>
    </div>
  `;

  // ---------- CLIENT EMAIL ----------
  const clientHtml = baseLayout({
    headerTitle: "Your Ride is Confirmed",
    headerSubtitle: "Thank you for booking with us, " + d.name.split(" ")[0],
    bodyHtml: `
      <p style="color:${BRAND_BLACK};font-size:15px;line-height:1.6;margin-top:0;">
        Bonjour ${d.name.split(" ")[0]}, your private transfer in Paris is confirmed.
        Our chauffeur will be ready and waiting at your pickup point at the scheduled time.
      </p>
      ${detailsTable(d, false)}
      ${priceHtml}
      <div style="margin-top:24px;padding:16px 20px;background-color:#f8f8f8;border-radius:10px;">
        <p style="margin:0;color:#555;font-size:13px;line-height:1.6;">
          <strong>Need to make changes?</strong> Simply reply to this email or contact us at
          <a href="mailto:booking@firstparistransfer.com" style="color:${BRAND_YELLOW};">booking@firstparistransfer.com</a>
          and we'll be happy to help.
        </p>
      </div>
    `,
    footerHtml: `
      <p style="margin:0;color:#999;font-size:12px;text-align:center;">
        Free cancellation • 24/7 support • Trusted by 50,000+ travelers
      </p>
    `,
  });

  // ---------- ADMIN EMAIL ----------
  const adminHtml = baseLayout({
    headerTitle: "New Booking Received",
    headerSubtitle: "A new transfer has just been booked",
    bodyHtml: `
      ${detailsTable(d, true)}
      ${priceHtml}
    `,
    footerHtml: `
      <p style="margin:0;color:#999;font-size:12px;text-align:center;">
        Log in to the admin panel to manage this booking.
      </p>
    `,
  });

  const from = process.env.SMTP_FROM || "First Paris Transfer <booking@firstparistransfer.com>";

  await Promise.all([
    transporter.sendMail({
      from,
      to: "booking@firstparistransfer.com",
      subject: `New Booking — ${d.name} — ${formatDate(d.date)}`,
      html: adminHtml,
    }),
    transporter.sendMail({
      from,
      to: d.email,
      subject: `Booking Confirmed — Your Paris Transfer on ${formatDate(d.date)}`,
      html: clientHtml,
    }),
  ]);
}