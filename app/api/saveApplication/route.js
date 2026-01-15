import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    // Validate required fields
    const requiredFields = [
      'userId',
      'firstName',
      'lastName',
      'age',
      'phone',
      'email',
      'school',
      'major',
      'gradYear',
      'levelOfStudy',
      'country',
      'gender',
      'numHackathons',
      'race',
      'shirtSize',
      'codeOfConduct',
      'privacyPolicy',
      'resumeName'
    ];

    let missingFields = []
    for (const field of requiredFields) {
      if (data[field] == null) missingFields.push(field);
    }

    if (missingFields.length) {
      console.error("Missing required fields:", missingFields);
      return new Response(JSON.stringify({
        error: `Missing required fields: ${missingFields}`,
        missingFields: missingFields
      }), { status: 400 });
    }


    const userRef = doc(db, 'users', data.userId)
    const userSnap = await getDoc(userRef)

    const newUserObject = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      age: data.age,
      phone: data.phone,
      school: data.school,
      major: data.major,
      levelOfStudy: data.levelOfStudy,
      gradYear: data.gradYear,
      country: data.country,
      gender: data.gender,
      shirtSize: data.shirtSize,
      race: data.race,
      numHackathons: data.numHackathons,
      socials: data.socials,
      codeOfConduct: data.codeOfConduct,
      privacyPolicy: data.privacyPolicy,
      firstHackathon: data.numHackathon === 0 || false,
      dietaryRestrictions: data.dietaryRestrictions || [],
      newsletter: data.newsletter || false,
      eighteen: parseInt(data.age) >= 18,
      status: "pending",
      resumeName: data.resumeName
    };

    // updateDoc updates the fields for the user profile
    if (userSnap.exists()) {
      await updateDoc(userRef, newUserObject);
    } else {
      return NextResponse.json({ error: "User does not exist" }, { status: 404 })
    }

    return new Response(JSON.stringify({
      message: 'User application created/updated successfully',
      data: { userId: data.userId }
    }), { status: 200 });

  } catch (error) {
    console.error('Error creating/updating user application:', error);
    return new Response(JSON.stringify({
      error: 'Error updating user status',
      details: error.message
    }), { status: 500 })
  }
}
