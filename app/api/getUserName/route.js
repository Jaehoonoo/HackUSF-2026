import { adminDb } from "@/firebaseadmin";

export async function GET(request) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing userId",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const docRef = adminDb.collection("users").doc(userId);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User document not found",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    const userData = docSnapshot.data();
    const data = {
      firstName: userData.firstName ?? "",
      lastName: userData.lastName ?? "",
    };

    return new Response(
      JSON.stringify({
        success: true,
        data,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("getUserName:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
