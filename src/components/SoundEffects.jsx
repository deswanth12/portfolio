import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundEffects() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let audioCtx;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    } catch (err) {
      console.error("Web Audio initialization failed", err);
      return;
    }

    const playClick = () => {
      if (!audioCtx) return;
      try {
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }
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
      } catch (err) {
        console.error("Audio playback error", err);
      }
    };

    const handleClick = (e) => {
      if (e.target && (e.target.closest("button") || e.target.closest("a"))) {
        playClick();
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
      if (audioCtx && typeof audioCtx.close === "function") {
        audioCtx.close().catch(() => {});
      }
    };
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled((prev) => !prev)}
      className={`sound-toggle-btn ${enabled ? "active" : ""}`}
      title={enabled ? "Mute High-Tech Audio SFX" : "Enable High-Tech Audio SFX"}
      aria-label={enabled ? "Mute audio effects" : "Enable audio effects"}
    >
      {enabled ? <Volume2 size={15} style={{ color: "#00d4ff" }} aria-hidden="true" /> : <VolumeX size={15} aria-hidden="true" />}
      <span>{enabled ? "SFX: ON" : "SFX: OFF"}</span>
    </button>
  );
}
