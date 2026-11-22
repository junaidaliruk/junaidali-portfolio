/**
 * Custom Smooth Scroll Engine
 * 
 * Smooth wheel scrolling with momentum.
 * Touch scrolling is left native — no preventDefault on touchmove.
 */

export class SmoothScroll {
  private currentY = 0;
  private targetY = 0;
  private isActive = false;
  private rafId: number | null = null;
  private callbacks: ((scrollY: number) => void)[] = [];
  private isWheelScrolling = false;
  private wheelTimeout: ReturnType<typeof setTimeout> | null = null;
  private momentum = 0;

  // Config
  private readonly smoothFactor = 0.15;

  constructor() {}

  /**
   * Initialize
   */
  init() {
    if (this.isActive) return;
    this.isActive = true;

    this.currentY = window.scrollY;
    this.targetY = window.scrollY;

    // Wheel - smooth scroll (passive: false to prevent default)
    window.addEventListener('wheel', this.onWheel, { passive: false });

    // Sync with native scroll (for scrollbar, touch, keyboard nav)
    window.addEventListener('scroll', this.onScroll, { passive: true });

    // Don't start loop until first scroll event
  }

  /**
   * Check if clicking on scrollbar area
   */
  private isOnScrollbar(e: WheelEvent): boolean {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    return scrollbarWidth > 0 && e.clientX > window.innerWidth - scrollbarWidth - 5;
  }

  /**
   * Wheel handler
   */
  private onWheel = (e: WheelEvent) => {
    // Let native scrollbar work if clicking there
    if (this.isOnScrollbar(e)) return;

    e.preventDefault();

    let delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 40;
    else if (e.deltaMode === 2) delta *= window.innerHeight;

    this.targetY += delta;
    this.clampTarget();
    this.isWheelScrolling = true;
    this.momentum = delta * 0.3;
    this.ensureAnimating();

    // Reset flag after scrolling stops
    if (this.wheelTimeout) clearTimeout(this.wheelTimeout);
    this.wheelTimeout = setTimeout(() => {
      this.isWheelScrolling = false;
      this.momentum = 0;
    }, 200);
  };

  /**
   * Sync with native scroll (scrollbar, touch, keyboard)
   */
  private onScroll = () => {
    if (!this.isWheelScrolling) {
      const nativeScroll = window.scrollY;
      if (Math.abs(nativeScroll - this.currentY) > 5) {
        this.currentY = nativeScroll;
        this.targetY = nativeScroll;
        this.ensureAnimating();
      }
    }
  };

  /**
   * Clamp to bounds
   */
  private clampTarget() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    this.targetY = Math.max(0, Math.min(maxScroll, this.targetY));
  }

  /**
   * Animation loop — only runs when needed
   */
  private animate = () => {
    if (!this.isActive) return;

    // Apply momentum when wheel scrolling stops
    if (!this.isWheelScrolling && Math.abs(this.momentum) > 0.5) {
      this.targetY += this.momentum;
      this.momentum *= 0.95;
      this.clampTarget();
    }

    // Smooth interpolation towards target
    const diff = this.targetY - this.currentY;

    if (Math.abs(diff) > 0.5) {
      this.currentY += diff * this.smoothFactor;
      window.scrollTo(0, this.currentY);
      this.emitScroll();
      this.rafId = requestAnimationFrame(this.animate);
    } else if (this.currentY !== this.targetY) {
      this.currentY = this.targetY;
      window.scrollTo(0, this.currentY);
      this.emitScroll();
      this.rafId = requestAnimationFrame(this.animate);
    } else {
      // Stop the loop when idle — restart on next scroll event
      this.rafId = null;
    }
  };

  /**
   * Ensure animation loop is running
   */
  private ensureAnimating() {
    if (this.rafId === null && this.isActive) {
      this.rafId = requestAnimationFrame(this.animate);
    }
  }

  /**
   * Emit scroll position
   */
  private emitScroll() {
    for (const cb of this.callbacks) {
      cb(this.currentY);
    }
  }

  /**
   * Register scroll callback
   */
  onScroll(callback: (scrollY: number) => void): () => void {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  /**
   * Get scroll position
   */
  get scrollY(): number {
    return this.currentY;
  }

  /**
   * Get scroll progress (0-1)
   */
  get scrollProgress(): number {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? this.currentY / max : 0;
  }

  /**
   * Scroll to position
   */
  scrollTo(y: number, immediate = false) {
    this.targetY = Math.max(0, y);
    this.clampTarget();
    if (immediate) {
      this.currentY = this.targetY;
      window.scrollTo(0, this.currentY);
    }
  }

  /**
   * Scroll to element
   */
  scrollToElement(el: HTMLElement, offset = 0) {
    const rect = el.getBoundingClientRect();
    this.scrollTo(window.scrollY + rect.top + offset);
  }

  /**
   * Refresh bounds
   */
  refresh() {
    this.targetY = window.scrollY;
    this.currentY = window.scrollY;
  }

  /**
   * Destroy
   */
  destroy() {
    this.isActive = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.wheelTimeout) clearTimeout(this.wheelTimeout);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('scroll', this.onScroll);
    this.callbacks = [];
  }
}

// Singleton
export const smoothScroll = new SmoothScroll();
