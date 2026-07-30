import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundEffects() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let audioCtx;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      return;
    }

    const playClick = () => {
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } catch (e) {}
    };

    const handleClick = (e) => {
      if (e.target.closest("button") || e.target.closest("a")) {
        playClick();
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled((prev) => !prev)}
      className={`sound-toggle-btn ${enabled ? "active" : ""}`}
      title={enabled ? "Mute High-Tech Audio SFX" : "Enable High-Tech Audio SFX"}
    >
      {enabled ? <Volume2 size={15} style={{ color: "#00d4ff" }} /> : <VolumeX size={15} />}
      <span>{enabled ? "SFX: ON" : "SFX: OFF"}</span>
    </button>
  );
}
