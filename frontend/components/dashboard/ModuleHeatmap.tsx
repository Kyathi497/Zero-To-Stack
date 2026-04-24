"use client";

import type { ModuleState } from "@/lib/dashboard-data";

interface ModuleHeatmapProps {
  cells: ModuleState[];
}

const LEGEND: Array<{ state: ModuleState; label: string; style: React.CSSProperties }> = [
  { state: "done",   label: "done",   style: { background: "var(--orange)" } },
  { state: "active", label: "active", style: { background: "rgba(232,80,10,.35)" } },
  { state: "next",   label: "next",   style: { background: "rgba(232,80,10,.08)", border: "1px dashed rgba(232,80,10,.35)" } },
  { state: "locked", label: "locked", style: { background: "rgba(255,255,255,.05)", border: "1px solid var(--line)" } },
];

export default function ModuleHeatmap({ cells }: ModuleHeatmapProps) {
  return (
    <div className="db-heatmap-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div className="db-card-meta">All {Math.ceil(cells.length / 3)} modules</div>
        <div className="db-heatmap-legend">
          {LEGEND.map(({ state, label, style }) => (
            <span key={state}>
              <i className="db-legend-dot" style={style} />
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="db-heatmap-grid">
        {cells.map((state, i) => (
          <div key={i} className={`db-heatmap-cell ${state}`} title={state} />
        ))}
      </div>
    </div>
  );
}
