import { motion } from "framer-motion";
import "./Footer.css";
import logo168 from "../assets/zeltro-logo-168.png";
import logo336 from "../assets/zeltro-logo-336.png";
import logo168Webp from "../assets/zeltro-logo-168.webp";
import logo336Webp from "../assets/zeltro-logo-336.webp";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <motion.div
              className="footer-logo-wrapper"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${logo168Webp} 168w, ${logo336Webp} 336w`}
                  sizes="168px"
                />
                <motion.img
                  src={logo168}
                  srcSet={`${logo168} 168w, ${logo336} 336w`}
                  sizes="168px"
                  alt="Zeltro logo"
                  className="footer-logo"
                  width={168}
                  height={50}
                  loading="lazy"
                  decoding="async"
                  whileHover={{ rotate: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                />
              </picture>
            </motion.div>
            <p className="footer-tagline">Better websites. Better business.</p>
            <div className="footer-social">
              <motion.a
                href="https://www.linkedin.com/company/zeltro-agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, color: "#00e5ff" }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://github.com/djurkeceo"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, color: "#00e5ff" }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@zeltro.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, color: "#00e5ff" }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16.56 3.13a4.73 4.73 0 0 0 1.17 2.06 4.92 4.92 0 0 0 2.2 1.28v2.52a7.5 7.5 0 0 1-2.57-.57v5.14a6.56 6.56 0 1 1-5.68-6.5v2.58a3.98 3.98 0 1 0 3.1 3.87V0h1.78Z" />
                </svg>
              </motion.a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Navigacija</h4>
            <ul>
              <li>
                <a href="#home" onClick={() => scrollToSection("home")}>
                  Početna
                </a>
              </li>
              <li>
                <a href="#projects" onClick={() => scrollToSection("projects")}>
                  Projekti
                </a>
              </li>
              <li>
                <a href="#services" onClick={() => scrollToSection("services")}>
                  Usluge
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => scrollToSection("contact")}>
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Usluge</h4>
            <ul>
              <li>Izrada web sajtova</li>
              <li>Web aplikacije</li>
              <li>Figma dizajn</li>
              <li>SEO optimizacija</li>
              <li>Održavanje sajtova</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Kontakt</h4>
            <p>zeltro.agency@gmail.com</p>
            <p>Subotica, Srbija</p>
            <motion.button
              className="footer-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
            >
              Besplatna Konsultacija
            </motion.button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Zeltro Agency. All rights reserved.</p>
          <motion.button
            className="back-to-top"
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            ↑ Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
