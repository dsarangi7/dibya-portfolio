export type ProjectVisualKind = "battery" | "bom" | "rag" | "optics";

export type ProjectCard = {
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  link: string;
  visual: ProjectVisualKind;
};

export const heroCopy = {
  name: "Dibya Jyoti Sarangi",
  role: "Senior Battery Analytics Engineer — Marine Battery Systems, Analytics & Engineering AI",
  headline:
    "Senior Battery Analytics Engineer building intelligent battery analytics, telemetry diagnostics, and AI-powered engineering systems with a physics and research foundation.",
  highlights: [
    "Marine battery analytics",
    "Intelligent diagnostics",
    "AI-assisted engineering systems",
  ],
  /** Hero: fixed first word + rotating disciplines (Hamish-style). */
  titleLead: "Battery",
  disciplines: ["Analytics", "Engineering AI", "R&D", "Physics"],
  tagline:
    "I work on marine lithium-ion battery systems and build the analytics and AI tools around them. Before that, I measured light in tissue.",
};

/** First-person story used in the "Story" section. */
export const story = {
  greeting: "Hi, I'm Dibya",
  paragraphs: [
    "I trained as a physicist. I studied applied optics at IIT Delhi, where I received the Dr. Shankar Dayal Sharma Gold Medal, then did PhD research in biomedical photonics at ICFO Barcelona as a Marie Skłodowska-Curie FLIGHT fellow, measuring light in living tissue with time-domain and diffuse correlation spectroscopy.",
    "In January 2025 I moved into marine battery R&D, and since October 2026 I have been the Senior Battery Analytics Engineer. The instruments changed, but the problem is familiar: noisy signals, careful baselines, and results an engineer has to be able to trust. I work on telemetry diagnostics, parameter estimation and anomaly review for marine lithium-ion systems, and on the software teams actually adopt. One example: moving a 30-engineer R&D team from Excel to a governed BOM and change-control workflow.",
    "Outside work I keep building, mostly in public: a fleet battery analytics platform, an EKF state-of-charge model, a speaking-practice app that runs Whisper in the browser, and a small pixel office where my AI agents work. You'll find them in the lab below.",
  ],
};

export type TimelineItem = {
  years: string;
  title: string;
  place: string;
  current?: boolean;
};

export const timeline: TimelineItem[] = [
  { years: "2013–16", title: "B.Sc. Physics (Honours)", place: "Ravenshaw University" },
  { years: "2016–18", title: "M.Sc. Applied Physics", place: "IGIT Sarang" },
  { years: "2021–23", title: "M.Tech Applied Optics & Physics · Gold Medal", place: "IIT Delhi" },
  { years: "2023–25", title: "PhD research, MSCA FLIGHT Fellow", place: "ICFO Barcelona" },
  { years: "2025–26", title: "R&D Engineer, Marine Battery Systems", place: "AYK Energy" },
  { years: "2026–", title: "Senior Battery Analytics Engineer", place: "AYK Energy", current: true },
];

export const toolkit: { heading: string; items: string[] }[] = [
  {
    heading: "Battery engineering",
    items: [
      "Marine Li-ion systems",
      "Telemetry diagnostics",
      "ECM modelling (1RC / 2RC)",
      "SOC / SOH estimation, EKF",
      "Anomaly detection",
      "BOM & ECN change control",
    ],
  },
  {
    heading: "Data & modelling",
    items: ["Python · pandas · NumPy", "MATLAB · Simulink", "SQL warehouses", "Dashboards", "Signal processing"],
  },
  {
    heading: "AI & software",
    items: [
      "Local LLM / RAG assistants",
      "Agent workflows",
      "In-browser ML (ONNX, Transformers.js)",
      "TypeScript · Next.js · Astro",
      "Docker · GitHub Actions",
    ],
  },
  {
    heading: "Research & instrumentation",
    items: [
      "Time-domain diffuse optics",
      "Diffuse correlation spectroscopy",
      "Optical instrumentation",
      "Experimental validation",
      "Scientific writing",
    ],
  },
];

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
    visual: "battery",
  },
  {
    title: "BOM Engineering Workspace",
    subtitle: "Engineering Operating System",
    summary:
      "Moved a 30-engineer R&D team from Excel to one BOM and ECN platform that handled about 1,000 governed approvals in 16 weeks.",
    tags: ["BOM Intelligence", "Change Control", "ERP"],
    link: "/projects/bom-engineering-workspace",
    visual: "bom",
  },
  {
    title: "AI Engineering Assistant",
    subtitle: "Engineering workflow intelligence",
    summary:
      "Built a local RAG assistant for engineering knowledge workflows, emphasizing secure retrieval, practical troubleshooting support, and internal engineering intelligence without exposing private data.",
    tags: ["RAG", "Workflow Intelligence", "Engineering AI"],
    link: "/projects/ai-engineering-assistant",
    visual: "rag",
  },
  {
    title: "Multimodal Spectroscopic Systems",
    subtitle: "Research foundation in optical diagnostics",
    summary:
      "Developed multimodal optical diagnostic research systems combining spectroscopy and signal analysis, forming a scientific foundation for later battery diagnostics and measurement workflows.",
    tags: ["Optics", "Instrumentation", "Research Foundation"],
    link: "/projects/multimodal-spectroscopic-systems",
    visual: "optics",
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
