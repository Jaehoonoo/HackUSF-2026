import { adminDb } from "@/firebaseadmin";

// This API route retrieves the workshopsNum for a user. If the field doesn't exist, it initializes it to 0
export async function GET(req) {
  try {
    const userId = new URL(
      req.url,
      `http://${req.headers.get("host")}`
    ).searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({
        success: false,
        error: "Unauthorized: Missing userId"
      }), { status: 401 });
    }

    const docRef = adminDb.collection("users").doc(userId);
    const docSnapshot = await docRef.get();
    console.log("Document snapshot:", docSnapshot);

    if (!docSnapshot.exists) {
      return new Response(JSON.stringify({
        success: false,
        error: "User document not found"
      }), { status: 404 });
    }

    const userData = docSnapshot.data();
    let workshopsNum = userData.workshopsNum;
    let checkInVal = userData.checkIn !== undefined ? userData.checkIn : null;

    // If the field doesn't exist, initialize it to 0
    if (workshopsNum === undefined) {
      await docRef.update({
        workshopsNum: 0
      });
      workshopsNum = 0;
    }

    return new Response(JSON.stringify({
      success: true,
      workshopsNum: workshopsNum,
      checkIn: checkInVal
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error("Error fetching workshopsNum:", error);
    return new Response(JSON.stringify({
        success: false, 
        error: "Internal Server Error" 
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
