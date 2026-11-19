import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components/navbar";
import { Providers } from "@/app/components/providers";
import { siteUrl } from "@/app/lib/site";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const code = JetBrains_Mono({ subsets: ["latin"], variable: "--font-code", display: "swap" });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Dibya Jyoti Sarangi | Battery R&D Engineer Portfolio",
    template: "%s",
  },
  description:
    "Portfolio homepage for Dibya Jyoti Sarangi, a Battery R&D Engineer focused on marine battery systems, battery analytics, intelligent diagnostics, and AI engineering systems.",
  applicationName: "Dibya Jyoti Sarangi Portfolio",
  authors: [{ name: "Dibya Jyoti Sarangi" }],
  creator: "Dibya Jyoti Sarangi",
  keywords: [
    "Dibya Jyoti Sarangi",
    "Battery R&D Engineer",
    "Marine Battery Engineer",
    "marine battery analytics",
    "battery diagnostics",
    "engineering intelligence",
    "AI engineering systems",
    "applied optics",
    "biomedical photonics",
    "physics-trained engineer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Dibya Jyoti Sarangi Portfolio",
    title: "Dibya Jyoti Sarangi | Battery R&D Engineer Portfolio",
    description:
      "Recruiter-facing engineering portfolio centered on marine battery R&D, battery analytics, intelligent diagnostics, AI engineering systems, and a physics research foundation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dibya Jyoti Sarangi | Battery R&D Engineer Portfolio",
    description:
      "Marine battery R&D, battery analytics, intelligent diagnostics, AI engineering systems, and a physics-trained engineering foundation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${code.variable} h-full antialiased`}>
      <body className="min-h-full">
        <a
          href="#work"
          className="sr-only z-[60] bg-primary px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
