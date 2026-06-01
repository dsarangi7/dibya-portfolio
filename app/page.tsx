import { HeroSection } from "@/app/components/hero-section";
import { ProfileSummary } from "@/app/components/profile-summary";
import { JourneySection } from "@/app/components/journey-section";
import { ResearchSection } from "@/app/components/research-section";
import { ProjectsGrid } from "@/app/components/projects-grid";
import { SkillsSection } from "@/app/components/skills-section";

export const metadata = {
  title: "Dibya Jyoti Sarangi | R&D Engineer Portfolio",
  description:
    "Cinematic portfolio for an R&D engineer specializing in marine battery analytics, AI-enabled workflows, and applied optics research.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.08),_transparent_30%)] opacity-80" />
        <div className="relative">
          <HeroSection />
          <ProfileSummary />
          <JourneySection />
          <ResearchSection />
          <ProjectsGrid />
          <SkillsSection />
        </div>
      </div>
    </main>
  );
}
