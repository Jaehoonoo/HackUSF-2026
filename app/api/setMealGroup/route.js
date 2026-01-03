import { adminDb } from "@/firebaseadmin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req) {
  try {
    const body = await req.json()
    const { userId } = body;
    const userRef = adminDb.collection("users").doc(userId);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return new Response(JSON.stringify({ success: false, message: "User does not exist" }), { status: 200 });
    }

    const userData = userSnap.data();
    //If user already has a meal group, they will be skipped
    if (userData.mealGroup) {
      return new Response(JSON.stringify({
        success: false,
        message: "User already assigned meal group"
      }), { status: 200 });
    }

    const mealGroupSizesRef = adminDb.collection("userCounts").doc("mealGroupCounts");

    await adminDb.runTransaction(async (transaction) => {
      const mealGroupSizesSnap = await transaction.get(mealGroupSizesRef);
      const mealGroupSizes = mealGroupSizesSnap.exists ? mealGroupSizesSnap.data() : {
        "1": 0,
        "2": 0,
        "3": 0,
        "priority": 0
      };

      // Check for dietary restrictions and assign to priority group if needed
      if (userData.dietaryRestrictions && userData.dietaryRestrictions.length) {
        transaction.update(userRef, { mealGroup: "Priority" });
        transaction.update(mealGroupSizesRef, {
          priority: FieldValue.increment(1)
        });
      } else {
        // Determine the smallest group
        const group1Size = mealGroupSizes["1"] || 0;
        const group2Size = mealGroupSizes["2"] || 0;
        const group3Size = mealGroupSizes["3"] || 0;
        const smallestGroup = [group1Size, group2Size, group3Size].indexOf(Math.min(group1Size, group2Size, group3Size)) + 1;

        // Update the user's meal group
        transaction.update(userRef, { mealGroup: `Group ${smallestGroup.toString()}` });

        // Update the count for the assigned group
        transaction.update(mealGroupSizesRef, {
          [`${smallestGroup}`]: FieldValue.increment(1)
        });
      }
    });

    return new Response(JSON.stringify({
      success: true,
      message: "Successfully updated meal groups"
    }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
