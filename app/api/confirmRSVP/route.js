import {doc, updateDoc, getDoc} from "firebase/firestore";
import {db} from "@/firebase";

export async function POST(req){
    try{

        // Get the JSON data sent from the frontend (contains userId and RSVP status)
        const data = await req.json();
        // Create a referenece to the specific user document in Firestore by using the userId
        const userDocRef = doc(db, "users", data.userId,); 
        // Actual users data fetched from firestore; used to verify existance and access data
        const userSnap = await getDoc(userDocRef);
        
        if(userSnap.exists()){
            // Update only the 'rsvp' field of this user in Firestore
            await updateDoc(userDocRef, {rsvp: data.rsvp}) 

            // Send success response to frontend
            return new Response(JSON.stringify({success:true ,message: "User RSVP updated"}) , {status:200}) 

        }
        else{
            // Send failure response to frontend; the user doesn't exist, so we set status to 404
            return new Response(JSON.stringify({success: false, message: "Non-existent User"}), {status :404})
        }

    }
    catch(error){

        // Log error in backend console
        console.error("Error while updating users RSVP status" , error)

        // Send error response to frontend
        return new Response(JSON.stringify({success: false ,error: error.message}) , {status:500})
    }
}