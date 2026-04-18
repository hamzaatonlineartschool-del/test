"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

export function Newsletter() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  return (
    <section className="border-t border-white/[0.06] bg-[#080a10] px-5 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#0c101a] px-6 py-12 md:px-12 md:py-14">
            <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-sky-500/15 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 size-56 rounded-full bg-violet-600/10 blur-[80px]" />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-white/40">
                  Stay in the loop
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Updates on delivery, hiring, and what we are learning
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-white/55">
                  One or two emails a month — no fluff. Unsubscribe anytime.
                </p>
              </div>

              <form onSubmit={onSubmit} className="relative space-y-4">
                <label htmlFor="news-email" className="sr-only">
                  Email
                </label>
                <input
                  id="news-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder:text-white/35 outline-none ring-0 transition focus:border-sky-500/50"
                  autoComplete="email"
                />
                <motion.button
                  type="submit"
                  disabled={sent}
                  whileHover={reduce ? {} : { scale: 1.01 }}
                  whileTap={reduce ? {} : { scale: 0.99 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_0_40px_-12px_rgba(56,189,248,0.55)] transition hover:bg-sky-400 disabled:opacity-60"
                >
                  {sent ? "You are on the list" : "Subscribe"}
                  <ArrowRight className="size-4" aria-hidden />
                </motion.button>
                {sent ? (
                  <p className="text-center text-xs text-emerald-400/90">
                    Thanks — we will only send substance.
                  </p>
                ) : (
                  <p className="text-center text-xs text-white/35">
                    This demo form does not send email yet — wire your API here.
                  </p>
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
