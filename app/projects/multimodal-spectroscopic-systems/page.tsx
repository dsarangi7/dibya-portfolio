import ProjectDetailLayout from "@/app/components/project-detail-layout";

export const metadata = {
  title: "Multimodal Spectroscopic Systems | Dibya Jyoti Sarangi",
  description:
    "Detailed case page for multimodal spectroscopic systems, covering optical instrumentation, signal fusion, and experimental diagnostics.",
};

export default function MultimodalSpectroscopicSystemsPage() {
  return (
    <ProjectDetailLayout
      title="Multimodal Spectroscopic Systems"
      category="Research Systems"
      description="A research-oriented exploration of optical instrumentation and multimodal signal analysis for diagnostic workflows."
      note="Sanitized public-safe summary: no confidential work details are included."
    >
      <div className="space-y-8">
        <article className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5">
          <h2 className="text-2xl font-semibold text-white">Problem</h2>
          <p className="mt-4 leading-8 text-slate-300">
            Complex diagnostics require multiple optical sensing modalities to capture complementary signals. The core challenge was designing a system that fuses these channels while staying calibrated, interpretable, and usable for diagnostic research.
          </p>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5">
          <h2 className="text-2xl font-semibold text-white">Approach</h2>
          <div className="mt-4 space-y-4 text-slate-300">
            <p>
              I integrated spectroscopy, fluorescence, and diffuse optical sensing into a single experimental workflow. The approach combined instrument design with signal processing to extract meaningful features from noisy biomedical measurements.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Optical instrumentation design",
                "Multimodal data fusion",
                "Calibration and noise management",
                "Instrumentation-focused diagnostics",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-slate-300">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5">
          <h2 className="text-2xl font-semibold text-white">Technologies</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Spectroscopy & optical sensors",
              "Experimental instrumentation",
              "Signal processing",
              "Research workflow design",
            ].map((item) => (
              <div key={item} className="rounded-3xl bg-slate-900/70 p-4 ring-1 ring-white/5">
                <p className="text-sm text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-2xl font-semibold text-white">Engineering Challenges</h2>
              <ul className="mt-4 space-y-4 text-slate-300">
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  Aligning signals across modalities with different sampling rates.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  Keeping calibration stable in prototype and field environments.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  Presenting research results clearly for both technical and product stakeholders.
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="uppercase tracking-[0.2em] text-slate-400">Timeline</p>
              <div className="mt-5 space-y-4 text-slate-300">
                {[
                  "Research and optical design",
                  "Prototype instrumentation",
                  "Signal validation",
                  "Insight-driven diagnostics",
                ].map((step) => (
                  <div key={step} className="rounded-3xl bg-slate-950/80 p-4 ring-1 ring-white/5">
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5">
          <h2 className="text-2xl font-semibold text-white">Impact</h2>
          <p className="mt-4 leading-8 text-slate-300">
            The system made multimodal optical diagnostics more structured and interpretable, helping research efforts move from exploratory prototypes toward more repeatable experimental workflows.
          </p>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl ring-1 ring-white/5">
          <h2 className="text-2xl font-semibold text-white">Lessons Learned</h2>
          <ul className="mt-4 space-y-4 text-slate-300">
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              Multimodal strength comes from engineering complementary sensing channels together.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              Early calibration design is critical for practical optical systems.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              Clear research storytelling helps connect experimental design to product value.
            </li>
          </ul>
        </article>
      </div>
    </ProjectDetailLayout>
  );
}
