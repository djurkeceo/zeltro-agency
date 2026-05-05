import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ScrollSectionProps = {
  children: React.ReactNode;
  delay?: number;
};

const ScrollSection: React.FC<ScrollSectionProps> = ({ children, delay = 0 }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  if (shouldReduceMotion) {
    return (
      <div ref={sectionRef} className="scroll-section">
        <div className="scroll-section-inner">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      ref={sectionRef}
      className="scroll-section"
      initial={{ opacity: 0, y: 56, scale: 0.985, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2, margin: "-8% 0px -8% 0px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      <motion.div className="scroll-section-inner" style={{ y: parallaxY, willChange: "transform" }}>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ScrollSection;
