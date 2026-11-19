"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

/** Hamish's signature curve: fast out, slow in. */
export const fastOutSlowIn = [0.4, 0, 0.2, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article" | "p";
};

/** Fades + lifts its children the first time they scroll into view. */
export function Reveal({ delay = 0, y = 24, as = "div", children, ...rest }: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: fastOutSlowIn }}
      {...rest}
    >
      {children}
    </Component>
  );
}
