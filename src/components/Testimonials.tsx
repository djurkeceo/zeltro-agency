import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './Testimonials.css';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Marko Petrović',
    role: 'Osnivač',
    company: 'TechStart Solutions',
    content: 'Zeltro je pretvorio našu ideju u neverovatnu web platformu. Tim je bio profesionalan, kreativan i uvek dostupan. Rezultat je nadmašio sva očekivanja!',
    rating: 5,
  },
  {
    name: 'Ana Jovanović',
    role: 'Marketing Director',
    company: 'LocalShop',
    content: 'Radili smo sa nekoliko agencija ranije, ali Zeltro je jedini koji je zaista razumeo našu viziju. eCommerce sajt koji su napravili povećao je našu online prodaju za 300%.',
    rating: 5,
  },
  {
    name: 'Stefan Nikolić',
    role: 'Vlasnik',
    company: 'Restaurant Galaxy',
    content: 'Besplatna konsultacija je bila ključna. Zeltro tim je uzeo vreme da razume naše potrebe i kreirao WordPress sajt koji je jednostavan za korišćenje i izgleda fantastično.',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="testimonials" className="testimonials" ref={ref}>
      <div className="container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Šta kažu naši <span className="gradient-text">klijenti</span>
          </h2>
          <p className="testimonials-subtitle">
            Najvažniji su nam odnosi koje gradimo i rezultati koje postižemo
          </p>
        </motion.div>

        <motion.div
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card glass"
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              <div className="quote-icon">"</div>
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="testimonial-content">{testimonial.content}</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
