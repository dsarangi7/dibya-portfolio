"use client";

/**
 * Photon migration in tissue: a live 2D Monte Carlo of diffuse optics.
 * A single photon random-walks to the first detector, then thousands more
 * (simulated in a worker) build the "banana" path-density maps for three
 * source–detector separations, with TRS and DCS insets filling in alongside.
 * Original drawing; values are illustrative, not ICFO data.
 */
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPhotonWorker, detectedWalk, NX, NY, SIM, walkPhoton, type Snapshot, type Walk } from "@/app/lib/photon-sim";
import { useTheme } from "@/app/lib/theme";

const LW = 720;
const LH = 436;
const T = { x: 24, y: 100, w: 640, h: 320 };
const K = T.w / (SIM.x1 - SIM.x0); // px per mm
const LOOP = 20000;
const RHO = ["1 cm", "2 cm", "3 cm"];

const px = (x: number) => T.x + (x - SIM.x0) * K;
const py = (y: number) => T.y + y * K;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

type Palette = { bg: string; raised: string; text: string; gold: string; det: string[]; blood: string; mono: string };

function readPalette(theme: string): Palette {
  const css = getComputedStyle(document.body);
  const v = (name: string) => css.getPropertyValue(name).trim();
  const light = theme === "light";
  return {
    bg: v("--background"),
    raised: v("--background-raised"),
    text: v("--text"),
    gold: v("--gold"),
    det: [v("--primary"), light ? "oklch(52% 0.17 300)" : "oklch(70% 0.16 300)", v("--gold")],
    blood: light ? "oklch(55% 0.2 25)" : "oklch(66% 0.21 25)",
    mono: `${v("--font-code") || "ui-monospace"}, ui-monospace, monospace`,
  };
}

type Anim = {
  pts: number[];
  cum: number[];
  dynamic: Set<number>;
  fired: Set<number>;
  start: number;
  speed: number;
  trail: number;
  det: number;
  hero?: boolean;
};

function makeAnim(pts: ArrayLike<number>, opts: Omit<Anim, "pts" | "cum" | "fired" | "dynamic"> & { dynamic?: number[]; maxLen?: number }): Anim {
  const list: number[] = [pts[0], pts[1]];
  const cum = [0];
  for (let i = 2; i < pts.length; i += 2) {
    const d = Math.hypot(pts[i] - list[list.length - 2], pts[i + 1] - list[list.length - 1]);
    if (opts.maxLen && cum[cum.length - 1] + d > opts.maxLen) break;
    list.push(pts[i], pts[i + 1]);
    cum.push(cum[cum.length - 1] + d);
  }
  return { ...opts, pts: list, cum, dynamic: new Set(opts.dynamic ?? []), fired: new Set() };
}

type Scatterer = { x: number; y: number; phase: number };

function makeScatterers(count: number, seed: number): Scatterer[] {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  return Array.from({ length: count }, () => ({
    x: SIM.x0 + rand() * (SIM.x1 - SIM.x0),
    y: 0.6 + rand() * (SIM.depth - 1),
    phase: rand() * Math.PI * 2,
  }));
}

const STATIC = makeScatterers(240, 7);
const BLOOD = makeScatterers(26, 91);

/** Weighted mean depth per column between source and detector. */
function meanPath(grid: Float32Array, detector: number): { pts: [number, number][]; depth: number } {
  const d = SIM.detectors[detector];
  const raw: [number, number][] = [];
  for (let ix = 0; ix < NX; ix++) {
    const x = SIM.x0 + (ix + 0.5) * SIM.cell;
    if (x < 0.6 || x > d - 0.6) continue;
    let w = 0;
    let wy = 0;
    for (let iy = 0; iy < NY; iy++) {
      const v = grid[iy * NX + ix];
      w += v;
      wy += v * (iy + 0.5) * SIM.cell;
    }
    if (w > 0) raw.push([x, wy / w]);
  }
  const pts: [number, number][] = [[0, 0]];
  for (let i = 0; i < raw.length; i++) {
    let sy = 0;
    let n = 0;
    for (let j = Math.max(0, i - 4); j <= Math.min(raw.length - 1, i + 4); j++) {
      sy += raw[j][1];
      n++;
    }
    // Pin the ends to the surface where the photons enter and leave.
    const edge = Math.min(1, raw[i][0] / 2, (d - raw[i][0]) / 2);
    pts.push([raw[i][0], (sy / n) * edge]);
  }
  pts.push([d, 0]);
  return { pts, depth: Math.max(...pts.map((p) => p[1])) };
}

