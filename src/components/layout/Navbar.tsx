import { useEffect, useState } from "react";

/**
 * Fixed navbar with scroll-triggered blur backdrop.
 * - Transparent on top, blurred background on scroll
 * - Responsive: links hidden on mobile
 */

const NAV_LINKS = [
  { label: "Work", href: "#works" },
  { label: "Benefits", href: "#benefits" },
  { label: "Contact", href: "#book-a-call" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container">
        <div className="nav__inner">
          {/* Logo */}
          <a href="/" className="nav__logo" aria-label="Home">
            junaid.dev
          </a>

          {/* Links */}
          <ul className="nav__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
