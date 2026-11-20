import ProjectDetailLayout from "@/app/components/project-detail-layout";
import { ProjectVisual } from "@/app/components/project-visual";
import type { Metadata } from "next";

const title = "SOH Calculator";
const description =
  "I built a web tool that turns raw battery string logs into cell-, module-, and string-level state-of-health results and a finished customer report. Work that took about a week by hand now takes minutes.";

export const metadata: Metadata = {
  title: `${title} | Dibya Jyoti Sarangi`,
  description,
  alternates: {
    canonical: "/projects/soh-calculator",
  },
  openGraph: {
    type: "article",
    url: "/projects/soh-calculator",
    title: `${title} | Dibya Jyoti Sarangi`,
    description,
  },
};

const pipeline = [
  {
    step: "Ingest",
    body: "Reads each string's CSV or Excel log and detects the timestamp, current, per-cell voltage, and temperature channels by name. A folder scan finds every string in a project, across banks.",
  },
  {
    step: "Window detection",
    body: "Finds the longest sustained charge segment as the capacity window, then the last stable-current run inside it as the C-rate window. Engineers can still zoom and click to pick both windows by hand.",
  },
  {
    step: "Coulomb counting",
    body: "Integrates current over the capacity window to get the charge the cells actually absorbed, in Ah. The mean current over the C-rate window gives the test C-rate.",
  },
  {
    step: "C-rate-matched OCV–SOC lookup",
    body: "Interpolates between the cell type's OCV curves to match the measured C-rate, then converts each cell's start and end voltage into SOC.",
  },
  {
    step: "SOH estimate",
    body: "Charge ÷ ΔSOC gives each cell's usable capacity. Divided by rated capacity, that is its state of health.",
  },
  {
    step: "Temperature correction",
    body: "Applies a temperature-dependent factor to the end voltage against a low-rate reference curve, then recomputes ΔSOC and SOH. Results are shown before and after correction.",
  },
  {
    step: "Aggregate & report",
    body: "Rolls cell results up to modules and strings, plots them, and fills a Word report template with the correct system diagram, tables, and figures for that configuration.",
  },
];

const stack = [
  { layer: "Interface", items: "Next.js 14 · React · TypeScript · Tailwind CSS · Plotly for interactive window selection" },
  { layer: "Calculation API", items: "Python · FastAPI · Pydantic · pandas · NumPy · SciPy" },
  { layer: "Outputs", items: "Matplotlib plots · openpyxl workbooks · python-docx customer reports · ZIP exports" },
  { layer: "Deployment", items: "Windows server under Task Scheduler, with sign-in and user administration, reachable on the internal network" },
];

const sections = [
  {
    title: "The problem",
    body: "SOH checks ran through a chain of MATLAB scripts. An engineer picked the test windows for every string by hand, re-ran the scripts for each bank, then built the customer report by copying tables and plots into Word. A full project took about a week, and every manual step was a chance for an inconsistency.",
  },
  {
    title: "What changed",
    body: "I traced the existing MATLAB workflow line by line and rebuilt it as a tested Python service with a browser front end. One project folder now runs as a batch, and each run is saved with its inputs, tables, plots, and calculation log. The report comes out ready to send.",
  },
];

export default function SohCalculatorPage() {
  return (
    <ProjectDetailLayout
      title={title}
      category="Battery Health Analytics"
      description={description}
      note="Built for internal engineering use. Calculation constants, cell data, and customer details are left out; the plots here are synthetic."
    >
      <ProjectVisual kind="soh" label="Synthetic schematic: a charge window is integrated to amp-hours, start and end voltages map to state of charge through an OCV curve, and per-cell state-of-health bars feed a report." />

      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title} className="border border-line bg-bg-light/50 p-8">
            <h2 className="text-2xl font-medium text-title">{section.title}</h2>
            <p className="mt-4 leading-8 text-body">{section.body}</p>
          </section>
        ))}
      </div>

      <section className="border border-line bg-bg-light/50 p-8">
        <h2 className="text-2xl font-medium text-title">How SOH is calculated</h2>
        <p className="mt-4 max-w-3xl leading-8 text-body">
          The method is capacity-based: measure the charge that went in, and work out what fraction of the cell&rsquo;s
          range that charge covered.
        </p>
        <p className="mt-6 border-l-2 border-gold pl-4 font-mono text-sm leading-7 text-title">
          SOH = ( ∫ I dt ÷ ΔSOC ) ÷ C<sub>rated</sub>
        </p>
        <ol className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {pipeline.map((item, i) => (
            <li key={item.step} className="grid grid-cols-[2.5rem_1fr] gap-2">
              <span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-medium text-title">{item.step}</h3>
                <p className="mt-1 leading-7 text-body">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border border-line bg-bg-light/50 p-8">
        <h2 className="text-2xl font-medium text-title">Tech stack</h2>
        <dl className="mt-6 divide-y divide-line">
          {stack.map((row) => (
            <div key={row.layer} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs tracking-[0.2em] text-muted uppercase sm:pt-1">{row.layer}</dt>
              <dd className="leading-7 text-body">{row.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {[
          ["~1 week → minutes", "per project, from raw logs to report"],
          ["Cell → module → string", "every level in one run"],
          ["Automatic report", "Word document ready for the customer"],
        ].map(([value, label]) => (
          <div key={value} className="border border-line p-6">
            <p className="text-xl font-medium text-primary">{value}</p>
            <p className="mt-2 text-sm text-muted">{label}</p>
          </div>
        ))}
      </section>
    </ProjectDetailLayout>
  );
}
