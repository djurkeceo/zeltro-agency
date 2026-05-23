import { MotionConfig, useReducedMotion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Seo from "./components/Seo";
import useIsMobile from "./hooks/useIsMobile";
import "./App.css";

function App() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const shouldReduceMotion = prefersReducedMotion || isMobile;

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "user"}>
      <div className="app">
        <Seo />
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Pricing />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
