"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BarChart3, Headphones, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { siteMedia } from "@/lib/site-media";
import { cn } from "@/lib/utils";

/** L-shaped corner accents (Diroz-style), sky/orange on dark */
function CornerBrackets({ className }: { className?: string }) {
  return (
    <>
      <span
        className={cn(
          "pointer-events-none absolute left-4 top-4 size-7 border-l-2 border-t-2 border-sky-500/80",
          className,
        )}
        aria-hidden
      />
      <span
        className={cn(
          "pointer-events-none absolute bottom-4 right-4 size-7 border-b-2 border-r-2 border-orange-500/75",
          className,
        )}
        aria-hidden
      />
    </>
  );
}

type ImpactCard =
  | {
      kind: "content";
      title: string;
      image: string;
      imageAlt: string;
      icon: typeof Headphones;
      label: string;
      body: string;
    }
  | {
      kind: "brand";
      image: string;
      brandLine: string;
    }
  | {
      kind: "support";
      title: string;
      bodyTop: string;
      image: string;
      imageAlt: string;
    };

function ContentCard({
  card,
  reduce,
}: {
  card: Extract<ImpactCard, { kind: "content" }>;
  reduce: boolean;
}) {
  const Icon = card.icon;
  return (
    <motion.article
      className="relative flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.12)] sm:min-h-[380px]"
      whileHover={reduce ? undefined : { y: -3 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="border-b border-black/[0.06] px-5 pb-3 pt-5">
        <h3 className="font-display text-lg font-semibold tracking-tight text-[#0f172a]">
          {card.title}
        </h3>
      </div>
      <div className="relative aspect-[4/3] w-full shrink-0">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/12 text-orange-600">
            <Icon className="size-[18px]" aria-hidden />
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-[#0f172a]">
              {card.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
              {card.body}
            </p>
          </div>
        </div>
      </div>
      <CornerBrackets />
    </motion.article>
  );
}

const cards: ImpactCard[] = [
  {
    kind: "content",
    title: "Open collaboration",
    image: siteMedia.talentImage,
    imageAlt: "Partners shaking hands in a professional setting",
    icon: Headphones,
    label: "Priority operations",
    body:
      "Dedicated leads and escalation paths so your brand stays consistent — support that feels like an extension of your team.",
  },
  {
    kind: "brand",
    image: siteMedia.approachImage,
    brandLine: "Corp Haven",
  },
  {
    kind: "content",
    title: "Perfect refinement",
    image: siteMedia.resultsPanel,
    imageAlt: "Analytics dashboards",
    icon: BarChart3,
    label: "Transparent reporting",
    body:
      "Budgets and SLAs you can defend in the boardroom — dashboards tuned to how you actually run the business.",
  },
  {
    kind: "support",
    title: "24/7 support",
    bodyTop:
      "Follow-the-sun coverage with consistent playbooks — your customers get continuity, not handoffs.",
    image: siteMedia.careImage,
    imageAlt: "Support team at work",
  },
];

export function HomeImpact() {
  const reduce = Boolean(useReducedMotion());

  return (
    <section
      id="performance"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06] bg-[#f4f6fa] px-5 py-20 text-[#0f172a] md:px-8 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(148,163,184,0.35),transparent_55%)]" />

      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <SectionHead
            index="03"
            eyebrow="Performance"
            title="Your growth, our drive"
            description="Your growth shapes how we operate. We align delivery to the outcomes your board cares about — quality, velocity, and cost efficiency working as one system."
            align="center"
            tone="light"
            className="mx-auto max-w-3xl"
            action={
              <Link
                href="/work"
                className="group mt-6 inline-flex items-center gap-2 rounded-full border border-[#0f172a]/15 bg-white px-5 py-2.5 text-sm font-medium text-[#0f172a] shadow-sm transition hover:border-sky-500/40 hover:bg-sky-50 md:mt-0"
              >
                Explore outcomes
                <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {cards.map((card, i) => (
            <Reveal key={`${card.kind}-${i}`} delay={0.05 * i}>
              {card.kind === "brand" ? (
                <motion.article
                  className="relative flex min-h-[340px] overflow-hidden rounded-2xl border border-black/[0.06] bg-[#0a0d14] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] sm:min-h-[380px]"
                  whileHover={reduce ? undefined : { y: -3 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
                  <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-8">
                    <p className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                      {card.brandLine}
                      <span className="align-super text-lg font-semibold text-white/70">
                        ™
                      </span>
                    </p>
                  </div>
                  <CornerBrackets className="border-white/50" />
                </motion.article>
              ) : card.kind === "support" ? (
                <motion.article
                  className="relative flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.12)] sm:min-h-[380px]"
                  whileHover={reduce ? undefined : { y: -3 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="border-b border-black/[0.06] px-5 pb-4 pt-5">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-[#0f172a]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                      {card.bodyTop}
                    </p>
                  </div>
                  <div className="relative min-h-[160px] flex-1">
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1280px) 50vw, 25vw"
                    />
                  </div>
                  <CornerBrackets />
                </motion.article>
              ) : (
                <ContentCard card={card} reduce={reduce} />
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <ul className="mx-auto mt-12 flex max-w-2xl flex-col gap-3 text-center text-sm text-[#64748b] md:flex-row md:flex-wrap md:justify-center md:gap-x-8">
            {[
              "SLA-backed workflows",
              "Stakeholder-ready reporting",
              "Continuous improvement loops",
            ].map((line) => (
              <li key={line} className="flex items-center justify-center gap-2">
                <Sparkles className="size-3.5 shrink-0 text-sky-600" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
