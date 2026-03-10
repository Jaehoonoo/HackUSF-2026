import { auth } from "@clerk/nextjs/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { createHash } from "crypto";

// Application review period: March 2 - March 27, 2026 EST
const REVIEW_START_DATE = new Date("2026-03-02T00:00:00-05:00");
const REVIEW_END_DATE = new Date("2026-03-27T23:59:59-05:00");

export async function GET(req) {
  try {
    // Gets userId from frontend request body
    const userId = new URL(
      req.url,
      `http://${req.headers.get("host")}`,
    ).searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Fetch user document from Firestore
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return new Response(
        JSON.stringify({ error: "User document not found" }),
        { status: 404 },
      );
    }

    const userData = docSnap.data();
    const currentDate = new Date();

    // Determine application status
    // Possible status values: "submitted", "inReview", "accepted", "rejected", "waitlisted"
    let applicationStatus;
    const firestoreStatus = userData.status;

    if (!firestoreStatus || firestoreStatus === "pending") {
      // Check if we're in the review period
      if (currentDate >= REVIEW_START_DATE && currentDate <= REVIEW_END_DATE) {
        applicationStatus = "in_review";
      } else if (currentDate > REVIEW_END_DATE) {
        // After review period ends, the user is auto-waitlisted if no decision was made
        applicationStatus = "waitlisted";
      } else {
        // Before review period starts
        applicationStatus = "submitted";
      }
    } else {
      // Default case for any other status (accepted, rejected, waitlisted)
      applicationStatus = firestoreStatus;
    }

    // Only return RSVP status if user is accepted
    // rsvp is a boolean value (true/false) or null if not accepted
    const rsvpStatus =
      firestoreStatus === "accepted" && userData.rsvp !== undefined
        ? userData.rsvp
        : null;

    return new Response(
      JSON.stringify({
        status: applicationStatus,
        rsvp: rsvpStatus,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error in getStatus:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
      { status: 500 },
    );
  }
}
