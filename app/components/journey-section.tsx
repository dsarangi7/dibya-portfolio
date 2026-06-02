"use client";

import { motion } from "framer-motion";
import { type ReactNode, useState } from "react";
import { AiSystemsIcon, BatterySystemsIcon, OpticsIcon, PhysicsIcon, ResearchIcon } from "@/app/components/visual-system";

type JourneyMilestone = {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  current?: boolean;
};

const journeyMilestones: JourneyMilestone[] = [
  {
    year: "2013-2016",
    title: "Physics Foundation",
    subtitle: "B.Sc. Physics (Honours) - Ravenshaw University",
    description:
      "Built analytical rigor through physics coursework and lab-based problem solving, forming the foundation for research-led engineering.",
    icon: <PhysicsIcon />,
  },
  {
    year: "2016-2018",
    title: "Applied Physics",
    subtitle: "M.Sc. Applied Physics - IGIT Sarang",
    description:
      "Deepened applied optics knowledge and experimental research methods while solving measurement and instrumentation challenges.",
    icon: <OpticsIcon />,
  },
  {
    year: "2021-2023",
    title: "IIT Delhi",
    subtitle: "M.Tech Applied Optics & Physics",
    description:
      "Focused on applied optics, precision instrumentation, and measurement systems, with the Dr. Shankar Dayal Sharma Gold Medal recognizing academic excellence.",
    icon: <OpticsIcon />,
  },
  {
    year: "2023-2025",
    title: "ICFO Barcelona",
    subtitle: "PhD Research / Marie Sklodowska-Curie FLIGHT Fellow",
    description:
      "Former Marie Sklodowska-Curie FLIGHT Fellow in biomedical photonics and medical optics research. This was a PhD research period, not a completed PhD.",
    icon: <ResearchIcon />,
  },
  {
    year: "Jan 2025-Present",
    title: "Marine Battery R&D",
    subtitle: "R&D Engineer, Marine Battery Systems - AYK Energy",
    description:
      "Current professional chapter: marine lithium-ion battery systems, telemetry diagnostics, parameter estimation, anomaly detection, battery health monitoring, engineering AI, and workflow intelligence.",
    icon: <BatterySystemsIcon />,
    current: true,
  },
  {
    year: "Future",
    title: "Future Vision",
    subtitle: "Battery Technology x Physics x Data x Software x AI",
    description:
      "Building intelligent battery diagnostics and engineering software systems that combine scientific rigor, reliable field data, and AI-assisted workflows.",
    icon: <AiSystemsIcon />,
  },
];

function IitDelhiAchievementSpotlight() {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="mt-5 max-w-xl rounded-[1.5rem] border border-cyan-300/10 bg-slate-950/60 p-3 shadow-[0_20px_70px_rgba(8,47,73,0.24)] ring-1 ring-white/5">
      <div className="overflow-hidden rounded-[1.2rem] border border-cyan-300/10 bg-slate-950/80">
        {!videoError ? (
          <video
            className="block aspect-video w-full object-cover"
            src="/IITD%20gold%20medal.MP4"
            aria-label="IIT Delhi Dr. Shankar Dayal Sharma Gold Medal announcement video"
            controls
            preload="metadata"
            playsInline
            onError={() => setVideoError(true)}
          >
            Sorry, this IIT Delhi achievement video could not be loaded in your browser.
          </video>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center px-5 py-6 text-center">
            <p className="max-w-sm text-sm leading-7 text-slate-300">
              The IIT Delhi achievement video could not be loaded. The award remains noted in the journey milestone.
            </p>
          </div>
        )}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        A milestone from my IIT Delhi journey, recognizing academic excellence during my M.Tech in Applied Optics & Physics.
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-cyan-300/75">
        IIT Delhi — Dr. Shankar Dayal Sharma Gold Medal announcement.
      </p>
    </div>
  );
}

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
            A battery engineering path built on physics, optics, and research discipline.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-300">
            Milestones that now converge on marine battery R&D, telemetry diagnostics, engineering AI, and practical systems built with scientific rigor.
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

                <div
                  className={`hologram-panel flex-1 rounded-[1.75rem] p-5 sm:p-6 ${
                    milestone.current ? "border-cyan-300/30 bg-cyan-300/[0.045] shadow-[0_0_60px_rgba(34,211,238,0.08)]" : ""
                  }`}
                >
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
                  {milestone.title === "IIT Delhi" ? <IitDelhiAchievementSpotlight /> : null}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
