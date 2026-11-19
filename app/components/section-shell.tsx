"use client";

import type { ReactNode } from "react";
import { DecoderText } from "@/app/components/motion/decoder-text";
import { SectionTag } from "@/app/components/motion/divider";
import { Reveal } from "@/app/components/motion/reveal";
import { useInView } from "framer-motion";
import { useRef } from "react";

/** Page gutter that clears the fixed nav rail on desktop. */
export function Shell({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative scroll-mt-8 px-6 sm:px-10 lg:pr-16 lg:pl-40 ${className}`}>
      <div className="mx-auto max-w-[1096px]">{children}</div>
    </section>
  );
}

/** Index tag + decoding title + optional intro line. */
export function SectionHeading({
  index,
  label,
  title,
  intro,
  gold,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
  gold?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <header className="mb-14 max-w-3xl">
      <SectionTag index={index} label={label} gold={gold} />
      <h2 ref={ref} className="text-4xl leading-tight font-medium tracking-tight text-title sm:text-5xl">
        <DecoderText text={title} start={inView} delay={300} />
      </h2>
      {intro && (
        <Reveal delay={0.3}>
          <p className="mt-6 text-lg leading-relaxed text-body">{intro}</p>
        </Reveal>
      )}
    </header>
  );
}
