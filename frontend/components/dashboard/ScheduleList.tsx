"use client";

import type { ScheduleItem } from "@/lib/dashboard-data";

interface ScheduleListProps {
  items: ScheduleItem[];
}

export default function ScheduleList({ items }: ScheduleListProps) {
  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="db-card">
      <div className="db-card-head">
        <div className="db-card-title">Today's schedule · {today}</div>
        <span className="db-card-meta">IST · {items.length} events</span>
      </div>

      <div>
        {items.map((item) => (
          <div key={item.id} className={`db-sched-row${item.isNow ? " now" : ""}`}>
            <div className="db-sched-time">
              <b>{item.time.split(" ")[0]}</b> {item.time.split(" ")[1]}
            </div>
            <span className="db-sched-dot" />
            <div>
              <div className="db-sched-title">{item.title}</div>
              <div className="db-sched-sub">{item.subtitle}</div>
            </div>
            {item.isNow ? (
              <button className="db-btn-join" style={{ padding: "10px 16px", fontSize: 13 }}>
                Start class →
              </button>
            ) : (
              <button className="db-row-btn">
                {item.type === "office-hours" ? "Open room" : item.type === "review" ? "Details" : "Join"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
