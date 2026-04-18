"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Stagger, StaggerChild } from "@/components/motion/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { siteMedia } from "@/lib/site-media";

const projects = [
  {
    year: "2025",
    tag: "Customer experience",
    title: "Global support redesign for a fintech scale-up",
    image: siteMedia.careImage,
  },
  {
    year: "2024",
    tag: "Digital product",
    title: "Engineering pod embedded with an e‑commerce brand",
    image: siteMedia.devImage,
  },
  {
    year: "2024",
    tag: "Operations",
    title: "Back-office automation across finance & procurement",
    image: siteMedia.talentImage,
  },
] as const;

export function WorkTeaser() {
  const reduce = useReducedMotion();

  return (
    <section
      id="work"
      className="scroll-mt-20 border-t border-white/[0.06] bg-[#060810] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="04"
          eyebrow="Work"
          title="Programs that shipped under pressure — and stayed resilient"
          description="A snapshot of the kinds of partnerships we build. Full case studies live on our work page."
          action={
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition hover:border-sky-500/40 hover:bg-sky-500/10"
            >
              View all work
              <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          }
        />

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3" stagger={0.1}>
          {projects.map((p) => (
            <StaggerChild key={p.title}>
              <motion.article
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080c16]"
                whileHover={reduce ? {} : { y: -4 }}
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080c16] via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/85 ring-1 ring-white/15 backdrop-blur-sm">
                    {p.year}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-400/90">
                    {p.tag}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-white">
                    <Link href="/work" className="after:absolute after:inset-0">
                      {p.title}
                    </Link>
                  </h3>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-sky-400 opacity-0 transition group-hover:opacity-100">
                    Open
                    <ArrowUpRight className="size-4" />
                  </div>
                </div>
              </motion.article>
            </StaggerChild>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
