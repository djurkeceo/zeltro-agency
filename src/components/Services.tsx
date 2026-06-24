import { m, useInView } from "framer-motion";
import { useRef } from "react";
import "./Services.css";

interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
  badge?: string;
}

const services: Service[] = [
  {
    title: "Landing Page",
    description:
      "Moderna, brza i responzivna landing stranica dizajnirana za konverzije i brend identitet.",
    icon: "⚡",
    badge: "Frontend",
    features: [
      "Dizajn po brendu",
      "Do 5 sekcija",
      "Responsivnost",
      "Kontakt forma",
      "SEO optimizacija",
      "Google Analytics",
    ],
  },
  {
    title: "Višestranični sajt",
    description:
      "Kompletan web sajt sa više stranica, animacijama i naprednim funkcionalnostima.",
    icon: "🌐",
    badge: "Frontend",
    features: [
      "Do 15 stranica",
      "Animacije (Framer Motion)",
      "Hamburger meni",
      "Galerija/Portfolio",
      "Optimizacija brzine",
      "Sitemap & robots.txt",
    ],
  },
  {
    title: "Web aplikacija",
    description:
      "Fullstack rešenje sa backendom, bazom podataka, autentikacijom i admin panelom.",
    icon: "🚀",
    badge: "Fullstack",
    features: [
      "Backend API (.NET/Node.js)",
      "Baza podataka",
      "Prijava/registracija",
      "Admin panel",
      "Korisnički rolovi",
      "Cloud deployment",
    ],
  },
  {
    title: "Web dizajn u Figmi",
    description:
      "Profesionalni web dizajn od wireframe-a do finalnog mockup-a, spreman za razvoj.",
    icon: "🎨",
    badge: "Dizajn",
    features: [
      "Wireframe",
      "Hi-fi mockup",
      "Desktop + mobilni",
      "Tipografija i palete",
      "Reusable komponente",
      "2 runde revizija",
    ],
  },
  {
    title: "SEO paket",
    description:
      "Mesečna SEO optimizacija koja povećava vidljivost i organsku posetu vašem sajtu.",
    icon: "📈",
    badge: "SEO",
    features: [
      "Keyword istraživanje",
      "On-page optimizacija",
      "Google Search Console",
      "PageSpeed optimizacija",
      "Lokalni SEO",
      "Mesečni izveštaj",
    ],
  },
  {
    title: "Održavanje",
    description:
      "Mesečno održavanje sajta sa hostingom, backup-ima, SSL-om i tehničkom podrškom.",
    icon: "🛠️",
    badge: "Održavanje",
    features: [
      "Hosting uključen",
      "SSL sertifikat",
      "Backup",
      "Monitoring",
      "Sitne izmene",
      "Priority support (Standard)",
    ],
  },
];

const Services: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="services" className="services" ref={ref}>
      <div className="container">
        <m.div
          className="services-header"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Naše <span className="gradient-text">usluge</span>
          </h2>
          <p className="services-subtitle">
            Specijalizovani smo za kreiranje digitalnih rešenja koja
            transformišu poslovanje.
          </p>
        </m.div>

        <m.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <m.div
              key={index}
              className="service-card glass"
              variants={cardVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 60px rgba(0, 229, 255, 0.3)",
              }}
            >
              <div className="service-icon">{service.icon}</div>
              {service.badge && (
                <div className="service-badge">{service.badge}</div>
              )}
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, i) => (
                  <li key={i}>
                    <span className="checkmark">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <m.div
                className="service-hover-effect"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
};

export default Services;
