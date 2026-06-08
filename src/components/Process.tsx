import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import "./Process.css";

const pillars = [
  {
    number: "01",
    title: "Brzina koja prodaje",
    description:
      "Sporiji sajt znači manje kupaca. Svaki projekat optimizujemo za PageSpeed 90+ jer performansa nije opcija — to je standard.",
    tag: "Performance",
  },
  {
    number: "02",
    title: "Dizajn koji konvertuje",
    description:
      "Lep sajt koji ne donosi upite je promašaj. Svaki piksel postoji iz razloga — da privuče, zadrži i ubedi posetioce da deluju.",
    tag: "Conversion",
  },
  {
    number: "03",
    title: "SEO koji radi za vas",
    description:
      "Dok spavate, vaš sajt se rangira. Gradimo tehničke temelje koji guraju vaš brend na vrh Google pretrage organski.",
    tag: "Visibility",
  },
  {
    number: "04",
    title: "Partnerstvo, ne servis",
    description:
      "Ne nestajemo posle lansiranja. Tu smo za ažuriranja, rast i sve promene koje Vaš biznis zahteva — dugoročno.",
    tag: "Long-term",
  },
];

const Process: React.FC = () => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.14,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.55 },
    },
  };

  const pillarVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.45 },
    },
  };

  return (
    <section id="process" className="process" ref={ref}>
      <div className="container">
        <m.div
          className="projects-header"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <m.h2 variants={itemVariants}>
            <span className="section-title">Svaki sajt mora</span> da donese{" "}
            <span className="gradient-text">konkretne rezultate.</span>
            <br />
            <span className="process-muted">Sve ostalo je dekoracija.</span>
          </m.h2>
        </m.div>

        <m.div
          className="process-board"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <m.div className="process-pillars" variants={containerVariants}>
            {pillars.map((pillar) => (
              <m.div
                key={pillar.number}
                className="process-pillar"
                variants={pillarVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        scale: 1.01,
                        boxShadow: "0 18px 40px rgba(0, 229, 255, 0.12)",
                        background: "rgba(0, 229, 255, 0.03)",
                      }
                }
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <div className="process-pillar-num">{pillar.number}</div>
                <div className="process-pillar-title">{pillar.title}</div>
                <p className="process-pillar-desc">{pillar.description}</p>
                <span className="process-pillar-tag">{pillar.tag}</span>
              </m.div>
            ))}
          </m.div>
        </m.div>

          {/* <div className="process-bottom">
            <div className="process-manifesto">
              <div className="process-manifesto-label">Naše obećanje</div>
              <p>
                Ne pravimo sajtove koji samo <strong>izgledaju dobro</strong> —
                pravimo digitalna sredstva koja <strong>rade za vas 24/7</strong>{" "}
                i donose merljiv povratak investicije.
              </p>
            </div>

            <div className="process-actions">
              <div className="process-manifesto-label">Sledeći korak</div>
              <m.button
                className="process-btn-primary"
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  boxShadow: "0 14px 30px rgba(0, 229, 255, 0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                onClick={() => scrollToSection("contact")}
              >
                Besplatna konsultacija ↗
              </m.button>
              <m.button
                className="process-btn-ghost"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                onClick={() => scrollToSection("projects")}
              >
                Pogledaj projekte
              </m.button>
            </div>
          </div>
        </m.div> */}

      </div>
    </section>
  );
};

export default Process;