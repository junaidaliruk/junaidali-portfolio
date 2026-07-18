# 🎨 Portfolio — Studio Nika Inspired

> A pixel-perfect recreation of [studionika.co](https://studionika.co/) built with **modern semantic HTML**, **CSS best practices**, and zero frameworks — pure craft.

---

## 📁 Project Structure

```
portfolio/
├── 📄 index.html              # Single-page entry point
├── 📁 assets/
│   ├── 📁 fonts/              # Self-hosted Inter Display variable fonts
│   │   ├── InterDisplay-Variable.woff2
│   │   └── Inter-Variable.woff2
│   ├── 📁 images/             # Optimized images (WebP/AVIF)
│   │   ├── hero/              # Hero section visuals
│   │   ├── projects/          # Portfolio project thumbnails
│   │   ├── icons/             # SVG icons (inline-ready)
│   │   └── og/                # Open Graph / social share images
│   └── 📁 videos/             # Background/scroll animations
├── 📁 src/
│   ├── 📁 styles/
│   │   ├── reset.css          # Modern CSS reset (minimal, opinionated)
│   │   ├── tokens.css         # Design tokens (CSS custom properties)
│   │   ├── typography.css     # Font imports, type scale, heading styles
│   │   ├── layout.css         # Grid systems, containers, sections
│   │   ├── components.css     # Buttons, cards, nav, footer
│   │   ├── animations.css     # Keyframes, scroll-driven, transitions
│   │   └── utilities.css      # Helper classes (sr-only, container, etc.)
│   └── 📁 scripts/
│       ├── main.js            # Entry: orchestrates all modules
│       ├── nav.js             # Mobile menu, scroll state
│       ├── text-scramble.js   # Hero text rotation animation
│       ├── smooth-scroll.js   # Smooth scroll behavior
│       └── lazy-load.js       # Intersection Observer for images
├── 📄 .gitignore
├── 📄 package.json            # Dev server, build scripts
└── 📄 README.md               # ← You are here
```

---

## 🏗️ Semantic HTML Best Practices

### Document Foundation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="We design & develop premium websites for startups.">
  <title>Studio Nika — We Design & Develop Websites</title>

  <!-- Preload critical fonts -->
  <link rel="preload" href="/assets/fonts/InterDisplay-Variable.woff2"
        as="font" type="font/woff2" crossorigin>

  <!-- Preconnect to external origins -->
  <link rel="preconnect" href="https://fonts.googleapis.com">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="/src/styles/tokens.css">
  <link rel="stylesheet" href="/src/styles/reset.css">
  <link rel="stylesheet" href="/src/styles/typography.css">
  <link rel="stylesheet" href="/src/styles/layout.css">
  <link rel="stylesheet" href="/src/styles/components.css">
  <link rel="stylesheet" href="/src/styles/animations.css">
  <link rel="stylesheet" href="/src/styles/utilities.css">
</head>
<body>
  <!-- ... -->
</body>
</html>
```

### Landmark Elements — Never Use `<div>` Where Semantics Exist

| Element | Purpose | When to Use |
|---------|---------|-------------|
| `<header>` | Introductory content / nav container | Site header, section intros |
| `<nav>` | Navigation links | Main nav, table of contents |
| `<main>` | **Unique** dominant content of the page | Wrap the entire page body (once only) |
| `<section>` | Thematic grouping of content | Each scrollable section (Hero, Benefits, Process…) |
| `<article>` | Self-contained, independently releasable content | Blog posts, project case studies |
| `<aside>` | Tangentially related content | Sidebar tips, pull quotes |
| `<footer>` | Closing content / metadata | Site footer, section footers |
| `<figure>` + `<figcaption>` | Media with a caption | Project screenshots, diagrams |

### Heading Hierarchy — One `<h1>`, Never Skip Levels

```
h1 — "We Design & Develop Websites for..."
  h2 — "What Working With Us Looks Like"
    h3 — "Clear Structure"
    h3 — "Design + Build"
    h3 — "Simple Communication"
  h2 — "Our Process"
    h3 — "Discovery"
    h3 — "Design"
    h3 — "Development"
  h2 — "Selected Work"
```

### Interactive Elements

```html
<!-- ✅ DO: <button> for actions, <a> for navigation -->
<button type="button" aria-expanded="false" aria-controls="mobile-menu">
  Menu
</button>

<a href="#projects">View Our Work</a>

<!-- ✅ DO: Use native <dialog> instead of JS modal libraries -->
<dialog id="project-modal" aria-labelledby="modal-title">
  <form method="dialog">
    <h2 id="modal-title">Project Name</h2>
    <button aria-label="Close dialog">✕</button>
  </form>
</dialog>

<!-- ✅ DO: Use <search> for search/filter regions -->
<search aria-label="Filter projects">
  <input type="search" placeholder="Search projects…">
</search>
```

### Accessibility Essentials

```html
<!-- Screen-reader only text -->
<span class="sr-only">Skip to main content</span>

<!-- Decorative images hidden from AT -->
<img src="pattern.svg" alt="" aria-hidden="true">

<!-- Informative images get descriptive alt -->
<img src="project-screenshot.webp" alt="E-commerce redesign showing product grid">

<!-- SVG icons: decorative vs informative -->
<svg aria-hidden="true" focusable="false"><!-- icon --></svg>
<svg role="img" aria-label="GitHub"><title>GitHub</title><!-- icon --></svg>
```

---

## 🎨 CSS Best Practices

### 1. Design Tokens First (`tokens.css`)

Centralize every value — never hardcode colors, spacing, or fonts in component styles.

```css
:root {
  /* ── Colors ── */
  --color-bg:          #fafafa;
  --color-surface:     #f9f9f9;
  --color-text:        rgb(0, 4, 20);
  --color-text-muted:  rgba(0, 0, 0, 0.5);
  --color-border:      rgba(0, 0, 0, 0.1);
  --color-accent:      #09f;

  /* ── Typography ── */
  --font-display:  "Inter Display", "Inter", system-ui, sans-serif;
  --font-body:     "Inter", system-ui, sans-serif;

  --fs-hero:    clamp(2.5rem, 5vw + 1rem, 5rem);
  --fs-h1:      clamp(2rem, 4vw + 0.5rem, 3.5rem);
  --fs-h2:      clamp(1.5rem, 3vw + 0.25rem, 2.25rem);
  --fs-body:    clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
  --fs-small:   0.75rem;

  --fw-regular:  400;
  --fw-medium:   500;
  --fw-semibold: 600;

  --lh-tight:   1;
  --lh-normal:  1.2;
  --lh-relaxed: 1.5;

  --ls-tight:   -0.02em;
  --ls-normal:  -0.01em;
  --ls-wide:     0.08em;

  /* ── Spacing (8px base) ── */
  --space-xs:   0.25rem;   /*  4px */
  --space-sm:   0.5rem;    /*  8px */
  --space-md:   1rem;      /* 16px */
  --space-lg:   1.5rem;    /* 24px */
  --space-xl:   2rem;      /* 32px */
  --space-2xl:  3rem;      /* 48px */
  --space-3xl:  4rem;      /* 64px */
  --space-4xl:  6rem;      /* 96px */
  --space-5xl:  10rem;     /* 160px — hero top padding */

  /* ── Layout ── */
  --container-max:  1440px;
  --container-pad:  clamp(1rem, 4vw, 2rem);
  --section-gap:    clamp(4rem, 10vh, 8rem);

  /* ── Radius ── */
  --radius-sm:  8px;
  --radius-md:  16px;
  --radius-lg:  24px;
  --radius-pill: 100px;

  /* ── Transitions ── */
  --ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
  --duration:   0.3s;

  /* ── Z-Index Scale ── */
  --z-base:     1;
  --z-sticky:   10;
  --z-overlay:  100;
  --z-modal:    1000;
}
```

### 2. Modern Reset (`reset.css`)

Minimal, opinionated — leverage modern CSS defaults:

```css
/* Box-sizing for all */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Remove default margins */
body, h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd {
  margin: 0;
}

/* Responsive images and media */
img, picture, video, canvas, svg {
  display: block;
  max-inline-size: 100%;
}

/* Inherit fonts for form elements */
input, button, textarea, select {
  font: inherit;
}

/* Avoid text overflows */
p, h1, h2, h3, h4, h5, h6 {
  text-wrap: pretty;
  overflow-wrap: break-word;
}

/* Smooth scrolling (respect user preferences) */
html {
  scroll-behavior: smooth;
}
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

/* Focus styles — never remove outline */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Remove list styles on ul, ol with a role */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}
```

### 3. Logical Properties (Always)

Use **logical properties** over physical ones for intrinsic RTL/LTR support:

```css
/* ❌ Don't */
.card {
  margin-left: auto;
  padding-top: 2rem;
  border-left: 1px solid var(--color-border);
  width: 100%;
  max-width: 800px;
}

