"use client";

/**
 * "Signal acquisition" portrait.
 * Scroll progress drives four phases:
 *   0.00–0.20  flat cell-voltage-style traces draw left to right
 *   0.20–0.55  trace amplitude and frequency lock onto the photo's luminance,
 *              so the face resolves out of the waveforms
 *   0.58–0.88  a gold scan line sweeps down and hands over to the graded photo
 *   0.88–1.00  locked
 * Original work (canvas 2D, no WebGL). Reduced motion shows the final photo.
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/app/lib/asset";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

const ROWS = 90;
const COLS = 160;
const BUCKETS = 12;
const SRC = asset("/images/dibya-portrait.png");

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const phase = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Sample the photo into a ROWS×COLS luminance grid with contrast stretch. */
function sampleLuminance(img: HTMLImageElement): Float32Array {
  const canvas = document.createElement("canvas");
  canvas.width = COLS;
  canvas.height = ROWS;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const grid = new Float32Array(ROWS * COLS);
  if (!ctx) return grid;
  ctx.drawImage(img, 0, 0, COLS, ROWS);
  const { data } = ctx.getImageData(0, 0, COLS, ROWS);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
  }

  // Subject mask: pixels far in colour from every border pixel belong to the
  // subject. Blurred and thresholded to close holes and soften the edge.
  const border: number[] = [];
  for (let c = 0; c < COLS; c++) border.push(c, COLS + c);
  for (let r = 0; r < ROWS; r++) border.push(r * COLS, r * COLS + 1, r * COLS + COLS - 1, r * COLS + COLS - 2);
  const raw = new Float32Array(ROWS * COLS);
  for (let i = 0; i < raw.length; i++) {
    let nearest = Infinity;
    for (const b of border) {
      const d = Math.hypot(data[i * 4] - data[b * 4], data[i * 4 + 1] - data[b * 4 + 1], data[i * 4 + 2] - data[b * 4 + 2]);
      if (d < nearest) nearest = d;
    }
    // Bright, unsaturated pixels are wall; skin, shirt and suit are not.
    const r = data[i * 4] / 255;
    const g = data[i * 4 + 1] / 255;
    const b = data[i * 4 + 2] / 255;
    const hiC = Math.max(r, g, b);
    const saturation = hiC > 0 ? (hiC - Math.min(r, g, b)) / hiC : 0;
    const wall = grid[i] > 0.42 && saturation < 0.16;
    raw[i] = nearest > 32 && !wall ? 1 : 0;
  }
  const mask = new Float32Array(ROWS * COLS);
  const radius = 2;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let sum = 0;
      let n = 0;
      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          const rr = r + dr;
          const cc = c + dc;
          if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) continue;
          sum += raw[rr * COLS + cc];
          n++;
        }
      }
      const t = clamp01((sum / n - 0.22) / 0.3);
      // The ceiling line above the head is not subject.
      const top = clamp01((r / ROWS - 0.1) / 0.045);
      mask[r * COLS + c] = t * t * (3 - 2 * t) * top;
    }
  }

  // Contrast stretch on the subject only (5th–97th percentile), then a gamma
  // that pushes skin mid-tones down so eyes, brows and shadows read.
  // Local contrast (unsharp mask) so features survive the coarse raster.
  const sharp = new Float32Array(grid.length);
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let sum = 0;
      let n = 0;
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const rr = r + dr;
          const cc = c + dc;
          if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS) continue;
          sum += grid[rr * COLS + cc];
          n++;
        }
      }
      const i = r * COLS + c;
      sharp[i] = grid[i] + 1.1 * (grid[i] - sum / n);
    }
  }
  grid.set(sharp);
  const subject = Array.from(grid).filter((_, i) => mask[i] > 0.5).sort((a, b) => a - b);
  const lo = subject[Math.floor(subject.length * 0.05)] ?? 0;
  const hi = subject[Math.floor(subject.length * 0.97)] ?? 1;
  for (let i = 0; i < grid.length; i++) {
    const lum = clamp01((grid[i] - lo) / (hi - lo || 1)) ** 1.8;
    grid[i] = mask[i] * (0.1 + 0.9 * lum) + (1 - mask[i]) * 0.09;
  }
  return grid;
}

function lumAt(grid: Float32Array, row: number, u: number) {
  const x = u * (COLS - 1);
  const i0 = Math.floor(x);
  const i1 = Math.min(COLS - 1, i0 + 1);
  const f = x - i0;
  return grid[row * COLS + i0] * (1 - f) + grid[row * COLS + i1] * f;
}

type Readout = { stage: "ARMED" | "ACQUIRING" | "RESOLVING" | "LOCKED"; snr: string };

function readout(p: number): Readout {
  const stage = p < 0.02 ? "ARMED" : p < 0.2 ? "ACQUIRING" : p < 0.88 ? "RESOLVING" : "LOCKED";
  return { stage, snr: (1.2 + ease(clamp01(p / 0.9)) * 37.4).toFixed(1) };
}

