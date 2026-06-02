import { HeroSection } from "@/app/components/hero-section";
import { ProfileSummary } from "@/app/components/profile-summary";
import { JourneySection } from "@/app/components/journey-section";
import { ResearchSection } from "@/app/components/research-section";
import { IcfoSpotlight } from "@/app/components/icfo-spotlight";
import { ProjectsGrid } from "@/app/components/projects-grid";
import { SkillsSection } from "@/app/components/skills-section";
import { Footer } from "@/app/components/footer";
import { ChapterDivider, HolographicDivider } from "@/app/components/visual-system";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dibya Jyoti Sarangi | Battery R&D Engineer Portfolio",
  description:
    "Battery-first engineering portfolio for a Marine Battery R&D Engineer specializing in battery analytics, intelligent diagnostics, AI engineering systems, and physics-trained engineering.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Dibya Jyoti Sarangi | Battery R&D Engineer Portfolio",
    description:
      "Battery-first engineering portfolio for a Marine Battery R&D Engineer specializing in battery analytics, intelligent diagnostics, AI engineering systems, and physics-trained engineering.",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030712] text-slate-100">
      <div className="relative isolate overflow-hidden identity-field">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,_rgba(34,211,238,0.16),_transparent_34%),radial-gradient(circle_at_78%_8%,_rgba(99,102,241,0.14),_transparent_30%),radial-gradient(circle_at_82%_70%,_rgba(248,211,107,0.08),_transparent_24%)] opacity-90" />
        <div className="relative">
          <HeroSection />
          <HolographicDivider />
          <ProfileSummary />
          <ChapterDivider index="01" label="Trajectory" />
          <JourneySection />
          <ChapterDivider index="02" label="Research Signal" />
          <ResearchSection />
          <IcfoSpotlight />
          <ChapterDivider index="03" label="Applied Systems" />
          <ProjectsGrid />
          <ChapterDivider index="04" label="Capability Stack" />
          <SkillsSection />
          <ChapterDivider index="05" label="Contact" />
          <Footer />
        </div>
      </div>
    </main>
  );
}
