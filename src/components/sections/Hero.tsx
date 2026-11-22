import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { SplitText } from "../ui/SplitText";

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
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsEntering(true);
        setIsAnimating(false);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isEntering) return;

    const frame = requestAnimationFrame(() => setIsEntering(false));
    return () => cancelAnimationFrame(frame);
  }, [isEntering, currentWordIndex]);

  return (
    <section
      className="section section--hero"
      aria-labelledby="hero-heading"
      data-ambient
    >
      {/* Decorative guide lines */}
      <div className="guide-left" aria-hidden="true" />
      <div className="guide-right" aria-hidden="true" />

      <div className="hero-container">
        {/* ── Main heading ── */}
        <SplitText
          as="h1"
          id="hero-heading"
          className="hero-heading"
          text="I Design & Develop Websites for"
          stagger={60}
        />

        {/* ── Rotating subtitle ── */}
        <div className="hero-rotating-wrapper" aria-live="polite" aria-atomic="true">
          <p
            key={currentWordIndex}
            className={`hero-rotating-text ${
              isAnimating ? "hero-rotating-text--exit" : ""
            } ${isEntering ? "hero-rotating-text--enter" : ""}`}
          >
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

      {/* ── Scroll cue ── */}
      <a className="scroll-cue" href="#portfolio" aria-label="Scroll to portfolio">
        <span className="scroll-cue__label">Scroll</span>
        <span className="scroll-cue__track" aria-hidden="true">
          <span className="scroll-cue__dot" />
        </span>
      </a>
    </section>
  );
}
