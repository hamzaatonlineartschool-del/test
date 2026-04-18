"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { siteMedia } from "@/lib/site-media";
import { cn } from "@/lib/utils";

type Capability = {
  id: string;
  title: string;
  image: string;
  blurb: string;
};

const CAPABILITIES: Capability[] = [
  {
    id: "carpentry",
    title: "Marine carpentry & custom woodworking",
    image: siteMedia.story.capabilities.carpentry,
    blurb:
      "Precision joinery, veneers, and bespoke interiors built for motion, humidity, and long sea hours — from salons to crew quarters.",
  },
  {
    id: "technical",
    title: "Advanced technical installations",
    image: siteMedia.story.capabilities.technical,
    blurb:
      "Systems integration, AV, navigation, and electrical executed to class standards with clean cable routes, labeling, and sea-trial verification.",
  },
  {
    id: "engines",
    title: "Marine engine excellence",
    image: siteMedia.story.capabilities.engines,
    blurb:
      "Major-brand service, diagnostics, and repower planning — aligned with OEM procedures and documented handover for owners and crew.",
  },
  {
    id: "refit",
    title: "Refit program management",
    image: siteMedia.story.capabilities.refit,
    blurb:
      "Single point of contact across yard slots, specialists, and sea trials — transparent milestones from concept to delivery.",
  },
  {
    id: "support",
    title: "Global support network",
    image: siteMedia.story.capabilities.support,
    blurb:
      "Coordinated response for urgent work and scheduled maintenance, with clear communication across time zones and ports.",
  },
];

export function StoryCapabilities() {
  const reduceMotion = Boolean(useReducedMotion());
  const [paused, setPaused] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const titleId = useId();
  const open = CAPABILITIES.find((c) => c.id === openId) ?? null;

  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId, close]);

  useEffect(() => {
    if (!openId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openId]);

  return (
    <section
      className="relative overflow-hidden bg-[#f4f4f2] py-20 md:py-28"
      aria-labelledby={titleId}
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.35em] text-slate-500">
          09 · Capabilities
        </p>
        <h2
          id={titleId}
          className="mt-4 text-center font-display text-2xl font-semibold uppercase leading-tight tracking-[0.08em] text-slate-900 sm:text-3xl md:text-4xl"
        >
          Your complete partner for luxury yacht transformations and outstanding
          support
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-slate-600 md:text-base">
          Hover the strip to pause. Tap{" "}
          <span className="font-medium text-slate-800">+</span> on a card to read
          more.
        </p>
      </div>

      <div className="mt-12 md:mt-16">
        {reduceMotion ? (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <CapabilityCard
                key={c.id}
                item={c}
                onOpen={() => setOpenId(c.id)}
              />
            ))}
          </div>
        ) : (
          <div
            className="overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className={cn(
                "flex w-max gap-5 px-6 pb-2 md:gap-8",
                "animate-capabilities-marquee motion-reduce:animate-none",
                paused && "[animation-play-state:paused]",
              )}
            >
              {[...CAPABILITIES, ...CAPABILITIES].map((c, i) => (
                <CapabilityCard
                  key={`${c.id}-${i}`}
                  item={c}
                  onOpen={() => setOpenId(c.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-6 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-slate-700 underline-offset-4 transition hover:text-slate-900 hover:underline"
        >
          Explore services
          <span aria-hidden>→</span>
        </Link>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${titleId}-modal`}
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            aria-label="Close"
            onClick={close}
          />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              onClick={close}
              aria-label="Close dialog"
            >
              <span className="text-xl leading-none">×</span>
            </button>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
              Capability
            </p>
            <h3
              id={`${titleId}-modal`}
              className="mt-2 font-display text-xl font-semibold uppercase leading-snug tracking-[0.06em] text-slate-900"
            >
              {open.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {open.blurb}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
                onClick={close}
              >
                View services
              </Link>
              <button
                type="button"
                className="inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-800 transition hover:border-slate-400"
                onClick={close}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function CapabilityCard({
  item,
  onOpen,
}: {
  item: Capability;
  onOpen: () => void;
}) {
  return (
    <article className="relative aspect-[3/4] w-[min(78vw,320px)] shrink-0 overflow-hidden rounded-2xl shadow-lg shadow-slate-900/10 md:w-[360px]">
      <Image
        src={item.image}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 78vw, 360px"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
        aria-hidden
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-xl font-light text-white shadow-lg ring-1 ring-white/20 transition hover:bg-black hover:ring-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={`More about ${item.title}`}
      >
        +
      </button>
      <p className="absolute bottom-5 left-5 right-5 font-display text-xs font-semibold uppercase leading-snug tracking-[0.12em] text-white md:text-sm">
        {item.title}
      </p>
    </article>
  );
}
