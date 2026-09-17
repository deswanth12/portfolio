import { useState, useEffect } from "react";

const PROJECTS = [
  { num: "01", id: "project-janai", name: "JANAI" },
  { num: "02", id: "project-zeus", name: "ZEUS" },
  { num: "03", id: "project-sagiro", name: "SAGIRO" },
  { num: "04", id: "project-evalmesh", name: "EVALMESH" },
  { num: "05", id: "project-security", name: "SECURITY TOOLKIT" },
  { num: "06", id: "project-student-db", name: "STUDENT DB" }
];

export default function ProjectIndexTracker() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const worksSection = document.getElementById("work");
      if (!worksSection) return;

      const rect = worksSection.getBoundingClientRect();
      // Visible when the works section is in viewport
      const inView = rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2;
      setIsVisible(inView);

      if (inView) {
        // Find which project is currently closest to top
        PROJECTS.forEach((proj, idx) => {
          const el = document.getElementById(proj.id);
          if (el) {
            const elRect = el.getBoundingClientRect();
            if (elRect.top <= window.innerHeight * 0.5 && elRect.bottom >= 100) {
              setActiveIdx(idx);
            }
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const current = PROJECTS[activeIdx];

  const scrollToProject = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      className="project-index-tracker"
      aria-label="Current project index navigation"
    >
      <div className="tracker-inner">
        <span className="tracker-prefix">INDEX</span>
        <span className="tracker-accent">{current.num}</span>
        <span className="tracker-total">/ 06</span>
        <span className="tracker-divider">—</span>
        <span className="tracker-name">{current.name}</span>
      </div>

      <div className="tracker-pills" role="tablist" aria-label="Project quick jump">
        {PROJECTS.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => scrollToProject(p.id)}
            className={`tracker-pill ${idx === activeIdx ? "active" : ""}`}
            title={`Jump to ${p.num} ${p.name}`}
            aria-label={`Jump to ${p.name}`}
          >
            {p.num}
          </button>
        ))}
      </div>
    </aside>
  );
}