/* ✅ Do */
.card {
  margin-inline-start: auto;
  padding-block-start: 2rem;
  border-inline-start: 1px solid var(--color-border);
  inline-size: 100%;
  max-inline-size: 800px;
}
```

### 4. Layout Decision Tree

```
1. Simple row or column?        → Flexbox
2. Complex 2D structure?        → CSS Grid
3. Responsive card grid?        → repeat(auto-fill, minmax(280px, 1fr))
4. Content flowing in columns?  → Multi-column
5. Nested alignment?            → Subgrid
6. Floating tooltips/popovers?  → Anchor Positioning
```

### 5. Fluid Typography & Spacing

```css
/* Hero heading — fluid from 40px to 80px */
.hero h1 {
  font-size: clamp(2.5rem, 5vw + 1rem, 5rem);
  letter-spacing: -0.03em;
  line-height: 1;
}

/* Section heading — fluid from 24px to 56px */
.section h2 {
  font-size: clamp(1.5rem, 3vw + 0.25rem, 3.5rem);
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-wrap: balance;
}

/* Body text */
.body-text {
  font-size: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
  line-height: 1.5;
  color: var(--color-text-muted);
}

/* Section spacing — fluid padding */
.section {
  padding-block: clamp(4rem, 10vh, 8rem);
  padding-inline: var(--container-pad);
}
```

### 6. Container Queries (Component-Level Responsiveness)

```css
/* Card adapts to its container, not the viewport */
.card {
  container-type: inline-size;
  container-name: card;
}

