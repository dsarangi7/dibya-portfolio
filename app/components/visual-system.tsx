import type { ComponentProps, ReactNode } from "react";

type SvgProps = ComponentProps<"svg"> & {
  title?: string;
  frameClass?: string;
};

function IconFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`visual-icon-frame relative inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_36px_rgba(34,211,238,0.12)] ${className}`}
    >
      {children}
    </span>
  );
}

export function DjsMonogram({ className = "", title = "DJS monogram", ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id="djs-mark-gradient" x1="14" y1="10" x2="82" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67e8f9" />
          <stop offset="0.48" stopColor="#60a5fa" />
          <stop offset="1" stopColor="#f8d36b" />
        </linearGradient>
        <filter id="djs-mark-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.25 0 0 0 0 0.9 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend in="SourceGraphic" />
        </filter>
      </defs>
      <path
        d="M16 48C16 30.3 30.3 16 48 16h19c7.2 0 13 5.8 13 13v38c0 7.2-5.8 13-13 13H48C30.3 80 16 65.7 16 48Z"
        stroke="url(#djs-mark-gradient)"
        strokeWidth="2"
        opacity="0.9"
      />
      <path d="M48 16v64" stroke="url(#djs-mark-gradient)" strokeWidth="1.2" opacity="0.35" />
      <path d="M17 48h62" stroke="url(#djs-mark-gradient)" strokeWidth="1.2" opacity="0.25" />
      <path
        d="M29 65V31h13c9.5 0 16 6.8 16 17s-6.5 17-16 17H29Z"
        stroke="url(#djs-mark-gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#djs-mark-glow)"
      />
      <path
        d="M58 32h13M64.5 32v25c0 5.6-3.9 9-9.5 9-3.2 0-6.1-1.2-8-3.5"
        stroke="url(#djs-mark-gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#djs-mark-glow)"
      />
      <path
        d="M72 47c-2.2-2.2-5.1-3.2-8.2-3.2-4.1 0-6.8 1.7-6.8 4.3 0 6.7 17 2.4 17 12.2 0 4.9-4.2 7.7-10.7 7.7-4.5 0-8.2-1.4-10.8-4"
        stroke="url(#djs-mark-gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#djs-mark-glow)"
      />
      <circle cx="24" cy="24" r="2" fill="#67e8f9" />
      <circle cx="72" cy="72" r="2" fill="#f8d36b" />
    </svg>
  );
}

export function PhysicsIcon({ className = "h-7 w-7", frameClass = "", title = "Physics", ...props }: SvgProps) {
  return (
    <IconFrame className={frameClass}>
      <svg viewBox="0 0 32 32" role="img" aria-label={title} className={className} fill="none" {...props}>
        <circle cx="16" cy="16" r="2.6" fill="currentColor" />
        <ellipse cx="16" cy="16" rx="11" ry="4.5" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="16" cy="16" rx="11" ry="4.5" stroke="currentColor" strokeWidth="1.6" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="11" ry="4.5" stroke="currentColor" strokeWidth="1.6" transform="rotate(120 16 16)" />
      </svg>
    </IconFrame>
  );
}

export function OpticsIcon({ className = "h-7 w-7", frameClass = "", title = "Optics", ...props }: SvgProps) {
  return (
    <IconFrame className={frameClass}>
      <svg viewBox="0 0 32 32" role="img" aria-label={title} className={className} fill="none" {...props}>
        <path d="M3 16h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20 16h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13 7c4 3.1 4 14.9 0 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M19 7c-4 3.1-4 14.9 0 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M5 11l6 5-6 5" stroke="#f8d36b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconFrame>
  );
}

export function ResearchIcon({ className = "h-7 w-7", frameClass = "", title = "Research", ...props }: SvgProps) {
  return (
    <IconFrame className={frameClass}>
      <svg viewBox="0 0 32 32" role="img" aria-label={title} className={className} fill="none" {...props}>
        <path d="M12 5h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M14 5v8.5L7.5 24A3 3 0 0 0 10 28h12a3 3 0 0 0 2.5-4L18 13.5V5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 22h10" stroke="#f8d36b" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M13 18h6" stroke="#a78bfa" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </IconFrame>
  );
}

export function BatterySystemsIcon({ className = "h-7 w-7", frameClass = "", title = "Battery systems", ...props }: SvgProps) {
  return (
    <IconFrame className={frameClass}>
      <svg viewBox="0 0 32 32" role="img" aria-label={title} className={className} fill="none" {...props}>
        <rect x="8" y="5" width="16" height="22" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M13 3h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 11h8M12 21h8" stroke="#a78bfa" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M16 13.5l-2 4h3.6l-1.6 3.7" stroke="#f8d36b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconFrame>
  );
}

export function AiSystemsIcon({ className = "h-7 w-7", frameClass = "", title = "AI systems", ...props }: SvgProps) {
  return (
    <IconFrame className={frameClass}>
      <svg viewBox="0 0 32 32" role="img" aria-label={title} className={className} fill="none" {...props}>
        <rect x="9" y="9" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M13 13h6v6h-6z" stroke="#a78bfa" strokeWidth="1.3" />
        <path d="M5 12h4M5 20h4M23 12h4M23 20h4M12 5v4M20 5v4M12 23v4M20 23v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="16" r="1.6" fill="#f8d36b" />
      </svg>
    </IconFrame>
  );
}

export function ChapterDivider({ label, index }: { label: string; index: string }) {
  return (
    <div className="chapter-divider mx-auto mb-10 flex max-w-6xl items-center gap-4 px-6 sm:px-10 lg:px-16">
      <span className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-200/70">{index}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-cyan-300/50 via-blue-400/20 to-transparent" />
      <span className="font-mono text-xs uppercase tracking-[0.28em] text-slate-400">{label}</span>
    </div>
  );
}

export function HolographicDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none relative h-20 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-px w-[min(88vw,980px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-12 w-[min(84vw,900px)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.14),transparent_68%)]" />
      <div className="absolute left-[18%] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border border-cyan-200/50 bg-cyan-200/10" />
      <div className="absolute right-[18%] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border border-amber-200/50 bg-amber-200/10" />
    </div>
  );
}
