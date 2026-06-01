import Link from "next/link";
import { ReactNode } from "react";

type ProjectDetailLayoutProps = {
  title: string;
  category: string;
  description: string;
  note: string;
  children: ReactNode;
};

export default function ProjectDetailLayout({
  title,
  category,
  description,
  note,
  children,
}: ProjectDetailLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl ring-1 ring-white/5">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">{category}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="inline-flex w-fit items-center justify-center rounded-full border border-cyan-400/20 bg-white/5 px-5 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/10"
            >
              Back to home
            </Link>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">{note}</p>
          </div>
        </section>

        {children}
      </div>
    </main>
  );
}
