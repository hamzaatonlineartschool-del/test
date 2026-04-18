"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown, MousePointerClick } from "lucide-react";
import { useCallback, useId, useState } from "react";
import { siteMedia } from "@/lib/site-media";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "Discovery & alignment",
    body:
      "We map workflows, constraints, and the KPIs that matter — so delivery matches your reality, not a generic playbook.",
  },
  {
    n: "02",
    title: "Design & playbooks",
    body:
      "Operating rhythms, training, tooling, and governance — built to scale with your teams and hand off cleanly.",
  },
  {
    n: "03",
    title: "Deploy with hypercare",
    body:
      "Controlled go-live with clear owners, SLA checkpoints, and reporting your stakeholders can rely on from day one.",
  },
  {
    n: "04",
    title: "Optimize continuously",
    body:
      "Weekly insight loops: remove friction, automate where it counts, and raise the bar with data you can act on.",
  },
] as const;

function OutlineStep({ n }: { n: string }) {
  return (
    <span
      className={cn(
        "select-none font-display text-[clamp(3rem,7vw,4.5rem)] font-semibold leading-none tracking-tight",
        "text-transparent [-webkit-text-stroke:1.25px] [-webkit-text-stroke-color:rgba(56,189,248,0.85)]",
        "[text-shadow:0_0_40px_rgba(56,189,248,0.12)]",
      )}
      aria-hidden
    >
      {n}
    </span>
  );
}

const ease = easeOutExpo;

export function ProcessSteps() {
  const reduce = useReducedMotion();
  const [visibleSteps, setVisibleSteps] = useState(0);
  const liveId = useId();

  const showCta = visibleSteps === 0;
  const allUnlocked = visibleSteps >= steps.length;

  const startFlow = useCallback(() => {
    setVisibleSteps(1);
  }, []);

  const revealNext = useCallback((stepIndex: number) => {
    setVisibleSteps((current) => {
      if (stepIndex !== current - 1) return current;
      if (current >= steps.length) return current;
      return current + 1;
    });
  }, []);

  return (
    <section
      id="process"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06] bg-[#03060c]"
      aria-labelledby="process-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={siteMedia.approachImage}
          alt=""
          fill
          className="object-cover object-center opacity-[0.14]"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03060c] via-[#03060c]/92 to-[#03060c]" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(52vh,520px)] overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -left-[20%] right-0 top-[-20%] h-[120%] opacity-[0.55]"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(56,189,248,0.22), transparent 62%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(34,211,238,0.5) 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px",
            maskImage:
              "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#03060c] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-6 pt-20 md:px-10 md:pb-8 md:pt-24 lg:pt-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-sky-400/90">
          <span className="text-white/35">06</span>
          <span className="mx-2 text-white/20">·</span>
          Process
        </p>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-x-14 lg:gap-y-6">
          <h2
            id="process-heading"
            className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.06] tracking-tight text-white [text-wrap:balance]"
          >
            Turning strategy into measurable impact
          </h2>
          <p className="max-w-xl font-sans text-base leading-relaxed text-white/72 md:text-lg">
            We help you move from intent to delivery through a structured outsourcing
            model — clear ownership, transparent reporting, and outcomes your leadership
            can stand behind.
          </p>
        </div>

        <div
          className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-sky-500/45 to-transparent md:mt-12"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-16 md:px-10 md:pb-24">
        <p id={liveId} className="sr-only" aria-live="polite">
          {visibleSteps === 0
            ? "Start the process walkthrough."
            : `${Math.min(visibleSteps, steps.length)} of ${steps.length} steps visible.`}
        </p>

        <div className="mx-auto max-w-3xl space-y-6">
          <AnimatePresence mode="popLayout">
            {showCta ? (
              <motion.div
                key="cta"
                layout
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: -12, scale: 0.98 }
                }
                transition={{ duration: reduce ? 0 : 0.45, ease }}
              >
                <button
                  type="button"
                  onClick={startFlow}
                  className={cn(
                    "group relative w-full overflow-hidden rounded-[1.75rem] border border-sky-500/35 bg-gradient-to-br from-sky-500/15 via-white/[0.04] to-transparent p-10 text-center shadow-[0_32px_80px_-40px_rgba(56,189,248,0.45)] transition",
                    "hover:border-sky-400/55 hover:shadow-[0_40px_100px_-36px_rgba(56,189,248,0.5)]",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400",
                  )}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-40 transition group-hover:opacity-60"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(56,189,248,0.35), transparent 55%)",
                    }}
                    aria-hidden
                  />
                  <div className="relative flex flex-col items-center gap-4">
                    <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-sky-400/40 bg-sky-500/20 text-sky-100">
                      <MousePointerClick className="size-7" aria-hidden />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-sky-300/90">
                      Interactive walkthrough
                    </span>
                    <span className="font-display text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl">
                      Click here to see our process
                    </span>
                    <span className="max-w-md text-sm leading-relaxed text-white/65">
                      Open each step in sequence — we&apos;ll reveal how we take you
                      from alignment through continuous optimisation.
                    </span>
                    <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition group-hover:gap-3">
                      Begin
                      <ChevronDown className="size-5 animate-bounce motion-reduce:animate-none" />
                    </span>
                  </div>
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="space-y-5">
            {steps.map((s, i) => {
              const isVisible = i < visibleSteps;
              const isLatest =
                i === visibleSteps - 1 && visibleSteps > 0 && !allUnlocked;
              const isDone = i < visibleSteps - 1;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={s.n}
                  layout
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduce ? 0 : 0.55,
                    ease,
                    delay: reduce ? 0 : 0.05,
                  }}
                >
                  {isLatest && !allUnlocked ? (
                    <button
                      type="button"
                      onClick={() => revealNext(i)}
                      className={cn(
                        "w-full rounded-2xl border border-sky-500/35 bg-[#050a12]/90 p-8 text-left shadow-[0_24px_60px_-36px_rgba(0,0,0,0.85)] ring-1 ring-sky-500/20 transition",
                        "hover:border-sky-400/50 hover:bg-[#060d16]/95 hover:ring-sky-400/30",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
                      )}
                    >
                      <StepCardInner
                        s={s}
                        hint="Click to reveal the next step"
                        showPulse
                      />
                    </button>
                  ) : (
                    <article
                      className={cn(
                        "rounded-2xl border border-white/[0.1] bg-[#050a12]/80 p-8 backdrop-blur-sm",
                        isDone && "border-white/[0.07] opacity-95",
                        allUnlocked && i === steps.length - 1 && "border-sky-500/25",
                      )}
                    >
                      <StepCardInner s={s} showPulse={false} />
                    </article>
                  )}
                </motion.div>
              );
            })}
          </div>

          {allUnlocked ? (
            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-white/45"
            >
              That&apos;s the full model — ready when you are.
            </motion.p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function StepCardInner({
  s,
  hint,
  showPulse,
}: {
  s: (typeof steps)[number];
  hint?: string;
  showPulse?: boolean;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl">
          {s.title}
        </h3>
        <p className="mt-4 font-sans text-sm leading-relaxed text-white/70 md:text-[15px]">
          {s.body}
        </p>
        {hint ? (
          <p
            className={cn(
              "mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
              showPulse ? "text-sky-400" : "text-white/35",
            )}
          >
            {hint}
            {showPulse ? (
              <span
                className="inline-block size-2 rounded-full bg-sky-400 motion-safe:animate-pulse"
                aria-hidden
              />
            ) : null}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 justify-start md:justify-end">
        <OutlineStep n={s.n} />
      </div>
    </div>
  );
}
