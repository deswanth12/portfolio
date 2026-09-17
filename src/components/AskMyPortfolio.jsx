import { useState, useEffect, useRef } from "react";
import { X, CornerDownLeft, Trash2, ArrowUpRight, Search } from "lucide-react";
import { searchClientKnowledge } from "../services/clientRAG.js";

const INITIAL_SUGGESTIONS = [
  { label: "Zeus Robot", query: "Tell me about Zeus and ROS 2." },
  { label: "JanAI Platform", query: "What is JanAI and why was it built?" },
  { label: "Sagiro Ledger", query: "What is Sagiro and why is it offline-first?" },
  { label: "Technical Stack", query: "What technologies does Deswanth work with?" }
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

    // Minimal 140ms delay for natural visual stability without sluggishness
    await new Promise((resolve) => setTimeout(resolve, 140));

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
      aria-label="Jannu Portfolio Assistant"
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
            <span className="jannu-eyebrow">DESWANTH.DEV // ASSISTANT</span>
            <h2 className="jannu-name">Jannu</h2>
            <p className="jannu-sub">Ask about Deswanth's work, systems, or engineering.</p>
          </div>

          <div className="jannu-actions">
            {messages.length > 0 && (
              <button
                onClick={handleClear}
                className="jannu-icon-btn"
                title="Clear conversation"
                aria-label="Clear conversation history"
              >
                <Trash2 size={13} aria-hidden="true" />
              </button>
            )}
            <button
              onClick={onClose}
              className="jannu-close-btn"
              aria-label="Close assistant (Esc)"
            >
              <span className="close-text">CLOSE</span>
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Conversation Body */}
        <div className="jannu-body" role="log" aria-live="polite" aria-busy={isLoading}>
          {messages.length === 0 ? (
            <div className="jannu-empty-state">
              <div className="jannu-intro">
                <p className="intro-lead">
                  I know about Deswanth's robotics, AI systems, local-first applications, and engineering decisions.
                </p>
                <span className="intro-prompt">Explore a topic to begin:</span>
              </div>

              <div className="suggestions-grid">
                {INITIAL_SUGGESTIONS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSend(item.query)}
                    className="suggestion-chip"
                    aria-label={`Ask: ${item.query}`}
                  >
                    <span className="chip-label">{item.label}</span>
                    <ArrowUpRight size={12} className="chip-arrow" aria-hidden="true" />
                  </button>
                ))}
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
                      {msg.sender === "user" ? "YOU" : "JANNU"}
                    </span>
                    <span className="msg-time">{msg.time}</span>
                  </div>

                  <div className="msg-content">
                    <p className="msg-text">{msg.text}</p>
                  </div>

                  {msg.sender === "jannu" && msg.sources && msg.sources.length > 0 && (
                    <div className="msg-sources-row">
                      <span className="sources-tag">SOURCE:</span>
                      <div className="sources-list">
                        {msg.sources.map((src, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSourceClick(src)}
                            className={`source-chip ${src.caseStudyId ? "interactive" : ""}`}
                            title={src.caseStudyId ? `View ${src.label} case study` : src.label}
                            disabled={!src.caseStudyId}
                          >
                            <span>{src.label.replace(" CASE STUDY", "")}</span>
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
                    <span className="msg-author">JANNU</span>
                  </div>
                  <div className="loading-indicator-row">
                    <span className="loading-pulse-dot" aria-hidden="true"></span>
                    <span className="loading-text">Thinking...</span>
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
                placeholder="Ask about projects, architecture, skills..."
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
              aria-label="Send query"
            >
              <span>SEND</span>
              <CornerDownLeft size={12} aria-hidden="true" />
            </button>
          </form>

          <div className="jannu-footer-hint">
            <span>Press Return ↵ to send • Esc to close</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
