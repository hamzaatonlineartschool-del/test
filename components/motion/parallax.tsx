"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { registerGsapScroll } from "@/lib/gsap-client";
import { cn } from "@/lib/utils";

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel as % of inner height (larger = stronger parallax). */
  range?: number;
  /** Lower = smoother / more “inertia” (0.35–0.85 works well). */
  scrub?: number;
};

/**
 * Smooth vertical parallax: inner layer moves while the clip stays fixed.
 * Best paired with overflow-hidden parents.
 */
export function ParallaxLayer({
  children,
  className,
  range = 14,
  scrub = 0.55,
}: ParallaxLayerProps) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapScroll();
      if (reduce || !wrap.current || !inner.current) return;

      const tween = gsap.fromTo(
        inner.current,
        { yPercent: -range * 0.35 },
        {
          yPercent: range * 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [reduce, range, scrub] },
  );

  return (
    <div ref={wrap} className={cn("overflow-hidden", className)}>
      <div ref={inner} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}

type ParallaxImageFillProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  containerClassName?: string;
  range?: number;
  scrub?: number;
  priority?: boolean;
};

/** next/image fill inside a parallax window (extra vertical bleed for motion). */
export function ParallaxImageFill({
  className,
  containerClassName,
  range = 22,
  scrub = 0.55,
  alt,
  src,
  sizes,
  priority,
}: ParallaxImageFillProps) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapScroll();
      if (reduce || !wrap.current || !inner.current) return;

      const tween = gsap.fromTo(
        inner.current,
        { yPercent: -range * 0.32 },
        {
          yPercent: range * 0.32,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [reduce, range, scrub] },
  );

  return (
    <div
      ref={wrap}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <div
        ref={inner}
        className="absolute inset-0 min-h-[118%] w-full -translate-y-[8%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn("object-cover", className)}
          sizes={sizes}
        />
      </div>
    </div>
  );
}
