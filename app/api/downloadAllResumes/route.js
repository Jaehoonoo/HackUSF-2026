import { 
  listFiles,
  getFile
} from "@/utils/r2";
import archiver from "archiver";
import { PassThrough } from "stream";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const zipStream = new PassThrough();
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(zipStream);

    const filesList = await listFiles()
    // console.log(filesList)

    for (const obj of filesList) {
      const response = await getFile(obj.Key)
      const {Key, ContentType, Body} = response
      // console.log(file)

      archive.append(Body, {
        name: Key + ContentType.replace("application/", "."),
      });
    }

    await archive.finalize();

    return new Response(zipStream, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="hackusf_resumes.zip"`,
      },
    });

  } catch (e) {
    console.log(e)
    NextResponse.json({ error: e }, { status: 500 })
  }
}
