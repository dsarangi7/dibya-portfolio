"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { DjsMonogram } from "@/app/components/visual-system";

export function IcfoSpotlight() {
  const [videoError, setVideoError] = useState(false);

  return (
    <motion.section
      id="icfo-spotlight"
      className="px-6 pb-16 sm:px-10 lg:px-16"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65 }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="visual-card overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-3">
                <DjsMonogram className="h-10 w-10" />
                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">ICFO spotlight</p>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                ICFO FLIGHT research feature from biomedical photonics to industrial R&D.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-slate-300">
                A polished record of the MSCA / FLIGHT research transition, showing how a Medical Photonics foundation evolved into industrial engineering work with stronger systems thinking and product focus.
              </p>
            </div>
            <span className="inline-flex w-fit rounded-full border border-cyan-300/15 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-300 ring-1 ring-cyan-300/10">
              Research transition
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="space-y-4">
              <div className="hologram-panel rounded-[1.75rem] p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">ICFO FLIGHT PhD Fellowship</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Research experience shaped in a multidisciplinary environment focused on photonics, sensing, and real-world translation.
                </p>
              </div>

              <div className="hologram-panel rounded-[1.75rem] p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Medical Photonics group</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  The spotlight connects biomedical photonics research with practical industrial R&D habits: careful measurement, disciplined analysis, and clear communication.
                </p>
              </div>

              <div className="hologram-panel rounded-[1.75rem] p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">MSCA / FLIGHT research feature</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  The interview feature is presented as a public-facing research artifact, not a promotional reel, to keep the portfolio credible and recruiter-friendly.
                </p>
                <a
                  href="https://www.linkedin.com/posts/flightphd-flightphd-industrial-ugcPost-7224029255603507200-30Km/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-sm font-medium text-cyan-300 hover:text-white"
                >
                  View LinkedIn feature
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div className="visual-card overflow-hidden rounded-[1.75rem] p-4">
                <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-300/10 bg-slate-950/80">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_40%),radial-gradient(circle_at_80%_20%,_rgba(167,139,250,0.1),_transparent_28%)]" />
                  {!videoError ? (
                    <video
                      className="relative block aspect-video w-full rounded-[1.5rem] object-cover"
                      src="/msca-interview.mp4"
                      controls
                      preload="metadata"
                      playsInline
                      onError={() => setVideoError(true)}
                    >
                      Sorry, this research video could not be loaded in your browser.
                    </video>
                  ) : (
                    <div className="relative flex aspect-video w-full items-center justify-center rounded-[1.5rem] px-6 py-8 text-center">
                      <div className="max-w-md space-y-3">
                        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Video unavailable</p>
                        <p className="text-sm leading-7 text-slate-300">
                          The ICFO interview video could not be loaded. The research spotlight remains available through the written summary and external feature link.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm leading-7 text-slate-300">
                ICFO FLIGHT PhD Fellow research feature — Medical Photonics Group, Barcelona.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
