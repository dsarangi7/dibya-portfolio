"use client";

import { profileSummary } from "@/app/lib/portfolio";
import { motion } from "framer-motion";
import { AiSystemsIcon, BatterySystemsIcon, OpticsIcon, PhysicsIcon } from "@/app/components/visual-system";

export function ProfileSummary() {
  return (
    <motion.section className="px-6 pb-16 sm:px-10 lg:px-16"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
    >
      <div className="mx-auto max-w-6xl">
          <div className="visual-card relative overflow-hidden rounded-[2rem] p-8">
          <div className="absolute -right-20 top-8 h-44 w-44 rounded-full border border-violet-300/10 bg-violet-400/10 blur-3xl" />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-5 flex items-center gap-4">
                <PhysicsIcon />
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">{profileSummary.title}</p>
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Engineering systems with a strong scientific foundation.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
                {profileSummary.description}
              </p>
            </div>
            <div className="relative rounded-3xl border border-cyan-300/10 bg-slate-950/60 p-6 ring-1 ring-white/5 sm:w-[380px]">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Core strengths</p>
              <ul className="mt-5 space-y-4 text-slate-200">
                {profileSummary.bullets.map((bullet, index) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-7">
                    <span className="mt-1 text-cyan-200">
                      {[
                        <OpticsIcon key="optics" className="h-5 w-5" frameClass="h-8 w-8 rounded-xl" />,
                        <BatterySystemsIcon key="battery" className="h-5 w-5" frameClass="h-8 w-8 rounded-xl" />,
                        <AiSystemsIcon key="ai" className="h-5 w-5" frameClass="h-8 w-8 rounded-xl" />,
                        <PhysicsIcon key="physics" className="h-5 w-5" frameClass="h-8 w-8 rounded-xl" />,
                      ][index]}
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
