import { type ComponentProps, type ReactNode } from "react";

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

/**
 * Brand mark: a battery cell with a charge bar and "dj" drawn as strokes
 * (no font dependency). Colours follow the theme tokens.
 */
export function DjsMonogram({ className = "", title = "Dibya Jyoti Sarangi", ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 48 48" role="img" aria-label={title} className={className} fill="none" {...props}>
      <g stroke="var(--text-title)" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4.5" y="12.5" width="35" height="23" rx="3.5" strokeWidth="2.6" />
        <circle cx="24.6" cy="27.6" r="3.6" strokeWidth="2.3" />
        <path d="M28.2 18.6v12.6M34.6 23.2v6.6a2.6 2.6 0 0 1-2.6 2.6" strokeWidth="2.3" />
      </g>
      <rect x="40.2" y="19.5" width="3.6" height="9" rx="1.2" fill="var(--text-title)" />
      <circle cx="34.6" cy="18.9" r="1.45" fill="var(--text-title)" />
      <rect x="8.6" y="16.6" width="8.4" height="14.8" rx="1.2" fill="var(--primary)" />
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
