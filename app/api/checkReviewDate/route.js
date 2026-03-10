import { adminDb } from "@/firebaseadmin";

// POST /api/checkReviewDate
// Called from the profile page on load. If today is March 13+ and the user's
// status is "submitted", it gets bumped to "in_review".
export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), {
        status: 400,
      });
    }

    const now = new Date();
    const reviewDate = new Date("2026-03-13T00:00:00-05:00"); // March 13 midnight EST

    if (now < reviewDate) {
      return new Response(
        JSON.stringify({ updated: false, reason: "Not yet review date" }),
        { status: 200 },
      );
    }

    const userRef = adminDb.collection("users").doc(userId);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const currentStatus = userSnap.data().status;

    if (currentStatus !== "submitted") {
      return new Response(
        JSON.stringify({ updated: false, reason: "Status is not submitted" }),
        { status: 200 },
      );
    }

    await userRef.update({ status: "in_review" });

    return new Response(JSON.stringify({ updated: true }), { status: 200 });
  } catch (error) {
    console.error("checkReviewDate error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
