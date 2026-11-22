import { useState, useEffect, useRef } from "react";
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
  const [previousWordIndex, setPreviousWordIndex] = useState<number | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % ROTATING_WORDS.length;

      setPreviousWordIndex(currentIndexRef.current);
      currentIndexRef.current = nextIndex;
      setCurrentWordIndex(nextIndex);
      setIsEntering(true);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isEntering) return;

    const frame = requestAnimationFrame(() => setIsEntering(false));
    return () => cancelAnimationFrame(frame);
  }, [isEntering, currentWordIndex]);

  useEffect(() => {
    if (previousWordIndex === null) return;

    const timeout = setTimeout(() => setPreviousWordIndex(null), 700);
    return () => clearTimeout(timeout);
  }, [previousWordIndex]);

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
          {previousWordIndex !== null && (
            <p className="hero-rotating-text hero-rotating-text--exit" aria-hidden="true">
              {ROTATING_WORDS[previousWordIndex]}
            </p>
          )}
          <p
            className={`hero-rotating-text ${
              isEntering ? "hero-rotating-text--enter" : ""
            }`}
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
    </section>
  );
}
