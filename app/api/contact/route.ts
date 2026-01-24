import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
 try {
  const body = await request.json();
  const { email, message } = body;

  // Validate inputs
  if (!email || !message) {
   return NextResponse.json(
    { error: 'Email and message are required' },
    { status: 400 }
   );
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
   return NextResponse.json(
    { error: 'Invalid email format' },
    { status: 400 }
   );
  }

  // Send email using Resend
  const { data, error } = await resend.emails.send({
   from: 'Portfolio <contact@evan-g.com>',
   to: 'evan.g.creative@gmail.com',
   replyTo: email,
   subject: `Nouveau message portfolio - ${email}`,
   html: `
    <!DOCTYPE html>
    <html>
    <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #0a0a0b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
     <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0b; padding: 40px 20px;">
      <tr>
       <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">
         
         <!-- Header -->
         <tr>
          <td style="padding: 40px 40px 20px 40px; border-bottom: 1px solid rgba(255,255,255,0.1);">
           <h1 style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -1px;">
            <span style="color: #ffffff;">PORT</span><span style="color: rgba(255,255,255,0.2);">—</span><span style="color: #ffffff;">FOLIO</span>
           </h1>
           <p style="margin: 8px 0 0 0; font-size: 11px; letter-spacing: 3px; color: rgba(255,255,255,0.4); text-transform: uppercase;">
            New Contact Message
           </p>
          </td>
         </tr>

         <!-- Content -->
         <tr>
          <td style="padding: 40px;">
           <!-- Badge -->
           <div style="display: inline-block; background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; padding: 8px 16px; margin-bottom: 24px;">
            <span style="font-size: 12px; color: rgba(255,255,255,0.6); letter-spacing: 2px; text-transform: uppercase;">From</span>
           </div>
           
           <!-- Email -->
           <p style="margin: 0 0 32px 0; font-size: 20px; color: #ffffff; font-weight: 500;">
            ${email}
           </p>

           <!-- Divider -->
           <div style="width: 40px; height: 1px; background: rgba(255,255,255,0.2); margin-bottom: 32px;"></div>

           <!-- Message Label -->
           <p style="margin: 0 0 16px 0; font-size: 11px; letter-spacing: 3px; color: rgba(255,255,255,0.4); text-transform: uppercase;">
            Message
           </p>

           <!-- Message Content -->
           <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 24px;">
            <p style="margin: 0; font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.85); white-space: pre-wrap;">${message}</p>
           </div>

           <!-- Reply Button -->
           <a href="mailto:${email}" style="display: inline-block; margin-top: 32px; padding: 14px 28px; border: 1px solid rgba(255,255,255,0.3); color: rgba(255,255,255,0.8); text-decoration: none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; transition: all 0.3s;">
            Répondre →
           </a>
          </td>
         </tr>

         <!-- Footer -->
         <tr>
          <td style="padding: 24px 40px; border-top: 1px solid rgba(255,255,255,0.1);">
           <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
             <td style="font-size: 11px; color: rgba(255,255,255,0.3);">
              © ${new Date().getFullYear()} Evan G
             </td>
             <td align="right" style="font-size: 11px; color: rgba(255,255,255,0.3);">
              Portfolio Contact Form
             </td>
            </tr>
           </table>
          </td>
         </tr>

        </table>
       </td>
      </tr>
     </table>
    </body>
    </html>
   `,
  });

  if (error) {
   console.error('Resend error:', error);
   return NextResponse.json(
    { error: 'Failed to send email' },
    { status: 500 }
   );
  }

  console.log('Email sent successfully:', data);

  return NextResponse.json(
   { success: true, message: 'Message sent successfully!' },
   { status: 200 }
  );
 } catch (error) {
  console.error('Contact form error:', error);
  return NextResponse.json(
   { error: 'Failed to send message' },
   { status: 500 }
  );
 }
}