@container card (inline-size > 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: var(--space-lg);
  }
}
```

### 7. Scroll-Driven Animations (No JS Needed)

```css
/* Fade in sections as they scroll into view */
.section {
  animation: fade-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .section {
    animation: none;
  }
}
```

### 8. Modern Selectors

```css
/* Style parent based on child state */
.card:has(img) {
  grid-template-columns: 1fr;
}

/* Style invalid inputs only after user interaction */
input:user-invalid:not(:placeholder-shown) {
  border-color: red;
}

/* Style empty containers */
.card-list:empty::before {
  content: "No projects yet.";
  color: var(--color-text-muted);
}

/* :where() for zero-specificity resets */
:where(a, button) {
  color: inherit;
  text-decoration: none;
}
```

### 9. Performance: Content-Visibility & Will-Change

```css
/* Skip rendering offscreen sections until near viewport */
.offscreen-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}

/* Only use will-change for actively animating properties */
.animated {
  will-change: transform, opacity;
}

/* Remove will-change after animation completes */
.animated.is-done {
  will-change: auto;
}
```

### 10. Component Patterns

```css
/* ═══ BUTTON ═══ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding-block: 0.875rem;
  padding-inline: 1.5rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-size: var(--fs-small);
  font-weight: var(--fw-medium);
  text-transform: uppercase;
  letter-spacing: var(--ls-wide);
  text-decoration: none;
  cursor: pointer;
  transition: background var(--duration) var(--ease-out),
              color var(--duration) var(--ease-out);
}

.btn--primary {
  background: var(--color-text);
  color: var(--color-bg);
}

.btn--primary:hover {
  background: var(--color-accent);
  color: var(--color-text);
}

/* ═══ CARD ═══ */
.card {
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: box-shadow var(--duration) var(--ease-out),
              transform var(--duration) var(--ease-out);
}

