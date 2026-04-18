"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { ScrollTriggerBridge } from "@/components/providers/scroll-trigger-bridge";

type SmoothScrollProps = {
  children: React.ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.65,
      }}
    >
      <ScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
