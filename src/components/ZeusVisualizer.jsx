import React, { useState, useEffect, useRef } from "react";
import { Cpu, Radio, Shield, Zap, RefreshCcw } from "lucide-react";

export default function ZeusVisualizer() {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState("NAVIGATION");
  const [obstacleDistance, setObstacleDistance] = useState("0.84m");
  const [status, setStatus] = useState("PATH OPTIMAL");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let angle = 0;

    const render = () => {
      const w = (canvas.width = canvas.clientWidth);
      const h = (canvas.height = canvas.clientHeight);
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) / 2 - 20;

      ctx.clearRect(0, 0, w, h);

      // Radar circles
      ctx.strokeStyle = "rgba(0, 212, 255, 0.15)";
      ctx.lineWidth = 1;
      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radius / 3) * r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Radar crosshair
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Sweeping radar beam
      angle += 0.04;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle - 0.4, angle);
      ctx.lineTo(cx, cy);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, "rgba(0, 212, 255, 0.4)");
      grad.addColorStop(1, "rgba(0, 212, 255, 0)");
      ctx.fillStyle = grad;
      ctx.fill();

      // Center Robot Node
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#10b981";
      ctx.fill();

      // Simulated Obstacle Echo Dot
      const obsX = cx + Math.cos(angle - 0.2) * (radius * 0.6);
      const obsY = cy + Math.sin(angle - 0.2) * (radius * 0.6);
      ctx.beginPath();
      ctx.arc(obsX, obsY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#00d4ff";
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleSimulateObstacle = () => {
    setStatus("OBSTACLE DETECTED • PIVOT TURN");
    setObstacleDistance("0.24m");
    setTimeout(() => {
      setStatus("PATH OPTIMAL");
      setObstacleDistance("0.84m");
    }, 2500);
  };

  return (
    <div className="zeus-vis-card">
      <div className="zeus-vis-header">
        <div className="zeus-title-wrap">
          <Radio className="pulse-cyan-icon" size={18} />
          <div>
            <span className="zeus-eyebrow">ROS 2 Telemetry Radar</span>
            <h3>Zeus Robot — 360° LiDAR SLAM Navigator</h3>
          </div>
        </div>
        <span className="zeus-status-badge">🟢 30 FPS LiDAR</span>
      </div>

      <div className="zeus-grid">
        <div className="zeus-canvas-wrap">
          <canvas ref={canvasRef} className="zeus-canvas" />
        </div>

        <div className="zeus-controls-panel">
          <div className="telemetry-box">
            <div className="t-row">
              <span className="t-label">Status:</span>
              <span className="t-val" style={{ color: status.includes("OBSTACLE") ? "#f59e0b" : "#10b981" }}>
                {status}
              </span>
            </div>
            <div className="t-row">
              <span className="t-label">Obstacle Clearance:</span>
              <span className="t-val">{obstacleDistance}</span>
            </div>
            <div className="t-row">
              <span className="t-label">LiDAR Frequency:</span>
              <span className="t-val">30 Hz (RPLiDARS2)</span>
            </div>
            <div className="t-row">
              <span className="t-label">Compute Host:</span>
              <span className="t-val">Raspberry Pi 4 B</span>
            </div>
          </div>

          <div className="zeus-actions">
            <button onClick={handleSimulateObstacle} className="zeus-btn">
              <Zap size={14} />
              <span>Simulate Obstacle</span>
            </button>
            <button onClick={() => setMode(mode === "NAVIGATION" ? "MAPPING" : "NAVIGATION")} className="zeus-btn">
              <RefreshCcw size={14} />
              <span>Toggle Mode: {mode}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
