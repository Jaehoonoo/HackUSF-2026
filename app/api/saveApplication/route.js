import {doc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase";

export async function POST(req) {
    try {
        const data = await req.json();

        // Validate required fields
        const requiredFields = [
          'userId', 
          'firstName', 
          'lastName', 
          'email', 
          'phone', 
          'age', 
          'country', 
          'gender', 
          'ethnicity', 
          'school', 
          'major', 
          'levelOfStudy', 
          'shirtSize', 
          'disclaimer', 
          'codeOfConduct', 
          'privacyPolicy'
        ];
        
        let missingFields = []
        for (const field of requiredFields) {
          if (!data[field]) missingFields.push(field);
        }

        if (missingFields.length) {
          console.error("Missing required fields:", missingFields);
          return new Response(JSON.stringify({
            error: `Missing required fields: ${missingFields}`,
            missingFields: missingFields
          }), {status: 400});
        }


        const userRef = doc(db, 'users', data.userId)

        const newUserObject = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            gender: data.gender,
            ethnicity: data.ethnicity,
            school: data.school,
            major: data.major,
            levelOfStudy: data.levelOfStudy,
            shirtSize: data.shirtSize,
            disclaimer: data.disclaimer,
            codeOfConduct: data.codeOfConduct,
            privacyPolicy: data.privacyPolicy,
            otherSchool: data.otherSchool || '',
            firstHackathon: data.firstHackathon || false,
            dietaryRestrictions: data.dietaryRestrictions || [],
            otherAccommodations: data.otherAccommodations || '',
            fileName: data.fileName || '',
            notifications: data.notifications || false
        };

        // setDoc creates doc if doesnt exist, and updates doc if exists
        await setDoc(userRef, newUserObject);

        return new Response(JSON.stringify({
            message: 'User status created/updated successfully',
            data: {userId: data.userId}
        }), {status: 200});

    } catch (error) {
        console.error('Detailed error creating/updating user status:', error);
        return new Response(JSON.stringify({
            error: 'Error updating user status',
            details: error.message
        }), {status: 500})
    }
}