"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useSyncExternalStore } from "react";
import { ArrowUpRight, Orbit } from "lucide-react";
import { ParallaxImageFill } from "@/components/motion/parallax";
import { SectionDepth } from "@/components/motion/section-depth";
import { SectionHead } from "@/components/ui/section-head";
import { easeOutExpo } from "@/lib/motion";
import { siteMedia } from "@/lib/site-media";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    step: "01",
    motion: "Clarity first",
    title: "Discovery & alignment with your KPIs",
    body:
      "We map workflows, constraints, and the metrics your board watches — so every initiative ladders to outcomes.",
  },
  {
    step: "02",
    motion: "Then scale",
    title: "Channel mix tuned to your audience",
    body:
      "The right blend of touchpoints, tooling, and governance — scaled without losing the human signal.",
  },
  {
    step: "03",
    motion: "Then compound",
    title: "Continuous optimisation — not one-off campaigns",
    body:
      "Insight loops, retros, and steady-state improvements that compound instead of resetting after launch.",
  },
] as const;

const headlineContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.085,
      delayChildren: 0.06,
    },
  },
};

const headlineItem = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOutExpo },
  },
};

const listItem = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: easeOutExpo, delay: 0.12 },
  },
};

/** Fixed height per motion panel (must match for -66.67% strip translate) */
const stepPanelClass =
  "h-[210px] shrink-0 sm:h-[230px] lg:h-[260px]";

/** Tailwind `lg` — scroll-strip + tall pin only make sense on wide layouts */
function useIsLg() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(min-width: 1024px)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );
}

