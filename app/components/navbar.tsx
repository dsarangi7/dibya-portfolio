"use client";

/**
 * Fixed vertical nav rail (desktop) + full-screen overlay menu (mobile).
 * Layout and interaction adapted from Hamish Williams' Navbar (MIT).
 */
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DjsMonogram } from "@/app/components/visual-system";
import { githubProfileUrl } from "@/app/lib/side-projects";
import { fastOutSlowIn } from "@/app/components/motion/reveal";
import { ThemeToggle } from "@/app/components/theme-toggle";

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Lab", href: "/#lab" },
  { label: "Story", href: "/#story" },
  { label: "Research", href: "/#research" },
  { label: "Contact", href: "/#contact" },
];

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dibya-jyoti-sarangi37",
    path: "M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.32 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.54V9H7.1v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z",
  },
  {
    label: "GitHub",
    href: githubProfileUrl,
    path: "M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3",
  },
];

function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="flex h-12 w-12 items-center justify-center text-muted transition-colors duration-300 hover:text-primary"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
            <path d={link.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = navLinks.map((link) => link.href.split("#")[1]);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed z-50">
      {/* Desktop rail */}
      <div className="fixed top-12 bottom-12 left-12 hidden w-12 flex-col items-center lg:flex">
        <Link href="/" aria-label="Dibya Jyoti Sarangi, home" className="p-1 pb-6">
          <DjsMonogram className="h-10 w-10" title="DJS" />
        </Link>
        <nav aria-label="Primary" className="flex flex-1 flex-col items-center justify-between">
          <div className="flex rotate-180 flex-row-reverse [writing-mode:vertical-lr]">
            {navLinks.map((link) => {
              const current = active === link.href.split("#")[1];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={current ? "location" : undefined}
                  className={`group relative inline-flex items-center p-4 text-[15px] font-medium leading-none transition-colors duration-300 ${
                    current ? "text-title" : "text-body hover:text-title"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute inset-y-2 left-0 w-1 origin-top bg-primary transition-transform duration-400 ease-fastout ${
                      current ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col items-center">
            <ThemeToggle />
            <SocialIcons className="flex-col" />
          </div>
        </nav>
      </div>

      {/* Mobile bar */}
      <div className="fixed inset-x-0 top-0 flex items-center justify-between bg-bg/70 px-5 py-3 backdrop-blur-xl lg:hidden">
        <Link href="/" aria-label="Dibya Jyoti Sarangi, home">
          <DjsMonogram className="h-9 w-9" title="DJS" />
        </Link>
        <div className="flex items-center">
        <ThemeToggle className="relative z-10" />
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="relative z-10 flex h-12 w-12 items-center justify-center"
        >
          <span
            className={`absolute h-0.5 w-7 bg-title transition-transform duration-400 ease-fastout ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-0.5 w-7 bg-title transition-transform duration-400 ease-fastout ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Primary"
            className="fixed inset-0 flex flex-col items-center justify-center bg-bg/80 backdrop-blur-2xl lg:hidden"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: fastOutSlowIn }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05, ease: fastOutSlowIn }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="accent-link block px-6 py-5 text-2xl text-body"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <SocialIcons className="absolute bottom-8 left-6" />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
