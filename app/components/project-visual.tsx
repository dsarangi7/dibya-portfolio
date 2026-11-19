"use client";

/**
 * Original, abstract engineering schematics for each featured project.
 * They stand in for Hamish's 3D device mockups: no screenshots, no real data,
 * no internal architecture — just the shape of the idea, drawn on scroll.
 */
import { motion, useReducedMotion, type SVGMotionProps } from "framer-motion";
import type { ProjectVisualKind } from "@/app/lib/portfolio";
import { fastOutSlowIn } from "@/app/components/motion/reveal";

const CYAN = "var(--primary)";
const GOLD = "var(--gold)";
const DIM = "color-mix(in oklab, white 22%, transparent)";
const FAINT = "color-mix(in oklab, white 8%, transparent)";

function Draw({ delay = 0, duration = 1.4, ...props }: SVGMotionProps<SVGPathElement> & { delay?: number; duration?: number }) {
  return (
    <motion.path
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ pathLength: { duration, delay, ease: fastOutSlowIn }, opacity: { duration: 0.2, delay } }}
      {...props}
    />
  );
}

function Pop({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.5, delay, ease: fastOutSlowIn }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      {children}
    </motion.g>
  );
}

function Label({ x, y, children, colour = DIM, anchor = "start" }: { x: number; y: number; children: string; colour?: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} fill={colour} fontSize="11" fontFamily="var(--font-code)" letterSpacing="0.08em" textAnchor={anchor}>
      {children}
    </text>
  );
}

/** Synthetic cell traces: seven agree, one drifts and gets flagged. */
function BatteryVisual() {
  const traces = Array.from({ length: 7 }, (_, i) => {
    const offset = 190 + i * 7;
    return `M40 ${offset} C 140 ${offset - 40}, 220 ${offset + 30}, 320 ${offset - 10} S 470 ${offset - 50}, 560 ${offset - 30}`;
  });
  return (
    <>
      {[120, 180, 240, 300, 360].map((y) => (
        <line key={y} x1="40" x2="560" y1={y} y2={y} stroke={FAINT} />
      ))}
      <Label x={40} y={96}>CELL VOLTAGE · SYNTHETIC</Label>
      {traces.map((d, i) => (
        <Draw key={i} d={d} stroke={CYAN} strokeOpacity={0.3 + i * 0.06} strokeWidth={1.2} delay={0.1 + i * 0.06} />
      ))}
      <Draw d="M40 214 C 140 174, 220 244, 320 214 S 450 230, 560 292" stroke={GOLD} strokeWidth={2.5} delay={0.7} duration={1.8} />
      <Draw d="M410 150 V 380" stroke={GOLD} strokeOpacity={0.4} strokeDasharray="4 6" delay={2.2} duration={0.6} />
      <Pop delay={2.4}>
        <circle cx="520" cy="268" r="14" fill="none" stroke={GOLD} strokeWidth="2" />
        <circle cx="520" cy="268" r="4" fill={GOLD} />
      </Pop>
      <Pop delay={2.6}>
        <rect x="400" y="300" width="150" height="34" rx="2" fill="var(--background)" stroke={GOLD} strokeOpacity="0.6" />
        <Label x={412} y={321} colour={GOLD}>DRIFT FLAGGED</Label>
      </Pop>
      <Label x={40} y={400}>baseline adapts per condition</Label>
    </>
  );
}

/** Assembly tree with a revision flowing through approval. */
function BomVisual() {
  const parts = [100, 190, 280, 370, 460];
  return (
    <>
      <Label x={300} y={80} anchor="middle">ASSEMBLY · REV C</Label>
      <Pop delay={0.1}>
        <rect x="240" y="96" width="120" height="44" rx="2" fill="none" stroke={CYAN} strokeWidth="2" />
      </Pop>
      {[170, 430].map((x, i) => (
        <g key={x}>
          <Draw d={`M300 140 V 170 H ${x} V 200`} stroke={DIM} strokeWidth={1.5} delay={0.4 + i * 0.1} duration={0.8} />
          <Pop delay={0.9 + i * 0.1}>
            <rect x={x - 60} y="200" width="120" height="38" rx="2" fill="none" stroke={DIM} strokeWidth="1.5" />
          </Pop>
        </g>
      ))}
      {parts.map((x, i) => {
        const parent = i < 3 ? 170 : 430;
        return (
          <g key={x}>
            <Draw d={`M${parent} 238 V 262 H ${x} V 290`} stroke={FAINT} strokeWidth={1.5} delay={1.2 + i * 0.06} duration={0.6} />
            <Pop delay={1.5 + i * 0.06}>
              <rect x={x - 32} y="290" width="64" height="30" rx="2" fill="none" stroke={i === 3 ? GOLD : DIM} strokeWidth={i === 3 ? 2 : 1} />
            </Pop>
          </g>
        );
      })}
      <Pop delay={2.1}>
        <Label x={370} y={346} colour={GOLD} anchor="middle">B → C</Label>
      </Pop>
      <Draw d="M60 400 H 540" stroke={FAINT} strokeWidth={1} delay={2.2} duration={0.6} />
      {["DRAFT", "REVIEW", "APPROVED", "ERP"].map((step, i) => (
        <Pop key={step} delay={2.4 + i * 0.18}>
          <circle cx={90 + i * 140} cy="400" r="6" fill={i === 3 ? CYAN : "var(--background)"} stroke={CYAN} strokeWidth="2" />
          <Label x={90 + i * 140} y={426} anchor="middle">{step}</Label>
        </Pop>
      ))}
    </>
  );
}

