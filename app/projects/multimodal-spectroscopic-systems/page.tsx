import ProjectDetailLayout from "@/app/components/project-detail-layout";
import { PhotonMigration } from "@/app/components/photon-migration";
import type { Metadata } from "next";

const title = "Multimodal Spectroscopic Systems";
const description =
  "Eighteen months as a PhD trainee in ICFO's Medical Optics group, on laser-and-ultrasound thyroid screening with Hospital Clínic Barcelona. The measurement habits I built there are the ones I use on battery data today.";

export const metadata: Metadata = {
  title: `${title} | Dibya Jyoti Sarangi`,
  description,
  alternates: {
    canonical: "/projects/multimodal-spectroscopic-systems",
  },
  openGraph: {
    type: "article",
    url: "/projects/multimodal-spectroscopic-systems",
    title: `${title} | Dibya Jyoti Sarangi`,
    description,
  },
};

const sections = [
  {
    title: "The research",
    body: "Thyroid nodules are common, and most are benign, so a cheap first screen matters. The group worked with Hospital Clínic Barcelona on the LUCA project: a point-of-care, low-cost device that combines diffuse optics with ultrasound to help screen thyroid nodules. I joined that work as a PhD trainee in Prof. Turgut Durduran's Medical Optics group.",
  },
  {
    title: "What I did",
    body: "I trained in diffuse optics and photon transport in biological tissue, and acquired data on laser- and ultrasound-based systems using diffuse correlation spectroscopy (DCS) and time-resolved spectroscopy (TRS). I built the processing and analysis workflows in MATLAB and R for multi-dimensional optical measurements.",
  },
  {
    title: "Why I moved to energy",
    body: "I chose to leave the PhD programme before completing it and move into the energy sector, to broaden my experience and take on a different kind of engineering problem. ICFO certified the period with a Certificate of Advanced Training in Photonics.",
  },
  {
    title: "What carried over",
    body: "Photon transport models became physics-based battery models. Noisy optical acquisition became noisy telemetry. The rule stayed the same: calibrate first, distrust a clean result, and write down the method. It is a large part of why I could deliver in marine batteries from the start.",
  },
];

const skills = [
  "Diffuse optics & photon transport",
  "Diffuse correlation spectroscopy (DCS)",
  "Time-resolved spectroscopy (TRS)",
  "Laser & ultrasound measurement systems",
  "MATLAB & R analysis workflows",
  "Physics-based modelling & signal processing",
];

const training = [
  "Basic Python",
  "Good clinical practice",
  "Essential transferable skills",
  "BMPN Annual Meeting: photonics for paediatrics",
  "PHAST-ETN: photonics for healthcare",
  "CLP Day: photonic chips for information and quantum applications",
];

const links = [
  {
    label: "Published research",
    text: "Near-infrared diffuse optical characterization of human thyroid using ultrasound-guided hybrid time-domain and diffuse correlation spectroscopies. Biomedical Optics Express, 2024.",
    href: "https://opg.optica.org/boe/fulltext.cfm?uri=boe-15-12-7035",
    cta: "View the publication",
  },
  {
    label: "Public research profile",
    text: "Marie Skłodowska-Curie FLIGHT fellowship feature from ICFO.",
    href: "https://www.linkedin.com/posts/flightphd-flightphd-industrial-ugcPost-7224029255603507200-30Km/",
    cta: "View public feature",
  },
  {
    label: "Related study",
    text: "Human thyroid diffuse optical characterization with hybrid time-domain and diffuse correlation spectroscopy.",
    href: "https://www.sciencedirect.com/science/article/abs/pii/S2468451123000417",
    cta: "View external citation",
  },
];

export default function MultimodalSpectroscopicSystemsPage() {
  return (
    <ProjectDetailLayout
      title={title}
      category="Research Foundation · ICFO Barcelona"
      description={description}
      note="PhD trainee, July 2023 – January 2025. The PhD was not completed; I left by choice to move into energy. Certified by ICFO with a Certificate of Advanced Training in Photonics (May 2025)."
    >
      <PhotonMigration />

      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title} className="border border-line bg-bg-light/50 p-8">
            <h2 className="text-2xl font-medium text-title">{section.title}</h2>
            <p className="mt-4 leading-8 text-body">{section.body}</p>
          </section>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="border border-line bg-bg-light/50 p-8">
          <h2 className="text-2xl font-medium text-title">Methods & tools</h2>
          <ul className="mt-5 space-y-3">
            {skills.map((item) => (
              <li key={item} className="flex gap-3 text-body">
                <span className="mt-2.5 inline-flex h-2 w-2 shrink-0 bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="border border-line bg-bg-light/50 p-8">
          <h2 className="text-2xl font-medium text-title">Training at ICFO</h2>
          <ul className="mt-5 space-y-3">
            {training.map((item) => (
              <li key={item} className="flex gap-3 text-body">
                <span className="mt-2.5 inline-flex h-2 w-2 shrink-0 bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="border border-line bg-bg-light/50 p-8">
        <h2 className="text-2xl font-medium text-title">Research links</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {links.map((link) => (
            <div key={link.href} className="border border-line bg-bg-raised/40 p-5">
              <p className="text-sm font-medium text-title">{link.label}</p>
              <p className="mt-2 text-sm leading-6 text-body">{link.text}</p>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex text-sm font-medium text-primary hover:text-title"
              >
                {link.cta}
              </a>
            </div>
          ))}
        </div>
      </section>
    </ProjectDetailLayout>
  );
}
