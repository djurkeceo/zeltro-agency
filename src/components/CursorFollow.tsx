import { useEffect, useRef } from "react";
import "./CursorFollow.css";

const CursorFollow = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReduced) return;

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, .service-card, .project-card, .process-pillar, .info-card, .pricing-cta, .cta-button, .social-link, .back-to-top, .submit-button"
      );
      if (target) {
        isHoveringRef.current = true;
        ringRef.current?.classList.add("cursor-ring-hover");
      }
    };

    const handleOut = () => {
      isHoveringRef.current = false;
      ringRef.current?.classList.remove("cursor-ring-hover");
    };

    const animate = () => {
      const { x, y } = mouseRef.current;
      const ringPos = ringPosRef.current;

      ringPos.x += (x - ringPos.x) * 0.12;
      ringPos.y += (y - ringPos.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouse, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
};

export default CursorFollow;
