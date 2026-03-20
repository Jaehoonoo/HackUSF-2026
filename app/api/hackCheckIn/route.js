import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/firebaseadmin";

const getRoleFromClaims = (sessionClaims) => {
  if (!sessionClaims || typeof sessionClaims !== "object") {
    return undefined;
  }

  return sessionClaims.publicMetadata?.role || sessionClaims.metadata?.role;
};

export async function POST(req) {
  try {
    const { sessionClaims } = await auth();
    const role = getRoleFromClaims(sessionClaims);

    if (role !== "admin") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Unauthorized",
        }),
        { status: 403 },
      );
    }

    const body = await req.json();
    const { userId } = body;

    if (!userId || typeof userId !== "string") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid or missing userId",
        }),
        { status: 400 },
      );
    }

    const docRef = adminDb.collection("users").doc(userId);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 404 },
      );
    }

    const userData = docSnapshot.data() || {};

    if (userData.checkIn === true) {
      const fullName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();

      return new Response(
        JSON.stringify({
          success: true,
          message: fullName
            ? `${fullName} is already checked in`
            : "User is already checked in",
        }),
        { status: 200 },
      );
    }

    await docRef.update({
      checkIn: true,
    });

    const fullName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();

    return new Response(
      JSON.stringify({
        success: true,
        message: fullName
          ? `Successfully checked in ${fullName}`
          : "Successfully checked in user",
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error checking in user:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Internal server error",
      }),
      { status: 500 },
    );
  }
}
