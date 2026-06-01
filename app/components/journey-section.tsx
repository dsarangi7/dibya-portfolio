"use client";

import { motion } from "framer-motion";

const journeyMilestones = [
  {
    year: "2013",
    title: "Physics Foundation",
    subtitle: "Ravenshaw University",
    description:
      "Built analytical rigor through physics coursework and lab-based problem solving, forming the foundation for research-led engineering.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a9 9 0 0 0 0-6" />
        <path d="M4.6 9a9 9 0 0 0 0 6" />
        <path d="M9 4.6a9 9 0 0 0 6 0" />
        <path d="M15 19.4a9 9 0 0 0-6 0" />
      </svg>
    ),
  },
  {
    year: "2016",
    title: "Applied Physics",
    subtitle: "IGIT",
    description:
      "Deepened applied optics knowledge and experimental research methods while solving measurement and instrumentation challenges.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V11a7 7 0 0 1 14 0v10" />
        <path d="M8 10h8" />
      </svg>
    ),
  },
  {
    year: "2018",
    title: "IIT Delhi",
    subtitle: "M.Tech in Applied Optics & Physics",
    description:
      "Focused on advanced optics research, precision instrumentation, and the science behind engineered measurement systems.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4h12v5H6z" />
        <path d="M9 14h6v6H9z" />
        <path d="M4 9h16" />
      </svg>
    ),
  },
  {
    year: "2021",
    title: "ICFO Barcelona",
    subtitle: "Marie Curie FLIGHT Fellow",
    description:
      "Joined an international optics research environment, blending experimental precision with applied photonics workflows.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" />
      </svg>
    ),
  },
  {
    year: "2023",
    title: "Marine Battery R&D",
    subtitle: "AYK Energy",
    description:
      "Applied physics-driven systems thinking to marine battery analytics, anomaly detection, and product reliability engineering.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path d="M11 7h2" />
        <path d="M12 12l-1.5 2.5h3L12 12z" />
      </svg>
    ),
  },
  {
    year: "2025",
    title: "AI Engineering Systems",
    subtitle: "Engineering-AI workflows",
    description:
      "Built local AI-enabled knowledge workflows and secure engineering tooling that connect data, models, and product decision-making.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16" />
        <path d="M4 17h16" />
        <path d="M7 4v4" />
        <path d="M17 4v4" />
        <path d="M7 20v-4" />
        <path d="M17 20v-4" />
      </svg>
    ),
  },
  {
    year: "2026+",
    title: "Future Vision",
    subtitle: "Physics + AI for engineering products",
    description:
      "Continuing toward intelligent systems that combine scientific rigor, reliable field data, and engineering-grade AI workflows.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l4 7h7l-5.5 4.5L19 21l-7-4-7 4 1.5-7.5L1 9h7l4-7z" />
      </svg>
    ),
  },
];

export function JourneySection() {
  return (
    <motion.section
      id="journey"
      className="px-6 pb-16 sm:px-10 lg:px-16"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65 }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Journey</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A scientific path from fundamentals to systems thinking.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-300">
            Milestones that link physics, optics research, marine battery engineering, and practical AI systems for engineering-driven products.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5 sm:p-10">
          <div className="pointer-events-none absolute left-12 top-12 bottom-12 hidden w-px bg-cyan-400/20 sm:block" />

          <div className="space-y-8 sm:space-y-10">
            {journeyMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                className="relative flex gap-5 sm:gap-6"
              >
                <div className="relative">
                  <div className="absolute left-0 top-3 h-full w-0.5 bg-cyan-400/20 sm:top-6 sm:left-5" />
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/20 sm:h-16 sm:w-16">
                    {milestone.icon}
                  </div>
                </div>

                <div className="flex-1 rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-5 ring-1 ring-white/5 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">
                        {milestone.subtitle}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        {milestone.title}
                      </h3>
                    </div>
                    <span className="mt-3 inline-flex rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300 ring-1 ring-white/5 sm:mt-0">
                      {milestone.year}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
