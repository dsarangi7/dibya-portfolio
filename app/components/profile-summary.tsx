"use client";

import { profileSummary } from "@/app/lib/portfolio";
import { motion } from "framer-motion";

export function ProfileSummary() {
  return (
    <motion.section className="px-6 pb-16 sm:px-10 lg:px-16"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
    >
      <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">{profileSummary.title}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Engineering systems with a strong scientific foundation.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
                {profileSummary.description}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900/70 p-6 ring-1 ring-white/5 sm:w-[380px]">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Core strengths</p>
              <ul className="mt-5 space-y-4 text-slate-200">
                {profileSummary.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-7">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
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
