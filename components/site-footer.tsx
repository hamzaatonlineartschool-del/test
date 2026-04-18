"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

const quick = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const utility = [
  { href: "/services", label: "Services overview" },
  { href: "/contact", label: "Book a call" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#05070d] px-5 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-16">
          <div>
            <p className="font-display text-lg font-semibold text-[var(--foreground)]">
              The Corp Haven
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
              Your gateway to seamless outsourcing. IT and BPO delivery designed
              around outcomes — with the governance and care global teams expect.
            </p>
            <a
              href="mailto:hello@corphaven.example"
              className="mt-6 inline-block text-sm font-medium text-sky-400/90 transition hover:text-sky-300"
            >
              hello@corphaven.example
            </a>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
              Explore
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[var(--muted)]">
              {quick.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition hover:text-[var(--foreground)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
              Utility
            </p>
            <ul className="mt-5 space-y-3 text-sm text-[var(--muted)]">
              {utility.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition hover:text-[var(--foreground)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
              Phone
            </p>
            <a
              href="tel:+441273920627"
              className="mt-2 inline-block text-sm font-medium text-white/85 transition hover:text-white"
            >
              UK +44 1273 920627
            </a>
          </div>
        </div>

        <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-[var(--muted)]/85 md:flex-row">
          <p>© {new Date().getFullYear()} The Corp Haven. All rights reserved.</p>
          <p className="text-white/35">Built for clarity, speed, and scale.</p>
        </div>
      </Reveal>
    </footer>
  );
}
