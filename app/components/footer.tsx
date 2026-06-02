export function Footer() {
  return (
    <footer id="contact" className="px-6 pb-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="visual-card rounded-[2rem] p-8">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Contact</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Let&apos;s solve systems, optics, and battery engineering together.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                Reach out for R&D roles that combine applied photonics, marine battery analytics, and AI-enabled engineering workflows.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="mailto:dsarangi7@gmail.com"
                className="rounded-3xl border border-cyan-300/15 bg-white/5 px-5 py-4 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
              >
                Email: dsarangi7@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/dibya-jyoti-sarangi37"
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-cyan-300/15 bg-white/5 px-5 py-4 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
              >
                LinkedIn profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
