export type ProjectCard = {
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  link: string;
};

export const heroCopy = {
  name: "Dibya Jyoti Sarangi",
  role: "Battery R&D Engineer — Marine Battery Systems, Analytics & Engineering AI",
  headline:
    "Marine Battery R&D Engineer building intelligent battery analytics, telemetry diagnostics, and AI-powered engineering systems with a physics and research foundation.",
  highlights: [
    "Marine battery analytics",
    "Intelligent diagnostics",
    "AI-assisted engineering systems",
  ],
};

export const profileSummary = {
  title: "Battery-first engineering profile",
  description:
    "I work on marine lithium-ion battery systems, battery analytics, operational telemetry, anomaly detection, parameter estimation, and engineering intelligence. My physics, applied optics, and biomedical photonics research background strengthens how I approach battery R&D: careful measurement, disciplined analysis, and practical software workflows for engineering teams.",
  bullets: [
    "Marine lithium-ion battery analytics and telemetry diagnostics",
    "Battery modeling, parameter estimation, validation, and anomaly detection",
    "Engineering AI and local LLM / RAG workflows for technical knowledge",
    "Physics, optics, and research instrumentation foundation",
  ],
};

export const featuredProjects: ProjectCard[] = [
  {
    title: "Battery Analytics & Intelligent Diagnostics",
    subtitle: "Telemetry-driven battery diagnostics",
    summary:
      "Designed public-safe battery analytics workflows for marine lithium-ion systems, turning telemetry into diagnostics for anomaly detection, parameter review, and engineering decision support.",
    tags: ["Battery Analytics", "Diagnostics", "Marine Systems"],
    link: "/projects/battery-analytics",
  },
  {
    title: "AI Engineering Assistant",
    subtitle: "Engineering workflow intelligence",
    summary:
      "Built a local RAG assistant for engineering knowledge workflows, emphasizing secure retrieval, practical troubleshooting support, and internal engineering intelligence without exposing private data.",
    tags: ["RAG", "Workflow Intelligence", "Engineering AI"],
    link: "/projects/ai-engineering-assistant",
  },
  {
    title: "Multimodal Spectroscopic Systems",
    subtitle: "Research foundation in optical diagnostics",
    summary:
      "Developed multimodal optical diagnostic research systems combining spectroscopy and signal analysis, forming a scientific foundation for later battery diagnostics and measurement workflows.",
    tags: ["Optics", "Instrumentation", "Research Foundation"],
    link: "/projects/multimodal-spectroscopic-systems",
  },
];

export const skills = [
  "Battery Engineering & Marine Battery Analytics",
  "Battery Modeling, Diagnostics & Validation",
  "AI Engineering Systems & Workflow Intelligence",
  "Data Analytics with MATLAB and Python",
  "Physics, Optics & Research Instrumentation",
  "Engineering Dashboards & Data Storytelling",
  "Product-focused Software Design",
];
