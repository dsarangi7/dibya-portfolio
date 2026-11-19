"use client";

import { Shell, SectionHeading } from "@/app/components/section-shell";
import { Reveal } from "@/app/components/motion/reveal";
import { toolkit } from "@/app/lib/portfolio";

export function ToolkitSection() {
  return (
    <Shell id="toolkit" className="py-24 lg:py-32">
      <SectionHeading index="05" label="Toolkit" title="What I work with" />
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {toolkit.map((group, i) => (
          <Reveal key={group.heading} delay={i * 0.1}>
            <h3 className="mb-5 border-b border-line pb-3 font-mono text-xs tracking-[0.18em] text-primary uppercase">
              {group.heading}
            </h3>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="text-body">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}
