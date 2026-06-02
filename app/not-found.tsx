import Link from "next/link";
import { DjsMonogram } from "@/app/components/visual-system";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#030712] px-6 py-12 text-slate-100 sm:px-10 lg:px-16">
      <div className="relative isolate mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center overflow-hidden rounded-[2rem]">
        <div className="tech-grid absolute inset-0 opacity-40" />
        <div className="particles absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.16),_transparent_42%),radial-gradient(circle_at_80%_25%,_rgba(167,139,250,0.12),_transparent_28%)]" />

        <section className="visual-card relative max-w-2xl rounded-[2rem] p-8 text-center sm:p-10">
          <div className="mx-auto flex w-fit justify-center">
            <DjsMonogram className="h-16 w-16" />
          </div>
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-cyan-300/80">404 / signal lost</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            This route is outside the portfolio map.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-300">
            The page may have moved, or the link may be incomplete. Return to the portfolio homepage to continue through the research, projects, and skills sections.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              aria-label="Return to the portfolio homepage"
              className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Return home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
