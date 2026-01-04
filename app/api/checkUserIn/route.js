import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function POST(req) {
    try {
        
        const data = await req.json();
        const { userId } = data;

        // Validate userId
        if (!userId || typeof userId !== "string"){
            return new Response(JSON.stringify({ success: false, message: "Invalid or missing user ID" }), { status: 400 });
        }

        // Create reference to the user document
        const userDocRef = doc(db, "users", userId);

        // Fetch user snapshot to check existence and current data
        const userSnap = await getDoc(userDocRef);

        // If user does not exist, return 404
        if (!userSnap.exists()){
            return new Response(JSON.stringify({ success: false, message: "User does not exist" }), { status: 404 });
        }

        const userData = userSnap.data();

        // Prevent duplicate check-ins
        if (userData.checkedIn){
            return new Response(JSON.stringify({ success: false, message: `${userData.firstName} ${userData.lastName} is already checked in` }), { status: 200 });

        }   

        // Update check-in status and initialize meal scan tracking
        await updateDoc(userDocRef, {
            checkedIn: true,
            scannedMeals: {
                breakfast: false,
                lunch1: false,
                dinner: false,
                lunch2: false,
            },
        });

        // Successful check-in response
        return new Response(JSON.stringify({ success: true, message: `Successfully checked in ${userData.firstName} ${userData.lastName}` }), { status: 200 });

    } catch (error) {
        // Catch errors
        console.error("Check-in error:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
