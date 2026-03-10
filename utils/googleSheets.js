import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = "Applicants"; // Name of the tab in your Google Sheet — rename this if needed

const HEADERS = ["First Name", "Last Name", "Email"];

async function getSheets() {
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  const privateKey = rawKey?.replace(/\\n/g, "\n")?.replace(/\r/g, "");

  if (!clientEmail || !privateKey) {
    throw new Error(
      `Missing credentials — email: ${!!clientEmail}, key: ${!!privateKey}`,
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
  return [user.firstName || "", user.lastName || "", user.email || ""];
}

/**
 * Ensures the header row exists. If the sheet is empty, writes headers.
 */
async function ensureHeaders(sheets) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A1:A1`,
  });

  const firstCell = res.data.values?.[0]?.[0];
  if (!firstCell || firstCell !== "First Name") {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [HEADERS] },
    });
  }
}

/**
 * Appends a single user row to the sheet.
 * Called from saveApplication after a new application is saved.
 */
export async function appendUserToSheet(user) {
  try {
    const sheets = await getSheets();

    await ensureHeaders(sheets);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      insertDataOption: "OVERWRITE",
      requestBody: { values: [userToRow(user)] },
    });

    return { success: true };
  } catch (error) {
    console.error("Google Sheets append error:", error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Overwrites the entire sheet with all current users from Firestore.
 * Called from the /api/syncToSheets admin endpoint.
 */
export async function syncAllUsersToSheet(users) {
  try {
    const sheets = await getSheets();

    // Clear existing data first to prevent duplicates
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SHEET_ID,
      range: SHEET_NAME,
    });

    const rows = [HEADERS, ...users.map(userToRow)];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: rows },
    });

    return { success: true, count: users.length };
  } catch (error) {
    console.error("Google Sheets sync error:", error.message);
    return { success: false, error: error.message };
  }
}
