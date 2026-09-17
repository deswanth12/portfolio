import { useState, useEffect, useRef } from "react";
import { X, CornerDownLeft, Trash2, ArrowUpRight, Search } from "lucide-react";
import { searchClientKnowledge } from "../services/clientRAG";

const INITIAL_SUGGESTIONS = [
  { label: "PROJECTS", query: "What projects has Deswanth built?" },
  { label: "ZEUS", query: "Tell me about Zeus and ROS 2." },
  { label: "JANAI", query: "What is JanAI and how does its RAG work?" },
  { label: "SAGIRO", query: "What is Sagiro and why is it offline-first?" }
];

let msgIdCounter = 0;
const getMsgId = (prefix) => `${prefix}-${++msgIdCounter}`;
const getTimeString = () => {
  try {
    return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
};

export default function AskMyPortfolio({ isOpen, onClose, onOpenCaseStudy, triggerRef }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionContext, setSessionContext] = useState({});
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const drawerRef = useRef(null);

  // Focus management & Escape key trap
  useEffect(() => {
    const triggerEl = triggerRef?.current;
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // Return focus to trigger button if provided
      if (triggerEl) {
        triggerEl.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  // Auto-scroll messages
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (queryText) => {
    const textToSend = (queryText || inputValue).trim();
    if (!textToSend || isLoading) return;

    const userMsg = {
      id: getMsgId("user"),
      sender: "user",
      text: textToSend,
      time: getTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    // Synchronous deterministic retrieval with a minimal 180ms delay for natural visual stability
    await new Promise((resolve) => setTimeout(resolve, 180));

    const result = searchClientKnowledge(textToSend, sessionContext);

    if (result.context) {
      setSessionContext(result.context);
    }

    const botMsg = {
      id: getMsgId("jannu"),
      sender: "jannu",
      text: result.answer,
      sources: result.sources || [],
      time: getTimeString()
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleClear = () => {
    setMessages([]);
    setSessionContext({});
  };

  const handleSourceClick = (src) => {
    if (src.caseStudyId && onOpenCaseStudy) {
      onOpenCaseStudy(src.caseStudyId);
      onClose();
    }
  };

  return (
    <div
      className="jannu-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Jannu Portfolio RAG Knowledge Tool"
      data-cursor="default"
    >
      <div
        ref={drawerRef}
        className="jannu-drawer"
        onClick={(e) => e.stopPropagation()}
        data-cursor="default"
      >
        {/* Drawer Masthead */}
        <header className="jannu-header">
          <div className="jannu-title-group">
            <div className="jannu-eyebrow-row">
              <span className="jannu-tag">[ TOOL // RAG-01 ]</span>
              <span className="jannu-status">GROUNDED KNOWLEDGE BASE</span>
            </div>
            <h2 className="jannu-name">JANNU</h2>
            <p className="jannu-sub">PORTFOLIO RAG — Ask questions about Deswanth's work.</p>
          </div>

          <div className="jannu-actions">
            {messages.length > 0 && (
              <button
                onClick={handleClear}
                className="jannu-icon-btn"
                title="Clear conversation"
                aria-label="Clear conversation history"
              >
                <Trash2 size={14} aria-hidden="true" />
              </button>
            )}
            <button
              onClick={onClose}
              className="jannu-close-btn"
              aria-label="Close Jannu drawer (Esc)"
            >
              <span className="close-text">CLOSE</span>
              <X size={15} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Conversation Body */}
        <div className="jannu-body" role="log" aria-live="polite">
          {messages.length === 0 ? (
            <div className="jannu-empty-state">
              <div className="empty-heading-block">
                <span className="empty-indicator"></span>
                <h3>Portfolio Knowledge System</h3>
                <p>
                  Direct vector retrieval over Deswanth's verified codebases, systems architecture, robotics telemetry, and technical decisions.
                </p>
              </div>

              <div className="jannu-prompt-suggestions">
                <span className="suggestions-label">ASK ME ABOUT:</span>
                <div className="suggestions-grid">
                  {INITIAL_SUGGESTIONS.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleSend(item.query)}
                      className="suggestion-chip"
                      aria-label={`Ask: ${item.query}`}
                    >
                      <span>[ {item.label} ]</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="jannu-sample-queries">
                <span className="sample-label">EXAMPLE QUERIES:</span>
                <ul className="sample-list">
                  <li onClick={() => handleSend("What did Deswanth build with ROS 2?")}>
                    • "What did Deswanth build with ROS 2?"
                  </li>
                  <li onClick={() => handleSend("Tell me about Zeus.")}>
                    • "Tell me about Zeus."
                  </li>
                  <li onClick={() => handleSend("What is JanAI?")}>
                    • "What is JanAI?"
                  </li>
                  <li onClick={() => handleSend("Which projects use SQLite?")}>
                    • "Which projects use SQLite?"
                  </li>
                  <li onClick={() => handleSend("What technologies does Deswanth use?")}>
                    • "What technologies does Deswanth use?"
                  </li>
                  <li onClick={() => handleSend("What is Sagiro?")}>
                    • "What is Sagiro?"
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="jannu-thread">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`jannu-msg-block ${msg.sender === "user" ? "user-msg" : "jannu-msg"}`}
                >
                  <div className="msg-meta-row">
                    <span className="msg-author">
                      {msg.sender === "user" ? "YOU" : "JANNU // RETRIEVED"}
                    </span>
                    <span className="msg-time">{msg.time}</span>
                  </div>

                  <div className="msg-content">
                    <p className="msg-text">{msg.text}</p>
                  </div>

                  {msg.sender === "jannu" && msg.sources && msg.sources.length > 0 && (
                    <div className="msg-sources-row">
                      <span className="sources-tag">SOURCES:</span>
                      <div className="sources-list">
                        {msg.sources.map((src, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSourceClick(src)}
                            className={`source-chip ${src.caseStudyId ? "interactive" : ""}`}
                            title={src.caseStudyId ? `Open ${src.label}` : src.label}
                            disabled={!src.caseStudyId}
                          >
                            <span>[ {src.label} ]</span>
                            {src.caseStudyId && <ArrowUpRight size={11} aria-hidden="true" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="jannu-msg-block jannu-msg loading-msg">
                  <div className="msg-meta-row">
                    <span className="msg-author">JANNU // SEARCHING</span>
                  </div>
                  <div className="loading-indicator-row">
                    <span className="loading-pulse-dot"></span>
                    <span className="loading-text">Scanning verified portfolio index...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Bar */}
        <footer className="jannu-footer">
          <form
            className="jannu-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <div className="input-wrap">
              <Search size={14} className="input-search-icon" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                className="jannu-input"
                placeholder="Ask about my work..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={isLoading}
                aria-label="Ask questions about Deswanth's work"
              />
            </div>
            <button
              type="submit"
              className="jannu-send-btn"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Submit query"
            >
              <span>SEND</span>
              <CornerDownLeft size={13} aria-hidden="true" />
            </button>
          </form>

          <div className="jannu-footer-guard">
            <span>STRICT GROUNDING // NO SPECULATIVE RESPONSES</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
