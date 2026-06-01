import ProjectDetailLayout from "@/app/components/project-detail-layout";

export const metadata = {
  title: "AI Engineering Assistant | Dibya Jyoti Sarangi",
  description:
    "Detailed case page for a local AI engineering assistant focused on safe retrieval and secure knowledge workflows.",
};

export default function AiEngineeringAssistantPage() {
  return (
    <ProjectDetailLayout
      title="AI Engineering Assistant"
      category="AI Systems"
      description="A local retrieval-driven assistant designed to make engineering knowledge accessible while keeping confidential data secure."
      note="Sanitized public-safe case study: this page avoids proprietary or private company details."
    >
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-8">
          <article className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5">
            <h2 className="text-2xl font-semibold text-white">Problem</h2>
            <p className="mt-4 leading-8 text-slate-300">
              Engineering teams struggle to find the right documentation and technical context quickly. The goal was to create a secure way to query engineering knowledge without exposing confidential internal artifacts.
            </p>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5">
            <h2 className="text-2xl font-semibold text-white">Approach</h2>
            <div className="mt-4 space-y-4 text-slate-300">
              <p>
                I built a retrieval-assisted workflow that indexes sanitized engineering content and answers queries through a local model. The experience was designed so engineers can request guidance, then verify results against the source context.
              </p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  Used vector search to locate relevant technical fragments quickly.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  Built a query flow focused on engineering problems and actionable guidance.
                </li>
              </ul>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5">
            <h2 className="text-2xl font-semibold text-white">Technologies</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Python retrieval engine",
                "Local vector search",
                "Ollama local LLM integration",
                "User-focused AI workflow design",
              ].map((item) => (
                <div key={item} className="rounded-3xl bg-slate-900/70 p-4 ring-1 ring-white/5">
                  <p className="text-sm text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside className="space-y-6">
          <article className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5">
            <h2 className="text-2xl font-semibold text-white">Engineering Challenges</h2>
            <ul className="mt-4 space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                Balancing relevance with secure retrieval and privacy.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                Presenting AI responses that are useful to engineers rather than generic.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                Keeping the workflow local-first for offline-friendly environments.
              </li>
            </ul>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5">
            <h2 className="text-2xl font-semibold text-white">Impact</h2>
            <p className="mt-4 leading-8 text-slate-300">
              This design improves engineering productivity by making knowledge easier to find and safer to use. It supports consistent technical decisions without exposing confidential internal content.
            </p>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5">
            <h2 className="text-2xl font-semibold text-white">Timeline</h2>
            <div className="mt-5 space-y-4 text-slate-300">
              {[
                "Sanitized content mapping",
                "Vector index design",
                "Query-response flow",
                "Secure user validation",
              ].map((step) => (
                <div key={step} className="rounded-3xl bg-slate-900/70 p-4 ring-1 ring-white/5">
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </div>
    </ProjectDetailLayout>
  );
}
