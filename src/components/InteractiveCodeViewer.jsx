import React, { useState } from "react";
import { Code, Copy, Check, Terminal, Play } from "lucide-react";

export default function InteractiveCodeViewer() {
  const [activeTab, setActiveTab] = useState("rag");
  const [copied, setCopied] = useState(false);

  const snippets = {
    rag: {
      title: "JanAI — RAG Vector Retriever",
      file: "backend/rag_engine.py",
      lang: "python",
      code: `import faiss
from sentence_transformers import SentenceTransformer

class JanAIRAGRetriever:
    def __init__(self, index_path: str):
        self.model = SentenceTransformer("all-MiniLM-L6-v2")
        self.index = faiss.read_index(index_path)
        
    def retrieve_top_k(self, query: str, k: int = 3):
        # 1. Embed user query into dense vector
        query_vec = self.model.encode([query])
        
        # 2. FAISS Index Cosine Similarity Search
        distances, indices = self.index.search(query_vec, k)
        
        # 3. Format Top-K Cited Context Chunks
        return [self.knowledge_chunks[i] for i in indices[0]]`
    },
    evalmesh: {
      title: "EvalMesh — RAG Precision Evaluator",
      file: "evalmesh/precision_runner.py",
      lang: "python",
      code: `from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision

def run_evalmesh_benchmark(query: str, response: str, contexts: list):
    """
    Evaluates RAG pipeline accuracy & detects hallucinations
    """
    dataset = {
        "question": [query],
        "answer": [response],
        "contexts": [contexts]
    }
    
    # Run Ragas precision and ground-truth metrics
    results = evaluate(
        dataset,
        metrics=[faithfulness, answer_relevancy, context_precision]
    )
    
    return {
        "faithfulness_score": results["faithfulness"],
        "context_precision": results["context_precision"],
        "status": "PASS" if results["faithfulness"] > 0.90 else "FLAGGED"
    }`
    },
    zeus: {
      title: "Zeus Robot — ROS 2 SLAM Node",
      file: "zeus_robot/slam_navigator.py",
      lang: "python",
      code: `import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from sensor_msgs.msg import LaserScan

class ZeusNavigationNode(Node):
    def __init__(self):
        super().__init__('zeus_slam_navigator')
        self.scan_sub = self.create_subscription(LaserScan, '/scan', self.scan_cb, 10)
        self.cmd_pub = self.create_publisher(Twist, '/cmd_vel', 10)
        self.get_logger().info("Zeus ROS 2 SLAM Spatial Navigation Node Active.")

    def scan_cb(self, msg: LaserScan):
        # Edge LiDAR Sensor Fusion & Obstacle Avoidance Loop
        min_dist = min(msg.ranges)
        twist = Twist()
        if min_dist < 0.5:
            twist.angular.z = 0.5 # Autonomous Pivot Turn
        else:
            twist.linear.x = 0.3 # Forward Path Progression
        self.cmd_pub.publish(twist)`
    }
  };

  const current = snippets[activeTab];

  const handleCopy = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(current.code);
      }
    } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-viewer-card">
      <div className="code-viewer-header">
        <div className="code-tab-list">
          <button
            className={`code-tab ${activeTab === "rag" ? "active" : ""}`}
            onClick={() => setActiveTab("rag")}
          >
            JanAI RAG Engine
          </button>
          <button
            className={`code-tab ${activeTab === "evalmesh" ? "active" : ""}`}
            onClick={() => setActiveTab("evalmesh")}
          >
            EvalMesh Guardrails
          </button>
          <button
            className={`code-tab ${activeTab === "zeus" ? "active" : ""}`}
            onClick={() => setActiveTab("zeus")}
          >
            Zeus ROS 2 SLAM
          </button>
        </div>

        <button onClick={handleCopy} className="code-copy-btn" title="Copy code snippet">
          {copied ? <Check size={14} style={{ color: "#10b981" }} /> : <Copy size={14} />}
          <span>{copied ? "Copied" : "Copy Code"}</span>
        </button>
      </div>

      <div className="code-viewer-body">
        <div className="code-file-bar">
          <Terminal size={14} className="code-file-icon" />
          <span>{current.file}</span>
        </div>
        <pre className="code-pre">
          <code>{current.code}</code>
        </pre>
      </div>
    </div>
  );
}
