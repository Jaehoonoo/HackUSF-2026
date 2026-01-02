import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "@/firebase";

export async function POST(req){
    try{
        const data = await req.json();
        const userDocRef = doc(db, "users", data.userId);
        const userSnap = await getDoc(userDocRef);

        if(userSnap.exists()){
            return new Response(JSON.stringify({success: true, message: "Profile already exists"}),{status: 200})
        }
        else{
            await setDoc(userDocRef, {

                age: "",
                checkedIn: false,
                codeOfConduct: true,
                country: "",
                dietaryRestrictions: [],
                disclaimer: false,
                email: "",
                ethnicity: "",
                fileName: "",
                firstHackathon: false,
                firstName: "",
                gender: "",
                lastName: "",
                levelOfStudy: "",
                major: "",
                meal: "",
                notifications: false,
                otherAccomodations: "",
                otherSchool: "",
                phone: "",
                privacyPolicy: true,
                resumeURL: "",
                rsvp: false,
                school : "",
                shirtSize: "",
                status: "",
            })
        }

        return new Response(JSON.stringify({success: true, message : "Profile created succesfully"}), {status:200})

    }
    catch(error){
        console.error(error);
        return new Response(JSON.stringify({success: false, error: error.message}) , {status : 500})

    }
}
