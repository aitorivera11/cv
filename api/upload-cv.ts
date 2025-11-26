// api/upload-cv.ts
import { put } from "@vercel/blob";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  try {
    const { filename, content } = req.body;

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return res.status(500).json({ error: "Missing blob token" });
    }

    const blob = await put(filename, Buffer.from(content, "base64"), {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    return res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Upload failed" });
  }
}
