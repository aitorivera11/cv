export const config = {
  runtime: "nodejs",
};

import { chromium } from "playwright";
import { client } from "../pdf/sanity.js";
import { getCVQuery } from "../pdf/queries.js";
import { cvTemplate } from "../pdf/template.js";
import imageUrlBuilder from "@sanity/image-url";
import { put } from "@vercel/blob";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source).width(400).height(400).fit("crop").url();
}

async function generatePdfBuffer(lang: string): Promise<Buffer> {
  const data = await client.fetch(getCVQuery(lang));
  const fotoUrl = data.foto ? urlFor(data.foto) : "";

  const html = cvTemplate(data, fotoUrl, lang);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle" });

  // IMPORTANT: sense "path" → retorna Buffer
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", bottom: "10mm", left: "8mm", right: "8mm" },
  });

  await browser.close();
  return pdfBuffer as Buffer;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const langs = [
    { lang: "ca", filename: "cv-aitor-ca.pdf" },
    { lang: "es", filename: "cv-aitor-es.pdf" },
    { lang: "en", filename: "cv-aitor-en.pdf" },
  ];

  try {
    const results = [];

    for (const { lang, filename } of langs) {
      const pdfBuffer = await generatePdfBuffer(lang);

      const { url } = await put(filename, pdfBuffer, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: "application/pdf",
        addRandomSuffix: false,
        cacheControlMaxAge: 0,
      });

      results.push({ lang, filename, url });
    }

    return res.status(200).json({ ok: true, results });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ ok: false, error: e.message });
  }
}
