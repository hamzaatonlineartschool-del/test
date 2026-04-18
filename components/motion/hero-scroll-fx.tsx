"use client";

import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { gsap } from "gsap";
import { registerGsapScroll } from "@/lib/gsap-client";

type HeroScrollFxProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  bgRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

/**
 * Hero “wow”: background scales / drifts while foreground drifts opposite + fades
 * slightly — reads as depth. Includes two large ambient orbs with independent scrub.
 */
export function HeroScrollFx({
  sectionRef,
  bgRef,
  contentRef,
}: HeroScrollFxProps) {
  const reduce = useReducedMotion();
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapScroll();
      const root = sectionRef.current;
      const bg = bgRef.current;
      const fg = contentRef.current;
      if (reduce || !root || !bg || !fg) return;

      const tweens: ReturnType<typeof gsap.fromTo>[] = [];

      tweens.push(
        gsap.fromTo(
          bg,
          { scale: 1, yPercent: 0 },
          {
            scale: 1.1,
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 0.55,
            },
          },
        ),
      );

      tweens.push(
        gsap.fromTo(
          fg,
          { yPercent: 0, opacity: 1 },
          {
            yPercent: -5,
            opacity: 0.82,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 0.42,
            },
          },
        ),
      );

      if (orb1.current) {
        tweens.push(
          gsap.fromTo(
            orb1.current,
            { y: 0, scale: 1 },
            {
              y: -140,
              scale: 1.18,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom top",
                scrub: 0.32,
              },
            },
          ),
        );
      }

      if (orb2.current) {
        tweens.push(
          gsap.fromTo(
            orb2.current,
            { y: 0, scale: 1 },
            {
              y: 110,
              scale: 1.22,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom top",
                scrub: 0.68,
              },
            },
          ),
        );
      }

      return () => {
        tweens.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
      };
    },
    { dependencies: [reduce, sectionRef, bgRef, contentRef] },
  );

  if (reduce) return null;

  return (
    <>
      <div
        ref={orb1}
        className="pointer-events-none absolute -left-[30%] top-[10%] z-[5] size-[min(90vw,720px)] rounded-full bg-sky-500/25 blur-[100px]"
        aria-hidden
      />
      <div
        ref={orb2}
        className="pointer-events-none absolute -right-[25%] bottom-[5%] z-[5] size-[min(80vw,560px)] rounded-full bg-violet-600/18 blur-[110px]"
        aria-hidden
      />
    </>
  );
}
