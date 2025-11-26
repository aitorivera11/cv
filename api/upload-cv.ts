export const config = {
  runtime: "nodejs"
};

import { put } from "@vercel/blob";

export default async function handler(req, res) {
  try {
    const { filename, content } = req.body;

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return res.status(500).json({ error: "No blob token provided" });
    }

    const buffer = Buffer.from(content, "base64");

    const { url } = await put(filename, buffer, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: "application/pdf",
    });

    return res.status(200).json({ url });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
