import React from "react";
import { Cpu, Activity, ShieldCheck, Database, CheckCircle2, Radio } from "lucide-react";

export default function MissionControlPanel() {
  const nodes = [
    {
      name: "JanAI RAG Engine",
      status: "ONLINE",
      metric: "500+ Schemes Indexed",
      tech: "FAISS • Vector Search • OpenAI",
      color: "#00d4ff"
    },
    {
      name: "EvalMesh Benchmarks",
      status: "ACTIVE",
      metric: "Ragas Precision: 96%",
      tech: "Hallucination Guardrails",
      color: "#10b981"
    },
    {
      name: "Zeus ROS 2 Telemetry",
      status: "ONLINE",
      metric: "30 FPS Edge Vision",
      tech: "LiDAR SLAM • Raspberry Pi 4",
      color: "#00d4ff"
    },
    {
      name: "SQLite Core Systems",
      status: "READY",
      metric: "CRUD DB Persistence",
      tech: "Python Tkinter Desktop Apps",
      color: "#10b981"
    }
  ];

  return (
    <div className="mission-control-panel">
      <div className="mission-header">
        <div className="mission-title-wrap">
          <Radio size={16} className="pulse-cyan-icon" />
          <h3>AI Engineering Mission Control</h3>
        </div>
        <span className="live-status-pill">
          <span className="pulse-green-dot"></span> Telemetry Active
        </span>
      </div>

      <div className="mission-nodes-grid">
        {nodes.map((node) => (
          <div key={node.name} className="mission-node-card">
            <div className="node-top">
              <span className="node-name">{node.name}</span>
              <span className="node-status" style={{ color: node.color }}>
                ● {node.status}
              </span>
            </div>
            <div className="node-metric">{node.metric}</div>
            <div className="node-tech">{node.tech}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
