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
import "./App.css";

function App() {
  return (
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
  );
}

export default App;
