import ProjectDetailLayout from "@/app/components/project-detail-layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Battery Analytics & Intelligent Diagnostics | Dibya Jyoti Sarangi",
  description:
    "Battery-first case page for marine lithium-ion battery analytics, telemetry diagnostics, anomaly detection, and engineering decision support.",
  alternates: {
    canonical: "/projects/battery-analytics",
  },
  openGraph: {
    type: "article",
    url: "/projects/battery-analytics",
    title: "Battery Analytics & Intelligent Diagnostics | Dibya Jyoti Sarangi",
    description:
      "Sanitized case page showing marine battery telemetry analytics, intelligent diagnostics, anomaly detection, and engineering decision support.",
  },
};

export default function BatteryAnalyticsPage() {
  return (
    <ProjectDetailLayout
      title="Battery Analytics & Intelligent Diagnostics"
      category="Marine Battery Engineering"
      description="A battery-first engineering approach to marine lithium-ion telemetry, anomaly detection, parameter review, and diagnostics for confident engineering action."
      note="Sanitized public-safe case study: no proprietary company data is exposed."
    >
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-8">
          <article className="border border-line bg-bg-light/50 p-8">
            <h2 className="text-2xl font-medium text-title">Problem</h2>
            <p className="mt-4 leading-8 text-body">
              Marine battery systems produce high-volume telemetry that can hide early fault signatures. The challenge was to design diagnostics that filter sensor noise, preserve signal context, and surface only meaningful anomalies for engineering teams.
            </p>
          </article>

          <article className="border border-line bg-bg-light/50 p-8">
            <h2 className="text-2xl font-medium text-title">Approach</h2>
            <div className="mt-4 space-y-4 text-body">
              <p>
                I built a telemetry pipeline that normalizes cell-level behavior, calculates adaptive baselines, and uses confidence thresholds to highlight anomalies. The solution emphasizes explainability so battery teams can trace diagnostics from raw values to actionable decisions.
              </p>
              <ul className="space-y-3 text-body">
                <li className="flex gap-3">
                  <span className="mt-2.5 inline-flex h-2 w-2 shrink-0 bg-primary" />
                  Normalized signals across charge/discharge cycles and temperature conditions.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 inline-flex h-2 w-2 shrink-0 bg-primary" />
                  Layered statistical baselines with visual cues for engineering review.
                </li>
              </ul>
            </div>
          </article>

          <article className="border border-line bg-bg-light/50 p-8">
            <h2 className="text-2xl font-medium text-title">Technologies</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "MATLAB for signal analysis",
                "Python telemetry pipelines",
                "Statistical anomaly detection",
                "Engineering diagnostics storyboarding",
              ].map((item) => (
                <div key={item} className="border border-line bg-bg-raised/40 p-4">
                  <p className="text-sm text-title">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside className="space-y-6">
          <article className="border border-line bg-bg-light/50 p-8">
            <h2 className="text-2xl font-medium text-title">Engineering Challenges</h2>
            <ul className="mt-4 space-y-4 text-body">
              <li className="flex gap-3">
                <span className="mt-2.5 inline-flex h-2 w-2 shrink-0 bg-primary" />
                Separating true faults from operational load changes.
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 inline-flex h-2 w-2 shrink-0 bg-primary" />
                Maintaining interpretability for both analysts and field engineers.
              </li>
              <li className="flex gap-3">
                <span className="mt-2.5 inline-flex h-2 w-2 shrink-0 bg-primary" />
                Constructing a narrative around battery state that is easy to trust.
              </li>
            </ul>
          </article>

          <article className="border border-line bg-bg-light/50 p-8">
            <h2 className="text-2xl font-medium text-title">Impact</h2>
            <p className="mt-4 leading-8 text-body">
              The design positions battery analytics as a workflow asset, not a dashboard afterthought. It makes anomaly detection more actionable and helps engineering teams move from data to decisions faster.
            </p>
          </article>

          <article className="border border-line bg-bg-light/50 p-8">
            <h2 className="text-2xl font-medium text-title">Timeline</h2>
            <div className="mt-5 space-y-4 text-body">
              {[
                "Baseline signal modelling",
                "Anomaly threshold design",
                "Diagnostic UX mapping",
                "Engineered validation and review",
              ].map((step) => (
                <div key={step} className="border border-line bg-bg-raised/40 p-4">
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
