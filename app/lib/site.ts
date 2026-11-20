export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const siteUrl = new URL(siteOrigin);

export const siteRoutes = [
  "/",
  "/projects/battery-analytics",
  "/projects/soh-calculator",
  "/projects/bom-engineering-workspace",
  "/projects/ai-engineering-assistant",
  "/projects/multimodal-spectroscopic-systems",
];
