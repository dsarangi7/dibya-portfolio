import { skills } from "@/app/lib/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="px-6 pb-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Skills</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Capability areas that move projects forward.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400 sm:text-right">
              A concise blend of engineering, analytics, and software execution tuned for marine and systems-focused product development.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {skills.map((skill) => (
              <div key={skill} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 text-slate-100 transition hover:border-cyan-400/20 hover:bg-slate-900/90">
                <p className="text-base font-medium">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
