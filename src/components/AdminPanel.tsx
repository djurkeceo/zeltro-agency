import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  additionalServices,
  monthlyPackages,
  projectPackages,
} from '../data/adminPricingData';
import './AdminPanel.css';

type AuthStatus = 'checking' | 'unauthenticated' | 'authenticated';

const AdminPanel: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const response = await fetch('/api/admin/session', {
          method: 'GET',
          credentials: 'include',
        });
        const data = (await response.json().catch(() => null)) as { authenticated?: boolean } | null;

        if (!isMounted) return;
        setAuthStatus(data?.authenticated ? 'authenticated' : 'unauthenticated');
      } catch {
        if (!isMounted) return;
        setAuthStatus('unauthenticated');
      }
    };

    void checkSession();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        setErrorMessage(data?.message ?? 'Prijava nije uspela.');
        return;
      }

      setAuthStatus('authenticated');
      setPassword('');
    } catch {
      setErrorMessage('Došlo je do greške. Pokušajte ponovo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setAuthStatus('unauthenticated');
      setUsername('');
      setPassword('');
      setErrorMessage('');
    }
  };

  if (authStatus === 'checking') {
    return (
      <main className="admin-page">
        <section className="admin-section">
          <div className="container">
            <div className="admin-loading glass">Provera pristupa...</div>
          </div>
        </section>
      </main>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <main className="admin-page">
        <section className="admin-section">
          <div className="container admin-login-wrap">
            <motion.form
              className="admin-login glass"
              onSubmit={handleLogin}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1>Admin pristup</h1>
              <p>Unesite admin korisničko ime i lozinku.</p>

              <div className="admin-form-group">
                <label htmlFor="admin-username">Korisničko ime</label>
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="admin-password">Lozinka</label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              {errorMessage && <p className="admin-error">{errorMessage}</p>}

              <button type="submit" className="admin-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Prijava...' : 'Uloguj se'}
              </button>
            </motion.form>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <section className="admin-section">
        <div className="container">
          <div className="admin-header">
            <div>
              <p className="admin-kicker">Zeltro Internal</p>
              <h1>Detaljni cenovnik usluga</h1>
            </div>
            <button className="admin-btn admin-btn-ghost" onClick={handleLogout}>
              Odjava
            </button>
          </div>

          <div className="admin-grid">
            {projectPackages.map((item) => (
              <article key={item.name} className="admin-card glass">
                <div className="admin-card-head">
                  <h2>{item.name}</h2>
                  <span>{item.category}</span>
                </div>
                <p className="admin-price">{item.price}</p>
                <h3>Uključuje</h3>
                <ul>
                  {item.includes.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {item.excludes && (
                  <>
                    <h3>Ne uključuje</h3>
                    <ul className="admin-excludes">
                      {item.excludes.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </>
                )}
              </article>
            ))}
          </div>

          <div className="admin-subsections">
            <section className="admin-card glass">
              <h2>Dodatne usluge — jednokratno</h2>
              <div className="admin-list">
                {additionalServices.map((service) => (
                  <article key={service.name} className="admin-list-item">
                    <div>
                      <h3>{service.name}</h3>
                      <p className="admin-price">{service.price}</p>
                    </div>
                    <ul>
                      {service.includes.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="admin-card glass">
              <h2>Mesečne usluge — pretplata</h2>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Paket</th>
                      <th>Cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyPackages.map((pkg) => (
                      <tr key={pkg.name}>
                        <td>{pkg.name}</td>
                        <td>{pkg.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminPanel;
