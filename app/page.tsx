import type { Metadata } from "next";
import { Intro } from "@/app/components/intro";
import { WorkSection } from "@/app/components/work-section";
import { LabSection } from "@/app/components/lab-section";
import { StorySection } from "@/app/components/story-section";
import { ResearchSection } from "@/app/components/research-section";
import { ToolkitSection } from "@/app/components/toolkit-section";
import { Footer } from "@/app/components/footer";

export const metadata: Metadata = {
  title: "Dibya Jyoti Sarangi | Senior Battery Analytics Engineer",
  description:
    "Senior battery analytics engineer working on marine lithium-ion systems, battery analytics and engineering AI, with a physics and biomedical photonics research background.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Dibya Jyoti Sarangi | Senior Battery Analytics Engineer",
    description:
      "Senior battery analytics engineer working on marine lithium-ion systems, battery analytics and engineering AI, with a physics and biomedical photonics research background.",
  },
};

export default function Home() {
  return (
    <main className="page-grain relative">
      <Intro />
      <WorkSection />
      <LabSection />
      <StorySection />
      <ResearchSection />
      <ToolkitSection />
      <Footer />
    </main>
  );
}
