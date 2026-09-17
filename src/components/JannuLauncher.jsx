export default function JannuLauncher({ onOpen, launcherRef }) {
  return (
    <div className="jannu-launcher-dock">
      <button
        ref={launcherRef}
        onClick={onOpen}
        className="jannu-launcher-btn"
        aria-label="Open Jannu Portfolio RAG tool"
        title="Open Jannu (Portfolio RAG Knowledge Base)"
      >
        <div className="launcher-meta">
          <span className="launcher-title">JANNU</span>
          <span className="launcher-subtitle">PORTFOLIO RAG</span>
        </div>
        <div className="launcher-action">
          <span className="action-label">[ OPEN ]</span>
          <span className="action-dot" aria-hidden="true"></span>
        </div>
      </button>
    </div>
  );
}
