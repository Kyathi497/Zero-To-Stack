"use client";

import type { ActivityItem } from "@/lib/dashboard-data";

interface ActivityFeedProps {
  items: ActivityItem[];
}

const TYPE_ICON: Record<string, string> = {
  submit:      "↑",
  complete:    "✓",
  risk:        "⚠",
  grade:       "★",
  schedule:    "▶",
  application: "⧖",
  join:        "?",
};

export default function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="db-card">
      <div className="db-card-head">
        <div className="db-card-title">Activity</div>
        <span className="db-card-meta">last 24h</span>
      </div>
      <div className="db-feed">
        {items.map((item) => (
          <div key={item.id} className="db-feed-row">
            <div className={`db-feed-ic ${item.type}`}>{TYPE_ICON[item.type]}</div>
            <div className="db-feed-txt">
              <b>{item.actor}</b>{" "}
              <span className="q">{item.action}</span>{" "}
              <b>{item.target}</b>
            </div>
            <div className="db-feed-time">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