.card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

/* ═══ SECTION ═══ */
.section {
  padding-block: var(--section-gap);
  padding-inline: var(--container-pad);
  max-inline-size: var(--container-max);
  margin-inline: auto;
}
```

### 11. Accessibility Utility Classes

```css
/* Screen-reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus-visible skip link */
.skip-link {
  position: fixed;
  inset-block-start: -100%;
  inset-inline-start: var(--space-md);
  z-index: var(--z-modal);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-text);
  color: var(--color-bg);
  border-radius: var(--radius-sm);
}

.skip-link:focus {
  inset-block-start: var(--space-md);
}
```

---

## ⚡ Performance Checklist

| Task | How |
|------|-----|
| **Preload critical fonts** | `<link rel="preload" as="font" type="font/woff2" crossorigin>` |
| **Use `fetchpriority="high"` on LCP image** | `<img fetchpriority="high" alt="...">` |
| **Lazy-load below-fold images** | `<img loading="lazy" decoding="async">` |
| **Use modern image formats** | AVIF → WebP → PNG/JPG fallback |
| **Inline critical CSS** | `<style>` in `<head>` for above-fold styles |
| **Defer non-critical JS** | `<script defer>` or `<script type="module">` |
| **Use `content-visibility: auto`** | On offscreen sections to skip rendering |
| **Minify CSS/JS** | Build step with esbuild, Lightning CSS, or similar |
| **Use `font-display: swap`** | In `@font-face` to prevent invisible text |

---

## � View Transitions API (2026)

> **Baseline 2025-10-14** — Chrome 111+, Edge 111+, Firefox 144+, Safari 18+

View Transitions make navigation feel like a native app — elements morph smoothly between states instead of snapping.

### Same-Document Transitions (SPA)

```javascript
function navigate(view) {
  // Wrap DOM updates in startViewTransition
  document.startViewTransition(() => updateDOM(view));
}
```

```css
/* Assign unique names to elements that should morph */
.hero-image {
  view-transition-name: hero;
}
.page-title {
  view-transition-name: title;
}

/* Only ONE element per view-transition-name at a time */
```

```javascript
// Dynamic assignment for list → detail transitions
function goToListToDetail(e) {
  const hero = document.getElementById("hero");
  hero.style.viewTransitionName = "hero";

  if (!document.startViewTransition) {
    updateDOM();
    return; // Progressive enhancement — no fallback needed
  }

  const transition = document.startViewTransition(() => {
    document.body.classList.add("detail");
  });

  // MANDATORY: Route focus after transition for accessibility
  transition.finished.finally(() => {
    document.getElementById("detail-heading")?.focus();
  });
}
```

### Cross-Document Transitions (MPA)

```css
/* Opt-in on BOTH source and destination pages */
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
  }
}
```

### View Transition Pseudo-Elements

```css
/* Customize the transition between states */
::view-transition-old(hero) {
  animation: fade-out 0.3s ease-out;
}
::view-transition-new(hero) {
  animation: fade-in 0.3s ease-in;
}

/* Fix aspect ratio stretching */
::view-transition-old(hero),
::view-transition-new(hero) {
  height: 100%;
  object-fit: cover;
}

/* Group multiple elements for a single transition */
.card-thumbnail {
  view-transition-class: card-morph;
}
.card-detail-image {
  view-transition-class: card-morph;
}
```

### Respect Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

---

## 🧩 Component Architecture & Design System

### CSS `@function` — DRY Design Tokens (Chrome 139+, Edge 139+)

```css
/* Define reusable gradient logic */
@function --fancy-gradient(
  --start-color <color>,
  --end-color <color>,
  --angle: 98deg
) returns <image> {
  result: linear-gradient(
    in oklab var(--angle),
    var(--start-color),
    var(--end-color)
  );
}

