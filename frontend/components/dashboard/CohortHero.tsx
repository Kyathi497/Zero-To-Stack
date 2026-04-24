"use client";

import type { CohortHealth } from "@/lib/dashboard-data";

interface CohortHeroProps {
  health: CohortHealth;
}

export default function CohortHero({ health }: CohortHeroProps) {
  return (
    <div className="db-cohort-hero">
      <div>
        <div className="db-eyebrow" style={{ marginBottom: 10 }}>
          Cohort · 2026-A · Week 8 of 27
        </div>
        <div className="db-cohort-title">Frontend Track · React Module</div>
        <div className="db-cohort-sub">
          47 / 126 hours delivered · 16 of 63 classes remaining in the frontend track
        </div>
      </div>
      <div className="db-cohort-kpis">
        <div>
          <div className="db-cohort-kpi-label">Students</div>
          <div className="db-cohort-kpi-value">{health.totalStudents}</div>
        </div>
        <div>
          <div className="db-cohort-kpi-label">Avg Attendance</div>
          <div className="db-cohort-kpi-value">{health.attendance}%</div>
        </div>
        <div>
          <div className="db-cohort-kpi-label">On track</div>
          <div className="db-cohort-kpi-value" style={{ color: "var(--orange)" }}>
            {health.onTrackCount}
          </div>
        </div>
      </div>
    </div>
  );
}
