import type { NextConfig } from "next";

/**
 * Two deploy targets from one codebase:
 * - Vercel (default): full Next.js server features.
 * - GitHub Pages (GITHUB_PAGES=true): static export served under /<repo>.
 */
const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? process.env.NEXT_PUBLIC_BASE_PATH ?? "" : "";

const nextConfig: NextConfig = pages
  ? {
      output: "export",
      basePath,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
