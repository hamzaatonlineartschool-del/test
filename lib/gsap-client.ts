/**
 * Client-only GSAP + ScrollTrigger setup for scroll-driven animation (parallax, pin, scrub).
 *
 * When you add sections that use ScrollTrigger with Lenis smooth scroll, register the
 * scroller proxy so scrubbed timelines follow Lenis's virtual scroll position.
 *
 * Pattern (run once in a client component after Lenis mounts):
 *
 * ```ts
 * import gsap from "gsap";
 * import { ScrollTrigger } from "gsap/ScrollTrigger";
 * import { useLenis } from "lenis/react";
 *
 * gsap.registerPlugin(ScrollTrigger);
 *
 * const lenis = useLenis();
 * useEffect(() => {
 *   if (!lenis) return;
 *   ScrollTrigger.scrollerProxy(document.documentElement, {
 *     scrollTop(value) {
 *       if (arguments.length && value !== undefined) {
 *         lenis.scrollTo(value, { immediate: true });
 *       }
 *       return lenis.scroll;
 *     },
 *     getBoundingClientRect() {
 *       return {
 *         top: 0,
 *         left: 0,
 *         width: window.innerWidth,
 *         height: window.innerHeight,
 *       };
 *     },
 *   });
 *   const onLenisScroll = () => ScrollTrigger.update();
 *   lenis.on("scroll", onLenisScroll);
 *   return () => {
 *     lenis.off("scroll", onLenisScroll);
 *   };
 * }, [lenis]);
 * ```
 *
 * Also call `ScrollTrigger.refresh()` after layout/images load. Prefer `useGSAP` from
 * `@gsap/react` for React-safe cleanup.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Idempotent plugin registration for use in client components. */
export function registerGsapScroll(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };
