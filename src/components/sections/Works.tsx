/**
 * Works section — Portfolio showcase
 * 
 * Matches Studio Nika's masonry-style grid layout.
 * Efficient rendering with lazy loading.
 */

import { WORKS } from "../../data/works";
import type { Work } from "../../types/project";
import { Button } from "../ui/Button";

/**
 * Single work card component
 */
function WorkCard({ work, index }: { work: Work; index: number }) {
  const isLocalImage = work.image.startsWith('./');
  
  return (
    <a
      href={work.url}
      target="_blank"
      rel="noopener noreferrer"
      className="work-card"
    >
      {/* Image container */}
      <div className="work-card__image">
        {/* Website screenshot */}
        <img
          src={isLocalImage ? work.image : `${work.image}?width=800`}
          srcSet={isLocalImage ? undefined : `
            ${work.image}?scale-down-to=512&width=${work.imageWidth} 512w,
            ${work.image}?scale-down-to=1024&width=${work.imageWidth} 1024w,
            ${work.image}?width=${work.imageWidth} ${work.imageWidth}w
          `}
          sizes={isLocalImage ? undefined : "(min-width: 1024px) 50vw, 100vw"}
          alt={`${work.name} website screenshot`}
          width={work.imageWidth}
          height={work.imageHeight}
          decoding="async"
          loading={index < 4 ? "eager" : "lazy"}
        />
      </div>

      {/* Card content */}
      <div className="work-card__content">
        <h3 className="work-card__title">
          {work.name}
          <span className="work-card__arrow" aria-hidden="true">→</span>
        </h3>
        <p className="work-card__services">
          {work.services.join(", ")}
        </p>
        {/* Meta info */}
        <div className="work-card__meta">
          {work.year && <span>{work.year}</span>}
          {work.year && work.tech && <span className="work-card__meta-dot" />}
          {work.tech && <span>{work.tech}</span>}
        </div>
      </div>
    </a>
  );
}

/**
 * Works section component
 */
export function Works() {
  // Split works into rows of 2
  const rows = [];
  for (let i = 0; i < WORKS.length; i += 2) {
    rows.push(WORKS.slice(i, i + 2));
  }

  return (
    <section id="works" className="works-section" aria-labelledby="works-heading">
      {/* Decorative guide lines */}
      <div className="guide-left" aria-hidden="true" />
      <div className="guide-right" aria-hidden="true" />

      {/* Section header */}
      <p className="works-label">WORKS</p>
      <h2 id="works-heading" className="works-heading">
        Some of My Best Works
      </h2>
      <p className="works-subtitle">
        Websites that I shipped for VCs, SaaS teams,
        cybersecurity products, and ambitious startups.
      </p>

      {/* Works grid */}
      <div className="works-grid">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="works-row">
            {row.map((work, cardIndex) => (
              <WorkCard
                key={work.id}
                work={work}
                index={rowIndex * 2 + cardIndex}
              />
            ))}
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="works-cta">
        <p className="works-cta__text">Want to see your project here?</p>
        <Button href="https://wa.me/+923292876526" target="_blank">CONTACT ME</Button>
      </div>

      {/* Bottom decorative line */}
      <div className="works-line-bottom" aria-hidden="true" />
    </section>
  );
}
