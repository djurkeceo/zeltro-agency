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
import ScrollSection from "./components/ScrollSection";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Seo />
      <Navbar />
      <ScrollSection>
        <Hero />
      </ScrollSection>
      <ScrollSection delay={0.05}>
        <About />
      </ScrollSection>
      <ScrollSection delay={0.08}>
        <Services />
      </ScrollSection>
      <ScrollSection delay={0.1}>
        <Projects />
      </ScrollSection>
      <ScrollSection delay={0.06}>
        <Pricing />
      </ScrollSection>
      <ScrollSection delay={0.08}>
        <Testimonials />
      </ScrollSection>
      <ScrollSection delay={0.1}>
        <Contact />
      </ScrollSection>
      <ScrollSection delay={0.04}>
        <Footer />
      </ScrollSection>
    </div>
  );
}

export default App;
