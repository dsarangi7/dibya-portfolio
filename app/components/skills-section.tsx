"use client";

import { skills } from "@/app/lib/portfolio";
import { motion } from "framer-motion";
import { AiSystemsIcon, BatterySystemsIcon, OpticsIcon, PhysicsIcon, ResearchIcon } from "@/app/components/visual-system";

const skillIcons = [
  <BatterySystemsIcon key="battery" className="h-5 w-5" frameClass="h-8 w-8 rounded-xl" />,
  <BatterySystemsIcon key="diagnostics" className="h-5 w-5" frameClass="h-8 w-8 rounded-xl" />,
  <AiSystemsIcon key="ai" className="h-5 w-5" frameClass="h-8 w-8 rounded-xl" />,
  <ResearchIcon key="analytics" className="h-5 w-5" frameClass="h-8 w-8 rounded-xl" />,
  <OpticsIcon key="optics" className="h-5 w-5" frameClass="h-8 w-8 rounded-xl" />,
  <ResearchIcon key="research" className="h-5 w-5" frameClass="h-8 w-8 rounded-xl" />,
  <PhysicsIcon key="physics" className="h-5 w-5" frameClass="h-8 w-8 rounded-xl" />,
];

export function SkillsSection() {
  return (
    <motion.section id="skills" className="px-6 pb-20 sm:px-10 lg:px-16"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55 }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="visual-card rounded-[2rem] p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Skills</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Battery engineering capabilities backed by AI, data, and research discipline.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400 sm:text-right">
              A concise blend of marine battery analytics, diagnostics, engineering AI, data workflows, and scientific instrumentation experience.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {skills.map((skill, index) => (
              <motion.div key={skill} whileHover={{ scale: 1.02 }} className="hologram-panel flex items-center gap-4 rounded-3xl p-5 text-slate-100 transition hover:border-cyan-400/30">
                {skillIcons[index % skillIcons.length]}
                <p className="text-base font-medium">{skill}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
