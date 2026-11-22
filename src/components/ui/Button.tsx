import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface ButtonProps {
  href?: string;
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  ariaLabel?: string;
  target?: string;
}

/**
 * Studio Nika-style animated CTA button.
 * - Vertical text slide on hover
 * - Avatar reveal with blur-to-sharp animation
 * - "YOU" circle + "LET'S TALK!" text
 * - Magnetic pull + cursor-tracked sheen
 * - Keyboard accessible with focus-visible
 * - Respects prefers-reduced-motion
 */
export function Button({
  href = "#",
  children = "BOOK A CALL",
  className = "",
  variant = "primary",
  ariaLabel,
  target,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const applyPointer = useCallback(() => {
    frameRef.current = null;
    const el = ref.current;
    if (!el) return;

    const { x, y } = pointer.current;
    el.style.setProperty("--btn-x", `${(x * 0.16).toFixed(2)}px`);
    el.style.setProperty("--btn-y", `${(y * 0.3).toFixed(2)}px`);
    el.style.setProperty("--mx", `${(50 + (x / el.offsetWidth) * 100).toFixed(2)}%`);
    el.style.setProperty("--my", `${(50 + (y / el.offsetHeight) * 100).toFixed(2)}%`);
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (prefersReducedMotion || event.pointerType === "touch") return;

      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      pointer.current = {
        x: event.clientX - rect.left - rect.width / 2,
        y: event.clientY - rect.top - rect.height / 2,
      };

      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(applyPointer);
      }
    },
    [applyPointer, prefersReducedMotion]
  );

  const handlePointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    pointer.current = { x: 0, y: 0 };

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    el.style.setProperty("--btn-x", "0px");
    el.style.setProperty("--btn-y", "0px");
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  }, []);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    []
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (target === "_blank") {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = href;
      }
    }
  };

  const label =
    ariaLabel ?? (typeof children === "string" ? children : "Contact Junaid");

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`btn btn--${variant} ${className}`}
      aria-label={label}
      onKeyDown={handleKeyDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Black pill background */}
      <span className="btn__bg" aria-hidden="true" />

      {/* Content */}
      <span className="btn__content">
        {/* Text mask — default label */}
        <span className="btn__text-mask">
          <span className="btn__label">{children}</span>
        </span>

        {/* Hover state — avatars + LET'S TALK */}
        <span className="btn__hover" aria-hidden="true">
          <span className="btn__avatar-group">
            {/* Avatar 1 — Team member */}
            <span className="btn__avatar">
              <img
                src="https://framerusercontent.com/images/ZS17v4JTBfzRG5MO530mtyF9Yug.png?width=200&height=200"
                alt=""
                width={50}
                height={50}
                decoding="async"
                loading="eager"
              />
            </span>

            {/* Plus sign */}
            <span className="btn__plus">+</span>

            {/* Avatar 2 — YOU */}
            <span className="btn__avatar btn__avatar--you">
              <span className="btn__avatar-you-text">YOU</span>
            </span>
          </span>

          {/* LET'S TALK text */}
          <span className="btn__talk">LET'S TALK!</span>
        </span>
      </span>
    </a>
  );
}
