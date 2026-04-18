"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Headphones, Users } from "lucide-react";
import { ParallaxImageFill } from "@/components/motion/parallax";
import { SectionDepth } from "@/components/motion/section-depth";
import { Stagger, StaggerChild } from "@/components/motion/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { siteMedia } from "@/lib/site-media";
import { cn } from "@/lib/utils";

const blocks = [
  {
    icon: Headphones,
    title: "Customer care",
    body:
      "It’s not just about support: it’s about building lasting relationships with your customers. We ensure every interaction leaves a positive impact, fostering loyalty and trust.",
    image: siteMedia.careImage,
    alt: "Customer support team collaborating",
    gradient: "from-sky-500/30 to-cyan-500/10",
    accent: "sky" as const,
  },
  {
    icon: Users,
    title: "Talentlutions",
    body:
      "We don't just find talent — we find the right talent that aligns with your business goals, ensuring that every team member adds value and drives performance.",
    image: siteMedia.talentImage,
    alt: "Team meeting and talent planning",
    gradient: "from-violet-500/30 to-sky-500/10",
    accent: "violet" as const,
  },
];

export function StoryDualServices() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06] bg-[#05070d] px-5 py-24 md:px-10 md:py-32"
    >
      <SectionDepth sectionRef={sectionRef} tone="violet" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHead
          index="07"
          eyebrow="People & care"
          title="Built around your customers and teams"
          description="Two pillars that sit at the heart of how we run outsourced operations for global brands."
        />

        {/* Big section divider */}
        <div
          className="relative mx-auto mt-14 max-w-5xl md:mt-16"
          aria-hidden
        >
          <div className="h-[3px] rounded-full bg-gradient-to-r from-transparent via-sky-400/45 to-transparent shadow-[0_0_24px_rgba(56,189,248,0.25)] md:h-1" />
          <div className="pointer-events-none absolute inset-x-[12%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        <Stagger
          className="mt-14 flex flex-col gap-10 lg:mt-16 lg:flex-row lg:items-stretch lg:gap-0 lg:divide-x lg:divide-white/[0.12]"
          stagger={0.12}
        >
          {blocks.map((b) => (
            <StaggerChild
              key={b.title}
              className="min-w-0 flex-1 lg:first:pr-8 lg:last:pl-8"
            >
              <motion.article
                className={cn(
                  "relative flex h-full min-h-[480px] flex-col overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.02] shadow-[0_40px_100px_-48px_rgba(0,0,0,0.9)]",
                  "lg:min-h-[520px]",
                )}
                whileHover={reduce ? {} : { y: -4 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              >
                <div className="relative min-h-[280px] flex-1 lg:min-h-[320px]">
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br opacity-60 blur-3xl",
                      b.gradient,
                    )}
                  />
                  <ParallaxImageFill
                    src={b.image}
                    alt={b.alt}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    range={26}
                    scrub={0.5}
                    containerClassName="absolute inset-0 h-full min-h-[280px] lg:min-h-[320px]"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#05070d] via-[#05070d]/55 to-transparent" />
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 z-[2] opacity-40 mix-blend-soft-light",
                      b.accent === "sky"
                        ? "bg-gradient-to-br from-sky-500/20 to-transparent"
                        : "bg-gradient-to-bl from-violet-500/20 to-transparent",
                    )}
                  />
                </div>

                <div className="relative z-[3] flex flex-1 flex-col justify-end p-8 md:p-10">
                  <div
                    className={cn(
                      "mb-6 inline-flex size-16 items-center justify-center rounded-2xl ring-1 ring-white/10",
                      b.accent === "sky"
                        ? "bg-sky-500/15 text-sky-200"
                        : "bg-violet-500/15 text-violet-200",
                    )}
                  >
                    <b.icon className="size-8" aria-hidden />
                  </div>
                  <h3 className="font-display text-3xl font-semibold uppercase leading-tight tracking-[0.06em] text-white md:text-[2rem]">
                    {b.title}
                  </h3>
                  <p className="mt-4 max-w-prose text-base leading-relaxed text-white/70 md:text-lg">
                    {b.body}
                  </p>
                </div>
              </motion.article>
            </StaggerChild>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
