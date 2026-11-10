import ProjectDetailLayout from "@/app/components/project-detail-layout";
import type { Metadata } from "next";
import Image from "next/image";
import workspacePreview from "@/public/engineering-os-workspace.png";

const title = "BOM Engineering Workspace";
const description =
  "I built and rolled out a production engineering operating system that moved the entire R&D engineering team from Excel to one workspace for part lifecycles, bills of materials, and engineering changes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects/bom-engineering-workspace",
  },
  openGraph: {
    type: "article",
    url: "/projects/bom-engineering-workspace",
    title: `${title} | Dibya Jyoti Sarangi`,
    description,
  },
};

const sections = [
  {
    title: "From spreadsheets to one controlled record",
    body: "Engineers had to reconcile separate spreadsheets to understand which part revision was current and which assemblies a change affected. I built a browser workspace that brings the bill of materials (BOM), item master, and engineering change notices (ECNs) together. Engineers can search for parts, compare BOMs, and submit or review changes from the same interface.",
  },
  {
    title: "BOM intelligence and part impact",
    body: "The workspace normalizes incoming Excel workbooks and generates structured differences between BOM revisions. Where-used queries walk the assembly tree so engineers can see which assemblies contain a part and assess the impact of a revision before approving it.",
  },
  {
    title: "Change control and the ERP handoff",
    body: "New part numbers, revision upgrades, and corrections go through approval workflows. Snapshots preserve the prior record for audit and rollback, and critical updates run in sequence to protect consistency. Linking approved revisions and their ECNs to the ERP workflow helps procurement and purchasing avoid ordering obsolete or mismatched parts.",
  },
  {
    title: "Production architecture",
    body: "A Next.js interface built with React and TypeScript runs on Node.js and calls a separate Python layer for governance rules. SQLite holds the authoritative records, derived indexes can be rebuilt, and Excel remains available for import and export. The Windows deployment supports database migrations and backups.",
  },
];

export default function BomEngineeringWorkspacePage() {
  return (
    <ProjectDetailLayout
      title={title}
      category="Engineering Operating System"
      description={description}
      note="A 30-engineer R&D team processed about 1,000 governed approvals on one BOM and ECN platform in 16 weeks (21 July–10 November 2026)."
    >
      <figure className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70">
        <a href="https://engineering-operating-system-demo.vercel.app/" aria-label="Open the Engineering Operating System demo" className="block">
          <Image
            src={workspacePreview}
            alt="Engineering Operating System workspace with item search, item master governance, and BOM conversion and comparison tools"
            className="h-auto w-full"
            sizes="(min-width: 1280px) 1152px, 100vw"
          />
        </a>
        <figcaption className="border-t border-white/10 px-6 py-4 text-sm leading-6 text-slate-300">
          Sanitized recreation of the Engineering Operating System dashboard. Engineers can search the item master,
          compare BOMs, and roll up part quantities from the same workspace. Select the image to open the live demo.
        </figcaption>
      </figure>

      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20 ring-1 ring-white/5"
          >
            <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
            <p className="mt-4 leading-8 text-slate-300">{section.body}</p>
          </section>
        ))}
      </div>
    </ProjectDetailLayout>
  );
}
