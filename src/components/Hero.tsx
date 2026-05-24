import { m } from "framer-motion";
import "./Hero.css";

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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
        <m.div
          className="hero-content"
          variants={containerVariants}
          initial={false}
          animate="visible"
        >
          <m.h1 variants={itemVariants} className="hero-title" initial={false}>
            Vaše
            <span className="gradient-text"> poslovanje</span> zaslužuje
            <span className="gradient-text"> web </span>
            <br />
            <span className="gradient-text"> sajt </span>
            koji donosi
            <span className="gradient-text"> rezultate. </span>
          </m.h1>

          <m.p
            variants={itemVariants}
            className="hero-subtitle"
            initial={false}
            layout={false}
            style={{ willChange: 'opacity' }}
          >
            Kreiramo moderne web sajtove, moćne web aplikacije, strateški
            dizajn, SEO optimizaciju i pouzdano održavanje — sve što je potrebno
            da Vaš brend raste online. Kao web agencija iz Srbije, ne pravimo
            samo lepe stranice, već digitalna rešenja koja unapređuju Vaše
            poslovanje.
          </m.p>

          <m.div variants={itemVariants} className="hero-ctas" initial={false}>
            <m.button
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
            </m.button>
            <m.button
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
            </m.button>
          </m.div>

          <m.div variants={itemVariants} className="hero-stats" initial={false}>
            <div className="stat">
              <p className="stat-value gradient-text">20+</p>
              <p className="stat-label">Projekata</p>
            </div>
            <div className="stat">
              <p className="stat-value gradient-text">2</p>
              <p className="stat-label">Godine Iskustva</p>
            </div>
            <div className="stat">
              <p className="stat-value gradient-text">
                100
                <span className="stat-percent" style={{ marginLeft: "-0.5px" }}>
                  %
                </span>
              </p>
              <p className="stat-label">Zadovoljnih Klijenata</p>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};

export default Hero;
