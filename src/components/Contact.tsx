import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Hajde da <span className="gradient-text">razgovaramo</span>
          </h2>
          <p className="contact-subtitle">
            Spremni da započnemo vaš projekat? Kontaktirajte nas za besplatnu konsultaciju
          </p>
        </motion.div>

        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="contact-info">
            <div className="info-card glass">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>hello@nameagency.rs</p>
            </div>
            <div className="info-card glass">
              <div className="info-icon">📍</div>
              <h3>Lokacija</h3>
              <p>Beograd, Srbija</p>
            </div>
            <div className="info-card glass">
              <div className="info-icon">💼</div>
              <h3>Konsultacija</h3>
              <p>100% Besplatna</p>
            </div>
          </div>

          <motion.form
            className="contact-form glass"
            onSubmit={handleSubmit}
            whileHover={{ boxShadow: '0 20px 60px rgba(0, 229, 255, 0.2)' }}
          >
            <div className="form-group">
              <label htmlFor="name">Ime</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Vaše ime"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="vas@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Poruka</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Recite nam o vašem projektu..."
              />
            </div>

            <motion.button
              type="submit"
              className="submit-button"
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0, 229, 255, 0.6)' }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitted ? '✓ Poslato!' : 'Pošalji poruku'}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
