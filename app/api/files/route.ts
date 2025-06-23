import { NextRequest, NextResponse } from "next/server";
import {
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.ENDPOINT ?? "",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY ?? "",
  },
});

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const file: File = formData.get("file") as File;
  if (!file) return NextResponse.json({ success: false });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const putObjectCommand = new PutObjectCommand({
    Bucket: "resume",
    Key: file.name,
    Body: buffer,
    ContentType: file.type,
  });

  try {
    const response = await r2.send(putObjectCommand);
    console.log("POST - Response " + response);
    return NextResponse.json(
      { success: true, message: response },
      { status: 200 }
    );
  } catch (error) {
    console.log("POST - Error " + error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};

// export const GET = async () => {
//   const command = new ListObjectsCommand({ Bucket: "resume" });
//   const response = await r2.send(command);
//   const data = response.Contents;
//   console.log("GET - response ", data);
//   return NextResponse.json({ data });
// };

export const GET = async () => {
  const command = new GetObjectCommand({
    Bucket: "resume",
    Key: "Harvey Dansou Resume.pdf",
  });
  const response = await r2.send(command);
  return new Response(response.Body?.transformToWebStream(), {
    headers: { "content-type": "application/pdf" },
  });
};
