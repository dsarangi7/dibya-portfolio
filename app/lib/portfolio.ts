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
    title: "Battery Analytics & Intelligent Diagnostics",
    subtitle: "Telemetry-driven battery diagnostics",
    summary:
      "Designed a battery analytics workflow that turns marine telemetry into high-confidence diagnostics, helping teams detect anomalies and act with engineering-grade confidence.",
    tags: ["Battery Analytics", "Diagnostics", "Engineering"],
    link: "/projects/battery-analytics",
  },
  {
    title: "AI Engineering Assistant",
    subtitle: "Sanitized knowledge retrieval for engineering decisions",
    summary:
      "Built a local RAG assistant that lets engineers query technical documentation and runbooks without exposing private data. Emphasis on secure architecture, retrieval quality, and practical integrations that accelerate troubleshooting and onboarding.",
    tags: ["RAG", "Architecture", "Engineering AI"],
    link: "/projects/ai-engineering-assistant",
  },
  {
    title: "Multimodal Spectroscopic Systems",
    subtitle: "Optics-driven diagnostic instrumentation",
    summary:
      "Developed a multimodal optical system for combining spectroscopy and signal analysis in applied diagnostics, with a focus on measurement fidelity and experimental workflow.",
    tags: ["Optics", "Instrumentation", "Research"],
    link: "/projects/multimodal-spectroscopic-systems",
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
