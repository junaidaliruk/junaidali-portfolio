/**
 * Works data — Portfolio projects
 * 
 * Real projects from GitHub with live deployments.
 */

import type { Work } from "../types/project";

export type { Work };

export const WORKS: Work[] = [
  {
    id: 1,
    name: "Site Metrics",
    services: ["Web App", "Performance Analytics"],
    url: "https://site-metrics.vercel.app/",
    image: "./screenshots/site-metrics.png",
    imageWidth: 1440,
    imageHeight: 900,
    year: "2025",
    tech: "TypeScript",
  },
  {
    id: 2,
    name: "Nova 3D",
    services: ["3D Website", "Gaming"],
    url: "https://3d-website-opal.vercel.app/",
    image: "./screenshots/3d-website.png",
    imageWidth: 1440,
    imageHeight: 900,
    year: "2025",
    tech: "Three.js",
  },
  {
    id: 3,
    name: "Jobly",
    services: ["Job Board", "Fullstack"],
    url: "https://indeed-clone-phi.vercel.app/",
    image: "./screenshots/indeed-clone.png",
    imageWidth: 1440,
    imageHeight: 900,
    year: "2025",
    tech: "TypeScript",
  },
  {
    id: 4,
    name: "Nexus Gaming",
    services: ["Gaming Platform", "E-commerce"],
    url: "https://gaming-website-inky-nine.vercel.app/",
    image: "./screenshots/gaming-website.png",
    imageWidth: 1440,
    imageHeight: 900,
    year: "2025",
    tech: "HTML/CSS",
  },
  {
    id: 5,
    name: "Tulos Ecommerce",
    services: ["E-commerce", "Fullstack"],
    url: "https://tulos-ecommerce-eight.vercel.app/",
    image: "./screenshots/tulos-ecommerce.png",
    imageWidth: 1440,
    imageHeight: 900,
    year: "2025",
    tech: "TypeScript",
  },
  {
    id: 6,
    name: "Nestwell",
    services: ["Real Estate", "Web Design"],
    url: "https://real-estate-psi-blush.vercel.app/",
    image: "./screenshots/real-estate.png",
    imageWidth: 1440,
    imageHeight: 900,
    year: "2026",
    tech: "Next.js",
  },
  {
    id: 7,
    name: "Lumina PDF",
    services: ["PDF Editor", "Client-side"],
    url: "https://pdf-editor-zeta-taupe.vercel.app/",
    image: "./screenshots/pdf-editor.png",
    imageWidth: 1440,
    imageHeight: 900,
    year: "2025",
    tech: "TypeScript",
  },
  {
    id: 8,
    name: "Bookwarm",
    services: ["Blog", "Content Platform"],
    url: "https://bookwarm-jet.vercel.app/",
    image: "./screenshots/bookwarm.png",
    imageWidth: 1440,
    imageHeight: 900,
    year: "2025",
    tech: "Next.js",
  },
];
