import { Button } from "../ui/Button";

/**
 * Benefits section — matches Studio Nika's layout exactly.
 *
 * - 2-column grid with cards
 * - Diagonal stripe pattern background
 * - Images with floating elements
 * - CTA button
 * - Accessible with proper headings
 */

const BENEFITS = [
  {
    id: 1,
    title: "Full-Stack TypeScript",
    description:
      "From frontend to database, I build complete applications with type safety across the entire stack.",
    image: "https://framerusercontent.com/images/f0VmjmrvKzeljjAimhOmMWxVM.png",
    imageWidth: 536,
    imageHeight: 450,
  },
  {
    id: 2,
    title: "Real-time & AI",
    description:
      "WebSocket collaboration, AI chatbots, and modern APIs — I build products that feel alive.",
    image: "https://framerusercontent.com/images/ax1DIVyXxZ09FUmBjbjOFfIWps.png",
    imageWidth: 663,
    imageHeight: 500,
  },
  {
    id: 3,
    title: "Performance First",
    description:
      "Lighthouse scores, Core Web Vitals, and optimized builds — your users deserve fast experiences.",
    image: "https://framerusercontent.com/images/vZQf4ZntDR9Zu0sz6m1CgSR6w0.png",
    imageWidth: 556,
    imageHeight: 450,
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="benefits-section" aria-labelledby="benefits-heading">
      {/* Decorative guide lines */}
      <div className="guide-left" aria-hidden="true" />
      <div className="guide-right" aria-hidden="true" />

      {/* Section label */}
      <p className="benefits-label">BENEFITS</p>

      {/* Section heading */}
      <h2 id="benefits-heading" className="benefits-heading">
        What Working With Me Looks Like
      </h2>

      {/* Benefits grid */}
      <div className="benefits-grid">
        {BENEFITS.map((benefit) => (
          <div key={benefit.id} className="benefit-card">
            {/* Card image area with diagonal pattern */}
            <div className="benefit-card__image">
              {/* Diagonal stripe pattern */}
              <div className="benefit-card__pattern" aria-hidden="true" />

              {/* Product screenshot */}
              <img
                src={`${benefit.image}?width=800`}
                srcSet={`
                  ${benefit.image}?scale-down-to=512&width=${benefit.imageWidth} 512w,
                  ${benefit.image}?scale-down-to=1024&width=${benefit.imageWidth} 1024w,
                  ${benefit.image}?width=${benefit.imageWidth} ${benefit.imageWidth}w
                `}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt={`${benefit.title} illustration`}
                width={benefit.imageWidth}
                height={benefit.imageHeight}
                decoding="async"
                loading="lazy"
              />
            </div>

            {/* Card content */}
            <div className="benefit-card__content">
              <h3 className="benefit-card__title">{benefit.title}</h3>
              <p className="benefit-card__description">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="benefits-cta">
        <Button href="https://wa.me/+923292876526" target="_blank">CONTACT ME</Button>
      </div>

      {/* Bottom decorative line */}
      <div className="benefits-line-bottom" aria-hidden="true" />
    </section>
  );
}
