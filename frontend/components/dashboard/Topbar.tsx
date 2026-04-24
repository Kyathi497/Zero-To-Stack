"use client";

interface TopbarProps {
  role: "student" | "admin";
}

export default function Topbar({ role }: TopbarProps) {
  const isAdmin = role === "admin";

  return (
    <div className="db-topbar">
      <div className="db-crumb">
        {isAdmin ? "Admin" : "Home"} · <b>{isAdmin ? "Overview" : "Dashboard"}</b>
      </div>

      <div className="db-search" style={{ marginLeft: "auto" }}>
        <span style={{ color: "var(--text-dimmer)", fontSize: 14 }}>⌕</span>
        <span>Search lessons, assignments, code…</span>
        <span className="kbd">⌘K</span>
      </div>

      <button className="db-icon-btn" title="Notifications">
        <span>🔔</span>
        <span className="db-notif-dot" />
      </button>

      {isAdmin ? (
        <button className="db-new-class-btn">+ New class</button>
      ) : (
        <button className="db-icon-btn" title="Help" style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 600 }}>?</button>
      )}
    </div>
  );
}