/* Use it */
.card {
  background: #5d87e9;                        /* Fallback */
  background: --fancy-gradient(#ed73d7, #5d87e9);
}
```

### CSS `@function` — Responsive Grid Helper

```css
@function --grid-template(--count <number>) {
  result: 1fr;                          /* Default: stack */
  @media (min-width: 800px) {
    result: repeat(var(--count), 1fr);  /* Grid on larger screens */
  }
}

.main {
  display: grid;
  grid-template-columns: 1fr;                   /* Fallback */
  grid-template-columns: --grid-template(2);
}
```

### Component Naming Convention

```
├── components/
│   ├── Button/
│   │   ├── button.css          /* Scoped styles */
│   │   ├── button.html         /* Template pattern */
│   │   └── README.md           /* Usage docs */
│   ├── Card/
│   ├── Navigation/
│   ├── Hero/
│   ├── ProjectGrid/
│   ├── TestimonialCarousel/
│   ├── FAQ/
│   └── Footer/
```

### Web Components (Optional — Native Recyclable Components)

```html
<!-- Define once, use everywhere -->
<sn-card>
  <img slot="media" src="project.webp" alt="Project screenshot">
  <h3 slot="title">E-Commerce Redesign</h3>
  <p slot="description">Modern shopping experience built in Framer.</p>
</sn-card>

<script>
  class SNCard extends HTMLElement {
    static template = document.createElement("template");
    static {
      this.template.innerHTML = `
        <style>
          :host { display: block; }
          ::slotted(img) { width: 100%; border-radius: 12px; }
        </style>
        <slot name="media"></slot>
        <slot name="title"></slot>
        <slot name="description"></slot>
      `;
    }
    constructor() {
      super();
      this.attachShadow({ mode: "open" })
        .appendChild(SNCard.template.content.cloneNode(true));
    }
  }
  customElements.define("sn-card", SNCard);
</script>
```

---

## 🎯 2026 CSS Cutting-Edge Features

> From [LogRocket: CSS in 2026](https://blog.logrocket.com/css-in-2026/) — features that replace JavaScript.

### Customizable `<select>` — No JS Needed

```css
/* Opt into the new customizable mode */
select,
select::picker(select) {
  appearance: base-select;
}

/* Style the dropdown surface */
select::picker(select) {
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
}

/* Style each option */
option {
  padding: 0.5rem 1rem;
  transition: opacity 0.25s ease, translate 0.5s ease;
}
```

### Staggered Animations with `sibling-index()`

```css
/* No more :nth-child(1), :nth-child(2)... */
option {
  transition: opacity 0.25s ease, translate 0.5s ease;
  transition-delay: calc(0.2s * (sibling-index() - 1));

  @starting-style {
    opacity: 0;
    translate: 30px 0;
  }
}

/* Staggered card animations */
.card {
  animation: fade-in 0.5s ease both;
  animation-delay: calc(0.1s * (sibling-index() - 1));
}
```

### Typed `attr()` — Data-Driven Styling

```html
<!-- HTML: data attributes drive styling -->
<button data-bg-color="#ed73d7" data-size="lg">Click me</button>
```

```css
/* CSS: read attributes as typed values */
button {
  background-color: attr(data-bg-color color, transparent);
  padding: attr(data-size size, 1rem);    /* future syntax */
}
```

### `@starting-style` — Entry Animations

```css
/* Animate elements as they first appear in the DOM */
.dialog {
  opacity: 1;
  translate: 0 0;

  @starting-style {
    opacity: 0;
    translate: 0 20px;
  }
}

/* Combined with transition-behavior for top-layer elements */
dialog {
  transition: opacity 0.3s ease, translate 0.3s ease;
  transition-behavior: allow-discrete;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  opacity: 1;

  @starting-style {
    opacity: 0;
  }
}
```

### `sibling-count()` — Dynamic Proportional Layouts

```css
/* Each item gets equal share based on total count */
.nav-item {
  width: calc(100% / sibling-count());
}

/* Color interpolation across a list */
.card {
  background: color-mix(
    in oklch,
    var(--color-start),
    var(--color-end),
    calc(sibling-index() / sibling-count() * 100%)
  );
}
```

### Scroll State Container Queries

```css
/* Detect snapped/stacked states */
@container scroll-state(snapped: x) {
  .card {
    scale: 1.05;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
}

/* Detect sticky position */
@container scroll-state(stuck: top) {
  .header {
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.85);
  }
}
```

---

## 📦 2026 HTML Native Features

> From [dev.to: HTML Latest Updates in 2026](https://dev.to/sumit_sharma31/html-latest-updates-in-2026-new-features-every-web-developer-should-know-jk6)

### Popover API — Zero-JS Tooltips & Menus

```html
<!-- Trigger -->
<button popovertarget="menu-nav">Open Menu</button>

<!-- Popover content — no JS required -->
<div id="menu-nav" popover>
  <nav>
    <a href="#work">Work</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
</div>
```

```css
/* Style the popover */
[popover] {
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);

  /* Entry animation */
  opacity: 1;
  translate: 0 0;

  @starting-style {
    opacity: 0;
    translate: 0 -10px;
  }
}
```

### Native Toggle Switch

```html
<!-- Browser-native switch — no custom checkbox hack -->
<input type="checkbox" role="switch" aria-label="Dark mode">
```

### Enhanced `<dialog>` — Closing Behaviors

```html
<dialog id="project-modal" aria-labelledby="modal-title">
  <form method="dialog">
    <h2 id="modal-title">Project Name</h2>
    <p>Description of the project...</p>
    <button value="close" aria-label="Close">✕</button>
    <button value="confirm">View Project</button>
  </form>
