import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export async function GET(req) {
  try {
    const usersRef = collection(db, "users");

    // Only fetch submitted and in_review users to minimize Firestore reads
    const submittedQuery = query(
      usersRef,
      where("status", "in", ["submitted", "in_review"]),
    );
    const submittedSnapshot = await getDocs(submittedQuery);

    const submittedUsers = submittedSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const data = {
      submittedUsers,
      submittedUsersCount: submittedUsers.length,
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
