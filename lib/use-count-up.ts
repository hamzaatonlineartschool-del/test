"use client";

import { useEffect, useState } from "react";

/**
 * Animates an integer from 0 to `target` when `active` becomes true.
 * Respects reduced motion via caller (pass active false to snap).
 */
export function useCountUp(target: number, active: boolean, durationMs = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let start: number | undefined;
    let frame: number;
    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    const tick = (now: number) => {
      if (start === undefined) start = now;
      const p = Math.min((now - start) / durationMs, 1);
      setValue(Math.round(target * easeOutCubic(p)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, durationMs]);

  return value;
}
