import { NextRequest } from "next/server";
import { chromium } from "@playwright/browser-chromium";
import { cvTemplate } from "../../pdf/template";
import { client } from "../../pdf/sanity";
import { getCVQuery } from "../../pdf/queries";
import imageUrlBuilder from "@sanity/image-url";

export const config = {
  runtime: "nodejs18.x",
};

const builder = imageUrlBuilder(client);

const urlFor = (src: any) =>
  builder.image(src).width(400).height(400).fit("crop").url();

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "ca";

  const data = await client.fetch(getCVQuery(lang));
  const fotoUrl = data.foto ? urlFor(data.foto) : "";

  const html = cvTemplate(data, fotoUrl, lang);

  // Playwright a Vercel
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" }
  });

  await browser.close();

  return new Response(pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="cv-${lang}.pdf"`
    }
  });
}
