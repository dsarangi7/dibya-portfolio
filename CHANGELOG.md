# Changelog

## 2026-06-02 (Hero redesign)
- Rebuilt the homepage hero as a full-screen immersive section with a lightweight React Three Fiber battery intelligence core scene, orbital geometry, telemetry holograms, particles, and technical depth layers.
- Added mouse and scroll parallax for cinematic motion while preserving the existing hero copy and visual identity.
- Added a WebGL fallback path for reduced-motion and non-WebGL devices.
- Installed `@react-three/fiber`, `@react-three/drei`, and `three` for the homepage hero scene.

## 2026-06-01 (Visual identity)
- Added a project-specific DJS monogram and reusable SVG visual system for physics, optics, research, battery systems, and AI systems.
- Added branded chapter dividers, holographic panel treatments, and section transition styling across the homepage.
- Unified homepage visual branding across Hero, Profile Summary, Journey, Research, Projects, and Skills without changing portfolio content or project pages.

## 2026-06-01 (Project skills)
- Added project-local Codex skills for cinematic portfolio design, engineering visual assets, recruiter storytelling, and confidentiality checks.
- Updated `AGENTS.md` to identify the primary instruction file, portfolio knowledge location, reusable skills location, and skill usage expectations for future agents.
- Updated `TASKS.md` to track project skill setup as completed maintenance work.

## 2026-06-01
- Implemented Phase 1 homepage for Dibya Jyoti Sarangi portfolio.
- Added scalable component structure under `app/components`.
- Added portfolio content data in `app/lib/portfolio.ts`.
- Implemented cinematic hero, profile summary, featured projects, and skills sections.
- Updated root `app/layout.tsx` metadata and dark theme styling.
- Updated `TASKS.md` to mark Phase 1 complete.
- Added responsive Tailwind styling and background theme in `app/globals.css`.
- Created `PROJECT_BRIEF.md`, `SECURITY_RULES.md`, `CV_MASTER.md`, and `CAREER_TIMELINE.md`.
- Reorganized portfolio documentation: moved knowledge files into `/docs/references`, created `/docs` subfolders, and removed obsolete `CLAUDE.md` to avoid duplication. AGENTS.md remains the primary instruction source.

## 2026-06-01 (content update)
- Replaced homepage placeholder content with recruiter-focused storytelling derived from portfolio knowledge files. Updated hero messaging, profile narrative, project summaries, and skills to emphasize trajectory: Physics → Research → Optics → Marine Batteries → AI Engineering → Future Vision.

## 2026-06-01 (Phase 2)
- Added cinematic enhancements: Framer Motion page transitions and scroll-driven reveals.
- Implemented technical animated grid and subtle particle layer for motion depth.
- Converted primary sections to client components with tasteful motion and hover interactions.
- Upgraded project cards to interactive, accessible hover states.
- Ensured reduced-motion support and mobile responsiveness; maintained strong performance.

## 2026-06-01 (Project pages)
- Added three detailed project case pages for Battery Analytics & Intelligent Diagnostics, AI Engineering Assistant, and Multimodal Spectroscopic Systems.
- Structured each page with Problem, Approach, Technologies, Engineering Challenges, Impact, and Lessons Learned.
- Linked homepage project cards to the new project pages.

## 2026-06-01 (Phase 3)
- Added reusable `ProjectDetailLayout` component and consistent project page structure.
- Added SEO metadata for the homepage and all project pages.
- Added a Journey section with animated timeline milestones, icons, and responsive design.
- Added a Research & Publications section with cinematic impact cards highlighting optics research, diagnostics, and research-to-industry transition.
- Added a 2024 Biomedical Optics Express publication reference and public ICFO FLIGHT research link to support the career journey from photonics research to engineering R&D.
- Added an additional external ScienceDirect citation for human thyroid diffuse optical characterization research.
- Updated `docs/references/CV_MASTER.md` with the public LinkedIn profile URL for contact references.
- Continued Phase 3 work with recruiter-focused project storytelling and confidential-safe case studies.
