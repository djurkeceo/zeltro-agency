import React, { Suspense } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Seo from "./components/Seo";
import "./App.css";

const About = React.lazy(() => import("./components/About"));
const Services = React.lazy(() => import("./components/Services"));
const Projects = React.lazy(() => import("./components/Projects"));
const Pricing = React.lazy(() => import("./components/Pricing"));
const Testimonials = React.lazy(() => import("./components/Process"));
const Contact = React.lazy(() => import("./components/Contact"));
const Footer = React.lazy(() => import("./components/Footer"));

const SuspenseFallback = () => <div style={{ minHeight: "100vh" }} />;

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="app">
        <Seo />
        <Navbar />
        <Hero />
        <Suspense fallback={<SuspenseFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SuspenseFallback />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SuspenseFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SuspenseFallback />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<SuspenseFallback />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SuspenseFallback />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SuspenseFallback />}>
          <Footer />
        </Suspense>
      </div>
    </LazyMotion>
  );
}

export default App;
