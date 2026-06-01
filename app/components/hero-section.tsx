"use client";

import { heroCopy } from "@/app/lib/portfolio";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <motion.section
      className="relative isolate overflow-hidden px-6 py-16 sm:px-10 lg:px-16"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_45%)] opacity-80" />
      <div className="absolute left-1/2 top-10 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-white/5 px-4 py-2 text-sm text-cyan-200 ring-1 ring-cyan-400/10 backdrop-blur-sm">
              engineering portfolio • cinematic data systems
            </div>
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">
                {heroCopy.role}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
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
                <div key={item} className="rounded-3xl border border-white/10 bg-slate-950/40 px-5 py-4 shadow-[0_35px_120px_-80px_rgba(14,165,233,0.45)]/20 backdrop-blur-xl">
                  <p className="text-sm font-medium text-slate-100">{item}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl ring-1 ring-white/5">
            <div className="mb-4 text-sm uppercase tracking-[0.24em] text-cyan-300/80">
              Signal overview
            </div>
            <div className="space-y-5 text-slate-200">
              <div className="rounded-3xl bg-slate-900/70 p-5 ring-1 ring-white/5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Focus</p>
                <p className="mt-3 text-base leading-7">
                  Building dependable tools for engineers working on batteries, systems, and AI workflows.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-900/70 p-5 ring-1 ring-white/5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Approach</p>
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
