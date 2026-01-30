import { auth } from "@clerk/nextjs/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export async function GET(req) {
  try {
    // Authenticate the user and get session claims
    //const userId = new URL(req.url, `http://${req.headers.get('host')}`).searchParams.get(const usersRef);

    // if (!userId) {
    //     return new Response(
    //         JSON.stringify({ error: "Unauthorized" }),
    //         { status: 401 }
    //     );
    // }

    // Check if user has admin role
    // if (sessionClaims?.metadata?.role !== 'admin') {
    //     return new Response(
    //         JSON.stringify({ error: "Forbidden - Admin access required" }),
    //         { status: 403 }
    //     );
    // }

    const usersRef = collection(db, "users");

    // Fetch ALL users from the collection
    const allUsersSnapshot = await getDocs(usersRef);

    // Map Firestore documents to plain objects with IDs
    const allUsers = allUsersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Group users by status
    const acceptedUsers = allUsers.filter((u) => u.status === "accepted");
    const rejectedUsers = allUsers.filter((u) => u.status === "rejected");
    const waitlistedUsers = allUsers.filter((u) => u.status === "waitlisted");
    const submittedUsers = allUsers.filter(
      (u) => u.status === "submitted" || u.status === "in_review" || !u.status,
    );

    // Build response data
    const data = {
      allUsers, // All users for admin table
      acceptedUsers,
      rejectedUsers,
      waitlistedUsers,
      submittedUsers, // Users waiting for review

      acceptedUsersCount: acceptedUsers.length,
      rejectedUsersCount: rejectedUsers.length,
      waitlistedUsersCount: waitlistedUsers.length,
      submittedUsersCount: submittedUsers.length,

      totalUsers: allUsers.length,
    };

    return new Response(
      JSON.stringify({
        success: true,
        data,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { status: 500 },
    );
  }
}
