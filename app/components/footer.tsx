"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { DecoderText } from "@/app/components/motion/decoder-text";
import { SectionTag } from "@/app/components/motion/divider";
import { Reveal } from "@/app/components/motion/reveal";
import { ArrowRight } from "@/app/components/project-summary";
import { Shell } from "@/app/components/section-shell";
import { githubProfileUrl } from "@/app/lib/side-projects";

const email = "dsarangi7@gmail.com";

export function Footer() {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <>
      <Shell id="contact" className="py-24 lg:py-40">
        <SectionTag index="06" label="Contact" />
        <h2 ref={ref} className="max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] font-medium tracking-[-0.03em] text-title">
          <DecoderText text="Let's build something" start={inView} delay={200} />
        </h2>
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-body sm:text-xl">
            I&apos;m interested in battery R&amp;D, battery analytics and engineering-AI roles, and in conversations with
            teams who want physics-grade measurement in their data tools.
          </p>
        </Reveal>
        <Reveal delay={0.45} className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
          <a
            href={`mailto:${email}`}
            className="group inline-flex items-center gap-3 bg-primary px-7 py-4 font-medium text-bg [clip-path:polygon(0_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%)] hover:brightness-110"
          >
            {email}
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href="https://www.linkedin.com/in/dibya-jyoti-sarangi37" target="_blank" rel="noopener noreferrer" className="accent-link text-lg text-body">
            LinkedIn
          </a>
          <a href={githubProfileUrl} target="_blank" rel="noopener noreferrer" className="accent-link text-lg text-body">
            GitHub
          </a>
          <a href="https://batterycalculators.com/" target="_blank" rel="noopener noreferrer" className="accent-link text-lg text-body">
            Battery Calculators
          </a>
        </Reveal>
      </Shell>

      <footer className="px-6 pb-10 sm:px-10 lg:pr-16 lg:pl-40">
        <div className="mx-auto flex max-w-[1096px] flex-col gap-2 border-t border-line pt-6 font-mono text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Dibya Jyoti Sarangi</p>
          <p>
            Design adapted from{" "}
            <a href="https://github.com/HamishMW/portfolio" target="_blank" rel="noopener noreferrer" className="accent-link">
              Hamish Williams&apos; open-source portfolio
            </a>{" "}
            (MIT)
          </p>
        </div>
      </footer>
    </>
  );
}
