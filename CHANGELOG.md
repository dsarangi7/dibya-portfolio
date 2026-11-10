# Changelog

## 2026-11-10 (BOM Engineering Workspace)
- Added a sanitized dashboard image to show the workspace’s item master and BOM tools.
- Added a featured case study about the R&D engineering team’s move from Excel to a governed platform for BOMs, part revisions, ECNs, and ERP handoffs.

## 2026-06-02 (Positioning and chronology correction)
- Repositioned portfolio around current battery engineering identity and corrected career chronology.
- Updated homepage copy, project summaries, skills language, SEO metadata, README, and reference docs so Dibya is presented first as a Battery R&D Engineer / Marine Battery Engineer.
- Corrected the timeline to show B.Sc. Physics (2013-2016), M.Sc. Applied Physics (2016-2018), M.Tech Applied Optics & Physics at IIT Delhi (2021-2023), ICFO PhD Research / FLIGHT Fellow period (2023-2025), and AYK Energy R&D Engineer from January 2025-present.
- Clarified that the ICFO period was PhD research / former Marie Sklodowska-Curie FLIGHT Fellowship experience, not a completed PhD.

## 2026-06-02 (IIT Delhi achievement spotlight)
- Added a modest IIT Delhi achievement video spotlight inside the Journey section near the IIT Delhi milestone.
- Embedded `public/IITD gold medal.MP4` with controls, metadata preload, no autoplay, a cinematic glass frame, contextual copy, and the requested caption.
- Kept the award treatment smaller than the ICFO spotlight so the portfolio remains focused on technical work.

## 2026-06-02 (Deployment polish)
- Added deployment-ready SEO and Open Graph metadata for the root layout, homepage, and project pages.
- Expanded the footer with LinkedIn, email, publication, project navigation, and section navigation links with accessible labels.
- Added a portfolio-styled 404 page and refreshed `README.md` with project overview, local run instructions, deployment notes, and content safety guidance.
- Added accessibility labels to major homepage, research, project, footer, video, and 404 links.
- Verified the ICFO video asset is served from `/msca-interview.mp4`, uses controls, preloads metadata, and does not autoplay.
- Fixed mobile hero text overflow by constraining the mobile hero columns and allowing safer text wrapping.

## 2026-06-02 (Static hero illustration)
- Replaced the React Three Fiber hero scene with a high-quality CSS/SVG holographic battery intelligence illustration.
- Added a reusable `HeroHologramIllustration` component with a glowing battery core, orbital rings, telemetry nodes, circuit grid, and animated particles.
- Removed the now-unused `@react-three/fiber`, `@react-three/drei`, and `three` dependencies while keeping the hero responsive and lightweight.

## 2026-06-02 (Navigation polish)
- Added homepage navigation anchors, hero CTA, and contact footer to improve recruiter usability and section discoverability.
- Strengthened homepage rhythm with an ending contact section and quick links to journey, research, projects, skills, and contact.

## 2026-06-02 (ICFO spotlight)
- Added a dedicated ICFO research spotlight component after the Research section and before Projects.
- Embedded the `public/msca-interview.mp4` interview video with controls, metadata preload, a glassmorphism frame, and a fallback message for load failure.
- Kept the spotlight recruiter-facing and sanitized, with links to the public LinkedIn FLIGHT feature and a concise caption for the Medical Photonics group in Barcelona.

## 2026-06-02 (Hero hydration cleanup)
- Removed the hero highlight parallax transform that was causing a server/client hydration mismatch warning in dev.
- Kept the cinematic hero layout and motion depth intact while making the rendered markup deterministic.

## 2026-06-02 (Hero stability)
- Removed the hero hydration mismatch by making the highlight reveal render deterministically between server and client.
- Replaced the Three.js clock-driven animation path with a delta-based elapsed-time accumulator to avoid the deprecated clock warning in dev.

## 2026-06-02 (Hero redesign)
- Rebuilt the homepage hero as a full-screen immersive section with a lightweight React Three Fiber battery intelligence core scene, orbital geometry, telemetry holograms, particles, and technical depth layers.
- Increased the hero panel visual presence with a stronger central battery core, more orbital rings, telemetry nodes, and depth layers for a premium engineering dashboard feel.
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
