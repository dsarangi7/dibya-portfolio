import { HeroSection } from "@/app/components/hero-section";
import { ProfileSummary } from "@/app/components/profile-summary";
import { ProjectsGrid } from "@/app/components/projects-grid";
import { SkillsSection } from "@/app/components/skills-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.08),_transparent_30%)] opacity-80" />
        <div className="relative">
          <HeroSection />
          <ProfileSummary />
          <ProjectsGrid />
          <SkillsSection />
        </div>
      </div>
    </main>
  );
}
