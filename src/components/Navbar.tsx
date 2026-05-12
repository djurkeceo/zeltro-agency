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
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#home" onClick={() => scrollToSection("home")}>
              <motion.img
                src={transparentLogo}
                alt="Zeltro logo"
                className="navbar-logo-image"
                whileHover={{ rotate: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              />
            </a>
          </motion.div>

          <div className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}>
            <a href="#home" onClick={() => scrollToSection("home")}>
              Početna
            </a>
            <a href="#services" onClick={() => scrollToSection("projects")}>
              Usluge
            </a>
            <a href="#projects" onClick={() => scrollToSection("services")}>
              Projekti
            </a>
            <a href="#contact" onClick={() => scrollToSection("contact")}>
              Kontakt
            </a>
          </div>

          <motion.button
            className="cta-button"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(0, 229, 255, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
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
