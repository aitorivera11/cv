// api/upload-cv.ts
import { put } from '@vercel/blob';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  const { filename, content } = req.body;

  const buffer = Buffer.from(content, 'base64');

  const blob = await put(filename, buffer, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return res.status(200).json({ url: blob.url });
}

