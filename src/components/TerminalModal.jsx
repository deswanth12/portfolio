import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, CornerDownLeft, Sparkles } from "lucide-react";

export default function TerminalModal({ isOpen, onClose, onOpenCaseStudy }) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([
    {
      type: "system",
      content: "Deswanth Dev CLI v1.0.0 (x86_64-pc-linux-gnu)\nType 'deswanth --help' or 'help' to list available commands."
    }
  ]);

  const inputRef = useRef(null);
  const historyEndRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    const newHistory = [...history, { type: "user", content: `$ ${rawCmd}` }];
    const cmd = rawCmd.toLowerCase();

    if (cmd === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let outputText = "";

    if (cmd === "deswanth --help" || cmd === "help" || cmd === "deswanth") {
      outputText = `Available Deswanth CLI Commands:
  deswanth bio        - View professional background & AI positioning
  deswanth products   - List active AI products (JanAI, EvalMesh, Zeus Robot)
  deswanth metrics    - Display verified engineering benchmarks
  deswanth contact    - Get email, phone, & GitHub links
  clear               - Clear terminal output screen`;
    } else if (cmd === "deswanth bio") {
      outputText = `K Deswanth — AI Product Builder & Full Stack Engineer
Location: India
Focus: Building AI products, autonomous systems, and production-ready full-stack applications.
Key Tech: Python, React 19, FastAPI, RAG / Vector DBs, ROS 2 Humble, SQLite.`;
    } else if (cmd === "deswanth products") {
      outputText = `Active Engineering Products:
1. JanAI      - Multi-lingual RAG Civic Scheme Discovery Platform
2. EvalMesh   - AI Evaluation & RAG Benchmarking Framework
3. Zeus Robot - Autonomous ROS 2 Robotics System with Edge AI Vision
4. Security   - Python Network Packet Analysis & Scanner Toolkit
5. SQLite DBs - Student, Staff, and Library Desktop Applications`;
    } else if (cmd === "deswanth metrics") {
      outputText = `Verified Engineering Benchmarks:
  • Systems Built: 6+ Production & RAG Systems
  • RAG Latency: 1.2s Average Response Speed
  • Code Repos: 8+ GitHub Repositories
  • Web Vitals: 98+ Lighthouse Performance Audit`;
    } else if (cmd === "deswanth contact") {
      outputText = `Contact Details:
  Email: kdeswanth@gmail.com
  Phone: +91 8374646073
  GitHub: https://github.com/deswanth12
  Portfolio: https://portfolio-plum-sigma-etfrkmq5t9.vercel.app/`;
    } else {
      outputText = `zsh: command not found: ${rawCmd}. Type 'deswanth --help' for available commands.`;
    }

    newHistory.push({ type: "system", content: outputText });
    setHistory(newHistory);
    setInputVal("");
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-backdrop" onClick={onClose}>
      <div className="terminal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red" onClick={onClose}></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="terminal-title">
            <Terminal size={14} /> deswanth@portfolio:~ (zsh)
          </div>
          <button onClick={onClose} className="terminal-close-btn" aria-label="Close terminal">
            <X size={16} />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body">
          {history.map((item, idx) => (
            <div key={idx} className={`terminal-line ${item.type}`}>
              <pre>{item.content}</pre>
            </div>
          ))}
          <div ref={historyEndRef} />
        </div>

        {/* Command Input Form */}
        <form
          className="terminal-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
        >
          <span className="terminal-prompt">deswanth@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command (e.g. deswanth --help)..."
          />
          <button type="submit" className="terminal-enter-btn" title="Execute command">
            <CornerDownLeft size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
