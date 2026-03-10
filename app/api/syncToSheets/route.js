import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { syncAllUsersToSheet } from "@/utils/googleSheets";

// POST /api/syncToSheets
// Admin-only endpoint to overwrite the Google Sheet with all current Firestore users.
export async function POST(req) {
  try {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);

    const users = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((u) => u.firstName && u.lastName && u.email && u.status);

    const result = await syncAllUsersToSheet(users);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({
        message: `Synced ${result.count} users to Google Sheets.`,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Sync error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
