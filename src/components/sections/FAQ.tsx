import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal } from "../ui/Reveal";
import { SplitText } from "../ui/SplitText";

/**
 * FAQ section — Common questions and objections.
 *
 * Answers the most frequent questions potential clients have.
 * Reduces friction before booking a call.
 */

const QUESTIONS = [
  {
    question: "How long does a typical project take?",
    answer:
      "Landing pages: 3-5 days. Multi-page websites: 1-2 weeks. Full-stack apps: 2-4 weeks. I move fast without sacrificing quality.",
  },
  {
    question: "Do you also design, or just develop?",
    answer:
      "Both. I handle the full process from design to development. You'll get pixel-perfect implementation of modern, conversion-focused designs.",
  },
  {
    question: "Can you redesign my existing site?",
    answer:
      "Absolutely. I've redesigned many sites to improve performance, conversion rates, and user experience. I can work with your existing content or create new copy.",
  },
  {
    question: "Do you offer revisions?",
    answer:
      "Absolutely. I include revisions in every project to make sure you're 100% happy with the result. I'd rather take the time to get it right than deliver something you're not excited about.",
  },
  {
    question: "What happens after the site launches?",
    answer:
      "You get full ownership of the code. I offer optional maintenance packages, but you're never locked in. I'm always available for future updates.",
  },
  {
    question: "What if I need changes after launch?",
    answer:
      "No problem. Just reach out. Whether it's a small tweak or a new feature, I'm happy to help. Many of my clients come back for ongoing work.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [panelHeights, setPanelHeights] = useState<number[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const measure = () => {
      setPanelHeights(panelRefs.current.map((panel) => panel?.scrollHeight ?? 0));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      {/* Decorative guide lines */}
      <div className="guide-left" aria-hidden="true" />
      <div className="guide-right" aria-hidden="true" />

      <Reveal distance={14}>
        <p className="faq-label">FAQ</p>
      </Reveal>
      <SplitText
        id="faq-heading"
        className="faq-heading"
        text="Frequently asked questions"
      />

      <div className="faq-grid">
        {QUESTIONS.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <Reveal key={index} delay={index * 70} distance={26}>
              <div className="faq-item" data-open={isOpen} data-spotlight>
                <h3 className="faq-item__heading">
                  <button
                    type="button"
                    className="faq-item__question"
                    id={`faq-trigger-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-item__icon" aria-hidden="true" />
                  </button>
                </h3>

                <div
                  className="faq-item__panel"
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  ref={(panel) => {
                    panelRefs.current[index] = panel;
                  }}
                  style={
                    {
                      "--faq-panel-height": `${panelHeights[index] ?? 320}px`,
                    } as CSSProperties
                  }
                >
                  <p className="faq-item__answer">{item.answer}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Bottom decorative line */}
      <div className="faq-line-bottom" aria-hidden="true" />
    </section>
  );
}
