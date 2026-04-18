"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { siteStats } from "@/lib/site-stats";
import { siteMedia } from "@/lib/site-media";
import { useCountUp } from "@/lib/use-count-up";
import { cn } from "@/lib/utils";

function StatTile({
  tag,
  label,
  insight,
  target,
  suffix,
  inView,
  reduce,
  className,
}: {
  tag: string;
  label: string;
  insight: string;
  target: number;
  suffix: string;
  inView: boolean;
  reduce: boolean;
  className?: string;
}) {
  const shouldAnimate = inView && !reduce;
  const v = useCountUp(target, shouldAnimate);
  const display = reduce ? target : inView ? v : 0;

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-300 md:p-6",
        "hover:border-sky-500/25 hover:shadow-[0_0_40px_-12px_rgba(56,189,248,0.25)]",
        className,
      )}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-400/85">
        {tag}
      </span>
      <p className="mt-3 font-display text-[clamp(2rem,4.5vw,2.75rem)] font-semibold tabular-nums leading-none tracking-tight text-white">
        {display}
        <span className="text-sky-400">{suffix}</span>
      </p>
      <p className="mt-3 text-sm font-medium text-white/80">{label}</p>
      <p className="mt-2 text-xs leading-relaxed text-white/40">{insight}</p>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent opacity-0 transition group-hover:opacity-100"
        aria-hidden
      />
    </div>
  );
}

export function HomeAbout() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-12% 0px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06] bg-[#03050a] px-5 py-24 md:px-10 md:py-32 lg:py-36"
    >
      {/* Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(34,211,238,0.12) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -left-[30%] top-[5%] h-[min(480px,50vh)] w-[70%] rounded-full bg-cyan-500/[0.07] blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[25%] bottom-[10%] h-[400px] w-[55%] rounded-full bg-sky-600/[0.06] blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Intro */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <motion.div
            className="max-w-3xl"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.65, ease: easeOutExpo }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-sky-400/90">
              <span className="text-white/35">01</span>
              <span className="mx-2 text-white/20">·</span>
              About us
            </p>
            <h2
              id="about-heading"
              className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-white [text-wrap:balance]"
            >
              Outsourcing that feels like an extension of your team
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
              We blend strategy, delivery discipline, and human care — so your
              customers feel the difference, and your metrics show it.
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: easeOutExpo, delay: 0.08 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-8px_rgba(56,189,248,0.35)] transition hover:border-sky-400/45 hover:bg-sky-500/10"
            >
              Start a conversation
              <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 h-px w-full max-w-2xl bg-gradient-to-r from-sky-400/50 via-white/20 to-transparent"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeOutExpo }}
          style={{ originX: 0 }}
          aria-hidden
        />

        {/* Story + image */}
        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-10">
          <motion.div
            className="lg:col-span-5"
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.65, ease: easeOutExpo }}
          >
            <div className="relative">
              <div className="absolute -inset-px rounded-[1.5rem] bg-gradient-to-br from-sky-500/25 via-transparent to-violet-500/15 opacity-80 blur-sm" />
              <div className="relative overflow-hidden rounded-[1.45rem] border border-white/[0.12] shadow-[0_50px_120px_-50px_rgba(0,0,0,0.85)]">
                <div className="relative aspect-[4/5] w-full sm:aspect-[16/11] lg:aspect-[4/5]">
                  <Image
                    src={siteMedia.approachImage}
                    alt="Team collaboration at Corp Haven"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03050a]/95 via-[#03050a]/20 to-transparent lg:from-[#03050a]/80" />
                </div>
                <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md md:bottom-6 md:left-6 md:right-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
                    How we show up
                  </p>
                  <p className="mt-1 text-sm font-medium text-white/90">
                    Embedded operators, not a black-box vendor
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-8 lg:col-span-7"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.65, ease: easeOutExpo, delay: 0.06 }}
          >
            <div className="space-y-6 text-base leading-relaxed text-white/65 md:text-lg">
              <p>
                The Corp Haven is built for teams that need{" "}
                <span className="font-medium text-white">speed without chaos</span>{" "}
                — clear ownership, transparent reporting, and operators who treat
                your brand like their own.
              </p>
              <p>
                Whether you are scaling support, building product, or tightening
                back-office workflows, we design delivery around outcomes — not
                headcount alone.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 md:p-8">
              <div
                className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-sky-500/15 blur-3xl"
                aria-hidden
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-400/90">
                Partnership model
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/80 md:text-[17px]">
                A monthly operating rhythm with room to flex — start fast, scale
                smoothly, and adjust as priorities change.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Proof — integrated metrics */}
        <div
          ref={statsRef}
          className="relative mt-16 rounded-[1.75rem] border border-white/[0.09] bg-[#060a14]/80 p-6 shadow-[0_40px_100px_-60px_rgba(56,189,248,0.2)] backdrop-blur-md md:mt-20 md:p-10"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-sky-500/[0.04] via-transparent to-violet-500/[0.03]" />
          <div className="relative flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-sky-400/90">
                Signal
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
                Outcomes you can trace
              </p>
              <p className="mt-2 max-w-md text-sm text-white/45">
                A snapshot of how we measure delivery — not vanity metrics, but
                operating proof.
              </p>
            </div>
          </div>

          <div className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {siteStats.map((s, i) => (
              <motion.div
                key={s.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: easeOutExpo,
                  delay: reduce ? 0 : 0.06 * i,
                }}
              >
                <StatTile
                  tag={s.tag}
                  label={s.label}
                  insight={s.insight}
                  target={s.value}
                  suffix={s.suffix}
                  inView={statsInView}
                  reduce={Boolean(reduce)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
