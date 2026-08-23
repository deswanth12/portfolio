import { useState, useEffect, useRef } from "react";
import { Radio, Zap, RefreshCcw, Crosshair, Terminal } from "lucide-react";

export default function ZeusVisualizer() {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState("NAVIGATION (SLAM)");
  const [targetObstacle, setTargetObstacle] = useState({ r: 0.45, theta: 45 }); // polar coords
  const [status, setStatus] = useState("CLEAR PATH • NAV2 ACTIVE");
  const [latestTopic, setLatestTopic] = useState("[INFO] /scan 360 ranges @ 30Hz");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let sweepAngle = 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = () => {
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      const w = (canvas.width = canvas.clientWidth || 300);
      const h = (canvas.height = canvas.clientHeight || 300);
      const cx = w / 2;
      const cy = h / 2;
      const maxRadius = Math.max(Math.min(w, h) / 2 - 25, 20);

      ctx.clearRect(0, 0, w, h);

      // 1. Concentric Distance Grid Circles (0.5m, 1.0m, 1.5m, 2.0m)
      ctx.strokeStyle = "rgba(0, 212, 255, 0.12)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        const r = (maxRadius / 4) * i;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        // Distance Labels
        ctx.fillStyle = "rgba(148, 163, 184, 0.5)";
        ctx.font = "9px Fira Code, monospace";
        ctx.fillText(`${(i * 0.5).toFixed(1)}m`, cx + 4, cy - r + 12);
      }

      // 2. Crosshair Grid Lines
      ctx.beginPath();
      ctx.moveTo(cx - maxRadius, cy);
      ctx.lineTo(cx + maxRadius, cy);
      ctx.moveTo(cx, cy - maxRadius);
      ctx.lineTo(cx, cy + maxRadius);
      ctx.stroke();

      // 3. 360-Degree Point Cloud Contour (Simulated Indoor Room Environment Boundary)
      ctx.fillStyle = "rgba(0, 212, 255, 0.6)";
      for (let a = 0; a < 360; a += 3) {
        const rad = (a * Math.PI) / 180;
        let distFactor = 0.75 + Math.sin(a * 0.05) * 0.15;
        
        const angleDiff = Math.abs((a % 360) - (targetObstacle.theta % 360));
        if (angleDiff < 15 || angleDiff > 345) {
          distFactor = targetObstacle.r;
        }

        const px = cx + Math.cos(rad) * (maxRadius * distFactor);
        const py = cy + Math.sin(rad) * (maxRadius * distFactor);

        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Rotating LiDAR Laser Sweep Wedge
      if (!prefersReducedMotion) {
        sweepAngle = (sweepAngle + 0.04) % (Math.PI * 2);
      } else {
        sweepAngle = Math.PI / 4;
      }

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxRadius, sweepAngle - 0.3, sweepAngle);
      ctx.lineTo(cx, cy);

      const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius);
      sweepGrad.addColorStop(0, "rgba(0, 212, 255, 0.35)");
      sweepGrad.addColorStop(1, "rgba(0, 212, 255, 0)");
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // 5. Robot Center Base Node (base_link)
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#10b981";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [targetObstacle]);

  // Click on Canvas to place real obstacle
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - canvas.clientWidth / 2;
    const y = e.clientY - rect.top - canvas.clientHeight / 2;

    const distPx = Math.sqrt(x * x + y * y);
    const maxRadius = Math.min(canvas.clientWidth, canvas.clientHeight) / 2 - 25;
    const rFactor = Math.min(Math.max(distPx / maxRadius, 0.15), 0.9);

    let angleDeg = (Math.atan2(y, x) * 180) / Math.PI;
    if (angleDeg < 0) angleDeg += 360;

    setTargetObstacle({ r: rFactor, theta: angleDeg });
    const distMeters = (rFactor * 2.0).toFixed(2);

    if (rFactor < 0.35) {
      setStatus(`WARN: OBSTACLE AT ${distMeters}m • PIVOT TURN`);
      setLatestTopic(`[WARN] /cmd_vel Twist(linear=0.0, angular=0.55)`);
    } else {
      setStatus(`CLEAR PATH • NAV2 ACTIVE (${distMeters}m)`);
      setLatestTopic(`[INFO] /scan 360 ranges @ 30Hz • obstacle ${distMeters}m`);
    }
  };

  const handleSimulateObstacle = () => {
    setTargetObstacle({ r: 0.22, theta: 90 });
    setStatus("WARN: OBSTACLE AT 0.44m • PIVOT TURN");
    setLatestTopic("[WARN] /cmd_vel Twist(linear=0.0, angular=0.50)");
    setTimeout(() => {
      setTargetObstacle({ r: 0.75, theta: 45 });
      setStatus("CLEAR PATH • NAV2 ACTIVE");
      setLatestTopic("[INFO] /scan 360 ranges @ 30Hz");
    }, 2800);
  };

  const obsDistMeters = (targetObstacle.r * 2.0).toFixed(2);
  const cartX = (targetObstacle.r * 2.0 * Math.cos((targetObstacle.theta * Math.PI) / 180)).toFixed(2);
  const cartY = (targetObstacle.r * 2.0 * Math.sin((targetObstacle.theta * Math.PI) / 180)).toFixed(2);

  return (
    <div className="zeus-vis-card">
      <div className="zeus-vis-header">
        <div className="zeus-title-wrap">
          <Radio className="pulse-cyan-icon" size={18} aria-hidden="true" />
          <div>
            <span className="zeus-eyebrow">Real LiDAR Point-Cloud Sensor Fusion</span>
            <h3>Zeus Robot — 360° LiDAR SLAM Navigator (ROS 2 Humble)</h3>
          </div>
        </div>
        <span className="zeus-status-badge">🟢 360° RPLiDAR S2 (30Hz)</span>
      </div>

      <div className="zeus-grid">
        <div
          className="zeus-canvas-wrap"
          onClick={handleCanvasClick}
          role="button"
          tabIndex={0}
          aria-label="Radar scan interactive view. Click or press Enter to place obstacle"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleSimulateObstacle();
            }
          }}
          title="Click anywhere inside radar to place obstacle!"
        >
          <canvas ref={canvasRef} className="zeus-canvas" />
          <span className="radar-hint"><Crosshair size={12} aria-hidden="true" /> Click Radar to Place Obstacle</span>
        </div>

        <div className="zeus-controls-panel">
          <div className="telemetry-box" role="region" aria-label="Robot Telemetry">
            <div className="t-row">
              <span className="t-label">Path Status:</span>
              <span className="t-val" style={{ color: status.includes("WARN") ? "#f59e0b" : "#10b981" }}>
                {status}
              </span>
            </div>
            <div className="t-row">
              <span className="t-label">Obstacle Clearance:</span>
              <span className="t-val">{obsDistMeters}m</span>
            </div>
            <div className="t-row">
              <span className="t-label">Cartesian Coordinates:</span>
              <span className="t-val">X: {cartX}m, Y: {cartY}m</span>
            </div>
            <div className="t-row">
              <span className="t-label">Sensor Hardware:</span>
              <span className="t-val">RPLiDARS2 • Raspberry Pi 4 B</span>
            </div>
          </div>

          {/* ROS 2 Live Topic Payload Terminal Bar */}
          <div className="ros-terminal-bar" role="status" aria-live="polite">
            <Terminal size={13} className="ros-term-icon" aria-hidden="true" />
            <code>{latestTopic}</code>
          </div>

          <div className="zeus-actions">
            <button onClick={handleSimulateObstacle} className="zeus-btn" aria-label="Simulate obstacle detection">
              <Zap size={14} aria-hidden="true" />
              <span>Simulate Obstacle</span>
            </button>
            <button onClick={() => setMode(mode.includes("SLAM") ? "NAVIGATION (NAV2)" : "NAVIGATION (SLAM)")} className="zeus-btn" aria-label="Toggle navigation mode">
              <RefreshCcw size={14} aria-hidden="true" />
              <span>Mode: {mode}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
