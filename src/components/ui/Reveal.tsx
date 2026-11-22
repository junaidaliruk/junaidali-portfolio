import {
  cloneElement,
  type CSSProperties,
  type ReactElement,
  type Ref,
} from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface RevealProps {
  children: ReactElement;
  className?: string;
  delay?: number;
  distance?: number;
}

interface RevealChildProps {
  className?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLElement>;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  distance = 26,
}: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  const child = children as ReactElement<RevealChildProps>;

  return cloneElement(child, {
    ref,
    className: `${child.props.className ?? ""} reveal ${
      isVisible ? "is-visible" : ""
    } ${className}`.trim(),
    style: {
      ...child.props.style,
      "--reveal-delay": `${delay}ms`,
      "--reveal-distance": `${distance}px`,
    } as CSSProperties,
  });
}
