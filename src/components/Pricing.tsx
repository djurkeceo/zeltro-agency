import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './Pricing.css';

const Pricing: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="pricing" ref={ref}>
      <div className="container">
        <motion.div
          className="pricing-content"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Transparentne <span className="gradient-text">cene</span>
          </h2>
          
          <div className="pricing-card glass">
            <div className="pricing-icon">💼</div>
            <h3 className="pricing-title">Prilagođeno svakom projektu</h3>
            <p className="pricing-description">
              Ne verujemo u univerzalne pakete. Svaki projekat je jedinstven, sa sopstvenim 
              potrebama, ciljevima i budžetom. Zato naše cene uvek kreiramo nakon što 
              temeljno razumemo vaš projekat.
            </p>
            
            <div className="pricing-features">
              <div className="pricing-feature">
                <span className="feature-icon">✓</span>
                <span>Besplatna inicijalna konsultacija</span>
              </div>
              <div className="pricing-feature">
                <span className="feature-icon">✓</span>
                <span>Detaljan predlog i procena</span>
              </div>
              <div className="pricing-feature">
                <span className="feature-icon">✓</span>
                <span>Fleksibilni planovi plaćanja</span>
              </div>
              <div className="pricing-feature">
                <span className="feature-icon">✓</span>
                <span>Bez skrivenih troškova</span>
              </div>
            </div>

            <motion.button
              className="pricing-cta"
              whileHover={{
                scale: 1.04,
                y: -2,
                boxShadow: '0 14px 30px rgba(0, 229, 255, 0.34)',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              onClick={scrollToContact}
            >
              Zakažite besplatnu konsultaciju
            </motion.button>

            <p className="pricing-note">
              Kontaktirajte nas danas i dobijte personalizovanu ponudu za vaš projekat
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
