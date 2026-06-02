# Dibya Jyoti Sarangi Portfolio

A premium recruiter-facing engineering portfolio for Dibya Jyoti Sarangi. The site presents Dibya as a Battery R&D Engineer / Marine Battery Engineer building marine battery analytics, telemetry diagnostics, AI-enabled engineering workflows, and product-minded systems on a physics and research foundation.

The portfolio is intentionally sanitized. It does not include confidential AYK data, proprietary source code, private documents, customer information, credentials, or internal screenshots.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- CSS/SVG visual system for the current hero illustration

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open the local URL shown in the terminal. Next.js will use `http://localhost:3000` by default, or the next available port if `3000` is already in use.

## Useful Commands

```bash
npm run lint
npm run build
```

## Project Structure

- `app/page.tsx` - homepage route and section order
- `app/components` - reusable portfolio sections and visual components
- `app/projects` - sanitized project case pages
- `docs/references` - portfolio knowledge base and source context
- `public/msca-interview.mp4` - public ICFO/MSCA interview video asset
- `public/IITD gold medal.MP4` - public IIT Delhi achievement video asset

## Content Safety

Before publishing or deploying, review changes for:

- Confidential company data
- Proprietary source code
- Customer or vessel identifiers
- Credentials, private URLs, file paths, or internal documents
- Non-public performance values or test data

Use sanitized summaries and public research references only.

## Deployment

The project is ready for static-friendly Next.js deployment on Vercel or another Node-compatible host.

Set `NEXT_PUBLIC_SITE_URL` in the deployment environment if you want Open Graph metadata to resolve to the production domain. If it is not set, metadata falls back to `http://localhost:3000` during local builds.
