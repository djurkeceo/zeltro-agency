import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import "./Navbar.css";

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
        <div className="container navbar-container">
          <motion.div
            className="navbar-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#home" onClick={() => scrollToSection("home")}>
              <span className="gradient-text">Zeltro</span>
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
