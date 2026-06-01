"use client";

import { motion } from "framer-motion";

const researchHighlights = [
  {
    title: "ICFO Photonics Research",
    subtitle: "Advanced optics in experimental science",
    description:
      "Led photonics research that fused instrumentation, spectroscopy, and diagnostic workflows for real-world sensing applications.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h16" />
        <path d="M12 4v16" />
        <path d="M6.5 6.5l11 11" />
      </svg>
    ),
  },
  {
    title: "IIT Delhi Applied Optics",
    subtitle: "Precision measurement systems",
    description:
      "Translated optics research into applied systems that emphasize measurement fidelity, instrument stability, and engineering-grade analysis.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="M3 12h18" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Multimodal Diagnostics",
    subtitle: "Spectroscopy and biomedical sensing",
    description:
      "Built multimodal diagnostic device concepts that combine spectroscopy, imaging, and signal processing for safer, more informative sensing.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </svg>
    ),
  },
  {
    title: "Research-to-Industry",
    subtitle: "Engineering systems with product rigor",
    description:
      "Moved optical instrument thinking into industrial workflows, connecting research insights to marine battery analytics and AI-enabled engineering tools.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18" />
        <path d="M12 3v18" />
        <path d="M16 8l-4 4-4-4" />
      </svg>
    ),
  },
];

export function ResearchSection() {
  return (
    <motion.section
      id="research"
      className="px-6 pb-16 sm:px-10 lg:px-16"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65 }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Research</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Research impact that informs product-grade engineering.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-300">
            Scientific instrumentation, optics, and multimodal diagnostics shaped the systems thinking behind marine battery analytics and engineering AI workflows.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {researchHighlights.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group rounded-[2rem] border border-white/10 bg-slate-950/55 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5 transition hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-slate-900/80"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/20">
                  {item.icon}
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300 ring-1 ring-white/5">
                  Impact
                </span>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-cyan-300/80">{item.subtitle}</p>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
