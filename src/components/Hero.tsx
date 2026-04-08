import { motion } from 'framer-motion';
import './Hero.css';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
            Vaš digitalni
            <br />
            <span className="gradient-text">identitet</span> kreiran
            <br />
            sa <span className="gradient-text">preciznošću</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            Web Design agencija koja stvara izuzetne web stranice, blogove i 
            WordPress rešenja. Ne radimo po šablonima — svaki projekat je 
            rukotvorina prilagođena vašoj viziji.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-ctas">
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 229, 255, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
            >
              Pogledaj Projekte
            </motion.button>
            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
            >
              Kontaktiraj Nas
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="hero-stats"
          >
            <div className="stat">
              <h3 className="gradient-text">50+</h3>
              <p>Projekata</p>
            </div>
            <div className="stat">
              <h3 className="gradient-text">3</h3>
              <p>Godine Iskustva</p>
            </div>
            <div className="stat">
              <h3 className="gradient-text">100%</h3>
              <p>Zadovoljnih Klijenata</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator-bottom"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
