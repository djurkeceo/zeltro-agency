import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import "./About.css";

const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "HTML",
  "CSS",
  "Tailwind",
  "C#",
  ".NET",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "GitHub",
  "Azure",
];

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
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="about-content" variants={leftVariants}>
            <h2 className="section-title">
              Naša <span className="gradient-text">priča</span>
            </h2>
            <p className="about-text">
              Zeltro je osnovan pre 2 godine od strane malog tima strastvenih
              developera i dizajnera. Od prvog dana fokus nam je isti: da
              pravimo digitalna rešenja koja klijentima donose konkretne upite,
              prodaju i prepoznatljiv brend.
            </p>
            <p className="about-text">
              Tokom protekle 2 godine, pomogli smo startupima, lokalnim
              biznisima i rastućim brendovima da uspostave svoj digitalni
              identitet. Specijalizujemo se za Figma dizajn, izradu web sajtova
              i web aplikacija, SEO optimizaciju i održavanje sajtova, uz fokus
              na kvalitet, brzinu i merljive rezultate.
            </p>
            <p className="about-text highlight">
              Svaki projekat je kreiran da odgovara klijentovoj viziji. Cene se
              uvek diskutuju nakon besplatne konsultacije sa klijentom,
              prilagođene obimu i potrebama svakog projekta.
            </p>
          </motion.div>

          <motion.div className="about-visual" variants={rightVariants}>
            <div className="visual-card glass">
              <div className="tech-stack">
                <p className="tech-label">Tech Stack</p>
                <h3 className="tech-title">Tehnologije koje koristimo</h3>
                <div className="tech-grid">
                  {techStack.map((tech) => (
                    <span key={tech} className="tech-item">
                      {tech}
                    </span>
                  ))}
                </div>
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
