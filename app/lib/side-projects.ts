/**
 * Curated public GitHub projects. Copy here is written from each public README.
 * Live repo metadata (language, last push, stars) is merged in at build time
 * by `getSideProjects()` and revalidated daily; the fallbacks below are used
 * if the GitHub API is unreachable.
 *
 * Deliberately excluded: repos describing employer-internal tooling.
 */
export const githubUser = "dsarangi7";
export const githubProfileUrl = `https://github.com/${githubUser}`;

export type SideProjectGroup = "Battery & physics" | "AI & agents" | "Shipped products";

export type SideProject = {
  repo: string;
  title: string;
  group: SideProjectGroup;
  summary: string;
  stack: string[];
  liveUrl?: string;
  /** Extra repos rolled into one card (e.g. a family of small sites). */
  related?: { repo: string; label: string }[];
  fallback: { language: string; pushedAt: string };
};

export const sideProjects: SideProject[] = [
  {
    repo: "Fleet-Battery-Intelligence-Platform",
    title: "Fleet Battery Intelligence Platform",
    group: "Battery & physics",
    summary:
      "End-to-end battery analytics on synthetic fleet data: Python ingestion into a SQL warehouse, cell-to-fleet SOC/SOH and degradation metrics, condition-matched anomaly detection, a read-only API and a live dashboard rebuilt by CI on every push.",
    stack: ["Python", "SQLite", "Docker", "GitHub Actions"],
    liveUrl: "https://dsarangi7.github.io/Fleet-Battery-Intelligence-Platform/",
    fallback: { language: "Python", pushedAt: "2026-11-10" },
  },
  {
    repo: "SOC-Modelling",
    title: "SOC Modelling: 1RC → 2RC → EKF",
    group: "Battery & physics",
    summary:
      "A step-by-step state-of-charge estimator: equivalent-circuit models with one and two RC branches, parameter identification, then an extended Kalman filter, with matching Python, MATLAB and Simulink implementations and a written validation report.",
    stack: ["Python", "MATLAB", "Simulink", "EKF"],
    fallback: { language: "Python", pushedAt: "2026-09-16" },
  },
  {
    repo: "DIO-office",
    title: "DIO — an office for my AI agents",
    group: "AI & agents",
    summary:
      "A live pixel-art floor where each of my AI agents has a desk. Agent status drives the scene: working agents stay at their desks with activity bubbles, idle ones walk to a café that holds three at most.",
    stack: ["HTML", "Canvas", "Agents"],
    liveUrl: "https://dsarangi7.github.io/DIO-office/",
    fallback: { language: "HTML", pushedAt: "2026-10-15" },
  },
  {
    repo: "Echo",
    title: "Echo — speaking practice, on-device",
    group: "AI & agents",
    summary:
      "English and Chinese speaking practice that runs quantized Whisper in the browser through WebAssembly. No paid API and no audio sent to a cloud speech service. Packs cover office, travel and daily-life phrases, with a daily review streak.",
    stack: ["TypeScript", "Transformers.js", "Whisper", "ONNX"],
    liveUrl: "https://echo-psi-ashen.vercel.app",
    fallback: { language: "TypeScript", pushedAt: "2026-11-18" },
  },
  {
    repo: "Pomodoro-Float",
    title: "Pomodoro Float",
    group: "Shipped products",
    summary:
      "An always-on-top Pomodoro timer for Windows that folds into a small pill, with daily tasks and a monthly history calendar. Shipped as a portable release.",
    stack: ["Electron", "JavaScript"],
    fallback: { language: "JavaScript", pushedAt: "2026-11-03" },
  },
  {
    repo: "Yunshang-AI",
    title: "Yunshang AI — wearables site",
    group: "Shipped products",
    summary:
      "A four-language marketing site (English, 中文, Español, हिन्दी) for an AI camera-glasses maker, generated from one template and one translation dictionary, with a check that every language has the same keys.",
    stack: ["JavaScript", "Python build", "i18n"],
    liveUrl: "https://yunshang-ai.vercel.app",
    fallback: { language: "JavaScript", pushedAt: "2026-11-16" },
  },
  {
    repo: "batterycalculators.com",
    title: "Calculator sites",
    group: "Shipped products",
    summary:
      "A family of fast, static calculator sites built on one Astro setup: battery sizing, roof pitch, freight-class density estimates, overtime tax and text-case conversion.",
    stack: ["Astro", "SEO", "Static"],
    related: [
      { repo: "theroofpitchcalculator.com", label: "Roof pitch" },
      { repo: "Freight-Class-Estimator", label: "Freight class" },
      { repo: "NoTaxOTCalculator", label: "Overtime tax" },
      { repo: "ConverteCaixa", label: "Case converter" },
    ],
    fallback: { language: "Astro", pushedAt: "2026-11-18" },
  },
];

type RepoMeta = { language: string; pushedAt: string; stars: number };

export async function getSideProjects(): Promise<(SideProject & { meta: RepoMeta })[]> {
  let live = new Map<string, RepoMeta>();
  try {
    const response = await fetch(
      `https://api.github.com/users/${githubUser}/repos?per_page=100&type=owner`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 86400 },
      },
    );
    if (response.ok) {
      const repos = (await response.json()) as {
        name: string;
        language: string | null;
        pushed_at: string;
        stargazers_count: number;
      }[];
      live = new Map(
        repos.map((repo) => [
          repo.name,
          {
            language: repo.language ?? "",
            pushedAt: repo.pushed_at.slice(0, 10),
            stars: repo.stargazers_count,
          },
        ]),
      );
    }
  } catch {
    // Offline build or rate limit: fall back to the static values.
  }

  return sideProjects.map((project) => ({
    ...project,
    meta: live.get(project.repo) ?? { ...project.fallback, stars: 0 },
  }));
}
