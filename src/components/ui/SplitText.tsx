import { Fragment, type CSSProperties, type ElementType } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface SplitTextProps {
  text: string;
  id?: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
}

export function SplitText({
  text,
  id,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 45,
}: SplitTextProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  const words = text.split(" ");

  return (
    <Tag
      id={id}
      ref={ref as never}
      className={`split-text ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      style={
        {
          "--split-delay": `${delay}ms`,
          "--split-stagger": `${stagger}ms`,
        } as CSSProperties
      }
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="split-text__word">
            <span
              className="split-text__inner"
              style={{ "--word-index": index } as CSSProperties}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
