import { db } from "@/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { sendStatusEmail } from "@/utils/emailService";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userIds, status } = body;

    // Validate required fields
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "userIds must be a non-empty array",
        }),
        { status: 400 },
      );
    }

    // Validate status
    const validStatuses = ["accepted", "rejected", "waitlisted"];
    if (!validStatuses.includes(status)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        }),
        { status: 400 },
      );
    }

    const results = {
      successful: [],
      failed: [],
      emailsFailed: [],
    };

    // Process each user
    for (const userId of userIds) {
      try {
        // 1. Get user data from Firebase
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          results.failed.push({
            userId,
            error: "User not found",
          });
          continue;
        }

        const userData = userSnap.data();
        const { firstName, email } = userData;

        // 2. Update status in Firebase FIRST
        await updateDoc(userRef, {
          status: status,
          statusUpdatedAt: new Date().toISOString(),
        });

        // 3. Send email based on status using direct utility function
        try {
          const emailResult = await sendStatusEmail({
            email,
            firstName,
            status,
          });

          if (!emailResult.success) {
            // Email failed, but status was already updated
            // Log this for retry later
            await updateDoc(userRef, {
              emailSent: false,
              emailError: emailResult.error || "Unknown error",
              emailRetries: 0,
            });

            results.emailsFailed.push({
              userId,
              email,
              error: emailResult.error,
            });
          } else {
            // Email sent successfully
            await updateDoc(userRef, {
              emailSent: true,
              emailSentAt: new Date().toISOString(),
            });
          }

          results.successful.push({
            userId,
            email,
            status,
            emailSent: emailResult.success,
          });
        } catch (emailError) {
          // Email sending failed, but status was already updated
          console.error(`Failed to send email to ${email}:`, emailError);

          await updateDoc(userRef, {
            emailSent: false,
            emailError: emailError.message,
            emailRetries: 0,
          });

          results.emailsFailed.push({
            userId,
            email,
            error: emailError.message,
          });

          results.successful.push({
            userId,
            email,
            status,
            emailSent: false,
          });
        }
      } catch (error) {
        console.error(`Failed to process user ${userId}:`, error);
        results.failed.push({
          userId,
          error: error.message,
        });
      }
    }

    // Return summary
    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${userIds.length} users`,
        results: {
          total: userIds.length,
          successful: results.successful.length,
          failed: results.failed.length,
          emailsFailed: results.emailsFailed.length,
        },
        details: results,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating user statuses:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { status: 500 },
    );
  }
}
