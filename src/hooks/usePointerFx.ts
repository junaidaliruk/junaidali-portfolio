import { useEffect } from "react";

const SPOTLIGHT_SELECTOR = "[data-spotlight], [data-ambient]";
const TILT_SELECTOR = "[data-tilt]";
const TILT_STRENGTH = 7;
const PARALLAX_STRENGTH = 12;

function resetSpotlight(el: HTMLElement | null) {
  if (!el) return;
  el.style.setProperty("--mx", "50%");
  el.style.setProperty("--my", "50%");
}

function resetTilt(el: HTMLElement | null) {
  if (!el) return;
  el.style.setProperty("--tilt-x", "0deg");
  el.style.setProperty("--tilt-y", "0deg");
  el.style.setProperty("--px", "0px");
  el.style.setProperty("--py", "0px");
}

export function usePointerFx() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(hover: none)").matches;

    if (reducedMotion || coarsePointer) return;

    let frame: number | null = null;
    let clientX = 0;
    let clientY = 0;
    let pointerTarget: Element | null = null;
    let activeSpotlight: HTMLElement | null = null;
    let activeTilt: HTMLElement | null = null;

    const flush = () => {
      frame = null;

      const target = pointerTarget;
      if (!target) return;

      const spotlight = target.closest<HTMLElement>(SPOTLIGHT_SELECTOR);
      if (spotlight !== activeSpotlight) {
        resetSpotlight(activeSpotlight);
        activeSpotlight = spotlight;
      }

      if (spotlight) {
        const rect = spotlight.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        spotlight.style.setProperty("--mx", `${x.toFixed(2)}%`);
        spotlight.style.setProperty("--my", `${y.toFixed(2)}%`);
      }

      const tilt = target.closest<HTMLElement>(TILT_SELECTOR);
      if (tilt !== activeTilt) {
        resetTilt(activeTilt);
        activeTilt = tilt;
      }

      if (tilt) {
        const rect = tilt.getBoundingClientRect();
        const normalizedX = (clientX - rect.left) / rect.width - 0.5;
        const normalizedY = (clientY - rect.top) / rect.height - 0.5;

        tilt.style.setProperty(
          "--tilt-y",
          `${(normalizedX * TILT_STRENGTH).toFixed(2)}deg`
        );
        tilt.style.setProperty(
          "--tilt-x",
          `${(-normalizedY * TILT_STRENGTH).toFixed(2)}deg`
        );
        tilt.style.setProperty(
          "--px",
          `${(normalizedX * PARALLAX_STRENGTH).toFixed(2)}px`
        );
        tilt.style.setProperty(
          "--py",
          `${(normalizedY * PARALLAX_STRENGTH).toFixed(2)}px`
        );
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      clientX = event.clientX;
      clientY = event.clientY;
      pointerTarget = event.target instanceof Element ? event.target : null;

      if (frame === null) {
        frame = requestAnimationFrame(flush);
      }
    };

    const onPointerLeave = () => {
      resetSpotlight(activeSpotlight);
      resetTilt(activeTilt);
      activeSpotlight = null;
      activeTilt = null;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);
}
