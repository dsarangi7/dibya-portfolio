import Link from "next/link";
import { featuredProjects } from "@/app/lib/portfolio";
import { DjsMonogram } from "@/app/components/visual-system";

const publicationUrl = "https://opg.optica.org/boe/fulltext.cfm?uri=boe-15-12-7035";
const linkedInUrl = "https://www.linkedin.com/in/dibya-jyoti-sarangi37";

export function Footer() {
  return (
    <footer id="contact" className="px-6 pb-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="visual-card rounded-[2rem] p-8">
          <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <DjsMonogram className="h-10 w-10" />
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Contact</p>
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Let&apos;s solve marine battery analytics, diagnostics, and engineering AI together.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                Reach out for Battery R&D and Marine Battery Engineering roles that need analytics, telemetry diagnostics, engineering software, and AI-assisted workflow intelligence.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:dsarangi7@gmail.com"
                  aria-label="Email Dibya Jyoti Sarangi"
                  className="rounded-full border border-cyan-300/15 bg-white/5 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
                >
                  dsarangi7@gmail.com
                </a>
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Dibya Jyoti Sarangi LinkedIn profile"
                  className="rounded-full border border-cyan-300/15 bg-white/5 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
                >
                  LinkedIn
                </a>
                <a
                  href={publicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Dibya Jyoti Sarangi public optics publication"
                  className="rounded-full border border-cyan-300/15 bg-white/5 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
                >
                  Publication
                </a>
              </div>
            </div>

            <nav
              aria-label="Footer project and section navigation"
              className="grid gap-6 sm:grid-cols-2"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Projects</p>
                <div className="mt-4 grid gap-3">
                  {featuredProjects.map((project) => (
                    <Link
                      key={project.title}
                      href={project.link}
                      aria-label={`Open project page: ${project.title}`}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/25 hover:bg-cyan-300/10 hover:text-white"
                    >
                      {project.title}
                    </Link>
                  ))}
                  <a
                    href="https://batterycalculators.com/about/"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/25 hover:bg-cyan-300/10 hover:text-white"
                  >
                    Battery Calculators ↗
                  </a>
                </div>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Sections</p>
                <div className="mt-4 grid gap-3">
                  {[
                    ["Journey", "/#journey"],
                    ["Research", "/#research"],
                    ["ICFO Spotlight", "/#icfo-spotlight"],
                    ["Skills", "/#skills"],
                  ].map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      aria-label={`Jump to ${label} section`}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/25 hover:bg-cyan-300/10 hover:text-white"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
