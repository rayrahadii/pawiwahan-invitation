import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Wires up Lenis for inertia-based smooth scrolling on the whole document.
 * - Skips entirely if the user prefers reduced motion.
 * - Only runs while `enabled` is true (we keep it off while the cover
 *   "gate" screen is showing so the page can't be scrolled behind it).
 */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [enabled]);
}
