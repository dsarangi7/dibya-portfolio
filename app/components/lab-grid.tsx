"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fastOutSlowIn } from "@/app/components/motion/reveal";
import { ArrowRight } from "@/app/components/project-summary";
import type { SideProject, SideProjectGroup } from "@/app/lib/side-projects";
import { githubUser } from "@/app/lib/side-projects";

type Project = SideProject & { meta: { language: string; pushedAt: string; stars: number } };

const groups: ("All" | SideProjectGroup)[] = ["All", "Battery & physics", "AI & agents", "Shipped products"];

function formatMonth(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
}

function LabCard({ project, index }: { project: Project; index: number }) {
  const repoUrl = `https://github.com/${githubUser}/${project.repo}`;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: fastOutSlowIn }}
      className="group relative flex flex-col border border-line bg-bg-light/50 p-6 transition-colors duration-300 hover:border-gold/50 sm:p-8"
    >
      <span aria-hidden className="absolute top-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-fastout group-hover:scale-x-100" />
      <div className="mb-5 flex items-center justify-between gap-4 font-mono text-xs text-muted">
        <span className="tracking-[0.15em] uppercase">{project.group}</span>
        <span>
          {project.meta.language && <>{project.meta.language} · </>}
          {formatMonth(project.meta.pushedAt)}
          {project.meta.stars > 0 && <> · ★ {project.meta.stars}</>}
        </span>
      </div>
      <h3 className="mb-3 text-xl font-medium text-title sm:text-2xl">{project.title}</h3>
      <p className="mb-6 flex-1 leading-relaxed text-body">{project.summary}</p>
      <ul className="mb-6 flex flex-wrap gap-2" aria-label="Stack">
        {project.stack.map((tech) => (
          <li key={tech} className="border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
            {tech}
          </li>
        ))}
      </ul>
      {project.related && (
        <p className="mb-6 font-mono text-xs leading-8 text-muted">
          Also:{" "}
          {project.related.map((rel, i) => (
            <span key={rel.repo}>
              <a
                href={`https://github.com/${githubUser}/${rel.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="accent-link tap-target text-body [--tap-x:4px] [--tap-y:8px]"
              >
                {rel.label}
              </a>
              {i < project.related!.length - 1 && " · "}
            </span>
          ))}
        </p>
      )}
      <div className="flex flex-wrap gap-6 text-sm font-medium">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group/link tap-target inline-flex items-center gap-2 text-gold">
            Open live
            <ArrowRight className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </a>
        )}
        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="accent-link tap-target text-body">
          Source on GitHub
        </a>
      </div>
    </motion.article>
  );
}

export function LabGrid({ projects, profileUrl }: { projects: Project[]; profileUrl: string }) {
  const [filter, setFilter] = useState<(typeof groups)[number]>("All");
  const visible = filter === "All" ? projects : projects.filter((project) => project.group === filter);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
        {groups.map((group) => {
          const selected = group === filter;
          return (
            <button
              key={group}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(group)}
              className={`relative px-4 py-2 font-mono text-xs tracking-wide transition-colors duration-300 ${
                selected ? "text-bg" : "text-body hover:text-title"
              }`}
            >
              {selected && (
                <motion.span layoutId="lab-filter" className="absolute inset-0 bg-gold" transition={{ duration: 0.4, ease: fastOutSlowIn }} />
              )}
              <span className="relative">{group}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        {visible.map((project, index) => (
          <LabCard key={project.repo} project={project} index={index} />
        ))}
      </motion.div>

      <p className="mt-10 text-body">
        Everything else lives on{" "}
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="accent-link tap-target text-title">
          github.com/{githubUser}
        </a>
        .
      </p>
    </>
  );
}
