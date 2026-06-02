"use client";

import { motion } from "framer-motion";
import { AiSystemsIcon, BatterySystemsIcon, OpticsIcon, PhysicsIcon, ResearchIcon } from "@/app/components/visual-system";

const journeyMilestones = [
  {
    year: "2013",
    title: "Physics Foundation",
    subtitle: "Ravenshaw University",
    description:
      "Built analytical rigor through physics coursework and lab-based problem solving, forming the foundation for research-led engineering.",
    icon: <PhysicsIcon />,
  },
  {
    year: "2016",
    title: "Applied Physics",
    subtitle: "IGIT",
    description:
      "Deepened applied optics knowledge and experimental research methods while solving measurement and instrumentation challenges.",
    icon: <OpticsIcon />,
  },
  {
    year: "2018",
    title: "IIT Delhi",
    subtitle: "M.Tech in Applied Optics & Physics",
    description:
      "Focused on advanced optics research, precision instrumentation, and the science behind engineered measurement systems.",
    icon: <OpticsIcon />,
  },
  {
    year: "2021",
    title: "ICFO Barcelona",
    subtitle: "Marie Curie FLIGHT Fellow",
    description:
      "Joined an international optics research environment, blending experimental precision with applied photonics workflows.",
    icon: <ResearchIcon />,
  },
  {
    year: "2023",
    title: "Marine Battery R&D",
    subtitle: "AYK Energy",
    description:
      "Applied physics-driven systems thinking to marine battery analytics, anomaly detection, and product reliability engineering.",
    icon: <BatterySystemsIcon />,
  },
  {
    year: "2025",
    title: "AI Engineering Systems",
    subtitle: "Engineering-AI workflows",
    description:
      "Built local AI-enabled knowledge workflows and secure engineering tooling that connect data, models, and product decision-making.",
    icon: <AiSystemsIcon />,
  },
  {
    year: "2026+",
    title: "Future Vision",
    subtitle: "Physics + AI for engineering products",
    description:
      "Continuing toward intelligent systems that combine scientific rigor, reliable field data, and engineering-grade AI workflows.",
    icon: <AiSystemsIcon />,
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

        <div className="visual-card relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
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
                  <div className="relative z-10">
                    {milestone.icon}
                  </div>
                </div>

                <div className="hologram-panel flex-1 rounded-[1.75rem] p-5 sm:p-6">
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
