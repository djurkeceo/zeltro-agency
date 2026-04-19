import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { ValidationError, useForm } from '@formspree/react';
import { useRef } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const formspreeFormId = import.meta.env.VITE_FORMSPREE_FORM_ID ?? 'xwvabjvr';
  const [submitState, handleSubmit] = useForm(formspreeFormId);

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
              <p>Subotica, Srbija</p>
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
                required
                placeholder="Vaše ime"
              />
              <div className="form-error">
                <ValidationError field="name" errors={submitState.errors} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="vas@email.com"
              />
              <div className="form-error">
                <ValidationError field="email" errors={submitState.errors} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Poruka</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Recite nam o vašem projektu..."
              />
              <div className="form-error">
                <ValidationError field="message" errors={submitState.errors} />
              </div>
            </div>

            <motion.button
              type="submit"
              className="submit-button"
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(0, 229, 255, 0.6)' }}
              whileTap={{ scale: 0.98 }}
              disabled={submitState.submitting}
            >
              {submitState.submitting ? 'Slanje...' : 'Pošalji poruku'}
            </motion.button>
            {submitState.succeeded && (
              <p className="form-status success" role="status" aria-live="polite">
                Poruka je uspešno poslata. Javićemo vam se uskoro.
              </p>
            )}
            {!!submitState.errors && !submitState.succeeded && (
              <p className="form-status error" role="status" aria-live="polite">
                Greška pri slanju poruke. Proverite polja i pokušajte ponovo.
              </p>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
