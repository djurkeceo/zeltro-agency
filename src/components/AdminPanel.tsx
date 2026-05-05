import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  additionalServices,
  monthlyPackages,
  projectPackages,
} from "../data/adminPricingData";
import "./AdminPanel.css";

type AuthStatus = "checking" | "unauthenticated" | "authenticated";

const AdminPanel: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const totalOffers =
    projectPackages.length + additionalServices.length + monthlyPackages.length;
  const totalIncludedItems =
    projectPackages.reduce((sum, item) => sum + item.includes.length, 0) +
    additionalServices.reduce((sum, item) => sum + item.includes.length, 0) +
    monthlyPackages.reduce((sum, item) => sum + item.includes.length, 0);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const response = await fetch("/api/admin/session", {
          method: "GET",
          credentials: "include",
        });
        const data = (await response.json().catch(() => null)) as {
          authenticated?: boolean;
        } | null;

        if (!isMounted) return;
        setAuthStatus(
          data?.authenticated ? "authenticated" : "unauthenticated",
        );
      } catch {
        if (!isMounted) return;
        setAuthStatus("unauthenticated");
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
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        setErrorMessage(data?.message ?? "Prijava nije uspela.");
        return;
      }

      setAuthStatus("authenticated");
      setPassword("");
    } catch {
      setErrorMessage("Došlo je do greške. Pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setAuthStatus("unauthenticated");
      setUsername("");
      setPassword("");
      setErrorMessage("");
    }
  };

  if (authStatus === "checking") {
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

  if (authStatus === "unauthenticated") {
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
              <div className="admin-login-head">
                <p className="admin-kicker">Zeltro Internal</p>
                <h1>Admin pristup</h1>
                <p>
                  Prijavite se da otvorite interni cenovnik i pakete usluga.
                </p>
              </div>

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

              <button
                type="submit"
                className="admin-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Prijava..." : "Uloguj se"}
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
        <div className="container admin-shell">
          <motion.header
            className="admin-header glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div>
              <p className="admin-kicker">Zeltro Internal</p>
              <h1>Zeltro Admin Panel</h1>
              <p>Pregled svih ponuda i paketa na jednom mestu.</p>
            </div>
            <button
              className="admin-btn admin-btn-ghost"
              type="button"
              onClick={handleLogout}
            >
              Odjava
            </button>
          </motion.header>

          <motion.section
            className="admin-overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <article className="admin-stat glass">
              <p>Ponude ukupno</p>
              <strong>{totalOffers}</strong>
            </article>
            <article className="admin-stat glass">
              <p>Projektni paketi</p>
              <strong>{projectPackages.length}</strong>
            </article>
            <article className="admin-stat glass">
              <p>Mesečni planovi</p>
              <strong>{monthlyPackages.length}</strong>
            </article>
            <article className="admin-stat glass">
              <p>Stavke uključene</p>
              <strong>{totalIncludedItems}</strong>
            </article>
          </motion.section>

          <nav className="admin-nav">
            <a href="#admin-projects" className="admin-nav-link">
              Projektni paketi
            </a>
            <a href="#admin-additional" className="admin-nav-link">
              Dodatne usluge
            </a>
            <a href="#admin-monthly" className="admin-nav-link">
              Mesečne usluge
            </a>
          </nav>

          <motion.section
            id="admin-projects"
            className="admin-block glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="admin-block-head">
              <h2>Projektni paketi</h2>
              <p>Fiksne ponude za landing stranice, sajtove i aplikacije.</p>
            </div>

            <div className="admin-grid">
              {projectPackages.map((item) => (
                <motion.article
                  key={item.name}
                  className="admin-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 14px 36px -18px rgba(0, 229, 255, 0.65)",
                  }}
                >
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
                </motion.article>
              ))}
            </div>
          </motion.section>

          <div className="admin-subsections">
            <motion.section
              id="admin-additional"
              className="admin-block glass"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <div className="admin-block-head">
                <h2>Dodatne usluge</h2>
                <p>Jednokratne usluge koje se nadovezuju na glavne pakete.</p>
              </div>
              <div className="admin-list">
                {additionalServices.map((service) => (
                  <motion.article
                    key={service.name}
                    className="admin-list-item"
                    whileHover={{
                      y: -6,
                      boxShadow: "0 12px 30px -18px rgba(0, 229, 255, 0.55)",
                    }}
                  >
                    <div className="admin-list-head">
                      <h3>{service.name}</h3>
                      <p className="admin-list-price">{service.price}</p>
                    </div>
                    <ul className="admin-list-points">
                      {service.includes.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </motion.section>

            <motion.section
              id="admin-monthly"
              className="admin-block glass"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
            >
              <div className="admin-block-head">
                <h2>Mesečne usluge</h2>
                <p>Pretplatnički planovi za održavanje, podršku i SEO rast.</p>
              </div>
              <div className="admin-monthly-grid">
                {monthlyPackages.map((pkg) => (
                  <motion.article
                    key={pkg.name}
                    className="admin-monthly-card"
                    whileHover={{
                      y: -6,
                      boxShadow: "0 16px 34px -22px rgba(0, 229, 255, 0.7)",
                    }}
                  >
                    <div className="admin-monthly-card-head">
                      <h3>{pkg.name}</h3>
                      <p className="admin-monthly-price">{pkg.price}</p>
                    </div>
                    <ul className="admin-monthly-services">
                      {pkg.includes.map((service) => (
                        <li key={service}>{service}</li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminPanel;
