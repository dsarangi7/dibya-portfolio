export type ProjectCard = {
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  link: string;
};

export const heroCopy = {
  name: "Dibya Jyoti Sarangi",
  role: "R&D Engineer, Marine Battery Systems & AI-Enabled Engineering Workflows",
  headline:
    "Building premium engineering systems that bridge marine battery analytics, local AI tools, and product-driven research.",
  highlights: [
    "Marine battery R&D",
    "AI-enabled workflow systems",
    "Data analytics for engineering decisions",
  ],
};

export const profileSummary = {
  title: "Profile",
  description:
    "Physics-trained engineer working at the intersection of battery systems, data analytics, and engineering software. I design AI-enabled systems that make complex industrial workflows more reliable, visible, and repeatable.",
  bullets: [
    "Marine battery R&D and system validation",
    "Battery analytics with MATLAB, Python, and data visualization",
    "Local LLM/RAG tools for engineering knowledge workflows",
    "BOM/ECN process automation and product-focused tooling",
  ],
};

export const featuredProjects: ProjectCard[] = [
  {
    title: "AI Engineering Assistant",
    subtitle: "Offline knowledge retrieval for engineering teams",
    summary:
      "Designed a local RAG-based assistant for internal workflows, enabling secure access to engineering knowledge without exposing private documents. Focused on architecture, retrieval, and practical product-fit for engineering teams.",
    tags: ["RAG", "Python", "Local LLM", "Engineering AI"],
    link: "#ai-assistant",
  },
  {
    title: "BOM / ECN Workflow Workspace",
    subtitle: "Sanitized engineering process platform",
    summary:
      "Built a workflow tool for BOM ingestion, ECN review, and lifecycle control. The system is centered on product-thinking, role-based reviews, and high-integrity item master management.",
    tags: ["Next.js", "Workflow", "BOM", "ECN"],
    link: "#bom-ecn",
  },
  {
    title: "Battery Anomaly Dashboard",
    subtitle: "Data-driven battery health visualization",
    summary:
      "Created an interactive dashboard concept for detecting cell voltage anomalies and translating analytics into actionable insights for battery teams.",
    tags: ["MATLAB", "Python", "Analytics", "Dashboard"],
    link: "#battery-dashboard",
  },
];

export const skills = [
  "Marine battery systems",
  "Battery analytics & anomaly detection",
  "Local LLM / RAG workflows",
  "Engineering dashboard design",
  "Product-oriented tooling",
  "Python & MATLAB",
  "Next.js & Tailwind CSS",
];
