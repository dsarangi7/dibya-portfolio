"use client";

import { motion } from "framer-motion";
import { OpticsIcon, ResearchIcon } from "@/app/components/visual-system";

const researchHighlights = [
  {
    title: "ICFO Photonics Research",
    subtitle: "Advanced optics in experimental science",
    description:
      "Led photonics research that fused instrumentation, spectroscopy, and diagnostic workflows for real-world sensing applications.",
    icon: <OpticsIcon />,
  },
  {
    title: "IIT Delhi Applied Optics",
    subtitle: "Precision measurement systems",
    description:
      "Translated optics research into applied systems that emphasize measurement fidelity, instrument stability, and engineering-grade analysis.",
    icon: <OpticsIcon />,
  },
  {
    title: "Multimodal Diagnostics",
    subtitle: "Spectroscopy and biomedical sensing",
    description:
      "Built multimodal diagnostic device concepts that combine spectroscopy, imaging, and signal processing for safer, more informative sensing.",
    icon: <ResearchIcon />,
  },
  {
    title: "Research-to-Industry",
    subtitle: "Engineering systems with product rigor",
    description:
      "Moved optical instrument thinking into industrial workflows, connecting research insights to marine battery analytics and AI-enabled engineering tools.",
    icon: <ResearchIcon />,
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
              className="visual-card group rounded-[2rem] p-8 transition hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-4">
                {item.icon}
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

        <div className="visual-card mt-8 rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Research links</p>
          <div className="mt-5 space-y-4 text-slate-300">
            <div className="hologram-panel rounded-3xl p-4">
              <p className="text-sm font-medium text-white">2024 published optics research</p>
              <p className="mt-2 text-sm text-slate-300">
                Near-infrared diffuse optical characterization of human thyroid using ultrasound-guided hybrid time-domain and diffuse correlation spectroscopies.
              </p>
              <a
                href="https://opg.optica.org/boe/fulltext.cfm?uri=boe-15-12-7035"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex text-sm font-medium text-cyan-300 hover:text-white"
              >
                View publication
              </a>
            </div>
            <div className="hologram-panel rounded-3xl p-4">
              <p className="text-sm font-medium text-white">ICFO FLIGHT public research reference</p>
              <p className="mt-2 text-sm text-slate-300">
                Public feature highlighting the ICFO FLIGHT research profile and optics research credibility.
              </p>
              <a
                href="https://www.linkedin.com/posts/flightphd-flightphd-industrial-ugcPost-7224029255603507200-30Km/"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex text-sm font-medium text-cyan-300 hover:text-white"
              >
                View public feature
              </a>
            </div>
            <div className="hologram-panel rounded-3xl p-4">
              <p className="text-sm font-medium text-white">External citation</p>
              <p className="mt-2 text-sm text-slate-300">
                Additional ScienceDirect citation for diffuse optical thyroid characterization research.
              </p>
              <a
                href="https://www.sciencedirect.com/science/article/abs/pii/S2468451123000417"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex text-sm font-medium text-cyan-300 hover:text-white"
              >
                View external citation
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
