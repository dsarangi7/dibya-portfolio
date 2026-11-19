"use client";

/**
 * Hero. Structure (decoding name, wiped headline, rotating discipline,
 * scroll indicator, morphing sphere) adapted from Hamish Williams' Intro (MIT).
 * The battery hologram is this portfolio's own visual and stays as the focal object.
 */
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DecoderText } from "@/app/components/motion/decoder-text";
import { fastOutSlowIn } from "@/app/components/motion/reveal";
import { HeroHologramIllustration } from "@/app/components/hero-hologram-illustration";
import { heroCopy } from "@/app/lib/portfolio";

const DisplacementSphere = dynamic(
  () => import("@/app/components/motion/displacement-sphere").then((m) => m.DisplacementSphere),
  { ssr: false },
);

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const { disciplines } = heroCopy;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const batteryY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const batteryOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const id = setInterval(() => setIndex((value) => (value + 1) % disciplines.length), 5000);
    return () => clearInterval(id);
  }, [disciplines.length]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro"
      aria-labelledby="intro-title"
      className="relative flex min-h-svh items-center overflow-hidden px-6 sm:px-10 lg:pr-16 lg:pl-40"
    >
      <DisplacementSphere />

      {/* Battery hologram: kept from the original hero, now parallaxing off on scroll */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[6%] right-[-22%] w-[min(78vw,640px)] opacity-60 sm:right-[-8%] lg:top-1/2 lg:right-[2%] lg:w-[min(46vw,620px)] lg:-translate-y-1/2 lg:opacity-100"
        style={{ y: batteryY, opacity: batteryOpacity }}
        initial={{ scale: 0.92, filter: "blur(8px)" }}
        animate={{ scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.6, delay: 0.4, ease: fastOutSlowIn }}
      >
        <HeroHologramIllustration />
      </motion.div>

      <motion.header className="relative z-10 w-full max-w-5xl" style={{ y: textY }}>
        <motion.h1
          id="intro-title"
          className="mb-10 font-mono text-sm font-medium tracking-[0.3em] text-muted uppercase sm:text-base lg:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <DecoderText text={heroCopy.name} delay={500} />
        </motion.h1>

        <h2 className="text-[clamp(3rem,10vw,7.5rem)] leading-[1.05] font-medium tracking-[-0.03em] text-title">
          <span className="sr-only">
            {heroCopy.titleLead} engineer: {disciplines.join(", ")}
          </span>
          <span aria-hidden className="flex items-center">
            <span className="wipe-word" style={{ "--wipe-delay": "0.2s" } as CSSProperties}>
              {heroCopy.titleLead}
            </span>
            <motion.span
              className="ml-5 hidden h-0.5 flex-1 origin-left bg-line sm:block"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: fastOutSlowIn }}
            />
          </span>
          <span aria-hidden className="relative flex h-[1.1em] items-center">
            <AnimatePresence mode="wait" initial>
              <motion.span
                key={disciplines[index]}
                className="flex items-center"
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
              >
                <span className="mr-3 text-[0.6em] text-muted">+</span>
                <span className="wipe-word" style={{ "--wipe-delay": index === 0 ? "0.6s" : "0s" } as CSSProperties}>
                  {disciplines[index]}
                </span>
              </motion.span>
            </AnimatePresence>
          </span>
        </h2>

        <motion.p
          className="mt-10 max-w-xl text-lg leading-relaxed text-body sm:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: fastOutSlowIn }}
        >
          {heroCopy.tagline}
        </motion.p>
      </motion.header>

      <a
        href="#work"
        aria-label="Scroll to selected work"
        className={`scroll-indicator fixed bottom-16 left-1/2 hidden h-[38px] w-[26px] -translate-x-1/2 rounded-[20px] border-2 border-muted transition-all duration-600 lg:block ${
          scrolled ? "pointer-events-none translate-y-5 opacity-0" : "opacity-100"
        }`}
      />
    </section>
  );
}
