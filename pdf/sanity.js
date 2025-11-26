// pdf/sanity.js
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  apiVersion: "2025-07-09",
  useCdn: false,
  token: process.env.SANITY_TOKEN
});
