"use client";

/**
 * Moon ⇄ sun theme switch. A masking circle slides off the moon to reveal a
 * full disc, which shrinks while the rays grow and rotate in.
 * Interaction idea after Hamish Williams' ThemeToggle (MIT); drawing is original.
 */
import { motion } from "framer-motion";
import { useId } from "react";
import { fastOutSlowIn } from "@/app/components/motion/reveal";
import { setTheme, useTheme } from "@/app/lib/theme";

const transition = { duration: 0.6, ease: fastOutSlowIn };

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const dark = theme === "dark";
  const maskId = `theme-mask-${useId().replace(/:/g, "")}`;

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={!dark}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={`flex h-12 w-12 items-center justify-center text-title transition-colors duration-300 hover:text-primary ${className}`}
    >
      <svg viewBox="0 0 38 38" className="h-[30px] w-[30px] overflow-visible" aria-hidden>
        <defs>
          <mask id={maskId}>
            <rect width="38" height="38" fill="white" />
            <motion.circle
              r="9"
              fill="black"
              initial={false}
              animate={dark ? { cx: 25, cy: 12 } : { cx: 40, cy: -2 }}
              transition={transition}
            />
          </mask>
        </defs>
        <motion.circle
          cx="19"
          cy="19"
          fill="currentColor"
          mask={`url(#${maskId})`}
          initial={false}
          animate={{ r: dark ? 10 : 6.5 }}
          transition={transition}
        />
        <motion.g
          initial={false}
          animate={dark ? { opacity: 0, rotate: -45, scale: 0.6 } : { opacity: 1, rotate: 0, scale: 1 }}
          transition={transition}
          style={{ transformOrigin: "19px 19px" }}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i * Math.PI) / 4;
            const x1 = 19 + Math.cos(angle) * 10.5;
            const y1 = 19 + Math.sin(angle) * 10.5;
            const x2 = 19 + Math.cos(angle) * 14;
            const y2 = 19 + Math.sin(angle) * 14;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </motion.g>
      </svg>
    </button>
  );
}
