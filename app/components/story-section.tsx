"use client";

/**
 * "About" chapter. On desktop the portrait pins while scroll drives the
 * signal-acquisition scene and the story paragraphs light up in turn.
 * Decoding greeting and tagged divider adapted from Hamish Williams'
 * Profile section (MIT).
 */
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { Shell, SectionHeading } from "@/app/components/section-shell";
import { SignalPortrait } from "@/app/components/signal-portrait";
import { fastOutSlowIn } from "@/app/components/motion/reveal";
import { story, timeline } from "@/app/lib/portfolio";

function StoryParagraph({ text, index, progress }: { text: string; index: number; progress: MotionValue<number> }) {
  const from = 0.08 + index * 0.24;
  const opacity = useTransform(progress, [from, from + 0.14], [0.28, 1]);
  return (
    <motion.p style={{ opacity }} className="text-[17px] leading-[1.7] text-body sm:text-lg">
      {text}
    </motion.p>
  );
}

export function StorySection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const desktop = useRef(false);

  // Desktop: progress across the pinned runway. Mobile: progress as the portrait scrolls in.
  const pinned = useScroll({ target: pinRef, offset: ["start 0.6", "end end"] });
  const inline = useScroll({ target: figureRef, offset: ["start 0.75", "end 0.2"] });
  const progress = useMotionValue(0);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      desktop.current = query.matches;
      progress.set((query.matches ? pinned.scrollYProgress : inline.scrollYProgress).get());
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [progress, pinned.scrollYProgress, inline.scrollYProgress]);

  useMotionValueEvent(pinned.scrollYProgress, "change", (v) => desktop.current && progress.set(v));
  useMotionValueEvent(inline.scrollYProgress, "change", (v) => !desktop.current && progress.set(v));

  const timelineScroll = useScroll({ target: listRef, offset: ["start 80%", "end 60%"] });
  const timelineProgress = useSpring(timelineScroll.scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <Shell id="story" className="pt-24 pb-24 lg:pt-32 lg:pb-32">
      <div ref={pinRef} className="relative lg:h-[250vh]">
        <div className="lg:hidden">
          <SectionHeading index="03" label="Story" title={story.greeting} />
        </div>
        <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div ref={figureRef}>
              <SignalPortrait progress={progress} />
            </div>
            <div>
              <div className="hidden lg:block">
                <SectionHeading index="03" label="Story" title={story.greeting} />
              </div>
              <div className="space-y-5 lg:-mt-6">
                {story.paragraphs.map((paragraph, i) => (
                  <StoryParagraph key={i} text={paragraph} index={i} progress={progress} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-10 lg:mt-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase lg:pt-1.5 lg:text-right">Path so far</p>
        <ol ref={listRef} className="relative pl-10" aria-label="Career timeline">
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-line" />
          <motion.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-0.5 origin-top bg-primary"
            style={{ scaleY: timelineProgress }}
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
