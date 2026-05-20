import { chromium } from "playwright";
import { cvTemplate } from "./template.js";
import { getCvData, getPhotoUrl } from "./directus.js";

async function generateForLang(lang, filename) {
  const data = await getCvData(lang);
  if (!data) {
    throw new Error(`No CV data found in Directus for lang=${lang}`);
  }

  const fotoUrl = getPhotoUrl(data.foto);
  const html = cvTemplate(data, fotoUrl, lang);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle" });

  await page.pdf({
    path: filename,
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", bottom: "10mm", left: "8mm", right: "8mm" }
  });

  await browser.close();
}

async function run() {
  await generateForLang("ca", "cv-aitor-ca.pdf");
  await generateForLang("es", "cv-aitor-es.pdf");
  await generateForLang("en", "cv-aitor-en.pdf");
}

run();
