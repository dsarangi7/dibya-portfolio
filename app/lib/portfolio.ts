export type ProjectCard = {
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  link: string;
};

export const heroCopy = {
  name: "Dibya Jyoti Sarangi",
  role: "R&D Engineer — Applied Physics, Marine Batteries & Engineering AI",
  headline:
    "From physics-driven optics research to marine battery R&D and AI-enabled engineering workflows — I build reliable systems that turn telemetry into confident engineering decisions.",
  highlights: [
    "Physics-first engineering",
    "Research → applied systems",
    "Trusted AI for engineering teams",
  ],
};

export const profileSummary = {
  title: "Narrative",
  description:
    "I started in physics and optics research, moved into marine battery validation, and now build AI-enabled engineering systems that help teams make fast, dependable decisions. My work connects rigorous measurement, sanitized data storytelling, and practical tooling for real product teams.",
  bullets: [
    "Physics and optics research informing real-world engineering",
    "Marine battery analytics, validation, and anomaly detection",
    "Designing local LLM / RAG workflows for engineering knowledge",
    "Product-oriented tooling for high-integrity engineering processes",
  ],
};

export const featuredProjects: ProjectCard[] = [
  {
    title: "AI Engineering Assistant",
    subtitle: "Sanitized knowledge retrieval for engineering decisions",
    summary:
      "Built a local RAG assistant that lets engineers query technical documentation and runbooks without exposing private data. Emphasis on secure architecture, retrieval quality, and practical integrations that accelerate troubleshooting and onboarding.",
    tags: ["RAG", "Architecture", "Engineering AI"],
    link: "#ai-assistant",
  },
  {
    title: "BOM / ECN Workflow Workspace",
    subtitle: "Productized engineering process and governance",
    summary:
      "Designed a lightweight, role-aware workspace for BOM ingestion and ECN control that reduces manual errors and clarifies decision ownership. Focused on auditability, safe public descriptions, and smooth handoff between engineering and operations.",
    tags: ["Workflow", "Governance", "Product"],
    link: "#bom-ecn",
  },
  {
    title: "Battery Anomaly Dashboard",
    subtitle: "Telemetry-first diagnostics and storytelling",
    summary:
      "Built an analytics-first dashboard concept that surfaces cell-level anomalies, contextualizes them with operational telemetry, and guides engineering investigations with reproducible analysis steps.",
    tags: ["Analytics", "Diagnostics", "Visualization"],
    link: "#battery-dashboard",
  },
];

export const skills = [
  "Physics-driven problem solving",
  "Optics and experimental methods",
  "Marine battery analytics & validation",
  "RAG & local LLM engineering workflows",
  "Engineering dashboards & data storytelling",
  "Product-focused software design",
  "Python, MATLAB, Next.js",
];
