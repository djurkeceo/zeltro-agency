import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import "./Navbar.css";
import transparentLogo from "../assets/zeltro logo transparent.png";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

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
      <motion.div
        className="scroll-indicator"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.nav
        className={`navbar ${isScrolled ? "scrolled" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`mobile-menu-backdrop ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <div className="container navbar-container">
          <motion.div
            className="navbar-logo"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={smoothHoverTransition}
          >
            <a href="#home" onClick={() => scrollToSection("home")}>
              <motion.img
                src={transparentLogo}
                alt="Zeltro logo"
                className="navbar-logo-image"
                whileHover={{ rotate: -1.5 }}
                transition={smoothHoverTransition}
              />
            </a>
          </motion.div>

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

          <motion.button
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
          </motion.button>

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
      </motion.nav>
    </>
  );
};

export default Navbar;
