import { NextResponse } from "next/server";
import { getSignedUrlForUpload } from "@/utils/r2";

// this endpoint accepts formData that contains:
// userId: user's unique ID
// userName: {First Name} {Last Name}
// resume: resume binary file

// a user's resume will be stored a file called "{First Name} {Last Name} - {userId}"
// this ensures consistency between users and offers a systematic way to update resumes

export async function POST(request) {
  try {
    const formData = await request.formData();
    const userId = formData.get("userId");
    const userName = formData.get("userName"); // user's First Last name
    const resume = formData.get("resume");

    // console.log(typeof(resume))
    console.log(`Uploading resume\nuserName: ${userName}\nuserId: ${userId}`);
    console.log(`File Type: ${resume.type}`);

    // check file constraints
    if (resume.size / (1024 * 1024) > 1) {
      return NextResponse.json(
        {
          error: "Resume file too large (Max 1MB)",
          fileSize: resume.size,
        },
        { status: 400 },
      );
    }
    if (
      resume.type !== "application\/pdf" &&
      resume.type !== "application\/docx"
    ) {
      return NextResponse.json(
        {
          error: "Resume file has to be pdf or docx",
          fileType: resume.type,
        },
        { status: 400 },
      );
    }

    // create address at which resume is saved
    // will overwrite old file with new file
    // Store in resumes/ directory
    const signedUrl = await getSignedUrlForUpload(
      `resumes/${userName} - ${userId}`,
      resume.type,
    );

    // write resume's content to address
    const uploadResponse = await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": resume.type,
      },
      body: resume,
      duplex: "half",
    });

    // Check if upload to R2 was successful
    if (!uploadResponse.ok) {
      return NextResponse.json(
        {
          error: "Failed to upload resume to storage",
          status: uploadResponse.status,
          statusText: uploadResponse.statusText,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Resume upload success!",
      fileUrl: signedUrl,
    });
  } catch (e) {
    return NextResponse.json(
      { error: `Error uploading Resume: ${e}` },
      { status: 500 },
    );
  }
}
