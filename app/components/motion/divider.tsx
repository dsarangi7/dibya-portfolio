"use client";

/**
 * Line with a trapezoid notch underneath, drawn in when visible.
 * Adapted from Hamish Williams' Divider component (MIT).
 */
import { motion } from "framer-motion";
import { fastOutSlowIn } from "./reveal";

type DividerProps = {
  notchWidth?: number;
  notchHeight?: number;
  delay?: number;
  className?: string;
  /** Use the gold battery accent instead of cyan. */
  gold?: boolean;
};

export function Divider({
  notchWidth = 64,
  notchHeight = 8,
  delay = 0,
  className = "",
  gold = false,
}: DividerProps) {
  const colour = gold ? "bg-gold" : "bg-primary";
  return (
    <div aria-hidden className={`relative h-0.5 w-full ${className}`}>
      <motion.div
        className={`h-full w-full origin-left ${colour}`}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: fastOutSlowIn }}
      />
      <motion.div
        className={`absolute top-0.5 left-0 ${colour}`}
        style={{ width: notchWidth, height: notchHeight }}
        initial={{ clipPath: "polygon(0 -1px, 0 -1px, 10px 100%, 10px 100%)", opacity: 0 }}
        whileInView={{
          clipPath: `polygon(0 -1px, 100% -1px, calc(100% - 10px) 100%, 10px 100%)`,
          opacity: 1,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.16, ease: fastOutSlowIn }}
      />
    </div>
  );
}

/** Index tag used above section titles: divider + "01 / Label". */
export function SectionTag({ index, label, gold }: { index: string; label: string; gold?: boolean }) {
  return (
    <div className="mb-8 grid grid-cols-[90px_1fr] items-center gap-4">
      <Divider gold={gold} />
      <motion.p
        className={`font-mono text-sm font-medium tracking-wide ${gold ? "text-gold" : "text-primary"}`}
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.9, ease: fastOutSlowIn }}
      >
        {index} <span className="text-muted">/</span> {label}
      </motion.p>
    </div>
  );
}
