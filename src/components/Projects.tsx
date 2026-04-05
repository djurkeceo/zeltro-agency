import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './Projects.css';

interface Project {
  title: string;
  category: string;
  tags: string[];
  description: string;
}

const projects: Project[] = [
  {
    title: 'RestaurantXYZ',
    category: 'WordPress Site',
    tags: ['WordPress', 'WooCommerce', 'Custom Theme'],
    description: 'Elegantan WordPress sajt za restoran sa online naručivanjem i rezervacijama.',
  },
  {
    title: 'TechStartup Blog',
    category: 'Custom Blog',
    tags: ['React', 'Node.js', 'MongoDB'],
    description: 'Moderna blog platforma sa naprednom pretragom i analitikom čitaoca.',
  },
  {
    title: 'LocalShop eCommerce',
    category: 'E-Commerce',
    tags: ['Shopify', 'Custom Integrations', 'Payment'],
    description: 'Kompletan online shopping sistem sa inventory managementom.',
  },
  {
    title: 'AgencyPro Portfolio',
    category: 'Portfolio Site',
    tags: ['Next.js', 'Framer Motion', 'Tailwind'],
    description: 'Portfolio web stranica kreativne agencije sa animiranim projektima.',
  },
  {
    title: 'FitLife Studio',
    category: 'Membership Site',
    tags: ['WordPress', 'MemberPress', 'Video Streaming'],
    description: 'Platforma za fitness članove sa video treninzima i online zakazivanjem.',
  },
  {
    title: 'CryptoTracker',
    category: 'Web App',
    tags: ['React', 'TypeScript', 'API Integration'],
    description: 'Real-time kripto valuta tracker sa naprednim chart-ovima.',
  },
];

const Projects: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Naši <span className="gradient-text">projekti</span>
          </h2>
          <p className="projects-subtitle">
            Svaki projekat je priča o saradnji, kreativnosti i tehničkoj izvrsnosti
          </p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card glass"
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              <div className="project-thumbnail">
                <div className="thumbnail-placeholder">
                  <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <motion.div
                  className="project-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="view-project">View Project →</span>
                </motion.div>
              </div>
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
