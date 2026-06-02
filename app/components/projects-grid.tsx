"use client";

import Link from "next/link";
import { featuredProjects } from "@/app/lib/portfolio";
import { motion } from "framer-motion";
import { AiSystemsIcon, BatterySystemsIcon, OpticsIcon } from "@/app/components/visual-system";

function ProjectGlyph({ title }: { title: string }) {
  if (title.includes("Battery")) {
    return <BatterySystemsIcon />;
  }

  if (title.includes("AI")) {
    return <AiSystemsIcon />;
  }

  return <OpticsIcon />;
}

export function ProjectsGrid() {
  return (
    <motion.section id="projects" className="px-6 pb-16 sm:px-10 lg:px-16"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Featured projects</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Clean systems, real engineering value.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-300">
            Portfolio work is presented with a focus on architecture, workflow reliability, and safe public-facing design.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.title}
              href={project.link}
              aria-label={`Open project case study: ${project.title}`}
              className="group"
            >
              <motion.article
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="project-card visual-card relative overflow-hidden rounded-[2rem] p-6 transition hover:-translate-y-1"
              >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/90">
                    {project.subtitle}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
                </div>
                <ProjectGlyph title={project.title} />
              </div>

              <p className="text-sm leading-7 text-slate-300">{project.summary}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex justify-end border-t border-cyan-200/10 pt-4 text-cyan-200/80">
                <span aria-hidden="true">↗</span>
              </div>
            </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
