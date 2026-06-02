"use client";

import { HeroHologramIllustration } from "@/app/components/hero-hologram-illustration";
import { heroCopy } from "@/app/lib/portfolio";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { DjsMonogram } from "@/app/components/visual-system";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const sceneX = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const contentX = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const pointerX = useTransform(mouseX, [-1, 1], [-18, 18]);
  const pointerY = useTransform(mouseY, [-1, 1], [-14, 14]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const nextY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(nextX);
    mouseY.set(nextY);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate min-h-screen overflow-hidden px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="tech-grid absolute inset-0 -z-20 opacity-60" />
      <div className="particles absolute inset-0 -z-10" />
      <motion.div
        className="absolute left-1/2 top-20 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-cyan-300/10 bg-sky-500/10 blur-3xl"
        style={{ y: glowY }}
      />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center">
        <div className="grid w-full min-w-0 max-w-full gap-8 overflow-hidden lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:overflow-visible">
          <motion.div className="w-full min-w-0 max-w-[calc(100vw-3rem)] space-y-8 sm:max-w-[calc(100vw-5rem)] lg:max-w-none" style={{ x: contentX, y: contentY }}>
            <div className="inline-flex max-w-full flex-wrap items-center gap-3 rounded-full border border-cyan-300/20 bg-white/[0.04] px-4 py-2 text-sm text-cyan-100 ring-1 ring-cyan-300/10 backdrop-blur-xl">
              <DjsMonogram className="h-7 w-7" />
              engineering portfolio • cinematic data systems
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-cyan-300/10 bg-slate-950/65 px-4 py-3 text-sm text-slate-300 shadow-sm backdrop-blur-xl">
              <p className="font-medium text-cyan-200">Navigate</p>
              <div className="flex flex-wrap items-center gap-2">
                <a href="#journey" aria-label="Jump to Journey section" className="rounded-full border border-cyan-300/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-200 transition hover:bg-cyan-300/10 hover:text-white">
                  Journey
                </a>
                <a href="#research" aria-label="Jump to Research section" className="rounded-full border border-cyan-300/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-200 transition hover:bg-cyan-300/10 hover:text-white">
                  Research
                </a>
                <a href="#projects" aria-label="Jump to Projects section" className="rounded-full border border-cyan-300/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-200 transition hover:bg-cyan-300/10 hover:text-white">
                  Projects
                </a>
                <a href="#skills" aria-label="Jump to Skills section" className="rounded-full border border-cyan-300/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-200 transition hover:bg-cyan-300/10 hover:text-white">
                  Skills
                </a>
                <a href="#contact" aria-label="Jump to Contact section" className="rounded-full border border-cyan-300/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-200 transition hover:bg-cyan-300/10 hover:text-white">
                  Contact
                </a>
              </div>
            </div>
            <div className="space-y-6">
              <p className="max-w-full text-sm uppercase tracking-[0.32em] text-cyan-300/80 [overflow-wrap:anywhere]">
                {heroCopy.role}
              </p>
              <h1 className="max-w-full text-4xl font-semibold leading-[1.05] tracking-tight text-white [overflow-wrap:anywhere] sm:max-w-4xl sm:text-6xl lg:text-7xl">
                {heroCopy.name}
              </h1>
              <p className="max-w-full text-lg leading-8 text-slate-300 [overflow-wrap:anywhere] sm:max-w-2xl sm:text-xl">
                {heroCopy.headline}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {heroCopy.highlights.map((item) => (
                <div key={item} className="visual-card rounded-3xl px-5 py-4">
                  <p className="text-sm font-medium text-slate-100">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#projects"
                aria-label="Jump to featured projects"
                className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Explore projects
              </a>
              <a
                href="https://www.linkedin.com/in/dibya-jyoti-sarangi37"
                target="_blank"
                rel="noreferrer"
                aria-label="Open Dibya Jyoti Sarangi LinkedIn profile"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.32 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.54V9H7.1v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div className="relative min-h-[32rem] min-w-0 max-w-[calc(100vw-3rem)] sm:max-w-[calc(100vw-5rem)] lg:max-w-none" style={{ x: sceneX, y: sceneY }}>
            <div className="absolute -inset-6 rounded-[3rem] bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.08),_transparent_55%)] blur-2xl" />
            <motion.div style={{ x: pointerX, y: pointerY }}>
              <HeroHologramIllustration />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
