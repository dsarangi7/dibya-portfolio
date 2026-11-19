import ProjectDetailLayout from "@/app/components/project-detail-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multimodal Spectroscopic Systems | Dibya Jyoti Sarangi",
  description:
    "Research foundation case page covering optical instrumentation, signal fusion, and experimental diagnostics that strengthened later battery analytics work.",
  alternates: {
    canonical: "/projects/multimodal-spectroscopic-systems",
  },
  openGraph: {
    type: "article",
    url: "/projects/multimodal-spectroscopic-systems",
    title: "Multimodal Spectroscopic Systems | Dibya Jyoti Sarangi",
    description:
      "Research foundation case page covering optical instrumentation, signal fusion, and experimental diagnostics in a public-safe summary.",
  },
};

export default function MultimodalSpectroscopicSystemsPage() {
  return (
    <ProjectDetailLayout
      title="Multimodal Spectroscopic Systems"
      category="Research Foundation"
      description="A research foundation in optical instrumentation and multimodal signal analysis that strengthened later battery diagnostics, measurement rigor, and engineering analytics."
      note="Sanitized public-safe summary: no confidential work details are included."
    >
      <div className="space-y-8">
        <article className="border border-line bg-bg-light/50 p-8">
          <h2 className="text-2xl font-medium text-title">Problem</h2>
          <p className="mt-4 leading-8 text-body">
            Complex diagnostics require multiple optical sensing modalities to capture complementary signals. The core challenge was designing a system that fuses these channels while staying calibrated, interpretable, and usable for diagnostic research.
          </p>
        </article>

        <article className="border border-line bg-bg-light/50 p-8">
          <h2 className="text-2xl font-medium text-title">Approach</h2>
          <div className="mt-4 space-y-4 text-body">
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
                <li key={item} className="flex gap-3 text-body">
                  <span className="mt-2.5 inline-flex h-2 w-2 shrink-0 bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="border border-line bg-bg-light/50 p-8">
          <h2 className="text-2xl font-medium text-title">Technologies</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Spectroscopy & optical sensors",
              "Experimental instrumentation",
              "Signal processing",
              "Research workflow design",
            ].map((item) => (
              <div key={item} className="border border-line bg-bg-raised/40 p-4">
                <p className="text-sm text-title">{item}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="border border-line bg-bg-light/50 p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="text-2xl font-medium text-title">Engineering Challenges</h2>
              <ul className="mt-4 space-y-4 text-body">
                <li className="flex gap-3">
                  <span className="mt-2.5 inline-flex h-2 w-2 shrink-0 bg-primary" />
                  Aligning signals across modalities with different sampling rates.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 inline-flex h-2 w-2 shrink-0 bg-primary" />
                  Keeping calibration stable in prototype and field environments.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 inline-flex h-2 w-2 shrink-0 bg-primary" />
                  Presenting research results clearly for both technical and product stakeholders.
                </li>
              </ul>
            </div>
            <div className="border border-line bg-bg-raised/40 p-6">
              <p className="uppercase tracking-[0.2em] text-muted">Timeline</p>
              <div className="mt-5 space-y-4 text-body">
                {[
                  "Research and optical design",
                  "Prototype instrumentation",
                  "Signal validation",
                  "Insight-driven diagnostics",
                ].map((step) => (
                  <div key={step} className="border border-line bg-bg-raised/40 p-4">
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="border border-line bg-bg-light/50 p-8">
          <h2 className="text-2xl font-medium text-title">Impact</h2>
          <p className="mt-4 leading-8 text-body">
            The system made multimodal optical diagnostics more structured and interpretable, helping research efforts move from exploratory prototypes toward more repeatable experimental workflows.
          </p>
        </article>

        <article className="border border-line bg-bg-light/50 p-8">
          <h2 className="text-2xl font-medium text-title">Research Links</h2>
          <div className="mt-5 space-y-4 text-body">
            <div className="border border-line bg-bg-raised/40 p-5">
              <p className="text-sm font-medium text-title">Published research</p>
              <p className="mt-2 text-sm text-body">
                Near-infrared diffuse optical characterization of human thyroid using ultrasound-guided hybrid time-domain and diffuse correlation spectroscopies.
              </p>
              <a
                href="https://opg.optica.org/boe/fulltext.cfm?uri=boe-15-12-7035"
                target="_blank"
                rel="noreferrer"
                aria-label="Open the published optics research"
                className="mt-3 inline-flex text-sm font-medium text-primary hover:text-title"
              >
                View the publication
              </a>
            </div>
            <div className="border border-line bg-bg-raised/40 p-5">
              <p className="text-sm font-medium text-title">Public research profile</p>
              <p className="mt-2 text-sm text-body">
                Public ICFO FLIGHT research feature highlighting the photonics research profile and credibility.
              </p>
              <a
                href="https://www.linkedin.com/posts/flightphd-flightphd-industrial-ugcPost-7224029255603507200-30Km/"
                target="_blank"
                rel="noreferrer"
                aria-label="Open the public ICFO FLIGHT research feature"
                className="mt-3 inline-flex text-sm font-medium text-primary hover:text-title"
              >
                View public feature
              </a>
            </div>
            <div className="border border-line bg-bg-raised/40 p-5">
              <p className="text-sm font-medium text-title">External citation</p>
              <p className="mt-2 text-sm text-body">
                Human thyroid diffuse optical characterization research with hybrid time-domain and diffuse correlation spectroscopy.
              </p>
              <a
                href="https://www.sciencedirect.com/science/article/abs/pii/S2468451123000417"
                target="_blank"
                rel="noreferrer"
                aria-label="Open the external ScienceDirect citation"
                className="mt-3 inline-flex text-sm font-medium text-primary hover:text-title"
              >
                View external citation
              </a>
            </div>
          </div>
        </article>

        <article className="border border-line bg-bg-light/50 p-8">
          <h2 className="text-2xl font-medium text-title">Lessons Learned</h2>
          <ul className="mt-4 space-y-4 text-body">
            <li className="flex gap-3">
              <span className="mt-2.5 inline-flex h-2 w-2 shrink-0 bg-primary" />
              Multimodal strength comes from engineering complementary sensing channels together.
            </li>
            <li className="flex gap-3">
              <span className="mt-2.5 inline-flex h-2 w-2 shrink-0 bg-primary" />
              Early calibration design is critical for practical optical systems.
            </li>
            <li className="flex gap-3">
              <span className="mt-2.5 inline-flex h-2 w-2 shrink-0 bg-primary" />
              Clear research storytelling helps connect experimental design to product value.
            </li>
          </ul>
        </article>
      </div>
    </ProjectDetailLayout>
  );
}
