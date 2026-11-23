import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const url =
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL);
  return url ? [{ url }] : [];
}
