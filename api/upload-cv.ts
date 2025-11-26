import { put } from "@vercel/blob";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { filename, file } = req.body;

  if (!filename || !file) {
    return res.status(400).json({ error: "Missing file" });
  }

  const buffer = Buffer.from(file, "base64");

  const blob = await put(filename, buffer, {
    access: "public",
  });

  return res.status(200).json({ url: blob.url });
}
