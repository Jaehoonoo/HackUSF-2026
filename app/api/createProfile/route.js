import { clerkClient } from "@clerk/nextjs/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function POST(req) {
  try {
    const data = await req.json();

    // Fetch the user from Clerk to get Discord OAuth data
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(data.userId);

    // Extract Discord ID from Clerk's external accounts
    const discordAccount = clerkUser.externalAccounts.find(
      (account) => account.provider === "oauth_discord",
    );
    const discordId = discordAccount?.externalId || null;

    const userDocRef = doc(db, "users", data.userId);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      const existingUser = userSnap.data();
      const profileUpdates = {};

      if (discordId && !existingUser.discordId) {
        profileUpdates.discordId = discordId;
      }

      if (Object.keys(profileUpdates).length > 0) {
        await setDoc(userDocRef, profileUpdates, { merge: true });
      }

      return new Response(
        JSON.stringify({ success: true, message: "Profile already exists" }),
        { status: 200 },
      );
    } else {
      await setDoc(userDocRef, {
        discordId: discordId,
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
        resumeName: "",
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Profile created successfully",
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 },
    );
  }
}
