import {db} from "@/firebase"; // Firestore database instance
import {doc, updateDoc} from "firebase/firestore";

import {writeFile, mkdir, unlink} from "fs/promises";
import {createReadStream, existsSync} from "fs";
import path from "path";

import initializeGoogleServiceAccount from "@/googleserviceaccount";

// Initialize Google Drive client
const drive = initializeGoogleServiceAccount();

const FOLDER_ID = process.env.NEXT_PUBLIC_FOLDER_ID

export async function POST(request) {
    try {
        // Use /tmp directory which is writable in Vercel
        const uploadsDir = path.join("/tmp", "uploads");
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, {recursive: true});
        }

        const formData = await request.formData();
        const userId = formData.get("userId");
        const file = formData.get("resume");

        if (!file || !userId) {
            return new Response(
                JSON.stringify({error: "Missing file or userId"}),
                {status: 400}
            );
        }

        if (file.size > 500 * 1024) {
            return new Response(
                JSON.stringify({error: "File size exceeds 500KB limit"}),
                {status: 400}
            );
        }

        // Get file details
        const fileName = file.name;
        const mimeType = file.type;
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save to /tmp directory
        const filePath = path.join(uploadsDir, fileName);
        await writeFile(filePath, buffer);

        // Log for debugging
        console.log(`File saved to ${filePath}, size: ${buffer.length} bytes`);

        // Initialize Drive just before using it (to catch auth errors)
        const drive = initializeGoogleServiceAccount();
        console.log("Google Drive client initialized successfully");

        const fileMetadata = {
            name: fileName,
            parents: [process.env.NEXT_PUBLIC_FOLDER_ID],
        };

        const media = {
            mimeType: mimeType,
            body: createReadStream(filePath),
        };

        console.log("Attempting to upload to Google Drive...");
        const uploadResponse = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: "id, webViewLink",
        });

        console.log("File uploaded to Google Drive successfully");
        const fileUrl = uploadResponse.data.webViewLink;

        // Update Firestore
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {resumeURL: fileUrl});
        console.log("Firestore updated successfully");

        // Delete temp file
        await unlink(filePath);

        return new Response(
            JSON.stringify({
                message: 'File uploaded successfully!',
                fileUrl
            }),
            {status: 200}
        );
    } catch (error) {
        console.error("Error during file upload:", error.message);
        console.error("Stack trace:", error.stack);

        // More detailed error response
        return new Response(
            JSON.stringify({
                error: error.message,
                stack: error.stack,
                location: "File upload API route"
            }),
            {status: 500}
        );
    }
}