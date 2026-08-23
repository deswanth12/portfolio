import { useState, useEffect } from "react";
import {
  Search,
  Terminal,
  Bot,
  Code,
  Briefcase,
  Zap,
  Mail,
  FileText,
  X,
  ArrowRight,
  Shield,
  BarChart2
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function CommandMenu({
  isOpen,
  onClose,
  onOpenJannu,
  onOpenTerminal,
  onOpenCaseStudy
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigateToSection = (sectionId) => {
    onClose();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const commandItems = [
    {
      id: "jannu-ai",
      title: "Ask Jannu AI Assistant",
      subtitle: "Semantic vector search & cited portfolio queries",
      icon: Bot,
      category: "AI & Tools",
      action: () => {
        onClose();
        onOpenJannu();
      }
    },
    {
      id: "terminal",
      title: "Open Interactive Terminal",
      subtitle: "Execute deswanth --help commands",
      icon: Terminal,
      category: "AI & Tools",
      action: () => {
        onClose();
        onOpenTerminal();
      }
    },
    {
      id: "project-janai",
      title: "JanAI Case Study",
      subtitle: "Multi-lingual RAG Civic Scheme Discovery Platform",
      icon: Zap,
      category: "Products",
      action: () => {
        onClose();
        onOpenCaseStudy("janai");
      }
    },
    {
      id: "project-evalmesh",
      title: "EvalMesh Case Study",
      subtitle: "AI Evaluation & RAG Benchmarking Framework",
      icon: BarChart2,
      category: "Products",
      action: () => {
        onClose();
        onOpenCaseStudy("evalmesh");
      }
    },
    {
      id: "project-zeus",
      title: "Zeus Robot Case Study",
      subtitle: "Autonomous ROS 2 Robotics Platform & Edge AI Vision",
      icon: Code,
      category: "Products",
      action: () => {
        onClose();
        onOpenCaseStudy("zeus");
      }
    },
    {
      id: "nav-services",
      title: "View Services & Solutions",
      subtitle: "Agentic AI, RAG Systems, MCP, & Full Stack Dev",
      icon: Briefcase,
      category: "Navigation",
      action: () => navigateToSection("services")
    },
    {
      id: "nav-workflow",
      title: "View Engineering Workflow",
      subtitle: "Idea ➔ Research ➔ Architecture ➔ Testing ➔ Deployment",
      icon: Shield,
      category: "Navigation",
      action: () => navigateToSection("workflow")
    },
    {
      id: "nav-performance",
      title: "View Live Performance Dashboard",
      subtitle: "Lighthouse 98+, FCP, LCP, & Web Vitals audit",
      icon: BarChart2,
      category: "Navigation",
      action: () => navigateToSection("performance")
    },
    {
      id: "action-cv",
      title: "Download CV (PDF)",
      subtitle: "Download K Deswanth's official resume",
      icon: FileText,
      category: "Actions",
      action: () => {
        onClose();
        const a = document.createElement("a");
        a.href = "/Deswanth_CV.pdf";
        a.download = "Deswanth_CV.pdf";
        a.click();
      }
    },
    {
      id: "action-github",
      title: "Visit GitHub Repositories",
      subtitle: "github.com/deswanth12",
      icon: FaGithub,
      category: "Actions",
      action: () => {
        onClose();
        window.open("https://github.com/deswanth12", "_blank", "noopener,noreferrer");
      }
    },
    {
      id: "nav-contact",
      title: "Contact Deswanth",
      subtitle: "kdeswanth@gmail.com • +91 8374646073",
      icon: Mail,
      category: "Navigation",
      action: () => navigateToSection("contact")
    }
  ];

  const filteredItems = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          const trigger = document.getElementById("cmd-menu-trigger");
          if (trigger) trigger.click();
        }
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredItems, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Command Menu">
      <div className="cmd-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Search Header */}
        <div className="cmd-search-header">
          <Search className="cmd-search-icon" size={18} aria-hidden="true" />
          <input
            type="text"
            className="cmd-input"
            placeholder="Type a command or search (e.g. Jannu, JanAI, Services, Terminal)..."
            value={query}
            onChange={handleQueryChange}
            autoFocus
            aria-label="Search commands"
          />
          <button onClick={onClose} className="cmd-close-btn" aria-label="Close menu">
            <X size={16} />
          </button>
        </div>

        {/* Command Items List */}
        <div className="cmd-list" role="listbox" aria-label="Commands">
          {filteredItems.length === 0 ? (
            <div className="cmd-empty">No commands found matching "{query}"</div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0}
                  className={`cmd-item ${isSelected ? "selected" : ""}`}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      item.action();
                    }
                  }}
                >
                  <div className="cmd-item-left">
                    <div className="cmd-item-icon">
                      <Icon size={16} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="cmd-item-title">{item.title}</div>
                      <div className="cmd-item-subtitle">{item.subtitle}</div>
                    </div>
                  </div>
                  <div className="cmd-item-right">
                    <span className="cmd-category-badge">{item.category}</span>
                    <ArrowRight size={14} className="cmd-arrow" aria-hidden="true" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Command Menu Footer */}
        <div className="cmd-footer">
          <div className="cmd-footer-hints">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>Esc</kbd> Close</span>
          </div>
          <div className="cmd-footer-branding">
            <span>Raycast Command Menu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
