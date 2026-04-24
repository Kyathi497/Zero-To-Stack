"use client";

import type { CohortHealth } from "@/lib/dashboard-data";

const AMBER = "#FFD166";
const R = 50;
const C = 2 * Math.PI * R; // ≈ 314.16

interface Arc {
  pct: number;
  color: string;
  label: string;
  count: number;
}

interface RingChartProps {
  health: CohortHealth;
}

export default function RingChart({ health }: RingChartProps) {
  const total = health.totalStudents;
  const onTrackPct  = health.onTrackCount / total;
  const atRiskPct   = health.atRisk       / total;
  const criticalPct = health.critical     / total;

  const arcs: Arc[] = [
    { pct: onTrackPct,  color: "var(--green)", label: "On track",       count: health.onTrackCount },
    { pct: atRiskPct,   color: AMBER,           label: "At risk",        count: health.atRisk       },
    { pct: criticalPct, color: "var(--red)",    label: "Falling behind", count: health.critical     },
  ];

  let offset = 0;

  return (
    <div className="db-card db-ring-card">
      <div className="db-ring-wrap">
        <svg width="130" height="130" viewBox="0 0 130 130">
          {/* background track */}
          <circle cx="65" cy="65" r={R} stroke="rgba(255,255,255,.06)" strokeWidth="14" fill="none" />
          {arcs.map((arc) => {
            const dashArray = `${arc.pct * C} ${C}`;
            const dashOffset = -offset * C;
            offset += arc.pct;
            return (
              <circle
                key={arc.label}
                cx="65"
                cy="65"
                r={R}
                stroke={arc.color}
                strokeWidth="14"
                fill="none"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
              />
            );
          })}
        </svg>
        <div className="db-ring-center">
          <div className="db-ring-pct">{Math.round(onTrackPct * 100)}%</div>
          <div className="db-ring-lbl">on track</div>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div className="db-card-title" style={{ fontSize: 15, marginBottom: 6 }}>Cohort health</div>
        <div className="db-card-meta" style={{ marginBottom: 14 }}>as of today</div>
        <div className="db-ring-legend">
          {arcs.map((arc) => (
            <div key={arc.label} className="db-ring-leg">
              <span className="db-ring-sw" style={{ background: arc.color }} />
              <span style={{ fontSize: 13 }}>{arc.label}</span>
              <span className="db-ring-n">{arc.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
