import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import "./Process.css";

const steps = [
  {
    number: "01",
    title: "Konsultacije",
    description:
      "Tu smo da saslušamo tvoju priču i razumemo šta tvoj brend čini posebnim.",
    icon: "💬",
  },
  {
    number: "02",
    title: "Strategija",
    description: "Kreiramo plan koji odgovara tvojim potrebama i budžetu.",
    icon: "🧭",
  },
  {
    number: "03",
    title: "Dizajn",
    description:
      "Kreiramo UI koji ostavlja snažan prvi utisak i gradi poverenje kod tvojih korisnika od prve sekunde.",
    icon: "🎨",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Gradimo stabilna i skalabilna rešenja koja su optimizovana za brzinu i sve uređaje.",
    icon: "⚙️",
  },
  {
    number: "05",
    title: "Launch",
    description: "Testiramo svaki detalj, pa tek onda idemo live.",
    icon: "🚀",
  },
  {
    number: "06",
    title: "Održavanje",
    description: "Tu smo i posle lansiranja — ažuriranja, podrška, rast.",
    icon: "🔧",
  },
];

const Process: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="process" className="process" ref={ref}>
      <div className="container">
        <motion.div
          className="process-header"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Od ideje do <span className="gradient-text">digitalnog uspeha</span>
          </h2>
          <p className="process-subtitle">
            Svaki korak ima svrhu. Svaka odluka ima razlog.
          </p>
        </motion.div>

        <div className="process-track">
          {/* Connector line */}
          <div className="process-line-bg" />
          <motion.div
            className="process-line-fill"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: "easeInOut" }}
          />

          <div className="process-steps">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="process-step"
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.55, delay: 0.15 + index * 0.12 }}
              >
                <div className="step-node">
                  <motion.div
                    className="step-icon-wrap"
                    whileHover={{ scale: 1.12, rotate: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="step-emoji">{step.icon}</span>
                  </motion.div>
                  <div className="step-number">{step.number}</div>
                </div>
                <div className="step-body glass">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
