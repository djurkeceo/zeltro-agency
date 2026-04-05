import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="about-content" variants={leftVariants}>
            <h2 className="section-title">
              Naša <span className="gradient-text">priča</span>
            </h2>
            <p className="about-text">
              NAME je osnovan pre 3 godine od strane malog tima strastvenih developera 
              i dizajnera. Započeli smo sa jednostavnim verovanjem: svaki biznis zaslužuje 
              lepu, brzu i funkcionalnu online prisutnost — bez obzira na veličinu.
            </p>
            <p className="about-text">
              Tokom protekle 3 godine, pomogli smo startupima, lokalnim biznisima i 
              rastućim brendovima da uspostave svoj digitalni identitet. Specijalizujemo 
              se za custom web stranice, blogove i WordPress rešenja, izgrađena sa 
              pažnjom i preciznošću.
            </p>
            <p className="about-text highlight">
              Mi ne radimo po šablonima — svaki projekat je kreiran da odgovara 
              klijentovoj viziji. Cene se uvek diskutuju nakon besplatne konsultacije 
              sa klijentom, prilagođene obimu i potrebama svakog projekta.
            </p>
            <div className="about-values">
              <div className="value-item">
                <div className="value-icon">✨</div>
                <h4>Pažnja na detalje</h4>
              </div>
              <div className="value-item">
                <div className="value-icon">⚡</div>
                <h4>Brzina i performanse</h4>
              </div>
              <div className="value-item">
                <div className="value-icon">🎯</div>
                <h4>Prilagođena rešenja</h4>
              </div>
            </div>
          </motion.div>

          <motion.div className="about-visual" variants={rightVariants}>
            <div className="visual-card glass">
              <div className="code-snippet">
                <div className="code-line">
                  <span className="code-keyword">const</span> <span className="code-var">agency</span> = {'{'}
                </div>
                <div className="code-line indent">
                  <span className="code-prop">name</span>: <span className="code-string">'NAME'</span>,
                </div>
                <div className="code-line indent">
                  <span className="code-prop">founded</span>: <span className="code-number">2021</span>,
                </div>
                <div className="code-line indent">
                  <span className="code-prop">mission</span>: <span className="code-string">'Crafting digital excellence'</span>,
                </div>
                <div className="code-line indent">
                  <span className="code-prop">approach</span>: <span className="code-string">'No cookie-cutter'</span>,
                </div>
                <div className="code-line">{'};'}</div>
              </div>
              <div className="visual-decoration"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
