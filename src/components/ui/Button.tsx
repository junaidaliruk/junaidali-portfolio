import type { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  ariaLabel?: string;
}

/**
 * Studio Nika-style animated CTA button.
 * - Vertical text slide on hover
 * - Avatar reveal with blur-to-sharp animation
 * - "YOU" circle + "LET'S TALK!" text
 * - Keyboard accessible with focus-visible
 * - Respects prefers-reduced-motion
 */
export function Button({
  href = "#",
  children = "BOOK A CALL",
  className = "",
  variant = "primary",
  ariaLabel = "Book a call with Junaid",
}: ButtonProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <a
      href={href}
      className={`btn btn--${variant} ${className}`}
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
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
