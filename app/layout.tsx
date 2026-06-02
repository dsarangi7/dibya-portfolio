import type { Metadata } from "next";
import "./globals.css";
import Background from "@/app/components/background";
import PageTransition from "@/app/components/page-transition";

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Dibya Jyoti Sarangi | Battery R&D Engineer Portfolio",
    template: "%s | Dibya Jyoti Sarangi",
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-950 text-slate-100">
        <Background />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
