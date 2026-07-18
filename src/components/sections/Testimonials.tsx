"use client";

import { useRef, useCallback, useEffect, useState } from "react";

/**
 * Testimonials section — Auto-scrolling testimonial carousel.
 * Matches the hero page project ticker style.
 */

const TESTIMONIALS = [
  {
    id: 1,
    name: "Nida",
    role: "Founder of NCD",
    avatar: "https://framerusercontent.com/images/ZS17v4JTBfzRG5MO530mtyF9Yug.png",
    text: "I enjoyed working with Junaid he is so kind and talented understands every tiny needs and wants in designing.",
    highlight: "Great experience wish to work more with him in future.",
  },
  {
    id: 2,
    name: "Amos Ker",
    role: "Co-Founder of Just Score A.",
    avatar: "https://framerusercontent.com/images/ZS17v4JTBfzRG5MO530mtyF9Yug.png",
    text: "Wonderful work done by Junaid!",
    highlight: "Super responsive and effective in communication to get the work done to meet our expectations.",
  },
  {
    id: 3,
    name: "Shawn Cao",
    role: "Fina Money, Fina Labs, Inc.",
    avatar: "https://framerusercontent.com/images/ZS17v4JTBfzRG5MO530mtyF9Yug.png",
    text: "I just worked with Junaid to refresh Fina Money's landing page. Junaid has a good taste of design, very responsive and address feedback in a timely manner, delivers high quality work.",
    highlight: "I would work with him again for new opportunities.",
  },
  {
    id: 4,
    name: "Valentina D'Efilippo",
    role: "Apostrophe One",
    avatar: "https://framerusercontent.com/images/ZS17v4JTBfzRG5MO530mtyF9Yug.png",
    text: "Junaid has been a life saver. Jumped on a call with me and instantly understood what I needed.",
    highlight: "The delivery was fast and the result was exactly what I wanted.",
  },
  {
    id: 5,
    name: "Sarah Chen",
    role: "TechFlow CEO",
    avatar: "https://framerusercontent.com/images/ZS17v4JTBfzRG5MO530mtyF9Yug.png",
    text: "Working with Junaid was seamless. He understood our vision and translated it into a beautiful, functional website.",
    highlight: "Highly recommend for any startup looking for quality work.",
  },
  {
    id: 6,
    name: "Daniel Carrillo",
    role: "Founder of Illuminate Investing",
    avatar: "https://framerusercontent.com/images/ZS17v4JTBfzRG5MO530mtyF9Yug.png",
    text: "Working with Junaid was a great experience, and he'll be our go-to website designer and developer moving forward.",
    highlight: "He quickly understood our vision, added unique design touches, and delivered functionality in minutes that others couldn't.",
  },
  {
    id: 7,
    name: "Zed",
    role: "Founder of Creativenix",
    avatar: "https://framerusercontent.com/images/ZS17v4JTBfzRG5MO530mtyF9Yug.png",
    text: "Junaid has a great eye for design, which I truly value as a designer myself. Unlike many others, he's on top of trends, quickly implements requests.",
    highlight: "Has already designed 3 websites for us. Highly recommended!",
  },
];

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const positionRef = useRef(0);
  const velocityRef = useRef(0.8);
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const dragVelocity = useRef(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Set initial position to center
    const oneSetWidth = track.scrollWidth / 2;
    positionRef.current = -oneSetWidth;

    const animate = () => {
      if (!prefersReducedMotion) {
        if (isDragging.current) {
          positionRef.current += dragVelocity.current;
          dragVelocity.current *= 0.9;
        } else {
          dragVelocity.current *= 0.95;
          positionRef.current -= velocityRef.current;
        }

        // Reset position for seamless loop
        const halfWidth = track.scrollWidth / 2;
        if (positionRef.current >= 0) {
          positionRef.current -= halfWidth;
        } else if (positionRef.current <= -halfWidth) {
          positionRef.current += halfWidth;
        }
      }

      track.style.transform = `translateX(${positionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [prefersReducedMotion]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    lastMouseX.current = e.clientX;
    dragVelocity.current = 0;
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    
    const deltaX = e.clientX - lastMouseX.current;
    const instantVelocity = deltaX;
    dragVelocity.current = dragVelocity.current * 0.7 + instantVelocity * 0.3;
    
    positionRef.current += deltaX;
    lastMouseX.current = e.clientX;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    dragVelocity.current = Math.max(-8, Math.min(8, dragVelocity.current));
  }, []);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    lastMouseX.current = e.touches[0].clientX;
    dragVelocity.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    
    const deltaX = e.touches[0].clientX - lastMouseX.current;
    const instantVelocity = deltaX;
    dragVelocity.current = dragVelocity.current * 0.7 + instantVelocity * 0.3;
    
    positionRef.current += deltaX;
    lastMouseX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    dragVelocity.current = Math.max(-8, Math.min(8, dragVelocity.current));
  }, []);

  // Double the items for seamless loop
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="testimonials-section" aria-labelledby="testimonials-heading">
      {/* Left guide line */}
      <div className="guide-left" aria-hidden="true" />

      {/* Main content */}
      <div className="testimonials-content">
        {/* Section label */}
        <p className="testimonials-label">TESTIMONIALS</p>

        {/* Section heading */}
        <h2 id="testimonials-heading" className="testimonials-heading">
          You Want Proof? These Reviews Say Everything.
        </h2>

        {/* Subtitle */}
        <p className="testimonials-subtitle">
          Real founders who trusted us with their sites.
        </p>
      </div>

      {/* Auto-scrolling testimonials viewport */}
      <div
        className="testimonials-viewport"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={trackRef} className="testimonials-track">
          {items.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="testimonial-card"
              aria-hidden={index >= TESTIMONIALS.length}
            >
              {/* Author info */}
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={44}
                    height={44}
                    decoding="async"
                    loading={index < 7 ? "eager" : "lazy"}
                    draggable={false}
                  />
                </div>
                <div className="testimonial-card__info">
                  <p className="testimonial-card__name">{testimonial.name}</p>
                  <p className="testimonial-card__role">{testimonial.role}</p>
                </div>
              </div>

              {/* Review text */}
              <p className="testimonial-card__text">
                {testimonial.text}{' '}
                <strong>{testimonial.highlight}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right guide line */}
      <div className="guide-right" aria-hidden="true" />
    </section>
  );
}
