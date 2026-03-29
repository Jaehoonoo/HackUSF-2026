import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = "Applicants"; // Name of the tab in your Google Sheet — rename this if needed

const HEADERS = ["First Name", "Last Name", "Email"];

// Export-specific constants
const EXPORT_SHEET_ID = "1ZMSa7r5mg6VV3B0iLBSvEW3v9SCVBMUN3iAtAogyqZs";
const EXPORT_SHEET_NAME = "Sheet1";

// Required columns
const EXPORT_HEADERS = [
  "First Name",
  "Last Name",
  "Age",
  "Email",
  "School",
  "Phone Number",
  "Country",
  "Current Level of Study",
  "Checked In",
];

// Recommended columns (only included if field exists in data)
const RECOMMENDED_FIELDS = [
  { header: "Gender", key: "gender" },
  { header: "Race/Ethnicity", key: "race" },
  { header: "Major/Field of Study", key: "major" },
];

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

/**
 * Helper: checks if a value is meaningfully filled in (not empty/default).
 */
function isFilledIn(value) {
  if (value === undefined || value === null) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  if (typeof value === "boolean") return true; // booleans are always meaningful
  return true;
}

/**
 * Checks if a user has actually applied (has real data filled in).
 * A user must have at minimum: firstName, lastName, email, and a status
 * that indicates they submitted an application.
 */
function hasApplied(user) {
  // Must have a status that indicates they actually submitted
  const validStatuses = [
    "submitted",
    "in_review",
    "accepted",
    "rejected",
    "waitlisted",
  ];
  if (!user.status || !validStatuses.includes(user.status)) return false;

  // Must have basic required fields filled in
  if (!isFilledIn(user.firstName)) return false;
  if (!isFilledIn(user.lastName)) return false;
  if (!isFilledIn(user.email)) return false;

  return true;
}

/**
 * Determines which recommended columns have data across any user.
 * Returns only the recommended fields that at least one user has filled in.
 */
function getActiveRecommendedFields(users) {
  return RECOMMENDED_FIELDS.filter((field) =>
    users.some((user) => isFilledIn(user[field.key])),
  );
}

/**
 * Exports users to the specified Google Sheet with required + recommended fields.
 * Only includes users who have actually applied with real data.
 */
export async function exportUsersToSheet(users) {
  try {
    const sheets = await getSheets();

    // Filter to only users who have actually applied AND are checked in
    const appliedUsers = users.filter(
      (user) =>
        hasApplied(user) && (user.checkedIn === true || user.checkIn === true),
    );

    if (appliedUsers.length === 0) {
      return {
        success: true,
        count: 0,
        message: "No checked-in users to export.",
      };
    }

    // Determine which recommended fields have data
    const activeRecommended = getActiveRecommendedFields(appliedUsers);

    // Build final headers: required + active recommended
    const finalHeaders = [
      ...EXPORT_HEADERS,
      ...activeRecommended.map((f) => f.header),
    ];

    // Build rows
    const rows = appliedUsers.map((user) => {
      const row = [
        user.firstName || "",
        user.lastName || "",
        isFilledIn(user.age) ? String(user.age) : "",
        user.email || "",
        user.school === "Other" && isFilledIn(user.otherSchool)
          ? user.otherSchool
          : user.school || "",
        user.phone || "",
        user.country || "",
        user.levelOfStudy || "",
        user.checkedIn === true || user.checkIn === true ? "Yes" : "No",
      ];

      // Append active recommended fields
      for (const field of activeRecommended) {
        row.push(isFilledIn(user[field.key]) ? String(user[field.key]) : "");
      }

      return row;
    });

    // Clear existing data first
    await sheets.spreadsheets.values.clear({
      spreadsheetId: EXPORT_SHEET_ID,
      range: EXPORT_SHEET_NAME,
    });

    // Write headers + data
    await sheets.spreadsheets.values.update({
      spreadsheetId: EXPORT_SHEET_ID,
      range: `${EXPORT_SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [finalHeaders, ...rows] },
    });

    return { success: true, count: appliedUsers.length };
  } catch (error) {
    console.error("Google Sheets export error:", error.message);
    return { success: false, error: error.message };
  }
}
