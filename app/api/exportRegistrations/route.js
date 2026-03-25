import { adminDb } from "@/firebaseadmin";
import { google } from "googleapis";

const SPREADSHEET_ID = "1CAKeHgTyUWbu8UkAslyqkeUfP7LpvKiNX4m9E2qBugo";
const SHEET_NAME = "Sheet1";

const HEADERS = [
  "First Name",
  "Last Name",
  "Email",
  "Phone Number",
  "Age",
  "Country of Residence",
  "School",
  "Current Level of Study",
  "MLH Code of Conduct",
  "MLH Privacy Policy",
  "MLH Communication",
];

async function getSheets() {
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  const privateKey = rawKey?.replace(/\\n/g, "\n")?.replace(/\r/g, "");

  if (!clientEmail || !privateKey) {
    throw new Error(
      `Missing credentials — email: ${!!clientEmail}, key: ${!!privateKey}`
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

function userToRow(user) {
  // For school, use otherSchool if school is "Other"
  const school =
    user.school === "Other" || user.school === "other"
      ? user.otherSchool || user.school
      : user.school || "";

  return [
    user.firstName || "",
    user.lastName || "",
    user.email || "",
    user.phone || "",
    user.age != null ? String(user.age) : "",
    user.country || "",
    school,
    user.levelOfStudy || "",
    user.codeOfConduct ? "Yes" : "No",
    user.privacyPolicy ? "Yes" : "No",
    user.newsletter ? "Yes" : "No",
  ];
}

export async function POST() {
  try {
    // Fetch all users from Firestore using Admin SDK (server-side)
    const usersSnapshot = await adminDb.collection("users").get();

    // Filter to only users who have filled out an application (have a firstName set)
    const users = [];
    usersSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.firstName && data.lastName && data.email) {
        users.push({ id: doc.id, ...data });
      }
    });

    console.log(`Found ${users.length} users with applications`);

    // Build the rows
    const rows = [HEADERS, ...users.map(userToRow)];

    // Get authenticated Sheets client
    const sheets = await getSheets();

    // Clear existing data
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_NAME,
    });

    // Write all data
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: rows },
    });

    return new Response(
      JSON.stringify({
        message: `Exported ${users.length} users to Google Sheets.`,
        spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Export error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