/** Documents → chunks → retrieval → local model → cited answer. */
function RagVisual() {
  const reduce = useReducedMotion();
  return (
    <>
      <Label x={40} y={90}>LOCAL · NOTHING LEAVES THE MACHINE</Label>
      {[0, 1, 2].map((i) => (
        <Pop key={i} delay={0.1 + i * 0.1}>
          <rect x={50 + i * 8} y={150 + i * 8} width="80" height="100" rx="2" fill="var(--background)" stroke={DIM} strokeWidth="1.5" />
        </Pop>
      ))}
      <Label x={58} y={300}>DOCS</Label>
      <Draw d="M150 210 H 220" stroke={DIM} strokeWidth={1.5} delay={0.5} duration={0.5} />
      {Array.from({ length: 12 }, (_, i) => (
        <Pop key={i} delay={0.8 + i * 0.04}>
          <circle cx={240 + (i % 4) * 22} cy={175 + Math.floor(i / 4) * 30} r="5" fill={i === 5 || i === 10 ? GOLD : CYAN} fillOpacity={i === 5 || i === 10 ? 1 : 0.4} />
        </Pop>
      ))}
      <Label x={238} y={300}>VECTOR INDEX</Label>
      <Draw d="M330 205 C 360 205, 360 210, 390 210" stroke={GOLD} strokeWidth={2} delay={1.5} duration={0.5} />
      <Pop delay={1.8}>
        <rect x="390" y="170" width="90" height="80" rx="2" fill="none" stroke={CYAN} strokeWidth="2" />
        <Label x={435} y={215} colour={CYAN} anchor="middle">LLM</Label>
      </Pop>
      <Draw d="M480 210 H 530 V 330 H 120" stroke={CYAN} strokeWidth={1.5} delay={2.1} duration={1} />
      <Pop delay={2.9}>
        <rect x="120" y="310" width="300" height="40" rx="2" fill="var(--background)" stroke={CYAN} strokeOpacity="0.6" />
        <Label x={136} y={334} colour={CYAN}>ANSWER + SOURCE [2]</Label>
      </Pop>
      {!reduce && (
        <motion.circle
          r="3.5"
          fill={GOLD}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 1, 0], cx: [150, 220, 390, 480], cy: [210, 210, 210, 210] }}
          viewport={{ once: false }}
          transition={{ duration: 2.4, delay: 3, repeat: Infinity, repeatDelay: 1.2 }}
        />
      )}
    </>
  );
}

/** Pulsed source → tissue → detector, with the time-of-flight curve. */
function OpticsVisual() {
  return (
    <>
      <Label x={40} y={90}>TIME-DOMAIN DIFFUSE OPTICS</Label>
      <Pop delay={0.1}>
        <rect x="50" y="150" width="70" height="40" rx="2" fill="none" stroke={GOLD} strokeWidth="2" />
        <Label x={85} y={210} anchor="middle">LASER</Label>
      </Pop>
      <Draw d="M120 170 H 200" stroke={GOLD} strokeWidth={2} delay={0.4} duration={0.5} />
      <motion.path
        d="M190 230 Q 300 150 410 230 L 410 260 Q 300 340 190 260 Z"
        fill="color-mix(in oklab, var(--primary) 6%, transparent)"
        stroke={DIM}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <Label x={300} y={355} anchor="middle">TISSUE</Label>
      <Draw d="M200 170 C 230 250, 260 200, 290 260 S 340 210, 370 250 S 400 190, 420 170" stroke={CYAN} strokeWidth={1.5} strokeOpacity={0.7} delay={0.9} duration={1.2} />
      <Draw d="M200 170 C 240 280, 300 290, 340 240 S 400 200, 420 170" stroke={CYAN} strokeWidth={1.5} strokeOpacity={0.4} delay={1.1} duration={1.2} />
      <Draw d="M420 170 H 470" stroke={CYAN} strokeWidth={2} delay={2} duration={0.4} />
      <Pop delay={2.2}>
        <rect x="470" y="150" width="70" height="40" rx="2" fill="none" stroke={CYAN} strokeWidth="2" />
        <Label x={505} y={210} anchor="middle">DETECTOR</Label>
      </Pop>
      <line x1="60" x2="540" y1="420" y2="420" stroke={FAINT} />
      <Draw d="M60 420 C 120 420, 130 300, 160 300 C 200 300, 260 400, 540 416" stroke={CYAN} strokeWidth={2} delay={2.4} duration={1.4} />
      <Label x={540} y={440} anchor="end">photon arrival time →</Label>
    </>
  );
}

const visuals: Record<ProjectVisualKind, () => React.ReactElement> = {
  battery: BatteryVisual,
  bom: BomVisual,
  rag: RagVisual,
  optics: OpticsVisual,
};

const watermark: Record<ProjectVisualKind, string> = {
  battery: "V(t)",
  bom: "ΔREV",
  rag: "∑ctx",
  optics: "hν",
};

export function ProjectVisual({ kind, label }: { kind: ProjectVisualKind; label: string }) {
  const Visual = visuals[kind];
  return (
    <figure className="relative w-full">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -bottom-10 font-mono text-[clamp(4rem,12vw,9rem)] leading-none font-medium text-title/[0.04] select-none"
      >
        {watermark[kind]}
      </span>
      <div className="relative border border-line bg-bg-light/60">
        {/* corner ticks */}
        {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "right-0 bottom-0 border-r-2 border-b-2"].map((pos) => (
          <span key={pos} aria-hidden className={`absolute h-4 w-4 border-primary ${pos}`} />
        ))}
        <svg viewBox="0 40 600 420" role="img" aria-label={label} className="block h-auto w-full">
          <Visual />
        </svg>
      </div>
    </figure>
  );
}
