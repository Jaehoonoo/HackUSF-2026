import { adminDb } from "@/firebaseadmin";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, currentMealGroup, currentMeal } = body;
    const validMeals = ["breakfast", "lunch1", "lunch2", "dinner"];

    if (!userId || typeof userId !== "string" ||
      !currentMealGroup || typeof currentMealGroup !== "string" ||
      !currentMeal || typeof currentMeal !== "string") {
      console.error("Invalid request body type or length");
      return new Response(JSON.stringify({
        success: false,
        error: "Bad request: Invalid or missing fields"
      }), { status: 400 });
    }

    if (!validMeals.includes(currentMeal)) {
      console.error("Invalid meal type");
      return new Response(JSON.stringify({
        success: false,
        error: "Bad request: Invalid or missing fields"
      }), { status: 400 });
    }

    const docRef = adminDb.collection("users").doc(userId);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return new Response(JSON.stringify({
        success: false,
        message: "User not found"
      }), { status: 200 });
    }

    const userData = docSnapshot.data();
    const userLunchGroup = userData.lunchGroup;

    if (userLunchGroup !== currentLunchGroup) {
      return new Response(JSON.stringify({
        success: false,
        message: `Not ${userData.firstName} ${userData.lastName}'s lunch group`
      }), { status: 200 });
    }

    const userScannedMeals = userData.scannedMeals || {};

    if (userScannedMeals[currentMeal]) {
      return new Response(JSON.stringify({
        success: false,
        message: `${userData.firstName} ${userData.lastName} already scanned this meal`
      }), { status: 200 });
    }

    // Update just the specific meal
    await docRef.update({
      [`scannedMeals.${currentMeal}`]: true
    });

    return new Response(JSON.stringify({
      success: true,
      message: `Successfully checked in ${userData.firstName} ${userData.lastName} for ${currentMeal}`
    }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
