"use client";

import { useState } from "react";
import { Shell, SectionHeading } from "@/app/components/section-shell";
import { Reveal } from "@/app/components/motion/reveal";
import { ArrowRight } from "@/app/components/project-summary";

const publications = [
  {
    year: "2024",
    venue: "Biomedical Optics Express",
    title:
      "Near-infrared diffuse optical characterization of human thyroid using ultrasound-guided hybrid time-domain and diffuse correlation spectroscopies",
    href: "https://opg.optica.org/boe/fulltext.cfm?uri=boe-15-12-7035",
  },
  {
    year: "2023",
    venue: "ScienceDirect",
    title: "Related diffuse optical study of the thyroid (external citation)",
    href: "https://www.sciencedirect.com/science/article/abs/pii/S2468451123000417",
  },
];

function Film({ src, label, caption }: { src: string; label: string; caption: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure>
      <div className="relative border border-line bg-bg-light">
        {failed ? (
          <div className="flex aspect-video items-center justify-center p-6 text-center text-muted">Video unavailable.</div>
        ) : (
          <video
            className="block aspect-video w-full object-cover"
            src={src}
            aria-label={label}
            controls
            preload="metadata"
            playsInline
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  );
}

export function ResearchSection() {
  return (
    <Shell id="research" className="py-24 lg:py-32">
      <SectionHeading
        index="04"
        label="Research"
        title="Where the rigour comes from"
        intro="Before batteries I worked on light in tissue: hybrid time-domain and diffuse correlation spectroscopy for thyroid characterisation in ICFO's Medical Photonics group. I still use the same habits every day: calibrate first, distrust a clean result, and write down the method."
      />

      <ul className="mb-20 divide-y divide-line border-y border-line">
        {publications.map((pub, i) => (
          <Reveal as="li" key={pub.href} delay={i * 0.1}>
            <a
              href={pub.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-2 py-7 sm:grid-cols-[90px_1fr_auto] sm:items-center sm:gap-8"
            >
              <span className="font-mono text-sm text-primary">{pub.year}</span>
              <span>
                <span className="block text-lg leading-snug text-title transition-colors group-hover:text-primary">{pub.title}</span>
                <span className="mt-1 block font-mono text-xs text-muted">{pub.venue}</span>
              </span>
              <ArrowRight className="hidden text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary sm:block" />
            </a>
          </Reveal>
        ))}
      </ul>

      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <Film
            src="/msca-interview.mp4"
            label="ICFO FLIGHT fellowship research interview"
            caption="MSCA FLIGHT fellowship feature: Medical Photonics group, ICFO Barcelona."
          />
        </Reveal>
        <Reveal delay={0.15}>
          <Film
            src="/IITD%20gold%20medal.MP4"
            label="IIT Delhi Dr. Shankar Dayal Sharma Gold Medal announcement"
            caption="IIT Delhi: Dr. Shankar Dayal Sharma Gold Medal announcement."
          />
        </Reveal>
      </div>
      <Reveal delay={0.2}>
        <a
          href="https://www.linkedin.com/posts/flightphd-flightphd-industrial-ugcPost-7224029255603507200-30Km/"
          target="_blank"
          rel="noopener noreferrer"
          className="accent-link mt-8 inline-block text-body"
        >
          Public FLIGHT programme feature on LinkedIn
        </a>
      </Reveal>
    </Shell>
  );
}
