import type { Metadata } from "next";
import "./globals.css";
import Background from "@/app/components/background";
import PageTransition from "@/app/components/page-transition";

export const metadata: Metadata = {
  title: "Dibya Jyoti Sarangi | R&D Engineer Portfolio",
  description:
    "Portfolio homepage for Dibya Jyoti Sarangi, showcasing marine battery R&D, AI-enabled engineering workflows, and data-driven systems.",
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
