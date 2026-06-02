"use client";

import { DjsMonogram } from "@/app/components/visual-system";

const particles = [
  ["left-[14%] top-[18%]", "h-1.5 w-1.5", "animation-delay-[-1.2s]"],
  ["left-[23%] top-[72%]", "h-1 w-1", "animation-delay-[-2.7s]"],
  ["left-[38%] top-[12%]", "h-1 w-1", "animation-delay-[-0.4s]"],
  ["left-[68%] top-[16%]", "h-1.5 w-1.5", "animation-delay-[-3.4s]"],
  ["left-[78%] top-[64%]", "h-1 w-1", "animation-delay-[-1.9s]"],
  ["left-[54%] top-[82%]", "h-1.5 w-1.5", "animation-delay-[-2.2s]"],
  ["left-[86%] top-[36%]", "h-1 w-1", "animation-delay-[-0.9s]"],
  ["left-[9%] top-[44%]", "h-1 w-1", "animation-delay-[-3.9s]"],
];

export function HeroHologramIllustration() {
  return (
    <div
      className="hero-hologram relative mx-auto flex aspect-square w-full max-w-[42rem] items-center justify-center"
      aria-hidden="true"
    >
      <div className="hero-hologram__aura absolute inset-[7%] rounded-full" />
      <div className="hero-hologram__grid absolute inset-[8%] rounded-full opacity-70" />

      {particles.map(([position, size, delay]) => (
        <span
          key={`${position}-${delay}`}
          className={`hero-hologram__particle absolute ${position} ${size} ${delay} rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(103,232,249,0.85)]`}
        />
      ))}

      <svg
        viewBox="0 0 720 720"
        className="relative z-10 h-full w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="coreGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(360 354) rotate(90) scale(192)">
            <stop stopColor="#67e8f9" stopOpacity="0.9" />
            <stop offset="0.36" stopColor="#2563eb" stopOpacity="0.38" />
            <stop offset="1" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="batterySkin" x1="278" y1="214" x2="448" y2="506" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8df6ff" />
            <stop offset="0.45" stopColor="#37bff2" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="goldTrace" x1="120" y1="360" x2="600" y2="360" gradientUnits="userSpaceOnUse">
            <stop stopColor="#67e8f9" stopOpacity="0" />
            <stop offset="0.32" stopColor="#67e8f9" />
            <stop offset="0.72" stopColor="#f8d36b" />
            <stop offset="1" stopColor="#f8d36b" stopOpacity="0" />
          </linearGradient>
          <filter id="softGlow" x="-60" y="-60" width="840" height="840" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.26 0 0 0 0 0.9 0 0 0 0 1 0 0 0 0.52 0"
            />
            <feBlend in="SourceGraphic" />
          </filter>
          <pattern id="circuitGrid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M44 0H0V44" stroke="#67e8f9" strokeOpacity="0.11" strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill="#67e8f9" fillOpacity="0.18" />
          </pattern>
        </defs>

        <circle cx="360" cy="360" r="260" fill="url(#circuitGrid)" opacity="0.5" />
        <circle className="hero-hologram__core-pulse" cx="360" cy="360" r="218" fill="url(#coreGlow)" />

        <g className="hero-hologram__orbit hero-hologram__orbit--slow" filter="url(#softGlow)">
          <ellipse cx="360" cy="360" rx="268" ry="88" stroke="#67e8f9" strokeOpacity="0.42" strokeWidth="2" />
          <ellipse cx="360" cy="360" rx="268" ry="88" stroke="#67e8f9" strokeOpacity="0.12" strokeWidth="14" />
        </g>

        <g className="hero-hologram__orbit hero-hologram__orbit--reverse">
          <ellipse cx="360" cy="360" rx="104" ry="286" stroke="#a78bfa" strokeOpacity="0.38" strokeWidth="2" transform="rotate(38 360 360)" />
          <ellipse cx="360" cy="360" rx="104" ry="286" stroke="#a78bfa" strokeOpacity="0.11" strokeWidth="12" transform="rotate(38 360 360)" />
        </g>

        <g className="hero-hologram__orbit hero-hologram__orbit--tilt">
          <ellipse cx="360" cy="360" rx="300" ry="122" stroke="url(#goldTrace)" strokeWidth="2" transform="rotate(-22 360 360)" />
        </g>

        <g className="hero-hologram__battery" filter="url(#softGlow)">
          <rect x="288" y="208" width="144" height="264" rx="34" fill="#07111f" fillOpacity="0.88" stroke="#67e8f9" strokeOpacity="0.62" strokeWidth="2" />
          <path d="M330 190H390C398.8 190 406 197.2 406 206V218H314V206C314 197.2 321.2 190 330 190Z" fill="#07111f" stroke="#67e8f9" strokeOpacity="0.5" strokeWidth="2" />
          <rect x="308" y="234" width="104" height="206" rx="24" fill="url(#batterySkin)" fillOpacity="0.34" />
          <path d="M360 260L322 356H360L336 430L420 332H372L398 260H360Z" fill="#e6fbff" fillOpacity="0.85" />
          <path d="M319 459H421" stroke="#f8d36b" strokeOpacity="0.68" strokeWidth="4" strokeLinecap="round" />
          <path d="M318 244H422" stroke="#67e8f9" strokeOpacity="0.42" strokeWidth="2" />
          <path d="M318 443H422" stroke="#67e8f9" strokeOpacity="0.24" strokeWidth="2" />
        </g>

        <g className="hero-hologram__telemetry">
          <path d="M148 284H226L256 312H294" stroke="#67e8f9" strokeOpacity="0.78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M430 274H488L514 250H592" stroke="#a78bfa" strokeOpacity="0.76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M434 418H502L536 454H612" stroke="#67e8f9" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M116 438H214L248 408H294" stroke="#f8d36b" strokeOpacity="0.68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M198 214H248M514 338H612M184 522H274M468 538H548" stroke="#67e8f9" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" />

          {[
            [148, 284, "#67e8f9"],
            [592, 250, "#a78bfa"],
            [612, 454, "#67e8f9"],
            [116, 438, "#f8d36b"],
            [248, 214, "#67e8f9"],
            [612, 338, "#67e8f9"],
            [184, 522, "#67e8f9"],
            [548, 538, "#f8d36b"],
          ].map(([cx, cy, color]) => (
            <g key={`${cx}-${cy}`} className="hero-hologram__node">
              <circle cx={cx as number} cy={cy as number} r="8" fill={color as string} fillOpacity="0.2" />
              <circle cx={cx as number} cy={cy as number} r="3" fill={color as string} />
            </g>
          ))}
        </g>

        <g className="hero-hologram__scan">
          <path d="M224 171H496" stroke="#67e8f9" strokeOpacity="0.34" strokeWidth="1" />
          <path d="M184 565H536" stroke="#67e8f9" strokeOpacity="0.26" strokeWidth="1" />
          <path d="M360 118V184" stroke="#f8d36b" strokeOpacity="0.38" strokeWidth="1" />
          <path d="M360 514V602" stroke="#f8d36b" strokeOpacity="0.3" strokeWidth="1" />
        </g>
      </svg>

      <div className="absolute left-[13%] top-[13%] z-20">
        <DjsMonogram className="h-16 w-16 opacity-90" />
      </div>
    </div>
  );
}
