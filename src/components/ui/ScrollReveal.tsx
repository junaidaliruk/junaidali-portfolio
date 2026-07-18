import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * ScrollReveal wrapper component.
 * - Uses native CSS `animation-timeline: view()` where supported (Chrome, Edge, Safari 26+)
 * - Falls back to IntersectionObserver for Firefox and older browsers
 * - Respects prefers-reduced-motion
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if native scroll-driven animations are supported
    const supportsNative =
      CSS.supports("(animation-timeline: view()) and (animation-range: entry)");

    // Check reduced motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (supportsNative || prefersReduced) {
      // Native CSS handles it, or user prefers reduced motion — no JS needed
      return;
    }

    // Fallback: IntersectionObserver
    el.classList.add("scroll-reveal-fallback");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Apply delay if specified
            if (delay > 0) {
              setTimeout(() => {
                el.classList.add("is-visible");
              }, delay);
            } else {
              el.classList.add("is-visible");
            }
            observer.unobserve(el);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}
