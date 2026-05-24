import { m, useInView } from "framer-motion";
import { useRef } from "react";
import "./Process.css";

const steps = [
  {
    number: "01",
    title: "Konsultacije",
    description:
      "Tu smo da saslušamo Vašu priču i razumemo šta Vaš brend čini posebnim.",
    icon: "💬",
    outcome: "Dobijate jasnu sliku šta treba graditi i zašto.",
  },
  {
    number: "02",
    title: "Strategija",
    description: "Kreiramo plan koji odgovara Vašim potrebama i budžetu.",
    icon: "🧭",
    outcome: "Definišemo prioritete, rokove i fokus koji donosi rezultat.",
  },
  {
    number: "03",
    title: "Dizajn",
    description:
      "Kreiramo UI koji ostavlja snažan prvi utisak i gradi poverenje kod korisnika od prve sekunde.",
    icon: "🎨",
    outcome: "Vaš brend dobija prepoznatljiv, moderan i konverzijski izgled.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Gradimo stabilna i skalabilna rešenja koja su optimizovana za brzinu i sve uređaje.",
    icon: "⚙️",
    outcome: "Dobijate brz i pouzdan proizvod spreman za rast.",
  },
  {
    number: "05",
    title: "Launch",
    description: "Testiramo svaki detalj, pa tek onda idemo live.",
    icon: "🚀",
    outcome: "Lansiranje bez stresa, sa sigurnim performansama od starta.",
  },
  {
    number: "06",
    title: "Održavanje",
    description: "Tu smo i posle lansiranja — ažuriranja, podrška, rast.",
    icon: "🔧",
    outcome: "Kontinuirana podrška i unapređenja koja čuvaju momentum.",
  },
];

const Process: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="process" className="process" ref={ref}>
      <div className="container">
        <m.div
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
        </m.div>

        <m.div
          className="process-shell glass"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="process-steps">
            {steps.map((step, index) => (
              <m.article
                key={step.number}
                className="process-card glass"
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.55, delay: 0.2 + index * 0.09 }}
              >
                <div className="process-card-top">
                  <span className="process-step-icon">{step.icon}</span>
                  <div className="process-card-title-wrap">
                    <p className="process-step-number">FAZA {step.number}</p>
                    <h3 className="process-step-title">{step.title}</h3>
                  </div>
                </div>
                <p className="process-step-desc">{step.description}</p>
                <p className="process-step-outcome">{step.outcome}</p>
              </m.article>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default Process;
