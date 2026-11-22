"use client";

import { useRef, useCallback, useEffect, useState } from "react";

/**
 * PortfolioTicker — Infinite scrolling portfolio showcase.
 * JavaScript-driven with drag support.
 */

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    name: "Site Metrics",
    image: "./screenshots/site-metrics.png",
  },
  {
    id: 2,
    name: "Nova 3D",
    image: "./screenshots/3d-website.png",
  },
  {
    id: 3,
    name: "Jobly",
    image: "./screenshots/indeed-clone.png",
  },
  {
    id: 4,
    name: "Nexus Gaming",
    image: "./screenshots/gaming-website.png",
  },
  {
    id: 5,
    name: "Tulos Ecommerce",
    image: "./screenshots/tulos-ecommerce.png",
  },
  {
    id: 6,
    name: "Nestwell",
    image: "./screenshots/real-estate.png",
  },
  {
    id: 7,
    name: "Lumina PDF",
    image: "./screenshots/pdf-editor.png",
  },
  {
    id: 8,
    name: "Bookwarm",
    image: "./screenshots/bookwarm.png",
  },
];

export function PortfolioTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const positionRef = useRef(0);
  const velocityRef = useRef(1);
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
  const items = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS];

  return (
    <section className="ticker-section" aria-label="Portfolio showcase">
      <div className="ticker-bg" aria-hidden="true" />

      <div
        className="ticker-viewport"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={trackRef} className="ticker-track">
          {items.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="ticker-item"
              aria-hidden={index >= PORTFOLIO_ITEMS.length}
            >
              <div className="ticker-item__inner">
                <img
                  src={item.image}
                  alt={`${item.name} portfolio screenshot`}
                  width={450}
                  height={320}
                  decoding="async"
                  loading={index < 8 ? "eager" : "lazy"}
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
