import { sendStatusEmail } from "@/utils/emailService";
// Note: This API route is kept for backwards compatibility or direct API calls
// The main email sending logic is now in utils/emailService.js

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
          error:
            "Missing required fields: userId, email, and status are required",
        }),
        { status: 400 },
      );
    }

    // Validate status - can't send an email to any other statuses
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

    // Use the shared email utility
    const result = await sendStatusEmail({ email, firstName, status });

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: result.error,
        }),
        { status: 500 },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: result.message,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in sendEmail API:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { status: 500 },
    );
  }
}
