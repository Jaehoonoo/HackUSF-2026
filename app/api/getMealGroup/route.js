import { adminDb } from "@/firebaseadmin";

export async function GET(req) {
  try {
    const userId = new URL(req.url, `https://${req.headers.host}`).searchParams.get('userId');

    if (!userId || typeof userId !== "string") {
      return new Response(JSON.stringify({ success: false, error: "Invalid or missing userId" }), { status: 200 });
    }

    const docRef = adminDb.collection("users").doc(userId);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      console.error("User does not exist");
      return new Response(JSON.stringify({ success: false, error: "User does not exist" }), { status: 200 });
    }

    const userData = docSnapshot.data();
    const { mealGroup } = userData;

    if (!mealGroup) {
      console.error("User does not have meal group");
      return new Response(JSON.stringify({ success: false, error: "User does not have meal group" }), { status: 200 });
    }

    return new Response(JSON.stringify({ success: true, data: { mealGroup: mealGroup } }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
