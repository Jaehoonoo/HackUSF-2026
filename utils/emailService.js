import nodemailer from "nodemailer";

// Create Brevo SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

// Email templates based on status
const emailTemplates = {
  accepted: (firstName) => ({
    subject: "Congratulations! Welcome to HackUSF 2026",
    text: `Congratulations! You've been accepted to HackUSF 2026! We're thrilled to welcome you to our Hackathon. Get ready for an exciting couple of days filled with creativity, technology, and fun!`,
    html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light only">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #fcf1da 0%, #ffffff 100%);
            padding: 24px;
        }
        .email-wrapper { max-width: 600px; margin: 0 auto; }
        .email-container { 
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(24, 46, 78, 0.15);
        }
        .header { 
            background: linear-gradient(135deg, #a63a34 0%, #6e3629 100%);
            padding: 48px 40px;
            text-align: center;
        }
        .header h1 { 
            color: #ffffff;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -0.5px;
            margin-bottom: 8px;
        }
        .header p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
        }
        .content { padding: 48px 40px; background: #ffffff; }
        .greeting { 
            font-size: 24px;
            font-weight: 600;
            color: #6e3629 !important;
            margin-bottom: 16px;
        }
        .message { 
            font-size: 16px;
            color: #6e3629 !important;
            margin-bottom: 32px;
            line-height: 1.7;
        }
        .alert-box {
            background: linear-gradient(135deg, #ffd37c 0%, #fcb727 100%);
            border-radius: 12px;
            padding: 20px 24px;
            margin-bottom: 32px;
            border: 2px solid #c5944c;
        }
        .info-box p {
            color: #6e3629 !important;
            font-size: 15px;
            font-weight: 600;
            margin: 0;
        }
        .steps-container { margin: 32px 0; }
        .step {
            background: #fcf1da;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 16px;
            border-left: 4px solid #a63a34;
        }
        .step-number {
            display: inline-block;
            background: linear-gradient(135deg, #a63a34 0%, #6e3629 100%);
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            text-align: center;
            line-height: 28px;
            font-weight: 700;
            font-size: 14px;
            margin-right: 12px;
        }
        .step-title {
            font-size: 18px;
            font-weight: 600;
            color: #6e3629 !important;
            margin-bottom: 8px;
        }
        .step-desc {
            font-size: 15px;
            color: #6e3629 !important;
            margin-bottom: 16px;
        }
        .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #a63a34 0%, #6e3629 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 15px;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 12px rgba(166, 58, 52, 0.4);
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(166, 58, 52, 0.6);
        }
        .button-discord {
            background: linear-gradient(135deg, #a63a34 0%, #6e3629 100%);
            box-shadow: 0 4px 12px rgba(166, 58, 52, 0.4);
        }
        .button-discord:hover {
            box-shadow: 0 6px 20px rgba(166, 58, 52, 0.6);
        }
        .footer {
            background: linear-gradient(135deg, #fcf1da 0%, #ffffff 100%);
            padding: 32px 40px;
            text-align: center;
            border-top: 2px solid #c5944c;
        }
        .footer p {
            color: #6e3629 !important;
            font-size: 14px;
            margin-bottom: 8px;
        }
        .footer a {
            color: #a63a34 !important;
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <div class="header">
                <h1>HackUSF 2026</h1>
                <p>You're officially in!</p>
            </div>
            
            <div class="content">
                <div class="greeting">Hey ${firstName || "there"}! 👋</div>
                <p class="message">
                    We're absolutely thrilled to welcome you to HackUSF 2026! Your application stood out, 
                    and we can't wait to see what you'll create. Get ready for an incredible weekend of 
                    innovation, collaboration, and fun.
                </p>
                
                <div class="alert-box">
                    <p>🎫 Your QR code for check-in and meals is ready in your profile!</p>
                </div>
                
                <div class="steps-container">
                    <div class="step">
                        <div class="step-title">
                            <span class="step-number">1</span>
                            Confirm Your Attendance
                        </div>
                        <p class="step-desc">
                            RSVP now to secure your spot. Log into your HackUSF profile and confirm you're coming!
                        </p>
                        <a href="https://hackusf.com/profile" class="button">Visit Your Profile</a>
                    </div>
                    
                    <div class="step">
                        <div class="step-title">
                            <span class="step-number">2</span>
                            Join the Community
                        </div>
                        <p class="step-desc">
                            Connect with fellow hackers, get real-time updates, and find your team on Discord.
                        </p>
                        <a href="https://discord.gg/dWTWYPPdN6" class="button button-discord">Join Discord</a>
                    </div>
                    
                    <div class="step">
                        <div class="step-title">
                            <span class="step-number">3</span>
                            Spread the Word
                        </div>
                        <p class="step-desc">
                            Share your excitement! Let your friends know you're heading to HackUSF 2026.
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p>Questions? Email us at <a href="mailto:gdscatusf@gmail.com">gdscatusf@gmail.com</a></p>
                <p style="font-weight: 600; color: #1a1a1a; margin-top: 12px;">See you soon! 💙</p>
                <p style="color: #6e3629 !important; font-size: 13px; font-weight: 600;">The GDG Team</p>
            </div>
        </div>
    </div>
</body>
</html>`,
  }),

  rejected: (firstName) => ({
    subject: "HackUSF 2026 Application Update",
    text: `Thank you for applying to HackUSF 2026! We were impressed by your application but unfortunately cannot offer you a spot at this time. We appreciate your time and would encourage you to apply again next year.`,
    html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light only">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #cfc6b7 0%, #fcf1da 100%);
            padding: 40px 20px;
        }
        .email-wrapper { max-width: 600px; margin: 0 auto; }
        .email-container { 
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(110, 54, 41, 0.1);
        }
        .header { 
            background: linear-gradient(135deg, #a63a34 0%, #6e3629 100%);
            padding: 48px 40px;
            text-align: center;
        }
        .header h1 { 
            color: #ffffff;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -0.5px;
        }
        .content { padding: 48px 40px; background: #ffffff; }
        .greeting { 
            font-size: 24px;
            font-weight: 600;
            color: #6e3629 !important;
            margin-bottom: 16px;
        }
        .message { 
            font-size: 16px;
            color: #6e3629 !important;
            margin-bottom: 24px;
            line-height: 1.7;
        }
        .highlight-box {
            background: linear-gradient(135deg, #fcf1da 0%, #ffffff 100%);
            border-left: 4px solid #b04701;
            border-radius: 8px;
            padding: 24px;
            margin: 32px 0;
        }
        .highlight-box p {
            color: #6e3629 !important;
            font-size: 15px;
            margin-bottom: 12px;
        }
        .highlight-box p:last-child {
            margin-bottom: 0;
        }
        .footer {
            background: linear-gradient(135deg, #fcf1da 0%, #ffffff 100%);
            padding: 32px 40px;
            text-align: center;
            border-top: 2px solid #cfc6b7;
        }
        .footer p {
            color: #6e3629 !important;
            font-size: 14px;
            margin-bottom: 8px;
        }
        .footer a {
            color: #a63a34 !important;
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <div class="header">
                <h1>HackUSF 2026</h1>
            </div>
            
            <div class="content">
                <div class="greeting">Hi ${firstName || "there"},</div>
                <p class="message">
                    Thank you for taking the time to apply to HackUSF 2026. We received an overwhelming 
                    number of exceptional applications this year, making our selection process incredibly 
                    competitive.
                </p>
                <p class="message">
                    After careful review, we're unable to offer you a spot at this year's event. This 
                    decision was difficult, as we saw great potential in your application.
                </p>
                
                <div class="highlight-box">
                    <p style="font-weight: 600;">We'd love to see you apply again next year!</p>
                    <p>
                        Keep building, learning, and growing your skills. The tech community is better with 
                        passionate people like you in it.
                    </p>
                </div>
                
                <p class="message">
                    We wish you all the best in your future endeavors and hope to see you at a future event.
                </p>
            </div>
            
            <div class="footer">
                <p>Questions? Email us at <a href="mailto:gdscatusf@gmail.com">gdscatusf@gmail.com</a></p>
                <p style="font-weight: 600; color: #1a1a1a; margin-top: 12px;">Best wishes,</p>
                <p style="color: #6e3629 !important; font-size: 13px; font-weight: 600;">The GDG Team</p>
            </div>
        </div>
    </div>
</body>
</html>`,
  }),

  waitlisted: (firstName) => ({
    subject: "You're on the HackUSF 2026 Waitlist",
    text: `Thank you for applying to HackUSF 2026! You've been placed on our waitlist. We'll notify you if a spot becomes available.`,
    html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light only">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            background: linear-gradient(135deg, #ffaf78 0%, #f06b06 100%);
            padding: 40px 20px;
        }
        .email-wrapper { max-width: 600px; margin: 0 auto; }
        .email-container { 
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(176, 71, 1, 0.2);
        }
        .header { 
            background: linear-gradient(135deg, #f06b06 0%, #b04701 100%);
            padding: 48px 40px;
            text-align: center;
        }
        .header h1 { 
            color: #ffffff;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -0.5px;
            margin-bottom: 8px;
        }
        .header p {
            color: rgba(255, 255, 255, 0.95);
            font-size: 16px;
        }
        .content { padding: 48px 40px; background: #ffffff; }
        .greeting { 
            font-size: 24px;
            font-weight: 600;
            color: #6e3629 !important;
            margin-bottom: 16px;
        }
        .message { 
            font-size: 16px;
            color: #6e3629 !important;
            margin-bottom: 24px;
            line-height: 1.7;
        }
        .status-box {
            background: linear-gradient(135deg, #fcb727 0%, #f06b06 100%);
            border-radius: 12px;
            padding: 24px;
            margin: 32px 0;
            border: 2px solid #b04701;
        }
        .status-box .title {
            font-size: 18px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 12px;
        }
        .status-box p {
            color: #ffffff;
            font-size: 15px;
            margin: 0;
        }
        .action-box {
            background: linear-gradient(135deg, #fcf1da 0%, #ffffff 100%);
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            text-align: center;
            border: 2px solid #c5944c;
        }
        .action-box p {
            color: #6e3629 !important;
            font-size: 15px;
            margin-bottom: 16px;
            font-weight: 500;
        }
        .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #a63a34 0%, #6e3629 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 15px;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 12px rgba(166, 58, 52, 0.4);
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(166, 58, 52, 0.6);
        }
        .footer {
            background: linear-gradient(135deg, #fcf1da 0%, #ffffff 100%);
            padding: 32px 40px;
            text-align: center;
            border-top: 2px solid #f06b06;
        }
        .footer p {
            color: #6e3629 !important;
            font-size: 14px;
            margin-bottom: 8px;
        }
        .footer a {
            color: #f06b06 !important;
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <div class="header">
                <h1>HackUSF 2026</h1>
                <p>You're on the waitlist</p>
            </div>
            
            <div class="content">
                <div class="greeting">Hi ${firstName || "there"}! 👋</div>
                <p class="message">
                    Thank you for your interest in HackUSF 2026! We had an incredible response this year 
                    with hundreds of talented applicants.
                </p>
                
                <div class="status-box">
                    <div class="title">🎯 You've been placed on our waitlist</div>
                    <p>
                        We'll notify you immediately via email if a spot opens up. Keep an eye on your inbox 
                        and stay ready to join us!
                    </p>
                </div>
                
                <p class="message">
                    While you wait, we encourage you to join our Discord community to stay connected with 
                    fellow hackers and get the latest updates about HackUSF.
                </p>
                
                <div class="action-box">
                    <p>Join our community and stay in the loop</p>
                    <a href="https://discord.gg/dWTWYPPdN6" class="button">Join Discord Server</a>
                </div>
                
                <p class="message" style="margin-bottom: 0;">
                    Thank you for your patience and understanding. We hope to see you at HackUSF soon!
                </p>
            </div>
            
            <div class="footer">
                <p>Questions? Email us at <a href="mailto:gdscatusf@gmail.com">gdscatusf@gmail.com</a></p>
                <p style="font-weight: 600; color: #1a1a1a; margin-top: 12px;">Fingers crossed! 🤞</p>
                <p style="color: #6e3629 !important; font-size: 13px; font-weight: 600;">The GDG Team</p>
            </div>
        </div>
    </div>
</body>
</html>`,
  }),
};

/**
 * Send status update email to a user
 * @param {Object} params - Email parameters
 * @param {string} params.email - Recipient email address
 * @param {string} params.firstName - Recipient first name
 * @param {string} params.status - Status type (accepted, rejected, waitlisted)
 * @returns {Promise<Object>} Result object with success status
 */
export async function sendStatusEmail({ email, firstName, status }) {
  try {
    // Validate required fields
    if (!email || !status) {
      throw new Error("Missing required fields: email and status are required");
    }

    // Validate status
    const validStatuses = ["accepted", "rejected", "waitlisted"];
    if (!validStatuses.includes(status)) {
      throw new Error(
        `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      );
    }

    // Get email template
    const emailTemplate = emailTemplates[status](firstName);

    // Send email via Brevo SMTP
    const mailOptions = {
      from: {
        name: "HackUSF",
        address: process.env.BREVO_SENDER_EMAIL,
      },
      to: email,
      subject: emailTemplate.subject,
      text: emailTemplate.text,
      html: emailTemplate.html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${email} with status: ${status}`);

    return {
      success: true,
      message: `${status.charAt(0).toUpperCase() + status.slice(1)} email sent successfully`,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