export function SignalPortrait({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hud, setHud] = useState<Readout>(() => readout(0));

  useMotionValueEvent(progress, "change", (p) => {
    const next = readout(p);
    setHud((prev) => (prev.stage === next.stage && prev.snr === next.snr ? prev : next));
  });

  // Scan line position (0–100%) and the photo clip that follows it.
  const scan = useTransform(progress, (p) => ease(phase(p, 0.58, 0.88)) * 100);
  const scanTop = useTransform(scan, (s) => `${s}%`);
  const scanOpacity = useTransform(progress, [0.56, 0.6, 0.86, 0.9], [0, 1, 1, 0]);
  const photoClip = useTransform(scan, (s) => `inset(0 0 ${100 - s}% 0)`);

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !frame || !ctx) return;

    // The scope screen is dark in both themes, so the trace colour is fixed.
    const styles = getComputedStyle(document.documentElement);
    const cyan = styles.getPropertyValue("--scope-trace").trim() || "#5fe3ff";
    let grid: Float32Array | null = null;
    const img = new window.Image();
    img.src = SRC;
    img.onload = () => {
      grid = sampleLuminance(img);
    };

    let width = 0;
    let height = 0;
    const resize = () => {
      const rect = frame.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(frame);

    let inView = false;
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    io.observe(frame);

    let smooth = progress.get();
    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!inView || !grid || !width) return;
      smooth += (progress.get() - smooth) * 0.12;
      const p = smooth;
      const t = (now - start) / 1000;

      const reveal = ease(phase(p, 0, 0.2));
      const morph = ease(phase(p, 0.2, 0.55));
      const scanY = ease(phase(p, 0.58, 0.88)) * height;
      const fadeOut = 1 - phase(p, 0.86, 0.98);

      ctx.clearRect(0, 0, width, height);
      if (reveal <= 0 || fadeOut <= 0) return;

      const spacing = height / ROWS;
      const steps = Math.ceil(width / 2);
      const xMax = width * reveal;
      // Segments are bucketed by brightness so each bucket is one stroke call.
      const paths = Array.from({ length: BUCKETS }, () => new Path2D());

      for (let r = 0; r < ROWS; r++) {
        const y0 = (r + 0.5) * spacing;
        if (y0 < scanY - spacing) continue; // already handed over to the photo
        const nearScan = scanY > 0 ? clamp01((y0 - scanY) / (spacing * 6)) : 1;
        let theta = r * 1.7 + t * 0.9;
        let px = 0;
        let py = 0;
        for (let s = 0; s <= steps; s++) {
          const u = s / steps;
          const x = u * width;
          if (x > xMax) break;
          const lum = lumAt(grid, r, u);
          // Flat state: slow "voltage" drift. Locked state: the trace's
          // brightness follows the photo, with a fine ripple where it is bright.
          const drift = Math.sin(u * 5.2 + r * 0.6 + t * 0.4) * spacing * 0.2 * (1 - morph);
          theta += 0.9;
          const y = y0 + drift + Math.sin(theta) * spacing * 0.22 * lum * morph;
          if (s > 0) {
            const alpha = (0.32 * (1 - morph) + lum * morph) * nearScan * fadeOut;
            const bucket = Math.min(BUCKETS - 1, Math.round(alpha * (BUCKETS - 1)));
            if (bucket > 0) {
              paths[bucket].moveTo(px, py);
              paths[bucket].lineTo(x, y);
            }
          }
          px = x;
          py = y;
        }
      }
      ctx.lineWidth = Math.max(1.2, spacing * 0.42);
      ctx.lineCap = "round";
      ctx.strokeStyle = cyan;
      for (let b = 1; b < BUCKETS; b++) {
        ctx.globalAlpha = b / (BUCKETS - 1);
        ctx.stroke(paths[b]);
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [progress, reduce]);

  return (
    <figure className="relative mx-auto w-full max-w-[520px]">
      <div ref={frameRef} className="relative aspect-square overflow-hidden border border-line bg-[var(--scope)]">
        {/* Graded photo, revealed above the scan line */}
        <motion.div className="absolute inset-0" style={reduce ? undefined : { clipPath: photoClip }}>
          <Image
            src={SRC}
            alt="Portrait of Dibya Jyoti Sarangi"
            fill
            sizes="(min-width: 1024px) 520px, 90vw"
            className="object-cover grayscale-[0.85] contrast-[1.08] brightness-[0.82]"
            priority={false}
          />
          <div aria-hidden className="absolute inset-0 bg-[color-mix(in_oklab,var(--scope-trace)_25%,transparent)] mix-blend-color" />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_45%,var(--scope)_100%)] opacity-70" />
          <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0_3px,color-mix(in_oklab,var(--scope)_35%,transparent)_3px_4px)]" />
        </motion.div>

        {!reduce && <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />}

        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute inset-x-0 h-px bg-gold shadow-[0_0_14px_2px_var(--gold)]"
            style={{ top: scanTop, opacity: scanOpacity }}
          />
        )}

        {/* corner ticks */}
        {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "right-0 bottom-0 border-r-2 border-b-2"].map((pos) => (
          <span key={pos} aria-hidden className={`absolute h-4 w-4 border-primary ${pos}`} />
        ))}
      </div>

      {/* HUD readout */}
      <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
        <span>
          CH 01–{ROWS} · <span className={hud.stage === "LOCKED" || reduce ? "text-gold" : "text-primary"}>{reduce ? "LOCKED" : hud.stage}</span>
        </span>
        <span aria-hidden>SNR {reduce ? "38.6" : hud.snr} dB</span>
      </figcaption>
    </figure>
  );
}
