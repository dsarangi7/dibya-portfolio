"use client";

import { heroCopy } from "@/app/lib/portfolio";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { DjsMonogram } from "@/app/components/visual-system";

const HeroThreeScene = dynamic(
  () => import("@/app/components/hero-three-scene").then((module) => module.HeroThreeScene),
  {
    ssr: false,
    loading: () => <div className="h-full min-h-[28rem] rounded-[2.5rem] border border-cyan-300/10 bg-slate-950/35" />,
  },
);

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [supportsWebGL, setSupportsWebGL] = useState<boolean | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
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
  const badgeX = useTransform(pointerX, (value) => value * 0.16);
  const badgeY = useTransform(pointerY, (value) => value * 0.14);
  const noteX = useTransform(pointerX, (value) => value * -0.12);
  const noteY = useTransform(pointerY, (value) => value * -0.1);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const canvas = document.createElement("canvas");
      const webglContext = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setSupportsWebGL(Boolean(webglContext));
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const nextY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouse({ x: nextX, y: nextY });
    mouseX.set(nextX);
    mouseY.set(nextY);
  }

  function handlePointerLeave() {
    setMouse({ x: 0, y: 0 });
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
        <div className="grid w-full gap-8 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <motion.div className="space-y-8" style={{ x: contentX, y: contentY }}>
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-white/[0.04] px-4 py-2 text-sm text-cyan-100 ring-1 ring-cyan-300/10 backdrop-blur-xl">
              <DjsMonogram className="h-7 w-7" />
              engineering portfolio • cinematic data systems
            </div>
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">
                {heroCopy.role}
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                {heroCopy.name}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                {heroCopy.headline}
              </p>
            </div>
            <motion.div
              className="grid gap-3 sm:grid-cols-3"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              style={{ x: pointerX, y: pointerY }}
            >
              {heroCopy.highlights.map((item) => (
                <div key={item} className="visual-card rounded-3xl px-5 py-4">
                  <p className="text-sm font-medium text-slate-100">{item}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="relative" style={{ x: sceneX, y: sceneY }}>
            <div className="absolute -inset-6 rounded-[3rem] bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.08),_transparent_55%)] blur-2xl" />
            <motion.div style={{ x: pointerX, y: pointerY }}>
              {supportsWebGL !== null ? (
                <HeroThreeScene
                  mouseX={mouse.x}
                  mouseY={mouse.y}
                  reducedMotion={Boolean(reducedMotion)}
                  supportsWebGL={supportsWebGL}
                />
              ) : (
                <div className="h-full min-h-[28rem] rounded-[2.5rem] border border-cyan-300/10 bg-slate-950/35" />
              )}
            </motion.div>

            <motion.div className="absolute left-5 top-5" style={{ x: badgeX, y: badgeY }}>
              <DjsMonogram className="h-14 w-14" />
            </motion.div>

            <div className="absolute bottom-5 right-5 grid gap-2" aria-hidden="true">
              <span className="h-9 w-24 rounded-full border border-cyan-300/20 bg-cyan-300/10 backdrop-blur-xl" />
              <motion.span className="h-1.5 w-20 rounded-full bg-gradient-to-r from-cyan-300/80 via-blue-400/60 to-transparent" style={{ x: noteX, y: noteY }} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
