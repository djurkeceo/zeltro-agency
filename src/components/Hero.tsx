import { motion } from "framer-motion";
import "./Hero.css";

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="hero-title">
            Vaše
            <span className="gradient-text"> poslovanje</span> zaslužuje
            <span className="gradient-text"> web </span>
            <br />
            <span className="gradient-text"> sajt </span>
            koji donosi
            <span className="gradient-text"> rezultate. </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            Kreiramo moderne web sajtove, moćne web aplikacije, strateški
            dizajn, SEO optimizaciju i pouzdano održavanje — sve što je potrebno
            da vaš brend raste online. Kao web agencija iz Srbije, ne pravimo
            samo lepe stranice, već digitalna rešenja koja unapređuju vaše
            poslovanje.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-ctas">
            <motion.button
              className="btn btn-primary"
              whileHover={{
                scale: 1.04,
                y: -3,
                boxShadow: "0 14px 32px rgba(0, 229, 255, 0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              onClick={() => scrollToSection("projects")}
            >
              Pogledaj Projekte
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              whileHover={{
                scale: 1.04,
                y: -3,
                boxShadow: "0 12px 28px rgba(0, 229, 255, 0.22)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              onClick={() => scrollToSection("contact")}
            >
              Kontaktiraj Nas
            </motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-stats">
            <div className="stat">
              <h3 className="gradient-text">20+</h3>
              <p>Projekata</p>
            </div>
            <div className="stat">
              <h3 className="gradient-text">2</h3>
              <p>Godine Iskustva</p>
            </div>
            <div className="stat">
              <h3 className="gradient-text">
                100
                <span className="stat-percent" style={{ marginLeft: "-0.5px" }}>
                  %
                </span>
              </h3>
              <p>Zadovoljnih Klijenata</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
