import { NextRequest } from "next/server";
import {
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { S3 } from "@/utils/r2";
import archiver from "archiver";
import { PassThrough } from "stream";

const BUCKET = process.env.R2_BUCKET;

export async function GET(req) {
  const zipStream = new PassThrough();
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.pipe(zipStream);

  (async () => {
    let continuationToken;

    try {
      do {
        const list = await S3.send(
          new ListObjectsV2Command({
            Bucket: BUCKET,
            ContinuationToken: continuationToken,
          })
        );

        for (const obj of list.Contents ?? []) {
          if (!obj.Key) continue;

          const res = await S3.send(
            new GetObjectCommand({
              Bucket: BUCKET,
              Key: obj.Key,
            })
          );

          // 👇 This preserves the file name + extension
          archive.append(res.Body, {
            name: obj.Key + res.ContentType.replace("application/", "."),
          });
        }

        continuationToken = list.NextContinuationToken;
      } while (continuationToken);

      await archive.finalize();
    } catch (err) {
      archive.destroy(err);
    }
  })();

  return new Response(zipStream, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="r2-bucket-download.zip"`,
    },
  });
}