</dialog>
```

```css
dialog {
  border: none;
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  max-inline-size: min(90vw, 600px);

  /* Entry animation */
  opacity: 1;
  scale: 1;

  @starting-style {
    opacity: 0;
    scale: 0.95;
  }
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
```

```javascript
// Open/close without extra libraries
const dialog = document.getElementById("project-modal");
dialog.showModal();
dialog.addEventListener("close", () => {
  console.log(dialog.returnValue); // "close" or "confirm"
});
```

### Responsive `<picture>` with Modern Formats

```html
<picture>
  <source type="image/avif" srcset="hero.avif">
  <source type="image/webp" srcset="hero.webp">
  <img src="hero.jpg" alt="Studio Nika hero" width="1200" height="600"
       fetchpriority="high" decoding="async">
</picture>
```

---

## ⚛️ React 2026 Patterns (If Using React)

> From [dev.to: React in 2026](https://dev.to/parsajiravand/react-in-2026-start-from-scratch-the-right-way-cheat-sheet-2j9f)

### React 19+ Hooks You Should Use

```javascript
// use() — unwrap promises directly in components
import { use, Suspense } from "react";

function ProjectCard({ projectPromise }) {
  const project = use(projectPromise);
  return <article>{project.title}</article>;
}

// useOptimistic — instant UI feedback
import { useOptimistic } from "react";

function LikeButton({ post }) {
  const [likes, addOptimistic] = useOptimistic(
    post.likes,
    (current, increment) => current + increment
  );

  async function handleLike() {
    addOptimistic(1);
    await likePost(post.id);
  }

  return <button onClick={handleLike}>{likes} likes</button>;
}

// useActionState — form state with server actions
import { useActionState } from "react";

async function createProject(prev, formData) {
  const name = formData.get("name");
  if (!name) return { error: "Name is required" };
  await saveProject({ name });
  return { success: true };
}

function ProjectForm() {
  const [state, action, isPending] = useActionState(createProject, null);
  return (
    <form action={action}>
      <input name="name" />
      {state?.error && <p>{state.error}</p>}
      <button disabled={isPending}>
        {isPending ? "Saving…" : "Create"}
      </button>
    </form>
  );
}
```

### Stop Using `useEffect` For

| ❌ Don't | ✅ Do Instead |
|----------|--------------|
| Fetching data | TanStack Query or Server Components |
| Deriving state | Compute inline: `const full = \`${first} ${last}\`` |
| Responding to events | Handle in the event handler directly |
| Animations | CSS transitions / Framer Motion |

### 2026 Recommended Stack

```
Framework:     Next.js 15 (App Router) or Vite (SPA)
Language:      TypeScript (strict mode)
Styling:       Tailwind CSS v4 + shadcn/ui  OR  Pure CSS with tokens
Data fetching: TanStack Query v5
Global state:  Zustand
Forms:         React Hook Form + Zod
Testing:       Vitest + Testing Library + Playwright
Deployment:    Vercel / Cloudflare Workers
```

---

## �📐 Studio Nika Style Tokens (Extracted)

These are the **exact values** extracted pixel-by-pixel from [studionika.co](https://studionika.co/):

```css
:root {
  /* Colors */
  --sn-bg:               #fafafa;
  --sn-surface:          #f9f9f9;
  --sn-text:             rgb(0, 4, 20);
  --sn-text-muted:       rgba(0, 0, 0, 0.5);
  --sn-border:           rgba(0, 0, 0, 0.1);
  --sn-white:            #ffffff;
  --sn-accent:           #09f;

  /* Typography */
  --sn-font:             "Inter Display", "Inter", sans-serif;
  --sn-h1-size:          32px;
  --sn-h1-weight:        600;
  --sn-h1-line-height:   1;
  --sn-h1-letter-spacing: -0.03em;
  --sn-body-size:        18px;
  --sn-body-weight:      500;
  --sn-body-line-height: 1.2;
  --sn-body-color:       rgba(0, 0, 0, 0.5);
  --sn-label-size:       12px;
  --sn-label-weight:     400;
  --sn-label-transform:  uppercase;
  --sn-label-spacing:    0.08em;

  /* Layout */
  --sn-max-width:        1440px;
  --sn-padding:          10px;
  --sn-hero-padding-top: 150px;
  --sn-hero-gap:         40px;

  /* Component */
  --sn-card-radius:      24px;
  --sn-card-bg:          #ffffff;
  --sn-card-border:      1px solid rgba(0, 0, 0, 0.05);
  --sn-btn-radius:       100px;
  --sn-btn-bg:           rgb(0, 4, 20);
  --sn-btn-color:        #ffffff;
  --sn-btn-padding:      14px 24px;
}
```

---

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun dev

# Build for production
bun run build
```

---

## 📚 Resources

- [Modern Web Guidance Skill](https://github.com/nicolo-ribaudo/modern-web-guidance) — CSS/HTML best practices
- [Studio Nika](https://studionika.co/) — Design reference
- [Inter Variable Font](https://rsms.me/inter/) — Typography
- [CSS Logical Properties](https://web.dev/learn/css/logical-properties/) — Intrinsic sizing
- [Container Queries](https://web.dev/learn/css/container-queries/) — Component responsiveness
- [Scroll-Driven Animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) — CSS-only motion
- [View Transitions API](https://developer.chrome.com/docs/css-ui/view-transitions) — SPA & MPA transitions
- [CSS in 2026 (LogRocket)](https://blog.logrocket.com/css-in-2026/) — New CSS features
- [HTML in 2026 (dev.to)](https://dev.to/sumit_sharma31/html-latest-updates-in-2026-new-features-every-web-developer-should-know-jk6) — HTML updates
- [React in 2026 (dev.to)](https://dev.to/parsajiravand/react-in-2026-start-from-scratch-the-right-way-cheat-sheet-2j9f) — React patterns
- [Customizable `<select>`](https://developer.mozilla.org/en-US/docs/Web/CSS/appearance#base-select) — Native styled dropdowns
- [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) — Zero-JS overlays
- [CSS `@function`](https://developer.mozilla.org/en-US/docs/Web/CSS/@function) — DRY reusable functions

---

## License

MIT
