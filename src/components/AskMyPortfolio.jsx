import React, { useState, useEffect, useRef } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaTrash,
  FaChevronDown,
  FaLightbulb,
  FaBookOpen,
  FaCheckCircle,
  FaLayerGroup,
  FaCopy,
  FaVolumeUp,
  FaCompress,
  FaExpand,
  FaThumbsUp,
  FaUserAlt,
  FaCode,
  FaRocket,
  FaEnvelope,
  FaMagic
} from "react-icons/fa";
import { searchClientKnowledge } from "../services/clientRAG";

const PRESET_CATEGORIES = [
  { icon: FaUserAlt, text: "Who is Deswanth?" },
  { icon: FaRocket, text: "What is JanAI?" },
  { icon: FaRobot, text: "Describe Zeus Robot" },
  { icon: FaCode, text: "Skills in React?" },
  { icon: FaMagic, text: "Show me AI projects" },
  { icon: FaEnvelope, text: "How can I contact him?" }
];

export default function AskMyPortfolio({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hi! I'm Jannu 🤖, Deswanth's AI companion. Ask me anything about his projects (JanAI, Zeus Robot, Security Toolkit), technical skills, resume, or background!",
      sources: ["Resume", "Portfolio Data"],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [likedIds, setLikedIds] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (queryText) => {
    const textToSend = queryText || inputValue;
    if (!textToSend.trim() || isTyping) return;

    const userMsgId = "user-" + Date.now();
    const userMsg = {
      id: userMsgId,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Try FastAPI backend SSE streaming first, fallback to client RAG
    let botResponse = null;
    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: textToSend })
      });

      if (response.ok) {
        botResponse = await response.json();
      }
    } catch (e) {
      console.log("Jannu AI using Client-side RAG Vector Engine");
    }

    if (!botResponse) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      botResponse = searchClientKnowledge(textToSend);
    }

    const botMsgId = "bot-" + Date.now();
    const fullText = botResponse.answer;
    const sources = botResponse.sources || [];

    setMessages((prev) => [
      ...prev,
      {
        id: botMsgId,
        sender: "bot",
        text: "",
        sources: sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isStreaming: true
      }
    ]);

    setIsTyping(false);

    // Character-by-character typing animation
    let currentText = "";
    const words = fullText.split(" ");
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? "" : " ") + words[i];
      const updatedText = currentText;
      
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMsgId
            ? { ...msg, text: updatedText, isStreaming: i < words.length - 1 }
            : msg
        )
      );
      
      await new Promise((resolve) => setTimeout(resolve, 22));
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: "Hey! I'm Jannu 🤖. Conversation reset! What else would you like to know about K Deswanth?",
        sources: ["Portfolio Data"],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getSourceIcon = (src) => {
    if (src.includes("JanAI")) return "🚀";
    if (src.includes("Zeus")) return "🤖";
    if (src.includes("Resume")) return "📄";
    if (src.includes("GitHub")) return "💻";
    return "💡";
  };

  if (!isOpen) return null;

  return (
    <div
      className={`rag-modal-backdrop ${isExpanded ? "expanded" : ""}`}
      onClick={onClose}
    >
      <div
        className={`rag-chat-card ${isExpanded ? "expanded" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div className="rag-header">
          <div className="rag-header-info">
            <div className="rag-avatar jannu-avatar">
              <span className="jannu-emoji">🤖</span>
              <span className="online-indicator"></span>
            </div>
            <div>
              <div className="rag-title-row">
                <h3>Ask Jannu</h3>
                <span className="rag-badge jannu-badge">Jannu AI</span>
              </div>
              <p className="rag-subtitle">
                Deswanth's RAG Vector Assistant
              </p>
            </div>
          </div>

          <div className="rag-header-actions">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="icon-btn"
              title={isExpanded ? "Compress window" : "Expand window"}
              aria-label="Toggle size"
            >
              {isExpanded ? <FaCompress /> : <FaExpand />}
            </button>
            <button
              onClick={handleClearHistory}
              className="icon-btn"
              title="Clear chat history"
              aria-label="Clear chat history"
            >
              <FaTrash />
            </button>
            <button
              onClick={onClose}
              className="icon-btn close-btn"
              title="Close chat"
              aria-label="Close modal"
            >
              <FaChevronDown />
            </button>
          </div>
        </div>

        {/* Preset Prompt Recommendations */}
        <div className="rag-presets-bar">
          <div className="presets-label">
            <FaLightbulb className="preset-icon" /> Ask Jannu:
          </div>
          <div className="presets-scroll">
            {PRESET_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.text}
                  className="preset-pill jannu-pill"
                  onClick={() => handleSend(cat.text)}
                  disabled={isTyping}
                >
                  <Icon className="pill-icon" /> {cat.text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Messages Body */}
        <div className="rag-messages-body">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rag-message-row ${msg.sender === "user" ? "user-row" : "bot-row"}`}
            >
              {msg.sender === "bot" && (
                <div className="bot-msg-avatar jannu-msg-avatar">
                  🤖
                </div>
              )}

              <div className="rag-msg-bubble-wrap">
                <div className={`rag-msg-bubble ${msg.sender}`}>
                  <div className="msg-text">{msg.text}</div>
                  {msg.isStreaming && <span className="typing-cursor">▌</span>}
                </div>

                {/* Sources Citation Bar */}
                {msg.sender === "bot" && msg.sources && msg.sources.length > 0 && (
                  <div className="rag-sources-bar">
                    <span className="sources-title">
                      <FaBookOpen /> Sources:
                    </span>
                    {msg.sources.map((src) => (
                      <span key={src} className="source-tag jannu-tag">
                        {getSourceIcon(src)} {src}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bubble Actions */}
                {msg.sender === "bot" && (
                  <div className="bubble-actions">
                    <span className="timestamp">{msg.timestamp}</span>
                    <button
                      onClick={() => handleLike(msg.id)}
                      className={`mini-action-btn ${likedIds.includes(msg.id) ? "liked" : ""}`}
                      title="Helpful response"
                    >
                      <FaThumbsUp style={{ color: likedIds.includes(msg.id) ? "#39d3c7" : "inherit" }} />
                    </button>
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="mini-action-btn"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <FaCheckCircle style={{ color: '#10b981' }} /> : <FaCopy />}
                    </button>
                    <button
                      onClick={() => handleSpeak(msg.text)}
                      className="mini-action-btn"
                      title="Read aloud"
                    >
                      <FaVolumeUp />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="rag-message-row bot-row">
              <div className="bot-msg-avatar jannu-msg-avatar">
                🤖
              </div>
              <div className="rag-msg-bubble bot typing-bubble">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="typing-status">Jannu is searching vector DB...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <form
          className="rag-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            className="rag-text-input"
            placeholder="Ask Jannu anything about Deswanth..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
          />
          <button
            type="submit"
            className="rag-send-btn jannu-send-btn"
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send message to Jannu"
          >
            <FaPaperPlane />
          </button>
        </form>

        <div className="rag-footer-note">
          <FaLayerGroup /> Jannu RAG System: Chunking ➔ Embeddings ➔ Vector DB ➔ Semantic Search ➔ Cited Sources
        </div>
      </div>
    </div>
  );
}
