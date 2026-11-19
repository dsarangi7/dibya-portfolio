"use client";

import { ProjectSummary } from "@/app/components/project-summary";
import { Shell, SectionHeading } from "@/app/components/section-shell";
import { featuredProjects } from "@/app/lib/portfolio";

export function WorkSection() {
  return (
    <Shell id="work" className="pt-24 lg:pt-32">
      <SectionHeading
        index="01"
        label="Selected work"
        title="Signals, systems, tools"
        intro="Four case studies, from battery telemetry to the research behind it. Company work is described at summary level only, with no internal data."
      />
      {featuredProjects.map((project, index) => (
        <ProjectSummary key={project.link} project={project} index={index} />
      ))}
    </Shell>
  );
}
