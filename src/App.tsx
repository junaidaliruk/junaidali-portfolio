import { Hero } from "./components/sections/Hero";
import { PortfolioTicker } from "./components/sections/PortfolioTicker";
import { Benefits } from "./components/sections/Benefits";
import { Works } from "./components/sections/Works";
import { Process } from "./components/sections/Process";
import { Testimonials } from "./components/sections/Testimonials";
import { FAQ } from "./components/sections/FAQ";
import { Footer } from "./components/sections/Footer";
import { BottomBlur } from "./components/layout/BottomBlur";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export function App() {
  // Initialize smooth scroll
  useSmoothScroll();

  return (
    <>
      {/* Skip link — accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Main content */}
      <main id="main-content">
        <Hero />
        <PortfolioTicker />
        <Benefits />
        <Works />
        <Process />
        <Testimonials />
        <FAQ />
        <Footer />
      </main>

      {/* Progressive blur at bottom — matches Studio Nika */}
      <BottomBlur />
    </>
  );
}
