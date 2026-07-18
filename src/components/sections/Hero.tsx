import { useState, useEffect } from "react";
import { Button } from "../ui/Button";

/**
 * Hero section — matches Studio Nika's layout exactly.
 */

const ROTATING_WORDS = [
  "Startups that move fast.",
  "Teams that ship.",
  "Ambitious brands.",
  "Founders who scale.",
];

const DESCRIPTION_PARTS = [
  { text: "I build ", gray: true },
  { text: "full-stack TypeScript apps", gray: false, bold: true },
  { text: " — ", gray: true },
  { text: "real-time features", gray: false, bold: true },
  { text: ", ", gray: true },
  { text: "3D interfaces", gray: false, bold: true },
  { text: ", ", gray: true },
  { text: "AI tools", gray: false, bold: true },
  { text: ".", gray: true },
];

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsAnimating(false);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section section--hero" aria-labelledby="hero-heading">
      {/* Decorative guide lines */}
      <div className="guide-left" aria-hidden="true" />
      <div className="guide-right" aria-hidden="true" />

      <div className="hero-container">
        {/* ── Main heading ── */}
        <h1 id="hero-heading" className="hero-heading text-balance">
          I Design & Develop Websites for
        </h1>

        {/* ── Rotating subtitle ── */}
        <div className="hero-rotating-wrapper" aria-live="polite" aria-atomic="true">
          <p className={`hero-rotating-text ${isAnimating ? "hero-rotating-text--exit" : ""}`}>
            {ROTATING_WORDS[currentWordIndex]}
          </p>
        </div>

        {/* ── Description ── */}
        <p className="hero-description">
          {DESCRIPTION_PARTS.map((part, i) => (
            <span
              key={i}
              className={part.bold ? "hero-desc-bold" : part.gray ? "hero-desc-gray" : ""}
            >
              {part.text}
            </span>
          ))}
        </p>

        {/* ── CTA Button ── */}
        <div className="hero-cta">
          <Button href="https://wa.me/+923292876526" target="_blank">CONTACT ME</Button>
        </div>
      </div>
    </section>
  );
}
