import { NextResponse } from "next/server";
import { adminDb } from "../../../firebaseadmin";
import { FieldValue } from "firebase-admin/firestore";

const VALID_EVENT_TYPES = ["workshop", "event", "expo"];

export async function POST(request) {
  try {
    const db = adminDb;
    const body = await request.json();
    const { userId, eventType, eventId } = body || {};

    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid or missing userId" },
        { status: 400 },
      );
    }

    if (!eventType || typeof eventType !== "string" || !VALID_EVENT_TYPES.includes(eventType)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing eventType" },
        { status: 400 },
      );
    }

    if (eventType !== "expo" && (!eventId || typeof eventId !== "string")) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing eventId" },
        { status: 400 },
      );
    }

    const userRef = db.collection("users").doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const userData = userSnapshot.data() || {};


    // Default fields on first scan
    if (!userData.attended) {
      const firstScanPayload = {
        attended: {
          workshops: [],
          events: [],
          companyExpo: false,
        },
      };

      if (eventType === "workshop") {
        firstScanPayload.attended.workshops = [eventId];
      }

      if (eventType === "event") {
        firstScanPayload.attended.events = [eventId];
      }

      if (eventType === "expo") {
        firstScanPayload.attended.companyExpo = true;
      }

      await userRef.set(firstScanPayload, { merge: true });

      return NextResponse.json({
        success: true,
        message: "Check-in recorded",
      });
    }

    if (eventType === "workshop") {
      await userRef.set(
        {
          attended: {
            workshops: FieldValue.arrayUnion(eventId),
          },
        },
        { merge: true },
      );
    }

    if (eventType === "event") {
      await userRef.set(
        {
          attended: {
            events: FieldValue.arrayUnion(eventId),
          },
        },
        { merge: true },
      );
    }

    if (eventType === "expo") {
      await userRef.set(
        {
          attended: {
            companyExpo: true,
          },
        },
        { merge: true },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Check-in recorded",
    });
  } catch (error) {
    console.error("eventCheckIn error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error",
      },
      { status: 500 },
    );
  }
}
