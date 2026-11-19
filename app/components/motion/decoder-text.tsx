"use client";

/**
 * Text that "decodes" from random glyphs into its final value.
 * Adapted from Hamish Williams' DecoderText (MIT). The glyph set is swapped
 * from katakana to physics / electrochemistry symbols to fit this portfolio.
 */
import { useReducedMotion, useSpring } from "framer-motion";
import { memo, useEffect, useRef } from "react";

const glyphs = [
  "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "λ", "μ", "ν", "ξ", "π", "ρ", "σ",
  "τ", "φ", "χ", "ψ", "ω", "Δ", "Σ", "Φ", "Ψ", "Ω", "∇", "∂", "∫", "≈", "±",
  "⊕", "⊗", "∞", "√", "Å", "ħ",
];

type Char = { type: "glyph" | "value"; value: string };

function shuffle(content: string[], output: Char[], position: number): Char[] {
  return content.map((value, index) => {
    if (index < position) return { type: "value", value };
    if (position % 1 < 0.5) {
      return { type: "glyph", value: glyphs[Math.floor(Math.random() * glyphs.length)] };
    }
    return { type: "glyph", value: output[index]?.value ?? "" };
  });
}

type DecoderTextProps = {
  text: string;
  start?: boolean;
  delay?: number;
  className?: string;
};

export const DecoderText = memo(function DecoderText({
  text,
  start = true,
  delay = 0,
  className = "",
}: DecoderTextProps) {
  const output = useRef<Char[]>([{ type: "glyph", value: "" }]);
  const container = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const spring = useSpring(0, { stiffness: 8, damping: 5 });

  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const content = text.split("");
    let timer: ReturnType<typeof setTimeout> | undefined;

    const render = () => {
      node.textContent = "";
      for (const item of output.current) {
        const span = document.createElement("span");
        span.textContent = item.value;
        if (item.type === "glyph") span.className = "opacity-70 font-normal";
        node.appendChild(span);
      }
    };

    const unsubscribe = spring.on("change", (value) => {
      output.current = shuffle(content, output.current, value);
      render();
    });

    if (reduceMotion) {
      output.current = content.map((value) => ({ type: "value", value }));
      render();
    } else if (start) {
      timer = setTimeout(() => spring.set(content.length), delay);
    }

    return () => {
      unsubscribe();
      if (timer) clearTimeout(timer);
    };
  }, [spring, reduceMotion, start, delay, text]);

  return (
    <span className={`relative ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden ref={container} />
      <span aria-hidden className="invisible">_</span>
    </span>
  );
});
