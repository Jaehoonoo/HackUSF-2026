import { adminDb } from "@/firebaseadmin";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId || typeof userId !== "string") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing or invalid userId",
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

    await docRef.update({ shirtReceived: true });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Shirt marked as received",
        shirtReceived: true,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("shirtReceived POST:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Internal Server Error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
