"use client";

import type { KpiData } from "@/lib/dashboard-data";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

interface KpiCardProps {
  data: KpiData;
}

export default function KpiCard({ data }: KpiCardProps) {
  const deltaClass = data.deltaPositive ? "positive" : "neutral";

  return (
    <div className="db-kpi-card">
      <div className="db-kpi-label">{data.label}</div>

      <div className="db-kpi-value-row">
        <span className="db-kpi-value">{data.value}</span>
        {data.suffix && (
          <span className={data.suffix.trim().length <= 1 ? "db-kpi-suffix" : "db-kpi-unit"}>
            {data.suffix}
          </span>
        )}
      </div>

      {data.barPercent !== undefined && (
        <div className="db-kpi-bar-track" style={{ marginTop: 12 }}>
          <div className="db-kpi-bar-fill" style={{ width: `${data.barPercent}%` }} />
        </div>
      )}

      {data.weekDots && (
        <div className="db-kpi-week">
          {data.weekDots.map((hit, i) => (
            <div key={i} className={`db-week-dot${hit ? " hit" : ""}`}>
              {DAYS[i]}
            </div>
          ))}
        </div>
      )}

      {(data.subtext || data.delta) && (
        <div className="db-kpi-footer">
          {data.subtext && <span>{data.subtext}</span>}
          {data.delta && (
            <span className={`db-kpi-delta ${deltaClass}`}>{data.delta}</span>
          )}
        </div>
      )}
    </div>
  );
}
