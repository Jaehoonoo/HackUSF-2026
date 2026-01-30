import { listFiles, getFile } from "@/utils/r2";
import archiver from "archiver";
import { NextResponse } from "next/server";

const BATCH_SIZE = 10; // number of concurrent file fetches

export async function GET() {
  try {
    const chunks = [];
    const archive = archiver("zip", { zlib: { level: 5 } });

    // collect all chunks from the archive stream
    archive.on("data", (chunk) => chunks.push(chunk));

    // handle archive completion
    const archivePromise = new Promise((resolve, reject) => {
      archive.on("end", () => resolve());
      archive.on("error", (err) => reject(err));
    });

    const filesList = await listFiles("resumes/");

    // process files in parallel
    for (let i = 0; i < filesList.length; i += BATCH_SIZE) {
      const batch = filesList.slice(i, i + BATCH_SIZE);

      const results = await Promise.all(
        batch.map(async (obj) => {
          console.log("Fetching file: ", obj.Key);
          return getFile(obj.Key);
        }),
      );

      // append fetched files to archive
      for (const response of results) {
        const { Key, ContentType, Body } = response;
        archive.append(Body, {
          name: Key + ContentType.replace("application/", "."),
        });
      }
    }

    await archive.finalize();
    await archivePromise;

    const buffer = Buffer.concat(chunks);

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="hackusf_resumes.zip"`,
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
