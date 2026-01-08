import { adminDb } from "@/firebaseadmin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req) {
  try {
    let assignedGroup = null;
    const body = await req.json()
    const { userId } = body;
    const userRef = adminDb.collection("users").doc(userId);
    const mealGroupSizesRef = adminDb.collection("userCounts").doc("mealGroupCounts");
    const GROUPS = ["Primordials", "Olympians", "Titans", "Demigods", "Daemones"]

    await adminDb.runTransaction(async (transaction) => {
      const userSnap = await transaction.get(userRef);
      if (!userSnap.exists) {
        throw new Error("User does not exist");
      }

      const userData = userSnap.data();
      if (userData.mealGroup) {
        assignedGroup = userData.mealGroup; // already assigned
        return;
      }

      const countsSnap = await transaction.get(mealGroupSizesRef);
      const counts = countsSnap.exists ? countsSnap.data() : {};

      // Find smallest group by name
      let smallestName = GROUPS[0];
      let smallestSize = counts[smallestName] ?? 0;

      for (const name of GROUPS) {
        const size = counts[name] ?? 0;
        if (size < smallestSize) {
          smallestSize = size;
          smallestName = name;
        }
      }
      assignedGroup = smallestName;

      // Update the user's meal group
      transaction.update(userRef, { mealGroup: assignedGroup });

      // Update the count for the assigned group, creating the doc if needed.
      transaction.set(
        mealGroupSizesRef,
        { [assignedGroup]: FieldValue.increment(1) },
        { merge: true }
      );
    });

    return new Response(JSON.stringify({
      mealGroup: assignedGroup,
      success: true,
      message: "Successfully updated meal groups"
    }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
