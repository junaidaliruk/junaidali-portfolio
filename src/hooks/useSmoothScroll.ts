/**
 * useSmoothScroll Hook
 * 
 * Initializes smooth scroll engine on mount.
 * Returns utility methods for programmatic scrolling.
 */

import { useEffect, useCallback } from 'react';
import { smoothScroll } from '../lib/smooth-scroll';

export function useSmoothScroll() {
  useEffect(() => {
    smoothScroll.init();

    return () => {
      smoothScroll.destroy();
    };
  }, []);

  const scrollTo = useCallback((y: number, immediate?: boolean) => {
    smoothScroll.scrollTo(y, immediate);
  }, []);

  const scrollToElement = useCallback((element: HTMLElement, offset?: number) => {
    smoothScroll.scrollToElement(element, offset);
  }, []);

  const refresh = useCallback(() => {
    smoothScroll.refresh();
  }, []);

  return {
    scrollTo,
    scrollToElement,
    refresh,
  };
}


