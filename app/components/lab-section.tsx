import { LabGrid } from "@/app/components/lab-grid";
import { Shell, SectionHeading } from "@/app/components/section-shell";
import { getSideProjects, githubProfileUrl } from "@/app/lib/side-projects";

/** Server component: pulls live repo metadata from GitHub at build / revalidate time. */
export async function LabSection() {
  const projects = await getSideProjects();
  return (
    <Shell id="lab" className="py-24 lg:py-32">
      <SectionHeading
        index="02"
        label="Lab"
        title="Built after hours"
        intro="Side projects I build in public: battery models I wanted to understand properly, tools I use every day, and a few small products. Each card links to the source, and to a live version where there is one."
        gold
      />
      <LabGrid projects={projects} profileUrl={githubProfileUrl} />
    </Shell>
  );
}
