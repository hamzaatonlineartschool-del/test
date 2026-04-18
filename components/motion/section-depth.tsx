"use client";

import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { gsap } from "gsap";
import { registerGsapScroll } from "@/lib/gsap-client";
import { cn } from "@/lib/utils";

type Tone = "sky" | "violet" | "cyan";

const toneClass: Record<Tone, { a: string; b: string }> = {
  sky: {
    a: "bg-sky-500/[0.11]",
    b: "bg-cyan-500/[0.08]",
  },
  violet: {
    a: "bg-violet-500/[0.12]",
    b: "bg-sky-500/[0.07]",
  },
  cyan: {
    a: "bg-cyan-500/[0.09]",
    b: "bg-indigo-500/[0.1]",
  },
};

type SectionDepthProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  tone?: Tone;
  className?: string;
};

/**
 * Large blurred fields that drift at different speeds while the section crosses
 * the viewport — adds depth without fighting Lenis (scrubbed GSAP).
 */
export function SectionDepth({
  sectionRef,
  tone = "sky",
  className,
}: SectionDepthProps) {
  const reduce = useReducedMotion();
  const orbA = useRef<HTMLDivElement>(null);
  const orbB = useRef<HTMLDivElement>(null);
  const tc = toneClass[tone];

  useGSAP(
    () => {
      registerGsapScroll();
      const root = sectionRef.current;
      if (reduce || !root || !orbA.current || !orbB.current) return;

      const t1 = gsap.fromTo(
        orbA.current,
        { y: -36, x: -12 },
        {
          y: 48,
          x: 16,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.75,
          },
        },
      );

      const t2 = gsap.fromTo(
        orbB.current,
        { y: 40, x: 20 },
        {
          y: -56,
          x: -24,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.42,
          },
        },
      );

      return () => {
        t1.scrollTrigger?.kill();
        t1.kill();
        t2.scrollTrigger?.kill();
        t2.kill();
      };
    },
    { dependencies: [reduce, sectionRef, tone] },
  );

  if (reduce) {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden opacity-40",
          className,
        )}
        aria-hidden
      >
        <div
          className={cn(
            "absolute -left-[20%] top-0 h-[55%] w-[70%] rounded-full blur-[120px]",
            tc.a,
          )}
        />
        <div
          className={cn(
            "absolute -right-[15%] bottom-0 h-[50%] w-[60%] rounded-full blur-[100px]",
            tc.b,
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <div
        ref={orbA}
        className={cn(
          "absolute -left-[20%] top-0 h-[55%] w-[70%] rounded-full blur-[120px]",
          tc.a,
        )}
      />
      <div
        ref={orbB}
        className={cn(
          "absolute -right-[15%] bottom-0 h-[50%] w-[60%] rounded-full blur-[100px]",
          tc.b,
        )}
      />
    </div>
  );
}
