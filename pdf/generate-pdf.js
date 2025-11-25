import { chromium } from "playwright";
import { client } from "./sanity.js";
import { getCVQuery } from "./queries.js";
import { cvTemplate } from "./template.js";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

async function generateForLang(lang, filename) {
  const data = await client.fetch(getCVQuery(lang));
  const fotoUrl = data.foto ? urlFor(data.foto).width(400).height(400).fit("crop").url() : "";

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
