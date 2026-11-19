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
    <main className="min-h-screen px-6 pt-24 pb-16 sm:px-10 lg:pr-16 lg:pl-40 lg:pt-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="border-b border-line pb-12">
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-primary">{category}</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-title sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              aria-label="Back to the portfolio homepage"
              className="accent-link inline-flex w-fit items-center text-sm font-medium text-body"
            >
              ← Back to home
            </Link>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">{note}</p>
          </div>
        </section>

        {children}
      </div>
    </main>
  );
}
