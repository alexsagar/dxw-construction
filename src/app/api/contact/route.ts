import { NextResponse } from 'next/server';

// Allowed enquiry types
const ALLOWED_ENQUIRY_TYPES = [
  'contracting',
  'procurement',
  'workforce',
  'partnership',
  'general',
] as const;

type EnquiryType = (typeof ALLOWED_ENQUIRY_TYPES)[number];

const ENQUIRY_TYPE_LABELS: Record<EnquiryType, string> = {
  contracting: 'Construction Contracting / Building Works',
  procurement: 'Subcontracting & Supply Chain',
  workforce: 'Workforce & Operational Logistics',
  partnership: 'Strategic Alliance & Joint Ventures',
  general: 'General Corporate Enquiry',
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Prevent header injection: remove CR and LF characters
function sanitizeSingleLine(str: string): string {
  return str.replace(/[\r\n]+/g, ' ').trim();
}

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const PHONE_REGEX = /^[0-9+\-\s()]{6,40}$/;

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Malformed request body' },
        { status: 400 }
      );
    }

    const {
      name,
      company,
      email,
      phone,
      enquiryType,
      scope,
      message,
      website_hp,
    } = body as Record<string, unknown>;

    // Honeypot check: If the hidden honeypot field is filled, silently succeed without sending email
    if (typeof website_hp === 'string' && website_hp.trim().length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 1. Name validation
    if (typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    const cleanName = sanitizeSingleLine(name);
    if (cleanName.length < 2 || cleanName.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      );
    }

    // 2. Company validation
    if (typeof company !== 'string') {
      return NextResponse.json(
        { error: 'Company is required' },
        { status: 400 }
      );
    }
    const cleanCompany = sanitizeSingleLine(company);
    if (cleanCompany.length < 2 || cleanCompany.length > 120) {
      return NextResponse.json(
        { error: 'Company must be between 2 and 120 characters' },
        { status: 400 }
      );
    }

    // 3. Email validation
    if (typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    const cleanEmail = sanitizeSingleLine(email).toLowerCase();
    if (cleanEmail.length < 5 || cleanEmail.length > 254 || !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    // 4. Phone validation
    if (typeof phone !== 'string') {
      return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
    }
    const cleanPhone = sanitizeSingleLine(phone);
    if (!PHONE_REGEX.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // 5. Enquiry Type validation
    if (
      typeof enquiryType !== 'string' ||
      !ALLOWED_ENQUIRY_TYPES.includes(enquiryType as EnquiryType)
    ) {
      return NextResponse.json(
        { error: 'Invalid enquiry type' },
        { status: 400 }
      );
    }
    const cleanEnquiryType = enquiryType as EnquiryType;
    const enquiryLabel = ENQUIRY_TYPE_LABELS[cleanEnquiryType];

    // 6. Scope validation (optional)
    let cleanScope = '';
    if (typeof scope === 'string' && scope.trim().length > 0) {
      cleanScope = sanitizeSingleLine(scope);
      if (cleanScope.length > 200) {
        return NextResponse.json(
          { error: 'Project scope exceeds maximum length (200 characters)' },
          { status: 400 }
        );
      }
    }

    // 7. Message validation
    if (typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    const cleanMessage = message.trim();
    if (cleanMessage.length < 10 || cleanMessage.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    // Check environment variables
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || 'contact@dxwconstruction.com';
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      'DXW Website <website@forms.dxwconstruction.com>';

    if (!apiKey) {
      console.error('[Contact API] Missing RESEND_API_KEY environment variable.');
      return NextResponse.json(
        { error: 'Service is temporarily unavailable. Please email us directly.' },
        { status: 500 }
      );
    }

    // Format submission timestamps
    const now = new Date();
    const submittedAtGst = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Dubai',
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(now);
    const submittedAtUtc = now.toISOString();

    // Email subject: clean single-line
    const emailSubject = `New Website Enquiry: ${cleanName} - ${cleanCompany}`;

    // Escaped values for HTML
    const escapedName = escapeHtml(cleanName);
    const escapedCompany = escapeHtml(cleanCompany);
    const escapedEmail = escapeHtml(cleanEmail);
    const escapedPhone = escapeHtml(cleanPhone);
    const escapedEnquiryType = escapeHtml(enquiryLabel);
    const escapedScope = cleanScope ? escapeHtml(cleanScope) : '';
    const escapedMessage = escapeHtml(cleanMessage);

    // Plain Text version
    const textContent = [
      '======================================================',
      'NEW WEBSITE COMMERCIAL ENQUIRY - DXW CONSTRUCTION L.L.C.',
      '======================================================',
      '',
      `Full Name:             ${cleanName}`,
      `Company:               ${cleanCompany}`,
      `Work Email:            ${cleanEmail}`,
      `Phone / WhatsApp:      ${cleanPhone}`,
      `Enquiry Type:          ${enquiryLabel}`,
      ...(cleanScope ? [`Project Scope / Loc:  ${cleanScope}`] : []),
      `Submission Time (GST): ${submittedAtGst} (Dubai)`,
      `Timestamp (UTC):       ${submittedAtUtc}`,
      'Origin:                dxwconstruction.com',
      '',
      '------------------------------------------------------',
      'PROJECT DETAILS / MESSAGE:',
      '------------------------------------------------------',
      cleanMessage,
      '',
      '------------------------------------------------------',
      `Reply-To: ${cleanEmail} (Replying to this email will reply directly to the visitor)`,
      '======================================================',
    ].join('\n');

    // HTML version
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Website Enquiry</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; color: #18181b;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e4e4e7; border-top: 4px solid #0b3d91;">
    <div style="padding: 24px 32px 16px 32px; border-bottom: 1px solid #f4f4f5;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #0b3d91; letter-spacing: 0.5px;">D X W  C O N S T R U C T I O N</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #71717a; text-transform: uppercase; letter-spacing: 1px;">New Website Commercial Enquiry</p>
    </div>
    
    <div style="padding: 24px 32px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; width: 140px; color: #71717a; font-weight: 600; vertical-align: top;">Full Name:</td>
          <td style="padding: 8px 0; color: #09090b; font-weight: 600; vertical-align: top;">${escapedName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #71717a; font-weight: 600; vertical-align: top;">Company:</td>
          <td style="padding: 8px 0; color: #09090b; vertical-align: top;">${escapedCompany}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #71717a; font-weight: 600; vertical-align: top;">Work Email:</td>
          <td style="padding: 8px 0; color: #0b3d91; vertical-align: top;"><a href="mailto:${escapedEmail}" style="color: #0b3d91; text-decoration: none;">${escapedEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #71717a; font-weight: 600; vertical-align: top;">Phone / WhatsApp:</td>
          <td style="padding: 8px 0; color: #09090b; vertical-align: top;">${escapedPhone}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #71717a; font-weight: 600; vertical-align: top;">Enquiry Type:</td>
          <td style="padding: 8px 0; color: #09090b; vertical-align: top;">${escapedEnquiryType}</td>
        </tr>
        ${
          escapedScope
            ? `<tr>
          <td style="padding: 8px 0; color: #71717a; font-weight: 600; vertical-align: top;">Project Scope:</td>
          <td style="padding: 8px 0; color: #09090b; vertical-align: top;">${escapedScope}</td>
        </tr>`
            : ''
        }
        <tr>
          <td style="padding: 8px 0; color: #71717a; font-weight: 600; vertical-align: top;">Submitted At:</td>
          <td style="padding: 8px 0; color: #71717a; vertical-align: top;">${submittedAtGst} (Dubai GST)</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #71717a; font-weight: 600; vertical-align: top;">Origin Domain:</td>
          <td style="padding: 8px 0; color: #71717a; vertical-align: top;">dxwconstruction.com</td>
        </tr>
      </table>

      <div style="border-top: 1px solid #e4e4e7; padding-top: 20px;">
        <h2 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">Project Details / Message:</h2>
        <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-left: 3px solid #0b3d91; padding: 16px; font-size: 14px; line-height: 1.6; color: #27272a; white-space: pre-wrap;">${escapedMessage}</div>
      </div>
    </div>

    <div style="padding: 16px 32px; background-color: #fafafa; border-top: 1px solid #f4f4f5; font-size: 12px; color: #a1a1aa;">
      <p style="margin: 0;">This email was sent via the contact form on <a href="https://dxwconstruction.com" style="color: #71717a; text-decoration: underline;">dxwconstruction.com</a>. Clicking Reply in your mail client will reply directly to <strong>${escapedEmail}</strong>.</p>
    </div>
  </div>
</body>
</html>`;

    // Dispatch to Resend API via web-standard fetch
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'DXW-Construction-Website/1.0',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: cleanEmail,
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error(
        '[Contact API] Resend API responded with error status:',
        resendResponse.status,
        errorText
      );
      return NextResponse.json(
        { error: 'Failed to deliver message' },
        { status: 502 }
      );
    }

    const resendData = (await resendResponse.json()) as { id?: string };

    return NextResponse.json(
      { success: true, id: resendData.id },
      { status: 200 }
    );
  } catch (err) {
    console.error('[Contact API] Unexpected error handling submission:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
