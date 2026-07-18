import { Button } from "../ui/Button";

/**
 * Process section — How you work with clients.
 *
 * Matches Studio Nika's 2x2 grid layout with clean minimal cards.
 * Uses Framer-hosted images for consistency.
 */

const STEPS = [
  {
    id: 1,
    title: "Kickoff Call",
    description: "A quick call to understand your product, goals, and what you want the website to do.",
    image: "https://framerusercontent.com/images/WA5qQVwuBsDPRysNsohF9qN8LQ.png",
  },
  {
    id: 2,
    title: "Design Sprint",
    description: "We start designing right away and share daily progress, screen drops, and updates.",
    image: "https://framerusercontent.com/images/WILUpmNpUD7hxln0sRMRnysBBY.png",
  },
  {
    id: 3,
    title: "Build & Polish",
    description: "Once design is approved, we move straight into Framer and build everything end-to-end.",
    image: "https://framerusercontent.com/images/f4ixpBAKVYGup0BL3xsH7GYHcc.png",
  },
  {
    id: 4,
    title: "Launch",
    description: "You get full access to everything. Ship it, rock it, grow it — you're not locked to us.",
    image: "https://framerusercontent.com/images/VEflRDO0jnPI4e9vXj9woFNk.png",
  },
];

export function Process() {
  return (
    <section id="process" className="process-section" aria-labelledby="process-heading">
      {/* Decorative guide lines */}
      <div className="guide-left" aria-hidden="true" />
      <div className="guide-right" aria-hidden="true" />

      {/* Section label */}
      <p className="process-label">PROCESS</p>

      {/* Section heading */}
      <h2 id="process-heading" className="process-heading">
        How We Work
      </h2>

      {/* Process grid — 2x2 layout */}
      <div className="process-grid">
        {STEPS.map((step) => (
          <div key={step.id} className="process-card">
            {/* Card image — 200x200, white bg, no border */}
            <div className="process-card__image">
              <img
                src={step.image}
                srcSet={`${step.image}?width=476 476w`}
                sizes="200px"
                alt={`${step.title} illustration`}
                width={476}
                height={476}
                decoding="async"
                loading="lazy"
              />
            </div>

            {/* Card content */}
            <div className="process-card__content">
              <h3 className="process-card__title">{step.title}</h3>
              <p className="process-card__description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="process-cta">
        <Button href="https://wa.me/+923292876526" target="_blank">CONTACT US</Button>
      </div>

      {/* Bottom decorative line */}
      <div className="process-line-bottom" aria-hidden="true" />
    </section>
  );
}
