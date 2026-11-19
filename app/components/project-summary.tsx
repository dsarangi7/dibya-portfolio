"use client";

/**
 * Full-height alternating project chapter.
 * Layout and reveal choreography adapted from Hamish Williams' ProjectSummary (MIT).
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { Divider } from "@/app/components/motion/divider";
import { fastOutSlowIn } from "@/app/components/motion/reveal";
import { ProjectVisual } from "@/app/components/project-visual";
import type { ProjectCard } from "@/app/lib/portfolio";

const item = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.8, delay, ease: fastOutSlowIn },
});

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ProjectSummary({ project, index }: { project: ProjectCard; index: number }) {
  const alternate = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const titleId = `project-${number}-title`;

  return (
    <section
      aria-labelledby={titleId}
      className="flex items-center py-16 lg:min-h-[85svh] lg:py-20"
    >
      <div
        className={`grid w-full items-center gap-12 lg:gap-16 ${
          alternate ? "lg:grid-cols-[1fr_38%]" : "lg:grid-cols-[38%_1fr]"
        }`}
      >
        <div className={`relative z-10 ${alternate ? "lg:order-2" : ""}`}>
          <div className="mb-8 grid grid-cols-[90px_1fr] items-center gap-4" aria-hidden>
            <Divider delay={0.1} />
            <motion.span
              className="font-mono text-sm font-medium text-primary"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.1, ease: fastOutSlowIn }}
            >
              {number}
            </motion.span>
          </div>
          <motion.p {...item(0.3)} className="mb-3 font-mono text-xs tracking-[0.2em] text-muted uppercase">
            {project.subtitle}
          </motion.p>
          <motion.h3 {...item(0.4)} id={titleId} className="mb-6 text-3xl leading-tight font-medium tracking-tight text-title sm:text-4xl">
            {project.title}
          </motion.h3>
          <motion.p {...item(0.5)} className="mb-8 text-lg leading-relaxed text-body">
            {project.summary}
          </motion.p>
          <motion.ul {...item(0.6)} className="mb-10 flex flex-wrap gap-2" aria-label="Topics">
            {project.tags.map((tag) => (
              <li key={tag} className="border border-line px-3 py-1 font-mono text-xs text-muted">
                {tag}
              </li>
            ))}
          </motion.ul>
          <motion.div {...item(0.7)}>
            <Link
              href={project.link}
              className="group inline-flex items-center gap-3 bg-primary px-6 py-3.5 text-sm font-medium text-bg transition-[filter] [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)] hover:brightness-110"
            >
              Read the case study
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className={alternate ? "lg:order-1" : ""}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, delay: 0.2, ease: fastOutSlowIn }}
        >
          <ProjectVisual kind={project.visual} label={`Schematic illustration for ${project.title}`} />
        </motion.div>
      </div>
    </section>
  );
}
