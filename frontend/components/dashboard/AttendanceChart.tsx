"use client";

import type { AttendancePoint } from "@/lib/dashboard-data";

interface AttendanceChartProps {
  data: AttendancePoint[];
}

export default function AttendanceChart({ data }: AttendanceChartProps) {
  const avg = Math.round(data.reduce((s, d) => s + d.percent, 0) / data.length);

  return (
    <div className="db-card">
      <div className="db-card-head">
        <div>
          <div className="db-card-title">Live attendance · last {data.length} classes</div>
          <div className="db-card-meta" style={{ marginTop: 4 }}>% present per session</div>
        </div>
        <div className="db-tabs" style={{ border: "none", margin: 0 }}>
          <div className="db-tab">7d</div>
          <div className="db-tab active">14d</div>
          <div className="db-tab">30d</div>
        </div>
      </div>

      <div className="db-att-chart">
        {data.map((point) => (
          <div key={point.label} className="db-att-bar-col">
            <div
              className="db-att-bar-fill"
              style={{ height: `${point.percent}%` }}
            />
            <span className="db-att-bar-lbl">{point.label}</span>
          </div>
        ))}
      </div>

      <div className="db-chart-legend">
        <span>
          <i style={{ display: "inline-block", width: 10, height: 10, background: "var(--orange)", borderRadius: 3, verticalAlign: "middle", marginRight: 6 }} />
          Present
        </span>
        <span style={{ marginLeft: "auto" }}>Avg {avg}% · Target 90%</span>
      </div>
    </div>
  );
}
