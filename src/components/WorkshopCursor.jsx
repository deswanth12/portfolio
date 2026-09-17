import { useEffect, useRef, useState } from "react";

export default function WorkshopCursor() {
  const cursorDotRef = useRef(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabled = () => {
      setIsEnabled(pointerQuery.matches && !motionQuery.matches);
    };

    pointerQuery.addEventListener?.("change", updateEnabled);
    motionQuery.addEventListener?.("change", updateEnabled);

    return () => {
      pointerQuery.removeEventListener?.("change", updateEnabled);
      motionQuery.removeEventListener?.("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const onMouseMove = (e) => {
      if (!cursorDotRef.current) return;
      // Direct transform for 120fps hardware acceleration
      cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const projectEl = target.closest("[data-cursor='project']");
      if (projectEl) {
        setCursorText("OPEN");
        setIsHovered(true);
        return;
      }

      const interactiveEl = target.closest("button, a, input, [role='button'], .clickable-artifact");
      if (interactiveEl) {
        setCursorText("");
        setIsHovered(true);
        return;
      }

      setCursorText("");
      setIsHovered(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorDotRef}
      className={`workshop-cursor ${isHovered ? "hovered" : ""} ${cursorText ? "has-text" : ""}`}
      aria-hidden="true"
    >
      {cursorText && <span className="cursor-label">{cursorText}</span>}
    </div>
  );
}
