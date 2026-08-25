import { useRef, useState } from "react";
import { exportDbFile, importDbFile, persistNow } from "../db/sqlite";

export default function DataBackup({ db }) {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState("");

  async function handleDownload() {
    const database = db?.current;
    if (!database) {
      setStatus("Database still loading — try again in a moment.");
      return;
    }
    await persistNow(database);
    const blob = exportDbFile(database);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `cabine-de-francais-progress-${stamp}.sqlite`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatus("Downloaded. This is the real SQLite database file — open it with any SQLite browser to verify.");
  }

  async function handleImportFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("Importing…");
    try {
      await importDbFile(file);
      setStatus("Imported — reloading to apply it…");
      setTimeout(() => window.location.reload(), 600);
    } catch (err) {
      setStatus("That file couldn't be read as a SQLite database.");
    }
  }

  return (
    <div className="score-panel">
      <div className="section-label">Your data</div>
      <p style={{ color: "var(--ink-dim)", fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
        Progress is stored in a real SQLite database in this browser (not just a JSON blob in
        localStorage), persisted via IndexedDB so it survives reloads and browser restarts. Download
        it any time as a genuine, portable <code>.sqlite</code> file — back it up, move it to
        another device, or open it directly in any SQLite viewer to see exactly what's stored.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="ctrl-btn primary" onClick={handleDownload}>
          Download database (.sqlite)
        </button>
        <button className="ctrl-btn" onClick={() => fileInputRef.current?.click()}>
          Import database
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".sqlite,.db,application/x-sqlite3"
          style={{ display: "none" }}
          onChange={handleImportFile}
        />
      </div>
      {status && (
        <p style={{ marginTop: 10, fontSize: 12.5, color: "var(--ink-dim)" }}>{status}</p>
      )}
    </div>
  );
}
