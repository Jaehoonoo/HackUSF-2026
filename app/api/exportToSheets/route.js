import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { exportUsersToSheet } from "@/utils/googleSheets";

// POST /api/exportToSheets
// Admin endpoint to export all applied users to the designated Google Sheet.
export async function POST(req) {
  try {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);

    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const result = await exportUsersToSheet(users);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({
        message: `Exported ${result.count} applied users to Google Sheets.`,
        count: result.count,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Export error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
