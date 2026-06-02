"use client";

import { heroCopy } from "@/app/lib/portfolio";
import { motion } from "framer-motion";
import { AiSystemsIcon, BatterySystemsIcon, DjsMonogram } from "@/app/components/visual-system";

export function HeroSection() {
  return (
    <motion.section
      className="relative isolate min-h-[92vh] overflow-hidden px-6 py-16 sm:px-10 lg:px-16"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="tech-grid absolute inset-0 -z-20 opacity-60" />
      <div className="particles absolute inset-0 -z-10" />
      <div className="absolute left-1/2 top-20 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-cyan-300/10 bg-sky-500/10 blur-3xl" />
      <div className="mx-auto flex min-h-[calc(92vh-8rem)] max-w-7xl items-center">
        <div className="grid w-full gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-white/[0.04] px-4 py-2 text-sm text-cyan-100 ring-1 ring-cyan-300/10 backdrop-blur-xl">
              <DjsMonogram className="h-7 w-7" />
              engineering portfolio • cinematic data systems
            </div>
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">
                {heroCopy.role}
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                {heroCopy.name}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {heroCopy.headline}
              </p>
            </div>
            <motion.div className="grid gap-3 sm:grid-cols-3"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              {heroCopy.highlights.map((item) => (
                <div key={item} className="visual-card rounded-3xl px-5 py-4">
                  <p className="text-sm font-medium text-slate-100">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="visual-card relative overflow-hidden rounded-[2rem] p-8 shadow-2xl shadow-cyan-500/10">
            <div className="absolute right-6 top-6 opacity-90">
              <DjsMonogram className="h-24 w-24" />
            </div>
            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full border border-cyan-300/10 bg-cyan-300/10 blur-2xl" />
            <div className="mb-6 text-sm uppercase tracking-[0.24em] text-cyan-300/80">
              Signal overview
            </div>
            <div className="relative space-y-5 text-slate-200">
              <div className="rounded-3xl bg-slate-950/55 p-5 ring-1 ring-cyan-300/10">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Focus</p>
                  <BatterySystemsIcon />
                </div>
                <p className="mt-3 text-base leading-7">
                  Building dependable tools for engineers working on batteries, systems, and AI workflows.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-950/55 p-5 ring-1 ring-violet-300/10">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Approach</p>
                  <AiSystemsIcon />
                </div>
                <p className="mt-3 text-base leading-7">
                  Blend scientific rigor with product design to deliver lightweight, high-trust engineering UIs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
