import { useRef } from "react";
import { motion } from "framer-motion";

/**
 * SpotlightCard
 * Enforces taste-skill & baseline-ui standards:
 * - Zero React re-renders on mouse move (direct CSS custom property manipulation)
 * - Hardware-accelerated radial spotlight gradient & border highlight
 * - 1px liquid glass inner refraction border
 * - Drop-in Framer Motion support
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(0, 212, 255, 0.12)",
  borderColor = "rgba(0, 212, 255, 0.4)",
  ...props
}) {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty("--spotlight-x", `${x}px`);
    divRef.current.style.setProperty("--spotlight-y", `${y}px`);
  };

  const handleMouseEnter = () => {
    if (!divRef.current) return;
    divRef.current.style.setProperty("--spotlight-opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!divRef.current) return;
    divRef.current.style.setProperty("--spotlight-opacity", "0");
  };

  const handleFocus = () => {
    if (!divRef.current) return;
    divRef.current.style.setProperty("--spotlight-opacity", "0.7");
  };

  const handleBlur = () => {
    if (!divRef.current) return;
    divRef.current.style.setProperty("--spotlight-opacity", "0");
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
      style={{
        "--spotlight-x": "0px",
        "--spotlight-y": "0px",
        "--spotlight-color": spotlightColor,
        "--spotlight-border": borderColor,
        "--spotlight-opacity": "0",
      }}
      {...props}
    >
      <div className="spotlight-overlay" aria-hidden="true" />
      <div className="spotlight-content">{children}</div>
    </motion.div>
  );
}

