import { useEffect, useRef, useState } from "react";

type RevealCallback = (entry: IntersectionObserverEntry) => void;

const callbacks = new WeakMap<Element, RevealCallback>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          callbacks.get(entry.target)?.(entry);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px",
      }
    );
  }

  return observer;
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const instance = getObserver();

    if (!instance) {
      setIsVisible(true);
      return;
    }

    const callback: RevealCallback = (entry) => {
      if (!entry.isIntersecting) return;
      setIsVisible(true);
      instance.unobserve(el);
      callbacks.delete(el);
    };

    callbacks.set(el, callback);
    instance.observe(el);

    return () => {
      callbacks.delete(el);
      instance.unobserve(el);
    };
  }, []);

  return { ref, isVisible };
}
