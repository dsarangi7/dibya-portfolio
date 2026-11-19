"use client";

/**
 * "About" chapter. Two-column layout with decoding greeting and a tagged
 * divider adapted from Hamish Williams' Profile section (MIT); the photo
 * column is replaced by a scroll-drawn timeline.
 */
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Shell, SectionHeading } from "@/app/components/section-shell";
import { Reveal, fastOutSlowIn } from "@/app/components/motion/reveal";
import { story, timeline } from "@/app/lib/portfolio";

export function StorySection() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <Shell id="story" className="py-24 lg:py-32">
      <SectionHeading index="03" label="Story" title={story.greeting} />
      <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          {story.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 + i * 0.12}>
              <p className="text-lg leading-[1.75] text-body sm:text-xl">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <ol ref={listRef} className="relative pl-10" aria-label="Career timeline">
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-line" />
          <motion.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-0.5 origin-top bg-primary"
            style={{ scaleY: progress }}
          />
          {timeline.map((entry, i) => (
            <motion.li
              key={entry.years}
              className="relative pb-10 last:pb-0"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: fastOutSlowIn }}
            >
              <span
                aria-hidden
                className={`absolute top-1.5 -left-10 h-4 w-4 border-2 ${
                  entry.current ? "border-gold bg-gold" : "border-primary bg-bg"
                }`}
              />
              <p className={`font-mono text-sm ${entry.current ? "text-gold" : "text-primary"}`}>{entry.years}</p>
              <p className="mt-1 text-lg font-medium text-title">{entry.title}</p>
              <p className="text-muted">{entry.place}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Shell>
  );
}
