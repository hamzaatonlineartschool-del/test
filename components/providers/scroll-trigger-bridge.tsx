"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { registerGsapScroll, ScrollTrigger } from "@/lib/gsap-client";

/**
 * Syncs GSAP ScrollTrigger with Lenis virtual scroll (scroller proxy + refresh).
 * Must render inside ReactLenis.
 */
export function ScrollTriggerBridge() {
  const lenis = useLenis();

  useEffect(() => {
    registerGsapScroll();
    if (!lenis) return;

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onLenisScroll);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.clearTimeout(t);
      lenis.off("scroll", onLenisScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [lenis]);

  return null;
}
