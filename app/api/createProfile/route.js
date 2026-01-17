import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function POST(req) {
  try {

    // Get the JSON data from the frontend (should include userId and possibly other fields)
    const data = await req.json();
    // Create reference to the specific user documetn in Firestore using the userId we got from the request 
    const userDocRef = doc(db, "users", data.userId);
    // Fetch user actual information from Firestore, this will allow us to check if the user already exists
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {

      // If user already exists, return a early response with success message
      return new Response(JSON.stringify({ success: true, message: "Profile already exists" }), { status: 200 })
    }
    else {

      // If user doesnt exist we create a new document with default fields
      // setDoc writes the document to Firestore
      await setDoc(userDocRef, {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        phone: "",
        school: "",
        otherSchool: "",
        major: "",
        levelOfStudy: "",
        gradYear: "",
        country: "",
        gender: "",
        shirtSize: "",
        race: "",
        numHackathons: "",
        socials: {},
        codeOfConduct: false,
        privacyPolicy: false,
        dietaryRestrictions: [],
        otherAccommodations: "",
        newsletter: false,
        eighteen: false,
        resumeName: ""
      })
    }
    // After crating the profile sends a success response to frontend
    return new Response(JSON.stringify({ success: true, message: "Profile created succesfully" }), { status: 200 })

  }
  catch (error) {
    // Log error to the backend console
    console.error(error);
    // Return error response to the frotend with error message
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 })

  }
}