export function PhotonMigration() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trsRef = useRef<HTMLCanvasElement>(null);
  const dcsRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef<number | null>(null);
  const paletteRef = useRef<Palette | null>(null);
  const redrawRef = useRef<() => void>(() => {});
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const theme = useTheme();

  useEffect(() => {
    paletteRef.current = readPalette(theme);
    redrawRef.current();
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const trs = trsRef.current;
    const dcs = dcsRef.current;
    if (!canvas || !wrap || !trs || !dcs) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    paletteRef.current ??= readPalette(document.documentElement.dataset.theme ?? "dark");

    let scale = 1;
    let font = 13;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      scale = w / LW;
      font = Math.max(12, 10.5 / scale);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(LH * scale * dpr);
      canvas.style.height = `${LH * scale}px`;
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
      for (const inset of [trs, dcs]) {
        inset.width = Math.round(inset.clientWidth * dpr);
        inset.height = Math.round(inset.clientHeight * dpr);
      }
      heatDirty = true;
      drawInsets();
      if (reduce) drawFrame(LOOP - 1500);
    };

    // ---- simulation state -------------------------------------------------
    let snap: Snapshot | null = null;
    let means: { pts: [number, number][]; depth: number }[] | null = null;
    let heatDirty = true;
    const masks = [0, 1, 2].map(() => {
      const c = document.createElement("canvas");
      c.width = NX;
      c.height = NY;
      return c;
    });
    const tinted = [0, 1, 2].map(() => {
      const c = document.createElement("canvas");
      c.width = NX;
      c.height = NY;
      return c;
    });
    const anims: Anim[] = [];
    const queue: { d: number; pts: Float32Array }[] = [];
    const flashes: { x: number; y: number; t: number }[] = [];
    const pulses = [-1e9, -1e9, -1e9];
    let lastSpawn = 0;
    let lastSample = 0;
    let workerState: "idle" | "run" | "pause" = "idle";

    const sim = createPhotonWorker();
    const send = (msg: "reset" | "run" | "pause") => {
      if (!sim) return;
      if (msg === "run" && workerState === "run") return;
      if (msg === "pause" && workerState !== "run") return;
      sim.worker.postMessage(msg);
      if (msg !== "reset") workerState = msg;
    };

    const rebuildHeat = () => {
      const pal = paletteRef.current;
      if (!snap || !pal) return;
      snap.grids.forEach((grid, d) => {
        // Normalise to the deepest-reaching column (midway between source and
        // detector) and draw a contour: the hot spots at either end saturate,
        // the faint wandering tail is cut, and the banana keeps a clear edge.
        const mid = Math.round((SIM.detectors[d] / 2 - SIM.x0) / SIM.cell);
        let ref = 0;
        for (let ix = mid - 2; ix <= mid + 2; ix++) for (let iy = 0; iy < NY; iy++) ref = Math.max(ref, grid[iy * NX + ix]);
        ref = ref || 1;
        const mctx = masks[d].getContext("2d");
        const tctx = tinted[d].getContext("2d");
        if (!mctx || !tctx) return;
        const img = mctx.createImageData(NX, NY);
        for (let i = 0; i < grid.length; i++) {
          const r = grid[i] / ref;
          const v = r < 0.28 ? 0 : Math.pow(Math.min(1, (r - 0.28) / 0.9), 0.7);
          img.data[i * 4] = 255;
          img.data[i * 4 + 1] = 255;
          img.data[i * 4 + 2] = 255;
          img.data[i * 4 + 3] = Math.round(v * 255);
        }
        mctx.putImageData(img, 0, 0);
        tctx.globalCompositeOperation = "source-over";
        tctx.clearRect(0, 0, NX, NY);
        tctx.drawImage(masks[d], 0, 0);
        tctx.globalCompositeOperation = "source-in";
        tctx.fillStyle = pal.det[d];
        tctx.fillRect(0, 0, NX, NY);
      });
      heatDirty = false;
    };

    // ---- insets -----------------------------------------------------------
    function drawInsets() {
      const pal = paletteRef.current;
      if (!pal || !trs || !dcs) return;
      for (const [el, kind] of [
        [trs, "trs"],
        [dcs, "dcs"],
      ] as const) {
        const c = el.getContext("2d");
        if (!c) continue;
        const w = el.width;
        const h = el.height;
        const pad = 6 * (w / el.clientWidth || 1);
        c.clearRect(0, 0, w, h);
        c.strokeStyle = pal.text;
        c.globalAlpha = 0.18;
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(pad, pad);
        c.lineTo(pad, h - pad);
        c.lineTo(w - pad, h - pad);
        c.stroke();
        c.globalAlpha = 1;
        if (!snap) continue;
        c.lineWidth = 2 * (w / el.clientWidth || 1);
        for (let d = 0; d < 3; d++) {
          if (snap.hits[d] < 3) continue;
          const sel = hoverRef.current;
          c.globalAlpha = sel === null || sel === d ? 1 : 0.3;
          c.strokeStyle = pal.det[d];
          c.beginPath();
          if (kind === "trs") {
            const hist = snap.hist[d];
            let max = 0;
            for (const v of hist) max = Math.max(max, v);
            const avg = (i: number) => (hist[Math.max(0, i - 1)] + hist[i] + hist[Math.min(hist.length - 1, i + 1)]) / 3;
            max = 0;
            for (let i = 0; i < hist.length; i++) max = Math.max(max, avg(i));
            hist.forEach((_, i) => {
              const x = pad + (i / (hist.length - 1)) * (w - 2 * pad);
              const y = h - pad - (avg(i) / (max || 1)) * (h - 2 * pad) * 0.92;
              if (i === 0) c.moveTo(x, y);
              else c.lineTo(x, y);
            });
          } else {
            const gamma = 5000 * snap.dynamic[d];
            for (let i = 0; i <= 80; i++) {
              const tau = Math.pow(10, -7 + (i / 80) * 5);
              const g2 = 1 + 0.5 * Math.exp(-2 * gamma * tau);
              const x = pad + (i / 80) * (w - 2 * pad);
              const y = h - pad - ((g2 - 1) / 0.5) * (h - 2 * pad) * 0.92;
              if (i === 0) c.moveTo(x, y);
              else c.lineTo(x, y);
            }
          }
          c.stroke();
        }
        c.globalAlpha = 1;
      }
    }

    // ---- main frame -------------------------------------------------------
    function label(text: string, x: number, y: number, colour: string, align: CanvasTextAlign = "center", size = font) {
      ctx!.font = `500 ${size}px ${paletteRef.current?.mono ?? "monospace"}`;
      ctx!.fillStyle = colour;
      ctx!.textAlign = align;
      ctx!.fillText(text, x, y);
    }

    function arrow(x: number, y0: number, y1: number, colour: string, width = 7) {
      const dir = Math.sign(y1 - y0);
      ctx!.fillStyle = colour;
      ctx!.fillRect(x - width / 2, Math.min(y0, y1 - dir * 12), width, Math.abs(y1 - dir * 12 - y0));
      ctx!.beginPath();
      ctx!.moveTo(x - width * 1.6, y1 - dir * 14);
      ctx!.lineTo(x + width * 1.6, y1 - dir * 14);
      ctx!.lineTo(x, y1);
      ctx!.closePath();
      ctx!.fill();
    }

    function drawFrame(t: number) {
      const pal = paletteRef.current;
      if (!pal) return;
      const now = performance.now();
      const sec = now / 1000;
      const intro = reduce ? 1 : smooth(0, 1500, t);
      const outro = reduce ? 1 : 1 - smooth(LOOP - 900, LOOP, t);
      const hover = hoverRef.current;
      const heatAlpha = reduce ? 1 : smooth(6500, 10500, t) * outro;

      ctx!.clearRect(0, 0, LW, LH);

      // Tissue slab
      ctx!.fillStyle = pal.raised;
      ctx!.fillRect(T.x, T.y, T.w, T.h);
      const warm = ctx!.createLinearGradient(0, T.y, 0, T.y + T.h);
      warm.addColorStop(0, pal.gold);
      warm.addColorStop(1, pal.bg);
      ctx!.globalAlpha = 0.07;
      ctx!.fillStyle = warm;
      ctx!.fillRect(T.x, T.y, T.w, T.h);
      ctx!.globalAlpha = 1;

      // Heat maps: deepest banana first
      if (snap && heatAlpha > 0) {
        if (heatDirty) rebuildHeat();
        ctx!.save();
        ctx!.beginPath();
        ctx!.rect(T.x, T.y, T.w, T.h);
        ctx!.clip();
        ctx!.imageSmoothingEnabled = true;
        ctx!.imageSmoothingQuality = "high";
        for (let d = 2; d >= 0; d--) {
          // Few photons early on: blur more, sharpen as counts build.
          const grain = 1 - clamp01(snap.hits[d] / 900);
          ctx!.filter = `blur(${(Math.max(1.5, 2 / scale) + grain * 5).toFixed(1)}px)`;
          ctx!.globalAlpha = heatAlpha * (hover === null || hover === d ? 0.62 : 0.12);
          ctx!.drawImage(tinted[d], T.x, T.y, T.w, T.h);
        }
        ctx!.filter = "none";
        ctx!.restore();
        ctx!.globalAlpha = 1;
      }

      // Scatterers
      ctx!.fillStyle = pal.text;
      ctx!.globalAlpha = 0.16;
      for (const s of STATIC) {
        ctx!.beginPath();
        ctx!.arc(px(s.x), py(s.y), 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 0.75;
      ctx!.fillStyle = pal.blood;
      for (const b of BLOOD) {
        const drift = reduce ? 0 : sec;
        const x = b.x + Math.sin(drift * 0.6 + b.phase) * 0.7;
        const y = b.y + Math.cos(drift * 0.45 + b.phase * 1.7) * 0.5;
        ctx!.beginPath();
        ctx!.ellipse(px(x), py(y), 3.2, 2.2, b.phase, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      // Surface line
      ctx!.strokeStyle = pal.text;
      ctx!.globalAlpha = 0.45;
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.moveTo(T.x, T.y);
      ctx!.lineTo(T.x + T.w, T.y);
      ctx!.stroke();
      ctx!.globalAlpha = 1;

      // Photons
      for (let i = anims.length - 1; i >= 0; i--) {
        const a = anims[i];
        const dist = ((now - a.start) / 1000) * a.speed;
        const total = a.cum[a.cum.length - 1];
        const colour = a.det >= 0 ? pal.det[a.det] : pal.text;
        const heroFade = a.hero ? 1 - smooth(6200, 7600, t) : 1;
        if (dist - total > a.trail || t > LOOP - 200 || heroFade <= 0) {
          anims.splice(i, 1);
          continue;
        }
        const n = a.cum.length;
        ctx!.lineWidth = a.hero ? 2 : a.det >= 0 ? 1.6 : 1;
        ctx!.strokeStyle = colour;
        for (let j = 1; j < n; j++) {
          if (a.cum[j - 1] > dist) break;
          const age = dist - a.cum[j];
          if (age > a.trail) continue;
          const fade = a.hero ? 1 - smooth(0, a.trail, age) * 0.6 : 1 - age / a.trail;
          ctx!.globalAlpha = (a.det >= 0 ? 0.95 : 0.4) * fade * outro * heroFade;
          const x0 = a.pts[(j - 1) * 2];
          const y0 = a.pts[(j - 1) * 2 + 1];
          let x1 = a.pts[j * 2];
          let y1 = a.pts[j * 2 + 1];
          if (a.cum[j] > dist) {
            const f = (dist - a.cum[j - 1]) / (a.cum[j] - a.cum[j - 1]);
            x1 = x0 + (x1 - x0) * f;
            y1 = y0 + (y1 - y0) * f;
          }
          ctx!.beginPath();
          ctx!.moveTo(px(x0), py(y0));
          ctx!.lineTo(px(x1), py(y1));
          ctx!.stroke();
          if (a.cum[j] <= dist && j < n - 1) {
            if (a.hero) {
              ctx!.fillStyle = colour;
              ctx!.beginPath();
              ctx!.arc(px(x1), py(y1), 2.2, 0, Math.PI * 2);
              ctx!.fill();
            }
            if (a.dynamic.has(j) && !a.fired.has(j)) {
              a.fired.add(j);
              flashes.push({ x: x1, y: y1, t: now });
            }
          }
        }
        // Photon head
        if (dist < total) {
          let j = 1;
          while (j < n - 1 && a.cum[j] < dist) j++;
          const f = clamp01((dist - a.cum[j - 1]) / (a.cum[j] - a.cum[j - 1] || 1));
          const hx = a.pts[(j - 1) * 2] + (a.pts[j * 2] - a.pts[(j - 1) * 2]) * f;
          const hy = a.pts[(j - 1) * 2 + 1] + (a.pts[j * 2 + 1] - a.pts[(j - 1) * 2 + 1]) * f;
          ctx!.globalAlpha = outro * heroFade;
          ctx!.fillStyle = a.hero ? pal.gold : colour;
          ctx!.shadowColor = a.hero ? pal.gold : colour;
          ctx!.shadowBlur = a.hero ? 14 : 6;
          ctx!.beginPath();
          ctx!.arc(px(hx), py(hy), a.hero ? 4 : 2.4, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.shadowBlur = 0;
        } else if (a.det >= 0 && !a.fired.has(-1)) {
          a.fired.add(-1);
          pulses[a.det] = now;
        }
      }
      ctx!.globalAlpha = 1;

      // Red blood cell hits
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        const age = (now - f.t) / 700;
        if (age > 1) {
          flashes.splice(i, 1);
          continue;
        }
        ctx!.strokeStyle = pal.blood;
        ctx!.globalAlpha = (1 - age) * outro;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.arc(px(f.x), py(f.y), 4 + age * 12, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.fillStyle = pal.blood;
        ctx!.beginPath();
        ctx!.arc(px(f.x), py(f.y), 3.5, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      // Mean photon paths and penetration depth
      let focus: number | null = hover;
      if (means) {
        for (let d = 0; d < 3; d++) {
          const reveal = reduce ? 1 : smooth(14000 + d * 1500, 15200 + d * 1500, t) * outro;
          if (reveal <= 0) continue;
          if (hover === null && reveal > 0 && !reduce) focus = d;
          const m = means[d].pts;
          const upto = Math.max(2, Math.round(m.length * reveal));
          ctx!.strokeStyle = pal.det[d];
          ctx!.globalAlpha = hover === null || hover === d ? 1 : 0.3;
          ctx!.lineWidth = 2.5;
          ctx!.setLineDash([]);
          ctx!.beginPath();
          for (let i = 0; i < upto; i++) {
            const [x, y] = m[i];
            if (i === 0) ctx!.moveTo(px(x), py(y));
            else ctx!.lineTo(px(x), py(y));
          }
          ctx!.stroke();
        }
        ctx!.globalAlpha = 1;
        if (reduce && hover === null) focus = 2;
        if (focus !== null) {
          const m = means[focus];
          const peak = m.pts.reduce((best, p) => (p[1] > best[1] ? p : best), m.pts[0]);
          const show = reduce || hover !== null ? 1 : smooth(14000 + focus * 1500 + 600, 15200 + focus * 1500, t) * outro;
          ctx!.globalAlpha = show;
          ctx!.strokeStyle = pal.text;
          ctx!.lineWidth = 1.2;
          ctx!.setLineDash([4, 4]);
          ctx!.beginPath();
          ctx!.moveTo(px(peak[0]), T.y);
          ctx!.lineTo(px(peak[0]), py(m.depth));
          ctx!.stroke();
          ctx!.setLineDash([]);
          ctx!.beginPath();
          ctx!.moveTo(px(peak[0]) - 6, py(m.depth));
          ctx!.lineTo(px(peak[0]) + 6, py(m.depth));
          ctx!.stroke();
          label(`penetration depth ≈ ${m.depth.toFixed(0)} mm`, px(peak[0]) + 10, py(m.depth) + font * 1.4, pal.text, "left");
          ctx!.globalAlpha = 1;
        }
      }

      // Header: source, detectors, separation
      ctx!.globalAlpha = intro;
      // Narrow screens: shorter labels, no "Detected light" heading.
      const narrow = scale < 0.75;
      const labelY = narrow ? font + 6 : 36;
      arrow(px(0), 44, T.y - 2, pal.gold);
      label(narrow ? "Source" : "Source light", px(0), narrow ? labelY : 30, pal.text);
      if (!narrow) label("Detected light", (px(SIM.detectors[0]) + px(SIM.detectors[2])) / 2, 14, pal.text);
      SIM.detectors.forEach((d, i) => {
        const pulse = 1 - clamp01((now - pulses[i]) / 500);
        const dim = hover === null || hover === i ? 1 : 0.35;
        ctx!.globalAlpha = intro * dim;
        arrow(px(d), T.y - 4, 48 - pulse * 6, pal.det[i], 7 + pulse * 3);
        label(narrow ? RHO[i] : `ρ = ${RHO[i]}`, px(d), labelY, pal.det[i]);
      });
      const sd = focus ?? 2;
      ctx!.globalAlpha = intro * 0.85;
      ctx!.strokeStyle = pal.text;
      ctx!.lineWidth = 1.2;
      const ly = T.y + 16;
      ctx!.beginPath();
      ctx!.moveTo(px(0), ly);
      ctx!.lineTo(px(SIM.detectors[sd]), ly);
      ctx!.moveTo(px(0), ly - 5);
      ctx!.lineTo(px(0), ly + 5);
      ctx!.moveTo(px(SIM.detectors[sd]), ly - 5);
      ctx!.lineTo(px(SIM.detectors[sd]), ly + 5);
      ctx!.stroke();
      label("S–D distance", (px(0) + px(SIM.detectors[sd])) / 2, ly + font * 1.3, pal.text);
      ctx!.globalAlpha = 1;

      // Fluence legend
      const lg = ctx!.createLinearGradient(0, T.y, 0, T.y + T.h);
      lg.addColorStop(0, pal.gold);
      lg.addColorStop(1, pal.raised);
      ctx!.fillStyle = lg;
      ctx!.fillRect(T.x + T.w + 12, T.y, 10, T.h);
      label("max", T.x + T.w + 17, T.y - 8, pal.text, "center", font * 0.85);
      label("min", T.x + T.w + 17, T.y + T.h + font * 1.2, pal.text, "center", font * 0.85);
      ctx!.save();
      ctx!.translate(T.x + T.w + 36, T.y + T.h / 2);
      ctx!.rotate(Math.PI / 2);
      label("fluence", 0, 0, pal.text, "center", font * 0.85);
      ctx!.restore();

      // Captions
      ctx!.globalAlpha = 0.6;
      label("SIMULATED · 2D MONTE CARLO", T.x + 10, T.y + T.h - 10, pal.text, "left", font * 0.8);
      ctx!.globalAlpha = reduce ? 0 : (smooth(1600, 2200, t) - smooth(5600, 6400, t)) * 0.9;
      label("one photon, ~50 scattering events", px(SIM.detectors[1]), T.y + T.h - 40, pal.gold, "center");
      ctx!.globalAlpha = 1;
    }

    // ---- timeline ---------------------------------------------------------
    let raf = 0;
    let visible = false;
    let elapsed = 0;
    let lastNow = 0;
    let heroLaunched = false;
    let meansFrozen = false;

    const startLoop = () => {
      send("reset");
      snap = null;
      means = null;
      meansFrozen = false;
      heroLaunched = false;
      anims.length = 0;
      queue.length = 0;
      flashes.length = 0;
      drawInsets();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) {
        lastNow = now;
        return;
      }
      elapsed += Math.min(100, now - (lastNow || now));
      lastNow = now;
      if (elapsed >= LOOP) {
        elapsed %= LOOP;
        startLoop();
      }
      const t = elapsed;

      if (!heroLaunched && t > 1500) {
        heroLaunched = true;
        const walk = detectedWalk(0);
        const len = walkLength(walk);
        anims.push(makeAnim(walk.pts, { start: now, speed: len / 4.2, trail: 1e9, det: 0, hero: true, dynamic: walk.dynamic }));
      }
      if (t > 6000 && t < 18500) send("run");
      if (t >= 18500) send("pause");
      if (t > 6000 && t < 17500 && now - lastSpawn > 160) {
        lastSpawn = now;
        const walk: Walk = walkPhoton();
        anims.push(makeAnim(walk.pts, { start: now, speed: 70, trail: 22, det: -1, dynamic: walk.dynamic, maxLen: 90 }));
      }
      if (t > 6000 && t < 17500 && queue.length && now - lastSample > 260) {
        lastSample = now;
        const s = queue.shift()!;
        anims.push(makeAnim(s.pts, { start: now, speed: 170, trail: 40, det: s.d }));
      }
      if (!meansFrozen && t > 13800 && snap) {
        meansFrozen = true;
        means = snap.grids.map((g, d) => meanPath(g, d));
      }
      drawFrame(t);
    };

    const walkLength = (w: Walk) => {
      let len = 0;
      for (let i = 2; i < w.pts.length; i += 2) len += Math.hypot(w.pts[i] - w.pts[i - 2], w.pts[i + 1] - w.pts[i - 1]);
      return len;
    };

    if (sim) {
      sim.worker.onmessage = (e: MessageEvent<Snapshot>) => {
        snap = e.data;
        heatDirty = true;
        if (!reduce) {
          for (const s of e.data.samples) if (queue.length < 12) queue.push(s);
          drawInsets();
          return;
        }
        drawInsets();
        if (e.data.hits[2] >= 350) {
          send("pause");
          means = e.data.grids.map((g, d) => meanPath(g, d));
          drawFrame(LOOP - 1500);
        }
      };
    }

    redrawRef.current = () => {
      heatDirty = true;
      drawInsets();
      if (reduce) drawFrame(LOOP - 1500);
    };

    // Pointer: hover or tap a detector to focus its banana.
    const pick = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / scale;
      let best: number | null = null;
      let bestDist = 40;
      SIM.detectors.forEach((d, i) => {
        const dist = Math.abs(px(d) - x);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      hoverRef.current = best;
      setActive(best);
      drawInsets();
      if (reduce) drawFrame(LOOP - 1500);
    };
    const leave = () => {
      hoverRef.current = null;
      setActive(null);
      drawInsets();
      if (reduce) drawFrame(LOOP - 1500);
    };
    canvas.addEventListener("pointermove", pick);
    canvas.addEventListener("pointerdown", pick);
    canvas.addEventListener("pointerleave", leave);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) send("pause");
      else if (reduce) send("run");
    });
    io.observe(wrap);

    if (!reduce) raf = requestAnimationFrame(frame);
    else drawFrame(LOOP - 1500);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", pick);
      canvas.removeEventListener("pointerdown", pick);
      canvas.removeEventListener("pointerleave", leave);
      sim?.dispose();
      redrawRef.current = () => {};
    };
  }, [reduce]);

  const chip = (i: number) =>
    `inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-xs transition-colors ${
      active === null || active === i ? "border-line text-body" : "border-transparent text-muted"
    }`;
  const swatch = ["bg-primary", "bg-[oklch(70%_0.16_300)]", "bg-gold"];

  return (
    <figure className="relative w-full">
      <div className="relative border border-line bg-bg-light/60 p-3 sm:p-5">
        {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "right-0 bottom-0 border-r-2 border-b-2"].map((pos) => (
          <span key={pos} aria-hidden className={`absolute h-4 w-4 border-primary ${pos}`} />
        ))}
        <div ref={wrapRef} className="w-full">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Simulated photon migration in tissue. Light enters at a source, scatters many times, and the photons that reach detectors 1, 2 and 3 centimetres away trace banana-shaped paths that reach deeper as the separation grows."
            className="block w-full touch-pan-y"
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">TRS · photon time of flight</p>
            <canvas ref={trsRef} aria-hidden className="mt-2 block h-24 w-full" />
            <p className="flex justify-between font-mono text-[10px] text-muted">
              <span>0</span>
              <span>time → 3 ns</span>
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">DCS · intensity autocorrelation <span className="normal-case">g₂(τ)</span></p>
            <canvas ref={dcsRef} aria-hidden className="mt-2 block h-24 w-full" />
            <p className="flex justify-between font-mono text-[10px] text-muted">
              <span>10⁻⁷ s</span>
              <span><span className="normal-case">τ</span> (log) → 10⁻² s</span>
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center gap-2">
        {RHO.map((rho, i) => (
          <button
            key={rho}
            type="button"
            className={chip(i)}
            onPointerEnter={() => {
              hoverRef.current = i;
              setActive(i);
              redrawRef.current();
            }}
            onPointerLeave={() => {
              hoverRef.current = null;
              setActive(null);
              redrawRef.current();
            }}
            onFocus={() => {
              hoverRef.current = i;
              setActive(i);
              redrawRef.current();
            }}
            onBlur={() => {
              hoverRef.current = null;
              setActive(null);
              redrawRef.current();
            }}
          >
            <span aria-hidden className={`h-2 w-2 ${swatch[i]}`} />
            ρ = {rho}
          </button>
        ))}
        <span className="ml-auto text-sm text-muted">Longer separation, longer path, deeper banana, faster DCS decay.</span>
      </figcaption>
    </figure>
  );
}
