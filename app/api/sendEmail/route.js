import nodemailer from 'nodemailer';
import { db } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
// Email goes from: server → Nodemailer → Brevo SMTP → Recipient’s inbox

// Create Brevo SMTP transporter
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    // Secured using TLS
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_SMTP_USER, // Brevo login email
        pass: process.env.BREVO_SMTP_KEY,  // Brevo SMTP key
    },
});

// Email templates based on status
const emailTemplates = {
    accepted: (firstName) => ({
        subject: 'Congratulations! - HackUSF Acceptance',
        text: `Congratulations! You've been accepted to HackUSF 2026! We're thrilled to welcome you to our Hackathon. Get ready for an exciting couple of days filled with creativity, technology, and fun!`,
        html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #292927; padding: 30px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; }
        .content { padding: 30px; }
        .content h2 { color: #333; text-align: center; }
        .content p { font-size: 16px; line-height: 1.6; color: #555; text-align: center; }
        .important { background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 8px; }
        .important strong { color: #856404; }
        .steps { text-align: left; margin: 20px 0; }
        .steps h3 { color: #333; }
        .steps p { text-align: left; }
        .button { display: inline-block; padding: 12px 24px; background-color: #4285f4; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0; }
        .button:hover { background-color: #3367d6; }
        .button-discord { background-color: #5865F2; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 HackUSF 2026</h1>
        </div>
        <div class="content">
            <h2>Congratulations, ${firstName || 'Hacker'}!</h2>
            <p>You've been accepted to HackUSF 2026!</p>
            <p>We're thrilled to welcome you to our Hackathon. Get ready for an exciting couple of days filled with creativity, technology, and fun!</p>
            
            <div class="important">
                <strong>IMPORTANT!</strong><br>
                Your group QR code is located in your profile and will be used for Check-In and to get food.
            </div>
            
            <div class="steps">
                <h3>Next Steps:</h3>
                
                <p><strong>1. Secure Your Spot</strong><br>
                Don't forget to RSVP! Simply log into your HackUSF account and confirm your spot. If you do not reserve your spot, it may be given to another hacker.</p>
                <center><a href="https://hackusf.com/profile" class="button" style="color: #ffffff !important;">HackUSF Profile</a></center>
                
                <p><strong>2. Join Our Community on Discord</strong><br>
                Dive into the heart of HackUSF! Join our Discord to meet other talented hackers, interact with our mentors, and stay updated with real-time announcements.</p>
                <center><a href="https://discord.gg/QrGfXJehBy" class="button button-discord" style="color: #ffffff !important;">Join Discord</a></center>
                
                <p><strong>3. Share Your Excitement</strong><br>
                Let the world know you're heading to HackUSF 2026! Share your acceptance on your favorite social media platforms.</p>
            </div>
        </div>
        <div class="footer">
            <p>Have questions? Reach out to us at gdsc@hackusf.com</p>
            <p><strong>With 🖤, GDG Team</strong></p>
        </div>
    </div>
</body>
</html>`,
    }),

    rejected: (firstName) => ({
        subject: 'HackUSF 2026 Application Status Update',
        text: `Thank you for applying to HackUSF 2026! We were impressed by your application but unfortunately cannot offer you a spot at this time. We appreciate your time and would encourage you to apply again next year.`,
        html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #292927; padding: 30px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; }
        .content { padding: 30px; }
        .content h2 { color: #333; text-align: center; }
        .content p { font-size: 16px; line-height: 1.6; color: #555; text-align: center; }
        .button { display: inline-block; padding: 12px 24px; background-color: #4285f4; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0; }
        .button-discord { background-color: #5865F2; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>HackUSF 2026</h1>
        </div>
        <div class="content">
            <h2>Hi ${firstName || 'Hacker'},</h2>
            <p>Thank you for applying for HackUSF 2026!</p>
            <p>We were impressed by your application but unfortunately cannot offer you a spot at this time.</p>
            <p>We appreciate your time and would encourage you to apply again next year.</p>
            <p>Good luck and best wishes in your future endeavors.</p>
        </div>
        <div class="footer">
            <p>Best,<br><strong>GDG Team</strong></p>
        </div>
    </div>
</body>
</html>`,
    }),

    waitlisted: (firstName) => ({
        subject: 'HackUSF 2026 - You\'re on the Waitlist!',
        text: `Thank you for applying to HackUSF 2026! You've been placed on our waitlist. We'll notify you if a spot becomes available.`,
        html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background-color: #292927; padding: 30px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; }
        .content { padding: 30px; }
        .content h2 { color: #333; text-align: center; }
        .content p { font-size: 16px; line-height: 1.6; color: #555; text-align: center; }
        .highlight { background-color: #e3f2fd; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #4285f4; }
        .button { display: inline-block; padding: 12px 24px; background-color: #4285f4; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0; }
        .button-discord { background-color: #5865F2; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>HackUSF 2026</h1>
        </div>
        <div class="content">
            <h2>Hi ${firstName || 'Hacker'},</h2>
            <p>Thank you for applying to HackUSF 2026!</p>
            <div class="highlight">
                <p style="margin: 0; text-align: left;"><strong>You've been placed on our waitlist.</strong></p>
                <p style="margin: 10px 0 0 0; text-align: left;">We had an incredible number of applications this year. We'll notify you immediately if a spot becomes available.</p>
            </div>
            <p>In the meantime, feel free to join our Discord community to stay connected!</p>
                <center><a href="https://discord.gg/QrGfXJehBy" class="button button-discord" style="color: #ffffff !important;">Join Discord</a></center>
        </div>
        <div class="footer">
            <p>Best,<br><strong>GDG Team</strong></p>
        </div>
    </div>
</body>
</html>`,
    }),
};

export async function POST(req) {
    try {
        // Get data from JSON body sent by frontend
        const body = await req.json();
        const { userId, firstName, email, status } = body;

        // Validate required fields
        if (!userId || !email || !status) {
            return new Response(
                JSON.stringify({ 
                    success: false, 
                    error: 'Missing required fields: userId, email, and status are required' 
                }), 
                { status: 400 }
            );
        }

        // Validate status - can't send an email to any other statuses
        const validStatuses = ['accepted', 'rejected', 'waitlisted'];
        if (!validStatuses.includes(status)) {
            return new Response(
                JSON.stringify({ 
                    success: false, 
                    error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
                }), 
                { status: 400 }
            );
        }

        // Get email template based on user status
        const emailTemplate = emailTemplates[status](firstName);

        // Send email via Brevo SMTP
        const mailOptions = {
            from: {
                name: 'HackUSF',
                address: process.env.BREVO_SENDER_EMAIL,
            },
            to: email,
            subject: emailTemplate.subject,
            text: emailTemplate.text,
            html: emailTemplate.html,
        };

        await transporter.sendMail(mailOptions);
        //Confirms the email was sent through to the right email for dev debugging
        console.log(`Email sent successfully to ${email} with status: ${status}`);

        return new Response(
            JSON.stringify({
                success: true,
                message: `${status.charAt(0).toUpperCase() + status.slice(1)} email sent and status updated successfully`
            }), 
            { status: 200 }
        );

    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: error.message 
            }), 
            { status: 500 }
        );
    }
}
