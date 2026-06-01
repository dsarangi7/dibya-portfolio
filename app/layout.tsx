import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/app/components/background";
import PageTransition from "@/app/components/page-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100">
        <Background />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
