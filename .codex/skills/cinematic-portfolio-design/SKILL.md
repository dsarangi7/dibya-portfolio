# Cinematic Portfolio Design

Use this skill before visual, layout, motion, or homepage experience changes for Dibya Jyoti Sarangi's portfolio.

Purpose:
Create a premium cinematic engineering interface with 3D/WebGL depth, glassmorphism, high-end motion, and MoncyDev-inspired interaction quality without copying any specific design.

Core direction:
- Preserve the portfolio's recruiter-facing clarity while making the experience feel immersive and technically sophisticated.
- Use a dark cinematic base with neon cyan, electric blue, violet, and restrained gold accents.
- Favor layered depth: background atmosphere, midground holographic panels, and foreground readable content.
- Use Three.js or React Three Fiber only when it adds real depth or interaction value.
- Keep motion slow, intentional, and cinematic; avoid random animation noise.
- Respect `prefers-reduced-motion` and keep mobile performance conservative.

Interaction standards:
- Build section transitions that feel like chapters in an engineering story.
- Use scroll reveals, parallax, sticky storytelling, hover depth, glow, and subtle border tracing where appropriate.
- Make interface elements feel tactile and precise, not childish or game-like.
- Keep typography strong, spacious, and recruiter-readable.

Implementation guardrails:
- Keep reusable components and do not break existing routes or project detail pages.
- Avoid exposing confidential company data or proprietary project details.
- Check `docs/references` before changing content or visual positioning.
- After major visual work, update `TASKS.md` and `CHANGELOG.md`.
- Run lint and build after implementation and fix any errors.
