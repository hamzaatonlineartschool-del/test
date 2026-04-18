"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Clock, Headphones, LineChart, Shield } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import { siteMedia } from "@/lib/site-media";
import { cn } from "@/lib/utils";

const cards = [
  {
    icon: Headphones,
    title: "Priority operations",
    body:
      "Dedicated leads and clear escalation paths — so issues get solved before they become incidents.",
    image: siteMedia.careImage,
    alt: "Operations and support coordination",
  },
  {
    icon: LineChart,
    title: "Outcome reporting",
    body:
      "Dashboards your leadership can trust — tied to SLAs, CSAT, and the KPIs you actually run the business on.",
    image: siteMedia.resultsPanel,
    alt: "Analytics and reporting",
  },
  {
    icon: Shield,
    title: "Security-first mindset",
    body:
      "Controls that match how you work: access hygiene, monitoring, and practical governance without slowing teams down.",
    image: siteMedia.approachImage,
    alt: "Governance and planning",
  },
  {
    icon: Clock,
    title: "24/7 coverage",
    body:
      "Follow-the-sun delivery with consistent playbooks — your customers get continuity, not chaos.",
    image: siteMedia.talentImage,
    alt: "Global team coverage",
  },
] as const;

export function WhyChoose() {
  const reduce = useReducedMotion();

  const intro = (
    <div className="relative mx-auto max-w-6xl px-5 pb-4 pt-24 md:px-10 md:pb-6 md:pt-28">
      <SectionHead
        index="02"
        eyebrow="Why Corp Haven"
        title="Built for reliability at scale"
        description="Four principles we apply on every engagement — from first workflow to global rollout."
      />
    </div>
  );

  if (reduce) {
    return (
      <section
        id="why"
        className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06] bg-[#05070d] py-16 md:py-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,rgba(99,102,241,0.08),transparent_55%)]" />
        {intro}
        <div className="relative mx-auto max-w-6xl space-y-6 px-5 pb-24 md:px-10">
          {cards.map((c) => (
            <article
              key={c.title}
              className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080c16]"
            >
              <div className="relative aspect-[16/10] w-full md:aspect-[21/9]">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1152px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c16] via-[#080c16]/40 to-transparent" />
              </div>
              <div className="p-7 md:p-8">
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-200 ring-1 ring-white/10">
                  <c.icon className="size-6" aria-hidden />
                </div>
                <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/58 md:text-[15px]">
                  {c.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="why"
      className="relative scroll-mt-20 border-t border-white/[0.06] bg-[#05070d]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,rgba(99,102,241,0.08),transparent_55%)]" />

      {intro}

      {/* Stacking cards: each layer sticks full-viewport; higher z-index covers the last — works with Lenis without GSAP pin */}
      <div className="relative">
        {cards.map((c, i) => (
          <div
            key={c.title}
            className="sticky top-0 flex min-h-[100dvh] items-center justify-center px-5 py-16 md:px-10 md:py-20"
            style={{ zIndex: i + 1 }}
          >
            <article
              className={cn(
                "grid w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[#0a0d14] shadow-[0_40px_120px_-50px_rgba(0,0,0,0.85)]",
                "lg:grid-cols-[1fr_1.05fr] lg:items-stretch",
              )}
            >
              <div className="relative min-h-[220px] lg:min-h-[min(420px,52vh)]">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#0a0d14]/25 lg:to-[#0a0d14]/85" />
              </div>

              <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12 lg:pl-10">
                <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-200 ring-1 ring-white/10 md:size-14">
                  <c.icon className="size-6 md:size-7" aria-hidden />
                </div>
                <p className="font-display text-xs font-semibold tabular-nums text-white/35 md:text-sm">
                  Principle {String(i + 1).padStart(2, "0")} of {String(cards.length).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-[clamp(1.5rem,4.2vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-white">
                  {c.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/62 md:text-lg md:leading-relaxed">
                  {c.body}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* Spacer so last card can scroll fully clear */}
      <div className="h-24 md:h-32" aria-hidden />
    </section>
  );
}
