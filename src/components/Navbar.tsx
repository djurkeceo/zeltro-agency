import { useState, useEffect } from "react";
import { m, useReducedMotion, useScroll } from "framer-motion";
import "./Navbar.css";
import logo120 from "../assets/zeltro-logo-120.png";
import logo240 from "../assets/zeltro-logo-240.png";
import logo120Webp from "../assets/zeltro-logo-120.webp";
import logo240Webp from "../assets/zeltro-logo-240.webp";
import useIsMobile from "../hooks/useIsMobile";

const ScrollIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <m.div className="scroll-indicator" style={{ scaleX: scrollYProgress }} />
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const showScrollIndicator = !isMobile && !prefersReducedMotion;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const smoothHoverTransition = {
    type: "spring" as const,
    stiffness: 220,
    damping: 26,
    mass: 0.85,
  };

  return (
    <>
      {showScrollIndicator && <ScrollIndicator />}
      <m.nav
        className={`navbar ${isScrolled ? "scrolled" : ""}`}
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`mobile-menu-backdrop ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <div className="container navbar-container">
          <m.div
            className="navbar-logo"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={smoothHoverTransition}
          >
            <a href="#home" onClick={() => scrollToSection("home")}>
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${logo120Webp} 120w, ${logo240Webp} 240w`}
                  sizes="114px"
                />
                <m.img
                  src={logo120}
                  srcSet={`${logo120} 120w, ${logo240} 240w`}
                  sizes="114px"
                  alt="Zeltro logo"
                  className="navbar-logo-image"
                  width={114}
                  height={34}
                  decoding="async"
                  whileHover={{ rotate: -1.5 }}
                  transition={smoothHoverTransition}
                />
              </picture>
            </a>
          </m.div>

          <div className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}>
            <a href="#home" onClick={() => scrollToSection("home")}>
              Početna
            </a>
            <a href="#services" onClick={() => scrollToSection("services")}>
              Usluge
            </a>
            <a href="#projects" onClick={() => scrollToSection("projects")}>
              Projekti
            </a>
            <a href="#contact" onClick={() => scrollToSection("contact")}>
              Kontakt
            </a>
          </div>

          <m.button
            className="cta-button"
            whileHover={{
              scale: 1.03,
              y: -1,
              boxShadow: "0 12px 26px rgba(0, 229, 255, 0.32)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={smoothHoverTransition}
            onClick={() => scrollToSection("contact")}
          >
            Besplatna Konsultacija
          </m.button>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </m.nav>
    </>
  );
};

export default Navbar;