export function StoryApproach() {
  const reduce = useReducedMotion();
  const reduceBool = Boolean(reduce);
  const isLg = useIsLg();
  /** Tall scroll track + animated strip: desktop only (avoids huge empty scroll on mobile/tablet) */
  const useScrollStrip = !reduceBool && isLg;
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: useScrollStrip
      ? ["start start", "end end"]
      : ["start end", "end start"],
  });

  /** Strip moves up through three steps: 0 → -66.67% of strip height (3 panels) */
  const stripY = useTransform(
    scrollYProgress,
    [0, 1],
    useScrollStrip ? ["0%", "-66.666%"] : ["0%", "0%"],
  );

  return (
    <section
      ref={sectionRef}
      id="approach"
      aria-labelledby="approach-heading"
      className="relative scroll-mt-20 overflow-x-hidden border-t border-white/[0.08] bg-[#02040a]"
    >
      <SectionDepth sectionRef={sectionRef} tone="cyan" />

      {useScrollStrip ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-[25%] top-[8%] h-[min(520px,55vh)] w-[85%] rounded-full bg-cyan-500/[0.09] blur-[120px]"
          animate={{ opacity: [0.45, 0.75, 0.45], scale: [1, 1.06, 1] }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : null}
      {useScrollStrip ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-[20%] bottom-[5%] h-[420px] w-[65%] rounded-full bg-sky-600/[0.07] blur-[100px]"
          animate={{ opacity: [0.35, 0.62, 0.35] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(34,211,238,0.45) 1.2px, transparent 1.2px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)",
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.15, ease: easeOutExpo }}
        style={{ originX: 0.5 }}
      />

      {/* Scroll track only when strip animation is active (lg+); otherwise natural height */}
        <div
          ref={pinRef}
          className={cn(
            "relative",
            useScrollStrip && "min-h-[155vh]",
          )}
        >
        <div
          className={cn(
            "sticky top-0 z-[2] py-16 md:py-20 lg:py-24",
            useScrollStrip && "lg:flex lg:items-start",
          )}
        >
          <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-5">
            <div className="relative rounded-[2rem] border border-white/[0.09] bg-gradient-to-b from-white/[0.04] to-transparent p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.06)] md:rounded-[2.25rem] md:p-2">
              <div className="rounded-[1.65rem] bg-[#04060c]/80 px-6 py-12 backdrop-blur-sm md:rounded-[1.85rem] md:px-10 md:py-14 lg:px-12 lg:py-16">
                <div className="grid gap-14 lg:grid-cols-[1fr_1.08fr] lg:items-start lg:gap-16 xl:gap-20">
                  <motion.div
                    className="flex flex-col lg:self-start"
                    variants={headlineContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
                  >
                    <motion.div variants={headlineItem}>
                      <motion.div
                        className="mb-6 h-[3px] max-w-[120px] rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-transparent shadow-[0_0_24px_rgba(56,189,248,0.35)]"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: easeOutExpo, delay: 0.05 }}
                        style={{ originX: 0 }}
                      />
                      <SectionHead
                        index="08"
                        eyebrow="Operating model"
                        title="Our approach"
                        titleId="approach-heading"
                        description="As businesses face evolving digital landscapes, we understand that each touchpoint matters. Our goal is to connect these dots and drive meaningful outcomes, helping you achieve long-term success."
                      />
                    </motion.div>

                    <motion.div
                      variants={headlineItem}
                      className="mt-10 flex flex-wrap items-center gap-4"
                    >
                      <motion.div whileHover={{ scale: reduceBool ? 1 : 1.03 }}>
                        <Link
                          href="/services"
                          className="group inline-flex items-center gap-2 rounded-full border border-sky-500/35 bg-sky-500/10 px-6 py-3 text-sm font-semibold text-sky-200 shadow-[0_0_32px_-8px_rgba(56,189,248,0.45)] transition hover:border-sky-400/60 hover:bg-sky-500/15"
                        >
                          View all services
                          <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </motion.div>
                      <p className="max-w-[14rem] text-xs uppercase tracking-[0.28em] text-white/35">
                        Flagship delivery model
                      </p>
                    </motion.div>

                    {useScrollStrip ? (
                      <p
                        className="mt-8 hidden text-[11px] uppercase tracking-[0.28em] text-white/30 lg:block"
                        aria-hidden
                      >
                        Scroll to advance motions 1 → 2 → 3
                      </p>
                    ) : null}
                  </motion.div>

                  <motion.div
                    variants={cardReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-8% 0px" }}
                    className="relative min-w-0 lg:min-h-0"
                  >
                    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.12] shadow-[0_48px_120px_-52px_rgba(56,189,248,0.35)] ring-1 ring-sky-500/15">
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-[3] opacity-0 mix-blend-screen"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        style={{
                          background:
                            "linear-gradient(115deg, transparent 40%, rgba(56,189,248,0.12) 50%, transparent 60%)",
                          backgroundSize: "200% 100%",
                        }}
                      />

                      <div className="relative w-full">
                        <ParallaxImageFill
                          src={siteMedia.approachImage}
                          alt="Strategy session and planning"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          range={0}
                          scrub={0.52}
                          containerClassName="aspect-[16/11] w-full md:aspect-[5/4]"
                          className="object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#04060c]/95 via-[#04060c]/45 to-[#04060c]/25" />
                        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#04060c] via-transparent to-transparent opacity-90" />
                      </div>

                      <div className="relative z-[4] p-6 md:p-8 lg:p-10">
                        <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-sky-300/90">
                              Model at a glance
                            </p>
                            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/55">
                              {useScrollStrip ? (
                                <>
                                  Three motions we repeat with every engagement
                                  — clarity first, then scale, then compound.
                                  Scroll to step through each.
                                </>
                              ) : (
                                <>
                                  Three motions we repeat with every engagement
                                  — clarity first, then scale, then compound.
                                  Each step is outlined below.
                                </>
                              )}
                            </p>
                          </div>
                          <motion.div
                            className="flex size-[4.5rem] shrink-0 items-center justify-center self-start rounded-full border border-sky-400/40 bg-sky-500/15 text-sky-50 shadow-[0_0_40px_-6px_rgba(56,189,248,0.5)]"
                            animate={
                              reduceBool
                                ? {}
                                : {
                                    rotate: [0, 360],
                                    scale: [1, 1.04, 1],
                                  }
                            }
                            transition={{
                              rotate: {
                                duration: 48,
                                repeat: Infinity,
                                ease: "linear",
                              },
                              scale: {
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              },
                            }}
                          >
                            <Orbit className="size-9" aria-hidden />
                          </motion.div>
                        </div>

                        {!useScrollStrip ? (
                          <motion.ul
                            className="space-y-0 border-t border-white/[0.06]"
                            variants={{
                              hidden: {},
                              show: {
                                transition: {
                                  staggerChildren: 0.11,
                                  delayChildren: 0.2,
                                },
                              },
                            }}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                          >
                            {PILLARS.map((p, i) => (
                              <motion.li
                                key={p.step}
                                variants={listItem}
                                className={cn(
                                  "relative border-b border-white/[0.06] py-5 pl-6 md:pl-8",
                                  i === PILLARS.length - 1 && "border-b-0",
                                )}
                              >
                                <PillarContent p={p} showAccent />
                              </motion.li>
                            ))}
                          </motion.ul>
                        ) : (
                          <div
                            className={cn(
                              "relative overflow-hidden border-t border-white/[0.06]",
                              stepPanelClass,
                            )}
                            aria-live="polite"
                          >
                            <motion.div
                              className="flex flex-col will-change-transform"
                              style={{ y: stripY }}
                            >
                              {PILLARS.map((p) => (
                                <div
                                  key={p.step}
                                  className={cn(
                                    "flex flex-col justify-center border-b border-white/[0.06] px-0 py-2 last:border-b-0",
                                    stepPanelClass,
                                  )}
                                >
                                  <PillarContent p={p} showAccent={false} />
                                </div>
                              ))}
                            </motion.div>
                            <div
                              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#04060c] to-transparent"
                              aria-hidden
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarContent({
  p,
  showAccent,
}: {
  p: (typeof PILLARS)[number];
  showAccent: boolean;
}) {
  return (
    <>
      {showAccent ? (
        <motion.span
          className="absolute left-0 top-8 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-sky-400 via-sky-400/50 to-transparent md:top-10"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: easeOutExpo }}
          style={{ originY: 0 }}
        />
      ) : null}
      <span className="font-display text-[11px] font-semibold uppercase tracking-[0.35em] text-sky-400/80">
        Motion {p.step} · {p.motion}
      </span>
      <h3 className="mt-2 font-display text-base font-semibold leading-snug text-white md:text-lg">
        {p.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{p.body}</p>
    </>
  );
}
