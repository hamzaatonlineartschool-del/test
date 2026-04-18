"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
const items = [
  {
    quote:
      "Corp Haven runs our frontline like they are in the building — clear comms, crisp reporting, and owners who actually answer the phone.",
    name: "Operations Director",
    role: "Financial services",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85",
  },
  {
    quote:
      "We reduced handle time without sacrificing CSAT. The difference was disciplined process design — not throwing more people at the problem.",
    name: "VP Customer Experience",
    role: "E‑commerce",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85",
  },
  {
    quote:
      "They onboarded faster than our last two vendors combined. The governance model is adult: weekly reviews, no surprises.",
    name: "Head of Shared Services",
    role: "Technology",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=85",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const reduce = Boolean(useReducedMotion());
  const [index, setIndex] = useState(0);
  const n = items.length;
  const t = items[index];

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + n) % n);
  }, [n]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % n);
  }, [n]);

  useEffect(() => {
    if (reduce) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, reduce]);

  const year = new Date().getFullYear();

  return (
    <section
      id="testimonials"
      className="scroll-mt-20 border-t border-black/[0.06] bg-[#f5f4f1] px-5 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header row — Diroz-style asymmetric */}
        <div className="flex flex-col gap-6 pb-8 md:flex-row md:items-start md:justify-between md:gap-8 md:pb-10">
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[#64748b]">
            <Sparkles className="size-4 text-sky-600" aria-hidden />
            Testimonials
          </div>

          <div className="text-center md:flex-1">
            <h2 className="font-display text-5xl font-semibold tracking-tight text-[#0f172a] md:text-6xl lg:text-7xl">
              Experiences.
            </h2>
            <p className="mt-2 font-medium text-[#94a3b8]">©{year}</p>
          </div>

          <p className="text-right text-sm font-medium text-[#64748b] md:min-w-[8rem] md:pt-2">
            Client trusted
          </p>
        </div>

        <div className="h-px w-full bg-[#0f172a]/10" aria-hidden />

        {/* Portrait + quote slider */}
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(240px,320px)_1fr] lg:gap-14 lg:items-center">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-2xl bg-gradient-to-b from-sky-100/80 to-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.2)] lg:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.45, ease }}
              >
                <Image
                  src={items[index].image}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="320px"
                  priority={index === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex min-h-[280px] flex-col pb-16 md:min-h-[320px] lg:pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={reduce ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -12 }}
                transition={{ duration: reduce ? 0 : 0.5, ease }}
              >
                <blockquote className="font-display text-xl font-medium leading-relaxed text-[#334155] md:text-2xl md:leading-snug lg:text-[1.65rem] lg:leading-[1.45]">
                  “{t.quote}”
                </blockquote>
                <footer className="mt-8 md:mt-10">
                  <cite className="not-italic">
                    <p className="font-display text-lg font-semibold text-[#0f172a]">
                      {t.name}
                    </p>
                    <p className="mt-1 text-base text-[#64748b]">{t.role}</p>
                  </cite>
                </footer>
              </motion.div>
            </AnimatePresence>

            {/* Nav — bottom right */}
            <div className="mt-8 flex justify-end gap-3 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0">
              <button
                type="button"
                onClick={prev}
                className="inline-flex size-12 items-center justify-center rounded-full bg-sky-600 text-white shadow-md transition hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-6" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex size-12 items-center justify-center rounded-full border border-[#cbd5e1] bg-white text-[#0f172a] shadow-sm transition hover:border-[#94a3b8] hover:bg-[#f8fafc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f172a]"
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-6" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
