import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './Services.css';

interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const services: Service[] = [
  {
    title: 'Custom Websites',
    description: 'Jedinstvene web stranice dizajnirane i kodirane od nule, savršeno prilagođene vašem brendu i potrebama.',
    icon: '⚡',
    features: ['Responsive Design', 'SEO Optimized', 'Lightning Fast', 'Modern Tech Stack'],
  },
  {
    title: 'Blog Development',
    description: 'Profesionalne blog platforme koje angažuju vaše čitaoce i pomažu vam da izgrađujete online prisustvo.',
    icon: '✍️',
    features: ['CMS Integration', 'Comment Systems', 'Social Sharing', 'Analytics'],
  },
  {
    title: 'WordPress Solutions',
    description: 'Moćna WordPress rešenja sa custom temama i plugin-ima, jednostavna za upravljanje i skalabilna.',
    icon: '🚀',
    features: ['Custom Themes', 'Plugin Development', 'E-commerce Ready', 'Maintenance'],
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
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Naše <span className="gradient-text">usluge</span>
          </h2>
          <p className="services-subtitle">
            Specijalizovani smo za kreiranje digitalnih iskustava koja ostavljaju trajan utisak
          </p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card glass"
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 20px 60px rgba(0, 229, 255, 0.3)' 
              }}
            >
              <div className="service-icon">{service.icon}</div>
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
              <motion.div
                className="service-hover-effect"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
