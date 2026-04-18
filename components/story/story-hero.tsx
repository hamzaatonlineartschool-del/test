"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, ChevronDown, Phone } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { LogoMarquee } from "@/components/home/logo-marquee";
import { heroPillars, heroSlides, type HeroSlide } from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function Stars() {
  return (
    <span className="flex gap-0.5 text-amber-300/90" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className="size-3.5 md:size-4"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l2.9 7.3H22l-6 4.6 2.3 7.1L12 17.8 5.7 21l2.3-7.1-6-4.6h7.1L12 2z" />
        </svg>
      ))}
    </span>
  );
}

const slideEase = [0.22, 1, 0.36, 1] as const;

export function StoryHero() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  /** +1 = forward (enter from right), -1 = back (enter from left) */
  const [direction, setDirection] = useState(0);
  const slide = heroSlides[activeIndex] as HeroSlide;

  const goTo = useCallback((i: number) => {
    const next = Math.max(0, Math.min(heroSlides.length - 1, i));
    if (next === activeIndex) return;
    setDirection(next > activeIndex ? 1 : -1);
    setActiveIndex(next);
  }, [activeIndex]);

  useEffect(() => {
    if (reduceMotion) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        goTo(activeIndex + 1);
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, goTo, reduceMotion]);

  const textVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir >= 0 ? 48 : -48,
    }),
    animate: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir >= 0 ? -40 : 40,
    }),
  } as const;

  return (
    <section id="top" className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      {/* Full-bleed slides — slide in / slide out (direction-aware) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {reduceMotion ? (
          heroSlides.map((s, i) => {
            const active = i === activeIndex;
            return (
              <div
                key={s.id}
                className="absolute inset-0"
                style={{ zIndex: active ? 2 : 1, opacity: active ? 1 : 0 }}
                aria-hidden={!active}
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  priority={i === 0}
                  className="object-cover object-center"
                  sizes="100vw"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r to-transparent",
                    s.overlayFrom,
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03060c]/95 via-[#05080f]/45 to-[#05080f]/25" />
                <div className="absolute inset-0 bg-black/25" />
              </div>
            );
          })
        ) : (
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.div
              key={slide.id}
              custom={direction}
              aria-hidden
              variants={{
                enter: (dir: number) => ({
                  x: dir >= 0 ? "100%" : "-100%",
                }),
                center: { x: 0 },
                exit: (dir: number) => ({
                  x: dir >= 0 ? "-100%" : "100%",
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.72, ease: slideEase }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={activeIndex === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-r to-transparent",
                  slide.overlayFrom,
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03060c]/95 via-[#05080f]/45 to-[#05080f]/25" />
              <div className="absolute inset-0 bg-black/25" />
            </motion.div>
          </AnimatePresence>
        )}
        <div
          className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.04]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex min-h-[100dvh] flex-col px-5 pb-10 pt-24 md:px-10 md:pb-14 md:pt-28 lg:px-12">
        <div className="flex min-h-0 flex-1 flex-col gap-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-12">
          {/* Left: headline + trust */}
          <div className="flex max-w-xl flex-col justify-center lg:max-w-[min(36rem,52%)] lg:pt-4">
            <motion.p
              key={`kicker-${slide.id}`}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.42, ease }}
              className="text-[11px] font-semibold uppercase tracking-[0.38em] text-white/55"
            >
              {slide.kicker}
            </motion.p>

            {reduceMotion ? (
              <div key={slide.id}>
                <h1 className="mt-4 font-display text-[clamp(1.85rem,5.5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight text-white [text-wrap:balance]">
                  {slide.headline}
                </h1>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-white/72 md:text-lg md:leading-relaxed">
                  {slide.subline}
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={slide.id}
                  custom={direction}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.52, ease: slideEase }}
                >
                  <h1 className="mt-4 font-display text-[clamp(1.85rem,5.5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight text-white [text-wrap:balance]">
                    {slide.headline}
                  </h1>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-white/72 md:text-lg md:leading-relaxed">
                    {slide.subline}
                  </p>
                </motion.div>
              </AnimatePresence>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2.5">
                <Stars />
                <span className="text-sm font-medium text-white/75">
                  4.9/5.0 · Client satisfaction
                </span>
              </div>
              <a
                href="tel:+441273920627"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
              >
                <Phone className="size-4 text-sky-400/90" aria-hidden />
                UK +44 1273 920627
              </a>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-sky-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_48px_-12px_rgba(56,189,248,0.5)] ring-1 ring-white/10 transition hover:bg-sky-400"
              >
                Book intro call
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/work"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white/95 backdrop-blur-sm transition hover:border-white/35 hover:bg-white/10"
              >
                Latest work
              </Link>
            </div>
          </div>

          {/* Right: pillars + slide rail */}
          <div className="flex flex-col items-stretch gap-8 lg:w-[min(22rem,38%)] lg:items-end lg:justify-between lg:pt-6">
            <nav
              className="flex flex-col gap-1 lg:items-end"
              aria-label="Focus areas"
            >
              {heroPillars.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group flex items-center justify-end gap-3 py-2 text-right font-display text-lg font-medium tracking-tight text-white/90 transition hover:text-white md:text-xl"
                >
                  <span>{p.label}</span>
                  <ArrowUpRight className="size-5 shrink-0 text-white/40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-300" />
                </Link>
              ))}
            </nav>

            <div
              className="flex items-end justify-end gap-2 md:gap-3"
              role="tablist"
              aria-label="Hero slides"
            >
              {heroSlides.map((s, i) => (
                <motion.button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Slide ${i + 1}: ${s.headline}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    "relative h-24 w-10 shrink-0 overflow-hidden rounded-md border-2 md:h-32 md:w-12",
                    i === activeIndex
                      ? "border-white shadow-[0_0_24px_-4px_rgba(255,255,255,0.35)]"
                      : "border-white/25 opacity-80 hover:border-white/50 hover:opacity-100",
                  )}
                  whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                >
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  <span
                    className="absolute inset-0 bg-black/35"
                    aria-hidden
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Mega type — bleeds at bottom */}
        <div className="relative z-0 mt-6 overflow-hidden pb-2 md:mt-10">
          <p
            className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[clamp(2.75rem,17vw,12rem)] font-bold leading-[0.82] tracking-[-0.02em] text-white/[0.09] md:text-left"
            aria-hidden
          >
            CORP HAVEN
          </p>
        </div>

        <div className="relative z-10 mt-4 w-full md:mt-6">
          <LogoMarquee />
        </div>
      </div>

      {!reduceMotion && (
        <motion.a
          href="#about"
          className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/45 md:bottom-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.72, y: 0 }}
          transition={{ delay: 0.9, duration: 0.55, ease }}
          aria-label="Scroll to next chapter"
        >
          <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="size-5 text-sky-400/80" />
          </motion.span>
        </motion.a>
      )}
    </section>
  );
}
