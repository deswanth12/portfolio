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
    } catch {
      return;
    }

    const playClick = () => {
      if (!audioCtx) return;
      try {
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }
        // Very subtle mechanical click (tactile switch)
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.03);

        gain.gain.setValueAtTime(0.025, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.03);
      } catch {
        // Ignore audio playback exceptions
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
      className={`workshop-sound-btn ${enabled ? "active" : ""}`}
      title={enabled ? "Mute workshop audio" : "Enable tactile mechanical audio"}
      aria-label={enabled ? "Mute audio" : "Enable audio"}
    >
      {enabled ? (
        <Volume2 size={13} style={{ color: "var(--accent)" }} aria-hidden="true" />
      ) : (
        <VolumeX size={13} aria-hidden="true" />
      )}
      <span>{enabled ? "SOUND: ON" : "SOUND: OFF"}</span>
    </button>
  );
}
