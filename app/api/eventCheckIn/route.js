import { NextResponse } from "next/server";
import { adminDb } from "../../../firebaseadmin";
import { FieldValue } from "firebase-admin/firestore";

const VALID_EVENT_TYPES = ["workshop", "activity", "expo"];

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
    const hadAttended = Boolean(userData?.attended);
    const currentWorkshops = userData?.attended?.workshops || [];
    const workshops = [...currentWorkshops];
    const activities = [...(userData?.attended?.activities || [])];
    let expo = userData?.attended?.companyExpo || false;

    if (eventType === "workshop" && workshops.includes(eventId)) {
      return NextResponse.json({
        success: true,
        message: "Already checked in!",
      });
    }

    if (eventType === "activity" && activities.includes(eventId)) {
      return NextResponse.json({
        success: true,
        message: "Already checked in!",
      });
    }

    if (eventType === "expo" && expo) {
      return NextResponse.json({
        success: true,
        message: "Already checked in!",
      });
    }

    if (eventType === "workshop") {
      workshops.push(eventId);
    }

    if (eventType === "activity") {
      activities.push(eventId);
    }

    if (eventType === "expo") {
      expo = true;
    }

    const calculatedPoints = (workshops.length * 50) + (activities.length * 30) + (expo ? 100 : 0);

    if (!hadAttended) {
      await userRef.set(
        {
          attended: {
            workshops,
            activities,
            companyExpo: expo,
          },
          workshopsNum: eventType === "workshop" ? 1 : 0,
          totalPoints: calculatedPoints,
        },
        { merge: true },
      );

      return NextResponse.json({
        success: true,
        message: "Check-in recorded",
      });
    }

    const updatePayload = {
      totalPoints: calculatedPoints,
    };

    if (eventType === "workshop") {
      const newWorkshopsNum = currentWorkshops.length + 1;
      updatePayload["attended.workshops"] = FieldValue.arrayUnion(eventId);
      updatePayload.workshopsNum = newWorkshopsNum;
    }

    if (eventType === "activity") {
      updatePayload["attended.activities"] = FieldValue.arrayUnion(eventId);
    }

    if (eventType === "expo") {
      updatePayload["attended.companyExpo"] = true;
    }

    await userRef.update(updatePayload);

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

// TODO: Keep camera open between scans
// TODO: Change Events to Activities
// TODO: Add totalPoints field
// TODO: Calc workshopsNums